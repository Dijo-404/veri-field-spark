import { NextResponse } from "next/server";
import { createPublicClient, http, parseAbiItem } from "viem";
import { hardhat } from "viem/chains";
import { PrismaClient } from "@prisma/client";
import fs from "fs/promises";
import path from "path";

const prisma = new PrismaClient();

const dataNFTAddress = process.env.NEXT_PUBLIC_DATANFT_ADDRESS as `0x${string}`;
const marketplaceAddress = process.env.NEXT_PUBLIC_MARKETPLACE_ADDRESS as `0x${string}`;

// Hardcoded ABIs for the events we are interested in
const dataNFTAbi = [
  "event Minted(uint256 indexed tokenId, address indexed to)",
  "event Verified(uint256 indexed tokenId, bool verified)", // Assuming a Verified event exists
];
const marketplaceAbi = [
  "event Purchased(uint256 indexed tokenId, address indexed buyer, uint256 amount)",
];

const lastBlockFilePath = path.join("/tmp", "last-processed-block.json");

async function getLastProcessedBlock(): Promise<bigint> {
  try {
    const data = await fs.readFile(lastBlockFilePath, "utf-8");
    const json = JSON.parse(data);
    return BigInt(json.lastProcessedBlock);
  } catch (error) {
    // If file doesn't exist or is invalid, start from block 0
    return 0n;
  }
}

async function setLastProcessedBlock(blockNumber: bigint): Promise<void> {
  await fs.writeFile(
    lastBlockFilePath,
    JSON.stringify({ lastProcessedBlock: blockNumber.toString() })
  );
}

export async function POST() {
  console.log("Indexer API route called.");

  const publicClient = createPublicClient({
    chain: hardhat,
    transport: http(),
  });

  try {
    const fromBlock = (await getLastProcessedBlock()) + 1n;
    const toBlock = await publicClient.getBlockNumber();

    if (fromBlock > toBlock) {
      console.log("No new blocks to process.");
      return NextResponse.json({ success: true, message: "No new blocks to process." });
    }

    console.log(`Processing blocks from ${fromBlock} to ${toBlock}...`);

    // Fetch Minted events
    const mintedLogs = await publicClient.getLogs({
      address: dataNFTAddress,
      event: parseAbiItem(dataNFTAbi[0]),
      fromBlock,
      toBlock,
    });

    for (const log of mintedLogs) {
      const { tokenId, to } = log.args;
      // In a real app, you would fetch the dataset metadata here
      // For now, we'll create a placeholder
      await prisma.dataset.create({
        data: {
          tokenId: Number(tokenId),
          owner: to,
          name: `Dataset #${tokenId}`,
          domain: "unknown",
          tags: "",
          cid: "",
          licenseUri: "",
          sha256sum: "",
        },
      });
      await prisma.activity.create({
        data: {
          address: to,
          type: "mint",
          tokenId: Number(tokenId),
        },
      });
    }

    // Fetch Verified events
    // NOTE: The 'Verified' event was not in the original contract, so this will not find anything.
    // I am adding the code here as per the user's instructions for the indexer.
    // I will add the event to the contract later if needed.
    const verifiedLogs = await publicClient.getLogs({
        address: dataNFTAddress,
        event: parseAbiItem('event Verified(uint256 indexed tokenId, bool indexed verified)'),
        fromBlock,
        toBlock,
    });

    for (const log of verifiedLogs) {
        const { tokenId, verified } = log.args;
        if (tokenId) {
            await prisma.dataset.update({
                where: { tokenId: Number(tokenId) },
                data: { verified: verified },
            });
            const dataset = await prisma.dataset.findUnique({ where: { tokenId: Number(tokenId) } });
            if (dataset) {
                await prisma.activity.create({
                    data: {
                        address: dataset.owner,
                        type: "verify",
                        tokenId: Number(tokenId),
                    },
                });
            }
        }
    }


    // Fetch Purchased events
    const purchasedLogs = await publicClient.getLogs({
      address: marketplaceAddress,
      event: parseAbiItem(marketplaceAbi[0]),
      fromBlock,
      toBlock,
    });

    for (const log of purchasedLogs) {
      const { tokenId, buyer, amount } = log.args;
      if (tokenId && buyer && amount) {
          const seller = await prisma.dataset.findUnique({
              where: { tokenId: Number(tokenId) },
              select: { owner: true }
          });

          if (seller) {
              await prisma.purchase.create({
                  data: {
                      tokenId: Number(tokenId),
                      buyer: buyer,
                      amount: amount,
                      txHash: log.transactionHash || "",
                  },
              });

              await prisma.dataset.update({
                  where: { tokenId: Number(tokenId) },
                  data: {
                      buyersCount: { increment: 1 },
                      owner: buyer,
                  },
              });

              await prisma.ownership.create({
                  data: {
                      address: buyer,
                      tokenId: Number(tokenId),
                  },
              });

              await prisma.activity.create({
                  data: {
                      address: buyer,
                      type: "purchase",
                      tokenId: Number(tokenId),
                  },
              });

              await prisma.creditLedger.create({
                  data: {
                      address: seller.owner,
                      delta: amount,
                      reason: `Sale of token #${tokenId}`,
                  },
              });
          }
      }
    }


    await setLastProcessedBlock(toBlock);

    return NextResponse.json({ success: true, message: `Indexed blocks up to ${toBlock}.` });
  } catch (error) {
    console.error("Error during indexing:", error);
    return NextResponse.json(
      { success: false, message: "An error occurred during indexing." },
      { status: 500 }
    );
  }
}
