-- ========================================
-- MODERN NEWSLETTER SYSTEM DATABASE SETUP
-- Clean, working newsletter system
-- ========================================

-- Drop existing policies to recreate them properly
DROP POLICY IF EXISTS "Allow public newsletter subscription" ON public.newsletter_subscribers;
DROP POLICY IF EXISTS "Allow authenticated users to manage subscribers" ON public.newsletter_subscribers;
DROP POLICY IF EXISTS "Allow authenticated users to manage campaigns" ON public.newsletter_campaigns;
DROP POLICY IF EXISTS "Allow authenticated users to manage email logs" ON public.newsletter_email_logs;

-- Ensure tables exist with correct structure
CREATE TABLE IF NOT EXISTS public.newsletter_subscribers (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    email TEXT NOT NULL UNIQUE,
    name TEXT,
    is_active BOOLEAN DEFAULT true,
    subscribed_at TIMESTAMPTZ DEFAULT NOW(),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.newsletter_campaigns (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    subject TEXT NOT NULL,
    content TEXT,
    status TEXT DEFAULT 'draft',
    sent_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.newsletter_email_logs (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    subscriber_id UUID REFERENCES public.newsletter_subscribers(id),
    email_type TEXT NOT NULL, -- 'welcome', 'blog_notification', 'project_notification'
    subject TEXT,
    status TEXT NOT NULL, -- 'sent', 'failed'
    error_message TEXT,
    metadata JSONB,
    sent_at TIMESTAMPTZ DEFAULT NOW(),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS on all tables
ALTER TABLE public.newsletter_subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.newsletter_campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.newsletter_email_logs ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for newsletter_subscribers
-- Allow public to insert (subscribe) and select their own
CREATE POLICY "Allow public newsletter subscription" ON public.newsletter_subscribers
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public to read subscribers" ON public.newsletter_subscribers
    FOR SELECT USING (true);

CREATE POLICY "Allow authenticated users to manage subscribers" ON public.newsletter_subscribers
    FOR ALL USING (auth.role() = 'authenticated');

-- Create RLS policies for newsletter_campaigns
-- Only authenticated users (admin) can manage campaigns
CREATE POLICY "Allow authenticated users to manage campaigns" ON public.newsletter_campaigns
    FOR ALL USING (auth.role() = 'authenticated');

-- Create RLS policies for newsletter_email_logs
-- Only authenticated users (admin) can manage email logs
CREATE POLICY "Allow authenticated users to manage email logs" ON public.newsletter_email_logs
    FOR ALL USING (auth.role() = 'authenticated');

-- Allow public to insert email logs (for logging purposes)
CREATE POLICY "Allow public to insert email logs" ON public.newsletter_email_logs
    FOR INSERT WITH CHECK (true);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_newsletter_subscribers_email ON public.newsletter_subscribers(email);
CREATE INDEX IF NOT EXISTS idx_newsletter_subscribers_active ON public.newsletter_subscribers(is_active);
CREATE INDEX IF NOT EXISTS idx_newsletter_subscribers_created ON public.newsletter_subscribers(created_at);
CREATE INDEX IF NOT EXISTS idx_newsletter_email_logs_subscriber ON public.newsletter_email_logs(subscriber_id);
CREATE INDEX IF NOT EXISTS idx_newsletter_email_logs_type ON public.newsletter_email_logs(email_type);
CREATE INDEX IF NOT EXISTS idx_newsletter_email_logs_status ON public.newsletter_email_logs(status);
CREATE INDEX IF NOT EXISTS idx_newsletter_email_logs_created ON public.newsletter_email_logs(created_at);

-- Ensure realtime is enabled for the newsletter_subscribers table
ALTER PUBLICATION supabase_realtime ADD TABLE public.newsletter_subscribers;
ALTER PUBLICATION supabase_realtime ADD TABLE public.newsletter_campaigns;
ALTER PUBLICATION supabase_realtime ADD TABLE public.newsletter_email_logs;

-- Insert a test subscriber if none exist (optional)
INSERT INTO public.newsletter_subscribers (email, name, is_active) 
SELECT 'cdwburhan@gmail.com', 'CDW Burhan', true
WHERE NOT EXISTS (SELECT 1 FROM public.newsletter_subscribers WHERE email = 'cdwburhan@gmail.com');

-- Create a function to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers to automatically update the updated_at column
DROP TRIGGER IF EXISTS update_newsletter_subscribers_updated_at ON public.newsletter_subscribers;
CREATE TRIGGER update_newsletter_subscribers_updated_at
    BEFORE UPDATE ON public.newsletter_subscribers
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_newsletter_campaigns_updated_at ON public.newsletter_campaigns;
CREATE TRIGGER update_newsletter_campaigns_updated_at
    BEFORE UPDATE ON public.newsletter_campaigns
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Grant necessary permissions
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL ON public.newsletter_subscribers TO anon, authenticated;
GRANT ALL ON public.newsletter_campaigns TO authenticated;
GRANT ALL ON public.newsletter_email_logs TO anon, authenticated;

-- Verify the setup
SELECT 'Newsletter system setup completed successfully!' as status;

-- Show current subscriber count
SELECT 
    COUNT(*) as total_subscribers,
    COUNT(*) FILTER (WHERE is_active = true) as active_subscribers,
    COUNT(*) FILTER (WHERE is_active = false) as inactive_subscribers
FROM public.newsletter_subscribers;
