-- Quick fix for newsletter metadata error
-- Copy and paste this into Supabase SQL Editor

ALTER TABLE public.newsletter_subscribers ADD COLUMN IF NOT EXISTS metadata JSONB DEFAULT '{}';
ALTER TABLE public.newsletter_subscribers ADD COLUMN IF NOT EXISTS source TEXT DEFAULT 'website';
ALTER TABLE public.newsletter_subscribers ADD COLUMN IF NOT EXISTS ip_address INET;
ALTER TABLE public.newsletter_subscribers ADD COLUMN IF NOT EXISTS user_agent TEXT;

UPDATE public.newsletter_subscribers SET metadata = '{}' WHERE metadata IS NULL;
