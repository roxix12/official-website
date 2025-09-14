// Enhanced notification service for real-time email alerts
// Integrates with Formspree and supports multiple notification types

const FORMSPREE_ENDPOINT = import.meta?.env?.VITE_FORMSPREE_ENDPOINT || 'https://formspree.io/f/movlynbp';
const ADMIN_EMAIL = 'cdwburhan@gmail.com'; // Your admin email

// Email templates for different notification types
const EMAIL_TEMPLATES = {
  NEW_COMMENT: {
    subject: '💬 New Comment on Your Blog Post',
    template: (data) => `
🎉 You have a new comment on your blog post!

📝 Post: ${data.postTitle}
👤 Commenter: ${data.name} (${data.email})
💬 Comment: ${data.content}

${data.isReply ? `↳ This is a reply to: "${data.parentComment}"` : ''}

🔗 View post: ${data.postUrl}
⚙️ Manage comments: ${data.adminUrl}/comments

---
Sent from CDW Burhan Portfolio Notification System
    `.trim()
  },

  CONTACT_FORM: {
    subject: '📧 New Contact Form Submission',
    template: (data) => `
🎯 New contact form submission received!

👤 Name: ${data.name}
📧 Email: ${data.email}
🏢 Company: ${data.company || 'Not specified'}
💼 Project Type: ${data.projectType || 'Not specified'}
💰 Budget: ${data.budget || 'Not specified'}
⏰ Timeline: ${data.timeline || 'Not specified'}
🚨 Urgency: ${data.urgency || 'Normal'}

📝 Message:
${data.message}

---
Sent from CDW Burhan Portfolio Contact Form
    `.trim()
  },

  CONSULTATION_BOOKING: {
    subject: '📅 New Consultation Booking Request',
    template: (data) => `
🎯 New consultation booking request!

👤 Name: ${data.name}
📧 Email: ${data.email}
🏢 Company: ${data.company || 'Not specified'}
📞 Phone: ${data.phone || 'Not specified'}
🎯 Service: ${data.service}
⏰ Preferred Time: ${data.time}
💰 Budget: ${data.budget || 'Not specified'}
📅 Timeline: ${data.timeline || 'Not specified'}

📋 Project Details:
${data.projectDetails}

---
Sent from CDW Burhan Portfolio Consultation System
    `.trim()
  },

  PROJECT_INQUIRY: {
    subject: '🚀 New Project Inquiry',
    template: (data) => `
🎯 New project inquiry received!

👤 Name: ${data.name}
📧 Email: ${data.email}
🏢 Company: ${data.company || 'Not specified'}
💼 Service: ${data.service}
💰 Budget: ${data.budget || 'Not specified'}
⏰ Timeline: ${data.timeline || 'Not specified'}

📝 Details:
${data.details}

---
Sent from CDW Burhan Portfolio
    `.trim()
  }
};

// Get admin notification preferences from localStorage or defaults
const getNotificationPreferences = () => {
  try {
    const prefs = localStorage.getItem('admin_notification_preferences');
    return prefs ? JSON.parse(prefs) : {
      emailUpdates: true,
      blogComments: true,
      contactForms: true,
      consultationBookings: true,
      projectInquiries: true,
      weeklyDigest: true
    };
  } catch (error) {
    console.error('Error loading notification preferences:', error);
    return {
      emailUpdates: true,
      blogComments: true,
      contactForms: true,
      consultationBookings: true,
      projectInquiries: true,
      weeklyDigest: true
    };
  }
};

// Save notification preferences
export const saveNotificationPreferences = (preferences) => {
  try {
    localStorage.setItem('admin_notification_preferences', JSON.stringify(preferences));
    return true;
  } catch (error) {
    console.error('Error saving notification preferences:', error);
    return false;
  }
};

