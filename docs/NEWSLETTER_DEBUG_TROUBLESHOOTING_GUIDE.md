# Newsletter Email Debugging & Troubleshooting Guide

## A) End-to-End Debug Plan

### 1. Frontend → API Debug Flow

#### Step 1: Browser Network Tab Investigation
```bash
# Open browser DevTools → Network tab
# Filter by "Fetch/XHR" requests
# Look for requests to: https://<project-ref>.functions.supabase.co/send-welcome

# Check request details:
- Request URL: Should match your Edge Function endpoint
- Method: POST
- Status: Look for 200 (success), 4xx (client error), 5xx (server error)
- Request Headers: Authorization Bearer token present
- Request Body: {"email": "...", "source": "website"}
- Response: JSON with success/error details
```

#### Step 2: Request ID Tracking
```javascript
// Add request ID tracking to your newsletter service
const requestId = crypto.randomUUID();
console.log(`📧 Request ID: ${requestId} - Starting subscription for ${email}`);

// Include in Edge Function logs
console.log(`🔍 [${requestId}] Processing email: ${email}`);
```

#### Step 3: Supabase Function Logs
```bash
# Access Supabase Dashboard → Edge Functions → send-welcome → Logs
# Look for your request ID in the logs
# Common log patterns:
✅ [requestId] Email sent successfully to email@domain.com
❌ [requestId] SMTP authentication failed: Invalid login
⚠️ [requestId] Rate limit exceeded for IP: 1.2.3.4
```

### 2. SMTP Connectivity Testing

#### SMTP Verification Endpoint
```bash
# Test SMTP connection via GET request
curl -X GET \
  "https://<project-ref>.functions.supabase.co/send-welcome" \
  -H "Authorization: Bearer <anon-key>"

# Expected response:
{
  "success": true,
  "host": "smtp.hostinger.com",
  "port": 587,
  "banner": "Connected successfully",
  "timestamp": "2024-01-20T10:30:00.000Z"
}
```

#### Manual SMTP Test (Development)
```javascript
// Add to your Edge Function for testing
async function testSmtpManually() {
  const client = new SmtpClient();
  try {
    await client.connect({
      hostname: "smtp.hostinger.com",
      port: 587,
      username: "no-reply@yourdomain.com",
      password: "your-password",
    });
    console.log("✅ SMTP Connection successful");
    await client.close();
  } catch (error) {
    console.error("❌ SMTP Connection failed:", error);
  }
}
```

### 3. Supabase Edge Function Logs Access

#### Via Supabase Dashboard
1. Go to Supabase Dashboard
2. Select your project
3. Navigate to Edge Functions
4. Click on "send-welcome" function
5. Go to "Logs" tab
6. Filter by timestamp and error level

#### Via CLI (Alternative)
```bash
npx supabase functions logs send-welcome --follow
```

### 4. Database Logging Integration

#### Check mail_logs Table
```sql
-- View recent email attempts
SELECT 
  to_email,
  template,
  status,
  error_text,
  created_at
FROM mail_logs 
ORDER BY created_at DESC 
LIMIT 20;

-- Check success/failure rates
SELECT 
  status,
  COUNT(*) as count,
  ROUND(COUNT(*) * 100.0 / SUM(COUNT(*)) OVER (), 2) as percentage
FROM mail_logs 
WHERE created_at >= NOW() - INTERVAL '24 hours'
GROUP BY status;
```

---

## B) Common SMTP Error Codes & Solutions

### Authentication Errors
```
535 Authentication failed
535 Incorrect authentication data
```
**Solutions:**
- Verify SMTP_USER and SMTP_PASS in Supabase secrets
- Check Hostinger email account is active
- Ensure 2FA is disabled on email account
- Try app-specific password if available

### Connection Errors
```
Connection timeout
ENOTFOUND smtp.hostinger.com
```
**Solutions:**
- Check SMTP_HOST is correct: `smtp.hostinger.com`
- Verify port: 587 (STARTTLS) or 465 (TLS)
- Check firewall/network restrictions

