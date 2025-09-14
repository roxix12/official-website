import React from 'react';
import { motion } from 'framer-motion';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const CommunicationChannels = () => {
  const channels = [
    {
      name: 'Email',
      description: 'For detailed project discussions and formal inquiries',
      contact: 'contact@codewithburhan.com',
      responseTime: '24-48 hours',
      icon: 'Mail',
      color: 'text-blue-400',
      bgColor: 'bg-blue-400/20',
      action: 'mailto:contact@codewithburhan.com'
    },
    {
      name: 'LinkedIn',
      description: 'Professional networking and business connections',
      contact: '@codewithburhan',
      responseTime: '12-24 hours',
      icon: 'Linkedin',
      color: 'text-blue-600',
      bgColor: 'bg-blue-600/20',
      action: 'https://linkedin.com/in/cdwburhan'
    },
    {
      name: 'Twitter',
      description: 'Quick questions and community engagement',
      contact: '@codewithburhan',
      responseTime: '2-6 hours',
      icon: 'Twitter',
      color: 'text-sky-400',
      bgColor: 'bg-sky-400/20',
      action: 'https://twitter.com/cdwburhan'
    },
    {
      name: 'GitHub',
      description: 'Technical discussions and code collaboration',
      contact: 'github.com/cdwburhan',
      responseTime: '24-48 hours',
      icon: 'Github',
      color: 'text-gray-400',
      bgColor: 'bg-gray-400/20',
      action: 'https://github.com/cdwburhan'
    },
    {
      name: 'WhatsApp',
      description: 'Urgent matters for existing clients only',
      contact: '+92 327 538 0226',
      responseTime: '1-4 hours',
      icon: 'MessageCircle',
      color: 'text-green-400',
      bgColor: 'bg-green-400/20',
      action: 'https://wa.me/923275380226'
    },
    {
      name: 'Calendly',
      description: 'Direct consultation booking with calendar sync',
      contact: 'calendly.com/cdwburhan',
      responseTime: 'Instant booking',
      icon: 'Calendar',
      color: 'text-orange-400',
      bgColor: 'bg-orange-400/20',
      action: 'https://calendly.com/cdwburhan'
    }
  ];

  const emergencyContact = {
    title: 'Emergency Support',
    description: 'For existing clients experiencing critical issues',
    phone: '+92 327 538 0226',
    email: 'contact@codewithburhan.com',
    availability: '24/7 for active projects'
  };

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
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            Choose Your <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">Communication Style</span>
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Different channels for different needs. Pick the one that works best for your inquiry type and communication preference.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12">
          {channels?.map((channel, index) => (
            <motion.div
              key={channel?.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative group bg-gradient-to-br from-gray-900/60 via-gray-800/50 to-gray-900/60 border border-cyan-400/20 rounded-xl p-4 sm:p-6 backdrop-blur-xl shadow-2xl shadow-cyan-500/5 hover:border-cyan-400/40 transition-all duration-300"
            >
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative">
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 ${channel?.bgColor} rounded-lg flex items-center justify-center group-hover:scale-110 transition-all duration-300 shadow-lg`}>
                    <Icon name={channel?.icon} size={20} className={channel?.color} />
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-gray-400">Response Time</div>
                    <div className="text-sm font-medium text-white">{channel?.responseTime}</div>
                  </div>
                </div>

                <h3 className="text-xl font-bold mb-2 text-white">{channel?.name}</h3>
                <p className="text-gray-300 text-sm mb-4">{channel?.description}</p>
                
                <div className="mb-4">
                  <div className="text-sm font-medium text-cyan-400">{channel?.contact}</div>
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  fullWidth
                  iconName="ExternalLink"
                  iconPosition="right"
                  onClick={() => window.open(channel?.action, '_blank')}
                  className="border-cyan-400/50 text-cyan-300 hover:bg-cyan-500/10 hover:border-cyan-400 transition-all duration-300"
                >
                  Connect
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Emergency Contact */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
          className="relative group bg-gradient-to-br from-gray-900/60 via-gray-800/50 to-gray-900/60 border border-red-400/30 rounded-xl p-6 sm:p-8 text-center backdrop-blur-xl shadow-2xl shadow-red-500/5 hover:border-red-400/50 transition-all duration-300"
        >
          {/* Glow Effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-orange-500/10 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          <div className="relative">
            <motion.div 
              className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-red-500 to-red-600 rounded-full mb-4 shadow-lg shadow-red-500/25"
              whileHover={{ scale: 1.1, rotate: 10 }}
              transition={{ duration: 0.3 }}
            >
              <Icon name="AlertTriangle" size={24} className="text-white" />
            </motion.div>
            
            <h3 className="text-2xl font-bold mb-2">
              <span className="bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
                {emergencyContact?.title}
              </span>
            </h3>
            <p className="text-gray-300 mb-6">{emergencyContact?.description}</p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 max-w-md mx-auto">
              <Button
                variant="outline"
                iconName="Phone"
                iconPosition="left"
                onClick={() => window.open(`tel:${emergencyContact?.phone}`, '_self')}
                className="border-red-400/50 text-red-300 hover:bg-red-500/10 hover:border-red-400 transition-all duration-300"
              >
                {emergencyContact?.phone}
              </Button>
              
              <Button
                variant="outline"
                iconName="Mail"
                iconPosition="left"
                onClick={() => window.open(`mailto:${emergencyContact?.email}`, '_self')}
                className="border-red-400/50 text-red-300 hover:bg-red-500/10 hover:border-red-400 transition-all duration-300"
              >
                Emergency Email
              </Button>
            </div>
            
            <p className="text-xs text-gray-400 mt-4">
              {emergencyContact?.availability}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CommunicationChannels;