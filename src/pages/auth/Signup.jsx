import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import Icon from '../../components/AppIcon';
import SEOHead from '../../components/SEOHead';
import toast from 'react-hot-toast';

const Signup = () => {
  const { user, signInWithDiscord, signInWithGitHub } = useAuth();
  const [loading, setLoading] = useState(false);
  const [provider, setProvider] = useState(null);
  const navigate = useNavigate();

  // Redirect if already authenticated
  useEffect(() => {
    if (user) {
      toast.success(`Welcome to CodeWithBurhan, ${user.user_metadata?.full_name || 'User'}!`);
      navigate('/', { replace: true });
    }
  }, [user, navigate]);

  const handleSignUp = async (authProvider) => {
    setLoading(true);
    setProvider(authProvider);
    
    try {
      const providerName = authProvider === 'discord' ? 'Discord' : 'GitHub';
      toast.loading(`Creating account with ${providerName}...`, { id: 'signup-loading' });
      
      if (authProvider === 'discord') {
        await signInWithDiscord();
      } else if (authProvider === 'github') {
        await signInWithGitHub();
      }
      
      toast.dismiss('signup-loading');
    } catch (error) {
      console.error('Authentication error:', error);
      toast.dismiss('signup-loading');
      toast.error('Account creation failed. Please try again.');
    } finally {
      setLoading(false);
      setProvider(null);
    }
  };

  return (
    <>
      <SEOHead 
        title="Sign Up - CDW Burhan Portfolio"
        description="Create an account to access exclusive content and features on CDW Burhan's portfolio."
        keywords="signup, register, authentication, discord, github"
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
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="UserPlus" size={32} className="text-white" />
                </div>
                <h1 className="text-3xl font-bold text-white mb-2">Join the Community</h1>
                <p className="text-gray-400">Create your account to get started</p>
              </div>
            </div>

            {/* Auth Buttons */}
            <div className="space-y-4">
              <button
                onClick={() => handleSignUp('discord')}
                disabled={loading}
                className="w-full flex items-center justify-center space-x-3 px-6 py-4 bg-[#5865F2] hover:bg-[#4752C4] text-white rounded-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg hover:shadow-xl"
              >
                <Icon name="MessageCircle" size={20} />
                <span className="font-medium">Sign up with Discord</span>
                {loading && provider === 'discord' && (
                  <div className="ml-auto">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  </div>
                )}
              </button>
              
              <button
                onClick={() => handleSignUp('github')}
                disabled={loading}
                className="w-full flex items-center justify-center space-x-3 px-6 py-4 bg-gray-800 hover:bg-gray-700 text-white rounded-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg hover:shadow-xl"
              >
                <Icon name="Github" size={20} />
                <span className="font-medium">Sign up with GitHub</span>
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
              <span className="px-4 text-gray-500 text-sm">What You Get</span>
              <div className="flex-1 border-t border-white/10"></div>
            </div>

            {/* Benefits */}
            <div className="space-y-4 mb-6">
              <div className="flex items-start space-x-3">
                <Icon name="Star" size={20} className="text-yellow-400 mt-0.5" />
                <div>
                  <h3 className="text-white font-medium">Exclusive Content</h3>
                  <p className="text-gray-400 text-sm">Access premium tutorials and resources</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <Icon name="MessageCircle" size={20} className="text-blue-400 mt-0.5" />
                <div>
                  <h3 className="text-white font-medium">Community Access</h3>
                  <p className="text-gray-400 text-sm">Join discussions and networking</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <Icon name="Calendar" size={20} className="text-green-400 mt-0.5" />
                <div>
                  <h3 className="text-white font-medium">Priority Booking</h3>
                  <p className="text-gray-400 text-sm">Get early access to consultation slots</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <Icon name="Bell" size={20} className="text-purple-400 mt-0.5" />
                <div>
                  <h3 className="text-white font-medium">Updates & Insights</h3>
                  <p className="text-gray-400 text-sm">Be first to know about new projects</p>
                </div>
              </div>
            </div>

            {/* Security Note */}
            <div className="bg-cyan-500/5 border border-cyan-500/20 rounded-lg p-4 mb-6">
              <div className="flex items-center space-x-2">
                <Icon name="Shield" size={16} className="text-cyan-400" />
                <span className="text-cyan-300 text-sm font-medium">100% Secure</span>
              </div>
              <p className="text-gray-400 text-xs mt-1">
                We use industry-standard OAuth authentication. Your credentials are never stored on our servers.
              </p>
            </div>

            {/* Footer */}
            <div className="text-center">
              <p className="text-xs text-gray-500">
                By creating an account, you agree to our{' '}
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
              Already have an account?{' '}
              <Link to="/auth/login" className="text-cyan-400 hover:text-cyan-300 transition-colors font-medium">
                Sign in here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
