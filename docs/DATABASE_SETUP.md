# Supabase Database Setup Guide

## New Database Configuration

Your project has been reconfigured to use the new Supabase database:

- **Project URL**: https://xwqimfzjickiubkfxmdc.supabase.co
- **Anon Key**: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh3cWltZnpqaWNraXVia2Z4bWRjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ4OTkwMDksImV4cCI6MjA3MDQ3NTAwOX0.VFFU-AqIjw-dqxQW_0ACkGPwuhrRxPEWZhJl4ksMZXE

## Required Database Schema

Run the following SQL commands in your Supabase SQL Editor to set up the required tables:

```sql
-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

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
```

## Authentication Setup

To access the admin panel, you need to create a user account in Supabase:

1. Go to your Supabase dashboard
2. Navigate to Authentication > Users
3. Click "Add user"
4. Use these credentials:
   - **Email**: admin@codewithburhan.com
   - **Password**: CdwBurhan@2024
5. Mark the user as "Email confirmed"

## Environment Variables

The following files have been updated with the new credentials:

### Admin Panel (.env)
```env
VITE_SUPABASE_URL=https://xwqimfzjickiubkfxmdc.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh3cWltZnpqaWNraXVia2Z4bWRjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ4OTkwMDksImV4cCI6MjA3MDQ3NTAwOX0.VFFU-AqIjw-dqxQW_0ACkGPwuhrRxPEWZhJl4ksMZXE
```

### Frontend (.env)
```env
VITE_SUPABASE_URL=https://xwqimfzjickiubkfxmdc.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh3cWltZnpqaWNraXVia2Z4bWRjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ4OTkwMDksImV4cCI6MjA3MDQ3NTAwOX0.VFFU-AqIjw-dqxQW_0ACkGPwuhrRxPEWZhJl4ksMZXE
VITE_GEMINI_API_KEY=AIzaSyCcsVBi3TQSpewW7nOcr5i1WwnKCkTg0ro
```

**Note**: Create these .env files in your local environment. They are ignored by git for security.

## Files Modified

### 1. Admin Panel
- `admin-panel/src/services/supabaseClient.js` - Updated Supabase credentials
- `admin-panel/README.md` - Updated documentation with new credentials
- `admin-panel/index.html` - Updated runtime environment injection

### 2. Frontend
- `src/services/supabaseClient.js` - NEW: Created Supabase client for frontend
- `src/pages/portfolio-impact-transformation-stories/index.jsx` - Updated to fetch from Supabase
- `index.html` - Updated runtime environment injection

### 3. Documentation
- `DATABASE_SETUP.md` - NEW: This setup guide

## How It Works

### Admin Panel
1. Admin logs in using Supabase authentication
2. Creates/edits projects and blog posts
3. Data is stored in Supabase tables
4. Real-time updates are enabled for immediate sync

### Frontend
1. Attempts to fetch projects from Supabase
2. Falls back to static data if Supabase is unavailable
3. Displays loading state while fetching
4. Projects added via admin panel appear automatically

## Testing the Integration

### 1. Start the Admin Panel
```bash
cd admin-panel
npm install
npm run dev
```
Access at: http://localhost:3001

### 2. Start the Frontend
```bash
cd ../
npm install
npm start
```
Access at: http://localhost:4028

### 3. Test the Flow
1. Log into admin panel (admin@codewithburhan.com / CdwBurhan@2024)
2. Go to Projects > Create Project
3. Add a new project with required fields
4. Save the project
5. Visit the frontend portfolio page
6. Verify the new project appears

## Deployment Configuration

### Vercel/Netlify Environment Variables
Set these in your deployment platform:

```
VITE_SUPABASE_URL=https://xwqimfzjickiubkfxmdc.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh3cWltZnpqaWNraXVia2Z4bWRjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ4OTkwMDksImV4cCI6MjA3MDQ3NTAwOX0.VFFU-AqIjw-dqxQW_0ACkGPwuhrRxPEWZhJl4ksMZXE
```

## Troubleshooting

### Connection Issues
1. Verify your Supabase project is active
2. Check that RLS policies are set correctly
3. Ensure authentication user exists
4. Verify environment variables are loaded

### No Data Appearing
1. Check browser console for errors
2. Verify tables exist in Supabase
3. Check RLS policies allow read access
4. Ensure project status is 'completed' and blog status is 'published'

### Admin Panel Login Issues
1. Verify user exists in Supabase Auth
2. Check email is confirmed
3. Verify password is correct
4. Check Supabase auth settings

## Security Notes

- Anon key is safe for public use (read-only access)
- Admin write access requires authentication
- RLS policies protect data integrity
- Environment variables keep credentials secure
- .env files are gitignored

## Supabase Storage Setup

### Create Storage Bucket for Images

