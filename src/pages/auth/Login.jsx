import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import Icon from '../../components/AppIcon';
import SEOHead from '../../components/SEOHead';

const Login = () => {
  const { user, signInWithDiscord, signInWithGitHub } = useAuth();
  const [loading, setLoading] = useState(false);
  const [provider, setProvider] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Redirect if already authenticated
  useEffect(() => {
    if (user) {
      const redirectTo = location.state?.from?.pathname || '/';
      navigate(redirectTo, { replace: true });
    }
  }, [user, navigate, location]);

  const handleSignIn = async (authProvider) => {
    setLoading(true);
    setProvider(authProvider);
    
    try {
      if (authProvider === 'discord') {
        await signInWithDiscord();
      } else if (authProvider === 'github') {
        await signInWithGitHub();
      }
    } catch (error) {
      console.error('Authentication error:', error);
    } finally {
      setLoading(false);
      setProvider(null);
    }
  };

  return (
    <>
      <SEOHead 
        title="Sign In - CDW Burhan Portfolio"
        description="Sign in to access exclusive content and features on CDW Burhan's portfolio."
        keywords="login, signin, authentication, discord, github"
      />
      
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-black to-slate-900 flex items-center justify-center p-4">
        {/* Background Effects */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
        </div>

        <div className="relative w-full max-w-md">
          {/* Auth Card */}
          <div className="bg-black/80 backdrop-blur-xl border border-white/20 rounded-2xl p-8 shadow-2xl">
            {/* Header */}
            <div className="text-center mb-8">
              <Link to="/" className="inline-flex items-center space-x-2 text-white hover:text-cyan-300 transition-colors duration-300 mb-6">
                <Icon name="ArrowLeft" size={20} />
                <span>Back to Portfolio</span>
              </Link>
              
              <div className="mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="User" size={32} className="text-white" />
                </div>
                <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
                <p className="text-gray-400">Sign in to access exclusive content</p>
              </div>
            </div>

            {/* Auth Buttons */}
            <div className="space-y-4">
              <button
                onClick={() => handleSignIn('discord')}
                disabled={loading}
                className="w-full flex items-center justify-center space-x-3 px-6 py-4 bg-[#5865F2] hover:bg-[#4752C4] text-white rounded-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg hover:shadow-xl"
              >
                <Icon name="MessageCircle" size={20} />
                <span className="font-medium">Continue with Discord</span>
                {loading && provider === 'discord' && (
                  <div className="ml-auto">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  </div>
                )}
              </button>
              
              <button
                onClick={() => handleSignIn('github')}
                disabled={loading}
                className="w-full flex items-center justify-center space-x-3 px-6 py-4 bg-gray-800 hover:bg-gray-700 text-white rounded-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg hover:shadow-xl"
              >
                <Icon name="Github" size={20} />
                <span className="font-medium">Continue with GitHub</span>
                {loading && provider === 'github' && (
                  <div className="ml-auto">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  </div>
                )}
              </button>
            </div>

            {/* Divider */}
            <div className="my-8 flex items-center">
              <div className="flex-1 border-t border-white/10"></div>
              <span className="px-4 text-gray-500 text-sm">Secure Authentication</span>
              <div className="flex-1 border-t border-white/10"></div>
            </div>

            {/* Features */}
            <div className="space-y-3 mb-6">
              <div className="flex items-center space-x-3 text-sm text-gray-400">
                <Icon name="Shield" size={16} className="text-green-400" />
                <span>Secure OAuth authentication</span>
              </div>
              <div className="flex items-center space-x-3 text-sm text-gray-400">
                <Icon name="Lock" size={16} className="text-blue-400" />
                <span>Your data is protected</span>
              </div>
              <div className="flex items-center space-x-3 text-sm text-gray-400">
                <Icon name="Star" size={16} className="text-purple-400" />
                <span>Access to exclusive content</span>
              </div>
            </div>

            {/* Footer */}
            <div className="text-center">
              <p className="text-xs text-gray-500">
                By signing in, you agree to our{' '}
                <Link to="/legal/terms" className="text-cyan-400 hover:text-cyan-300 transition-colors">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link to="/legal/privacy" className="text-cyan-400 hover:text-cyan-300 transition-colors">
                  Privacy Policy
                </Link>
              </p>
            </div>
          </div>

          {/* Additional Info */}
          <div className="mt-8 text-center">
            <p className="text-gray-400 text-sm">
              New to the platform?{' '}
              <Link to="/auth/signup" className="text-cyan-400 hover:text-cyan-300 transition-colors font-medium">
                Create an account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
