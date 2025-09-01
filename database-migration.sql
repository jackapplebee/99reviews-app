-- Database migration to add enhanced business data fields
-- Run this in your Neon PostgreSQL console

-- Add new columns to businesses table
ALTER TABLE businesses 
ADD COLUMN IF NOT EXISTS "businessType" VARCHAR(255),
ADD COLUMN IF NOT EXISTS "phoneNumber" VARCHAR(255),
ADD COLUMN IF NOT EXISTS "address" VARCHAR(255),
ADD COLUMN IF NOT EXISTS "city" VARCHAR(255),
ADD COLUMN IF NOT EXISTS "state" VARCHAR(255),
ADD COLUMN IF NOT EXISTS "zipCode" VARCHAR(255),
ADD COLUMN IF NOT EXISTS "googleBusinessUrl" VARCHAR(500),
ADD COLUMN IF NOT EXISTS "monthlyCustomers" VARCHAR(255),
ADD COLUMN IF NOT EXISTS "primaryGoals" TEXT,
ADD COLUMN IF NOT EXISTS "websiteUrl" VARCHAR(500);

-- Remove email column from businesses table (not needed anymore)
ALTER TABLE businesses DROP COLUMN IF EXISTS email;

-- Add new columns to users table
ALTER TABLE users 
ADD COLUMN IF NOT EXISTS "role" VARCHAR(50) DEFAULT 'USER',
ADD COLUMN IF NOT EXISTS "businessSlug" VARCHAR(255);

-- Rename passwordHash to password if it exists
ALTER TABLE users RENAME COLUMN "passwordHash" TO "password";

-- Update existing users to have businessSlug (if any exist)
-- This will need to be done manually if you have existing data
-- UPDATE users SET "businessSlug" = (SELECT slug FROM businesses WHERE id = users."businessId") WHERE "businessSlug" IS NULL;