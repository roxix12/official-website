import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Icon from '../components/AppIcon';
import SEOHead from '../components/SEOHead';
import Button from '../components/ui/Button';
import toast from 'react-hot-toast';

const Profile = () => {
  const { user, signOut, loading } = useAuth();
  const [isSigningOut, setIsSigningOut] = useState(false);
  const navigate = useNavigate();

  // Redirect if not authenticated
  useEffect(() => {
    if (!loading && !user) {
      navigate('/auth/login', { replace: true });
    }
  }, [user, loading, navigate]);

  const handleSignOut = async () => {
    setIsSigningOut(true);
    try {
      toast.loading('Signing out...', { id: 'signout-loading' });
      await signOut();
      toast.dismiss('signout-loading');
      toast.success('Successfully signed out!');
      navigate('/', { replace: true });
    } catch (error) {
      console.error('Sign out error:', error);
      toast.dismiss('signout-loading');
      toast.error('Failed to sign out. Please try again.');
    } finally {
      setIsSigningOut(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-black to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-cyan-400/30 border-t-cyan-400 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect
  }

  const joinDate = new Date(user.created_at).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const providerIcon = user.app_metadata?.provider === 'discord' ? 'MessageCircle' : 'Github';
  const providerName = user.app_metadata?.provider === 'discord' ? 'Discord' : 'GitHub';
  const providerColor = user.app_metadata?.provider === 'discord' ? 'text-indigo-400' : 'text-gray-400';

  return (
    <>
      <SEOHead 
        title="Profile - CDW Burhan Portfolio"
        description="Manage your profile and account settings on CDW Burhan's portfolio."
        keywords="profile, account, user, settings"
      />
      
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-black to-slate-900 pt-24 pb-12">
        {/* Background Effects */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-white mb-4">Your Profile</h1>
            <p className="text-gray-400 text-lg">Manage your account and preferences</p>
          </div>

          {/* Profile Card */}
          <div className="bg-black/80 backdrop-blur-xl border border-white/20 rounded-2xl p-8 shadow-2xl">
            <div className="flex flex-col lg:flex-row lg:items-center lg:space-x-8">
              {/* Avatar Section */}
              <div className="flex-shrink-0 text-center lg:text-left mb-8 lg:mb-0">
                <div className="relative inline-block">
                  <img
                    src={user.user_metadata?.avatar_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.user_metadata?.full_name || user.email)}&background=0ea5e9&color=fff&size=150`}
                    alt={user.user_metadata?.full_name || user.email}
                    className="w-32 h-32 rounded-full object-cover ring-4 ring-cyan-400/30 shadow-xl"
                  />
                  <div className="absolute -bottom-2 -right-2 bg-green-500 w-8 h-8 rounded-full border-4 border-black flex items-center justify-center">
                    <div className="w-3 h-3 bg-white rounded-full"></div>
                  </div>
                </div>
              </div>

              {/* Profile Info */}
              <div className="flex-1">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Basic Info */}
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-1">Full Name</label>
                      <p className="text-white text-lg font-semibold">{user.user_metadata?.full_name || 'Not provided'}</p>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-1">Email Address</label>
                      <p className="text-white">{user.email}</p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-1">Username</label>
                      <p className="text-white">{user.user_metadata?.user_name || user.user_metadata?.preferred_username || 'Not available'}</p>
                    </div>
                  </div>

                  {/* Account Details */}
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-1">Authentication Provider</label>
                      <div className="flex items-center space-x-2">
                        <Icon name={providerIcon} size={20} className={providerColor} />
                        <span className="text-white capitalize">{providerName}</span>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-1">Member Since</label>
                      <p className="text-white">{joinDate}</p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-1">Account Status</label>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                        <span className="text-green-400 text-sm font-medium">Active</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="my-8 border-t border-white/10"></div>

            {/* Account Actions */}
            <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
              <div className="flex space-x-4">
                <Button
                  variant="outline"
                  onClick={() => navigate('/')}
                  className="border-gray-600 text-gray-300 hover:text-white hover:border-gray-500"
                >
                  <Icon name="Home" size={16} className="mr-2" />
                  Back to Home
                </Button>
                
                <Button
                  variant="outline"
                  onClick={() => navigate('/contact-multi-channel-collaboration-hub')}
                  className="border-cyan-400/30 text-cyan-400 hover:text-cyan-300 hover:border-cyan-400/50"
                >
                  <Icon name="MessageCircle" size={16} className="mr-2" />
                  Contact Support
                </Button>
              </div>

              <Button
                variant="outline"
                onClick={handleSignOut}
                disabled={isSigningOut}
                className="border-red-500/30 text-red-400 hover:text-red-300 hover:border-red-500/50 hover:bg-red-500/10"
              >
                <Icon name="LogOut" size={16} className="mr-2" />
                {isSigningOut ? 'Signing Out...' : 'Sign Out'}
              </Button>
            </div>
          </div>

          {/* Additional Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            {/* Activity Card */}
            <div className="bg-black/60 backdrop-blur-xl border border-white/10 rounded-xl p-6">
              <div className="flex items-center space-x-3 mb-4">
                <Icon name="Activity" size={24} className="text-cyan-400" />
                <h3 className="text-white font-semibold">Activity</h3>
              </div>
              <p className="text-gray-400 text-sm">You're actively engaged with the platform.</p>
            </div>

            {/* Security Card */}
            <div className="bg-black/60 backdrop-blur-xl border border-white/10 rounded-xl p-6">
              <div className="flex items-center space-x-3 mb-4">
                <Icon name="Shield" size={24} className="text-green-400" />
                <h3 className="text-white font-semibold">Security</h3>
              </div>
              <p className="text-gray-400 text-sm">Your account is secured with OAuth 2.0.</p>
            </div>

            {/* Preferences Card */}
            <div className="bg-black/60 backdrop-blur-xl border border-white/10 rounded-xl p-6">
              <div className="flex items-center space-x-3 mb-4">
                <Icon name="Settings" size={24} className="text-purple-400" />
                <h3 className="text-white font-semibold">Preferences</h3>
              </div>
              <p className="text-gray-400 text-sm">Customize your experience.</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
