# 🔐 Authentication Setup Guide

This project now includes complete Discord and GitHub OAuth authentication using Supabase Auth.

## ✅ Features Added

### 🎨 Frontend Components
- **AuthButton Component** - Responsive login/logout button for header
- **Login Page** (`/auth/login`) - Dedicated login page with OAuth providers
- **Signup Page** (`/auth/signup`) - Registration page with benefits showcase
- **AuthContext** - React context for global authentication state

### 🔧 Integration Points
- **Header Integration** - Auth button in both desktop and mobile navigation
- **Protected Routes** - Ready for route protection implementation
- **User Profile** - User avatar and dropdown with profile info
- **Auto-redirect** - Automatic redirect after successful authentication

## 🚀 Setup Instructions

### 1. Environment Variables

Create a `.env` file in your project root:

```env
# Supabase Configuration
VITE_SUPABASE_URL=https://xwqimfzjickiubkfxmdc.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh3cWltZnpqaWNraXVia2Z4bWRjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ4OTkwMDksImV4cCI6MjA3MDQ3NTAwOX0.VFFU-AqIjw-dqxQW_0ACkGPwuhrRxPEWZhJl4ksMZXE
```

### 2. Supabase Auth Configuration

In your Supabase dashboard:

#### A) Enable Authentication Providers

1. Go to **Authentication > Providers**
2. Enable **Discord**:
   - Client ID: `[Your Discord App Client ID]`
   - Client Secret: `[Your Discord App Client Secret]`
   - Redirect URL: `https://xwqimfzjickiubkfxmdc.supabase.co/auth/v1/callback`

3. Enable **GitHub**:
   - Client ID: `[Your GitHub App Client ID]`
   - Client Secret: `[Your GitHub App Client Secret]`
   - Redirect URL: `https://xwqimfzjickiubkfxmdc.supabase.co/auth/v1/callback`

#### B) Configure Site URL & Redirect URLs

1. Go to **Authentication > URL Configuration**
2. Set **Site URL**: 
   - Development: `http://localhost:4028`
   - Production: `https://yourdomain.com`
3. Add **Redirect URLs**:
   - `http://localhost:4028/auth/login`
   - `http://localhost:4028/auth/signup`
   - `https://yourdomain.com/auth/login`
   - `https://yourdomain.com/auth/signup`

### 3. OAuth App Setup

#### Discord Application Setup
1. Go to [Discord Developer Portal](https://discord.com/developers/applications)
2. Create a new application
3. Go to **OAuth2** section
4. Add redirect URI: `https://xwqimfzjickiubkfxmdc.supabase.co/auth/v1/callback`
5. Copy **Client ID** and **Client Secret**

#### GitHub Application Setup
1. Go to [GitHub Developer Settings](https://github.com/settings/applications/new)
2. Create a new OAuth App
3. Set **Authorization callback URL**: `https://xwqimfzjickiubkfxmdc.supabase.co/auth/v1/callback`
4. Copy **Client ID** and **Client Secret**

## 📦 Vercel Deployment Setup

### Environment Variables for Vercel

Add these environment variables in your Vercel dashboard:

```env
VITE_SUPABASE_URL=https://xwqimfzjickiubkfxmdc.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh3cWltZnpqaWNraXVia2Z4bWRjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ4OTkwMDksImV4cCI6MjA3MDQ3NTAwOX0.VFFU-AqIjw-dqxQW_0ACkGPwuhrRxPEWZhJl4ksMZXE
```

### Deploy Commands

```bash
# Build the project
npm run build

# Deploy to Vercel (if using Vercel CLI)
vercel --prod

# Or deploy via GitHub integration
git add .
git commit -m "Add Discord & GitHub authentication"
git push origin main
```

## 🎯 Usage Examples

### Check Authentication Status
```jsx
import { useAuth } from '../contexts/AuthContext';

function MyComponent() {
  const { user, loading } = useAuth();
  
  if (loading) return <div>Loading...</div>;
  
  return (
    <div>
      {user ? (
        <p>Welcome, {user.user_metadata?.full_name}!</p>
      ) : (
        <p>Please sign in</p>
      )}
    </div>
  );
}
```

### Programmatic Sign In
```jsx
import { useAuth } from '../contexts/AuthContext';

function LoginButton() {
  const { signInWithDiscord, signInWithGitHub } = useAuth();
  
  return (
    <div>
      <button onClick={signInWithDiscord}>
        Sign in with Discord
      </button>
      <button onClick={signInWithGitHub}>
        Sign in with GitHub
      </button>
    </div>
  );
}
```

## 🛡️ Security Features

- **OAuth 2.0** - Industry standard authentication
- **PKCE Flow** - Enhanced security for SPAs
- **Session Management** - Automatic token refresh
- **Secure Storage** - Tokens stored in secure browser storage
- **CSRF Protection** - Built-in CSRF protection

## 🎨 UI Features

- **Responsive Design** - Works on all device sizes
- **Loading States** - Elegant loading animations
- **User Avatars** - Automatic avatar from OAuth providers
- **Dropdown Menu** - User profile and sign out options
- **Modern Design** - Beautiful glassmorphism effects

## 🔗 Routes Added

- `/auth/login` - Login page
- `/auth/signup` - Signup page
- User profile dropdown in header
- Authentication state in all pages

## 🚀 Ready for Production

Your authentication system is now ready for production deployment! The system will automatically:

1. Handle OAuth redirects
2. Manage user sessions
3. Provide user profile information
4. Maintain authentication state across page refreshes
5. Automatically refresh expired tokens

## 📱 Mobile Responsive

The authentication components are fully responsive and will work perfectly on:

- ✅ Desktop (1024px+)
- ✅ Tablet (768px - 1023px)
- ✅ Mobile (320px - 767px)

Your portfolio now has a complete, secure, and beautiful authentication system! 🎉
