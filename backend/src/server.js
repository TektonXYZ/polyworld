const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
const pool = new Pool({
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    database: process.env.DB_NAME || 'polyworld',
    user: process.env.DB_USER || 'polyworld',
    password: process.env.DB_PASSWORD || 'password',
});

// Health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Get all land parcels
app.get('/api/land', async (req, res) => {
    try {
        const { rarity, owned, lat, lng, radius } = req.query;
        let query = 'SELECT * FROM land_parcels WHERE 1=1';
        const params = [];
        let paramIndex = 1;

        if (rarity) {
            query += ` AND rarity = $${paramIndex++}`;
            params.push(rarity);
        }

        if (owned === 'true') {
            query += ` AND owner_wallet IS NOT NULL`;
        } else if (owned === 'false') {
            query += ` AND owner_wallet IS NULL`;
        }

        query += ' ORDER BY rarity DESC, price_usd ASC';
        
        const result = await pool.query(query, params);
        res.json({ land: result.rows, count: result.rows.length });
    } catch (error) {
        console.error('Error fetching land:', error);
        res.status(500).json({ error: 'Failed to fetch land parcels' });
    }
});

// Get single land parcel
app.get('/api/land/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query(
            'SELECT * FROM land_parcels WHERE id = $1',
            [id]
        );
        
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Land parcel not found' });
        }
        
        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error fetching land:', error);
        res.status(500).json({ error: 'Failed to fetch land parcel' });
    }
});

// Get user's land portfolio
app.get('/api/portfolio/:wallet', async (req, res) => {
    try {
        const { wallet } = req.params;
        
        // Get or create user
        await pool.query(
            'INSERT INTO users (wallet_address) VALUES ($1) ON CONFLICT DO NOTHING',
            [wallet]
        );
        
        // Get owned land
        const landResult = await pool.query(
            'SELECT * FROM land_parcels WHERE owner_wallet = $1 ORDER BY purchase_time DESC',
            [wallet]
        );
        
        // Calculate portfolio stats
        const stats = await pool.query(`
            SELECT 
                COUNT(*) as total_parcels,
                SUM(price_usd) as total_value,
                SUM(price_usd * yield_annual / 100 / 365) as daily_yield
            FROM land_parcels 
            WHERE owner_wallet = $1
        `, [wallet]);
        
        res.json({
            wallet,
            land: landResult.rows,
            stats: stats.rows[0]
        });
    } catch (error) {
        console.error('Error fetching portfolio:', error);
        res.status(500).json({ error: 'Failed to fetch portfolio' });
    }
});

// Buy land
app.post('/api/land/buy', async (req, res) => {
    const client = await pool.connect();
    
    try {
        await client.query('BEGIN');
        
        const { land_id, wallet_address, signature } = req.body;
        
        // Check if land is available
        const landResult = await client.query(
            'SELECT * FROM land_parcels WHERE id = $1 AND owner_wallet IS NULL FOR UPDATE',
            [land_id]
        );
        
        if (landResult.rows.length === 0) {
            await client.query('ROLLBACK');
            return res.status(400).json({ error: 'Land not available' });
        }
        
        const land = landResult.rows[0];
        
        // Create user if not exists
        await client.query(
            'INSERT INTO users (wallet_address) VALUES ($1) ON CONFLICT DO NOTHING',
            [wallet_address]
        );
        
        // Update land ownership
        await client.query(
            `UPDATE land_parcels 
             SET owner_wallet = $1, purchase_price = $2, purchase_time = NOW()
             WHERE id = $3`,
            [wallet_address, land.price_usd, land_id]
        );
        
        // Create transaction record
        await client.query(
            `INSERT INTO transactions (type, land_id, wallet_address, amount_usd, signature, status)
             VALUES ('buy', $1, $2, $3, $4, 'confirmed')`,
            [land_id, wallet_address, land.price_usd, signature]
        );
        
        // Update treasury
        await client.query(
            'UPDATE treasury SET total_staked = total_staked + $1, updated_at = NOW()',
            [land.price_usd]
        );
        
        await client.query('COMMIT');
        
        res.json({ 
            success: true, 
            message: 'Land purchased successfully',
            land: { ...land, owner_wallet: wallet_address }
        });
    } catch (error) {
        await client.query('ROLLBACK');
        console.error('Error buying land:', error);
        res.status(500).json({ error: 'Failed to purchase land' });
    } finally {
        client.release();
    }
});

