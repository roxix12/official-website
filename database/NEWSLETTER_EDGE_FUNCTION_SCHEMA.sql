-- ==============================================
-- NEWSLETTER EDGE FUNCTION DATABASE SCHEMA
-- Optimized for Supabase Edge Functions + SMTP
-- ==============================================

-- Drop existing tables and policies (clean start)
DROP TABLE IF EXISTS public.mail_logs CASCADE;
DROP TABLE IF EXISTS public.subscribers CASCADE;

-- Create subscribers table
CREATE TABLE public.subscribers (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    email TEXT NOT NULL,
    source TEXT DEFAULT 'website' CHECK (source IN ('website', 'admin')),
    confirmed BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create unique index on lowercase email
CREATE UNIQUE INDEX idx_subscribers_email_lower ON public.subscribers (LOWER(email));

-- Create mail_logs table for tracking email delivery
CREATE TABLE public.mail_logs (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    to_email TEXT NOT NULL,
    template TEXT NOT NULL, -- 'welcome', 'admin_notification'
    status TEXT NOT NULL CHECK (status IN ('sent', 'failed')),
    error_text TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for performance
CREATE INDEX idx_subscribers_source ON public.subscribers (source);
CREATE INDEX idx_subscribers_confirmed ON public.subscribers (confirmed);
CREATE INDEX idx_subscribers_created_at ON public.subscribers (created_at);
CREATE INDEX idx_mail_logs_status ON public.mail_logs (status);
CREATE INDEX idx_mail_logs_template ON public.mail_logs (template);
CREATE INDEX idx_mail_logs_created_at ON public.mail_logs (created_at);
CREATE INDEX idx_mail_logs_to_email ON public.mail_logs (to_email);

-- Enable Row Level Security
ALTER TABLE public.subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.mail_logs ENABLE ROW LEVEL SECURITY;

-- ==============================================
-- RLS POLICIES FOR SUBSCRIBERS
-- ==============================================

-- Allow anonymous users to insert (subscribe) but not read
CREATE POLICY "Allow anonymous subscribe" ON public.subscribers
    FOR INSERT 
    TO anon
    WITH CHECK (true);

-- Deny anonymous users from reading subscribers
CREATE POLICY "Deny anonymous read subscribers" ON public.subscribers
    FOR SELECT 
    TO anon
    USING (false);

-- Allow authenticated users (admin) full access
CREATE POLICY "Allow authenticated full access to subscribers" ON public.subscribers
    FOR ALL 
    TO authenticated
    USING (true)
    WITH CHECK (true);

-- Allow service role full access (for Edge Functions)
CREATE POLICY "Allow service role full access to subscribers" ON public.subscribers
    FOR ALL 
    TO service_role
    USING (true)
    WITH CHECK (true);

-- ==============================================
-- RLS POLICIES FOR MAIL_LOGS
-- ==============================================

-- Deny anonymous access to mail logs
CREATE POLICY "Deny anonymous access to mail_logs" ON public.mail_logs
    FOR ALL 
    TO anon
    USING (false);

-- Allow authenticated users (admin) to read mail logs
CREATE POLICY "Allow authenticated read mail_logs" ON public.mail_logs
    FOR SELECT 
    TO authenticated
    USING (true);

-- Allow service role full access (for Edge Functions)
CREATE POLICY "Allow service role full access to mail_logs" ON public.mail_logs
    FOR ALL 
    TO service_role
    USING (true)
    WITH CHECK (true);

-- ==============================================
-- GRANT PERMISSIONS
-- ==============================================

-- Grant necessary permissions to roles
GRANT USAGE ON SCHEMA public TO anon, authenticated, service_role;
GRANT INSERT ON public.subscribers TO anon;
GRANT ALL ON public.subscribers TO authenticated, service_role;
GRANT SELECT ON public.mail_logs TO authenticated;
GRANT ALL ON public.mail_logs TO service_role;

-- ==============================================
-- HELPER FUNCTIONS
-- ==============================================

-- Function to get subscriber stats (admin only)
CREATE OR REPLACE FUNCTION get_subscriber_stats()
RETURNS JSON
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    result JSON;
BEGIN
    -- Check if user is authenticated
    IF auth.role() != 'authenticated' THEN
        RAISE EXCEPTION 'Access denied';
    END IF;

    SELECT json_build_object(
        'total_subscribers', COUNT(*),
        'confirmed_subscribers', COUNT(*) FILTER (WHERE confirmed = true),
        'unconfirmed_subscribers', COUNT(*) FILTER (WHERE confirmed = false),
        'website_signups', COUNT(*) FILTER (WHERE source = 'website'),
        'admin_signups', COUNT(*) FILTER (WHERE source = 'admin'),
        'last_updated', NOW()
    )
    INTO result
    FROM public.subscribers;

    RETURN result;
END;
$$;

-- Function to get email delivery stats (admin only)
CREATE OR REPLACE FUNCTION get_email_stats(days_back INTEGER DEFAULT 30)
RETURNS JSON
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    result JSON;
BEGIN
    -- Check if user is authenticated
    IF auth.role() != 'authenticated' THEN
        RAISE EXCEPTION 'Access denied';
    END IF;

    SELECT json_build_object(
        'total_emails', COUNT(*),
        'sent_emails', COUNT(*) FILTER (WHERE status = 'sent'),
        'failed_emails', COUNT(*) FILTER (WHERE status = 'failed'),
        'welcome_emails', COUNT(*) FILTER (WHERE template = 'welcome'),
        'admin_notifications', COUNT(*) FILTER (WHERE template = 'admin_notification'),
        'success_rate', 
            CASE 
                WHEN COUNT(*) > 0 THEN 
                    ROUND((COUNT(*) FILTER (WHERE status = 'sent')::numeric / COUNT(*)::numeric) * 100, 2)
                ELSE 0 
            END,
        'date_range', json_build_object(
            'from', (NOW() - INTERVAL '1 day' * days_back)::date,
            'to', NOW()::date
        )
    )
    INTO result
    FROM public.mail_logs
    WHERE created_at >= NOW() - INTERVAL '1 day' * days_back;

    RETURN result;
END;
$$;

-- ==============================================
-- REALTIME SUBSCRIPTIONS
-- ==============================================

-- Enable realtime for admin dashboard
ALTER PUBLICATION supabase_realtime ADD TABLE public.subscribers;
ALTER PUBLICATION supabase_realtime ADD TABLE public.mail_logs;

-- ==============================================
-- TEST DATA (OPTIONAL)
-- ==============================================

-- Insert test subscriber (remove in production)
INSERT INTO public.subscribers (email, source, confirmed) 
VALUES ('test@example.com', 'website', false)
ON CONFLICT (LOWER(email)) DO NOTHING;

-- ==============================================
-- VERIFICATION QUERIES
-- ==============================================

-- Verify setup
SELECT 
    'subscribers' as table_name,
    COUNT(*) as row_count
FROM public.subscribers

UNION ALL

SELECT 
    'mail_logs' as table_name,
    COUNT(*) as row_count
FROM public.mail_logs;

-- Show table structures
SELECT 
    table_name,
    column_name,
    data_type,
    is_nullable,
    column_default
FROM information_schema.columns 
WHERE table_schema = 'public' 
    AND table_name IN ('subscribers', 'mail_logs')
ORDER BY table_name, ordinal_position;

-- Show RLS policies
SELECT 
    schemaname,
    tablename,
    policyname,
    roles,
    cmd,
    qual
FROM pg_policies 
WHERE schemaname = 'public' 
    AND tablename IN ('subscribers', 'mail_logs')
ORDER BY tablename, policyname;

SELECT 'Newsletter Edge Function schema setup completed successfully!' as status;
