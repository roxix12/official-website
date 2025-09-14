-- ========================================
-- SIMPLE NEWSLETTER SCHEMA FIX
-- Fixes the metadata column error safely
-- ========================================

-- Add missing metadata column (safe if it already exists)
ALTER TABLE public.newsletter_subscribers 
ADD COLUMN IF NOT EXISTS metadata JSONB DEFAULT '{}';

-- Add source column for tracking
ALTER TABLE public.newsletter_subscribers 
ADD COLUMN IF NOT EXISTS source TEXT DEFAULT 'website';

-- Add IP tracking column
ALTER TABLE public.newsletter_subscribers 
ADD COLUMN IF NOT EXISTS ip_address INET;

-- Add user agent tracking
ALTER TABLE public.newsletter_subscribers 
ADD COLUMN IF NOT EXISTS user_agent TEXT;

-- Update any NULL metadata to empty JSON
UPDATE public.newsletter_subscribers 
SET metadata = '{}' 
WHERE metadata IS NULL;

-- Create index for metadata (only if it doesn't exist)
CREATE INDEX IF NOT EXISTS idx_newsletter_subscribers_metadata 
ON public.newsletter_subscribers USING GIN(metadata);

-- Create index for source
CREATE INDEX IF NOT EXISTS idx_newsletter_subscribers_source 
ON public.newsletter_subscribers(source);

-- Verify the fix worked
SELECT 'Newsletter schema fix completed!' as status;

-- Show the current table structure
SELECT column_name, data_type, is_nullable, column_default
FROM information_schema.columns 
WHERE table_name = 'newsletter_subscribers' 
  AND table_schema = 'public'
ORDER BY ordinal_position;
