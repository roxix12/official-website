# Debug Comments System

## Issues Found:
1. Comments showing without approval
2. Email notifications not being sent

## Debugging Steps:

### 1. Check Database Comments
Run this in Supabase SQL Editor:
```sql
-- Check all comments and their approval status
SELECT 
  id, 
  name, 
  email, 
  content, 
  is_approved, 
  post_slug, 
  created_at 
FROM public.comments 
ORDER BY created_at DESC 
LIMIT 10;
```

### 2. Check if RLS is working
```sql
-- Check RLS policies
SELECT 
  schemaname, 
  tablename, 
  rowsecurity 
FROM pg_tables 
WHERE tablename = 'comments';

-- Check policies
SELECT 
  polname, 
  cmd, 
  qual, 
  with_check 
FROM pg_policy p 
JOIN pg_class c ON c.oid = p.polrelid 
WHERE c.relname = 'comments';
```

### 3. Test Comment Insertion
```sql
-- Test manual insert
INSERT INTO public.comments (
  post_slug, 
  name, 
  email, 
  content, 
  is_approved
) VALUES (
  'test-slug', 
  'Test User', 
  'test@example.com', 
  'Test comment', 
  false
);

-- Check if it was inserted correctly
SELECT * FROM public.comments WHERE name = 'Test User';
```

## Expected Behavior:
- Comments should be inserted with `is_approved = false`
- Only approved comments should show on frontend
- Email notifications should be sent for each new comment
