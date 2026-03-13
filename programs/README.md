# PolyWorld Smart Contracts

## Programs

### 1. Land NFT (`land_nft`)
Manages land parcel NFTs on Solana.

**Features:**
- Mint land parcels as NFTs
- Store location data (lat/lng)
- Track rarity tiers
- Manage ownership
- Track claimable rent

**Instructions:**
- `initialize` - Create land registry
- `mint_land` - Mint new land parcel
- `transfer_land` - Transfer ownership
- `update_rent` - Add claimable rent
- `claim_rent` - Claim accumulated rent

### 2. Treasury (`treasury`)
Manages USDC treasury and yield distribution.

**Features:**
- Hold USDC from land purchases
- Distribute rent to land owners
- Handle land buybacks (with fee)
- Track total staked and yield

**Instructions:**
- `initialize` - Create treasury
- `buy_land` - Purchase land (USDC → treasury)
- `sell_land` - Sell land back (treasury → USDC)
- `distribute_rent` - Send rent to owner
- `harvest_yield` - Record yield from external sources

## Architecture

```
User buys land
    ↓
USDC → Treasury
    ↓
Land NFT minted to user
    ↓
Yield harvested from DeFi
    ↓
Rent distributed to land owners
```

## Development

### Build
```bash
anchor build
```

### Test
```bash
anchor test
```

### Deploy (Devnet)
```bash
anchor deploy --provider.cluster devnet
```

## TODO

- [ ] Add CPI calls between programs
- [ ] Implement yield calculation logic
- [ ] Add access control for harvest_yield
- [ ] Write comprehensive tests
- [ ] Add events for frontend indexing
- [ ] Security audit
