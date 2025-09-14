# Vercel Environment Variables Setup

⚠️ **CRITICAL**: You must add these environment variables to your Vercel project for the email system to work.

## 🚀 How to Add Environment Variables in Vercel

1. **Go to Vercel Dashboard**: https://vercel.com/dashboard
2. **Select your project**: `cdw-burhan-portfolio` or similar
3. **Go to Settings**: Click on "Settings" tab
4. **Click Environment Variables**: In the left sidebar
5. **Add each variable**: Click "Add" and enter the details below

## 📧 Required Environment Variables

### SMTP Configuration (Hostinger)
```
Name: SMTP_HOST
Value: smtp.hostinger.com

Name: SMTP_PORT  
Value: 465

Name: SMTP_SECURE
Value: true

Name: BUSINESS_EMAIL_USER
Value: info@codewithburhan.com

Name: BUSINESS_EMAIL_PASSWORD
Value: Bb0101010@#123

Name: NEWSLETTER_FROM_NAME
Value: CDW Burhan Portfolio

Name: NEWSLETTER_FROM_EMAIL
Value: info@codewithburhan.com

Name: NEWSLETTER_REPLY_TO
Value: info@codewithburhan.com
```

### Optional Settings
```
Name: SEND_ADMIN_NOTIFICATIONS
Value: true

Name: VITE_SITE_URL
Value: https://www.codewithburhan.com
```

## 🔧 Environment Settings for Each Variable

**Important**: For each environment variable:
- ✅ **Production**: Always check this
- ✅ **Preview**: Recommended to check this too
- ⚠️ **Development**: Optional (only if testing locally with Vercel CLI)

## 🚨 Troubleshooting

### If you get "SMTP credentials not configured":
1. Double-check all environment variables are added
2. Make sure there are no extra spaces in values
3. Verify the password is exactly: `Bb0101010@#123`
4. Redeploy after adding variables

### If you get "535 Authentication failed":
1. Verify your Hostinger email password is correct
2. Try logging into webmail with the same credentials
3. Make sure 2FA is not blocking SMTP access

### If you get connection timeout:
1. Check if Hostinger SMTP is working
2. Try alternative settings:
   - Port: 587 instead of 465
   - Secure: false instead of true

## 🔄 After Adding Variables

1. **Redeploy**: Go to Deployments → Click "..." → Redeploy
2. **Test**: Visit your website → go to `/test-email`
3. **Check logs**: Go to Functions tab to see any errors

## 📞 Quick Test

After setup, test at: `https://your-domain.com/test-email`

---

**Sleep well! 😴 Your email system will be working when you wake up!**
