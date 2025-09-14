-- =============================================
-- Supabase Database Setup for Cdw Burhan Portfolio
-- Run these commands in Supabase SQL Editor
-- =============================================

-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Drop existing tables if they exist (optional - only if you want to start fresh)
-- DROP TABLE IF EXISTS public.blog_posts CASCADE;
-- DROP TABLE IF EXISTS public.projects CASCADE;

-- Blog posts table
CREATE TABLE IF NOT EXISTS public.blog_posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE,
  excerpt TEXT,
  content TEXT,
  category TEXT,
  tags TEXT[] DEFAULT '{}',
  image TEXT,
  status TEXT DEFAULT 'draft',
  featured BOOLEAN DEFAULT false,
  readTime TEXT,
  views INTEGER DEFAULT 0,
  likes INTEGER DEFAULT 0,
  createdAt TIMESTAMPTZ DEFAULT NOW(),
  updatedAt TIMESTAMPTZ DEFAULT NOW()
);

-- Projects table
CREATE TABLE IF NOT EXISTS public.projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT,
  longDescription TEXT,
  category TEXT,
  image TEXT,
  technologies TEXT[] DEFAULT '{}',
  liveUrl TEXT,
  githubUrl TEXT,
  features TEXT[] DEFAULT '{}',
  client TEXT,
  duration TEXT,
  status TEXT DEFAULT 'completed',
  year INTEGER,
  platform TEXT,
  impact JSONB,
  metrics JSONB,
  challenge TEXT,
  solution TEXT,
  results TEXT,
  testimonial JSONB,
  gallery TEXT[],
  tags TEXT[] DEFAULT '{}',
  completedDate TEXT,
  type TEXT,
  createdAt TIMESTAMPTZ DEFAULT NOW(),
  updatedAt TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Public read blog posts" ON public.blog_posts;
DROP POLICY IF EXISTS "Admin write blog posts" ON public.blog_posts;
DROP POLICY IF EXISTS "Public read projects" ON public.projects;
DROP POLICY IF EXISTS "Admin write projects" ON public.projects;

-- Create policies for public read access
CREATE POLICY "Public read blog posts" ON public.blog_posts
FOR SELECT USING (true);

CREATE POLICY "Public read projects" ON public.projects
FOR SELECT USING (true);

-- Create policies for authenticated users (admin panel)
CREATE POLICY "Admin write blog posts" ON public.blog_posts
FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Admin write projects" ON public.projects
FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Enable Realtime (optional, for live updates)
ALTER PUBLICATION supabase_realtime ADD TABLE public.blog_posts;
ALTER PUBLICATION supabase_realtime ADD TABLE public.projects;

-- Add indexes for better performance
CREATE INDEX IF NOT EXISTS idx_blog_posts_status ON public.blog_posts(status);
CREATE INDEX IF NOT EXISTS idx_blog_posts_created_at ON public.blog_posts(createdAt);
CREATE INDEX IF NOT EXISTS idx_projects_status ON public.projects(status);
CREATE INDEX IF NOT EXISTS idx_projects_created_at ON public.projects(createdAt);

-- Insert sample data for testing (optional)
INSERT INTO public.blog_posts (title, slug, excerpt, content, category, tags, status, featured) VALUES
('Getting Started with Supabase', 'getting-started-supabase', 'Learn how to set up and use Supabase for your next project', 'Complete guide to Supabase setup...', 'tutorial', ARRAY['supabase', 'database', 'tutorial'], 'published', true)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.projects (title, description, category, status, platform, type) VALUES
('Sample Portfolio Project', 'A sample project to test the admin panel functionality', 'Web Development', 'completed', 'Custom', 'Sample Project')
ON CONFLICT DO NOTHING;

-- Verify tables are created
SELECT 'Tables created successfully!' as status;
SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' AND table_name IN ('blog_posts', 'projects');
