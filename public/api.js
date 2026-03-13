// PolyWorld Frontend - Updated with Real Backend Integration

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';
const SOLANA_NETWORK = 'devnet';
const SOLANA_RPC_URL = 'https://api.devnet.solana.com';

// Land NFT Program ID (update after deployment)
const LAND_NFT_PROGRAM_ID = 'Land111111111111111111111111111111111111111';
const TREASURY_PROGRAM_ID = 'Treas11111111111111111111111111111111111111';

// API Client
class PolyWorldAPI {
    async getAllLand() {
        const response = await fetch(`${API_BASE_URL}/api/land`);
        return response.json();
    }

    async getPortfolio(walletAddress) {
        const response = await fetch(`${API_BASE_URL}/api/portfolio/${walletAddress}`);
        return response.json();
    }

    async buyLand(landId, walletAddress, signature) {
        const response = await fetch(`${API_BASE_URL}/api/land/buy`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ land_id: landId, wallet_address: walletAddress, signature })
        });
        return response.json();
    }

    async sellLand(landId, walletAddress, signature) {
        const response = await fetch(`${API_BASE_URL}/api/land/sell`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ land_id: landId, wallet_address: walletAddress, signature })
        });
        return response.json();
    }

    async claimRent(landId, walletAddress, amount, signature) {
        const response = await fetch(`${API_BASE_URL}/api/land/claim-rent`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ land_id: landId, wallet_address: walletAddress, amount, signature })
        });
        return response.json();
    }

    async getTreasury() {
        const response = await fetch(`${API_BASE_URL}/api/treasury`);
        return response.json();
    }
}

const api = new PolyWorldAPI();

// Export for use in React components
export { api, API_BASE_URL, SOLANA_NETWORK, SOLANA_RPC_URL, LAND_NFT_PROGRAM_ID, TREASURY_PROGRAM_ID };
