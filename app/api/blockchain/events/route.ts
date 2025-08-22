import { NextRequest, NextResponse } from 'next/server';
import { createPublicClient, http, parseAbiItem } from 'viem';
import { hardhat } from 'viem/chains';
import { supabase } from '@/lib/supabase';

// Create a public client for reading from the blockchain
const publicClient = createPublicClient({
  chain: hardhat,
  transport: http('http://127.0.0.1:8545'),
});

// Contract ABI events
const DATASET_MINTED_EVENT = parseAbiItem('event DatasetMinted(uint256 indexed tokenId, address indexed creator, string cid, string sha256Hash, uint256 price)');
const DATASET_PURCHASED_EVENT = parseAbiItem('event DatasetPurchased(uint256 indexed tokenId, address indexed buyer, address indexed creator, uint256 price)');
const DATASET_VERIFIED_EVENT = parseAbiItem('event DatasetVerified(uint256 indexed tokenId)');

// This would be set from your deployment
const CONTRACT_ADDRESS = process.env.DATASET_NFT_CONTRACT_ADDRESS as `0x${string}`;

export async function POST(request: NextRequest) {
  try {
    if (!CONTRACT_ADDRESS) {
      return NextResponse.json({ error: 'Contract address not configured' }, { status: 500 });
    }

    // Get the latest block number we've processed
    const { data: lastProcessed } = await supabase
      .from('event_processing')
      .select('last_block')
      .eq('contract_address', CONTRACT_ADDRESS)
      .single();

    const fromBlock = lastProcessed?.last_block ? BigInt(lastProcessed.last_block + 1) : BigInt(0);
    const toBlock = await publicClient.getBlockNumber();

    console.log(`Processing events from block ${fromBlock} to ${toBlock}`);

    // Fetch DatasetMinted events
    const mintedLogs = await publicClient.getLogs({
      address: CONTRACT_ADDRESS,
      event: DATASET_MINTED_EVENT,
      fromBlock,
      toBlock,
    });

    // Fetch DatasetPurchased events
    const purchasedLogs = await publicClient.getLogs({
      address: CONTRACT_ADDRESS,
      event: DATASET_PURCHASED_EVENT,
      fromBlock,
      toBlock,
    });

    // Fetch DatasetVerified events
    const verifiedLogs = await publicClient.getLogs({
      address: CONTRACT_ADDRESS,
      event: DATASET_VERIFIED_EVENT,
      fromBlock,
      toBlock,
    });

    // Process minted events - these would create new dataset records
    for (const log of mintedLogs) {
      const { tokenId, creator, cid, sha256Hash, price } = log.args;
      
      // Here you would typically fetch additional metadata from IPFS using the CID
      // For now, we'll create a basic record
      await supabase
        .from('datasets')
        .upsert({
          id: tokenId.toString(),
          title: `Dataset #${tokenId}`,
          description: 'Dataset minted on blockchain',
          cid: cid,
          sha256: sha256Hash,
          creator: creator,
          price: price.toString(),
          verified: false,
          downloads: 0,
          tags: [],
          domain: 'Unknown',
          license: 'Custom',
        });
    }

    // Process purchased events - increment download count
    for (const log of purchasedLogs) {
      const { tokenId } = log.args;
      
      await supabase.rpc('increment_downloads', {
        dataset_id: tokenId.toString()
      });
    }

    // Process verified events - mark datasets as verified
    for (const log of verifiedLogs) {
      const { tokenId } = log.args;
      
      await supabase
        .from('datasets')
        .update({ verified: true })
        .eq('id', tokenId.toString());
    }

    // Update the last processed block
    await supabase
      .from('event_processing')
      .upsert({
        contract_address: CONTRACT_ADDRESS,
        last_block: Number(toBlock),
        updated_at: new Date().toISOString(),
      });

    return NextResponse.json({
      processed: {
        minted: mintedLogs.length,
        purchased: purchasedLogs.length,
        verified: verifiedLogs.length,
        fromBlock: Number(fromBlock),
        toBlock: Number(toBlock),
      }
    });

  } catch (error) {
    console.error('Event processing error:', error);
    return NextResponse.json(
      { error: 'Failed to process blockchain events' },
      { status: 500 }
    );
  }
}

// GET endpoint to manually trigger event processing (useful for cron jobs)
export async function GET() {
  // This would be the same logic as POST, useful for cron jobs
  return POST(new NextRequest('http://localhost/api/blockchain/events', { method: 'POST' }));
}