import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';
// Email services temporarily disabled for development
// import { sendContactEmail } from '../../../services/emailSender';
import { notifyContactForm } from '../../../services/notificationService';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    projectType: '',
    budget: '',
    timeline: '',
    message: '',
    newsletter: false,
    urgency: 'normal'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const projectTypes = [
    { value: 'shopify-development', label: 'Shopify Store Development' },
    { value: 'wordpress-customization', label: 'WordPress Customization' },
    { value: 'ecommerce-consultation', label: 'E-commerce Consultation' },
    { value: 'technical-mentorship', label: 'Technical Mentorship' },
    { value: 'performance-optimization', label: 'Performance Optimization' },
    { value: 'maintenance-support', label: 'Maintenance & Support' },
    { value: 'other', label: 'Other (Please specify)' }
  ];

  const budgetRanges = [
    { value: 'under-5k', label: 'Under $5,000' },
    { value: '5k-15k', label: '$5,000 - $15,000' },
    { value: '15k-30k', label: '$15,000 - $30,000' },
    { value: '30k-50k', label: '$30,000 - $50,000' },
    { value: 'over-50k', label: 'Over $50,000' },
    { value: 'discuss', label: 'Let\'s discuss' }
  ];

  const timelineOptions = [
    { value: 'asap', label: 'ASAP (Rush project)' },
    { value: '1-month', label: 'Within 1 month' },
    { value: '2-3-months', label: '2-3 months' },
    { value: '3-6-months', label: '3-6 months' },
    { value: 'flexible', label: 'Flexible timeline' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    setIsSubmitting(true);
    try {
      // Email service temporarily disabled for development
      console.log('📧 Contact email would be sent:', {
        form: 'contact-main',
        to: 'cdwburhan@gmail.com',
        subject: `New inquiry from ${formData.name}`,
        ...formData,
      });

      // Send notification email to admin (async, don't block success)
      try {
        await notifyContactForm(formData);
        console.log('📧 Admin notification sent for contact form');
      } catch (notificationError) {
        console.error('⚠️ Failed to send admin notification (form still submitted):', notificationError);
        // Don't fail the form submission if notification fails
      }

      setSubmitStatus('success');
      setFormData({
        name: '', email: '', company: '', projectType: '', budget: '', timeline: '', message: '', newsletter: false, urgency: 'normal'
      });
    } catch (err) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-black via-gray-900 to-black">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            Start Your <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">Transformation</span>
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Tell me about your project and let's explore how we can bring your vision to life. Every great partnership starts with a conversation.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="relative group bg-gradient-to-br from-gray-900/60 via-gray-800/50 to-gray-900/60 border border-cyan-400/20 rounded-2xl p-6 sm:p-8 backdrop-blur-xl shadow-2xl shadow-cyan-500/5 hover:border-cyan-400/40 transition-all duration-300"
        >
          {/* Glow Effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          {submitStatus === 'success' ? (
            <div className="text-center py-12">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-500/20 rounded-full mb-6">
                <Icon name="CheckCircle" size={32} className="text-green-500" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-green-500">Message Sent Successfully!</h3>
              <p className="text-muted-foreground mb-6">
                Thank you for reaching out! I'll get back to you within 24-48 hours with a detailed response.
              </p>
              <Button 
                variant="outline" 
                onClick={() => setSubmitStatus(null)}
              >
                Send Another Message
              </Button>
            </div>
          ) : submitStatus === 'error' ? (
            <div className="text-center py-12">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-red-500/20 rounded-full mb-6">
                <Icon name="AlertTriangle" size={32} className="text-red-500" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-red-500">Something went wrong</h3>
              <p className="text-muted-foreground mb-6">Please try again later or email me directly at cdwburhan@gmail.com</p>
              <Button variant="outline" onClick={() => setSubmitStatus(null)}>Try Again</Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  label="Full Name"
                  type="text"
                  placeholder="Your full name"
                  value={formData?.name}
                  onChange={(e) => handleInputChange('name', e?.target?.value)}
                  required
                />
                
                <Input
                  label="Email Address"
                  type="email"
                  placeholder="your.email@company.com"
                  value={formData?.email}
                  onChange={(e) => handleInputChange('email', e?.target?.value)}
                  required
                />
              </div>

              <Input
                label="Company/Organization"
                type="text"
                placeholder="Your company name (optional)"
                value={formData?.company}
                onChange={(e) => handleInputChange('company', e?.target?.value)}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Select
                  label="Project Type"
                  placeholder="Select project type"
                  options={projectTypes}
                  value={formData?.projectType}
                  onChange={(value) => handleInputChange('projectType', value)}
                  required
                />

                <Select
                  label="Budget Range"
                  placeholder="Select budget range"
                  options={budgetRanges}
                  value={formData?.budget}
                  onChange={(value) => handleInputChange('budget', value)}
                  required
                />
              </div>

              <Select
                label="Timeline"
                placeholder="When do you need this completed?"
                options={timelineOptions}
                value={formData?.timeline}
                onChange={(value) => handleInputChange('timeline', value)}
                required
              />

              <div>
                <label className="block text-sm font-medium mb-2">
                  Project Details <span className="text-red-500">*</span>
                </label>
                <textarea
                  className="w-full h-32 px-4 py-3 bg-background border border-border rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent resize-none transition-smooth"
                  placeholder="Tell me about your project goals, current challenges, and what success looks like to you..."
                  value={formData?.message}
                  onChange={(e) => handleInputChange('message', e?.target?.value)}
                  required
                />
              </div>

              <div className="flex items-start space-x-3">
                <Checkbox
                  checked={formData?.newsletter}
                  onChange={(e) => handleInputChange('newsletter', e?.target?.checked)}
                />
                <div className="text-sm">
                  <label className="text-foreground">
                    Subscribe to my newsletter for development tips, industry insights, and free resources
                  </label>
                  <p className="text-muted-foreground mt-1">
                    Monthly emails with actionable advice. Unsubscribe anytime.
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-border">
                <Button
                  type="submit"
                  variant="default"
                  size="lg"
                  fullWidth
                  loading={isSubmitting}
                  iconName="Send"
                  iconPosition="right"
                  className="bg-gradient-to-r from-neon-blue to-neon-purple hover:shadow-neon"
                >
                  {isSubmitting ? 'Sending Message...' : 'Send Message'}
                </Button>
                
                <p className="text-xs text-muted-foreground text-center mt-4">
                  By submitting this form, you agree to receive communication from me regarding your project inquiry.
                </p>
              </div>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default ContactForm;