# Newsletter Email Templates - Testing Guide

## PowerShell Testing Examples

### 1. Basic Subscription Test

```powershell
# Test newsletter subscription
$url = "https://xwqimfzjickiubkfxmdc.functions.supabase.co/send-welcome"
$body = @{
    email = "test@example.com"
} | ConvertTo-Json

$headers = @{
    "Content-Type" = "application/json"
}

try {
    $response = Invoke-RestMethod -Uri $url -Method POST -Body $body -Headers $headers
    Write-Host "✅ Success: $($response | ConvertTo-Json -Depth 3)" -ForegroundColor Green
} catch {
    Write-Host "❌ Error: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host "Response: $($_.Exception.Response)" -ForegroundColor Yellow
}
```

### 2. Multiple Email Test

```powershell
# Test multiple emails
$url = "https://xwqimfzjickiubkfxmdc.functions.supabase.co/send-welcome"
$testEmails = @(
    "test1@gmail.com",
    "test2@outlook.com", 
    "test3@yahoo.com"
)

foreach ($email in $testEmails) {
    $body = @{ email = $email } | ConvertTo-Json
    $headers = @{ "Content-Type" = "application/json" }
    
    try {
        Write-Host "Testing: $email" -ForegroundColor Cyan
        $response = Invoke-RestMethod -Uri $url -Method POST -Body $body -Headers $headers
        Write-Host "✅ $email - Success" -ForegroundColor Green
        Start-Sleep -Seconds 2  # Rate limiting
    } catch {
        Write-Host "❌ $email - Error: $($_.Exception.Message)" -ForegroundColor Red
    }
}
```

### 3. Error Case Testing

```powershell
# Test invalid emails
$url = "https://xwqimfzjickiubkfxmdc.functions.supabase.co/send-welcome"
$invalidEmails = @(
    "invalid-email",           # No @ symbol
    "test@",                  # No domain
    "@domain.com",            # No username
    "",                       # Empty string
    "test@domain",            # No TLD
    "test.domain.com"         # No @ symbol
)

foreach ($email in $invalidEmails) {
    $body = @{ email = $email } | ConvertTo-Json
    $headers = @{ "Content-Type" = "application/json" }
    
    Write-Host "Testing invalid email: '$email'" -ForegroundColor Cyan
    try {
        $response = Invoke-RestMethod -Uri $url -Method POST -Body $body -Headers $headers
        Write-Host "⚠️  Unexpected success for: '$email'" -ForegroundColor Yellow
    } catch {
        Write-Host "✅ Correctly rejected: '$email'" -ForegroundColor Green
    }
}
```

### 4. CORS Testing

```powershell
# Test CORS preflight
$url = "https://xwqimfzjickiubkfxmdc.functions.supabase.co/send-welcome"

try {
    Write-Host "Testing CORS preflight..." -ForegroundColor Cyan
    $response = Invoke-RestMethod -Uri $url -Method OPTIONS
    Write-Host "✅ CORS preflight successful" -ForegroundColor Green
} catch {
    Write-Host "❌ CORS preflight failed: $($_.Exception.Message)" -ForegroundColor Red
}
```

### 5. Performance Test

```powershell
# Test response time
$url = "https://xwqimfzjickiubkfxmdc.functions.supabase.co/send-welcome"
$testCount = 5

$times = @()
for ($i = 1; $i -le $testCount; $i++) {
    $body = @{ email = "perftest$i@example.com" } | ConvertTo-Json
    $headers = @{ "Content-Type" = "application/json" }
    
    $stopwatch = [System.Diagnostics.Stopwatch]::StartNew()
    try {
        $response = Invoke-RestMethod -Uri $url -Method POST -Body $body -Headers $headers
        $stopwatch.Stop()
        $times += $stopwatch.ElapsedMilliseconds
        Write-Host "Test $i: $($stopwatch.ElapsedMilliseconds)ms" -ForegroundColor Green
    } catch {
        Write-Host "Test $i failed: $($_.Exception.Message)" -ForegroundColor Red
    }
    Start-Sleep -Seconds 1
}

if ($times.Count -gt 0) {
    $avgTime = ($times | Measure-Object -Average).Average
    Write-Host "Average response time: $([math]::Round($avgTime, 2))ms" -ForegroundColor Cyan
}
```

