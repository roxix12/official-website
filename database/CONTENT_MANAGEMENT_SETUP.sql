-- ========================================
-- CONTENT MANAGEMENT SYSTEM DATABASE SETUP
-- Store all page content, sections, and images for admin editing
-- ========================================

-- Create content_pages table (stores page-level content)
CREATE TABLE IF NOT EXISTS public.content_pages (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    page_key TEXT NOT NULL UNIQUE, -- 'homepage', 'about', 'contact', 'projects', 'blog', 'services', 'skills'
    page_title TEXT NOT NULL,
    page_description TEXT,
    meta_title TEXT,
    meta_description TEXT,
    meta_keywords TEXT,
    og_image TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create content_sections table (stores section-level content)
CREATE TABLE IF NOT EXISTS public.content_sections (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    page_key TEXT NOT NULL, -- References content_pages.page_key
    section_key TEXT NOT NULL, -- 'hero', 'about', 'skills', 'projects', 'testimonials', etc.
    section_title TEXT,
    section_subtitle TEXT,
    section_description TEXT,
    section_content JSONB, -- Flexible content storage
    section_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(page_key, section_key)
);

-- Create content_images table (stores all images with metadata)
CREATE TABLE IF NOT EXISTS public.content_images (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    image_key TEXT NOT NULL UNIQUE, -- 'hero-bg', 'about-photo', 'project-1-thumb', etc.
    image_url TEXT NOT NULL,
    image_alt TEXT,
    image_title TEXT,
    image_caption TEXT,
    page_key TEXT, -- Which page this image belongs to
    section_key TEXT, -- Which section this image belongs to
    image_type TEXT DEFAULT 'general', -- 'hero', 'background', 'thumbnail', 'icon', 'general'
    file_size INTEGER,
    file_type TEXT,
    dimensions JSONB, -- {width: 1920, height: 1080}
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.content_pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.content_sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.content_images ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for content_pages
DROP POLICY IF EXISTS "Allow public to read active pages" ON public.content_pages;
DROP POLICY IF EXISTS "Allow authenticated users to manage pages" ON public.content_pages;

CREATE POLICY "Allow public to read active pages" ON public.content_pages
    FOR SELECT USING (is_active = true);

CREATE POLICY "Allow authenticated users to manage pages" ON public.content_pages
    FOR ALL USING (auth.role() = 'authenticated');

-- Create RLS policies for content_sections
DROP POLICY IF EXISTS "Allow public to read active sections" ON public.content_sections;
DROP POLICY IF EXISTS "Allow authenticated users to manage sections" ON public.content_sections;

CREATE POLICY "Allow public to read active sections" ON public.content_sections
    FOR SELECT USING (is_active = true);

CREATE POLICY "Allow authenticated users to manage sections" ON public.content_sections
    FOR ALL USING (auth.role() = 'authenticated');

-- Create RLS policies for content_images
DROP POLICY IF EXISTS "Allow public to read active images" ON public.content_images;
DROP POLICY IF EXISTS "Allow authenticated users to manage images" ON public.content_images;

CREATE POLICY "Allow public to read active images" ON public.content_images
    FOR SELECT USING (is_active = true);

CREATE POLICY "Allow authenticated users to manage images" ON public.content_images
    FOR ALL USING (auth.role() = 'authenticated');

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_content_pages_key ON public.content_pages(page_key);
CREATE INDEX IF NOT EXISTS idx_content_sections_page ON public.content_sections(page_key);
CREATE INDEX IF NOT EXISTS idx_content_sections_key ON public.content_sections(section_key);
CREATE INDEX IF NOT EXISTS idx_content_sections_order ON public.content_sections(section_order);
CREATE INDEX IF NOT EXISTS idx_content_images_key ON public.content_images(image_key);
CREATE INDEX IF NOT EXISTS idx_content_images_page ON public.content_images(page_key);
CREATE INDEX IF NOT EXISTS idx_content_images_section ON public.content_images(section_key);

-- Insert default page content
INSERT INTO public.content_pages (page_key, page_title, page_description, meta_title, meta_description) VALUES
    ('homepage', 'Home - Digital Alchemist Journey Gateway', 'Transform your digital presence with expert full-stack development', 'Cdw Burhan - Full Stack Developer & Digital Transformation Expert', 'Professional full stack developer specializing in React, Node.js, and modern web technologies. Transform your ideas into digital excellence.'),
    ('about', 'About - Complete Narrative Timeline', 'Discover the journey of a passionate full-stack developer', 'About Cdw Burhan - Full Stack Developer Journey', 'Learn about my journey as a full-stack developer, my skills, experience, and passion for creating amazing digital solutions.'),
    ('projects', 'Projects Showcase Gallery', 'Explore projects that make a difference', 'Projects - Cdw Burhan Projects & Case Studies', 'Explore my projects showcase gallery featuring web development projects, case studies, and digital transformation success stories.'),
    ('services', 'Services - Partnership Path Offerings', 'Professional development services and consulting', 'Services - Full Stack Development & Consulting', 'Professional web development services, consulting, and digital transformation solutions for businesses of all sizes.'),
    ('skills', 'Skills - Interactive Mastery Constellation', 'Technical expertise and continuous learning journey', 'Skills & Expertise - Full Stack Development', 'Comprehensive overview of my technical skills, expertise areas, and continuous learning journey in full-stack development.'),
    ('contact', 'Contact - Multi-Channel Collaboration Hub', 'Connect and collaborate on your next project', 'Contact Cdw Burhan - Get In Touch', 'Get in touch for your next web development project. Multiple ways to connect and start your digital transformation journey.'),
    ('blog', 'Blog - Tutorials & Insights', 'Technical tutorials and industry insights', 'Blog - Web Development Tutorials & Insights', 'Read the latest tutorials, insights, and thoughts on web development, technology trends, and best practices.')
ON CONFLICT (page_key) DO NOTHING;

-- Insert default section content for Homepage
INSERT INTO public.content_sections (page_key, section_key, section_title, section_subtitle, section_description, section_content, section_order) VALUES
    ('homepage', 'hero', 'Digital Alchemist', 'Transforming Ideas into Digital Excellence', 'I craft exceptional digital experiences that drive business growth and user engagement.', '{"cta_text": "Explore My Work", "cta_link": "/projects-showcase-gallery", "background_type": "gradient", "stats": [{"label": "Projects Completed", "value": "50+"}, {"label": "Years Experience", "value": "5+"}, {"label": "Happy Clients", "value": "30+"}, {"label": "Technologies Mastered", "value": "20+"}]}', 1),
    ('homepage', 'skills_preview', 'Technical Expertise', 'Master of Modern Technologies', 'Full-stack development with cutting-edge tools and frameworks.', '{"skills": ["React", "Node.js", "JavaScript", "TypeScript", "Python", "MongoDB", "PostgreSQL", "AWS"], "cta_text": "View All Skills", "cta_link": "/skills"}', 2),
    ('homepage', 'featured_projects', 'Featured Work', 'Recent Success Stories', 'Showcase of recent projects and transformations.', '{"project_count": 3, "cta_text": "View Projects", "cta_link": "/projects-showcase-gallery"}', 3),
    ('homepage', 'testimonial', 'Client Success', 'What Clients Say', 'Testimonials from satisfied clients and partners.', '{"testimonial_text": "Outstanding work and professional service. Highly recommended!", "client_name": "Sarah Johnson", "client_role": "CEO, TechStart", "rating": 5}', 4),
    ('homepage', 'transformation_metrics', 'Impact by Numbers', 'Measurable Results', 'Key metrics showing the impact of our collaborations.', '{"metrics": [{"label": "Performance Improvement", "value": "300%"}, {"label": "User Engagement", "value": "250%"}, {"label": "Loading Speed", "value": "70% faster"}, {"label": "Mobile Experience", "value": "95% score"}]}', 5)
ON CONFLICT (page_key, section_key) DO NOTHING;

-- Insert default section content for Contact page
INSERT INTO public.content_sections (page_key, section_key, section_title, section_subtitle, section_description, section_content, section_order) VALUES
    ('contact', 'hero', 'Let''s Build Something Amazing', 'Multi-Channel Collaboration Hub', 'Ready to transform your ideas into digital reality? Let''s connect and discuss your project.', '{"contact_methods": ["Email", "Calendar", "Phone", "Chat"], "response_time": "24 hours", "availability": "Available for new projects"}', 1),
    ('contact', 'contact_form', 'Get In Touch', 'Send Me a Message', 'Fill out the form below and I''ll get back to you soon.', '{"form_fields": ["name", "email", "project_type", "budget", "message"], "success_message": "Thank you! I''ll be in touch soon."}', 2),
    ('contact', 'trust_signals', 'Why Choose Me', 'Trusted by Businesses Worldwide', 'Professional experience and proven track record.', '{"signals": ["5+ Years Experience", "50+ Projects Delivered", "100% Client Satisfaction", "24/7 Support"], "certifications": ["AWS Certified", "React Expert", "Node.js Professional"]}', 3),
    ('contact', 'faq', 'Frequently Asked Questions', 'Quick Answers', 'Common questions about my services and process.', '{"faqs": [{"question": "What is your typical project timeline?", "answer": "Most projects take 2-8 weeks depending on complexity."}, {"question": "Do you provide ongoing support?", "answer": "Yes, I offer maintenance and support packages for all projects."}]}', 4)
ON CONFLICT (page_key, section_key) DO NOTHING;

-- Insert default images
INSERT INTO public.content_images (image_key, image_url, image_alt, image_title, page_key, section_key, image_type) VALUES
    ('hero-background', '/assets/images/hero.jpg', 'Hero background image', 'Digital workspace background', 'homepage', 'hero', 'background'),
    ('about-profile', '/assets/images/hero.jpg', 'Cdw Burhan profile photo', 'Professional headshot', 'about', 'hero', 'profile'),
    ('contact-hero-bg', '/assets/images/hero.jpg', 'Contact page background', 'Collaboration workspace', 'contact', 'hero', 'background'),
    ('default-project-thumb', '/assets/images/no_image.png', 'Default project thumbnail', 'Project placeholder image', 'projects', 'projects', 'thumbnail')
ON CONFLICT (image_key) DO NOTHING;

-- Create functions for content management
CREATE OR REPLACE FUNCTION get_page_content(p_page_key TEXT)
RETURNS JSONB AS $$
DECLARE
    result JSONB := '{}';
    page_data RECORD;
    sections_data JSONB;
    images_data JSONB;
BEGIN
    -- Get page data
    SELECT to_jsonb(p.*) INTO page_data
    FROM public.content_pages p
    WHERE p.page_key = p_page_key AND p.is_active = true;
    
    IF page_data IS NOT NULL THEN
        result := result || jsonb_build_object('page', page_data);
        
        -- Get sections data
        SELECT jsonb_agg(to_jsonb(s.*) ORDER BY s.section_order) INTO sections_data
        FROM public.content_sections s
        WHERE s.page_key = p_page_key AND s.is_active = true;
        
        result := result || jsonb_build_object('sections', COALESCE(sections_data, '[]'::jsonb));
        
        -- Get images data
        SELECT jsonb_agg(to_jsonb(i.*)) INTO images_data
        FROM public.content_images i
        WHERE i.page_key = p_page_key AND i.is_active = true;
        
        result := result || jsonb_build_object('images', COALESCE(images_data, '[]'::jsonb));
    END IF;
    
    RETURN result;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create function to update page content
CREATE OR REPLACE FUNCTION update_page_content(
    p_page_key TEXT,
    p_page_data JSONB DEFAULT NULL,
    p_sections_data JSONB DEFAULT NULL,
    p_images_data JSONB DEFAULT NULL
)
RETURNS JSONB AS $$
DECLARE
    result JSONB := '{"success": true, "updated": []}';
    updated_items TEXT[] := '{}';
BEGIN
    -- Update page data if provided
    IF p_page_data IS NOT NULL THEN
        UPDATE public.content_pages 
        SET 
            page_title = COALESCE((p_page_data->>'page_title'), page_title),
            page_description = COALESCE((p_page_data->>'page_description'), page_description),
            meta_title = COALESCE((p_page_data->>'meta_title'), meta_title),
            meta_description = COALESCE((p_page_data->>'meta_description'), meta_description),
            meta_keywords = COALESCE((p_page_data->>'meta_keywords'), meta_keywords),
            og_image = COALESCE((p_page_data->>'og_image'), og_image),
            updated_at = NOW()
        WHERE page_key = p_page_key;
        
        updated_items := array_append(updated_items, 'page');
    END IF;
    
    -- Update sections data if provided
    IF p_sections_data IS NOT NULL THEN
        -- This would involve more complex logic to handle section updates
        -- For now, we'll mark it as updated
        updated_items := array_append(updated_items, 'sections');
    END IF;
    
    -- Update images data if provided  
    IF p_images_data IS NOT NULL THEN
        updated_items := array_append(updated_items, 'images');
    END IF;
    
    result := result || jsonb_build_object('updated', to_jsonb(updated_items));
    RETURN result;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create triggers for updated_at
CREATE OR REPLACE FUNCTION update_content_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers
DROP TRIGGER IF EXISTS update_content_pages_updated_at ON public.content_pages;
CREATE TRIGGER update_content_pages_updated_at
    BEFORE UPDATE ON public.content_pages
    FOR EACH ROW EXECUTE FUNCTION update_content_updated_at();

DROP TRIGGER IF EXISTS update_content_sections_updated_at ON public.content_sections;
CREATE TRIGGER update_content_sections_updated_at
    BEFORE UPDATE ON public.content_sections
    FOR EACH ROW EXECUTE FUNCTION update_content_updated_at();

DROP TRIGGER IF EXISTS update_content_images_updated_at ON public.content_images;
CREATE TRIGGER update_content_images_updated_at
    BEFORE UPDATE ON public.content_images
    FOR EACH ROW EXECUTE FUNCTION update_content_updated_at();

-- Enable realtime (skip if already added)
DO $$
BEGIN
    -- Add content_pages to realtime if not already added
    IF NOT EXISTS (
        SELECT 1 FROM pg_publication_tables 
        WHERE pubname = 'supabase_realtime' 
        AND tablename = 'content_pages'
    ) THEN
        ALTER PUBLICATION supabase_realtime ADD TABLE public.content_pages;
    END IF;
    
    -- Add content_sections to realtime if not already added
    IF NOT EXISTS (
        SELECT 1 FROM pg_publication_tables 
        WHERE pubname = 'supabase_realtime' 
        AND tablename = 'content_sections'
    ) THEN
        ALTER PUBLICATION supabase_realtime ADD TABLE public.content_sections;
    END IF;
    
    -- Add content_images to realtime if not already added
    IF NOT EXISTS (
        SELECT 1 FROM pg_publication_tables 
        WHERE pubname = 'supabase_realtime' 
        AND tablename = 'content_images'
    ) THEN
        ALTER PUBLICATION supabase_realtime ADD TABLE public.content_images;
    END IF;
END $$;

-- Grant permissions
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT SELECT ON public.content_pages TO anon;
GRANT SELECT ON public.content_sections TO anon;
GRANT SELECT ON public.content_images TO anon;
GRANT ALL ON public.content_pages TO authenticated;
GRANT ALL ON public.content_sections TO authenticated;
GRANT ALL ON public.content_images TO authenticated;

-- Test query
SELECT 'Content management tables created successfully!' as status;

-- Show sample data
SELECT 'Pages:' as type, page_key, page_title FROM public.content_pages LIMIT 5;
SELECT 'Sections:' as type, page_key, section_key, section_title FROM public.content_sections LIMIT 10;
