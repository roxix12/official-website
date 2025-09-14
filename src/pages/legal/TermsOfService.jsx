import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import ScrollProgressBar from '../../components/ui/ScrollProgressBar';
import Icon from '../../components/AppIcon';
import { motion } from 'framer-motion';
import Footer from '../../components/ui/Footer';

const TermsOfService = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const sections = [
    {
      title: "Service Description",
      icon: "Code",
      content: [
        {
          subtitle: "Development Services",
          text: "Cdw Burhan provides full-stack web development services including Shopify theme development, WordPress customization, React application development, and related digital solutions."
        },
        {
          subtitle: "Consulting & Support",
          text: "We offer technical consulting, project planning, performance optimization, and ongoing maintenance services for web applications and e-commerce platforms."
        },
        {
          subtitle: "Educational Content",
          text: "Our website provides free tutorials, resources, and educational content related to web development and digital marketing."
        }
      ]
    },
    {
      title: "User Responsibilities",
      icon: "UserCheck",
      content: [
        {
          subtitle: "Account Security",
          text: "You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account."
        },
        {
          subtitle: "Accurate Information",
          text: "You agree to provide accurate, current, and complete information when using our services and to update such information as necessary."
        },
        {
          subtitle: "Compliance",
          text: "You agree to use our services in compliance with all applicable laws, regulations, and these Terms of Service."
        },
        {
          subtitle: "Prohibited Use",
          text: "You may not use our services for any illegal, harmful, or abusive purposes, or in any way that could damage our reputation or services."
        }
      ]
    },
    {
      title: "Project Terms",
      icon: "FileContract",
      content: [
        {
          subtitle: "Project Scope",
          text: "All development projects will have a clearly defined scope, timeline, and deliverables outlined in a separate project agreement or proposal."
        },
        {
          subtitle: "Payment Terms",
          text: "Payment terms, including rates, milestones, and due dates, will be specified in individual project agreements. Late payments may result in project suspension."
        },
        {
          subtitle: "Revisions",
          text: "Project revisions beyond the agreed scope may incur additional charges. We aim to accommodate reasonable requests while maintaining project timelines."
        },
        {
          subtitle: "Client Materials",
          text: "Clients are responsible for providing necessary materials, content, and access required for project completion in a timely manner."
        }
      ]
    },
    {
      title: "Intellectual Property",
      icon: "Copyright",
      content: [
        {
          subtitle: "Ownership Rights",
          text: "Upon full payment, clients own the custom code and designs created specifically for their project, excluding any pre-existing frameworks, libraries, or third-party components."
        },
        {
          subtitle: "Portfolio Usage",
          text: "We reserve the right to showcase completed projects in our portfolio and marketing materials, unless otherwise agreed in writing."
        },
        {
          subtitle: "Third-Party Assets",
          text: "Any third-party plugins, themes, or assets used in projects remain the property of their respective owners and are subject to their licensing terms."
        }
      ]
    },
    {
      title: "Disclaimers & Limitations",
      icon: "AlertTriangle",
      content: [
        {
          subtitle: "Service Availability",
          text: "We strive to maintain high service availability but do not guarantee uninterrupted access to our website or services."
        },
        {
          subtitle: "Performance Results",
          text: "While we aim to deliver high-quality solutions, we cannot guarantee specific business results or performance metrics unless explicitly stated in writing."
        },
        {
          subtitle: "Third-Party Services",
          text: "We are not responsible for the performance, availability, or policies of third-party services, platforms, or plugins used in projects."
        },
        {
          subtitle: "Limitation of Liability",
          text: "Our liability is limited to the amount paid for the specific service. We are not liable for indirect, incidental, or consequential damages."
        }
      ]
    },
    {
      title: "Termination",
      icon: "XCircle",
      content: [
        {
          subtitle: "Project Termination",
          text: "Either party may terminate a project with written notice. Completed work and expenses incurred up to termination date remain billable."
        },
        {
          subtitle: "Service Suspension",
          text: "We reserve the right to suspend or terminate services for violation of these terms, non-payment, or other breach of agreement."
        },
        {
          subtitle: "Data Retention",
          text: "Project files and backups may be retained for a reasonable period after project completion for support purposes."
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Helmet>
        <title>Terms of Service | Cdw Burhan - Digital Alchemist</title>
        <meta name="description" content="Terms of Service for Cdw Burhan's development services. Understand your rights and responsibilities." />
      </Helmet>

      <Header />

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 bg-gradient-to-br from-purple-900/20 to-blue-900/20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center px-4 py-2 bg-white/10 border border-white/20 rounded-full text-purple-300 text-sm font-medium mb-6">
              <Icon name="FileContract" size={16} className="mr-2" />
              Legal Agreement
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Terms of Service</h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-6">
              These terms govern your use of our services and establish the framework for our professional relationship.
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
                <div className="w-10 h-10 rounded-lg bg-purple-600/20 flex items-center justify-center">
                  <Icon name={section.icon} size={20} className="text-purple-400" />
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

          {/* Agreement Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-purple-900/20 to-blue-900/20 rounded-2xl p-8 border border-purple-500/20"
          >
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-purple-600/20 flex items-center justify-center mx-auto mb-4">
                <Icon name="Handshake" size={24} className="text-purple-400" />
              </div>
              <h2 className="text-2xl font-bold text-foreground mb-4">Agreement to Terms</h2>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                By using our services, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service. 
                For questions about these terms or to discuss a project, please contact us.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/contact-multi-channel-collaboration-hub"
                  className="inline-flex items-center px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-500 transition-colors"
                >
                  <Icon name="MessageSquare" size={16} className="mr-2" />
                  Start a Project
                </Link>
                <a
                  href="mailto:contact@codewithburhan.com"
                  className="inline-flex items-center px-6 py-3 border border-purple-400 text-purple-400 rounded-lg hover:bg-purple-400/10 transition-colors"
                >
                  <Icon name="Mail" size={16} className="mr-2" />
                  Ask Questions
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

export default TermsOfService;
