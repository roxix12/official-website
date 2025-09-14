-- ========================================
-- SITE SETTINGS DATABASE SETUP
-- Store site settings like logo, favicon, colors in database
-- ========================================

-- Create site_settings table
CREATE TABLE IF NOT EXISTS public.site_settings (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    setting_key TEXT NOT NULL UNIQUE,
    setting_value JSONB NOT NULL,
    setting_type TEXT DEFAULT 'general', -- 'general', 'theme', 'seo', 'social'
    description TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
DROP POLICY IF EXISTS "Allow public to read site settings" ON public.site_settings;
DROP POLICY IF EXISTS "Allow authenticated users to manage site settings" ON public.site_settings;

CREATE POLICY "Allow public to read site settings" ON public.site_settings
    FOR SELECT USING (is_active = true);

CREATE POLICY "Allow authenticated users to manage site settings" ON public.site_settings
    FOR ALL USING (auth.role() = 'authenticated');

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_site_settings_key ON public.site_settings(setting_key);
CREATE INDEX IF NOT EXISTS idx_site_settings_type ON public.site_settings(setting_type);
CREATE INDEX IF NOT EXISTS idx_site_settings_active ON public.site_settings(is_active);

-- Insert default site settings
INSERT INTO public.site_settings (setting_key, setting_value, setting_type, description) VALUES
    ('site_info', '{
        "siteName": "Cdw Burhan",
        "siteDescription": "Full Stack Developer & Digital Transformation Expert",
        "tagline": "FULL STACK DEV"
    }', 'general', 'Basic site information'),
    
    ('branding', '{
        "logo": "/assets/images/hero.jpg",
        "favicon": "/favicon.ico",
        "logoAlt": "Cdw Burhan Logo"
    }', 'general', 'Site branding assets'),
    
    ('theme_colors', '{
        "primaryColor": "#00d4ff",
        "secondaryColor": "#8b5cf6",
        "accentColor": "#f59e0b",
        "backgroundColor": "#000000"
    }', 'theme', 'Website color scheme'),
    
    ('seo_settings', '{
        "metaTitle": "Cdw Burhan - Full Stack Developer",
        "metaDescription": "Professional full stack developer specializing in React, Node.js, and modern web technologies. Transform your ideas into digital excellence.",
        "metaKeywords": "full stack developer, web development, React, Node.js, JavaScript",
        "ogImage": "/assets/images/hero.jpg"
    }', 'seo', 'SEO and meta tags'),
    
    ('contact_info', '{
        "email": "cdwburhan@gmail.com",
        "phone": "",
        "location": "Available Worldwide",
        "timezone": "UTC",
        "availability": "Available for freelance projects",
        "responseTime": "Usually responds within 24 hours"
    }', 'general', 'Contact information'),
    
    ('social_links', '{
        "github": "https://github.com",
        "linkedin": "https://linkedin.com",
        "twitter": "https://twitter.com",
        "instagram": "https://instagram.com",
        "facebook": "",
        "youtube": ""
    }', 'social', 'Social media links')

ON CONFLICT (setting_key) DO NOTHING;

-- Create function to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_site_settings_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update the updated_at column
DROP TRIGGER IF EXISTS update_site_settings_updated_at ON public.site_settings;
CREATE TRIGGER update_site_settings_updated_at
    BEFORE UPDATE ON public.site_settings
    FOR EACH ROW
    EXECUTE FUNCTION update_site_settings_updated_at();

-- Enable realtime for site_settings (skip if already added)
DO $$
BEGIN
    -- Check if table is already in publication
    IF NOT EXISTS (
        SELECT 1 FROM pg_publication_tables 
        WHERE pubname = 'supabase_realtime' 
        AND tablename = 'site_settings'
    ) THEN
        ALTER PUBLICATION supabase_realtime ADD TABLE public.site_settings;
    END IF;
END $$;

-- Grant permissions
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT SELECT ON public.site_settings TO anon;
GRANT ALL ON public.site_settings TO authenticated;

-- Function to get all site settings as a single JSON object
CREATE OR REPLACE FUNCTION get_site_settings()
RETURNS JSONB AS $$
DECLARE
    result JSONB := '{}';
    setting RECORD;
BEGIN
    FOR setting IN 
        SELECT setting_key, setting_value 
        FROM public.site_settings 
        WHERE is_active = true
    LOOP
        result := result || jsonb_build_object(setting.setting_key, setting.setting_value);
    END LOOP;
    
    RETURN result;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to update a specific setting
CREATE OR REPLACE FUNCTION update_site_setting(
    p_setting_key TEXT,
    p_setting_value JSONB,
    p_setting_type TEXT DEFAULT 'general',
    p_description TEXT DEFAULT NULL
)
RETURNS JSONB AS $$
DECLARE
    result JSONB;
BEGIN
    INSERT INTO public.site_settings (setting_key, setting_value, setting_type, description)
    VALUES (p_setting_key, p_setting_value, p_setting_type, p_description)
    ON CONFLICT (setting_key) 
    DO UPDATE SET 
        setting_value = p_setting_value,
        setting_type = COALESCE(p_setting_type, site_settings.setting_type),
        description = COALESCE(p_description, site_settings.description),
        updated_at = NOW()
    RETURNING to_jsonb(site_settings.*) INTO result;
    
    RETURN result;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Test the functions
SELECT 'Site settings table created successfully!' as status;

-- Show current settings
SELECT setting_key, setting_value, setting_type, description
FROM public.site_settings
ORDER BY setting_type, setting_key;
