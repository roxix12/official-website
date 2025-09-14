import React, { useState } from 'react';
import { EnvelopeIcon, CheckCircleIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import newsletterService from '../services/newsletter';
import toast from 'react-hot-toast';

const NewsletterSignup = ({ 
  variant = 'default', // 'default', 'minimal', 'sidebar', 'footer'
  title = "Stay Updated with Latest Insights",
  description = "Get exclusive web development tips, tutorials, and project updates delivered to your inbox.",
  placeholder = "Enter your email address",
  buttonText = "Subscribe",
  showName = true,
  className = ""
}) => {
  const [formData, setFormData] = useState({
    email: '',
    name: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState(''); // 'success', 'error', 'already_subscribed'

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.email) {
      toast.error('Please enter your email address');
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error('Please enter a valid email address');
      return;
    }

    setIsLoading(true);
    setStatus('');

    try {
      console.log('📧 Submitting newsletter subscription:', {
        email: formData.email,
        name: formData.name
      });

      const result = await newsletterService.subscribe(
        formData.email.toLowerCase().trim(),
        'website'
      );

      if (result.success) {
        setStatus('success');
        setFormData({ email: '', name: '' });
        
        if (result.message.includes('reactivated') || result.message.includes('Welcome back')) {
          toast.success('Welcome back! Your subscription has been reactivated. 🎉');
        } else if (result.message.includes('Already subscribed')) {
          toast.success('You are already subscribed! 📧');
        } else {
          toast.success('Successfully subscribed! Check your email for a welcome message. 📧');
        }

        // Analytics tracking
        if (typeof gtag !== 'undefined') {
          gtag('event', 'newsletter_signup', {
            event_category: 'engagement',
            event_label: 'newsletter_subscription',
            value: 1
          });
        }

      } else {
        setStatus('error');
        toast.error(result.message || 'Subscription failed. Please try again.');
      }

    } catch (error) {
      console.error('❌ Newsletter subscription error:', error);
      setStatus('error');
      toast.error('Something went wrong. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear status when user starts typing
    if (status) setStatus('');
  };

  // Variant styles
  const variants = {
    default: {
      container: "bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 shadow-2xl",
      title: "text-2xl font-bold text-white mb-3",
      description: "text-gray-300 mb-6 leading-relaxed",
      form: "space-y-4"
    },
    minimal: {
      container: "bg-gray-900/80 backdrop-blur-sm rounded-lg p-6 shadow-lg border border-gray-700/50",
      title: "text-lg font-semibold text-white mb-2",
      description: "text-sm text-gray-300 mb-4",
      form: "space-y-3"
    },
    sidebar: {
      container: "bg-gray-900/60 backdrop-blur-sm rounded-xl p-6 border-l-4 border-blue-500",
      title: "text-xl font-bold text-white mb-2",
      description: "text-sm text-gray-300 mb-4",
      form: "space-y-3"
    },
    footer: {
      container: "bg-transparent p-0",
      title: "text-lg font-semibold text-white mb-2",
      description: "text-gray-300 mb-4 text-sm",
      form: "space-y-3"
    }
  };

  const currentVariant = variants[variant] || variants.default;

  if (status === 'success') {
    return (
      <div className={`${currentVariant.container} ${className}`}>
        <div className="text-center">
          <CheckCircleIcon className="w-16 h-16 text-green-400 mx-auto mb-4" />
          <h3 className={currentVariant.title}>
            🎉 Welcome to the Newsletter!
          </h3>
          <p className={currentVariant.description}>
            Thank you for subscribing! You'll receive a welcome email shortly with all the details.
          </p>
          <button
            onClick={() => setStatus('')}
            className="mt-4 text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors"
          >
            Subscribe another email
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`${currentVariant.container} ${className}`}>
      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-500/20 backdrop-blur-sm rounded-full mb-4">
          <EnvelopeIcon className="w-6 h-6 text-blue-400" />
        </div>
        <h3 className={currentVariant.title}>
          {title}
        </h3>
        <p className={currentVariant.description}>
          {description}
        </p>
      </div>

      <form onSubmit={handleSubmit} className={currentVariant.form}>
        {showName && (
          <div>
            <label htmlFor="newsletter-name" className="sr-only">
              Name
            </label>
            <input
              type="text"
              id="newsletter-name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your name (optional)"
              className="w-full px-4 py-3 rounded-lg border border-gray-600/50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-800/50 backdrop-blur-sm text-white placeholder-gray-400 transition-all duration-200"
            />
          </div>
        )}

        <div>
          <label htmlFor="newsletter-email" className="sr-only">
            Email address
          </label>
          <input
            type="email"
            id="newsletter-email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder={placeholder}
            required
            className="w-full px-4 py-3 rounded-lg border border-gray-600/50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-800/50 backdrop-blur-sm text-white placeholder-gray-400 transition-all duration-200"
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 disabled:from-gray-600 disabled:to-gray-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-[1.02] hover:shadow-lg hover:shadow-blue-500/25 disabled:scale-100 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
        >
          {isLoading ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
              <span>Subscribing...</span>
            </>
          ) : (
            <>
              <EnvelopeIcon className="w-4 h-4" />
              <span>{buttonText}</span>
            </>
          )}
        </button>

        {status === 'error' && (
          <div className="flex items-center space-x-2 text-red-400 text-sm">
            <ExclamationTriangleIcon className="w-4 h-4" />
            <span>Subscription failed. Please try again.</span>
          </div>
        )}

        {status === 'already_subscribed' && (
          <div className="flex items-center space-x-2 text-amber-400 text-sm">
            <ExclamationTriangleIcon className="w-4 h-4" />
            <span>You are already subscribed!</span>
          </div>
        )}
      </form>

      <div className="mt-4 text-xs text-gray-400 text-center">
        <p>
          🔒 We respect your privacy. Unsubscribe at any time. <br />
          By subscribing, you agree to receive marketing emails from CDW Burhan Portfolio.
        </p>
      </div>
    </div>
  );
};

export default NewsletterSignup;
