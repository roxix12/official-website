/**
 * Professional Email Templates for CDW Burhan
 * Deno Edge Function Version - Production-ready, responsive, inline-CSS templates
 * Brand colors: #0ea5e9 (accent), dark theme friendly
 */

export interface TemplateOptions {
  name?: string;
  email?: string;
  timestamp?: string;
  userAgent?: string;
  source?: string;
}

/**
 * Welcome Email Template - HTML Version
 * Responsive design with inline CSS, dark/light theme friendly
 */
export function tplWelcomeHTML(name?: string): string {
  const displayName = name || 'Developer';
  
  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>Welcome to CDW Burhan 🎉</title>
    <!--[if mso]>
    <noscript>
        <xml>
            <o:OfficeDocumentSettings>
                <o:PixelsPerInch>96</o:PixelsPerInch>
            </o:OfficeDocumentSettings>
        </xml>
    </noscript>
    <![endif]-->
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif; line-height: 1.6; color: #333333; background-color: #f8fafc;">

    <!-- Main Container -->
    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #f8fafc;">
        <tr>
            <td align="center" style="padding: 40px 20px;">
                
                <!-- Email Content Container -->
                <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="max-width: 600px; width: 100%; background-color: #ffffff; border-radius: 16px; box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04); overflow: hidden;">
                    
                    <!-- Header with Brand -->
                    <tr>
                        <td style="background: linear-gradient(135deg, #0ea5e9 0%, #3b82f6 100%); padding: 40px 30px; text-align: center;">
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                                <tr>
                                    <td align="center">
                                        <!-- Logo/Brand Icon -->
                                        <div style="width: 80px; height: 80px; background-color: rgba(255, 255, 255, 0.2); border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; margin-bottom: 20px; backdrop-filter: blur(10px);">
                                            <span style="font-size: 32px; font-weight: bold; color: #ffffff;">CB</span>
                                        </div>
                                        
                                        <!-- Welcome Title -->
                                        <h1 style="margin: 0; font-size: 28px; font-weight: 700; color: #ffffff; text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);">
                                            Welcome to CDW Burhan! 🎉
                                        </h1>
                                        
                                        <p style="margin: 8px 0 0 0; font-size: 16px; color: rgba(255, 255, 255, 0.9);">
                                            Your journey to web development mastery starts here
                                        </p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    
                    <!-- Main Content -->
                    <tr>
                        <td style="padding: 40px 30px;">
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                                <tr>
                                    <td>
                                        <h2 style="margin: 0 0 20px 0; font-size: 22px; font-weight: 600; color: #1e293b;">
                                            Hey ${displayName}! 👋
                                        </h2>
                                        
                                        <p style="margin: 0 0 20px 0; font-size: 16px; color: #475569; line-height: 1.7;">
                                            Thank you for subscribing to <strong>CDW Burhan</strong>! You're now part of an exclusive community of developers who are passionate about creating amazing web experiences.
                                        </p>
                                        
                                        <p style="margin: 0 0 20px 0; font-size: 16px; color: #475569; line-height: 1.7;">
                                            Here's what you can expect from our newsletter:
                                        </p>
                                        
                                        <!-- Benefits List -->
                                        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin: 20px 0 30px 0;">
                                            <tr>
                                                <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0;">
                                                    <span style="color: #0ea5e9; font-size: 18px; margin-right: 12px;">🚀</span>
                                                    <span style="font-size: 16px; color: #334155; font-weight: 500;">Latest web development tutorials and insights</span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0;">
                                                    <span style="color: #0ea5e9; font-size: 18px; margin-right: 12px;">💡</span>
                                                    <span style="font-size: 16px; color: #334155; font-weight: 500;">Exclusive project showcases and case studies</span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0;">
                                                    <span style="color: #0ea5e9; font-size: 18px; margin-right: 12px;">🎯</span>
                                                    <span style="font-size: 16px; color: #334155; font-weight: 500;">Career tips and industry best practices</span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style="padding: 12px 0;">
                                                    <span style="color: #0ea5e9; font-size: 18px; margin-right: 12px;">🔥</span>
                                                    <span style="font-size: 16px; color: #334155; font-weight: 500;">Early access to free resources and tools</span>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    
                    <!-- CTA Section -->
                    <tr>
                        <td style="padding: 0 30px 40px 30px;">
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                                <tr>
                                    <td align="center" style="background: linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%); border-radius: 12px; padding: 30px;">
                                        <h3 style="margin: 0 0 15px 0; font-size: 20px; font-weight: 600; color: #1e293b;">
                                            Ready to Level Up? 🎯
                                        </h3>
                                        
                                        <p style="margin: 0 0 25px 0; font-size: 16px; color: #475569; line-height: 1.6;">
                                            Explore our latest tutorials, projects, and insights to accelerate your development journey.
                                        </p>
                                        
                                        <!-- CTA Button -->
                                        <table role="presentation" cellspacing="0" cellpadding="0" border="0" align="center">
                                            <tr>
                                                <td>
                                                    <a href="https://codewithburhan.com/blog-tutorials-insights" 
                                                       style="display: inline-block; padding: 14px 32px; background: linear-gradient(135deg, #0ea5e9 0%, #3b82f6 100%); color: #ffffff; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 16px; text-align: center; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06); transition: all 0.2s ease;">
                                                        Explore Tutorials →
                                                    </a>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    
                    <!-- Footer -->
                    <tr>
                        <td style="padding: 30px; background-color: #f8fafc; border-top: 1px solid #e2e8f0;">
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                                <tr>
                                    <td align="center">
                                        <p style="margin: 0 0 15px 0; font-size: 14px; color: #64748b; line-height: 1.5;">
                                            This email was sent to you because you subscribed to our newsletter.<br>
                                            CDW Burhan | Web Development & Digital Solutions
                                        </p>
                                        
                                        <!-- Social Links -->
                                        <table role="presentation" cellspacing="0" cellpadding="0" border="0" align="center" style="margin: 15px 0;">
                                            <tr>
                                                <td style="padding: 0 8px;">
                                                    <a href="https://codewithburhan.com" style="color: #0ea5e9; text-decoration: none; font-size: 14px; font-weight: 500;">
                                                        Website
                                                    </a>
                                                </td>
                                                <td style="padding: 0 8px; color: #cbd5e1;">|</td>
                                                <td style="padding: 0 8px;">
                                                    <a href="https://linkedin.com/in/burhan-ahmed" style="color: #0ea5e9; text-decoration: none; font-size: 14px; font-weight: 500;">
                                                        LinkedIn
                                                    </a>
                                                </td>
                                                <td style="padding: 0 8px; color: #cbd5e1;">|</td>
                                                <td style="padding: 0 8px;">
                                                    <a href="https://github.com/burhan-ahmed" style="color: #0ea5e9; text-decoration: none; font-size: 14px; font-weight: 500;">
                                                        GitHub
                                                    </a>
                                                </td>
                                            </tr>
                                        </table>
                                        
                                        <p style="margin: 15px 0 0 0; font-size: 12px; color: #94a3b8;">
                                            📧 <a href="mailto:info@codewithburhan.com" style="color: #64748b; text-decoration: none;">info@codewithburhan.com</a> | 
                                            🔗 <a href="https://unsubscribe.codewithburhan.com" style="color: #64748b; text-decoration: none;">Unsubscribe</a>
                                        </p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    
                </table>
                
            </td>
        </tr>
    </table>

    <!-- Dark Mode Support -->
    <div style="display: none; max-height: 0; overflow: hidden;">
        <!-- Preheader text for email clients -->
        Welcome to CDW Burhan! Get ready for exclusive web development insights, tutorials, and career tips delivered straight to your inbox. 🚀
    </div>

</body>
</html>
  `.trim();
}

/**
 * Welcome Email Template - Plain Text Version
 */
export function tplWelcomeText(name?: string): string {
  const displayName = name || 'Developer';
  
  return `
Welcome to CDW Burhan! 🎉

Hey ${displayName}! 👋

Thank you for subscribing to CDW Burhan! You're now part of an exclusive community of developers who are passionate about creating amazing web experiences.

Here's what you can expect from our newsletter:

🚀 Latest web development tutorials and insights
💡 Exclusive project showcases and case studies  
🎯 Career tips and industry best practices
🔥 Early access to free resources and tools

Ready to Level Up? 🎯

Explore our latest tutorials, projects, and insights to accelerate your development journey.

Visit: https://codewithburhan.com/blog-tutorials-insights

---

This email was sent to you because you subscribed to our newsletter.
CDW Burhan | Web Development & Digital Solutions

Website: https://codewithburhan.com
LinkedIn: https://linkedin.com/in/burhan-ahmed
GitHub: https://github.com/burhan-ahmed

📧 info@codewithburhan.com | 🔗 Unsubscribe: https://unsubscribe.codewithburhan.com
  `.trim();
}

/**
 * Admin Notification Email Template - HTML Version
 * Clean, minimal design for internal notifications
 */
export function tplAdminHTML(email: string, options: TemplateOptions = {}): string {
  const timestamp = options.timestamp || new Date().toISOString();
  const source = options.source || 'website';
  const userAgent = options.userAgent || 'Not provided';
  
  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Newsletter Subscriber</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif; line-height: 1.6; color: #333; background-color: #f8fafc;">

    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #f8fafc;">
        <tr>
            <td align="center" style="padding: 20px;">
                
                <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="max-width: 500px; width: 100%; background-color: #ffffff; border-radius: 8px; border: 1px solid #e2e8f0; overflow: hidden;">
                    
                    <!-- Header -->
                    <tr>
                        <td style="background-color: #0ea5e9; padding: 20px; text-align: center;">
                            <h1 style="margin: 0; font-size: 20px; font-weight: 600; color: #ffffff;">
                                📬 New Newsletter Subscriber
                            </h1>
                        </td>
                    </tr>
                    
                    <!-- Content -->
                    <tr>
                        <td style="padding: 25px;">
                            <p style="margin: 0 0 20px 0; font-size: 16px; color: #334155;">
                                A new user has subscribed to the CDW Burhan newsletter:
                            </p>
                            
                            <!-- Subscriber Details Table -->
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="border: 1px solid #e2e8f0; border-radius: 6px; overflow: hidden;">
                                <tr style="background-color: #f8fafc;">
                                    <td style="padding: 12px 15px; font-weight: 600; color: #475569; border-bottom: 1px solid #e2e8f0; width: 30%;">
                                        Email
                                    </td>
                                    <td style="padding: 12px 15px; color: #1e293b; border-bottom: 1px solid #e2e8f0; font-family: monospace; word-break: break-all;">
                                        ${email}
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding: 12px 15px; font-weight: 600; color: #475569; border-bottom: 1px solid #e2e8f0;">
                                        Timestamp (UTC)
                                    </td>
                                    <td style="padding: 12px 15px; color: #1e293b; border-bottom: 1px solid #e2e8f0; font-family: monospace;">
                                        ${timestamp}
                                    </td>
                                </tr>
                                <tr style="background-color: #f8fafc;">
                                    <td style="padding: 12px 15px; font-weight: 600; color: #475569; border-bottom: 1px solid #e2e8f0;">
                                        Source
                                    </td>
                                    <td style="padding: 12px 15px; color: #1e293b; border-bottom: 1px solid #e2e8f0;">
                                        <span style="background-color: #dbeafe; color: #1e40af; padding: 4px 8px; border-radius: 4px; font-size: 12px; font-weight: 500; text-transform: uppercase;">
                                            ${source}
                                        </span>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding: 12px 15px; font-weight: 600; color: #475569;">
                                        User Agent
                                    </td>
                                    <td style="padding: 12px 15px; color: #64748b; font-size: 12px; font-family: monospace; word-break: break-word; line-height: 1.4;">
                                        ${userAgent}
                                    </td>
                                </tr>
                            </table>
                            
                            <!-- Quick Actions -->
                            <div style="margin-top: 25px; padding: 15px; background-color: #f1f5f9; border-radius: 6px; border-left: 4px solid #0ea5e9;">
                                <p style="margin: 0 0 10px 0; font-size: 14px; color: #475569; font-weight: 500;">
                                    📊 Quick Actions:
                                </p>
                                <p style="margin: 0; font-size: 14px; color: #64748b; line-height: 1.5;">
                                    • View in <a href="https://admin.codewithburhan.com/subscribers" style="color: #0ea5e9; text-decoration: none;">Admin Panel</a><br>
                                    • Check <a href="https://admin.codewithburhan.com/analytics" style="color: #0ea5e9; text-decoration: none;">Analytics Dashboard</a><br>
                                    • Send welcome email confirmation
                                </p>
                            </div>
                        </td>
                    </tr>
                    
                    <!-- Footer -->
                    <tr>
                        <td style="padding: 15px; background-color: #f8fafc; border-top: 1px solid #e2e8f0; text-align: center;">
                            <p style="margin: 0; font-size: 12px; color: #94a3b8;">
                                CDW Burhan Admin Notification | 
                                <a href="https://admin.codewithburhan.com" style="color: #64748b; text-decoration: none;">Admin Panel</a>
                            </p>
                        </td>
                    </tr>
                    
                </table>
                
            </td>
        </tr>
    </table>

</body>
</html>
  `.trim();
}

/**
 * Admin Notification Email Template - Plain Text Version
 */
export function tplAdminText(email: string, options: TemplateOptions = {}): string {
  const timestamp = options.timestamp || new Date().toISOString();
  const source = options.source || 'website';
  const userAgent = options.userAgent || 'Not provided';
  
  return `
📬 New Newsletter Subscriber - CDW Burhan

A new user has subscribed to the CDW Burhan newsletter:

SUBSCRIBER DETAILS:
====================
Email:           ${email}
Timestamp (UTC): ${timestamp}
Source:          ${source}
User Agent:      ${userAgent}

QUICK ACTIONS:
==============
• View in Admin Panel: https://admin.codewithburhan.com/subscribers
• Check Analytics: https://admin.codewithburhan.com/analytics
• Welcome email sent automatically

---
CDW Burhan Admin Notification
Admin Panel: https://admin.codewithburhan.com
  `.trim();
}

/**
 * Utility function to generate timestamp for templates
 */
export function generateTimestamp(): string {
  return new Date().toISOString();
}

/**
 * Utility function to extract user agent (for admin notifications)
 */
export function getUserAgent(request?: Request): string {
  if (!request) return 'Not provided';
  return request.headers.get('user-agent') || 'Not provided';
}
