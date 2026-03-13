# PolyWorld

**A gamified real-yield virtual land platform on Solana**

---

## Core Concept

PolyWorld is a virtual land game where players buy digital parcels of real-world Earth, stake USDC into a treasury, and earn passive yield as "rent" from that treasury's earnings.

The goal: **make yielding fun and staking fun** by wrapping DeFi mechanics in a collectible map-based experience.

---

## How It Works

### 1. Land Ownership
- Real world divided into small grid-based parcels
- Each parcel is an NFT representing ownership of a geographic location
- Not landmark-based — every square meter of Earth is potentially buyable
- Enough land for everyone, no artificial scarcity FOMO

### 2. Buying Land
- Players buy land **only from the protocol**
- Price = treasury backing value (what the protocol staked on your behalf)
- Example: Buy a parcel for $100 → $100 goes into treasury and gets staked

### 3. Treasury & Yield
- Treasury holds USDC and stakes/lends it to earn yield (~4-5% annually)
- Players earn "rent" as a portion of that yield
- Different land rarities earn different percentages:
  - Common land: ~2%
  - Rare land: ~3%
  - Epic land: ~4%
- Protocol keeps the spread (1-2%) as profit + development funding

### 4. Rarity System
- **Based on real-world population density**
  - Dense cities (high population) = Common (many parcels available)
  - Remote/rural areas (low population) = Rare (few parcels available)
- This flips traditional real estate: remote areas are the premium flex

### 5. Rent Mechanic
- Rent accrues daily while you hold land
- You claim it manually when desired
- Yield source: USDC lending/staking (Aave, Kamino, etc.)
- Rent comes from the 5% treasury yield split between player + protocol

### 6. Selling Land
- **Protocol-only market** — no P2P trading
- Sell back to protocol at any time for current backing value
- Example: Bought for $100, held 1 year → Sell back for ~$102.50 (backing grew from protocol's accumulated 2.5%)
- 5% fee taken on sell-back (revenue for platform)
- Land returns to protocol inventory for resale to new buyers

---

## MVP Features

1. **World map with buyable land parcels**
   - Grid-based real Earth coverage
   - Visual indication of owned vs available land

2. **Wallet login**
   - Solana wallet connection (Phantom, Solflare, etc.)

3. **Buy land**
   - Browse map, select parcel, purchase with USDC
   - Immediate staking into treasury

4. **Land rarity tiers**
   - Common / Rare / Epic
   - Determined by population density
   - Different yield percentages per tier

5. **Parcels generate daily rent**
   - Accrues automatically
   - Manual claim function

6. **Dashboard showing earnings**
   - Total rent earned
   - Current land holdings
   - Yield rate per parcel

7. **Sell land back to protocol**
   - Exit at current backing value
   - 5% fee applied
   - Land returns to protocol inventory

---

## Tokenomics Summary

| Component | Value |
|-----------|-------|
| Treasury yield target | ~5% annually |
| Player rent (common) | ~2% |
| Player rent (rare) | ~3% |
| Player rent (epic) | ~4% |
| Protocol profit | 1-2% spread |
| Sell-back fee | 5% |

**Revenue streams:**
1. Yield spread (treasury earns 5%, pays 2-4% to players)
2. 5% fee on land sell-backs

---

## Why This Works

1. **Simple to understand** — Buy land, earn rent, sell back anytime
2. **Guaranteed liquidity** — Protocol always buys back at fair value
3. **No rug risk** — Treasury is fully backed, transparent
4. **Gamified DeFi** — Collecting locations makes staking feel like a game
5. **Sustainable** — Revenue comes from real yield, not ponzi mechanics
6. **Accessible** — No trading skills needed, just collect and earn

---

## Chain

**Solana** — Cheap transactions, fast finality, good for frequent rent claims

---

## Status

**Active Development** — Daily commits, building in public

**Built by:** Ali + Kelvin (AI assistant)

---

*Note: This is a concept document in active development. Subject to change.*
