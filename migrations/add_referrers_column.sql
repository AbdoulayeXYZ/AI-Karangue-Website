-- Migration: Add referrers column to analytics table
-- This migration adds a JSONB column to track traffic sources

-- Add the referrers column if it doesn't exist
ALTER TABLE analytics 
ADD COLUMN IF NOT EXISTS referrers JSONB DEFAULT '{}'::jsonb;

-- Create an index on the referrers column for better query performance
CREATE INDEX IF NOT EXISTS idx_analytics_referrers ON analytics USING GIN (referrers);

-- Verify the column was added
SELECT column_name, data_type, column_default 
FROM information_schema.columns 
WHERE table_name = 'analytics' AND column_name = 'referrers';
