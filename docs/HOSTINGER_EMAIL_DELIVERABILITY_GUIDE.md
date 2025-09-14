# Hostinger Email Deliverability Guide

## F) Hostinger Email Deliverability Setup

### 1. DNS Records Checklist

#### SPF (Sender Policy Framework)
**Purpose:** Authorizes which servers can send emails from your domain.

**Record Type:** TXT  
**Name:** @ (root domain)  
**Value:** `v=spf1 include:srv.hostinger.com ~all`

**Alternative format (if first doesn't work):**
```
v=spf1 a mx include:srv.hostinger.com ~all
```

**Verification:**
```bash
# Check SPF record
dig TXT yourdomain.com | grep spf

# Expected output should include:
# "v=spf1 include:srv.hostinger.com ~all"
```

#### DKIM (DomainKeys Identified Mail)
**Purpose:** Cryptographically signs emails to verify authenticity.

**Step 1: Get DKIM from Hostinger**
1. Log into Hostinger hPanel
2. Go to Email → Email Accounts
3. Click on "DKIM Records" or "Email Authentication"
4. Copy the DKIM selector and public key

**Step 2: Add DNS Record**
**Record Type:** TXT  
**Name:** `default._domainkey` (or selector provided by Hostinger)  
**Value:** `v=DKIM1; k=rsa; p=<public-key-from-hostinger>`

**Example:**
```
Name: default._domainkey
Value: v=DKIM1; k=rsa; p=MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC5Q8...
```

**Verification:**
```bash
# Check DKIM record
dig TXT default._domainkey.yourdomain.com

# Should return the DKIM public key
```

#### DMARC (Domain-based Message Authentication)
**Purpose:** Tells receiving servers what to do with emails that fail SPF/DKIM.

**Start with monitoring policy:**
**Record Type:** TXT  
**Name:** _dmarc  
**Value:** `v=DMARC1; p=none; rua=mailto:dmarc@yourdomain.com`

**Progressive policies:**
```bash
# Phase 1: Monitor only (recommended start)
v=DMARC1; p=none; rua=mailto:dmarc@yourdomain.com; pct=100

# Phase 2: Quarantine suspicious emails (after 2-4 weeks)
v=DMARC1; p=quarantine; rua=mailto:dmarc@yourdomain.com; pct=25

# Phase 3: Reject failing emails (after proven alignment)
v=DMARC1; p=reject; rua=mailto:dmarc@yourdomain.com; pct=100
```

**Verification:**
```bash
# Check DMARC record
dig TXT _dmarc.yourdomain.com
```

### 2. DMARC Alignment Requirements

#### FROM Domain Alignment
**Critical:** Your `From` address domain MUST match your SMTP authentication domain.

**✅ Correct Configuration:**
```typescript
// Edge Function SMTP config
const fromEmail = "no-reply@yourdomain.com";    // ✅ Matches domain
const smtpUser = "no-reply@yourdomain.com";     // ✅ Same as FROM

// Email headers
From: "CDW Burhan" <no-reply@yourdomain.com>    // ✅ Aligned domain
Reply-To: cdwburhan@gmail.com                   // ✅ Can be different
```

**❌ Incorrect Configuration:**
```typescript
// This will cause DMARC failures:
const fromEmail = "noreply@gmail.com";          // ❌ Wrong domain
const smtpUser = "no-reply@yourdomain.com";     // ❌ Mismatch

// Or:
From: "CDW Burhan" <noreply@anotherdomain.com>  // ❌ Not aligned
```

#### SPF Alignment
Ensure your SMTP server is authorized by your SPF record:
```
v=spf1 include:srv.hostinger.com ~all
```

#### DKIM Alignment
Ensure DKIM signature uses your domain's selector:
```
DKIM-Signature: v=1; a=rsa-sha256; d=yourdomain.com; s=default;
```

### 3. Complete DNS Setup Example

For domain: `codewithburhan.com`

```dns
# SPF Record
Type: TXT
Name: @
Value: v=spf1 include:srv.hostinger.com ~all
TTL: 3600

# DKIM Record (get actual key from Hostinger)
Type: TXT
Name: default._domainkey
Value: v=DKIM1; k=rsa; p=MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC5Q8gV...
TTL: 3600

# DMARC Record (start with monitoring)
Type: TXT
Name: _dmarc
Value: v=DMARC1; p=none; rua=mailto:info@codewithburhan.com; fo=1
TTL: 3600

# Optional: MX Records (if using Hostinger for email)
Type: MX
Name: @
Value: mail.codewithburhan.com
Priority: 10
TTL: 3600
```

### 4. Hostinger SMTP Settings Verification

#### Correct SMTP Configuration
```bash
# Supabase secrets setup
supabase secrets set SMTP_HOST=smtp.hostinger.com
supabase secrets set SMTP_PORT=465
supabase secrets set SMTP_USER=info@codewithburhan.com
supabase secrets set SMTP_PASS="Bb0101010@#123"
supabase secrets set ADMIN_EMAIL=info@codewithburhan.com
supabase secrets set BRAND_NAME="CDW Burhan Portfolio"
```

#### Port Configuration Guide
**Port 465 (TLS) - Your Configuration:**
```typescript
await client.connectTLS({
  hostname: "smtp.hostinger.com",
  port: 465,
  username: "info@codewithburhan.com",
  password: "Bb0101010@#123",
});
```

**Port 587 (STARTTLS) - Alternative:**
```typescript
await client.connect({
  hostname: "smtp.hostinger.com",
  port: 587,
  username: "info@codewithburhan.com",
  password: "Bb0101010@#123",
});
```

**Port 25 (Usually blocked by providers):**
❌ Not recommended for cloud functions

### 5. Deliverability Testing Strategy

#### Seed List Testing
Create test accounts on major providers:

```javascript
const seedList = [
  'test@gmail.com',           // Google Workspace
  'test@outlook.com',         // Microsoft 365
  'test@yahoo.com',           // Yahoo Mail
  'test@protonmail.com',      // ProtonMail
  'test@yourdomain.com'       // Your own domain
];

async function testDeliverability() {
  console.log('🧪 Testing email deliverability...');
  
  for (const email of seedList) {
    try {
      const result = await newsletterService.subscribe(email, 'admin');
      console.log(`✅ ${email}: ${result.success ? 'Sent' : 'Failed'}`);
      
      // Wait between sends to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 2000));
      
    } catch (error) {
      console.error(`❌ ${email}: Error - ${error.message}`);
    }
  }
}
```

#### Delivery Location Testing
**Check these locations for test emails:**

1. **Gmail:**
   - Primary Inbox ✅ (best)
   - Promotions Tab ⚠️ (acceptable)
   - Spam Folder ❌ (needs fixing)

2. **Outlook/Hotmail:**
   - Focused Inbox ✅ (best)
   - Other Inbox ⚠️ (acceptable)
   - Junk Folder ❌ (needs fixing)

3. **Yahoo Mail:**
   - Inbox ✅ (best)
   - Spam Folder ❌ (needs fixing)

#### Authentication Testing Tools
```bash
# Test SPF
dig TXT yourdomain.com | grep spf1

# Test DKIM
dig TXT default._domainkey.yourdomain.com

# Test DMARC
dig TXT _dmarc.yourdomain.com

# Online testing tools:
# - MXToolbox.com
# - Mail-tester.com
# - DMARC Analyzer
```

### 6. Common Hostinger Pitfalls & Solutions

#### Problem 1: Wrong SMTP Server
**Symptoms:** Connection refused, DNS lookup failed
**Solution:**
```bash
# ❌ Wrong servers
smtp.youromain.com
mail.yourdomain.com

# ✅ Correct server
smtp.hostinger.com
```

#### Problem 2: Incorrect Port/Security
**Symptoms:** TLS handshake failed, connection timeout
**Solution:**
```typescript
// ❌ Wrong configuration
port: 25,          // Usually blocked
secure: false,     // For port 465

// ✅ Correct configurations
// Option 1: STARTTLS
port: 587,
secure: false,     // Use STARTTLS

// Option 2: TLS
port: 465,
secure: true,      // Direct TLS
```

#### Problem 3: Authentication Issues
**Symptoms:** 535 Authentication failed
**Solutions:**
1. **Verify credentials in Hostinger hPanel**
2. **Disable 2FA temporarily for email account**
3. **Use app-specific password if available**
4. **Check for account suspension/limits**

#### Problem 4: FROM Address Mismatch
**Symptoms:** DMARC failures, emails marked as spam
**Solution:**
```typescript
// ❌ Wrong - domain mismatch
From: "CDW Burhan" <noreply@gmail.com>
SMTP User: no-reply@yourdomain.com

// ✅ Correct - aligned domains
From: "CDW Burhan" <no-reply@yourdomain.com>
SMTP User: no-reply@yourdomain.com
```

#### Problem 5: Missing DNS Propagation
**Symptoms:** SPF/DKIM/DMARC checks failing
**Solution:**
```bash
# Check DNS propagation globally
# Use: whatsmydns.net

# Verify TTL values are appropriate
# SPF/DKIM/DMARC: 3600 seconds (1 hour)
# Allow up to 48 hours for full propagation
```

#### Problem 6: Disabled Email Account
**Symptoms:** Authentication works but emails don't send
**Solution:**
1. **Log into Hostinger hPanel**
2. **Check Email Accounts section**
3. **Verify account is "Active"**
4. **Check usage limits/quotas**

### 7. Monitoring & Maintenance

#### Weekly Checks
```bash
# Check authentication records
dig TXT yourdomain.com | grep spf1
dig TXT default._domainkey.yourdomain.com
dig TXT _dmarc.yourdomain.com

# Check email logs for failures
SELECT status, COUNT(*) FROM mail_logs 
WHERE created_at >= NOW() - INTERVAL '7 days' 
GROUP BY status;
```

#### Monthly Reviews
1. **DMARC Report Analysis**
   - Review aggregate reports
   - Adjust policy if needed
   - Monitor alignment percentages

2. **Deliverability Testing**
   - Send test emails to seed list
   - Check spam folder placement
   - Monitor bounce rates

3. **Account Health**
   - Check Hostinger account status
   - Verify email quotas
   - Review sending limits

#### DMARC Report Analysis
```python
# Example DMARC report interpretation
{
  "org_name": "google.com",
  "email": "test@gmail.com",
  "policy_published": {
    "domain": "yourdomain.com",
    "p": "none",
    "sp": "none",
    "pct": 100
  },
  "record": {
    "row": {
      "source_ip": "1.2.3.4",
      "count": 1,
      "policy_evaluated": {
        "disposition": "none",
        "dkim": "pass",     # ✅ DKIM aligned
        "spf": "pass"       # ✅ SPF aligned
      }
    }
  }
}
```

### 8. Emergency Troubleshooting

#### If Emails Suddenly Stop Working
1. **Check Hostinger service status**
2. **Verify SMTP credentials haven't changed**
3. **Check DNS record modifications**
4. **Review recent email volume for rate limiting**
5. **Check IP reputation (if using dedicated IP)**

#### If Emails Go to Spam
1. **Verify DMARC alignment immediately**
2. **Check recent DNS changes**
3. **Review email content for spam triggers**
4. **Test with different FROM addresses**
5. **Warm up new domains gradually**

This comprehensive guide should ensure reliable email delivery through Hostinger while maintaining excellent deliverability rates.
