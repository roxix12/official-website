-- ========================================
-- FIX IS_ACTIVE COLUMN ERROR
-- Add missing is_active column to existing table
-- ========================================

-- Check current table structure first
SELECT column_name, data_type, is_nullable, column_default
FROM information_schema.columns 
WHERE table_name = 'newsletter_subscribers' 
AND table_schema = 'public'
ORDER BY ordinal_position;

-- Add is_active column if it doesn't exist
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'newsletter_subscribers' 
        AND column_name = 'is_active'
        AND table_schema = 'public'
    ) THEN
        ALTER TABLE public.newsletter_subscribers 
        ADD COLUMN is_active BOOLEAN DEFAULT true;
        
        -- Update all existing subscribers to be active
        UPDATE public.newsletter_subscribers 
        SET is_active = true 
        WHERE is_active IS NULL;
        
        RAISE NOTICE 'Added is_active column to newsletter_subscribers table';
    ELSE
        RAISE NOTICE 'is_active column already exists';
    END IF;
END $$;

-- Add other missing columns if they don't exist
DO $$ 
BEGIN
    -- Add name column if missing
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'newsletter_subscribers' 
        AND column_name = 'name'
        AND table_schema = 'public'
    ) THEN
        ALTER TABLE public.newsletter_subscribers 
        ADD COLUMN name TEXT;
        RAISE NOTICE 'Added name column to newsletter_subscribers table';
    END IF;
    
    -- Add subscribed_at column if missing
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'newsletter_subscribers' 
        AND column_name = 'subscribed_at'
        AND table_schema = 'public'
    ) THEN
        ALTER TABLE public.newsletter_subscribers 
        ADD COLUMN subscribed_at TIMESTAMPTZ DEFAULT NOW();
        
        -- Update existing records
        UPDATE public.newsletter_subscribers 
        SET subscribed_at = created_at 
        WHERE subscribed_at IS NULL AND created_at IS NOT NULL;
        
        RAISE NOTICE 'Added subscribed_at column to newsletter_subscribers table';
    END IF;
    
    -- Add updated_at column if missing
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'newsletter_subscribers' 
        AND column_name = 'updated_at'
        AND table_schema = 'public'
    ) THEN
        ALTER TABLE public.newsletter_subscribers 
        ADD COLUMN updated_at TIMESTAMPTZ DEFAULT NOW();
        
        -- Update existing records
        UPDATE public.newsletter_subscribers 
        SET updated_at = created_at 
        WHERE updated_at IS NULL AND created_at IS NOT NULL;
        
        RAISE NOTICE 'Added updated_at column to newsletter_subscribers table';
    END IF;
END $$;

-- Ensure newsletter_email_logs table has proper structure
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

-- Update RLS policies
DROP POLICY IF EXISTS "Allow public newsletter subscription" ON public.newsletter_subscribers;
DROP POLICY IF EXISTS "Allow public to read subscribers" ON public.newsletter_subscribers;
DROP POLICY IF EXISTS "Allow authenticated users to manage subscribers" ON public.newsletter_subscribers;
DROP POLICY IF EXISTS "Allow public to insert email logs" ON public.newsletter_email_logs;
DROP POLICY IF EXISTS "Allow authenticated users to manage email logs" ON public.newsletter_email_logs;

-- Enable RLS
ALTER TABLE public.newsletter_subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.newsletter_email_logs ENABLE ROW LEVEL SECURITY;

-- Create new RLS policies
CREATE POLICY "Allow public newsletter subscription" ON public.newsletter_subscribers
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public to read subscribers" ON public.newsletter_subscribers
    FOR SELECT USING (true);

CREATE POLICY "Allow authenticated users to manage subscribers" ON public.newsletter_subscribers
    FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Allow public to insert email logs" ON public.newsletter_email_logs
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow authenticated users to manage email logs" ON public.newsletter_email_logs
    FOR ALL USING (auth.role() = 'authenticated');

-- Create indexes if they don't exist
CREATE INDEX IF NOT EXISTS idx_newsletter_subscribers_email ON public.newsletter_subscribers(email);
CREATE INDEX IF NOT EXISTS idx_newsletter_subscribers_active ON public.newsletter_subscribers(is_active);
CREATE INDEX IF NOT EXISTS idx_newsletter_subscribers_created ON public.newsletter_subscribers(created_at);

-- Enable realtime
ALTER PUBLICATION supabase_realtime ADD TABLE public.newsletter_subscribers;
ALTER PUBLICATION supabase_realtime ADD TABLE public.newsletter_email_logs;

-- Show final table structure
SELECT 'Fixed newsletter_subscribers table structure:' as status;
SELECT column_name, data_type, is_nullable, column_default
FROM information_schema.columns 
WHERE table_name = 'newsletter_subscribers' 
AND table_schema = 'public'
ORDER BY ordinal_position;

-- Show current data
SELECT 'Current subscribers:' as status;
SELECT COUNT(*) as total_subscribers,
       COUNT(*) FILTER (WHERE is_active = true) as active_subscribers,
       COUNT(*) FILTER (WHERE is_active = false) as inactive_subscribers
FROM public.newsletter_subscribers;
