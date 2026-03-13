use anchor_lang::prelude::*;
use anchor_spl::token::{self, Token, TokenAccount, Transfer};

declare_id!("Treas11111111111111111111111111111111111111");

#[program]
pub mod treasury {
    use super::*;

    // Initialize treasury
    pub fn initialize(
        ctx: Context<InitializeTreasury>,
        platform_fee_basis_points: u16,
    ) -> Result<()> {
        let treasury = &mut ctx.accounts.treasury_account;
        treasury.authority = ctx.accounts.authority.key();
        treasury.usdc_mint = ctx.accounts.usdc_mint.key();
        treasury.total_staked = 0;
        treasury.total_yield_earned = 0;
        treasury.platform_fee_bp = platform_fee_basis_points;
        treasury.bump = ctx.bumps.treasury_account;
        
        msg!("Treasury initialized");
        Ok(())
    }

    // Buy land - user sends USDC to treasury
    pub fn buy_land(
        ctx: Context<BuyLand>,
        amount: u64,
    ) -> Result<()> {
        // Transfer USDC from buyer to treasury
        let cpi_accounts = Transfer {
            from: ctx.accounts.buyer_usdc.to_account_info(),
            to: ctx.accounts.treasury_usdc.to_account_info(),
            authority: ctx.accounts.buyer.to_account_info(),
        };
        let cpi_program = ctx.accounts.token_program.to_account_info();
        let cpi_ctx = CpiContext::new(cpi_program, cpi_accounts);
        
        token::transfer(cpi_ctx, amount)?;
        
        // Update treasury state
        let treasury = &mut ctx.accounts.treasury_account;
        treasury.total_staked += amount;
        
        msg!("Land purchased: {} USDC", amount);
        Ok(())
    }

    // Sell land back to protocol
    pub fn sell_land(
        ctx: Context<SellLand>,
        amount: u64,
    ) -> Result<()> {
        let treasury = &ctx.accounts.treasury_account;
        let fee = amount * treasury.platform_fee_bp as u64 / 10000;
        let payout = amount - fee;
        
        // Transfer USDC from treasury to seller
        let treasury_key = treasury.key();
        let seeds = &[
            b"treasury",
            treasury_key.as_ref(),
            &[treasury.bump],
        ];
        let signer = &[&seeds[..]];
        
        let cpi_accounts = Transfer {
            from: ctx.accounts.treasury_usdc.to_account_info(),
            to: ctx.accounts.seller_usdc.to_account_info(),
            authority: ctx.accounts.treasury_account.to_account_info(),
        };
        let cpi_program = ctx.accounts.token_program.to_account_info();
        let cpi_ctx = CpiContext::new_with_signer(cpi_program, cpi_accounts, signer);
        
        token::transfer(cpi_ctx, payout)?;
        
        // Update treasury state
        let treasury = &mut ctx.accounts.treasury_account;
        treasury.total_staked -= amount;
        
        msg!("Land sold: {} USDC (fee: {})", payout, fee);
        Ok(())
    }

    // Distribute rent to land owner
    pub fn distribute_rent(
        ctx: Context<DistributeRent>,
        amount: u64,
    ) -> Result<()> {
        let treasury = &ctx.accounts.treasury_account;
        
        // Transfer rent from treasury yield to owner
        let treasury_key = treasury.key();
        let seeds = &[
            b"treasury",
            treasury_key.as_ref(),
            &[treasury.bump],
        ];
        let signer = &[&seeds[..]];
        
        let cpi_accounts = Transfer {
            from: ctx.accounts.treasury_usdc.to_account_info(),
            to: ctx.accounts.owner_usdc.to_account_info(),
            authority: ctx.accounts.treasury_account.to_account_info(),
        };
        let cpi_program = ctx.accounts.token_program.to_account_info();
        let cpi_ctx = CpiContext::new_with_signer(cpi_program, cpi_accounts, signer);
        
        token::transfer(cpi_ctx, amount)?;
        
        msg!("Rent distributed: {} USDC", amount);
        Ok(())
    }

    // Harvest yield from external protocols (simulated)
    pub fn harvest_yield(
        ctx: Context<HarvestYield>,
        amount: u64,
    ) -> Result<()> {
        let treasury = &mut ctx.accounts.treasury_account;
        treasury.total_yield_earned += amount;
        
        msg!("Yield harvested: {} USDC", amount);
        Ok(())
    }
}

#[derive(Accounts)]
pub struct InitializeTreasury<'info> {
    #[account(
        init,
        payer = authority,
        space = 8 + TreasuryAccount::SIZE,
        seeds = [b"treasury"],
        bump
    )]
    pub treasury_account: Account<'info, TreasuryAccount>,
    #[account(mut)]
    pub authority: Signer<'info>,
    pub usdc_mint: Account<'info, Mint>,
    #[account(
        init,
        payer = authority,
        token::mint = usdc_mint,
        token::authority = treasury_account,
        seeds = [b"treasury_usdc"],
        bump
    )]
    pub treasury_usdc: Account<'info, TokenAccount>,
    pub token_program: Program<'info, Token>,
    pub system_program: Program<'info, System>,
    pub rent: Sysvar<'info, Rent>,
}

#[derive(Accounts)]
pub struct BuyLand<'info> {
    #[account(mut)]
    pub treasury_account: Account<'info, TreasuryAccount>,
    #[account(mut)]
    pub buyer: Signer<'info>,
    #[account(mut)]
    pub buyer_usdc: Account<'info, TokenAccount>,
    #[account(mut)]
    pub treasury_usdc: Account<'info, TokenAccount>,
    pub token_program: Program<'info, Token>,
}

#[derive(Accounts)]
pub struct SellLand<'info> {
    #[account(mut)]
    pub treasury_account: Account<'info, TreasuryAccount>,
    #[account(mut)]
    pub seller: Signer<'info>,
    #[account(mut)]
    pub seller_usdc: Account<'info, TokenAccount>,
    #[account(mut)]
    pub treasury_usdc: Account<'info, TokenAccount>,
    pub token_program: Program<'info, Token>,
}

#[derive(Accounts)]
pub struct DistributeRent<'info> {
    #[account(mut)]
    pub treasury_account: Account<'info, TreasuryAccount>,
    #[account(mut)]
    pub owner_usdc: Account<'info, TokenAccount>,
    #[account(mut)]
    pub treasury_usdc: Account<'info, TokenAccount>,
    pub token_program: Program<'info, Token>,
}

#[derive(Accounts)]
pub struct HarvestYield<'info> {
    #[account(mut)]
    pub treasury_account: Account<'info, TreasuryAccount>,
    pub authority: Signer<'info>,
}

#[account]
pub struct TreasuryAccount {
    pub authority: Pubkey,
    pub usdc_mint: Pubkey,
    pub total_staked: u64,
    pub total_yield_earned: u64,
    pub platform_fee_bp: u16,  // basis points (100 = 1%)
    pub bump: u8,
}

impl TreasuryAccount {
    pub const SIZE: usize = 32 + 32 + 8 + 8 + 2 + 1;
}
