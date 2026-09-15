-- ============================================
-- MIGRATION: Enhance payment_methods table
-- Run this in Supabase SQL Editor
-- ============================================

-- Add new columns
ALTER TABLE payment_methods ADD COLUMN IF NOT EXISTS type TEXT NOT NULL DEFAULT 'transfer';
ALTER TABLE payment_methods ADD COLUMN IF NOT EXISTS account_number TEXT;
ALTER TABLE payment_methods ADD COLUMN IF NOT EXISTS account_name TEXT;
ALTER TABLE payment_methods ADD COLUMN IF NOT EXISTS qris_image TEXT;
ALTER TABLE payment_methods ADD COLUMN IF NOT EXISTS is_active BOOLEAN DEFAULT TRUE;
ALTER TABLE payment_methods ADD COLUMN IF NOT EXISTS icon TEXT;

-- Migrate existing QRIS data
UPDATE payment_methods SET type = 'qris' WHERE category = 'qris';
UPDATE payment_methods SET type = 'transfer' WHERE category != 'qris';