### TLS/SSL Errors
```
STARTTLS command failed
SSL handshake failed
```
**Solutions:**
```typescript
// Try TLS on port 465 if STARTTLS fails
if (port === 465) {
  await client.connectTLS({
    hostname: host,
    port: 465,
    username: username,
    password: password,
  });
} else {
  await client.connect({
    hostname: host,
    port: 587,
    username: username,
    password: password,
  });
}
```

### Rate Limiting
```
421 Too many connections
450 Requested mail action not taken: mailbox unavailable
```
**Solutions:**
- Implement backoff delays between emails
- Use connection pooling
- Respect provider rate limits (typically 100-300 emails/hour for shared hosting)

### Domain Authentication Failures
```
550 Sender address rejected
553 Domain name required
```
**Solutions:**
- Ensure FROM address matches SMTP_USER
- Set up proper DNS records (SPF, DKIM, DMARC)
- Use authenticated domain for FROM address

---

## C) Debugging Commands & Scripts

### Environment Variable Check
```bash
# In Supabase Edge Function
console.log('Environment Check:', {
  SMTP_HOST: Deno.env.get('SMTP_HOST') ? '✅ Set' : '❌ Missing',
  SMTP_PORT: Deno.env.get('SMTP_PORT') ? '✅ Set' : '❌ Missing',
  SMTP_USER: Deno.env.get('SMTP_USER') ? '✅ Set' : '❌ Missing',
  SMTP_PASS: Deno.env.get('SMTP_PASS') ? '✅ Set' : '❌ Missing',
  ADMIN_EMAIL: Deno.env.get('ADMIN_EMAIL') ? '✅ Set' : '❌ Missing',
  BRAND_NAME: Deno.env.get('BRAND_NAME') ? '✅ Set' : '❌ Missing',
});
```

### Request Debugging Script
```javascript
// Add to your frontend for debugging
async function debugNewsletterFlow(email) {
  console.group('🔍 Newsletter Debug Flow');
  
  try {
    // Step 1: Verify SMTP
    console.log('Step 1: Verifying SMTP...');
    const smtpResult = await newsletterService.verifySmtp();
    console.log('SMTP Result:', smtpResult);
    
    // Step 2: Test subscription
    console.log('Step 2: Testing subscription...');
    const subResult = await newsletterService.subscribe(email, 'website');
    console.log('Subscription Result:', subResult);
    
    // Step 3: Check database logs
    console.log('Step 3: Check admin panel for email logs');
    
  } catch (error) {
    console.error('Debug flow failed:', error);
  } finally {
    console.groupEnd();
  }
}

// Usage in browser console:
// debugNewsletterFlow('test@example.com');
```

### Health Check Endpoint
```javascript
// Add to Edge Function for monitoring
if (url.pathname === '/health') {
  const health = await smtpVerify(
    Deno.env.get('SMTP_HOST'),
    parseInt(Deno.env.get('SMTP_PORT')),
    false
  );
  
  return new Response(JSON.stringify({
    status: health.success ? 'healthy' : 'unhealthy',
    smtp: health,
    timestamp: new Date().toISOString(),
    environment: {
      host: Deno.env.get('SMTP_HOST'),
      port: Deno.env.get('SMTP_PORT'),
      user: Deno.env.get('SMTP_USER') ? 'configured' : 'missing'
    }
  }), {
    headers: { 'Content-Type': 'application/json' }
  });
}
```

---

## D) Safe Retries & Backoff Strategy

### Exponential Backoff Implementation
```typescript
async function sendEmailWithRetry(
  to: string, 
  subject: string, 
  html: string, 
  text: string,
  maxRetries: number = 3
) {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      await sendEmail(to, subject, html, text);
      console.log(`✅ Email sent successfully on attempt ${attempt}`);
      return { success: true, attempts: attempt };
      
    } catch (error) {
      console.error(`❌ Email attempt ${attempt} failed:`, error);
      
      // Don't retry for certain errors
      if (isNonRetryableError(error)) {
        throw error;
      }
      
      // Wait before retry (exponential backoff)
      if (attempt < maxRetries) {
        const delay = Math.pow(2, attempt) * 1000; // 2s, 4s, 8s
        console.log(`⏳ Waiting ${delay}ms before retry...`);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
  }
  
  throw new Error(`Failed after ${maxRetries} attempts`);
}

function isNonRetryableError(error: Error): boolean {
  const nonRetryablePatterns = [
    'Invalid email format',
    'Authentication failed',
    'Sender address rejected',
    'Domain name required'
  ];
  
  return nonRetryablePatterns.some(pattern => 
    error.message.includes(pattern)
  );
}
```

