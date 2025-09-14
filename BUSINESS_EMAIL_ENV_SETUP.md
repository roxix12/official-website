# Business Email Environment Variables Setup

## 🔐 Your Business Email Configuration

Based on your Hostinger settings and credentials, here are your exact environment variables:

### **Environment Variables for .env file:**

```env
# Business Email SMTP Configuration (Hostinger)
VITE_SMTP_HOST=smtp.hostinger.com
VITE_SMTP_PORT=465
VITE_SMTP_SECURE=true
VITE_BUSINESS_EMAIL_USER=info@codewithburhan.com
VITE_BUSINESS_EMAIL_PASSWORD=Bb0101010@#123

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

## 🚀 Deployment Steps

### **1. Local Development**
1. Create `.env` file in your project root
2. Copy the environment variables above
3. Save the file
4. Restart your development server: `npm run dev`

### **2. Vercel Deployment**
Add these environment variables in your Vercel dashboard:

| Variable | Value |
|----------|-------|
| `VITE_SMTP_HOST` | `smtp.hostinger.com` |
| `VITE_SMTP_PORT` | `465` |
| `VITE_SMTP_SECURE` | `true` |
| `VITE_BUSINESS_EMAIL_USER` | `info@codewithburhan.com` |
| `VITE_BUSINESS_EMAIL_PASSWORD` | `$o[5Pi46L` |
| `VITE_NEWSLETTER_FROM_NAME` | `CDW Burhan Portfolio` |
| `VITE_NEWSLETTER_FROM_EMAIL` | `info@codewithburhan.com` |
| `VITE_NEWSLETTER_REPLY_TO` | `info@codewithburhan.com` |
| `VITE_ADMIN_EMAIL` | `info@codewithburhan.com` |
| `VITE_SITE_URL` | `https://www.codewithburhan.com` |
| `VITE_SEND_ADMIN_NOTIFICATIONS` | `true` |
| `VITE_LOG_EMAILS` | `true` |
| `VITE_USE_ADVANCED_FORM` | `true` |

### **3. Vercel Setup Instructions**

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project (cdw-burhan-portfolio)
3. Click **Settings**
4. Click **Environment Variables**
5. For each variable above:
   - Click **Add New**
   - Enter the **Name** (e.g., `VITE_SMTP_HOST`)
   - Enter the **Value** (e.g., `smtp.hostinger.com`)
   - Select **Production**, **Preview**, and **Development**
   - Click **Save**
6. After adding all variables, go to **Deployments**
7. Click **Redeploy** on your latest deployment

## ⚠️ Important Notes

### **Password Special Characters**
Your password `$o[5Pi46L` contains special characters:
- `$` - Dollar sign
- `[` and `]` - Square brackets

These should work fine in environment variables, but if you encounter issues:
1. Try wrapping the password in quotes: `"$o[5Pi46L"`
2. Or escape special characters if needed

### **Security Reminders**
- ✅ Never commit `.env` files to Git
- ✅ The `.env` file is already in `.gitignore`
- ✅ Only use these credentials for your business email
- ✅ Change password if you suspect it's compromised

## 🧪 Testing Your Setup

After deployment, test your newsletter:

1. **Visit your website**: https://www.codewithburhan.com
2. **Find newsletter signup** (footer or other forms)
3. **Subscribe with a test email**
4. **Check for welcome email** from info@codewithburhan.com
5. **Check your admin email** for new subscriber notification

## 📧 Expected Email Flow

### **Subscriber Experience:**
1. Fills out newsletter form
2. Receives beautiful welcome email from `info@codewithburhan.com`
3. Email includes unsubscribe link
4. Professional appearance with your branding

### **Admin Experience:**
1. Receives notification at `info@codewithburhan.com`
2. Email contains subscriber details
3. Links to admin panel for management
4. Real-time notifications for every signup

## 🔧 Troubleshooting

If emails don't send:

1. **Check Vercel Environment Variables**
   - Ensure all variables are set correctly
   - Verify no typos in variable names
   - Confirm password is exactly `$o[5Pi46L`

2. **Check Vercel Function Logs**
   - Go to Vercel Dashboard → Functions
   - Look for error messages
   - Check for SMTP connection errors

3. **Test Email Credentials**
   - Try logging into your email manually
   - Ensure `info@codewithburhan.com` with password `$o[5Pi46L` works
   - Check if account is active in Hostinger

4. **Check SMTP Settings**
   - Verify Hostinger SMTP settings haven't changed
   - Confirm port 465 with SSL is correct
   - Check if there are any Hostinger restrictions

## ✅ Success Indicators

You'll know it's working when:
- ✅ Newsletter signup form submits successfully
- ✅ User receives welcome email from info@codewithburhan.com
- ✅ You receive admin notification
- ✅ Emails appear professional with your branding
- ✅ No console errors during subscription process

---

## 🎉 You're All Set!

Your business email is now configured for professional newsletter delivery. All emails will be sent from your custom domain `@codewithburhan.com`, giving your brand a professional appearance and better deliverability rates.

**Next Steps:**
1. Add environment variables to Vercel
2. Redeploy your application
3. Test the newsletter subscription
4. Enjoy professional email delivery! 🚀