// Send notification email
const sendNotificationEmail = async (type, data) => {
  // For the main site, always send notifications (preferences are managed in admin panel)
  // Only skip if explicitly disabled via URL parameter or environment variable
  const forceDisable = new URLSearchParams(window.location.search).get('disable_notifications') === 'true';
  
  if (forceDisable) {
    console.log(`Notifications disabled via URL parameter`);
    return { success: true, skipped: true };
  }

  if (!FORMSPREE_ENDPOINT) {
    throw new Error('Missing email endpoint. Please set VITE_FORMSPREE_ENDPOINT');
  }

  const template = EMAIL_TEMPLATES[type];
  if (!template) {
    throw new Error(`Unknown notification type: ${type}`);
  }

  const emailPayload = {
    to: ADMIN_EMAIL,
    subject: template.subject,
    message: template.template(data),
    _replyto: data.email || ADMIN_EMAIL,
    _subject: template.subject,
    notification_type: type,
    timestamp: new Date().toISOString(),
    ...data
  };

  console.log('📧 Sending notification email:', { type, subject: template.subject });
  console.log('📧 Email payload:', emailPayload);
  console.log('📧 Using endpoint:', FORMSPREE_ENDPOINT);

  try {
    const response = await fetch(FORMSPREE_ENDPOINT, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(emailPayload),
    });

    console.log('📧 Response status:', response.status, response.statusText);

    if (!response.ok) {
      const errorText = await response.text().catch(() => '');
      console.error('📧 Response error:', errorText);
      throw new Error(errorText || `HTTP ${response.status}: Failed to send notification`);
    }

    const responseData = await response.json().catch(() => ({}));
    console.log('📧 Response data:', responseData);
    console.log('✅ Notification email sent successfully');
    return { success: true };
  } catch (error) {
    console.error('❌ Failed to send notification email:', error);
    throw error;
  }
};

// Notification functions for different events
export const notifyNewComment = async (commentData) => {
  try {
    console.log('🔔 notifyNewComment called with data:', commentData);
    
    const data = {
      name: commentData.name,
      email: commentData.email,
      content: commentData.content,
      postTitle: commentData.postTitle || 'Blog Post',
      postUrl: commentData.postUrl || window.location.origin,
      adminUrl: window.location.origin.includes('localhost') 
        ? 'http://localhost:3002' 
        : 'https://admin.codewithburhan.com',
      isReply: !!commentData.parentId,
      parentComment: commentData.parentComment || ''
    };

    console.log('📧 Sending comment notification email with processed data:', data);
    const result = await sendNotificationEmail('NEW_COMMENT', data);
    console.log('✅ Comment notification result:', result);
    
    return result;
  } catch (error) {
    console.error('❌ Failed to send comment notification:', error);
    throw error;
  }
};

export const notifyContactForm = async (formData) => {
  try {
    return await sendNotificationEmail('CONTACT_FORM', formData);
  } catch (error) {
    console.error('Failed to send contact form notification:', error);
    throw error;
  }
};

export const notifyConsultationBooking = async (bookingData) => {
  try {
    return await sendNotificationEmail('CONSULTATION_BOOKING', bookingData);
  } catch (error) {
    console.error('Failed to send consultation booking notification:', error);
    throw error;
  }
};

export const notifyProjectInquiry = async (inquiryData) => {
  try {
    return await sendNotificationEmail('PROJECT_INQUIRY', inquiryData);
  } catch (error) {
    console.error('Failed to send project inquiry notification:', error);
    throw error;
  }
};

// Test notification function
export const sendTestNotification = async () => {
  try {
    const testData = {
      name: 'Test User',
      email: 'test@example.com',
      content: 'This is a test comment to verify the notification system is working properly.',
      postTitle: 'Test Blog Post',
      postUrl: window.location.origin,
      adminUrl: window.location.origin.includes('localhost') 
        ? 'http://localhost:3002' 
        : 'https://admin.codewithburhan.com',
      isReply: false
    };

    return await sendNotificationEmail('NEW_COMMENT', testData);
  } catch (error) {
    console.error('Failed to send test notification:', error);
    throw error;
  }
};

// Get notification preferences for export
export { getNotificationPreferences };
