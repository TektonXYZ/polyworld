# PolyWorld Backend

Full-stack backend for PolyWorld - land NFT platform with yield distribution.

## Architecture

```
┌─────────────────┐     ┌──────────────┐     ┌─────────────────┐
│   Frontend      │────▶│   API        │────▶│   PostgreSQL    │
│   (React)       │     │   (Express)  │     │   (Database)    │
└─────────────────┘     └──────────────┘     └─────────────────┘
                               │
                               ▼
                        ┌──────────────┐
                        │   Solana     │
                        │   Devnet     │
                        └──────────────┘
```

## Features

- **REST API** - Complete CRUD operations for land, users, transactions
- **Database** - PostgreSQL with proper relations and indexing
- **Blockchain Integration** - Solana Web3.js for contract interaction
- **Rent Calculation** - Daily yield calculations and claims
- **Transaction Tracking** - All purchases, sales, and claims logged

## API Endpoints

### Land
- `GET /api/land` - List all land parcels (filter by rarity, ownership)
- `GET /api/land/:id` - Get specific land parcel
- `POST /api/land/buy` - Purchase land
- `POST /api/land/sell` - Sell land back to protocol

### Portfolio
- `GET /api/portfolio/:wallet` - Get user's land portfolio and stats

### Treasury
- `GET /api/treasury` - Get treasury statistics

### Rent
- `POST /api/land/claim-rent` - Claim accumulated rent
- `GET /api/rent-history/:wallet` - Get user's rent claim history

## Setup

1. **Install dependencies:**
```bash
npm install
```

2. **Set up PostgreSQL:**
```bash
# Create database
createdb polyworld

# Run schema
psql -d polyworld -f database/schema.sql
```

3. **Configure environment:**
```bash
cp .env.example .env
# Edit .env with your settings
```

4. **Start server:**
```bash
npm run dev
```

## Database Schema

### Tables

- **users** - Wallet addresses and metadata
- **land_parcels** - All land NFTs with ownership
- **treasury** - Platform treasury stats
- **rent_claims** - Rent distribution history
- **transactions** - All buy/sell/claim transactions

## Smart Contract Integration

The backend connects to two Solana programs:

1. **land_nft** - Handles land NFT minting and transfers
2. **treasury** - Manages USDC deposits, withdrawals, and yield

## Development

### Run locally
```bash
npm run dev
```

### Test endpoints
```bash
curl http://localhost:3001/api/health
curl http://localhost:3001/api/land
curl http://localhost:3001/api/treasury
```

## Deployment

### Requirements
- Node.js 18+
- PostgreSQL 14+
- Solana CLI (for contract deployment)

### Environment Variables
See `.env.example` for required variables.

## TODO

- [ ] Deploy smart contracts to devnet
- [ ] Add authentication middleware
- [ ] Implement proper USDC token transfers
- [ ] Add rate limiting
- [ ] Set up monitoring/logging
- [ ] Add automated tests

## License

MIT