## QA Checklist

### ✅ Email Delivery Testing

- [ ] **Welcome Email Received**: Check inbox for welcome email
- [ ] **Admin Notification**: Verify admin receives notification at `info@codewithburhan.com`
- [ ] **Spam Check**: Email lands in inbox, not spam/promotions
- [ ] **Template Rendering**: HTML displays correctly in Gmail/Outlook
- [ ] **Mobile Responsive**: Email looks good on mobile devices
- [ ] **Dark Mode**: Email renders well in dark mode clients
- [ ] **Links Work**: All CTA buttons and links are functional
- [ ] **Unsubscribe Link**: Footer unsubscribe link is present

### ✅ API Response Testing

- [ ] **200 OK**: Valid email returns `{"ok": true}`
- [ ] **400 Bad Request**: Invalid email returns proper error
- [ ] **500 Error**: Server errors handled gracefully
- [ ] **CORS Headers**: Requests work from browser
- [ ] **Rate Limiting**: Multiple requests don't cause issues
- [ ] **Response Time**: API responds within 5 seconds

### ✅ Frontend Integration

- [ ] **Form Submission**: Newsletter forms submit successfully
- [ ] **Loading States**: Proper loading indicators
- [ ] **Success Messages**: User sees confirmation message
- [ ] **Error Handling**: Errors display user-friendly messages
- [ ] **Validation**: Client-side email validation works
- [ ] **Analytics**: Subscription events tracked properly

### ✅ Email Template Quality

- [ ] **Brand Consistency**: Matches CDW Burhan branding
- [ ] **Professional Design**: Clean, modern appearance
- [ ] **Accessibility**: Good contrast, readable fonts
- [ ] **Plain Text**: Text version renders properly
- [ ] **Personalization**: Uses subscriber name when available
- [ ] **Call-to-Action**: Clear next steps for user

### ✅ Infrastructure

- [ ] **SMTP Config**: Hostinger SMTP working properly
- [ ] **DNS Records**: SPF/DKIM/DMARC verified
- [ ] **Edge Function**: Deployed and accessible
- [ ] **Environment Variables**: All secrets properly set
- [ ] **Error Logging**: Function logs errors appropriately

## Troubleshooting

### Common Issues

1. **Email not received**:
   - Check spam folder
   - Verify SMTP credentials
   - Check Hostinger email logs

2. **CORS errors**:
   - Verify `CORS_ORIGIN` environment variable
   - Check if origin is properly configured

3. **500 errors**:
   - Check Edge Function logs in Supabase
   - Verify all environment variables are set
   - Check SMTP connection

4. **Template not rendering**:
   - Verify templates imported correctly
   - Check for syntax errors in HTML

### Debug Commands

```powershell
# Check function deployment
$url = "https://xwqimfzjickiubkfxmdc.functions.supabase.co/send-welcome"
Invoke-RestMethod -Uri $url -Method GET  # Should return error or info

# Test with verbose output
Invoke-RestMethod -Uri $url -Method POST -Body '{"email":"debug@test.com"}' -ContentType "application/json" -Verbose
```

## Production Deployment Verification

1. **Test from production domain**: Ensure forms work from live site
2. **Cross-browser testing**: Test in Chrome, Firefox, Safari, Edge
3. **Mobile testing**: Test on iOS/Android email clients
4. **Load testing**: Verify performance under load
5. **Monitoring**: Set up alerts for failed email deliveries

## Contact for Issues

If issues persist:
- Check Supabase Edge Function logs
- Verify Hostinger email delivery logs
- Test SMTP connection manually
- Review environment variable configuration
