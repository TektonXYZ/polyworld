# ⚡ PolyWorld

> **Own the Earth. Earn Real Yield.**

[![Live Demo](https://img.shields.io/badge/Live%20Demo-tektonxyz.github.io/polyworld-00d4ff?style=for-the-badge&logo=github)](https://tektonxyz.github.io/polyworld/public/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge)](LICENSE)
[![Solana](https://img.shields.io/badge/Solana-Devnet-9945ff?style=for-the-badge&logo=solana)](https://solana.com)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react)](https://reactjs.org)
[![Cities](https://img.shields.io/badge/Cities-908%20Worldwide-ff6b6b?style=for-the-badge)](https://tektonxyz.github.io/polyworld/public/)

---

## 🎮 [Try It Live →](https://tektonxyz.github.io/polyworld/public/)

**908 real cities worldwide** • **Phantom Wallet** • **Zero gas on devnet**

---

## 🌍 What is PolyWorld?

PolyWorld is a **gamified virtual land investment platform** where players buy digital parcels of real-world Earth, stake USDC into a treasury, and earn passive yield as "rent" from DeFi earnings.

### 🎯 Core Concept
- **Buy real locations** — From New York to Antarctica
- **Earn daily yield** — 2-4% APY based on land rarity  
- **Protocol guarantees** — Buyback anytime with 5% fee
- **Zero speculation** — Real DeFi yield, not PvP trading

---

## ✨ Key Features

| Feature | Description |
|---------|-------------|
| 🗺️ **Real World Map** | Interactive Leaflet map with 908 real cities |
| 🏗️ **Hexagon Grid** | Beautiful hex markers at real coordinates |
| 💰 **Real Yield** | Treasury earns 4-5% APY from DeFi |
| 🎮 **Rarity System** | Cities=Common, Remote=Epic (higher yield) |
| 🔒 **Protocol Liquidity** | Guaranteed buyback, instant sells |
| ⚡ **Solana Powered** | Fast transactions, negligible fees |
| 🔗 **Phantom Wallet** | One-click connection |

---

## 🚀 Quick Start

### 1. Visit the Live Demo
👉 **[tektonxyz.github.io/polyworld](https://tektonxyz.github.io/polyworld/public/)**

### 2. Connect Wallet
- Install [Phantom Wallet](https://phantom.app) (if you haven't)
- Click "Connect Phantom" in the app
- Approve the connection

### 3. Start Exploring
- Browse 908 cities on the interactive map
- Filter by continent in the sidebar
- Click any city to see price and yield
- Buy land to start earning!

---

## 🖼️ Screenshots

```
┌─────────────────────────────────────────┐
│  ⚡ PolyWorld          [Connect Wallet] │
│                                         │
│     🗺️ Interactive Map                  │
│     ┌─────────────────────────┐         │
│     │  • • •  🏙️  • • •      │         │
│     │    •  🌲  •  🏔️  •     │  ┌────┐ │
│     │  •  🏙️  •  •  •  🌊   │  │List│ │
│     │    •  •  🏜️  •  •     │  │of  │ │
│     │  🏙️  •  •  •  🏙️  •   │  │Cities│ │
│     └─────────────────────────┘  └────┘ │
│                                         │
└─────────────────────────────────────────┘
```

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────┐
│                   Frontend                      │
│  ┌─────────┐  ┌─────────┐  ┌─────────────┐     │
│  │  React  │  │ Leaflet │  │ Solana Web3 │     │
│  │   18    │  │  Maps   │  │    .js      │     │
│  └────┬────┘  └────┬────┘  └──────┬──────┘     │
│       └─────────────┴──────────────┘            │
└──────────────────────┬──────────────────────────┘
                       │
       ┌───────────────┼───────────────┐
       ▼               ▼               ▼
┌─────────────┐  ┌─────────────┐  ┌─────────────┐
│   Backend   │  │   Solana    │  │   Postgre   │
│   Express   │  │   Devnet    │  │    SQL      │
│     API     │  │   Anchor    │  │  Database   │
└─────────────┘  └─────────────┘  └─────────────┘
```

---

## 💻 Tech Stack

| Layer | Technologies |
|-------|-------------|
| **Frontend** | React 18, Leaflet Maps, Babel |
| **Backend** | Node.js, Express, PostgreSQL |
| **Blockchain** | Solana, Anchor Framework, Rust |
| **Wallet** | Phantom, Solana Web3.js |
| **Maps** | OpenStreetMap (CartoDB Dark) |
| **Hosting** | GitHub Pages |

---

## 📊 Game Mechanics

### Land Rarity & Yield

| Type | Locations | Price | Daily Yield | APY |
|------|-----------|-------|-------------|-----|
| 🏙️ **EPIC** | Major Cities | $500-1000 | ~$0.55-1.10 | 4% |
| 🌲 **RARE** | Medium Cities | $200-400 | ~$0.16-0.33 | 3% |
| 🏔️ **COMMON** | Remote Areas | $50-150 | ~$0.03-0.08 | 2% |

### Treasury Mechanics
- Player deposits → Treasury
- Treasury → DeFi lending protocols
- Yield → Distributed as "rent" to land owners
- Protocol takes 5% fee on sells

---

## 🛣️ Roadmap

### ✅ Phase 1: MVP (Complete)
- [x] Smart contract architecture
- [x] Interactive world map (908 cities)
- [x] Phantom wallet integration
- [x] Land purchase/sell mechanics
- [x] GitHub Pages deployment

### 🚧 Phase 2: Beta (In Progress)
- [ ] Solana devnet deployment
- [ ] USDC payment integration
- [ ] Rent claiming system
- [ ] Mobile responsiveness
- [ ] Analytics dashboard

### 🚀 Phase 3: Mainnet
- [ ] Security audit
- [ ] Mainnet deployment
- [ ] Token launch
- [ ] Marketing campaign

---

## 🏆 Stats

- **908** Real-world cities
- **195** Country capitals
- **7** Continents covered
- **0** Ocean hexagons (100% land!)

---

## 🤝 Contributing

We welcome contributions! See [CONTRIBUTING.md](CONTRIBUTING.md)

```bash
git clone https://github.com/TektonXYZ/polyworld.git
cd polyworld
npm install
npm run dev
```

---

## 🔒 Security

Report vulnerabilities to [security@polyworld.game](mailto:security@polyworld.game)

See [SECURITY.md](SECURITY.md)

---

## 📄 License

MIT License - see [LICENSE](LICENSE)

---

## 🙏 Acknowledgments

- Solana Foundation
- Anchor Framework
- OpenStreetMap contributors
- CartoDB for map tiles

---

<div align="center">

### [🎮 Play Now](https://tektonxyz.github.io/polyworld/public/)

**Built with 💜 on Solana**

</div>
