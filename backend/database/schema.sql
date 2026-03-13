-- PolyWorld Database Schema

-- Users table
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    wallet_address VARCHAR(44) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Land parcels table
CREATE TABLE IF NOT EXISTS land_parcels (
    id SERIAL PRIMARY KEY,
    h3_index VARCHAR(20) UNIQUE NOT NULL,
    lat DECIMAL(10, 8) NOT NULL,
    lng DECIMAL(11, 8) NOT NULL,
    name VARCHAR(100) NOT NULL,
    rarity VARCHAR(20) NOT NULL CHECK (rarity IN ('common', 'rare', 'epic')),
    price_usd DECIMAL(10, 2) NOT NULL,
    yield_annual DECIMAL(5, 2) NOT NULL,
    owner_wallet VARCHAR(44),
    purchase_price DECIMAL(10, 2),
    purchase_time TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (owner_wallet) REFERENCES users(wallet_address)
);

-- Treasury table
CREATE TABLE IF NOT EXISTS treasury (
    id SERIAL PRIMARY KEY,
    total_staked DECIMAL(20, 6) DEFAULT 0,
    total_yield_earned DECIMAL(20, 6) DEFAULT 0,
    platform_fee_basis_points INTEGER DEFAULT 500,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Rent claims table
CREATE TABLE IF NOT EXISTS rent_claims (
    id SERIAL PRIMARY KEY,
    land_id INTEGER NOT NULL,
    owner_wallet VARCHAR(44) NOT NULL,
    amount DECIMAL(20, 6) NOT NULL,
    claimed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    transaction_signature VARCHAR(100),
    FOREIGN KEY (land_id) REFERENCES land_parcels(id),
    FOREIGN KEY (owner_wallet) REFERENCES users(wallet_address)
);

-- Transactions table
CREATE TABLE IF NOT EXISTS transactions (
    id SERIAL PRIMARY KEY,
    type VARCHAR(50) NOT NULL CHECK (type IN ('buy', 'sell', 'claim')),
    land_id INTEGER,
    wallet_address VARCHAR(44) NOT NULL,
    amount_usd DECIMAL(20, 6) NOT NULL,
    signature VARCHAR(100) UNIQUE,
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'failed')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (land_id) REFERENCES land_parcels(id)
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_land_parcels_owner ON land_parcels(owner_wallet);
CREATE INDEX IF NOT EXISTS idx_land_parcels_rarity ON land_parcels(rarity);
CREATE INDEX IF NOT EXISTS idx_rent_claims_owner ON rent_claims(owner_wallet);
CREATE INDEX IF NOT EXISTS idx_transactions_wallet ON transactions(wallet_address);

-- Insert initial land parcels (sample)
INSERT INTO land_parcels (h3_index, lat, lng, name, rarity, price_usd, yield_annual) VALUES
('8529a3bffffffff', 40.7128, -74.0060, 'NYC-001', 'common', 100.00, 2.0),
('8545a537ffffffff', 34.0522, -118.2437, 'LA-001', 'common', 120.00, 2.0),
('85a1849bffffffff', 51.5074, -0.1278, 'LDN-001', 'common', 130.00, 2.0),
('85c3075bffffffff', 35.6762, 139.6503, 'TKY-001', 'common', 150.00, 2.0),
('85d4d4a3ffffffff', -33.8688, 151.2093, 'SYD-001', 'rare', 250.00, 3.0),
('85b5ce6bffffffff', -33.9249, 18.4241, 'CPT-001', 'rare', 220.00, 3.0),
('85c3441bffffffff', 1.3521, 103.8198, 'SGP-001', 'epic', 500.00, 4.0),
('857b59c3ffffffff', 64.9631, -19.0208, 'ICE-001', 'epic', 600.00, 4.0),
('85f4d4afffffffff', -75.2509, -0.0713, 'ANT-001', 'epic', 800.00, 4.0)
ON CONFLICT (h3_index) DO NOTHING;

-- Initialize treasury
INSERT INTO treasury (id, total_staked, total_yield_earned, platform_fee_basis_points)
VALUES (1, 0, 0, 500)
ON CONFLICT DO NOTHING;
