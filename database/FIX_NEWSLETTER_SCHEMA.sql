-- ========================================
-- FIX NEWSLETTER SCHEMA - Add Missing Metadata Column
-- This adds the missing metadata column and fixes the newsletter system
-- ========================================

-- Add missing metadata column to newsletter_subscribers table
ALTER TABLE public.newsletter_subscribers 
ADD COLUMN IF NOT EXISTS metadata JSONB DEFAULT '{}';

-- Add missing columns for enhanced tracking (if they don't exist)
ALTER TABLE public.newsletter_subscribers 
ADD COLUMN IF NOT EXISTS source TEXT DEFAULT 'website';

ALTER TABLE public.newsletter_subscribers 
ADD COLUMN IF NOT EXISTS ip_address INET;

ALTER TABLE public.newsletter_subscribers 
ADD COLUMN IF NOT EXISTS user_agent TEXT;

-- Add indexes for the new columns
CREATE INDEX IF NOT EXISTS idx_newsletter_subscribers_metadata ON public.newsletter_subscribers USING GIN(metadata);
CREATE INDEX IF NOT EXISTS idx_newsletter_subscribers_source ON public.newsletter_subscribers(source);

-- Update existing subscribers to have empty metadata if null
UPDATE public.newsletter_subscribers 
SET metadata = '{}'::jsonb 
WHERE metadata IS NULL;

-- Add constraint to ensure metadata is valid JSON
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.table_constraints 
        WHERE constraint_name = 'newsletter_subscribers_metadata_check' 
        AND table_name = 'newsletter_subscribers'
    ) THEN
        ALTER TABLE public.newsletter_subscribers 
        ADD CONSTRAINT newsletter_subscribers_metadata_check 
        CHECK (metadata IS NOT NULL);
    END IF;
END $$;

-- Verify the schema is correct
SELECT 
    column_name, 
    data_type, 
    is_nullable, 
    column_default
FROM information_schema.columns 
WHERE table_name = 'newsletter_subscribers' 
    AND table_schema = 'public'
ORDER BY ordinal_position;

-- Test that the table structure is working
SELECT 'Newsletter schema fix completed successfully!' as status;

-- Show table structure
\d public.newsletter_subscribers;
