import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const TrustSignals = () => {
  const credentials = [
    {
      title: 'Shopify Verified Expert',
      description: 'Official Shopify Partner with verified expertise in e-commerce development',
      icon: 'Award',
      color: 'text-green-400',
      bgColor: 'bg-green-400/20',
      verification: 'Partner ID: #SP2024-1847'
    },
    {
      title: 'Business Registration',
      description: 'Legally registered business entity with proper licensing and insurance',
      icon: 'Building',
      color: 'text-blue-400',
      bgColor: 'bg-blue-400/20',
      verification: 'LLC Registration: #BZ-2023-4521'
    },
    {
      title: 'SSL & Security Certified',
      description: 'All communications and data handling meet industry security standards',
      icon: 'Shield',
      color: 'text-purple-400',
      bgColor: 'bg-purple-400/20',
      verification: 'ISO 27001 Compliant'
    },
    {
      title: 'Professional Insurance',
      description: 'Comprehensive liability and errors & omissions insurance coverage',
      icon: 'Umbrella',
      color: 'text-orange-400',
      bgColor: 'bg-orange-400/20',
      verification: 'Coverage: $2M Liability'
    }
  ];

  const contactInfo = {
    business: {
      name: 'Code With Burhan',
      address: 'Okara, Pakistan',
      phone: '+92 327 538 0226',
      email: 'contact@codewithburhan.com',
      hours: 'Monday - Friday: 9:00 AM - 6:00 PM PST\nWeekends: Emergency support only'
    },
    response: {
      email: '24-48 hours',
      consultation: 'Same day booking available',
      emergency: '1-4 hours for existing clients',
      social: '2-6 hours on business days'
    }
  };

  const platforms = [
    {
      name: 'GitHub',
      handle: '@codewithburhan',
      followers: '2.3K',
      icon: 'Github',
      color: 'text-gray-400'
    },
    {
      name: 'LinkedIn',
      handle: '@codewithburhan',
      connections: '5.8K',
      icon: 'Linkedin',
      color: 'text-blue-600'
    },
    {
      name: 'Twitter',
      handle: '@codewithburhan',
      followers: '1.9K',
      icon: 'Twitter',
      color: 'text-sky-400'
    }
  ];

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-black via-gray-900 to-black">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Verified <span className="gradient-text">Trust & Credentials</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Your project deserves a partner you can trust. Here are the credentials, certifications, and contact details that ensure professional accountability.
          </p>
        </motion.div>

        {/* Credentials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {credentials?.map((credential, index) => (
            <motion.div
              key={credential?.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-card border border-border rounded-xl p-6 text-center hover:border-accent/50 transition-smooth"
            >
              <div className={`inline-flex items-center justify-center w-16 h-16 ${credential?.bgColor} rounded-full mb-4`}>
                <Icon name={credential?.icon} size={24} className={credential?.color} />
              </div>
              
              <h3 className="font-bold mb-2">{credential?.title}</h3>
              <p className="text-sm text-muted-foreground mb-3">{credential?.description}</p>
              <div className="text-xs font-mono text-accent">{credential?.verification}</div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Business Information */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="relative group bg-gradient-to-br from-gray-900/60 via-gray-800/50 to-gray-900/60 border border-cyan-400/20 rounded-xl p-8 backdrop-blur-xl shadow-2xl shadow-cyan-500/5 hover:border-cyan-400/40 transition-all duration-300"
          >
            {/* Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="relative">
              <h3 className="text-2xl font-bold mb-6 flex items-center">
                <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-cyan-600 rounded-xl flex items-center justify-center mr-3">
                  <Icon name="Building2" size={20} className="text-white" />
                </div>
                <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                  Business Information
                </span>
              </h3>
            </div>
            
            <div className="relative space-y-6">
              <div>
                <h4 className="font-semibold mb-2 text-white">Legal Business Name</h4>
                <p className="text-gray-300">{contactInfo?.business?.name}</p>
              </div>
              
              <div>
                <h4 className="font-semibold mb-2 text-white">Business Address</h4>
                <p className="text-gray-300 whitespace-pre-line">{contactInfo?.business?.address}</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold mb-2 text-white">Phone</h4>
                  <p className="text-gray-300">{contactInfo?.business?.phone}</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2 text-white">Email</h4>
                  <p className="text-gray-300">{contactInfo?.business?.email}</p>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold mb-2 text-white">Business Hours</h4>
                <p className="text-gray-300 whitespace-pre-line">{contactInfo?.business?.hours}</p>
              </div>
            </div>
          </motion.div>

          {/* Response Times & Social Proof */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {/* Response Time Commitments */}
            <div className="relative group bg-gradient-to-br from-gray-900/60 via-gray-800/50 to-gray-900/60 border border-purple-400/20 rounded-xl p-8 backdrop-blur-xl shadow-2xl shadow-purple-500/5 hover:border-purple-400/40 transition-all duration-300">
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-cyan-500/10 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative">
                <h3 className="text-2xl font-bold mb-6 flex items-center">
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mr-3">
                    <Icon name="Clock" size={20} className="text-white" />
                  </div>
                  <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                    Response Time Commitments
                  </span>
                </h3>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-2 border-b border-gray-700/50">
                    <span className="text-gray-300">Email Inquiries</span>
                    <span className="font-medium text-white">{contactInfo?.response?.email}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-700/50">
                    <span className="text-gray-300">Consultation Booking</span>
                    <span className="font-medium text-white">{contactInfo?.response?.consultation}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-700/50">
                    <span className="text-gray-300">Emergency Support</span>
                    <span className="font-medium text-white">{contactInfo?.response?.emergency}</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-gray-300">Social Media</span>
                    <span className="font-medium text-white">{contactInfo?.response?.social}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Proof */}
            <div className="relative group bg-gradient-to-br from-gray-900/60 via-gray-800/50 to-gray-900/60 border border-cyan-400/20 rounded-xl p-8 backdrop-blur-xl shadow-2xl shadow-cyan-500/5 hover:border-cyan-400/40 transition-all duration-300">
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative">
                <h3 className="text-2xl font-bold mb-6 flex items-center">
                  <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-xl flex items-center justify-center mr-3">
                    <Icon name="Users" size={20} className="text-white" />
                  </div>
                  <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                    Community Presence
                  </span>
                </h3>
                
                <div className="space-y-4">
                  {platforms?.map((platform, index) => (
                    <div key={platform?.name} className="flex items-center justify-between py-2">
                      <div className="flex items-center space-x-3">
                        <Icon name={platform?.icon} size={20} className={platform?.color} />
                        <div>
                          <div className="font-medium text-white">{platform?.name}</div>
                          <div className="text-sm text-gray-300">{platform?.handle}</div>
                        </div>
                      </div>
                      <div className="text-sm font-medium text-cyan-300">
                        {platform?.followers || platform?.connections}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Security Notice */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
          className="relative group mt-12 bg-gradient-to-br from-gray-900/60 via-gray-800/50 to-gray-900/60 border border-green-400/30 rounded-xl p-8 text-center backdrop-blur-xl shadow-2xl shadow-green-500/5 hover:border-green-400/50 transition-all duration-300"
        >
          {/* Glow Effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-cyan-500/10 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          <div className="relative">
            <motion.div 
              className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-full mb-6 shadow-lg shadow-green-500/25"
              whileHover={{ scale: 1.1, rotate: 360 }}
              transition={{ duration: 0.8 }}
            >
              <Icon name="ShieldCheck" size={24} className="text-white" />
            </motion.div>
            
            <h4 className="text-2xl font-bold mb-4">
              <span className="bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent">
                Your Information is Secure
              </span>
            </h4>
            <p className="text-gray-300 text-lg max-w-3xl mx-auto leading-relaxed">
              All communications are encrypted, project details are kept confidential under NDA, and your data is never shared with third parties. 
              <span className="text-green-400 font-semibold"> I take privacy and security seriously</span> in every aspect of our collaboration.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TrustSignals;