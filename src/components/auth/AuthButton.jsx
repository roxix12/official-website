import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import Icon from '../AppIcon';

const AuthButton = ({ className = "", size = "sm", variant = "outline" }) => {
  const { user, loading, signOut } = useAuth();

  if (loading) {
    return (
      <div className={`animate-pulse ${className}`}>
        <div className="w-8 h-8 bg-gray-600/50 rounded-full"></div>
      </div>
    );
  }

  if (user) {
    return (
      <div className={`flex items-center space-x-4 ${className}`}>
        {/* User Profile Link */}
        <Link
          to="/profile"
          className="group flex items-center space-x-3 p-2 pr-4 rounded-full bg-gradient-to-r from-gray-800/50 to-gray-900/50 hover:from-gray-700/60 hover:to-gray-800/60 border border-white/10 hover:border-white/20 transition-all duration-300 backdrop-blur-sm"
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
        </Link>

        {/* Sign Out Button */}
        <button
          onClick={signOut}
          className="flex items-center space-x-2 px-4 py-2 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 hover:border-red-500/40 text-red-400 hover:text-red-300 rounded-lg transition-all duration-300"
        >
          <Icon name="LogOut" size={16} />
          <span className="text-sm font-medium hidden sm:block">Sign Out</span>
        </button>
      </div>
    );
  }

  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      {/* Sign In Button */}
      <Link
        to="/auth/login"
        className="group relative overflow-hidden flex items-center space-x-3 px-6 py-3 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 hover:from-cyan-400 hover:via-blue-400 hover:to-purple-400 text-white rounded-full transition-all duration-500 transform hover:scale-105 hover:shadow-xl hover:shadow-cyan-500/25"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
        <div className="relative flex items-center space-x-2">
          <div className="w-6 h-6 bg-white/10 rounded-full flex items-center justify-center">
            <Icon name="User" size={14} className="text-white" />
          </div>
          <span className="text-sm font-semibold">Sign In</span>
        </div>
      </Link>

      {/* Sign Up Button */}
      <Link
        to="/auth/signup"
        className="group flex items-center space-x-2 px-4 py-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-white rounded-full transition-all duration-300 transform hover:scale-105"
      >
        <div className="w-5 h-5 bg-white/10 rounded-full flex items-center justify-center">
          <Icon name="UserPlus" size={12} className="text-white" />
        </div>
        <span className="text-sm font-medium">Sign Up</span>
      </Link>
    </div>
  );
};

export default AuthButton;