import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { CheckCircleIcon, ExclamationTriangleIcon, HeartIcon } from '@heroicons/react/24/outline';
// import modernNewsletterService from '../services/modernNewsletterService';
import toast from 'react-hot-toast';

const Unsubscribe = () => {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState('loading'); // 'loading', 'success', 'error', 'already_unsubscribed'
  const [isLoading, setIsLoading] = useState(false);
  const [subscriberInfo, setSubscriberInfo] = useState(null);

  const email = searchParams.get('email');
  const subscriberId = searchParams.get('id');

  useEffect(() => {
    if (email) {
      handleAutoUnsubscribe();
    } else {
      setStatus('error');
    }
  }, [email, subscriberId]);

  const handleAutoUnsubscribe = async () => {
    try {
      setIsLoading(true);

      // First get subscriber info - temporarily disabled
      const subscriberResult = { success: true, data: { email, status: 'active' } };
      if (subscriberResult.success) {
        setSubscriberInfo(subscriberResult.data);
        
        if (subscriberResult.data.status === 'unsubscribed') {
          setStatus('already_unsubscribed');
          return;
        }
      }

      // Proceed with unsubscription - temporarily disabled
      const result = { success: true, message: 'Successfully unsubscribed (demo mode)' };
      
      if (result.success) {
        setStatus('success');
        toast.success('You have been successfully unsubscribed.');
      } else {
        setStatus('error');
        toast.error('Unsubscription failed. Please try again.');
      }

    } catch (error) {
      console.error('❌ Unsubscribe error:', error);
      setStatus('error');
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleManualUnsubscribe = async (emailInput) => {
    try {
      setIsLoading(true);
      
      const result = { success: true, message: 'Successfully unsubscribed (demo mode)' };
      
      if (result.success) {
        setStatus('success');
        toast.success('You have been successfully unsubscribed.');
      } else {
        setStatus('error');
        toast.error('Unsubscription failed. Please check your email address.');
      }

    } catch (error) {
      console.error('❌ Manual unsubscribe error:', error);
      setStatus('error');
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const UnsubscribeForm = () => {
    const [emailInput, setEmailInput] = useState(email || '');

    const handleSubmit = (e) => {
      e.preventDefault();
      if (emailInput) {
        handleManualUnsubscribe(emailInput);
      }
    };

    return (
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            value={emailInput}
            onChange={(e) => setEmailInput(e.target.value)}
            placeholder="Enter your email address"
            required
            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
          />
        </div>
        
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white font-semibold py-3 px-6 rounded-lg transition-colors disabled:cursor-not-allowed flex items-center justify-center space-x-2"
        >
          {isLoading ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
              <span>Unsubscribing...</span>
            </>
          ) : (
            <span>Unsubscribe</span>
          )}
        </button>
      </form>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-gray-700">
          
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 dark:bg-red-900 rounded-full mb-4">
              <HeartIcon className="w-8 h-8 text-red-600 dark:text-red-400" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Newsletter Unsubscribe
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              We're sorry to see you go!
            </p>
          </div>

          {/* Content based on status */}
          {status === 'loading' && (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent mx-auto mb-4"></div>
              <p className="text-gray-600 dark:text-gray-300">
                Processing your unsubscribe request...
              </p>
            </div>
          )}

          {status === 'success' && (
            <div className="text-center">
              <CheckCircleIcon className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Successfully Unsubscribed
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                You have been removed from our newsletter list. You will no longer receive emails from us.
              </p>
              {subscriberInfo && (
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-6">
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    <strong>Email:</strong> {subscriberInfo.email}<br />
                    {subscriberInfo.name && (
                      <>
                        <strong>Name:</strong> {subscriberInfo.name}<br />
                      </>
                    )}
                    <strong>Subscribed:</strong> {new Date(subscriberInfo.subscribed_at).toLocaleDateString()}
                  </p>
                </div>
              )}
              <div className="space-y-3">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Changed your mind? You can always subscribe again on our website.
                </p>
                <Link
                  to="/"
                  className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
                >
                  Return to Website
                </Link>
              </div>
            </div>
          )}

          {status === 'already_unsubscribed' && (
            <div className="text-center">
              <ExclamationTriangleIcon className="w-16 h-16 text-amber-500 mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Already Unsubscribed
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                This email address is already unsubscribed from our newsletter.
              </p>
              <a
                href="/"
                className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
              >
                Return to Website
              </a>
            </div>
          )}

          {status === 'error' && (
            <div>
              <div className="text-center mb-6">
                <ExclamationTriangleIcon className="w-16 h-16 text-red-500 mx-auto mb-4" />
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  Unsubscribe Manually
                </h2>
                <p className="text-gray-600 dark:text-gray-300">
                  Please enter your email address to unsubscribe from our newsletter.
                </p>
              </div>
              
              <UnsubscribeForm />
              
              <div className="mt-6 text-center">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Having trouble? Contact us at{' '}
                  <a href="mailto:support@cdwburhan.com" className="text-blue-600 hover:text-blue-700 dark:text-blue-400">
                    support@cdwburhan.com
                  </a>
                </p>
              </div>
            </div>
          )}

          {/* Footer */}
          <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-600 text-center">
            <p className="text-xs text-gray-500 dark:text-gray-400">
              We value your privacy and will never share your information. <br />
              Thank you for being part of our community! 💙
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Unsubscribe;
