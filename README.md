# PolyWorld

> A gamified real-yield virtual land platform on Solana

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Solana](https://img.shields.io/badge/Solana-Devnet-9945ff?logo=solana)](https://solana.com)
[![React](https://img.shields.io/badge/React-18-61DAFB?logo=react)](https://reactjs.org)
[![Anchor](https://img.shields.io/badge/Anchor-0.28-000000)](https://anchor-lang.com)

## 🌍 Overview

PolyWorld is a virtual land game where players buy digital parcels of real-world Earth, stake USDC into a treasury, and earn passive yield as "rent" from that treasury's DeFi earnings.

**Key Innovation:** Every piece of land on Earth is tokenized as a buyable NFT. Remote locations (Antarctica, deserts, polar regions) are rarer and pay higher yields than cities.

## ✨ Features

- 🗺️ **Real World Map** — Buy actual geographic locations
- 🏗️ **Hexagon Grid** — Land divided into ~100km hex parcels
- 💰 **Real Yield** — Treasury earns 4-5% APY from DeFi lending
- 🎮 **Gamified** — Collect land, earn rent, build portfolio
- 🔒 **Protocol-Only** — Guaranteed buyback, no speculation
- ⚡ **Solana** — Fast, cheap transactions

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- Solana CLI
- Anchor Framework
- PostgreSQL 14+

### Installation

```bash
# Clone repository
git clone https://github.com/TektonXYZ/polyworld.git
cd polyworld

# Install frontend dependencies
cd public && npm install

# Install backend dependencies  
cd ../backend && npm install

# Set up database
createdb polyworld
psql -d polyworld -f database/schema.sql

# Configure environment
cp .env.example .env
# Edit .env with your settings
```

### Running Locally

```bash
# Terminal 1: Start backend
cd backend
npm run dev

# Terminal 2: Serve frontend
cd public
npx serve .

# Open http://localhost:3000
```

### Connect Wallet

1. Install [Phantom Wallet](https://phantom.app)
2. Switch to Devnet
3. Get devnet SOL from [faucet](https://faucet.solana.com)
4. Connect wallet on PolyWorld
5. Start buying land!

## 🏗️ Architecture

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│  Frontend   │────▶│   Backend   │────▶│  Database   │
│  (React)    │     │  (Express)  │     │ (PostgreSQL)│
└─────────────┘     └─────────────┘     └─────────────┘
       │
       ▼
┌─────────────┐
│   Solana    │
│   Devnet    │
│  (Anchor)   │
└─────────────┘
```

### Smart Contracts

| Program | Purpose | Status |
|---------|---------|--------|
| `land_nft` | Land parcel NFTs | ✅ Built |
| `treasury` | USDC management | ✅ Built |

### Tech Stack

- **Frontend:** React 18, Leaflet Maps, Solana Web3.js
- **Backend:** Node.js, Express, PostgreSQL
- **Blockchain:** Solana, Anchor Framework, Rust
- **Maps:** OpenStreetMap (CartoDB Dark)

## 📊 Tokenomics

| Component | Value |
|-----------|-------|
| Treasury Yield | ~5% APY |
| Player Rent (Common) | ~2% |
| Player Rent (Rare) | ~3% |
| Player Rent (Epic) | ~4% |
| Protocol Fee | 5% on sells |

## 🛣️ Roadmap

### Phase 1: MVP ✅
- [x] Smart contract architecture
- [x] Frontend with map
- [x] Backend API
- [x] Wallet integration
- [x] Land purchase/sell

### Phase 2: Beta
- [ ] Devnet deployment
- [ ] USDC integration
- [ ] Rent claiming
- [ ] Mobile responsive
- [ ] Analytics dashboard

### Phase 3: Mainnet
- [ ] Security audit
- [ ] Mainnet deployment
- [ ] Marketing campaign
- [ ] Community building

## 🤝 Contributing

We welcome contributions! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## 🔒 Security

Please report security vulnerabilities to [security@polyworld.game](mailto:security@polyworld.game)

See [SECURITY.md](SECURITY.md) for details.

## 📄 License

MIT License - see [LICENSE](LICENSE) file

## 🙏 Acknowledgments

- Solana Foundation
- Anchor Framework team
- OpenStreetMap contributors

## 📞 Contact

- Twitter: [@PolyWorldGame](https://twitter.com/PolyWorldGame)
- Discord: [Join our community](https://discord.gg/polyworld)
- Email: hello@polyworld.game

---

**Built with 💜 on Solana**
