import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import Icon from '../AppIcon';
import Button from '../ui/Button';

const AuthButton = ({ className = "", size = "sm", variant = "outline" }) => {
  const { user, loading, signInWithDiscord, signInWithGitHub, signOut } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [authLoading, setAuthLoading] = useState(false);
  
  // Debug log to ensure component is updating
  console.log('AuthButton render - User:', user ? 'Logged In' : 'Not Logged In');

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
          className="group flex items-center space-x-3 p-2 pr-4 rounded-full bg-gradient-to-r from-gray-800/50 to-gray-900/50 hover:from-gray-700/60 hover:to-gray-800/60 border border-white/10 hover:border-white/20 transition-all duration-300 backdrop-blur-sm"
          disabled={authLoading}
        >
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-full blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <img
              src={user.user_metadata?.avatar_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.user_metadata?.full_name || user.email)}&background=0ea5e9&color=fff`}
              alt={user.user_metadata?.full_name || user.email}
              className="relative w-9 h-9 rounded-full object-cover ring-2 ring-cyan-400/30 group-hover:ring-cyan-400/60 transition-all duration-300 shadow-lg"
            />
            <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full border-2 border-gray-900 shadow-sm"></div>
          </div>
          <div className="hidden sm:block text-left">
            <p className="text-sm font-semibold text-white group-hover:text-cyan-100 transition-colors duration-300">{user.user_metadata?.full_name || 'User'}</p>
            <p className="text-xs text-gray-400 group-hover:text-gray-300 transition-colors duration-300 capitalize">{user.app_metadata?.provider || 'authenticated'}</p>
          </div>
          <Icon name="ChevronDown" size={14} className="text-gray-400 group-hover:text-white transition-all duration-300 group-hover:rotate-180" />
        </button>

        {/* Dropdown Menu */}
        {isDropdownOpen && (
          <>
            <div
              className="fixed inset-0 z-10"
              onClick={closeDropdown}
            ></div>
            <div className="absolute right-0 top-full mt-3 w-72 bg-gradient-to-br from-gray-900/95 via-black/95 to-gray-900/95 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-2xl z-20 overflow-hidden">
              <div className="bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-blue-500/10 p-6 border-b border-white/5">
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/30 to-purple-500/30 rounded-full blur-sm"></div>
                    <img
                      src={user.user_metadata?.avatar_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.user_metadata?.full_name || user.email)}&background=0ea5e9&color=fff`}
                      alt={user.user_metadata?.full_name || user.email}
                      className="relative w-14 h-14 rounded-full object-cover ring-2 ring-cyan-400/50 shadow-xl"
                    />
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full border-2 border-gray-900 flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                  </div>
                  <div className="flex-1">
                    <p className="text-white font-semibold text-lg">{user.user_metadata?.full_name || 'User'}</p>
                    <p className="text-gray-300 text-sm">{user.email}</p>
                    <div className="flex items-center space-x-2 mt-2">
                      <div className="flex items-center space-x-1 bg-white/10 rounded-full px-2 py-1">
                        <Icon 
                          name={user.app_metadata?.provider === 'discord' ? 'MessageCircle' : 'Github'} 
                          size={12} 
                          className={user.app_metadata?.provider === 'discord' ? 'text-blue-400' : 'text-gray-400'} 
                        />
                        <span className="text-xs text-white capitalize font-medium">{user.app_metadata?.provider}</span>
                      </div>
                      <div className="flex items-center space-x-1 bg-green-500/20 text-green-400 rounded-full px-2 py-1">
                        <Icon name="Shield" size={12} />
                        <span className="text-xs font-medium">Verified</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="p-4 space-y-3">
                <Link
                  to="/profile"
                  onClick={closeDropdown}
                  className="group w-full flex items-center space-x-3 px-4 py-3 text-left bg-gradient-to-r from-cyan-500/10 to-blue-500/10 hover:from-cyan-500/20 hover:to-blue-500/20 border border-cyan-500/20 hover:border-cyan-500/40 text-white rounded-xl transition-all duration-300 transform hover:scale-[1.02]"
                >
                  <div className="w-8 h-8 bg-cyan-500/20 rounded-lg flex items-center justify-center">
                    <Icon name="User" size={16} className="text-cyan-400" />
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold">View Profile</div>
                    <div className="text-xs text-gray-400">Manage your account</div>
                  </div>
                  <Icon name="ArrowRight" size={14} className="text-gray-400 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all duration-300" />
                </Link>
                
                <button
                  onClick={handleSignOut}
                  disabled={authLoading}
                  className="group w-full flex items-center space-x-3 px-4 py-3 text-left bg-gradient-to-r from-red-500/10 to-pink-500/10 hover:from-red-500/20 hover:to-pink-500/20 border border-red-500/20 hover:border-red-500/40 text-white rounded-xl transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  <div className="w-8 h-8 bg-red-500/20 rounded-lg flex items-center justify-center">
                    <Icon name="LogOut" size={16} className="text-red-400" />
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold">Sign Out</div>
                    <div className="text-xs text-gray-400">End your session</div>
                  </div>
                  {authLoading ? (
                    <div className="w-5 h-5 border-2 border-red-400/30 border-t-red-400 rounded-full animate-spin"></div>
                  ) : (
                    <Icon name="ArrowRight" size={14} className="text-gray-400 group-hover:text-red-400 group-hover:translate-x-1 transition-all duration-300" />
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
        className="group relative overflow-hidden flex items-center space-x-3 px-6 py-3 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 hover:from-cyan-400 hover:via-blue-400 hover:to-purple-400 text-white rounded-full transition-all duration-500 transform hover:scale-105 hover:shadow-xl hover:shadow-cyan-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={authLoading}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
        <div className="relative flex items-center space-x-2">
          <div className="w-6 h-6 bg-white/10 rounded-full flex items-center justify-center">
            <Icon name="User" size={14} className="text-white" />
          </div>
          <span className="text-sm font-semibold">Sign In</span>
          <Icon name="ChevronDown" size={12} className="text-white/70 group-hover:text-white transition-all duration-300" />
        </div>
      </button>

      {/* Modern Sign In Dropdown */}
      {isDropdownOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={closeDropdown}
          ></div>
          <div className="absolute right-0 top-full mt-3 w-80 bg-gradient-to-br from-gray-900/95 via-black/95 to-gray-900/95 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-2xl z-20 overflow-hidden">
            {/* Header with gradient */}
            <div className="bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-blue-500/10 p-6 border-b border-white/5">
              <h3 className="text-white font-semibold text-lg mb-1">Welcome to CodeWithBurhan</h3>
              <p className="text-gray-400 text-sm">Choose your preferred authentication method</p>
            </div>
            
            <div className="p-6 space-y-4">
              {/* Discord Button - Modern Design */}
              <button
                onClick={() => handleSignIn('discord')}
                disabled={authLoading}
                className="group w-full relative overflow-hidden bg-gradient-to-r from-[#5865F2] to-[#4752C4] hover:from-[#4752C4] hover:to-[#3c47a0] text-white rounded-xl p-4 transition-all duration-500 transform hover:scale-[1.02] hover:shadow-2xl hover:shadow-blue-500/25 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/5 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                <div className="relative flex items-center space-x-4">
                  <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
                    <Icon name="MessageCircle" size={20} className="text-white" />
                  </div>
                  <div className="flex-1 text-left">
                    <div className="font-semibold">Continue with Discord</div>
                    <div className="text-xs text-blue-100/80">Connect with your Discord account</div>
                  </div>
                  {authLoading && provider === 'discord' ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  ) : (
                    <Icon name="ArrowRight" size={16} className="text-white/70 group-hover:text-white group-hover:translate-x-1 transition-all duration-300" />
                  )}
                </div>
              </button>
              
              {/* GitHub Button - Modern Design */}
              <button
                onClick={() => handleSignIn('github')}
                disabled={authLoading}
                className="group w-full relative overflow-hidden bg-gradient-to-r from-gray-800 to-gray-900 hover:from-gray-700 hover:to-gray-800 text-white rounded-xl p-4 transition-all duration-500 transform hover:scale-[1.02] hover:shadow-2xl hover:shadow-gray-500/25 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/5 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                <div className="relative flex items-center space-x-4">
                  <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
                    <Icon name="Github" size={20} className="text-white" />
                  </div>
                  <div className="flex-1 text-left">
                    <div className="font-semibold">Continue with GitHub</div>
                    <div className="text-xs text-gray-300/80">Connect with your GitHub account</div>
                  </div>
                  {authLoading && provider === 'github' ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  ) : (
                    <Icon name="ArrowRight" size={16} className="text-white/70 group-hover:text-white group-hover:translate-x-1 transition-all duration-300" />
                  )}
                </div>
              </button>
            </div>
            
            {/* Footer */}
            <div className="bg-gradient-to-r from-gray-900/50 to-black/50 px-6 py-4 border-t border-white/5">
              <div className="flex items-center space-x-2 text-xs text-gray-500">
                <Icon name="Shield" size={12} className="text-green-400" />
                <span>Secure OAuth 2.0 authentication</span>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                By signing in, you agree to our{' '}
                <span className="text-cyan-400 hover:text-cyan-300 cursor-pointer">Terms</span>
                {' '}and{' '}
                <span className="text-cyan-400 hover:text-cyan-300 cursor-pointer">Privacy Policy</span>
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AuthButton;
