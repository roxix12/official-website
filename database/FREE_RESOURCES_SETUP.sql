-- ========================================
-- FREE RESOURCES SYSTEM SETUP
-- ========================================

-- Create resource_categories table
CREATE TABLE IF NOT EXISTS public.resource_categories (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    category_key TEXT NOT NULL UNIQUE,
    category_name TEXT NOT NULL,
    category_description TEXT,
    category_icon TEXT, -- Icon name for UI
    category_color TEXT DEFAULT '#3B82F6', -- Hex color for theming
    display_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create free_resources table
CREATE TABLE IF NOT EXISTS public.free_resources (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    content TEXT NOT NULL, -- Main content/instructions
    category_id UUID REFERENCES public.resource_categories(id) ON DELETE CASCADE,
    resource_type TEXT NOT NULL DEFAULT 'guide', -- 'guide', 'prompt', 'tool', 'tip', 'account'
    difficulty_level TEXT DEFAULT 'beginner', -- 'beginner', 'intermediate', 'advanced'
    estimated_time TEXT, -- e.g., '5 minutes', '1 hour'
    tags TEXT[], -- Array of tags for filtering
    external_links JSONB DEFAULT '[]', -- Array of {title, url, description}
    code_examples JSONB DEFAULT '[]', -- Array of {language, code, description}
    requirements TEXT[], -- Array of requirements
    steps JSONB DEFAULT '[]', -- Array of step objects {title, description, code?, image?}
    featured_image TEXT,
    is_featured BOOLEAN DEFAULT false,
    is_active BOOLEAN DEFAULT true,
    view_count INTEGER DEFAULT 0,
    like_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create resource_likes table for tracking user likes
CREATE TABLE IF NOT EXISTS public.resource_likes (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    resource_id UUID REFERENCES public.free_resources(id) ON DELETE CASCADE,
    user_ip TEXT, -- For anonymous tracking
    user_fingerprint TEXT, -- Browser fingerprint
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(resource_id, user_ip, user_fingerprint)
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_free_resources_category ON public.free_resources(category_id);
CREATE INDEX IF NOT EXISTS idx_free_resources_type ON public.free_resources(resource_type);
CREATE INDEX IF NOT EXISTS idx_free_resources_featured ON public.free_resources(is_featured);
CREATE INDEX IF NOT EXISTS idx_free_resources_active ON public.free_resources(is_active);
CREATE INDEX IF NOT EXISTS idx_resource_categories_active ON public.resource_categories(is_active);
CREATE INDEX IF NOT EXISTS idx_resource_likes_resource ON public.resource_likes(resource_id);

-- Enable RLS (Row Level Security)
ALTER TABLE public.resource_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.free_resources ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.resource_likes ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for public read access
CREATE POLICY "Public can read active resource categories" ON public.resource_categories
    FOR SELECT USING (is_active = true);

CREATE POLICY "Public can read active resources" ON public.free_resources
    FOR SELECT USING (is_active = true);

CREATE POLICY "Public can read resource likes" ON public.resource_likes
    FOR SELECT USING (true);

-- Create RLS policies for admin access (assuming admin role)
CREATE POLICY "Admins can manage resource categories" ON public.resource_categories
    FOR ALL USING (true);

CREATE POLICY "Admins can manage resources" ON public.free_resources
    FOR ALL USING (true);

CREATE POLICY "Anyone can like resources" ON public.resource_likes
    FOR INSERT WITH CHECK (true);

-- Insert default categories
INSERT INTO public.resource_categories (category_key, category_name, category_description, category_icon, category_color, display_order) VALUES
    ('premium-accounts', 'Premium Accounts & Free Trials', 'Tips and tricks to get free premium accounts and extended trials', 'Crown', '#FFD700', 1),
    ('ai-prompts', 'AI Prompts & ChatGPT', 'Powerful prompts for ChatGPT, Claude, and other AI tools', 'Brain', '#8B5CF6', 2),
    ('development-tools', 'Free Development Tools', 'Free tools, resources, and services for developers', 'Code', '#10B981', 3),
    ('design-resources', 'Design & UI Resources', 'Free design tools, templates, and resources', 'Palette', '#F59E0B', 4),
    ('learning-platforms', 'Free Learning & Courses', 'Free courses, tutorials, and educational resources', 'BookOpen', '#EF4444', 5),
    ('productivity-hacks', 'Productivity & Automation', 'Tools and tips to boost productivity and automate tasks', 'Zap', '#06B6D4', 6)
ON CONFLICT (category_key) DO NOTHING;

-- Insert sample resources
INSERT INTO public.free_resources (title, description, content, category_id, resource_type, difficulty_level, estimated_time, tags, external_links, steps, is_featured) VALUES
    (
        'Get ChatGPT Plus Free for 3 Months',
        'Learn how to get ChatGPT Plus subscription free using student discounts and promotional offers',
        'Multiple proven methods to access ChatGPT Plus without paying full price. These methods are completely legal and legitimate.',
        (SELECT id FROM public.resource_categories WHERE category_key = 'premium-accounts'),
        'guide',
        'beginner',
        '10 minutes',
        ARRAY['chatgpt', 'openai', 'student-discount', 'free-trial'],
        '[
            {"title": "OpenAI Student Program", "url": "https://openai.com/education", "description": "Official student discount program"},
            {"title": "GitHub Student Pack", "url": "https://education.github.com/pack", "description": "Includes OpenAI credits"}
        ]'::jsonb,
        '[
            {"title": "Method 1: Student Discount", "description": "Use your .edu email to get student pricing", "steps": ["Visit OpenAI education page", "Verify your student status", "Apply for discount"]},
            {"title": "Method 2: GitHub Student Pack", "description": "Get free OpenAI credits through GitHub Education", "steps": ["Sign up for GitHub Student Pack", "Claim OpenAI credits", "Use credits for ChatGPT Plus"]},
            {"title": "Method 3: Free Trials", "description": "Maximize free trial periods legally", "steps": ["Use different payment methods", "Cancel before billing", "Re-subscribe with new method"]}
        ]'::jsonb,
        true
    ),
    (
        'Ultimate ChatGPT Prompt for Full Stack Development',
        'One powerful prompt that can generate complete applications with frontend, backend, and database',
        'This mega-prompt will help you create full applications in minutes. Just customize the variables and watch the magic happen.',
        (SELECT id FROM public.resource_categories WHERE category_key = 'ai-prompts'),
        'prompt',
        'intermediate',
        '2 minutes',
        ARRAY['chatgpt', 'full-stack', 'react', 'nodejs', 'development'],
        '[]'::jsonb,
        '[
            {
                "title": "The Ultimate Full-Stack Prompt",
                "description": "Copy and paste this prompt, then customize the variables in brackets",
                "code": "Act as a senior full-stack developer. Create a complete [APP_TYPE] application with the following specifications:\n\n**Project Requirements:**\n- App Name: [APP_NAME]\n- Main Purpose: [APP_PURPOSE]\n- Target Users: [TARGET_USERS]\n- Key Features: [FEATURE_1], [FEATURE_2], [FEATURE_3]\n\n**Technical Stack:**\n- Frontend: React with [UI_LIBRARY] (Tailwind CSS, Material-UI, etc.)\n- Backend: Node.js with Express\n- Database: [DATABASE_TYPE] (MongoDB, PostgreSQL, etc.)\n- Authentication: [AUTH_METHOD] (JWT, OAuth, etc.)\n\n**Generate the following:**\n1. Complete project structure\n2. Package.json with all dependencies\n3. Frontend components with responsive design\n4. Backend API routes with proper error handling\n5. Database schema and models\n6. Authentication system\n7. Deployment instructions\n8. README with setup instructions\n\n**Additional Requirements:**\n- Include proper error handling\n- Add input validation\n- Implement responsive design\n- Add loading states\n- Include comments in code\n- Follow best practices\n\nProvide complete, production-ready code that I can copy and run immediately.",
                "language": "prompt"
            }
        ]'::jsonb,
        true
    ),
    (
        'Free Premium Design Tools & Resources',
        'Access premium design tools, fonts, icons, and templates without paying',
        'Comprehensive list of ways to access premium design resources for free through student programs, open source alternatives, and legitimate free tiers.',
        (SELECT id FROM public.resource_categories WHERE category_key = 'design-resources'),
        'guide',
        'beginner',
        '15 minutes',
        ARRAY['design', 'figma', 'adobe', 'canva', 'free-resources'],
        '[
            {"title": "Figma for Students", "url": "https://www.figma.com/education/", "description": "Free Figma Professional for students"},
            {"title": "Adobe Creative Cloud Student", "url": "https://www.adobe.com/creativecloud/buy/students.html", "description": "60% off Adobe CC for students"},
            {"title": "Canva for Education", "url": "https://www.canva.com/education/", "description": "Free Canva Pro for teachers and students"}
        ]'::jsonb,
        '[
            {"title": "Free Figma Professional", "description": "Get Figma Pro free with student email", "steps": ["Sign up with .edu email", "Verify student status", "Enjoy unlimited projects"]},
            {"title": "Adobe Creative Cloud Discounts", "description": "Multiple ways to get Adobe CC cheaper", "steps": ["Student discount (60% off)", "Free trial maximization", "Adobe XD free plan"]},
            {"title": "Alternative Free Tools", "description": "Professional alternatives that are completely free", "steps": ["GIMP (Photoshop alternative)", "Inkscape (Illustrator alternative)", "Blender (3D design)"]}
        ]'::jsonb,
        false
    );

