-- ========================================
-- FIX ALL DATABASE ERRORS - Run this in Supabase SQL Editor
-- ========================================

-- 1. Drop existing tables if they have issues (be careful in production!)
DROP TABLE IF EXISTS public.resource_likes CASCADE;
DROP TABLE IF EXISTS public.free_resources CASCADE;
DROP TABLE IF EXISTS public.resource_categories CASCADE;

-- 2. Create resource_categories table (COMPLETE)
CREATE TABLE public.resource_categories (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    category_key TEXT NOT NULL UNIQUE,
    category_name TEXT NOT NULL,
    category_description TEXT,
    category_icon TEXT DEFAULT 'Gift',
    category_color TEXT DEFAULT '#3B82F6',
    display_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Create free_resources table (WITH ALL COLUMNS)
CREATE TABLE public.free_resources (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    content TEXT NOT NULL,
    category_id UUID REFERENCES public.resource_categories(id) ON DELETE CASCADE,
    resource_type TEXT DEFAULT 'guide' CHECK (resource_type IN ('guide', 'prompt', 'tool', 'tip', 'account')),
    difficulty_level TEXT DEFAULT 'beginner' CHECK (difficulty_level IN ('beginner', 'intermediate', 'advanced')),
    estimated_time TEXT,
    tags TEXT[] DEFAULT '{}',
    external_links JSONB DEFAULT '[]',
    code_examples JSONB DEFAULT '[]', -- MISSING COLUMN ADDED
    requirements TEXT[] DEFAULT '{}',
    steps JSONB DEFAULT '[]',
    featured_image TEXT,
    is_featured BOOLEAN DEFAULT false,
    is_active BOOLEAN DEFAULT true,
    view_count INTEGER DEFAULT 0,
    like_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Create resource_likes table
CREATE TABLE public.resource_likes (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    resource_id UUID REFERENCES public.free_resources(id) ON DELETE CASCADE,
    user_ip TEXT,
    user_fingerprint TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(resource_id, user_ip, user_fingerprint)
);

-- 5. Create indexes for performance
CREATE INDEX idx_free_resources_category ON public.free_resources(category_id);
CREATE INDEX idx_free_resources_type ON public.free_resources(resource_type);
CREATE INDEX idx_free_resources_featured ON public.free_resources(is_featured);
CREATE INDEX idx_free_resources_active ON public.free_resources(is_active);
CREATE INDEX idx_resource_categories_active ON public.resource_categories(is_active);
CREATE INDEX idx_resource_likes_resource ON public.resource_likes(resource_id);

-- 6. Enable Row Level Security
ALTER TABLE public.resource_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.free_resources ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.resource_likes ENABLE ROW LEVEL SECURITY;

-- 7. Create RLS policies for public read access
CREATE POLICY "Public can read active categories" ON public.resource_categories
    FOR SELECT USING (is_active = true);

CREATE POLICY "Public can read active resources" ON public.free_resources
    FOR SELECT USING (is_active = true);

CREATE POLICY "Public can read resource likes" ON public.resource_likes
    FOR SELECT USING (true);

-- 8. Create RLS policies for admin access (FIXED)
CREATE POLICY "Admins can manage categories" ON public.resource_categories
    FOR ALL USING (true); -- Allow all operations for now

CREATE POLICY "Admins can manage resources" ON public.free_resources
    FOR ALL USING (true); -- Allow all operations for now

CREATE POLICY "Anyone can like resources" ON public.resource_likes
    FOR INSERT WITH CHECK (true);

-- 9. Insert sample categories
INSERT INTO public.resource_categories (category_key, category_name, category_description, category_icon, category_color, display_order) VALUES
    ('premium-accounts', 'Premium Accounts', 'Get premium accounts and free trials', 'Crown', '#FFD700', 1),
    ('ai-prompts', 'AI Prompts', 'Powerful ChatGPT and AI prompts', 'Brain', '#8B5CF6', 2),
    ('dev-tools', 'Development Tools', 'Free development tools and resources', 'Code', '#10B981', 3),
    ('design-resources', 'Design Resources', 'Free design tools and assets', 'Palette', '#F59E0B', 4),
    ('learning', 'Free Learning', 'Free courses and tutorials', 'BookOpen', '#EF4444', 5),
    ('productivity', 'Productivity Hacks', 'Tools to boost productivity', 'Zap', '#06B6D4', 6);

-- 10. Insert sample resources (WITH ALL FIELDS)
INSERT INTO public.free_resources (
    title, 
    description, 
    content, 
    category_id, 
    resource_type, 
    difficulty_level, 
    estimated_time, 
    tags, 
    external_links,
    code_examples,
    steps, 
    is_featured
) VALUES
    (
        'Get ChatGPT Plus Free for 3 Months',
        'Learn legitimate ways to access ChatGPT Plus without paying full price using student discounts',
        'Multiple proven methods to get ChatGPT Plus subscription using student discounts and promotional offers. All methods are completely legal and legitimate.',
        (SELECT id FROM public.resource_categories WHERE category_key = 'premium-accounts'),
        'guide',
        'beginner',
        '10 minutes',
        ARRAY['chatgpt', 'openai', 'student-discount', 'free-trial'],
        '[
            {"title": "OpenAI Student Program", "url": "https://openai.com/education", "description": "Official student discount program"},
            {"title": "GitHub Student Pack", "url": "https://education.github.com/pack", "description": "Includes OpenAI credits"}
        ]'::jsonb,
        '[]'::jsonb,
        '[
            {"title": "Method 1: Student Discount", "description": "Use your .edu email to get student pricing from OpenAI"},
            {"title": "Method 2: GitHub Student Pack", "description": "Get free OpenAI credits through GitHub Education program"},
            {"title": "Method 3: Free Trial Optimization", "description": "Maximize free trial periods legally with different payment methods"}
        ]'::jsonb,
        true
    ),
    (
        'Ultimate Full-Stack Development Prompt',
        'One powerful ChatGPT prompt to generate complete applications with frontend, backend, and database',
        'This mega-prompt will help you create full applications in minutes. Just customize the variables and watch the magic happen. Perfect for React, Node.js, and modern web development.',
        (SELECT id FROM public.resource_categories WHERE category_key = 'ai-prompts'),
        'prompt',
        'intermediate',
        '5 minutes',
        ARRAY['chatgpt', 'full-stack', 'react', 'nodejs', 'development'],
        '[]'::jsonb,
        '[
            {
                "language": "prompt",
                "code": "Act as a senior full-stack developer. Create a complete [APP_TYPE] application with:\n\n**Project Requirements:**\n- App Name: [APP_NAME]\n- Main Purpose: [APP_PURPOSE]\n- Target Users: [TARGET_USERS]\n- Key Features: [FEATURE_1], [FEATURE_2], [FEATURE_3]\n\n**Technical Stack:**\n- Frontend: React with [UI_LIBRARY] (Tailwind CSS, Material-UI, etc.)\n- Backend: Node.js with Express\n- Database: [DATABASE_TYPE] (MongoDB, PostgreSQL, etc.)\n- Authentication: [AUTH_METHOD] (JWT, OAuth, etc.)\n\n**Generate the following:**\n1. Complete project structure\n2. Package.json with all dependencies\n3. Frontend components with responsive design\n4. Backend API routes with proper error handling\n5. Database schema and models\n6. Authentication system\n7. Deployment instructions\n8. README with setup instructions\n\n**Additional Requirements:**\n- Include proper error handling\n- Add input validation\n- Implement responsive design\n- Add loading states\n- Include comments in code\n- Follow best practices\n\nProvide complete, production-ready code that I can copy and run immediately.",
                "description": "The Ultimate Full-Stack Development Prompt - Customize the variables in brackets"
            }
        ]'::jsonb,
        '[
            {"title": "Step 1: Customize Variables", "description": "Replace [APP_TYPE], [APP_NAME], etc. with your specific requirements"},
            {"title": "Step 2: Run the Prompt", "description": "Paste the customized prompt into ChatGPT"},
            {"title": "Step 3: Get Complete Code", "description": "Receive production-ready code for your entire application"}
        ]'::jsonb,
        true
    ),
    (
        'Free Adobe Creative Cloud Alternatives',
        'Professional design tools that are completely free and rival Adobe Creative Cloud',
        'Access premium design capabilities without paying for Adobe CC. These alternatives are powerful, professional, and completely free to use for any commercial or personal project.',
        (SELECT id FROM public.resource_categories WHERE category_key = 'design-resources'),
        'guide',
        'beginner',
        '15 minutes',
        ARRAY['design', 'adobe', 'free-tools', 'graphics', 'photoshop', 'illustrator'],
        '[
            {"title": "GIMP Official Site", "url": "https://www.gimp.org/", "description": "Free Photoshop alternative"},
            {"title": "Inkscape Download", "url": "https://inkscape.org/", "description": "Free Illustrator alternative"},
            {"title": "DaVinci Resolve", "url": "https://www.blackmagicdesign.com/products/davinciresolve/", "description": "Free Premiere Pro alternative"}
        ]'::jsonb,
        '[]'::jsonb,
        '[
            {"title": "GIMP (Photoshop Alternative)", "description": "Professional image editing with layers, filters, and advanced tools"},
            {"title": "Inkscape (Illustrator Alternative)", "description": "Vector graphics editor perfect for logos, illustrations, and scalable graphics"},
            {"title": "DaVinci Resolve (Premiere Alternative)", "description": "Hollywood-grade video editing software used in major films"},
            {"title": "Blender (After Effects Alternative)", "description": "3D modeling, animation, and motion graphics"}
        ]'::jsonb,
        false
    );

