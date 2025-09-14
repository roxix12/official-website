// Local development SMTP server for testing
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// SMTP configuration for Hostinger
const transporter = nodemailer.createTransporter({
  host: 'smtp.hostinger.com',
  port: 465,
  secure: true, // Use TLS
  auth: {
    user: 'info@codewithburhan.com',
    pass: 'Bb0101010@#123',
  },
  tls: {
    rejectUnauthorized: false
  }
});

app.post('/api/send-email', async (req, res) => {
  try {
    console.log('📧 Local SMTP test - Received request:', req.body);

    const { to, subject, html, text, fromName = 'CDW Burhan Portfolio' } = req.body;

    if (!to || !subject) {
      return res.status(400).json({ 
        success: false, 
        error: 'Missing required fields: to, subject' 
      });
    }

    // Verify SMTP connection
    try {
      await transporter.verify();
      console.log('✅ SMTP connection verified');
    } catch (verifyError) {
      console.error('❌ SMTP verification failed:', verifyError);
      return res.status(500).json({ 
        success: false, 
        error: 'SMTP connection failed: ' + verifyError.message 
      });
    }

    const mailOptions = {
      from: `${fromName} <info@codewithburhan.com>`,
      to: to,
      subject: subject,
      text: text || 'Welcome to CDW Burhan Portfolio!',
      html: html || '<h2>Welcome to CDW Burhan Portfolio!</h2><p>Thank you for subscribing!</p>',
      replyTo: 'info@codewithburhan.com',
    };

    console.log('📤 Sending email with options:', {
      from: mailOptions.from,
      to: mailOptions.to,
      subject: mailOptions.subject
    });

    const result = await transporter.sendMail(mailOptions);

    console.log('✅ Email sent successfully:', result.messageId);

    res.json({
      success: true,
      messageId: result.messageId,
      info: 'Email sent via local SMTP server'
    });

  } catch (error) {
    console.error('❌ Email sending failed:', error);
    res.status(500).json({
      success: false,
      error: error.message,
      details: error.code || 'Unknown error'
    });
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`🚀 Local email server running on http://localhost:${PORT}`);
  console.log(`📧 Test endpoint: http://localhost:${PORT}/api/send-email`);
});

module.exports = app;
