-- =================================================================
-- SUPABASE STORAGE SETUP FOR IMAGE MANAGEMENT
-- =================================================================
-- This file sets up the storage bucket and policies for the admin panel
-- image upload functionality.
--
-- INSTRUCTIONS:
-- 1. Go to your Supabase Dashboard → SQL Editor
-- 2. Copy and paste this entire file
-- 3. Click "Run" to execute all commands
-- =================================================================

-- Step 1: Enable RLS on storage objects (if not already enabled)
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

-- Step 2: Create storage policies for the 'images' bucket
-- Note: Make sure you've created the 'images' bucket first via the UI!

-- Policy 1: Allow public READ access to all images
-- This allows anyone to view/download images via public URLs
DROP POLICY IF EXISTS "Public read access for images" ON storage.objects;
CREATE POLICY "Public read access for images" 
ON storage.objects FOR SELECT 
TO public 
USING (bucket_id = 'images');

-- Policy 2: Allow authenticated users to INSERT/UPLOAD images
-- This allows logged-in users to upload new images
DROP POLICY IF EXISTS "Authenticated users can upload images" ON storage.objects;
CREATE POLICY "Authenticated users can upload images" 
ON storage.objects FOR INSERT 
TO authenticated 
WITH CHECK (bucket_id = 'images');

-- Policy 3: Allow authenticated users to UPDATE images
-- This allows logged-in users to update image metadata
DROP POLICY IF EXISTS "Authenticated users can update images" ON storage.objects;
CREATE POLICY "Authenticated users can update images" 
ON storage.objects FOR UPDATE 
TO authenticated 
USING (bucket_id = 'images');

-- Policy 4: Allow authenticated users to DELETE images
-- This allows logged-in users to delete images
DROP POLICY IF EXISTS "Authenticated users can delete images" ON storage.objects;
CREATE POLICY "Authenticated users can delete images" 
ON storage.objects FOR DELETE 
TO authenticated 
USING (bucket_id = 'images');

-- =================================================================
-- VERIFICATION QUERIES
-- =================================================================
-- Run these to verify everything is set up correctly:

-- Check if RLS is enabled
SELECT schemaname, tablename, rowsecurity 
FROM pg_tables 
WHERE schemaname = 'storage' AND tablename = 'objects';

-- Check existing policies
SELECT policyname, cmd, roles, qual, with_check 
FROM pg_policies 
WHERE schemaname = 'storage' AND tablename = 'objects';

-- =================================================================
-- TROUBLESHOOTING
-- =================================================================
-- If you still get RLS errors after running this:
--
-- 1. Make sure the 'images' bucket exists in Storage → Buckets
-- 2. Make sure the bucket is set to PUBLIC
-- 3. Make sure you're logged in to the admin panel
-- 4. Check browser console for specific error messages
-- 5. Try refreshing the admin panel page
-- =================================================================
