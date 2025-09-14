// Email Configuration Validator
// Utility to validate email configuration and test settings

import { validateEmailConfig } from '../config/emailConfig';

export class EmailConfigValidator {
  /**
   * Validate email configuration
   */
  static validate() {
    const validation = validateEmailConfig();
    
    console.group('📧 Email Configuration Validation');
    console.log('Configuration:', validation.config);
    
    if (validation.isValid) {
      console.log('✅ Email configuration is valid');
    } else {
      console.error('❌ Email configuration has errors:');
      validation.errors.forEach(error => console.error(`  - ${error}`));
    }
    
    if (validation.warnings.length > 0) {
      console.warn('⚠️ Email configuration warnings:');
      validation.warnings.forEach(warning => console.warn(`  - ${warning}`));
    }
    
    console.groupEnd();
    
    return validation;
  }

  /**
   * Test email configuration by attempting to validate credentials
   */
  static async testConfiguration() {
    const validation = this.validate();
    
    if (!validation.isValid) {
      return {
        success: false,
        message: 'Email configuration is invalid',
        errors: validation.errors
      };
    }

    try {
      // For client-side, we can only validate that the config exists
      // Actual SMTP testing would need to be done server-side
      console.log('📧 Testing email configuration...');
      
      const config = validation.config;
      const tests = [];
      
      // Test 1: Check if Gmail credentials are set
      if (config.smtp.auth.user && config.smtp.auth.pass) {
        tests.push({
          name: 'Gmail Credentials',
          status: 'pass',
          message: 'Gmail user and app password are configured'
        });
      } else {
        tests.push({
          name: 'Gmail Credentials',
          status: 'fail',
          message: 'Gmail user or app password is missing'
        });
      }
      
      // Test 2: Check EmailJS configuration (if enabled)
      if (import.meta.env.VITE_USE_EMAILJS === 'true') {
        if (config.emailjs.serviceId && config.emailjs.templateId && config.emailjs.publicKey) {
          tests.push({
            name: 'EmailJS Configuration',
            status: 'pass',
            message: 'EmailJS is properly configured'
          });
        } else {
          tests.push({
            name: 'EmailJS Configuration',
            status: 'fail',
            message: 'EmailJS is enabled but not properly configured'
          });
        }
      }
      
      // Test 3: Check environment variables
      const envVars = [
        'VITE_BUSINESS_EMAIL_USER',
        'VITE_BUSINESS_EMAIL_PASSWORD',
        'VITE_NEWSLETTER_FROM_NAME',
        'VITE_SITE_URL'
      ];
      
      const missingEnvVars = envVars.filter(varName => !import.meta.env[varName]);
      
      if (missingEnvVars.length === 0) {
        tests.push({
          name: 'Environment Variables',
          status: 'pass',
          message: 'All required environment variables are set'
        });
      } else {
        tests.push({
          name: 'Environment Variables',
          status: 'warning',
          message: `Missing env vars: ${missingEnvVars.join(', ')}`
        });
      }
      
      console.table(tests);
      
      const hasFailures = tests.some(test => test.status === 'fail');
      const hasWarnings = tests.some(test => test.status === 'warning');
      
      return {
        success: !hasFailures,
        hasWarnings,
        tests,
        message: hasFailures 
          ? 'Email configuration has critical issues' 
          : hasWarnings 
            ? 'Email configuration is mostly valid with some warnings'
            : 'Email configuration is fully valid'
      };
      
    } catch (error) {
      console.error('❌ Email configuration test failed:', error);
      return {
        success: false,
        message: 'Failed to test email configuration',
        error: error.message
      };
    }
  }

  /**
   * Get recommended actions based on configuration state
   */
  static getRecommendedActions() {
    const validation = this.validate();
    const actions = [];
    
    if (!validation.config.smtp.auth.user) {
      actions.push({
        priority: 'high',
        action: 'Set VITE_BUSINESS_EMAIL_USER environment variable',
        description: 'Add your business email address to the environment variables'
      });
    }
    
    if (!validation.config.smtp.auth.pass) {
      actions.push({
        priority: 'high',
        action: 'Set VITE_BUSINESS_EMAIL_PASSWORD environment variable',
        description: 'Add your business email password to the environment variables'
      });
    }
    
    if (!import.meta.env.VITE_SITE_URL) {
      actions.push({
        priority: 'medium',
        action: 'Set VITE_SITE_URL environment variable',
        description: 'Add your website URL for unsubscribe links'
      });
    }
    
    if (import.meta.env.VITE_USE_EMAILJS === 'true' && !validation.config.emailjs.serviceId) {
      actions.push({
        priority: 'high',
        action: 'Configure EmailJS settings',
        description: 'Set up VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID, and VITE_EMAILJS_PUBLIC_KEY'
      });
    }
    
    return actions;
  }

  /**
   * Display configuration help in console
   */
  static showHelp() {
    console.group('📧 Email Configuration Help');
    
    console.log('🔧 Required Environment Variables:');
    console.log(`
VITE_BUSINESS_EMAIL_USER=info@codewithburhan.com
      VITE_BUSINESS_EMAIL_PASSWORD=Bb0101010@#123
VITE_NEWSLETTER_FROM_NAME=CDW Burhan Portfolio
VITE_SITE_URL=https://www.codewithburhan.com
    `);
    
    console.log('🚀 Optional Environment Variables:');
    console.log(`
VITE_USE_EMAILJS=false
VITE_SEND_ADMIN_NOTIFICATIONS=true
VITE_LOG_EMAILS=true
VITE_USE_ADVANCED_FORM=true
    `);
    
    console.log('📚 Setup Guide:');
    console.log('1. Access your Hostinger email account settings');
    console.log('2. Verify SMTP settings: smtp.hostinger.com:465 (SSL)');
    console.log('3. Add environment variables to .env file');
    console.log('4. Add variables to Vercel dashboard');
    console.log('5. Restart your development server');
    console.log('6. Test email subscription on your website');
    
    console.groupEnd();
    
    const actions = this.getRecommendedActions();
    if (actions.length > 0) {
      console.group('⚡ Recommended Actions');
      actions.forEach((action, index) => {
        console.log(`${index + 1}. [${action.priority.toUpperCase()}] ${action.action}`);
        console.log(`   ${action.description}`);
      });
      console.groupEnd();
    }
  }
}

// Automatically validate configuration in development
if (import.meta.env.DEV) {
  console.log('🔍 Running email configuration validation...');
  EmailConfigValidator.validate();
}

export default EmailConfigValidator;
