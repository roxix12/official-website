import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { subscribe } from '../services/newsletter-simple';

/**
 * Example Newsletter Form Component
 * Uses the simplified newsletter service with professional email templates
 */
const ExampleNewsletterForm = ({ 
  title = "Subscribe to Newsletter",
  placeholder = "Enter your email",
  buttonText = "Subscribe",
  className = ""
}) => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email.trim()) {
      toast.error('Please enter your email address');
      return;
    }

    setIsLoading(true);

    try {
      console.log('📧 Subscribing to newsletter:', email);
      
      const result = await subscribe(email);

      if (result.success) {
        setIsSuccess(true);
        setEmail('');
        toast.success(result.message);
        console.log('✅ Newsletter subscription successful');

        // Optional: Analytics tracking
        if (typeof gtag !== 'undefined') {
          gtag('event', 'newsletter_subscription', {
            event_category: 'engagement',
            event_label: 'example_form',
            value: 1
          });
        }

      } else {
        toast.error(result.message);
        console.error('❌ Newsletter subscription failed:', result);
      }

    } catch (error) {
      console.error('❌ Newsletter subscription error:', error);
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    setEmail(e.target.value);
    // Reset success state when user starts typing again
    if (isSuccess) setIsSuccess(false);
  };

  if (isSuccess) {
    return (
      <div className={`bg-green-50 border border-green-200 rounded-lg p-6 text-center ${className}`}>
        <div className="text-green-600 text-2xl mb-2">🎉</div>
        <h3 className="text-lg font-semibold text-green-800 mb-2">
          Successfully Subscribed!
        </h3>
        <p className="text-green-700 mb-4">
          Check your email for a welcome message with exclusive content and resources.
        </p>
        <button
          onClick={() => setIsSuccess(false)}
          className="text-green-600 hover:text-green-800 text-sm font-medium underline"
        >
          Subscribe another email
        </button>
      </div>
    );
  }

  return (
    <div className={`bg-white border border-gray-200 rounded-lg p-6 shadow-sm ${className}`}>
      <div className="text-center mb-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          {title}
        </h3>
        <p className="text-gray-600 text-sm">
          Get exclusive web development insights, tutorials, and resources from CDW Burhan.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="newsletter-email" className="sr-only">
            Email address
          </label>
          <input
            type="email"
            id="newsletter-email"
            name="email"
            value={email}
            onChange={handleChange}
            placeholder={placeholder}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
            disabled={isLoading}
          />
        </div>

        <button
          type="submit"
          disabled={isLoading || !email.trim()}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
        >
          {isLoading ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
              <span>Subscribing...</span>
            </>
          ) : (
            <>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span>{buttonText}</span>
            </>
          )}
        </button>
      </form>

      <div className="mt-4 text-xs text-gray-500 text-center">
        <p>
          🔒 We respect your privacy. Unsubscribe at any time.<br />
          By subscribing, you agree to receive emails from CDW Burhan.
        </p>
      </div>
    </div>
  );
};

export default ExampleNewsletterForm;

// Alternative inline usage component for quick integration
export const QuickNewsletterSignup = ({ onSuccess }) => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email.trim()) {
      toast.error('Please enter your email');
      return;
    }

    setIsLoading(true);

    try {
      const result = await subscribe(email);
      
      if (result.success) {
        setEmail('');
        toast.success('Successfully subscribed! 📧');
        onSuccess?.(email);
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error('Subscription failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex space-x-2">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="your@email.com"
        className="flex-1 px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        disabled={isLoading}
        required
      />
      <button
        type="submit"
        disabled={isLoading || !email.trim()}
        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-medium rounded transition-colors"
      >
        {isLoading ? (
          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
        ) : (
          'Subscribe'
        )}
      </button>
    </form>
  );
};
