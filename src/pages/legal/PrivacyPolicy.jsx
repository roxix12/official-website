import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import ScrollProgressBar from '../../components/ui/ScrollProgressBar';
import Icon from '../../components/AppIcon';
import { motion } from 'framer-motion';
import Footer from '../../components/ui/Footer';

const PrivacyPolicy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const sections = [
    {
      title: "Information We Collect",
      icon: "Database",
      content: [
        {
          subtitle: "Personal Information",
          text: "We collect information you provide directly to us, such as when you create an account, fill out a form, or contact us. This may include your name, email address, phone number, and project details."
        },
        {
          subtitle: "Usage Information", 
          text: "We automatically collect certain information about your device and how you interact with our website, including IP address, browser type, pages visited, and time spent on our site."
        },
        {
          subtitle: "Cookies and Tracking",
          text: "We use cookies and similar technologies to enhance your experience, analyze usage patterns, and provide personalized content. See our Cookie Policy for more details."
        }
      ]
    },
    {
      title: "How We Use Your Information",
      icon: "Settings",
      content: [
        {
          subtitle: "Service Provision",
          text: "To provide, maintain, and improve our services, process transactions, and communicate with you about your projects and our services."
        },
        {
          subtitle: "Communication",
          text: "To send you technical notices, updates, security alerts, and administrative messages, as well as marketing communications (with your consent)."
        },
        {
          subtitle: "Analytics and Improvement",
          text: "To analyze usage patterns, optimize our website performance, and develop new features and services."
        }
      ]
    },
    {
      title: "Information Sharing",
      icon: "Share",
      content: [
        {
          subtitle: "Service Providers",
          text: "We may share your information with trusted third-party service providers who assist us in operating our website and providing services to you."
        },
        {
          subtitle: "Legal Requirements",
          text: "We may disclose your information if required by law, legal process, or to protect our rights, property, or safety, or that of others."
        },
        {
          subtitle: "Business Transfers",
          text: "In the event of a merger, acquisition, or sale of assets, your information may be transferred as part of that transaction."
        }
      ]
    },
    {
      title: "Data Security",
      icon: "Shield",
      content: [
        {
          subtitle: "Protection Measures",
          text: "We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction."
        },
        {
          subtitle: "Data Retention",
          text: "We retain your information for as long as necessary to provide our services and fulfill the purposes outlined in this policy, unless a longer retention period is required by law."
        }
      ]
    },
    {
      title: "Your Rights",
      icon: "User",
      content: [
        {
          subtitle: "Access and Update",
          text: "You have the right to access, update, or delete your personal information. You can do this by contacting us or through your account settings."
        },
        {
          subtitle: "Marketing Communications",
          text: "You can opt out of marketing communications at any time by following the unsubscribe instructions in our emails or contacting us directly."
        },
        {
          subtitle: "Cookies",
          text: "You can control cookie settings through your browser preferences. Note that disabling cookies may affect website functionality."
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Helmet>
        <title>Privacy Policy | Cdw Burhan - Digital Alchemist</title>
        <meta name="description" content="Privacy Policy for Cdw Burhan's digital services. Learn how we collect, use, and protect your personal information." />
      </Helmet>

      <Header />

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 bg-gradient-to-br from-blue-900/20 to-purple-900/20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center px-4 py-2 bg-white/10 border border-white/20 rounded-full text-blue-300 text-sm font-medium mb-6">
              <Icon name="Shield" size={16} className="mr-2" />
              Legal Information
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Privacy Policy</h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-6">
              Your privacy is important to us. This policy explains how we collect, use, and protect your information.
            </p>
            <div className="text-sm text-gray-400">
              Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content Sections */}
      <main className="max-w-4xl mx-auto px-6 py-16">
        <div className="space-y-16">
          {sections.map((section, index) => (
            <motion.section
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-blue-600/20 flex items-center justify-center">
                  <Icon name={section.icon} size={20} className="text-blue-400" />
                </div>
                <h2 className="text-2xl font-bold text-foreground">{section.title}</h2>
              </div>

              <div className="space-y-6">
                {section.content.map((item, itemIndex) => (
                  <div key={itemIndex} className="bg-card border border-border rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-foreground mb-3">{item.subtitle}</h3>
                    <p className="text-muted-foreground leading-relaxed">{item.text}</p>
                  </div>
                ))}
              </div>
            </motion.section>
          ))}

          {/* Contact Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 rounded-2xl p-8 border border-blue-500/20"
          >
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-blue-600/20 flex items-center justify-center mx-auto mb-4">
                <Icon name="MessageCircle" size={24} className="text-blue-400" />
              </div>
              <h2 className="text-2xl font-bold text-foreground mb-4">Questions About Privacy?</h2>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                If you have any questions about this Privacy Policy or how we handle your personal information, 
                please don't hesitate to contact us.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="mailto:contact@codewithburhan.com"
                  className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors"
                >
                  <Icon name="Mail" size={16} className="mr-2" />
                  Email Us
                </a>
                <Link
                  to="/contact-multi-channel-collaboration-hub"
                  className="inline-flex items-center px-6 py-3 border border-blue-400 text-blue-400 rounded-lg hover:bg-blue-400/10 transition-colors"
                >
                  <Icon name="MessageSquare" size={16} className="mr-2" />
                  Contact Form
                </Link>
              </div>
            </div>
          </motion.section>
        </div>
      </main>
      <Footer variant="minimal" />
    </div>
  );
};

export default PrivacyPolicy;
