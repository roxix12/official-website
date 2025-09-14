/**
 * Simple Newsletter Service for CDW Burhan
 * Clean API for subscribing to newsletter via Supabase Edge Function
 */

/**
 * Subscribe user to newsletter
 * @param email - User's email address
 * @returns Promise with success/error status
 */
export async function subscribe(email: string): Promise<{ success: boolean; message: string; error?: string }> {
  // Validate email
  if (!email || typeof email !== 'string') {
    return { success: false, message: 'Email is required' };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { success: false, message: 'Please enter a valid email address' };
  }

  const normalizedEmail = email.toLowerCase().trim();

  try {
    const url = "https://xwqimfzjickiubkfxmdc.functions.supabase.co/send-welcome";
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: normalizedEmail,
      }),
    });

    if (!response.ok) {
      let errorData;
      try {
        errorData = await response.json();
      } catch {
        errorData = { error: `HTTP ${response.status}: ${response.statusText}` };
      }

      // Handle specific error cases
      if (response.status === 400) {
        return { 
          success: false, 
          message: errorData.error || 'Invalid email address',
          error: errorData.error 
        };
      }

      if (response.status >= 500) {
        return { 
          success: false, 
          message: 'Server error. Please try again later.',
          error: errorData.error 
        };
      }

      return { 
        success: false, 
        message: errorData.error || 'Subscription failed. Please try again.',
        error: errorData.error 
      };
    }

    const data = await response.json();

    if (data.ok) {
      return {
        success: true,
        message: 'Successfully subscribed! Check your email for confirmation. 📧'
      };
    } else {
      return {
        success: false,
        message: data.error || 'Subscription failed. Please try again.',
        error: data.error
      };
    }

  } catch (error) {
    console.error('Newsletter subscription error:', error);
    
    let message: string;
    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        message = 'Request timed out. Please try again.';
      } else if (error.message.includes('NetworkError') || error.message.includes('fetch')) {
        message = 'Network error. Please check your connection.';
      } else {
        message = 'An unexpected error occurred. Please try again.';
      }
    } else {
      message = 'An unexpected error occurred. Please try again.';
    }

    return { 
      success: false, 
      message,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

/**
 * Test the newsletter subscription with a test email
 */
export async function testSubscription(testEmail: string = 'test@example.com') {
  console.log(`🧪 Testing newsletter subscription with ${testEmail}`);
  return await subscribe(testEmail);
}

/**
 * Get the Edge Function endpoint URL
 */
export function getEndpointUrl(): string {
  return "https://xwqimfzjickiubkfxmdc.functions.supabase.co/send-welcome";
}