-- Create function to increment view count
CREATE OR REPLACE FUNCTION increment_resource_views(resource_uuid UUID)
RETURNS void AS $$
BEGIN
    UPDATE public.free_resources 
    SET view_count = view_count + 1,
        updated_at = NOW()
    WHERE id = resource_uuid;
END;
$$ LANGUAGE plpgsql;

-- Create function to toggle resource like
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

-- Add tables to realtime publication (if not already added)
DO $$
BEGIN
    -- Check and add resource_categories to realtime
    IF NOT EXISTS (
        SELECT 1 FROM pg_publication_tables 
        WHERE pubname = 'supabase_realtime' 
        AND tablename = 'resource_categories'
    ) THEN
        ALTER PUBLICATION supabase_realtime ADD TABLE public.resource_categories;
    END IF;
    
    -- Check and add free_resources to realtime
    IF NOT EXISTS (
        SELECT 1 FROM pg_publication_tables 
        WHERE pubname = 'supabase_realtime' 
        AND tablename = 'free_resources'
    ) THEN
        ALTER PUBLICATION supabase_realtime ADD TABLE public.free_resources;
    END IF;
    
    -- Check and add resource_likes to realtime
    IF NOT EXISTS (
        SELECT 1 FROM pg_publication_tables 
        WHERE pubname = 'supabase_realtime' 
        AND tablename = 'resource_likes'
    ) THEN
        ALTER PUBLICATION supabase_realtime ADD TABLE public.resource_likes;
    END IF;
END $$;