### Rate Limiting Strategy
```typescript
class EmailQueue {
  private queue: Array<EmailJob> = [];
  private processing = false;
  private readonly EMAILS_PER_MINUTE = 10;
  
  async addEmail(emailJob: EmailJob) {
    this.queue.push(emailJob);
    if (!this.processing) {
      this.processQueue();
    }
  }
  
  private async processQueue() {
    this.processing = true;
    
    while (this.queue.length > 0) {
      const job = this.queue.shift();
      try {
        await this.sendEmailSafely(job);
        // Wait to respect rate limits
        await this.delay(60000 / this.EMAILS_PER_MINUTE); // 6 seconds between emails
      } catch (error) {
        console.error('Queue processing error:', error);
      }
    }
    
    this.processing = false;
  }
  
  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
```

---

## E) When to Queue vs Fire-and-Forget

### Fire-and-Forget (Current Implementation)
**Use for:**
- Welcome emails (immediate response expected)
- Single subscriber additions
- Low-volume operations (< 10 emails/hour)

```typescript
// Current approach - immediate sending
const result = await sendEmail(email, subject, html, text);
return { success: result.success };
```

### Queue-Based Approach
**Use for:**
- Bulk email campaigns
- High-volume subscriptions
- Newsletter broadcasts
- Background processing

```typescript
// Queue-based approach
interface EmailJob {
  id: string;
  to: string;
  template: string;
  data: any;
  attempts: number;
  scheduled_at: Date;
}

// Add to queue instead of immediate send
async function queueEmail(emailJob: EmailJob) {
  const { error } = await supabase
    .from('email_queue')
    .insert([emailJob]);
    
  if (error) throw error;
  
  // Trigger queue processor (could be separate function)
  await processEmailQueue();
}
```

### Hybrid Approach (Recommended)
```typescript
async function sendEmailSmart(emailData: EmailData) {
  // Check current load
  const pendingEmails = await getPendingEmailCount();
  
  if (pendingEmails < 5) {
    // Low load: send immediately
    return await sendEmailDirectly(emailData);
  } else {
    // High load: queue for later
    return await queueEmail(emailData);
  }
}
```

---

## F) Monitoring & Alerting

### Dashboard Metrics to Track
1. **Email Success Rate** (target: >95%)
2. **Average Response Time** (target: <3 seconds)
3. **Error Rate by Type** (SMTP auth, connection, etc.)
4. **Queue Length** (for background processing)
5. **Bounce/Complaint Rates**

### Alert Thresholds
```typescript
const ALERT_THRESHOLDS = {
  SUCCESS_RATE_MIN: 90, // Alert if success rate < 90%
  ERROR_RATE_MAX: 10,   // Alert if error rate > 10%
  RESPONSE_TIME_MAX: 5000, // Alert if avg response > 5s
  QUEUE_LENGTH_MAX: 100    // Alert if queue > 100 emails
};
```

### Log Analysis Queries
```sql
-- Daily email performance
SELECT 
  DATE(created_at) as date,
  COUNT(*) as total_emails,
  COUNT(*) FILTER (WHERE status = 'sent') as successful,
  COUNT(*) FILTER (WHERE status = 'failed') as failed,
  ROUND(
    COUNT(*) FILTER (WHERE status = 'sent') * 100.0 / COUNT(*), 
    2
  ) as success_rate
FROM mail_logs 
WHERE created_at >= NOW() - INTERVAL '7 days'
GROUP BY DATE(created_at)
ORDER BY date DESC;

-- Most common errors
SELECT 
  error_text,
  COUNT(*) as occurrence_count
FROM mail_logs 
WHERE status = 'failed' 
  AND created_at >= NOW() - INTERVAL '24 hours'
GROUP BY error_text
ORDER BY occurrence_count DESC;
```

This comprehensive debugging guide should help you quickly identify and resolve email delivery issues in your newsletter system.
