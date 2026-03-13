const { Connection, PublicKey, Transaction, SystemProgram, LAMPORTS_PER_SOL } = require('@solana/web3.js');
const { Program, AnchorProvider, web3 } = require('@project-serum/anchor');

// PolyWorld Program IDs (devnet placeholders)
const LAND_NFT_PROGRAM_ID = new PublicKey('Land111111111111111111111111111111111111111');
const TREASURY_PROGRAM_ID = new PublicKey('Treas11111111111111111111111111111111111111');

class BlockchainService {
    constructor(network = 'devnet') {
        this.connection = new Connection(
            network === 'mainnet' 
                ? web3.clusterApiUrl('mainnet-beta')
                : web3.clusterApiUrl('devnet'),
            'confirmed'
        );
        this.network = network;
    }

    // Get account balance
    async getBalance(walletAddress) {
        try {
            const publicKey = new PublicKey(walletAddress);
            const balance = await this.connection.getBalance(publicKey);
            return balance / LAMPORTS_PER_SOL;
        } catch (error) {
            console.error('Error getting balance:', error);
            return 0;
        }
    }

    // Get USDC token account balance
    async getUSDCBalance(walletAddress) {
        // Placeholder - would need actual USDC mint address
        // This would check token accounts for USDC
        return 0;
    }

    // Simulate land purchase transaction
    async simulateBuyLand(landId, price, buyerWallet) {
        try {
            // In production, this would:
            // 1. Create instruction to call land_nft program
            // 2. Create instruction to transfer USDC to treasury
            // 3. Create instruction to mint NFT
            
            // Simulation for now
            return {
                success: true,
                signature: 'simulated_' + Date.now(),
                landId,
                price,
                buyer: buyerWallet
            };
        } catch (error) {
            console.error('Error simulating buy:', error);
            throw error;
        }
    }

    // Simulate rent claim transaction
    async simulateClaimRent(landId, amount, ownerWallet) {
        try {
            // In production, this would:
            // 1. Verify land ownership
            // 2. Calculate claimable rent
            // 3. Transfer USDC from treasury to owner
            
            return {
                success: true,
                signature: 'simulated_' + Date.now(),
                landId,
                amount,
                owner: ownerWallet
            };
        } catch (error) {
            console.error('Error simulating claim:', error);
            throw error;
        }
    }

    // Get transaction status
    async getTransactionStatus(signature) {
        try {
            const status = await this.connection.getSignatureStatus(signature);
            return status.value;
        } catch (error) {
            console.error('Error getting transaction status:', error);
            return null;
        }
    }

    // Listen for program events
    async subscribeToEvents(callback) {
        // Subscribe to program account changes
        this.connection.onAccountChange(
            LAND_NFT_PROGRAM_ID,
            (accountInfo) => {
                callback({
                    type: 'account_change',
                    program: 'land_nft',
                    data: accountInfo
                });
            }
        );
    }

    // Calculate daily rent for a land parcel
    calculateDailyRent(purchasePrice, annualYield) {
        return (purchasePrice * (annualYield / 100)) / 365;
    }

    // Calculate claimable rent (since last claim)
    calculateClaimableRent(purchasePrice, annualYield, lastClaimTime) {
        const now = Date.now();
        const daysSinceClaim = (now - lastClaimTime) / (1000 * 60 * 60 * 24);
        const dailyRent = this.calculateDailyRent(purchasePrice, annualYield);
        return dailyRent * daysSinceClaim;
    }
}

module.exports = BlockchainService;
