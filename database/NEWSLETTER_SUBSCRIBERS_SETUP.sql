-- Newsletter Subscribers Table Setup for CDW Burhan Portfolio
-- This script creates the table structure for storing newsletter subscribers
-- with Row Level Security (RLS) policies

-- Create subscribers table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.subscribers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT NOT NULL,
    source TEXT DEFAULT 'website',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create unique index on email (case-insensitive)
CREATE UNIQUE INDEX IF NOT EXISTS subscribers_email_lower_unique 
ON public.subscribers (LOWER(email));

-- Create index on created_at for performance
CREATE INDEX IF NOT EXISTS subscribers_created_at_idx 
ON public.subscribers (created_at DESC);

-- Create index on source for analytics
CREATE INDEX IF NOT EXISTS subscribers_source_idx 
ON public.subscribers (source);

-- Enable Row Level Security
ALTER TABLE public.subscribers ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "subscribers_anon_insert" ON public.subscribers;
DROP POLICY IF EXISTS "subscribers_public_select" ON public.subscribers;
DROP POLICY IF EXISTS "subscribers_admin_all" ON public.subscribers;

-- Allow anonymous users to INSERT only (for newsletter signup)
CREATE POLICY "subscribers_anon_insert"
ON public.subscribers
FOR INSERT
TO anon
WITH CHECK (true);

-- Deny anonymous users from SELECT (privacy protection)
CREATE POLICY "subscribers_public_select"
ON public.subscribers
FOR SELECT
TO anon
USING (false);

-- Allow authenticated service role full access (for admin/analytics)
CREATE POLICY "subscribers_admin_all"
ON public.subscribers
FOR ALL
TO service_role
USING (true)
WITH CHECK (true);

-- Optional: Create mail_logs table for email delivery tracking
CREATE TABLE IF NOT EXISTS public.mail_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    to_email TEXT NOT NULL,
    template TEXT NOT NULL,
    status TEXT NOT NULL CHECK (status IN ('sent', 'failed')),
    error_text TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index for mail logs
CREATE INDEX IF NOT EXISTS mail_logs_created_at_idx 
ON public.mail_logs (created_at DESC);

CREATE INDEX IF NOT EXISTS mail_logs_to_email_idx 
ON public.mail_logs (to_email);

CREATE INDEX IF NOT EXISTS mail_logs_status_idx 
ON public.mail_logs (status);

-- Enable RLS for mail_logs
ALTER TABLE public.mail_logs ENABLE ROW LEVEL SECURITY;

-- Allow service role full access to mail_logs
DROP POLICY IF EXISTS "mail_logs_service_all" ON public.mail_logs;
CREATE POLICY "mail_logs_service_all"
ON public.mail_logs
FOR ALL
TO service_role
USING (true)
WITH CHECK (true);

-- Deny public access to mail_logs
DROP POLICY IF EXISTS "mail_logs_public_deny" ON public.mail_logs;
CREATE POLICY "mail_logs_public_deny"
ON public.mail_logs
FOR ALL
TO anon, authenticated
USING (false)
WITH CHECK (false);

-- Create updated_at trigger function if it doesn't exist
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for subscribers table
DROP TRIGGER IF EXISTS update_subscribers_updated_at ON public.subscribers;
CREATE TRIGGER update_subscribers_updated_at
    BEFORE UPDATE ON public.subscribers
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Test the setup (run this after creating the tables)
/*
-- Test anonymous insert (should work)
INSERT INTO public.subscribers (email, source) 
VALUES ('test@example.com', 'website');

-- Test anonymous select (should fail due to RLS)
SELECT * FROM public.subscribers;

-- Check if policies are working
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual, with_check
FROM pg_policies 
WHERE tablename IN ('subscribers', 'mail_logs');
*/

-- Grant necessary permissions
GRANT USAGE ON SCHEMA public TO anon, authenticated, service_role;
GRANT INSERT ON public.subscribers TO anon;
GRANT ALL ON public.subscribers TO service_role;
GRANT ALL ON public.mail_logs TO service_role;

-- Success message
DO $$
BEGIN
    RAISE NOTICE 'Newsletter subscribers table setup completed successfully!';
    RAISE NOTICE 'Tables created: subscribers, mail_logs';
    RAISE NOTICE 'RLS policies applied for security';
    RAISE NOTICE 'Ready for Edge Function integration';
END $$;
