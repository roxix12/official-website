# Gmail App Password Setup Guide

## 🚀 Newsletter Email System with Gmail SMTP

This guide will help you set up Gmail SMTP with App Password for automatic newsletter email delivery.

## 📋 Prerequisites

1. **Gmail Account** (cdwburhan@gmail.com)
2. **2-Factor Authentication** enabled on Gmail
3. **App Password** generated for the application

## 🔧 Step 1: Enable 2-Factor Authentication

1. Go to [Google Account Settings](https://myaccount.google.com/)
2. Click **Security** in the left sidebar
3. Under **Signing in to Google**, click **2-Step Verification**
4. Follow the setup process to enable 2FA
5. **Important:** 2FA must be enabled before you can create App Passwords

## 🔑 Step 2: Generate Gmail App Password

1. Go to [Google Account Settings](https://myaccount.google.com/)
2. Click **Security** in the left sidebar
3. Under **Signing in to Google**, click **App passwords**
4. You may need to sign in again
5. Select app: **Other (Custom name)**
6. Enter name: **CDW Portfolio Newsletter**
7. Click **Generate**
8. **Copy the 16-character password** (no spaces)
9. **Important:** Save this password securely - you won't see it again

## 🛠️ Step 3: Configure Email System

### Option A: Set App Password in Code

1. Open `server/emailHandler.js`
2. Find this line:
   ```javascript
   pass: '' // Your Gmail App Password (set this!)
   ```
3. Replace with your 16-character app password:
   ```javascript
   pass: 'abcd efgh ijkl mnop' // Your actual app password
   ```

### Option B: Use Environment Variables (Recommended)

1. Create a `.env` file in your project root:
   ```
   GMAIL_USER=cdwburhan@gmail.com
   GMAIL_APP_PASSWORD=abcdefghijklmnop
   ```

2. Update `server/emailHandler.js`:
   ```javascript
   auth: {
     user: process.env.GMAIL_USER || 'cdwburhan@gmail.com',
     pass: process.env.GMAIL_APP_PASSWORD || ''
   }
   ```

## 🚀 Step 4: Start Email System

### Start the Email API Server:
```bash
node server/emailAPI.js
```

You should see:
```
📧 Email API server running on port 3001
✅ Gmail SMTP connection verified
```

### Start Your Main Application:
```bash
npm run dev
```

## 🧪 Step 5: Test Email System

### Test via API:
```bash
curl -X POST http://localhost:3001/api/test-email \
  -H "Content-Type: application/json" \
  -d '{"email":"your-test-email@gmail.com","name":"Test User"}'
```

### Test via Website:
1. Go to your newsletter signup form
2. Enter a test email address
3. Submit the form
4. Check the test email inbox for welcome message

## 📧 How It Works

1. **User subscribes** via newsletter form
2. **Subscriber added** to Supabase database
3. **Frontend calls** Gmail SMTP API (localhost:3001)
4. **API sends email** directly via Gmail SMTP
5. **User receives** professional welcome email

## 🔍 Troubleshooting

### Error: "Authentication failed"
- Check that 2FA is enabled on your Gmail account
- Verify the App Password is correct (16 characters)
- Make sure you're using the Gmail account that generated the App Password

### Error: "Connection refused"
- Start the email API server: `node server/emailAPI.js`
- Check that port 3001 is available
- Verify the API URL in the frontend code

### Error: "SMTP connection failed"
- Check your internet connection
- Verify Gmail SMTP settings (smtp.gmail.com:587)
- Try regenerating the App Password

### No email received
- Check spam/junk folder
- Verify the recipient email address
- Check the email API server logs for errors

## 📂 File Structure

```
project/
├── server/
│   ├── emailHandler.js     # Gmail SMTP configuration
│   └── emailAPI.js         # Express API server
├── src/
│   ├── services/
│   │   └── newsletterService.js  # Frontend email service
│   └── config/
│       └── emailConfig.js        # Email configuration
└── GMAIL_SETUP_GUIDE.md          # This file
```

## 🔒 Security Notes

1. **Never commit** App Passwords to version control
2. **Use environment variables** for production
3. **Regenerate App Password** if compromised
4. **Keep 2FA enabled** on your Gmail account

## 🎯 Success Indicators

✅ Gmail SMTP connection verified  
✅ Test email sent successfully  
✅ Welcome emails delivered to subscribers  
✅ Email logs recorded in database  
✅ Professional HTML email formatting  

## 🚀 Production Deployment

For production, consider:

1. **Environment Variables**: Use proper env vars for credentials
2. **Process Manager**: Use PM2 to run the email API server
3. **SSL/HTTPS**: Secure the email API endpoint
4. **Rate Limiting**: Implement email sending limits
5. **Monitoring**: Add email delivery monitoring

## 📞 Support

If you encounter issues:

1. Check the console logs for error messages
2. Verify all steps in this guide
3. Test with a simple email first
4. Check Gmail account security settings

---

**Ready to send professional newsletter emails! 🎉📧**
