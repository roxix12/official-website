/**
 * Newsletter Service for Vite + React App
 * Handles newsletter subscriptions via Supabase Edge Function
 */

import toast from 'react-hot-toast';

interface NewsletterRequest {
  email: string;
  source?: 'website' | 'admin';
}

interface NewsletterResponse {
  success: boolean;
  message: string;
  email?: string;
  source?: string;
  timestamp?: string;
  error?: string;
  details?: string;
}

interface SMTPVerificationResponse {
  success: boolean;
  host: string;
  port: number;
  banner?: string;
  error?: string;
  timestamp: string;
}

class NewsletterService {
  private baseUrl: string;
  private timeout: number = 30000; // 30 seconds

  constructor() {
    // Use your live Edge Function URL directly
    this.baseUrl = "https://xwqimfzjickiubkfxmdc.functions.supabase.co/send-welcome";
  }

  /**
   * Subscribe user to newsletter
   */
  async subscribe(email: string, source: 'website' | 'admin' = 'website'): Promise<NewsletterResponse> {
    if (!email || typeof email !== 'string') {
      const error = 'Email is required and must be a string';
      toast.error(error);
      return { success: false, message: error };
    }

    // Client-side email validation
    if (!this.isValidEmail(email)) {
      const error = 'Please enter a valid email address';
      toast.error(error);
      return { success: false, message: error };
    }

    const normalizedEmail = email.toLowerCase().trim();

    try {
      console.log(`📧 Subscribing ${normalizedEmail} via Edge Function`);

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), this.timeout);

      const response = await fetch(this.baseUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: normalizedEmail,
        }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        let errorData;
        try {
          errorData = await response.json();
        } catch {
          errorData = { error: `HTTP ${response.status}: ${response.statusText}` };
        }

        console.error('❌ Newsletter API error:', errorData);

        // Handle specific error cases
        if (response.status === 429) {
          const message = 'Too many requests. Please try again later.';
          toast.error(message);
          return { success: false, message, error: errorData.error };
        }

        if (response.status === 400) {
          const message = errorData.error || 'Invalid request. Please check your email.';
          toast.error(message);
          return { success: false, message, error: errorData.error };
        }

        if (response.status >= 500) {
          const message = 'Server error. Please try again later.';
          toast.error(message);
          return { success: false, message, error: errorData.error };
        }

        const message = errorData.error || 'Subscription failed. Please try again.';
        toast.error(message);
        return { success: false, message, error: errorData.error };
      }

      const data = await response.json();

      if (data.ok) {
        const message = 'Successfully subscribed! Check your email for confirmation. 📧';
        toast.success(message);
        console.log('✅ Newsletter subscription successful:', data);

        // Analytics tracking
        this.trackSubscription(normalizedEmail, source);

        return {
          success: true,
          message,
          email: normalizedEmail,
          source,
          timestamp: new Date().toISOString(),
        };
      } else {
        const message = data.error || 'Subscription failed. Please try again.';
        toast.error(message);
        return { success: false, message, error: data.error };
      }

    } catch (error) {
      console.error('❌ Newsletter subscription error:', error);

      let message: string;
      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          message = 'Request timed out. Please check your connection and try again.';
        } else if (error.message.includes('NetworkError') || error.message.includes('fetch')) {
          message = 'Network error. Please check your connection and try again.';
        } else {
          message = 'An unexpected error occurred. Please try again.';
        }
      } else {
        message = 'An unexpected error occurred. Please try again.';
      }

      toast.error(message);
      return { 
        success: false, 
        message,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  /**
   * Verify SMTP connectivity
   * Useful for debugging email delivery issues
   */
  async verifySmtp(): Promise<SMTPVerificationResponse> {
    try {
      console.log('🔍 Verifying SMTP connectivity...');

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), this.timeout);

      const response = await fetch(this.baseUrl, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
        },
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      const data: SMTPVerificationResponse = await response.json();

      if (data.success) {
        console.log('✅ SMTP verification successful:', data);
        toast.success('SMTP connection verified successfully! 🔗');
      } else {
        console.error('❌ SMTP verification failed:', data);
        toast.error('SMTP verification failed. Check configuration.');
      }

      return data;

    } catch (error) {
      console.error('❌ SMTP verification error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      toast.error('SMTP verification failed. Please try again.');
      
      return {
        success: false,
        host: 'unknown',
        port: 0,
        error: errorMessage,
        timestamp: new Date().toISOString(),
      };
    }
  }

  /**
   * Test newsletter subscription with a test email
   */
  async testSubscription(testEmail: string = 'test@example.com'): Promise<NewsletterResponse> {
    console.log(`🧪 Testing newsletter subscription with ${testEmail}`);
    
    const result = await this.subscribe(testEmail, 'admin');
    
    if (result.success) {
      toast.success('Test subscription successful! 🧪');
    } else {
      toast.error('Test subscription failed. Check logs for details.');
    }
    
    return result;
  }

  /**
   * Validate email format
   */
  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  /**
   * Track subscription for analytics
   */
  private trackSubscription(email: string, source: string): void {
    try {
      // Google Analytics tracking
      if (typeof gtag !== 'undefined') {
        gtag('event', 'newsletter_subscription', {
          event_category: 'engagement',
          event_label: source,
          custom_map: { email_domain: email.split('@')[1] },
        });
      }

      // Custom analytics event
      if (typeof window !== 'undefined' && window.analytics) {
        window.analytics.track('Newsletter Subscription', {
          email: email,
          source: source,
          timestamp: new Date().toISOString(),
        });
      }

      console.log(`📊 Analytics tracked: newsletter subscription from ${source}`);
    } catch (error) {
      console.warn('⚠️ Analytics tracking failed:', error);
    }
  }

  /**
   * Get Edge Function URL for debugging
   */
  getEndpointUrl(): string {
    return this.baseUrl;
  }

  /**
   * Health check for the newsletter service
   */
  async healthCheck(): Promise<{ status: 'healthy' | 'unhealthy'; details?: string }> {
    try {
      const verification = await this.verifySmtp();
      
      if (verification.success) {
        return { status: 'healthy' };
      } else {
        return { 
          status: 'unhealthy', 
          details: verification.error || 'SMTP verification failed' 
        };
      }
    } catch (error) {
      return { 
        status: 'unhealthy', 
        details: error instanceof Error ? error.message : 'Health check failed' 
      };
    }
  }
}

// Create and export singleton instance
const newsletterService = new NewsletterService();

export default newsletterService;
export type { NewsletterRequest, NewsletterResponse, SMTPVerificationResponse };

// Extend window type for analytics
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    analytics?: {
      track: (event: string, properties?: Record<string, any>) => void;
    };
  }
}
