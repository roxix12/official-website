import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import Icon from '../AppIcon';
import Button from '../ui/Button';

const AuthButton = ({ className = "", size = "sm", variant = "outline" }) => {
  const { user, loading, signInWithDiscord, signInWithGitHub, signOut } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [authLoading, setAuthLoading] = useState(false);

  const handleSignIn = async (provider) => {
    setAuthLoading(true);
    try {
      if (provider === 'discord') {
        await signInWithDiscord();
      } else if (provider === 'github') {
        await signInWithGitHub();
      }
    } catch (error) {
      console.error('Authentication error:', error);
    } finally {
      setAuthLoading(false);
    }
  };

  const handleSignOut = async () => {
    setAuthLoading(true);
    try {
      await signOut();
      setIsDropdownOpen(false);
    } catch (error) {
      console.error('Sign out error:', error);
    } finally {
      setAuthLoading(false);
    }
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };

  if (loading) {
    return (
      <div className={`animate-pulse ${className}`}>
        <div className="w-8 h-8 bg-gray-600/50 rounded-full"></div>
      </div>
    );
  }

  if (user) {
    return (
      <div className={`relative ${className}`}>
        <button
          onClick={toggleDropdown}
          className="flex items-center space-x-2 p-2 rounded-full hover:bg-white/10 transition-all duration-300 group"
          disabled={authLoading}
        >
          <div className="relative">
            <img
              src={user.user_metadata?.avatar_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.user_metadata?.full_name || user.email)}&background=0ea5e9&color=fff`}
              alt={user.user_metadata?.full_name || user.email}
              className="w-8 h-8 rounded-full object-cover ring-2 ring-white/30 group-hover:ring-white/50 transition-all duration-300"
            />
            <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-black"></div>
          </div>
          <div className="hidden sm:block text-left">
            <p className="text-sm font-medium text-white">{user.user_metadata?.full_name || 'User'}</p>
            <p className="text-xs text-gray-400">{user.user_metadata?.provider_id || 'authenticated'}</p>
          </div>
          <Icon name="ChevronDown" size={16} className="text-gray-400 group-hover:text-white transition-colors duration-300" />
        </button>

        {/* Dropdown Menu */}
        {isDropdownOpen && (
          <>
            <div
              className="fixed inset-0 z-10"
              onClick={closeDropdown}
            ></div>
            <div className="absolute right-0 top-full mt-2 w-64 bg-black/95 backdrop-blur-xl border border-white/20 rounded-xl shadow-2xl z-20 overflow-hidden">
              <div className="p-4 border-b border-white/10">
                <div className="flex items-center space-x-3">
                  <img
                    src={user.user_metadata?.avatar_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.user_metadata?.full_name || user.email)}&background=0ea5e9&color=fff`}
                    alt={user.user_metadata?.full_name || user.email}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="text-white font-medium">{user.user_metadata?.full_name || 'User'}</p>
                    <p className="text-gray-400 text-sm">{user.email}</p>
                    <div className="flex items-center space-x-1 mt-1">
                      <Icon 
                        name={user.app_metadata?.provider === 'discord' ? 'MessageCircle' : 'Github'} 
                        size={14} 
                        className="text-gray-500" 
                      />
                      <span className="text-xs text-gray-500 capitalize">{user.app_metadata?.provider}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="p-2 space-y-1">
                <Link
                  to="/profile"
                  onClick={closeDropdown}
                  className="w-full flex items-center space-x-3 px-3 py-2 text-left text-gray-300 hover:text-white hover:bg-cyan-500/10 rounded-lg transition-all duration-300 group"
                >
                  <Icon name="User" size={16} className="text-cyan-400 group-hover:text-cyan-300" />
                  <span>View Profile</span>
                </Link>
                
                <button
                  onClick={handleSignOut}
                  disabled={authLoading}
                  className="w-full flex items-center space-x-3 px-3 py-2 text-left text-gray-300 hover:text-white hover:bg-red-500/10 rounded-lg transition-all duration-300 group"
                >
                  <Icon name="LogOut" size={16} className="text-red-400 group-hover:text-red-300" />
                  <span>Sign Out</span>
                  {authLoading && (
                    <div className="ml-auto">
                      <div className="w-4 h-4 border-2 border-red-400/30 border-t-red-400 rounded-full animate-spin"></div>
                    </div>
                  )}
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      <button
        onClick={toggleDropdown}
        className="flex items-center space-x-2 px-4 py-2 rounded-full bg-gradient-to-r from-cyan-600/20 to-purple-600/20 hover:from-cyan-500/30 hover:to-purple-500/30 border border-cyan-400/30 hover:border-cyan-400/50 text-white transition-all duration-300 group"
        disabled={authLoading}
      >
        <Icon name="User" size={16} className="group-hover:text-cyan-300 transition-colors duration-300" />
        <span className="text-sm font-medium">Sign In</span>
        <Icon name="ChevronDown" size={14} className="text-gray-400 group-hover:text-white transition-colors duration-300" />
      </button>

      {/* Sign In Dropdown */}
      {isDropdownOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={closeDropdown}
          ></div>
          <div className="absolute right-0 top-full mt-2 w-56 bg-black/95 backdrop-blur-xl border border-white/20 rounded-xl shadow-2xl z-20 overflow-hidden">
            <div className="p-4">
              <h3 className="text-white font-medium mb-3">Sign in to continue</h3>
              
              <div className="space-y-2">
                <button
                  onClick={() => handleSignIn('discord')}
                  disabled={authLoading}
                  className="w-full flex items-center space-x-3 px-4 py-3 bg-[#5865F2] hover:bg-[#4752C4] text-white rounded-lg transition-all duration-300 group disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Icon name="MessageCircle" size={18} />
                  <span className="font-medium">Continue with Discord</span>
                  {authLoading && (
                    <div className="ml-auto">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    </div>
                  )}
                </button>
                
                <button
                  onClick={() => handleSignIn('github')}
                  disabled={authLoading}
                  className="w-full flex items-center space-x-3 px-4 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-all duration-300 group disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Icon name="Github" size={18} />
                  <span className="font-medium">Continue with GitHub</span>
                  {authLoading && (
                    <div className="ml-auto">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    </div>
                  )}
                </button>
              </div>
              
              <p className="text-xs text-gray-400 mt-3 text-center">
                By signing in, you agree to our Terms and Privacy Policy
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AuthButton;
