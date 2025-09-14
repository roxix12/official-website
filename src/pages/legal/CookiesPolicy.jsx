import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import ScrollProgressBar from '../../components/ui/ScrollProgressBar';
import Icon from '../../components/AppIcon';
import { motion } from 'framer-motion';
import Footer from '../../components/ui/Footer';

const CookiesPolicy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const cookieTypes = [
    {
      title: "Essential Cookies",
      icon: "Key",
      color: "green",
      required: true,
      description: "These cookies are necessary for the website to function and cannot be switched off.",
      examples: [
        "Session management and user authentication",
        "Security and fraud prevention",
        "Loading balancing and performance",
        "Remember your cookie preferences"
      ]
    },
    {
      title: "Analytics Cookies",
      icon: "BarChart3",
      color: "blue", 
      required: false,
      description: "These cookies help us understand how visitors interact with our website.",
      examples: [
        "Google Analytics for traffic analysis",
        "Page view tracking and user behavior",
        "Performance monitoring and optimization",
        "Error tracking and debugging"
      ]
    },
    {
      title: "Functional Cookies",
      icon: "Settings",
      color: "purple",
      required: false,
      description: "These cookies enhance functionality and personalization.",
      examples: [
        "Remember your preferences and settings",
        "Language and region preferences",
        "Chatbot conversation history",
        "Form auto-fill and saved data"
      ]
    },
    {
      title: "Marketing Cookies",
      icon: "Target",
      color: "orange",
      required: false,
      description: "These cookies are used to track visitors across websites for marketing purposes.",
      examples: [
        "Social media integration and sharing",
        "Remarketing and advertising campaigns",
        "Conversion tracking and attribution",
        "Third-party service integration"
      ]
    }
  ];

  const thirdPartyServices = [
    {
      name: "Google Analytics",
      purpose: "Website analytics and performance tracking",
      cookies: "_ga, _ga_*, _gid",
      retention: "Up to 2 years"
    },
    {
      name: "Calendly",
      purpose: "Appointment scheduling functionality",
      cookies: "calendly_session, _calendly_session",
      retention: "Session duration"
    },
    {
      name: "Supabase",
      purpose: "User authentication and data storage",
      cookies: "sb-access-token, sb-refresh-token",
      retention: "30 days"
    },
    {
      name: "Formspree",
      purpose: "Contact form submissions",
      cookies: "formspree_session",
      retention: "24 hours"
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Helmet>
        <title>Cookies Policy | Cdw Burhan - Digital Alchemist</title>
        <meta name="description" content="Learn about how we use cookies and similar technologies on our website to enhance your experience." />
      </Helmet>

      <Header />

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 bg-gradient-to-br from-amber-900/20 to-orange-900/20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center px-4 py-2 bg-white/10 border border-white/20 rounded-full text-amber-300 text-sm font-medium mb-6">
              <Icon name="Cookie" size={16} className="mr-2" />
              Cookie Information
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Cookies Policy</h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-6">
              Learn how we use cookies and similar technologies to enhance your browsing experience and improve our services.
            </p>
            <div className="text-sm text-gray-400">
              Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-6 py-16">
        <div className="space-y-16">
          
          {/* What Are Cookies */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-amber-600/20 flex items-center justify-center">
                <Icon name="Info" size={20} className="text-amber-400" />
              </div>
              <h2 className="text-2xl font-bold text-foreground">What Are Cookies?</h2>
            </div>
            <div className="bg-card border border-border rounded-lg p-6">
              <p className="text-muted-foreground leading-relaxed mb-4">
                Cookies are small text files that are stored on your device when you visit a website. They help websites 
                remember information about your visit, such as your preferred language, login status, and other settings 
                that can make your next visit easier and more personalized.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                We use cookies and similar technologies like local storage, session storage, and web beacons to enhance 
                your experience on our website, analyze how our site is used, and provide relevant content and services.
              </p>
            </div>
          </motion.section>

          {/* Types of Cookies */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-blue-600/20 flex items-center justify-center">
                <Icon name="Layers" size={20} className="text-blue-400" />
              </div>
              <h2 className="text-2xl font-bold text-foreground">Types of Cookies We Use</h2>
            </div>

            <div className="grid gap-6">
              {cookieTypes.map((type, index) => (
                <div key={index} className="bg-card border border-border rounded-lg p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className={`w-8 h-8 rounded-lg bg-${type.color}-600/20 flex items-center justify-center`}>
                        <Icon name={type.icon} size={16} className={`text-${type.color}-400`} />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-foreground">{type.title}</h3>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          type.required 
                            ? 'bg-red-500/20 text-red-300' 
                            : 'bg-green-500/20 text-green-300'
                        }`}>
                          {type.required ? 'Required' : 'Optional'}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-muted-foreground mb-4">{type.description}</p>
                  
                  <div>
                    <h4 className="text-sm font-medium text-foreground mb-2">Examples:</h4>
                    <ul className="space-y-1">
                      {type.examples.map((example, exIndex) => (
                        <li key={exIndex} className="flex items-center space-x-2 text-sm text-muted-foreground">
                          <Icon name="Check" size={14} className="text-green-400 flex-shrink-0" />
                          <span>{example}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </motion.section>

          {/* Third-Party Services */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-purple-600/20 flex items-center justify-center">
                <Icon name="ExternalLink" size={20} className="text-purple-400" />
              </div>
              <h2 className="text-2xl font-bold text-foreground">Third-Party Services</h2>
            </div>

            <div className="bg-card border border-border rounded-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-muted/50">
                    <tr>
                      <th className="text-left p-4 font-semibold text-foreground">Service</th>
                      <th className="text-left p-4 font-semibold text-foreground">Purpose</th>
                      <th className="text-left p-4 font-semibold text-foreground">Cookies</th>
                      <th className="text-left p-4 font-semibold text-foreground">Retention</th>
                    </tr>
                  </thead>
                  <tbody>
                    {thirdPartyServices.map((service, index) => (
                      <tr key={index} className="border-t border-border">
                        <td className="p-4 font-medium text-foreground">{service.name}</td>
                        <td className="p-4 text-muted-foreground">{service.purpose}</td>
                        <td className="p-4 text-muted-foreground font-mono text-xs">{service.cookies}</td>
                        <td className="p-4 text-muted-foreground">{service.retention}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.section>

          {/* Managing Cookies */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-green-600/20 flex items-center justify-center">
                <Icon name="Settings" size={20} className="text-green-400" />
              </div>
              <h2 className="text-2xl font-bold text-foreground">Managing Your Cookie Preferences</h2>
            </div>

            <div className="grid gap-6">
              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="text-lg font-semibold text-foreground mb-3">Browser Settings</h3>
                <p className="text-muted-foreground mb-4">
                  You can control cookies through your browser settings. Most browsers allow you to:
                </p>
                <ul className="space-y-2">
                  {[
                    "View which cookies are stored on your device",
                    "Delete cookies from your device",
                    "Block cookies from being stored",
                    "Set preferences for specific websites"
                  ].map((item, index) => (
                    <li key={index} className="flex items-center space-x-2 text-muted-foreground">
                      <Icon name="Check" size={14} className="text-green-400 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="text-lg font-semibold text-foreground mb-3">Our Cookie Consent</h3>
                <p className="text-muted-foreground mb-4">
                  When you first visit our website, you'll see a cookie consent banner. You can:
                </p>
                <ul className="space-y-2">
                  {[
                    "Accept all cookies for the full experience",
                    "Decline optional cookies (essential cookies will still be used)",
                    "Customize your preferences by cookie type",
                    "Change your preferences at any time"
                  ].map((item, index) => (
                    <li key={index} className="flex items-center space-x-2 text-muted-foreground">
                      <Icon name="Check" size={14} className="text-green-400 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.section>

          {/* Contact Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-amber-900/20 to-orange-900/20 rounded-2xl p-8 border border-amber-500/20"
          >
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-amber-600/20 flex items-center justify-center mx-auto mb-4">
                <Icon name="HelpCircle" size={24} className="text-amber-400" />
              </div>
              <h2 className="text-2xl font-bold text-foreground mb-4">Questions About Cookies?</h2>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                If you have any questions about our use of cookies or need help managing your preferences, 
                please don't hesitate to contact us.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => {
                    // This would trigger the cookie settings modal
                    alert('Cookie preferences panel would open here');
                  }}
                  className="inline-flex items-center px-6 py-3 bg-amber-600 text-white rounded-lg hover:bg-amber-500 transition-colors"
                >
                  <Icon name="Settings" size={16} className="mr-2" />
                  Cookie Preferences
                </button>
                <a
                  href="mailto:contact@codewithburhan.com"
                  className="inline-flex items-center px-6 py-3 border border-amber-400 text-amber-400 rounded-lg hover:bg-amber-400/10 transition-colors"
                >
                  <Icon name="Mail" size={16} className="mr-2" />
                  Contact Us
                </a>
              </div>
            </div>
          </motion.section>
        </div>
      </main>
      <Footer variant="minimal" />
    </div>
  );
};

export default CookiesPolicy;