// Sell land back to protocol
app.post('/api/land/sell', async (req, res) => {
    const client = await pool.connect();
    
    try {
        await client.query('BEGIN');
        
        const { land_id, wallet_address, signature } = req.body;
        
        // Verify ownership
        const landResult = await client.query(
            'SELECT * FROM land_parcels WHERE id = $1 AND owner_wallet = $2 FOR UPDATE',
            [land_id, wallet_address]
        );
        
        if (landResult.rows.length === 0) {
            await client.query('ROLLBACK');
            return res.status(400).json({ error: 'Land not owned by user' });
        }
        
        const land = landResult.rows[0];
        const fee = land.purchase_price * 0.05; // 5% fee
        const payout = land.purchase_price - fee;
        
        // Reset land ownership
        await client.query(
            `UPDATE land_parcels 
             SET owner_wallet = NULL, purchase_price = NULL, purchase_time = NULL
             WHERE id = $1`,
            [land_id]
        );
        
        // Create transaction record
        await client.query(
            `INSERT INTO transactions (type, land_id, wallet_address, amount_usd, signature, status)
             VALUES ('sell', $1, $2, $3, $4, 'confirmed')`,
            [land_id, wallet_address, payout, signature]
        );
        
        // Update treasury
        await client.query(
            'UPDATE treasury SET total_staked = total_staked - $1, updated_at = NOW()',
            [land.purchase_price]
        );
        
        await client.query('COMMIT');
        
        res.json({ 
            success: true, 
            message: 'Land sold successfully',
            payout: payout,
            fee: fee
        });
    } catch (error) {
        await client.query('ROLLBACK');
        console.error('Error selling land:', error);
        res.status(500).json({ error: 'Failed to sell land' });
    } finally {
        client.release();
    }
});

// Claim rent
app.post('/api/land/claim-rent', async (req, res) => {
    const client = await pool.connect();
    
    try {
        await client.query('BEGIN');
        
        const { land_id, wallet_address, amount, signature } = req.body;
        
        // Verify ownership
        const landResult = await client.query(
            'SELECT * FROM land_parcels WHERE id = $1 AND owner_wallet = $2',
            [land_id, wallet_address]
        );
        
        if (landResult.rows.length === 0) {
            await client.query('ROLLBACK');
            return res.status(400).json({ error: 'Land not owned by user' });
        }
        
        // Record rent claim
        await client.query(
            `INSERT INTO rent_claims (land_id, owner_wallet, amount, transaction_signature)
             VALUES ($1, $2, $3, $4)`,
            [land_id, wallet_address, amount, signature]
        );
        
        // Create transaction record
        await client.query(
            `INSERT INTO transactions (type, land_id, wallet_address, amount_usd, signature, status)
             VALUES ('claim', $1, $2, $3, $4, 'confirmed')`,
            [land_id, wallet_address, amount, signature]
        );
        
        await client.query('COMMIT');
        
        res.json({ 
            success: true, 
            message: 'Rent claimed successfully',
            amount: amount
        });
    } catch (error) {
        await client.query('ROLLBACK');
        console.error('Error claiming rent:', error);
        res.status(500).json({ error: 'Failed to claim rent' });
    } finally {
        client.release();
    }
});

// Get treasury stats
app.get('/api/treasury', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM treasury LIMIT 1');
        
        const stats = await pool.query(`
            SELECT 
                COUNT(*) as total_parcels,
                COUNT(CASE WHEN owner_wallet IS NOT NULL THEN 1 END) as owned_parcels,
                SUM(CASE WHEN owner_wallet IS NOT NULL THEN price_usd ELSE 0 END) as total_staked
            FROM land_parcels
        `);
        
        res.json({
            treasury: result.rows[0],
            stats: stats.rows[0]
        });
    } catch (error) {
        console.error('Error fetching treasury:', error);
        res.status(500).json({ error: 'Failed to fetch treasury' });
    }
});

// Get rent history for user
app.get('/api/rent-history/:wallet', async (req, res) => {
    try {
        const { wallet } = req.params;
        const result = await pool.query(
            `SELECT rc.*, lp.name as land_name 
             FROM rent_claims rc
             JOIN land_parcels lp ON rc.land_id = lp.id
             WHERE rc.owner_wallet = $1
             ORDER BY rc.claimed_at DESC`,
            [wallet]
        );
        
        res.json({ claims: result.rows });
    } catch (error) {
        console.error('Error fetching rent history:', error);
        res.status(500).json({ error: 'Failed to fetch rent history' });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`PolyWorld API running on port ${PORT}`);
});

module.exports = app;