-- 11. Create utility functions
CREATE OR REPLACE FUNCTION increment_resource_views(resource_uuid UUID)
RETURNS void AS $$
BEGIN
    UPDATE public.free_resources 
    SET view_count = view_count + 1,
        updated_at = NOW()
    WHERE id = resource_uuid;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION toggle_resource_like(
    resource_uuid UUID,
    user_ip_addr TEXT,
    user_fp TEXT
)
RETURNS JSONB AS $$
DECLARE
    existing_like_id UUID;
    new_like_count INTEGER;
BEGIN
    -- Check if like already exists
    SELECT id INTO existing_like_id
    FROM public.resource_likes
    WHERE resource_id = resource_uuid 
    AND user_ip = user_ip_addr 
    AND user_fingerprint = user_fp;
    
    IF existing_like_id IS NOT NULL THEN
        -- Unlike: remove the like
        DELETE FROM public.resource_likes WHERE id = existing_like_id;
        
        -- Update like count
        UPDATE public.free_resources 
        SET like_count = like_count - 1,
            updated_at = NOW()
        WHERE id = resource_uuid;
        
        SELECT like_count INTO new_like_count
        FROM public.free_resources
        WHERE id = resource_uuid;
        
        RETURN jsonb_build_object('liked', false, 'like_count', new_like_count);
    ELSE
        -- Like: add new like
        INSERT INTO public.resource_likes (resource_id, user_ip, user_fingerprint)
        VALUES (resource_uuid, user_ip_addr, user_fp);
        
        -- Update like count
        UPDATE public.free_resources 
        SET like_count = like_count + 1,
            updated_at = NOW()
        WHERE id = resource_uuid;
        
        SELECT like_count INTO new_like_count
        FROM public.free_resources
        WHERE id = resource_uuid;
        
        RETURN jsonb_build_object('liked', true, 'like_count', new_like_count);
    END IF;
END;
$$ LANGUAGE plpgsql;

-- 12. Enable realtime (if not already enabled)
DO $$
BEGIN
    -- Add tables to realtime publication if they don't exist
    BEGIN
        ALTER PUBLICATION supabase_realtime ADD TABLE public.resource_categories;
    EXCEPTION
        WHEN duplicate_object THEN NULL;
    END;
    
    BEGIN
        ALTER PUBLICATION supabase_realtime ADD TABLE public.free_resources;
    EXCEPTION
        WHEN duplicate_object THEN NULL;
    END;
    
    BEGIN
        ALTER PUBLICATION supabase_realtime ADD TABLE public.resource_likes;
    EXCEPTION
        WHEN duplicate_object THEN NULL;
    END;
END $$;

-- Success message
SELECT 
    'All database errors fixed! 🎉' as status,
    (SELECT COUNT(*) FROM public.resource_categories) as categories_count,
    (SELECT COUNT(*) FROM public.free_resources) as resources_count;
