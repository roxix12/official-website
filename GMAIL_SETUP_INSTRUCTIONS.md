# Business Email SMTP Setup Instructions

## 📧 Setting Up Business Email SMTP for Newsletter System

Follow these steps to configure your business email SMTP (Hostinger) for your newsletter system:

### 1. Access Your Business Email Settings

1. Log into your Hostinger control panel
2. Go to **Email Accounts** section
3. Find your business email account (info@codewithburhan.com)
4. Note down the SMTP settings provided by Hostinger

### 2. Get Your Business Email SMTP Settings

Based on your screenshots, your SMTP settings are:
- **SMTP Host**: smtp.hostinger.com
- **SMTP Port**: 465 (SSL/TLS)
- **Encryption**: SSL
- **Username**: info@codewithburhan.com
- **Password**: Your business email password

### 3. Create Environment Variables

Create a `.env` file in your project root with these variables:

```env
# Business Email SMTP Configuration (Hostinger)
VITE_SMTP_HOST=smtp.hostinger.com
VITE_SMTP_PORT=465
VITE_SMTP_SECURE=true
VITE_BUSINESS_EMAIL_USER=info@codewithburhan.com
VITE_BUSINESS_EMAIL_PASSWORD=your-business-email-password

# Newsletter Configuration
VITE_NEWSLETTER_FROM_NAME=CDW Burhan Portfolio
VITE_NEWSLETTER_FROM_EMAIL=info@codewithburhan.com
VITE_NEWSLETTER_REPLY_TO=info@codewithburhan.com
VITE_ADMIN_EMAIL=info@codewithburhan.com

# Site Configuration
VITE_SITE_URL=https://www.codewithburhan.com

# Feature Flags
VITE_SEND_ADMIN_NOTIFICATIONS=true
VITE_LOG_EMAILS=true
VITE_USE_ADVANCED_FORM=true
```

### 4. For Vercel Deployment

Add these environment variables in your Vercel dashboard:

1. Go to your Vercel project dashboard
2. Click on **Settings** → **Environment Variables**
3. Add each variable from above
4. Redeploy your application

### 5. Environment Variables Explanation

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_SMTP_HOST` | Your SMTP server host | `smtp.hostinger.com` |
| `VITE_SMTP_PORT` | SMTP port number | `465` |
| `VITE_SMTP_SECURE` | Use SSL/TLS encryption | `true` |
| `VITE_BUSINESS_EMAIL_USER` | Your business email | `info@codewithburhan.com` |
| `VITE_BUSINESS_EMAIL_PASSWORD` | Business email password | `your-password` |
| `VITE_NEWSLETTER_FROM_NAME` | Display name for emails | `CDW Burhan Portfolio` |
| `VITE_NEWSLETTER_FROM_EMAIL` | From email address | `info@codewithburhan.com` |
| `VITE_ADMIN_EMAIL` | Where to send notifications | `info@codewithburhan.com` |
| `VITE_SITE_URL` | Your website URL | `https://www.codewithburhan.com` |

### 6. Security Best Practices

- ✅ Never commit `.env` files to version control
- ✅ Use strong passwords for your business email
- ✅ Regularly update your email passwords
- ✅ Monitor your email account for suspicious activity
- ✅ Use the principle of least privilege
- ✅ Enable two-factor authentication on your hosting account

### 7. Testing the Setup

After configuration, test your email system:

1. Try subscribing to your newsletter
2. Check if you receive the welcome email
3. Check if you receive the admin notification
4. Verify email formatting and styling

### 8. Troubleshooting

#### "Invalid email address" error:
- Check if business email account is active
- Verify the email password is correct
- Ensure the business email account has sending permissions

#### Emails not sending:
- Check Vercel environment variables
- Verify the business email password is correct
- Check your Hostinger email account for any restrictions
- Ensure SMTP settings match your hosting provider

#### Emails going to spam:
- Add your domain to Google Search Console
- Set up SPF and DKIM records
- Ask subscribers to add your email to their contacts

### 9. Advanced Configuration

#### Using EmailJS (Alternative Method):
If you prefer EmailJS over direct SMTP:

```env
VITE_USE_EMAILJS=true
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

#### Disable Features:
```env
# Disable admin notifications
VITE_SEND_ADMIN_NOTIFICATIONS=false

# Disable email logging
VITE_LOG_EMAILS=false

# Disable advanced form fallback
VITE_USE_ADVANCED_FORM=false
```

### 10. What Happens When Someone Subscribes

1. **User subscribes** → Form validation
2. **Database updated** → Subscriber added to Supabase
3. **Welcome email sent** → Beautiful HTML email to subscriber
4. **Admin notification** → You receive notification with subscriber details
5. **Email logged** → Attempt logged in database for analytics

### 11. Email Templates

The system includes beautiful, responsive email templates:

- **Welcome Email**: Professional design with your branding
- **Admin Notification**: Clean layout with subscriber details
- **Mobile Responsive**: Works on all devices
- **Unsubscribe Link**: Included in all emails

### 12. Monitoring and Analytics

- Check Vercel function logs for email sending status
- Monitor Supabase `newsletter_email_logs` table
- Use Gmail's sent folder to verify delivery
- Track open rates via email analytics tools

---

## 🎉 You're All Set!

Once configured, your newsletter system will:
- ✅ Send beautiful welcome emails automatically
- ✅ Notify you when someone subscribes
- ✅ Handle unsubscribe requests
- ✅ Log all email activity
- ✅ Work seamlessly with your existing design

Need help? Check the console logs or contact support.
