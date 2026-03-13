use anchor_lang::prelude::*;
use anchor_spl::token::{self, Token, TokenAccount, Mint};

declare_id!("Land111111111111111111111111111111111111111");

#[program]
pub mod land_nft {
    use super::*;

    // Initialize the land registry
    pub fn initialize(ctx: Context<Initialize>, name: String) -> Result<()> {
        let registry = &mut ctx.accounts.registry;
        registry.authority = ctx.accounts.authority.key();
        registry.name = name;
        registry.total_parcels = 0;
        registry.treasury = ctx.accounts.treasury.key();
        Ok(())
    }

    // Mint a new land parcel NFT
    pub fn mint_land(
        ctx: Context<MintLand>,
        location_lat: i64,
        location_lng: i64,
        rarity: u8,
        price: u64,
    ) -> Result<()> {
        let land = &mut ctx.accounts.land_account;
        let registry = &mut ctx.accounts.registry;
        
        land.owner = ctx.accounts.buyer.key();
        land.location_lat = location_lat;
        land.location_lng = location_lng;
        land.rarity = rarity;
        land.purchase_price = price;
        land.purchase_time = Clock::get()?.unix_timestamp;
        land.claimable_rent = 0;
        land.parcel_id = registry.total_parcels;
        
        registry.total_parcels += 1;
        
        msg!("Land parcel minted: {}", land.parcel_id);
        Ok(())
    }

    // Transfer land to new owner
    pub fn transfer_land(ctx: Context<TransferLand>) -> Result<()> {
        let land = &mut ctx.accounts.land_account;
        land.owner = ctx.accounts.new_owner.key();
        msg!("Land transferred to: {}", land.owner);
        Ok(())
    }

    // Update claimable rent
    pub fn update_rent(ctx: Context<UpdateRent>, amount: u64) -> Result<()> {
        let land = &mut ctx.accounts.land_account;
        land.claimable_rent += amount;
        Ok(())
    }

    // Claim accumulated rent
    pub fn claim_rent(ctx: Context<ClaimRent>) -> Result<()> {
        let land = &mut ctx.accounts.land_account;
        let amount = land.claimable_rent;
        
        require!(amount > 0, ErrorCode::NoRentToClaim);
        
        // Transfer rent from treasury to owner
        // (Actual transfer happens in treasury program)
        land.claimable_rent = 0;
        
        msg!("Rent claimed: {}", amount);
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(init, payer = authority, space = 8 + Registry::SIZE)]
    pub registry: Account<'info, Registry>,
    #[account(mut)]
    pub authority: Signer<'info>,
    /// CHECK: Treasury account
    pub treasury: AccountInfo<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct MintLand<'info> {
    #[account(mut)]
    pub registry: Account<'info, Registry>,
    #[account(
        init,
        payer = buyer,
        space = 8 + LandParcel::SIZE,
        seeds = [b"land", registry.key().as_ref(), &registry.total_parcels.to_le_bytes()],
        bump
    )]
    pub land_account: Account<'info, LandParcel>,
    #[account(mut)]
    pub buyer: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct TransferLand<'info> {
    #[account(mut, has_one = owner)]
    pub land_account: Account<'info, LandParcel>,
    pub owner: Signer<'info>,
    /// CHECK: New owner
    pub new_owner: AccountInfo<'info>,
}

#[derive(Accounts)]
pub struct UpdateRent<'info> {
    #[account(mut)]
    pub land_account: Account<'info, LandParcel>,
    pub authority: Signer<'info>,
}

#[derive(Accounts)]
pub struct ClaimRent<'info> {
    #[account(mut, has_one = owner)]
    pub land_account: Account<'info, LandParcel>,
    pub owner: Signer<'info>,
}

#[account]
pub struct Registry {
    pub authority: Pubkey,
    pub name: String,
    pub total_parcels: u64,
    pub treasury: Pubkey,
}

impl Registry {
    pub const SIZE: usize = 32 + 4 + 100 + 8 + 32; // pubkey + string prefix + name + u64 + pubkey
}

#[account]
pub struct LandParcel {
    pub owner: Pubkey,
    pub parcel_id: u64,
    pub location_lat: i64,  // scaled by 1e6
    pub location_lng: i64,  // scaled by 1e6
    pub rarity: u8,         // 0=common, 1=rare, 2=epic
    pub purchase_price: u64,
    pub purchase_time: i64,
    pub claimable_rent: u64,
}

impl LandParcel {
    pub const SIZE: usize = 32 + 8 + 8 + 8 + 1 + 8 + 8 + 8;
}

#[error_code]
pub enum ErrorCode {
    #[msg("No rent available to claim")]
    NoRentToClaim,
}
