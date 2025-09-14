-- =================================================================
-- BLOG COMMENTS SYSTEM SETUP
-- =================================================================
-- This file creates the comments table and related functionality
-- Run this in your Supabase SQL Editor
-- =================================================================

-- Step 1: Create comments table
CREATE TABLE IF NOT EXISTS public.blog_comments (
    id SERIAL PRIMARY KEY,
    blog_post_id UUID NULL,  -- Made optional since not all posts have UUIDs
    blog_post_slug VARCHAR(255) NOT NULL,
    commenter_name VARCHAR(100) NOT NULL,
    commenter_email VARCHAR(255) NOT NULL,
    comment_text TEXT NOT NULL,
    is_approved BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Step 2: Add foreign key constraint if blog_posts table exists
DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'blog_posts') THEN
        -- Add foreign key constraint if it doesn't exist
        IF NOT EXISTS (
            SELECT 1 FROM information_schema.table_constraints 
            WHERE constraint_name = 'blog_comments_post_id_fkey' 
            AND table_name = 'blog_comments'
        ) THEN
            ALTER TABLE public.blog_comments 
            ADD CONSTRAINT blog_comments_post_id_fkey 
            FOREIGN KEY (blog_post_id) REFERENCES public.blog_posts(id) ON DELETE CASCADE;
        END IF;
    END IF;
END $$;

-- Step 3: Create indexes
CREATE INDEX IF NOT EXISTS idx_comments_post_slug ON public.blog_comments(blog_post_slug);
CREATE INDEX IF NOT EXISTS idx_comments_approved ON public.blog_comments(is_approved);
CREATE INDEX IF NOT EXISTS idx_comments_created_at ON public.blog_comments(created_at);

-- Step 4: Enable RLS
ALTER TABLE public.blog_comments ENABLE ROW LEVEL SECURITY;

-- Step 5: Create RLS policies

-- Policy 1: Allow anyone to read approved comments
DROP POLICY IF EXISTS "Anyone can view approved comments" ON public.blog_comments;
CREATE POLICY "Anyone can view approved comments" 
ON public.blog_comments FOR SELECT 
TO public 
USING (is_approved = TRUE);

-- Policy 2: Allow anyone to insert comments (they'll be pending approval)
DROP POLICY IF EXISTS "Anyone can add comments" ON public.blog_comments;
CREATE POLICY "Anyone can add comments" 
ON public.blog_comments FOR INSERT 
TO public 
WITH CHECK (TRUE);

-- Policy 3: Allow authenticated users (admins) to update comments
DROP POLICY IF EXISTS "Authenticated users can moderate comments" ON public.blog_comments;
CREATE POLICY "Authenticated users can moderate comments" 
ON public.blog_comments FOR UPDATE 
TO authenticated 
USING (TRUE);

-- Policy 4: Allow authenticated users (admins) to delete comments
DROP POLICY IF EXISTS "Authenticated users can delete comments" ON public.blog_comments;
CREATE POLICY "Authenticated users can delete comments" 
ON public.blog_comments FOR DELETE 
TO authenticated 
USING (TRUE);

-- Step 6: Create updated_at trigger
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS set_updated_at ON public.blog_comments;
CREATE TRIGGER set_updated_at
    BEFORE UPDATE ON public.blog_comments
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();

-- Step 7: Add sample approved comment (optional)
INSERT INTO public.blog_comments (
    blog_post_slug, 
    commenter_name, 
    commenter_email, 
    comment_text, 
    is_approved
) VALUES (
    'sample-slug', 
    'John Doe', 
    'john@example.com', 
    'Great article! Very helpful information.', 
    TRUE
) ON CONFLICT DO NOTHING;

-- =================================================================
-- VERIFICATION QUERIES
-- =================================================================

-- Check if table was created
SELECT table_name, column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'blog_comments' 
ORDER BY ordinal_position;

-- Check policies
SELECT policyname, cmd, roles 
FROM pg_policies 
WHERE schemaname = 'public' AND tablename = 'blog_comments';

-- =================================================================
-- ADMIN QUERIES (Useful for comment management)
-- =================================================================

-- Get all pending comments
-- SELECT * FROM blog_comments WHERE is_approved = FALSE ORDER BY created_at DESC;

-- Approve a comment
-- UPDATE blog_comments SET is_approved = TRUE WHERE id = [comment_id];

-- Get comments for a specific blog post
-- SELECT * FROM blog_comments WHERE blog_post_slug = 'your-post-slug' AND is_approved = TRUE ORDER BY created_at ASC;

-- Delete a comment
-- DELETE FROM blog_comments WHERE id = [comment_id];
