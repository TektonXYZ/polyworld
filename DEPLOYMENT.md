# PolyWorld Devnet Deployment Guide

## Prerequisites

1. **Install Solana CLI:**
```bash
sh -c "$(curl -sSfL https://release.solana.com/v1.17.0/install)"
```

2. **Install Anchor:**
```bash
cargo install --git https://github.com/coral-xyz/anchor avm --locked --force
avm install latest
avm use latest
```

3. **Configure for Devnet:**
```bash
solana config set --url devnet
solana-keygen new --outfile ~/.config/solana/id.json
solana airdrop 2
```

## Deployment Steps

### 1. Build Programs
```bash
cd anchor
anchor build
```

### 2. Deploy Land NFT Program
```bash
anchor deploy --program-name land_nft
# Save the Program ID output
```

### 3. Deploy Treasury Program
```bash
anchor deploy --program-name treasury
# Save the Program ID output
```

### 4. Update Program IDs

Edit `Anchor.toml` with new program IDs:
```toml
[programs.devnet]
land_nft = "YOUR_LAND_NFT_PROGRAM_ID"
treasury = "YOUR_TREASURY_PROGRAM_ID"
```

Update `lib.rs` in both programs with new IDs.

### 5. Initialize Programs

Run initialization scripts (to be created):
```bash
anchor run initialize
```

## Frontend Integration

Update `api.js` with deployed program IDs:
```javascript
const LAND_NFT_PROGRAM_ID = 'YOUR_DEPLOYED_ID';
const TREASURY_PROGRAM_ID = 'YOUR_DEPLOYED_ID';
```

## Backend Integration

Update `.env`:
```
LAND_NFT_PROGRAM_ID=your_deployed_id
TREASURY_PROGRAM_ID=your_deployed_id
```

## Testing

1. Start backend: `npm run dev`
2. Open frontend
3. Connect Phantom wallet (devnet)
4. Buy test land
5. Verify transaction on Solana Explorer

## Program IDs (Devnet)

These will be updated after deployment:

- **Land NFT:** `TBD`
- **Treasury:** `TBD`
- **USDC Mint:** `EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v`

## Notes

- Use devnet USDC faucet for testing
- Monitor transactions on https://explorer.solana.com/?cluster=devnet
- Each deployment costs ~0.02 SOL
- Keep backup of program IDs
