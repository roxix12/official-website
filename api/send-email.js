// Vercel Serverless Function: Send email via business SMTP (Hostinger)
// This runs on the server (not in the browser) so SMTP credentials are secure

const nodemailer = require('nodemailer');

/**
 * Resolve environment variables for both server and client-provided names
 */
function env(name, fallback) {
  return (
    process.env[name] ||
    process.env[`VITE_${name}`] ||
    process.env[name.replace('VITE_', '')] ||
    fallback
  );
}

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ success: false, error: 'Method Not Allowed' });
  }

  try {
    const {
      to,
      subject,
      html,
      text,
      replyTo,
      fromName,
      fromAddress,
      type = 'general'
    } = req.body || {};

    if (!to || !subject || (!html && !text)) {
      return res.status(400).json({ success: false, error: 'Missing required fields (to, subject, html/text)' });
    }

    // SMTP configuration from environment variables (Updated with your details)
    const smtpHost = env('SMTP_HOST', env('VITE_SMTP_HOST', 'smtp.hostinger.com'));
    const smtpPort = parseInt(env('SMTP_PORT', env('VITE_SMTP_PORT', '465')), 10);
    const smtpSecure = (env('SMTP_SECURE', env('VITE_SMTP_SECURE', 'true')) + '') === 'true';
    const smtpUser = env('BUSINESS_EMAIL_USER', env('VITE_BUSINESS_EMAIL_USER', 'info@codewithburhan.com'));
    const smtpPass = env('BUSINESS_EMAIL_PASSWORD', env('VITE_BUSINESS_EMAIL_PASSWORD', 'Bb0101010@#123'));

    const defaultFromName = env('NEWSLETTER_FROM_NAME', env('VITE_NEWSLETTER_FROM_NAME', 'CDW Burhan Portfolio'));
    const defaultFromEmail = env('NEWSLETTER_FROM_EMAIL', env('VITE_NEWSLETTER_FROM_EMAIL', 'info@codewithburhan.com'));
    const defaultReplyTo = env('NEWSLETTER_REPLY_TO', env('VITE_NEWSLETTER_REPLY_TO', 'info@codewithburhan.com'));

    // Debug logging (remove sensitive info in production)
    console.log('🔧 SMTP Configuration:', {
      host: smtpHost,
      port: smtpPort,
      secure: smtpSecure,
      user: smtpUser,
      passLength: smtpPass ? smtpPass.length : 0
    });

    if (!smtpUser || !smtpPass) {
      return res.status(500).json({ success: false, error: 'SMTP credentials are not configured on the server' });
    }

    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpSecure,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
      tls: {
        rejectUnauthorized: false
      },
      connectionTimeout: 60000,
      greetingTimeout: 30000,
      socketTimeout: 60000,
    });

    // Verify connection (optional, but helpful for debugging)
    try {
      await transporter.verify();
      console.log('✅ SMTP connection verified successfully');
    } catch (verifyError) {
      console.error('❌ SMTP verification failed:', verifyError);
      // Don't fail here, let's try to send anyway
    }

    const mailOptions = {
      from: `${fromName || defaultFromName} <${fromAddress || defaultFromEmail}>`,
      to,
      subject,
      text: text || undefined,
      html: html || undefined,
      replyTo: replyTo || defaultReplyTo,
      headers: {
        'X-Email-Type': type,
      },
    };

    const result = await transporter.sendMail(mailOptions);

    return res.status(200).json({
      success: true,
      messageId: result.messageId,
      accepted: result.accepted,
      rejected: result.rejected,
      envelope: result.envelope,
    });
  } catch (error) {
    console.error('❌ SMTP send error:', error);
    return res.status(500).json({ success: false, error: error.message || 'Failed to send email' });
  }
};


