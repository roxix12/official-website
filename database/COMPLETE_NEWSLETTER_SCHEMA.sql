-- ========================================
-- COMPLETE NEWSLETTER SYSTEM SCHEMA
-- Updated schema with all required columns for business email integration
-- ========================================

-- Drop existing tables if they exist (be careful in production!)
-- Comment out these lines if you want to preserve existing data
-- DROP TABLE IF EXISTS public.newsletter_email_logs CASCADE;
-- DROP TABLE IF EXISTS public.newsletter_campaigns CASCADE;
-- DROP TABLE IF EXISTS public.newsletter_subscribers CASCADE;

-- Create newsletter_subscribers table with all required columns
CREATE TABLE IF NOT EXISTS public.newsletter_subscribers (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    email TEXT NOT NULL UNIQUE,
    name TEXT,
    is_active BOOLEAN DEFAULT true,
    subscribed_at TIMESTAMPTZ DEFAULT NOW(),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    
    -- Enhanced metadata columns
    metadata JSONB DEFAULT '{}',
    source TEXT DEFAULT 'website',
    ip_address INET,
    user_agent TEXT,
    
    -- Preferences
    preferences JSONB DEFAULT '{"frequency": "weekly", "format": "html"}',
    tags TEXT[] DEFAULT ARRAY[]::TEXT[]
);

