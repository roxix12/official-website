import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { EmailIcon, CheckIcon, MessageIcon, ExternalLinkIcon } from '../../components/Icons';
import { toast } from 'react-hot-toast';

const TestEmailPage = () => {
  const [loading, setLoading] = useState(false);
  const [testEmail, setTestEmail] = useState('info@codewithburhan.com');
  const [emailType, setEmailType] = useState('test');

  const sendTestEmail = async () => {
    if (!testEmail.trim()) {
      toast.error('Please enter a valid email address');
      return;
    }

    setLoading(true);
    
    try {
      let emailData = {};

      if (emailType === 'test') {
        emailData = {
          to: testEmail,
          subject: 'SMTP Test Email - CDW Burhan Portfolio',
          text: `Hello,

This is a test email sent from the CDW Burhan Portfolio website to verify that the SMTP configuration is working correctly.

Email Details:
- Sent to: ${testEmail}
- Sent at: ${new Date().toLocaleString()}
- Test Type: Basic SMTP Test

If you received this email, your SMTP configuration is working perfectly!

Best regards,
CDW Burhan Portfolio System`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8fafc;">
              <div style="background: linear-gradient(135deg, #00d4ff 0%, #8b5cf6 100%); padding: 30px; border-radius: 10px; color: white; text-align: center; margin-bottom: 20px;">
                <h1 style="margin: 0; font-size: 24px;">🧪 SMTP Test Email</h1>
                <p style="margin: 10px 0 0 0; opacity: 0.9;">CDW Burhan Portfolio</p>
              </div>
              
              <div style="background: white; padding: 30px; border-radius: 10px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
                <h2 style="color: #333; margin-top: 0;">✅ SMTP Configuration Test</h2>
                
                <p style="color: #666; line-height: 1.6;">
                  Hello! This is a test email sent from the CDW Burhan Portfolio website to verify that the SMTP configuration is working correctly.
                </p>
                
                <div style="background: #f1f5f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
                  <h3 style="color: #334155; margin-top: 0;">📧 Email Details:</h3>
                  <ul style="color: #64748b; line-height: 1.8;">
                    <li><strong>Sent to:</strong> ${testEmail}</li>
                    <li><strong>Sent at:</strong> ${new Date().toLocaleString()}</li>
                    <li><strong>Test Type:</strong> Basic SMTP Test</li>
                  </ul>
                </div>
                
                <div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; padding: 20px; border-radius: 8px; text-align: center;">
                  <h3 style="margin: 0;">🎉 Success!</h3>
                  <p style="margin: 10px 0 0 0;">If you received this email, your SMTP configuration is working perfectly!</p>
                </div>
              </div>
              
              <div style="text-align: center; margin-top: 20px; color: #64748b; font-size: 14px;">
                <p>This email was sent from codewithburhan.com</p>
                <p>© ${new Date().getFullYear()} CDW Burhan Portfolio. All rights reserved.</p>
              </div>
            </div>
          `,
          fromName: 'CDW Burhan Portfolio',
          fromAddress: 'info@codewithburhan.com',
          replyTo: 'info@codewithburhan.com',
          type: 'test'
        };
      } else if (emailType === 'welcome') {
        emailData = {
          to: testEmail,
          subject: 'Welcome to CDW Burhan Portfolio Newsletter! 🎉',
          text: `Hello,

Welcome to the CDW Burhan Portfolio Newsletter!

Thank you for subscribing to my newsletter. You'll receive updates about:
- Latest blog posts and tutorials
- New projects and case studies  
- Industry insights and tips
- Exclusive content and resources

This is a test of the welcome email system.

Best regards,
Burhan
Full Stack Developer & Digital Transformation Expert

---
If you no longer wish to receive these emails, you can unsubscribe at any time.`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8fafc;">
              <div style="background: linear-gradient(135deg, #00d4ff 0%, #8b5cf6 100%); padding: 30px; border-radius: 10px; color: white; text-align: center; margin-bottom: 20px;">
                <h1 style="margin: 0; font-size: 28px;">🎉 Welcome!</h1>
                <p style="margin: 10px 0 0 0; opacity: 0.9; font-size: 16px;">CDW Burhan Portfolio Newsletter</p>
              </div>
              
              <div style="background: white; padding: 30px; border-radius: 10px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
                <h2 style="color: #333; margin-top: 0;">Thank you for subscribing! 🚀</h2>
                
                <p style="color: #666; line-height: 1.6; font-size: 16px;">
                  Welcome to the CDW Burhan Portfolio Newsletter! I'm excited to have you on board.
                </p>
                
                <div style="background: #f1f5f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
                  <h3 style="color: #334155; margin-top: 0;">📧 You'll receive updates about:</h3>
                  <ul style="color: #64748b; line-height: 1.8;">
                    <li>Latest blog posts and tutorials</li>
                    <li>New projects and case studies</li>
                    <li>Industry insights and tips</li>
                    <li>Exclusive content and resources</li>
                  </ul>
                </div>
                
                <div style="text-align: center; margin: 30px 0;">
                  <a href="https://www.codewithburhan.com/blog-tutorials-insights" style="display: inline-block; background: linear-gradient(135deg, #00d4ff 0%, #8b5cf6 100%); color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: bold;">
                    Explore My Blog
                  </a>
                </div>
                
                <p style="color: #666; line-height: 1.6;">
                  <strong>This is a test of the welcome email system.</strong>
                </p>
                
                <div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; padding: 20px; border-radius: 8px; text-align: center; margin-top: 20px;">
                  <p style="margin: 0; font-weight: bold;">Best regards,</p>
                  <p style="margin: 5px 0 0 0;">Burhan - Full Stack Developer & Digital Transformation Expert</p>
                </div>
              </div>
              
              <div style="text-align: center; margin-top: 20px; color: #64748b; font-size: 14px;">
                <p>© ${new Date().getFullYear()} CDW Burhan Portfolio. All rights reserved.</p>
                <p style="margin-top: 10px;">
                  <a href="https://www.codewithburhan.com/unsubscribe" style="color: #64748b;">Unsubscribe</a> |
                  <a href="https://www.codewithburhan.com/privacy-policy" style="color: #64748b; margin-left: 10px;">Privacy Policy</a>
                </p>
              </div>
            </div>
          `,
          fromName: 'CDW Burhan Portfolio',
          fromAddress: 'info@codewithburhan.com',
          replyTo: 'info@codewithburhan.com',
          type: 'welcome'
        };
      }

      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(emailData),
      });

      const result = await response.json();

      if (result.success) {
        toast.success(`✅ ${emailType === 'test' ? 'Test' : 'Welcome'} email sent successfully to ${testEmail}!`);
        console.log('Email sent, Message ID:', result.messageId);
      } else {
        toast.error(`❌ Failed to send email: ${result.error}`);
        console.error('Email failed:', result.error);
      }
    } catch (error) {
      console.error('Error sending email:', error);
      toast.error(`❌ Error sending email: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Test Email System - CDW Burhan Portfolio</title>
        <meta name="description" content="Test the SMTP email configuration for CDW Burhan Portfolio" />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-12 px-4">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <EmailIcon size={32} className="text-white" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">Email System Test</h1>
            <p className="text-gray-300">Verify your SMTP configuration is working correctly</p>
          </div>

          {/* Test Email Form */}
          <div className="bg-white rounded-lg shadow-xl p-8">
            <div className="space-y-6">
              <div>
                <label htmlFor="emailType" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Type
                </label>
                <select
                  id="emailType"
                  value={emailType}
                  onChange={(e) => setEmailType(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                >
                  <option value="test">Basic SMTP Test</option>
                  <option value="welcome">Welcome Email Test</option>
                </select>
              </div>

              <div>
                <label htmlFor="testEmail" className="block text-sm font-medium text-gray-700 mb-2">
                  Test Email Address
                </label>
                <input
                  type="email"
                  id="testEmail"
                  value={testEmail}
                  onChange={(e) => setTestEmail(e.target.value)}
                  placeholder="Enter email address to test"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                />
              </div>

              <button
                onClick={sendTestEmail}
                disabled={loading}
                className={`w-full py-3 px-4 rounded-md font-medium transition-all duration-200 ${
                  loading
                    ? 'bg-gray-400 cursor-not-allowed text-white'
                    : 'bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl'
                }`}
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Sending {emailType === 'test' ? 'Test' : 'Welcome'} Email...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    <EmailIcon size={20} />
                    Send {emailType === 'test' ? 'Test' : 'Welcome'} Email
                  </span>
                )}
              </button>
            </div>

            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <div className="flex items-start gap-3">
                <CheckIcon size={20} className="text-blue-600 mt-0.5" />
                <div className="text-sm text-blue-800">
                  <p className="font-medium mb-1">Testing Information:</p>
                  <ul className="list-disc list-inside space-y-1 text-blue-700">
                    <li>This will send a real email using your SMTP configuration</li>
                    <li>Check both inbox and spam folder for the test email</li>
                    <li>The email will be sent from info@codewithburhan.com</li>
                    <li>This page is for testing purposes only</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Access Links */}
          <div className="mt-8 text-center">
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="/"
                className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors"
              >
                <ExternalLinkIcon size={16} />
                Back to Home
              </a>
              <a
                href="/admin-panel"
                className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors"
              >
                <ExternalLinkIcon size={16} />
                Admin Panel
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TestEmailPage;
