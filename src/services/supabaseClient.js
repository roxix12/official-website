import { createClient } from '@supabase/supabase-js'

// Resolve env safely for Vite and runtime-injected window.__env
const resolveEnv = (key, fallbackKeys = []) => {
  const value = import.meta?.env?.[key]
    || (typeof window !== 'undefined' && window.__env && window.__env[key])
    || fallbackKeys.map(k => import.meta?.env?.[k] || (typeof window !== 'undefined' && window.__env && window.__env[k])).find(Boolean)
  return value
}

// Prefer Vite-style env names. Fallback to NEXT_PUBLIC_* if provided in Vercel.
// Fallback defaults (requested by user). Replace if you rotate keys.
const DEFAULT_SUPABASE_URL = 'https://xwqimfzjickiubkfxmdc.supabase.co'
const DEFAULT_SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh3cWltZnpqaWNraXVia2Z4bWRjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ4OTkwMDksImV4cCI6MjA3MDQ3NTAwOX0.VFFU-AqIjw-dqxQW_0ACkGPwuhrRxPEWZhJl4ksMZXE'

let SUPABASE_URL = resolveEnv('VITE_SUPABASE_URL', ['NEXT_PUBLIC_SUPABASE_URL', 'SUPABASE_URL'])
let SUPABASE_ANON_KEY = resolveEnv('VITE_SUPABASE_ANON_KEY', ['NEXT_PUBLIC_SUPABASE_ANON_KEY', 'SUPABASE_ANON_KEY'])

// If not provided by env (build or runtime), use defaults
if (!SUPABASE_URL) SUPABASE_URL = DEFAULT_SUPABASE_URL
if (!SUPABASE_ANON_KEY) SUPABASE_ANON_KEY = DEFAULT_SUPABASE_ANON_KEY

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  // eslint-disable-next-line no-console
  console.warn('[Supabase] Missing env. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.')
}

let client = null
try {
  if (SUPABASE_URL && SUPABASE_ANON_KEY) {
    client = createClient(
      SUPABASE_URL,
      SUPABASE_ANON_KEY,
      {
        auth: {
          persistSession: true, // Enable auth persistence for login
          detectSessionInUrl: true, // Detect auth callback URLs
          autoRefreshToken: true, // Auto refresh tokens
          flowType: 'pkce',
          storage: window?.localStorage,
        },
        db: { schema: 'public' },
      }
    )
  }
} catch (e) {
  // eslint-disable-next-line no-console
  console.error('[Supabase] Failed to initialize client:', e)
}

export const supabase = client
export default client
export const hasSupabaseEnv = Boolean(SUPABASE_URL && SUPABASE_ANON_KEY)

// Utility functions for fetching data
export const fetchProjects = async () => {
  if (!client) {
    console.warn('Supabase client not available')
    return []
  }
  
  try {
    const { data, error } = await client
      .from('projects')
      .select('*')
      .eq('status', 'completed')
      .order('updatedAt', { ascending: false })
    
    if (error) {
      console.error('Error fetching projects:', error)
      return []
    }
    
    return data || []
  } catch (error) {
    console.error('Error fetching projects:', error)
    return []
  }
}

export const fetchBlogPosts = async () => {
  if (!client) {
    console.warn('Supabase client not available')
    return []
  }
  
  try {
    const { data, error } = await client
      .from('blog_posts')
      .select('*')
      .eq('status', 'published')
      .order('updatedAt', { ascending: false })
    
    if (error) {
      console.error('Error fetching blog posts:', error)
      return []
    }
    
    return data || []
  } catch (error) {
    console.error('Error fetching blog posts:', error)
    return []
  }
}
