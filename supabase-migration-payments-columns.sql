-- Add missing columns to payment_methods
ALTER TABLE payment_methods ADD COLUMN IF NOT EXISTS type TEXT NOT NULL DEFAULT 'transfer';
ALTER TABLE payment_methods ADD COLUMN IF NOT EXISTS account_number TEXT;
ALTER TABLE payment_methods ADD COLUMN IF NOT EXISTS account_name TEXT;
ALTER TABLE payment_methods ADD COLUMN IF NOT EXISTS qris_image TEXT;
ALTER TABLE payment_methods ADD COLUMN IF NOT EXISTS is_active BOOLEAN NOT NULL DEFAULT TRUE;
ALTER TABLE payment_methods ADD COLUMN IF NOT EXISTS icon TEXT;

-- Update existing QRIS record to have type=qris
UPDATE payment_methods SET type = 'qris' WHERE category = 'qris';
