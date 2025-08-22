# VeriField - Decentralized Dataset Marketplace

A Web3 marketplace for verified dataset trading built with Next.js 14, Hardhat, and IPFS.

## Tech Stack

- **Frontend**: Next.js 14 (App Router) + TypeScript + Tailwind CSS + shadcn/ui
- **Web3**: wagmi v2 + viem + RainbowKit
- **Smart Contracts**: Hardhat (local chain 31337)
- **Storage**: IPFS
- **Database**: Supabase/PostgreSQL (or SQLite via Prisma)
- **Indexing**: Event listeners in Next.js API routes
- **AI**: Content-based tag/domain recommender

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Git

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd verifield-nextjs
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
# Fill in your environment variables
```

4. Set up the database (choose one):

**Option A: Supabase**
- Create a Supabase project
- Add your Supabase URL and keys to `.env.local`
- Run the SQL migrations in your Supabase dashboard

**Option B: Local PostgreSQL with Prisma**
```bash
# Set up PostgreSQL locally and update DATABASE_URL in .env.local
npx prisma migrate dev
npx prisma generate
```

### Development

1. Start the local Hardhat node:
```bash
npm run hardhat:node
```

2. Deploy the smart contracts:
```bash
npm run hardhat:compile
npm run hardhat:deploy
```

3. Start the Next.js development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
├── app/                    # Next.js 14 App Router
│   ├── api/               # API routes
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   ├── page.tsx          # Landing page
│   └── providers.tsx     # Web3 and theme providers
├── contracts/             # Solidity smart contracts
├── scripts/              # Deployment scripts
├── src/
│   ├── components/       # React components
│   ├── lib/             # Utility libraries
│   └── hooks/           # Custom React hooks
├── prisma/              # Database schema (if using Prisma)
├── hardhat.config.js    # Hardhat configuration
└── tailwind.config.ts   # Tailwind CSS configuration
```

## Features

- **Dataset Upload & Verification**: Upload datasets to IPFS with cryptographic verification
- **NFT Minting**: Mint NFT certificates for dataset ownership
- **Marketplace**: Browse and purchase verified datasets
- **Web3 Integration**: Connect wallet, interact with smart contracts
- **AI Recommendations**: Content-based tag and domain suggestions
- **Event Indexing**: Automatic blockchain event processing and caching

## Smart Contracts

The main contract `DatasetNFT.sol` handles:
- Dataset NFT minting with metadata
- Purchase transactions with platform fees
- Verification system for quality control
- IPFS CID and SHA-256 hash storage

## API Routes

- `GET/POST /api/datasets` - Dataset CRUD operations
- `POST /api/ai/recommend-tags` - AI-powered tag recommendations  
- `GET/POST /api/blockchain/events` - Blockchain event processing

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License - see LICENSE file for details.