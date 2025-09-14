// Email Configuration for Newsletter System
// Gmail SMTP Configuration with Environment Variables

export const emailConfig = {
  // Business Email SMTP Settings (Hostinger)
  smtp: {
    host: import.meta.env.VITE_SMTP_HOST || 'smtp.hostinger.com',
    port: parseInt(import.meta.env.VITE_SMTP_PORT) || 465,
    secure: import.meta.env.VITE_SMTP_SECURE === 'true' || true, // true for 465, false for 587
    auth: {
      user: import.meta.env.VITE_BUSINESS_EMAIL_USER || 'info@codewithburhan.com', // Your business email
      pass: import.meta.env.VITE_BUSINESS_EMAIL_PASSWORD || '' // Your business email password
    }
  },

  // Default email settings
  defaults: {
    from: {
      name: import.meta.env.VITE_NEWSLETTER_FROM_NAME || 'CDW Burhan Portfolio',
      address: import.meta.env.VITE_NEWSLETTER_FROM_EMAIL || 'info@codewithburhan.com'
    },
    replyTo: import.meta.env.VITE_NEWSLETTER_REPLY_TO || 'info@codewithburhan.com',
    adminEmail: import.meta.env.VITE_ADMIN_EMAIL || 'info@codewithburhan.com'
  },

  // Newsletter specific settings
  newsletter: {
    welcomeSubject: '🚀 Welcome to CDW Burhan Newsletter!',
    unsubscribeUrl: (email, id) => {
      const baseUrl = import.meta.env.VITE_SITE_URL || window.location.origin;
      return `${baseUrl}/unsubscribe?email=${encodeURIComponent(email)}${id ? `&id=${id}` : ''}`;
    }
  },

  // EmailJS Configuration (alternative method)
  emailjs: {
    serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID || '',
    templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID || '',
    publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY || ''
  },

  // Feature flags
  features: {
    useEmailJS: import.meta.env.VITE_USE_EMAILJS === 'true',
    useAdvancedForm: import.meta.env.VITE_USE_ADVANCED_FORM !== 'false', // Default to true
    sendAdminNotifications: import.meta.env.VITE_SEND_ADMIN_NOTIFICATIONS !== 'false', // Default to true
    logEmails: import.meta.env.VITE_LOG_EMAILS !== 'false' // Default to true
  }
};

// For client-side usage with proper environment variable handling
export const getEmailConfig = () => {
  return {
    smtp: {
      host: import.meta.env.VITE_SMTP_HOST || 'smtp.hostinger.com',
      port: parseInt(import.meta.env.VITE_SMTP_PORT) || 465,
      secure: import.meta.env.VITE_SMTP_SECURE === 'true' || true,
      auth: {
        user: import.meta.env.VITE_BUSINESS_EMAIL_USER || 'info@codewithburhan.com',
        pass: import.meta.env.VITE_BUSINESS_EMAIL_PASSWORD || ''
      }
    },
    defaults: {
      from: {
        name: import.meta.env.VITE_NEWSLETTER_FROM_NAME || 'CDW Burhan Portfolio',
        address: import.meta.env.VITE_NEWSLETTER_FROM_EMAIL || 'info@codewithburhan.com'
      },
      replyTo: import.meta.env.VITE_NEWSLETTER_REPLY_TO || 'info@codewithburhan.com',
      adminEmail: import.meta.env.VITE_ADMIN_EMAIL || 'info@codewithburhan.com'
    },
    emailjs: {
      serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID || '',
      templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID || '',
      publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY || ''
    }
  };
};

// Validation function to check if email config is properly set up
export const validateEmailConfig = () => {
  const config = getEmailConfig();
  const warnings = [];
  const errors = [];

  // Check Business Email credentials
  if (!config.smtp.auth.user) {
    errors.push('VITE_BUSINESS_EMAIL_USER is not set');
  }
  if (!config.smtp.auth.pass) {
    warnings.push('VITE_BUSINESS_EMAIL_PASSWORD is not set - email sending may fail');
  }

  // Check EmailJS config if enabled
  if (import.meta.env.VITE_USE_EMAILJS === 'true') {
    if (!config.emailjs.serviceId) {
      errors.push('VITE_EMAILJS_SERVICE_ID is required when EmailJS is enabled');
    }
    if (!config.emailjs.templateId) {
      errors.push('VITE_EMAILJS_TEMPLATE_ID is required when EmailJS is enabled');
    }
    if (!config.emailjs.publicKey) {
      errors.push('VITE_EMAILJS_PUBLIC_KEY is required when EmailJS is enabled');
    }
  }

  return { 
    isValid: errors.length === 0, 
    errors, 
    warnings,
    config 
  };
};

export default emailConfig;