1. Go to Supabase Dashboard → Storage
2. Create a new bucket named `images`
3. Set it as **Public** bucket
4. Run this SQL to set up storage policies:

```sql
-- Create storage bucket policies for images
INSERT INTO storage.buckets (id, name, public) VALUES ('images', 'images', true);

-- Allow public access to view images
CREATE POLICY "Public Access" ON storage.objects FOR SELECT USING (bucket_id = 'images');

-- Allow authenticated users to upload images
CREATE POLICY "Authenticated users can upload images" ON storage.objects 
FOR INSERT WITH CHECK (bucket_id = 'images' AND auth.role() = 'authenticated');

-- Allow authenticated users to update their images
CREATE POLICY "Authenticated users can update images" ON storage.objects 
FOR UPDATE USING (bucket_id = 'images' AND auth.role() = 'authenticated');

-- Allow authenticated users to delete images
CREATE POLICY "Authenticated users can delete images" ON storage.objects 
FOR DELETE USING (bucket_id = 'images' AND auth.role() = 'authenticated');
```

### Storage Configuration

**CRITICAL: You MUST create the storage bucket and policies for image upload to work!**

#### Step 1: Create Storage Bucket
Go to your Supabase Dashboard → Storage → Create a new bucket:

1. **Bucket name:** `images`
2. **Public bucket:** ✅ **YES** (Enable this!)
3. **File size limit:** 50MB
4. **Allowed MIME types:** Leave empty (allows all)

#### Step 2: Set Storage Policies
After creating the bucket, go to **Storage Policies** and run these SQL commands:

```sql
-- 1. Allow public READ access to all images
CREATE POLICY "Public read access for images" 
ON storage.objects FOR SELECT 
TO public 
USING (bucket_id = 'images');

-- 2. Allow authenticated users to INSERT images
CREATE POLICY "Authenticated users can upload images" 
ON storage.objects FOR INSERT 
TO authenticated 
WITH CHECK (bucket_id = 'images');

-- 3. Allow authenticated users to UPDATE their images
CREATE POLICY "Authenticated users can update images" 
ON storage.objects FOR UPDATE 
TO authenticated 
USING (bucket_id = 'images');

-- 4. Allow authenticated users to DELETE images
CREATE POLICY "Authenticated users can delete images" 
ON storage.objects FOR DELETE 
TO authenticated 
USING (bucket_id = 'images');
```

#### Step 3: Enable RLS on Storage
```sql
-- Enable RLS on storage.objects table (if not already enabled)
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;
```

The storage bucket will be used for:
- Blog post featured images  
- Project gallery images
- User uploaded content
- Admin panel image management

**⚠️ Important:** Without these policies, you'll get "Row Level Security" errors!

## 🗨️ Comments System Setup (IMPORTANT!)

**To enable blog comments functionality, you MUST run this additional SQL:**

```sql
-- Open Supabase SQL Editor and run this entire file:
-- COMMENTS_SETUP.sql (included in project root)
```

### Quick Comments Setup Commands:

Copy and paste this entire block into your **Supabase SQL Editor**:

```sql
-- Create comments table
CREATE TABLE IF NOT EXISTS public.blog_comments (
    id SERIAL PRIMARY KEY,
    blog_post_id UUID NOT NULL,
    blog_post_slug VARCHAR(255) NOT NULL,
    commenter_name VARCHAR(100) NOT NULL,
    commenter_email VARCHAR(255) NOT NULL,
    comment_text TEXT NOT NULL,
    is_approved BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT blog_comments_post_id_fkey FOREIGN KEY (blog_post_id) 
        REFERENCES public.blog_posts(id) ON DELETE CASCADE
);

-- Enable RLS
ALTER TABLE public.blog_comments ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read approved comments
CREATE POLICY "Anyone can view approved comments" 
ON public.blog_comments FOR SELECT 
TO public 
USING (is_approved = TRUE);

-- Allow anyone to insert comments (pending approval)
CREATE POLICY "Anyone can add comments" 
ON public.blog_comments FOR INSERT 
TO public 
WITH CHECK (TRUE);

-- Allow authenticated users to moderate
CREATE POLICY "Authenticated users can moderate comments" 
ON public.blog_comments FOR UPDATE 
TO authenticated 
USING (TRUE);

CREATE POLICY "Authenticated users can delete comments" 
ON public.blog_comments FOR DELETE 
TO authenticated 
USING (TRUE);
```

**✅ After running this, your blog comments will work perfectly!**

## Next Steps

1. Run the database setup SQL commands
2. **🗨️ Run COMMENTS_SETUP.sql for blog comments**
3. **Setup Supabase Storage bucket (see above)**
4. Create the admin user account
5. Create .env files locally
6. Test the admin panel login
7. Add a test project via admin panel
8. Verify it appears on the frontend
9. **Test image upload functionality**
10. **Test blog comment submission**
11. Update deployment environment variables
