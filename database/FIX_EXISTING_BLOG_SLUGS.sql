-- Fix existing blog posts that don't have slugs
-- Run this in Supabase SQL Editor

-- Update existing blog posts that don't have slugs
UPDATE public.blog_posts 
SET slug = 
  CASE 
    WHEN slug IS NULL OR slug = '' THEN
      lower(
        regexp_replace(
          regexp_replace(title, '[^a-zA-Z0-9\s-]', '', 'g'),
          '\s+', '-', 'g'
        )
      )
    ELSE slug
  END
WHERE slug IS NULL OR slug = '';

-- Ensure all slugs are unique by adding numbers to duplicates
WITH duplicates AS (
  SELECT id, slug, 
         ROW_NUMBER() OVER (PARTITION BY slug ORDER BY "createdAt") as rn
  FROM public.blog_posts 
  WHERE slug IS NOT NULL
)
UPDATE public.blog_posts 
SET slug = CONCAT(blog_posts.slug, '-', duplicates.rn)
FROM duplicates 
WHERE blog_posts.id = duplicates.id 
  AND duplicates.rn > 1;

-- Verify the results
SELECT id, title, slug, "createdAt" FROM public.blog_posts ORDER BY "createdAt" DESC;