-- Create newsletter_campaigns table
CREATE TABLE IF NOT EXISTS public.newsletter_campaigns (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    subject TEXT NOT NULL,
    content TEXT,
    html_content TEXT,
    status TEXT DEFAULT 'draft', -- 'draft', 'sending', 'sent', 'failed'
    scheduled_at TIMESTAMPTZ,
    sent_at TIMESTAMPTZ,
    recipient_count INTEGER DEFAULT 0,
    open_count INTEGER DEFAULT 0,
    click_count INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create newsletter_email_logs table
CREATE TABLE IF NOT EXISTS public.newsletter_email_logs (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    subscriber_id UUID REFERENCES public.newsletter_subscribers(id) ON DELETE CASCADE,
    campaign_id UUID REFERENCES public.newsletter_campaigns(id) ON DELETE SET NULL,
    recipient_email TEXT NOT NULL,
    email_type TEXT NOT NULL, -- 'welcome', 'blog_notification', 'project_notification', 'campaign'
    subject TEXT,
    status TEXT NOT NULL, -- 'sent', 'failed', 'delivered', 'opened', 'clicked'
    error_message TEXT,
    metadata JSONB DEFAULT '{}',
    method TEXT DEFAULT 'smtp', -- 'smtp', 'emailjs', 'advanced_form'
    sent_at TIMESTAMPTZ DEFAULT NOW(),
    delivered_at TIMESTAMPTZ,
    opened_at TIMESTAMPTZ,
    clicked_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create unsubscribe_requests table for tracking unsubscribe attempts
CREATE TABLE IF NOT EXISTS public.newsletter_unsubscribe_requests (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    email TEXT NOT NULL,
    reason TEXT,
    feedback TEXT,
    ip_address INET,
    user_agent TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS on all tables
ALTER TABLE public.newsletter_subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.newsletter_campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.newsletter_email_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.newsletter_unsubscribe_requests ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for newsletter_subscribers
DROP POLICY IF EXISTS "Allow public newsletter subscription" ON public.newsletter_subscribers;
DROP POLICY IF EXISTS "Allow public to read subscribers" ON public.newsletter_subscribers;
DROP POLICY IF EXISTS "Allow authenticated users to manage subscribers" ON public.newsletter_subscribers;

CREATE POLICY "Allow public newsletter subscription" ON public.newsletter_subscribers
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public to read subscribers" ON public.newsletter_subscribers
    FOR SELECT USING (true);

CREATE POLICY "Allow public to update subscribers" ON public.newsletter_subscribers
    FOR UPDATE USING (true);

CREATE POLICY "Allow authenticated users to manage subscribers" ON public.newsletter_subscribers
    FOR ALL USING (auth.role() = 'authenticated');

-- Create RLS policies for newsletter_campaigns
DROP POLICY IF EXISTS "Allow authenticated users to manage campaigns" ON public.newsletter_campaigns;
CREATE POLICY "Allow authenticated users to manage campaigns" ON public.newsletter_campaigns
    FOR ALL USING (auth.role() = 'authenticated');

-- Create RLS policies for newsletter_email_logs
DROP POLICY IF EXISTS "Allow authenticated users to manage email logs" ON public.newsletter_email_logs;
DROP POLICY IF EXISTS "Allow public to insert email logs" ON public.newsletter_email_logs;

CREATE POLICY "Allow public to insert email logs" ON public.newsletter_email_logs
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public to read email logs" ON public.newsletter_email_logs
    FOR SELECT USING (true);

CREATE POLICY "Allow authenticated users to manage email logs" ON public.newsletter_email_logs
    FOR ALL USING (auth.role() = 'authenticated');

-- Create RLS policies for unsubscribe_requests
CREATE POLICY "Allow public to insert unsubscribe requests" ON public.newsletter_unsubscribe_requests
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow authenticated users to manage unsubscribe requests" ON public.newsletter_unsubscribe_requests
    FOR ALL USING (auth.role() = 'authenticated');

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_newsletter_subscribers_email ON public.newsletter_subscribers(email);
CREATE INDEX IF NOT EXISTS idx_newsletter_subscribers_active ON public.newsletter_subscribers(is_active);
CREATE INDEX IF NOT EXISTS idx_newsletter_subscribers_created ON public.newsletter_subscribers(created_at);
CREATE INDEX IF NOT EXISTS idx_newsletter_subscribers_source ON public.newsletter_subscribers(source);
CREATE INDEX IF NOT EXISTS idx_newsletter_subscribers_metadata ON public.newsletter_subscribers USING GIN(metadata);
CREATE INDEX IF NOT EXISTS idx_newsletter_subscribers_tags ON public.newsletter_subscribers USING GIN(tags);

CREATE INDEX IF NOT EXISTS idx_newsletter_campaigns_status ON public.newsletter_campaigns(status);
CREATE INDEX IF NOT EXISTS idx_newsletter_campaigns_created ON public.newsletter_campaigns(created_at);
CREATE INDEX IF NOT EXISTS idx_newsletter_campaigns_scheduled ON public.newsletter_campaigns(scheduled_at);

CREATE INDEX IF NOT EXISTS idx_newsletter_email_logs_subscriber ON public.newsletter_email_logs(subscriber_id);
CREATE INDEX IF NOT EXISTS idx_newsletter_email_logs_campaign ON public.newsletter_email_logs(campaign_id);
CREATE INDEX IF NOT EXISTS idx_newsletter_email_logs_type ON public.newsletter_email_logs(email_type);
CREATE INDEX IF NOT EXISTS idx_newsletter_email_logs_status ON public.newsletter_email_logs(status);
CREATE INDEX IF NOT EXISTS idx_newsletter_email_logs_email ON public.newsletter_email_logs(recipient_email);
CREATE INDEX IF NOT EXISTS idx_newsletter_email_logs_created ON public.newsletter_email_logs(created_at);

CREATE INDEX IF NOT EXISTS idx_newsletter_unsubscribe_email ON public.newsletter_unsubscribe_requests(email);
CREATE INDEX IF NOT EXISTS idx_newsletter_unsubscribe_created ON public.newsletter_unsubscribe_requests(created_at);

-- Create functions for updating timestamps
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

-- Create function to get subscriber stats
CREATE OR REPLACE FUNCTION get_newsletter_stats()
RETURNS JSON AS $$
DECLARE
    result JSON;
BEGIN
    SELECT json_build_object(
        'total_subscribers', COUNT(*),
        'active_subscribers', COUNT(*) FILTER (WHERE is_active = true),
        'inactive_subscribers', COUNT(*) FILTER (WHERE is_active = false),
        'subscribers_today', COUNT(*) FILTER (WHERE created_at >= CURRENT_DATE),
        'subscribers_this_week', COUNT(*) FILTER (WHERE created_at >= CURRENT_DATE - INTERVAL '7 days'),
        'subscribers_this_month', COUNT(*) FILTER (WHERE created_at >= CURRENT_DATE - INTERVAL '30 days'),
        'top_sources', (
            SELECT json_agg(json_build_object('source', source, 'count', count))
            FROM (
                SELECT source, COUNT(*) as count
                FROM newsletter_subscribers
                WHERE source IS NOT NULL
                GROUP BY source
                ORDER BY count DESC
                LIMIT 5
            ) s
        )
    ) INTO result
    FROM newsletter_subscribers;
    
    RETURN result;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Enable realtime for the tables
ALTER PUBLICATION supabase_realtime ADD TABLE public.newsletter_subscribers;
ALTER PUBLICATION supabase_realtime ADD TABLE public.newsletter_campaigns;
ALTER PUBLICATION supabase_realtime ADD TABLE public.newsletter_email_logs;

-- Grant necessary permissions
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL ON public.newsletter_subscribers TO anon, authenticated;
GRANT ALL ON public.newsletter_campaigns TO authenticated;
GRANT ALL ON public.newsletter_email_logs TO anon, authenticated;
GRANT ALL ON public.newsletter_unsubscribe_requests TO anon, authenticated;

-- Grant execute permission on the stats function
GRANT EXECUTE ON FUNCTION get_newsletter_stats() TO anon, authenticated;

-- Insert test data (only if no subscribers exist)
INSERT INTO public.newsletter_subscribers (email, name, is_active, source, metadata) 
SELECT 
    'info@codewithburhan.com', 
    'CDW Burhan', 
    true, 
    'admin',
    '{"test": true, "admin_account": true}'::jsonb
WHERE NOT EXISTS (
    SELECT 1 FROM public.newsletter_subscribers 
    WHERE email = 'info@codewithburhan.com'
);

-- Verify the setup
SELECT 'Complete newsletter system setup completed successfully!' as status;

-- Show current statistics
SELECT get_newsletter_stats() as current_stats;

-- Show table structure
SELECT 
    table_name,
    column_name,
    data_type,
    is_nullable,
    column_default
FROM information_schema.columns 
WHERE table_schema = 'public' 
    AND table_name LIKE 'newsletter_%'
ORDER BY table_name, ordinal_position;
