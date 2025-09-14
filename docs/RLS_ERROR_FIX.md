# 🚨 RLS Error Fix Guide - Step by Step

## ❌ **The Error You're Seeing:**
```
"new row violates row-level security policy"
"Failed to upload: row-level security policy"
"Cannot access images: Storage policies not configured"
```

## ✅ **Complete Fix - Follow These Steps:**

### **Step 1: Create Storage Bucket** ⚠️ **CRITICAL**

1. **Go to your Supabase Dashboard**
2. **Navigate to:** Storage → Buckets
3. **Click:** "Create a new bucket"
4. **Settings:**
   - **Bucket name:** `images` (exactly this name!)
   - **Public bucket:** ✅ **ENABLE THIS!** (Very important!)
   - **File size limit:** 50MB
   - **Allowed MIME types:** Leave empty

**Screenshot location:** Storage → Buckets → New Bucket

---

### **Step 2: Set Storage Policies** 🔧

1. **Go to:** Storage → Policies 
2. **Click:** "New Policy" 
3. **Or run SQL directly:** Go to SQL Editor

**Copy and paste this EXACT code:**

```sql
-- Enable RLS (if not already enabled)
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

-- Policy 1: Allow public READ access to all images
DROP POLICY IF EXISTS "Public read access for images" ON storage.objects;
CREATE POLICY "Public read access for images" 
ON storage.objects FOR SELECT 
TO public 
USING (bucket_id = 'images');

-- Policy 2: Allow authenticated users to UPLOAD images
DROP POLICY IF EXISTS "Authenticated users can upload images" ON storage.objects;
CREATE POLICY "Authenticated users can upload images" 
ON storage.objects FOR INSERT 
TO authenticated 
WITH CHECK (bucket_id = 'images');

-- Policy 3: Allow authenticated users to UPDATE images
DROP POLICY IF EXISTS "Authenticated users can update images" ON storage.objects;
CREATE POLICY "Authenticated users can update images" 
ON storage.objects FOR UPDATE 
TO authenticated 
USING (bucket_id = 'images');

-- Policy 4: Allow authenticated users to DELETE images
DROP POLICY IF EXISTS "Authenticated users can delete images" ON storage.objects;
CREATE POLICY "Authenticated users can delete images" 
ON storage.objects FOR DELETE 
TO authenticated 
USING (bucket_id = 'images');
```

---

### **Step 3: Verify Setup** ✅

**Run this query to check if everything is working:**

```sql
-- Check if bucket exists
SELECT * FROM storage.buckets WHERE id = 'images';

-- Check if policies exist  
SELECT policyname, cmd 
FROM pg_policies 
WHERE schemaname = 'storage' AND tablename = 'objects';
```

**Expected result:** 
- 1 bucket named `images` 
- 4 policies for SELECT, INSERT, UPDATE, DELETE

---

### **Step 4: Test Upload** 🧪

1. **Logout and login again** to admin panel
2. **Go to:** Image Gallery 
3. **Try uploading** a small test image
4. **Check browser console** for any errors

---

## 🛠️ **Troubleshooting:**

### **Still getting errors?**

**Error:** "Bucket not found"
**Fix:** Make sure bucket name is exactly `images` (lowercase)

**Error:** "row-level security policy"  
**Fix:** Re-run the SQL policies above

**Error:** "You must be logged in"
**Fix:** Logout → Login again to admin panel

**Error:** "Failed to upload"
**Fix:** Check bucket is set to PUBLIC

---

## 📋 **Quick Checklist:**

- [ ] ✅ Bucket named `images` exists
- [ ] ✅ Bucket is set to PUBLIC  
- [ ] ✅ All 4 storage policies created
- [ ] ✅ RLS is enabled on storage.objects
- [ ] ✅ Logged out and back in to admin panel
- [ ] ✅ Browser console shows no errors

---

## 🎯 **After Fix - You Should See:**

✅ **Image Gallery loads** without errors  
✅ **Upload works** with drag & drop  
✅ **Storage stats** show real data  
✅ **Images appear** in the gallery  
✅ **Delete function** works properly  

---

## 📞 **Still Need Help?**

If you're still getting errors after following ALL steps:

1. **Share the EXACT error message** from browser console
2. **Screenshot** of your Storage → Buckets page  
3. **Screenshot** of your Storage → Policies page
4. **Confirm** you've run ALL the SQL commands above

**The image upload system will work 100% after proper setup!** 🚀
