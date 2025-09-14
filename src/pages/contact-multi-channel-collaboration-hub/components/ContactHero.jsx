import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ContactHero = () => {
  const [activeFeature, setActiveFeature] = useState(0);

  // Auto-cycle through features
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature(prev => (prev + 1) % 3);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const contactFeatures = [
    {
      icon: 'Clock',
      title: '24-48h Response',
      description: 'Quick turnaround time',
      color: 'from-cyan-400 to-cyan-600',
      bgGlow: 'bg-cyan-500/20'
    },
    {
      icon: 'Globe',
      title: 'Global Support',
      description: 'Timezone flexibility',
      color: 'from-purple-400 to-purple-600',
      bgGlow: 'bg-purple-500/20'
    },
    {
      icon: 'Shield',
      title: '100% Confidential',
      description: 'Secure communication',
      color: 'from-cyan-500 to-purple-500',
      bgGlow: 'bg-cyan-500/20'
    }
  ];

  const contactStats = [
    {
      number: '100+',
      label: 'Happy Clients',
      icon: 'Users',
      color: 'from-cyan-400 to-cyan-600'
    },
    {
      number: '24/7',
      label: 'Support',
      icon: 'Headphones',
      color: 'from-purple-400 to-purple-600'
    },
    {
      number: '98%',
      label: 'Satisfaction',
      icon: 'Heart',
      color: 'from-cyan-500 to-purple-500'
    }
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 bg-gradient-to-br from-black via-gray-900 to-black">
      {/* Enhanced Background Pattern */}
      <div className="absolute inset-0">
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 25% 25%, rgba(34, 211, 238, 0.1) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(147, 51, 234, 0.1) 0%, transparent 50%)',
            backgroundSize: '400px 400px',
            animation: 'pulse 4s ease-in-out infinite alternate'
          }} />
      </div>
        
        {/* Animated Floating Orbs */}
        <motion.div
          className="absolute top-20 left-10 w-80 h-80 bg-cyan-500/8 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/8 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.6, 0.3, 0.6]
          }}
          transition={{ duration: 4, repeat: Infinity, delay: 2 }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-cyan-500/5 to-purple-500/5 rounded-full blur-3xl"
          animate={{
            rotate: [0, 360],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/10" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-20 items-center">
          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            {/* Premium Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ 
                opacity: 1, 
                y: 0,
                boxShadow: [
                  "0 0 0 0 rgba(34, 211, 238, 0.4)",
                  "0 0 20px 5px rgba(34, 211, 238, 0.1)",
                  "0 0 0 0 rgba(34, 211, 238, 0.4)"
                ]
              }}
              transition={{ 
                delay: 0.2,
                boxShadow: { duration: 2, repeat: Infinity, ease: "easeInOut" }
              }}
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-500/30 rounded-full mb-8 backdrop-blur-sm"
            >
              <Icon name="MessageSquare" size={20} className="text-cyan-400 mr-2" />
              <span className="text-cyan-300 font-semibold">Let's Connect & Create</span>
            </motion.div>

            {/* Main Heading */}
            <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 sm:mb-8 leading-tight sm:leading-[1.1]"
            >
              <span className="block text-white mb-3">
                Transform Your
              </span>
              <motion.span 
                className="block bg-gradient-to-r from-cyan-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent font-extrabold"
                animate={{
                  backgroundPosition: ['0%', '100%', '0%']
                }}
                transition={{ duration: 5, repeat: Infinity }}
                style={{ 
                  backgroundSize: '200% 200%',
                  filter: 'drop-shadow(0 0 20px rgba(34, 211, 238, 0.3))'
                }}
              >
                Vision Together
              </motion.span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="text-lg sm:text-xl text-gray-300 mb-10 max-w-2xl mx-auto lg:mx-0 leading-relaxed"
            >
              Ready to turn your digital dreams into reality? Whether you need a{' '}
              <span className="text-cyan-400 font-semibold">Shopify store</span>,{' '}
              <span className="text-purple-400 font-semibold">WordPress customization</span>, or{' '}
              <span className="text-cyan-300 font-semibold">strategic consultation</span>, I'm here to partner with you every step of the way.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start mb-8 sm:mb-12"
            >
              <Button
                size="lg"
                className="bg-gradient-to-r from-cyan-600 to-purple-600 text-white hover:from-cyan-500 hover:to-purple-500 shadow-lg hover:shadow-xl hover:shadow-cyan-500/25 transform hover:scale-105 transition-all duration-300 px-8 py-4 text-lg font-semibold border border-cyan-400/30"
                onClick={() => {
                  const contactForm = document.getElementById('contact-form');
                  if (contactForm) {
                    contactForm.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                <Icon name="Send" size={20} className="mr-3" />
                Get In Touch Now
              </Button>
              
              <Link to="/projects-showcase-gallery">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-cyan-600/50 text-cyan-300 hover:bg-cyan-900/20 hover:border-cyan-400 px-8 py-4 text-lg font-semibold backdrop-blur-sm"
                >
                  <Icon name="Eye" size={20} className="mr-3" />
                  View Success Stories
                </Button>
              </Link>
        </motion.div>

                        {/* Contact Features */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4"
            >
              {contactFeatures.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2 + index * 0.1, duration: 0.6 }}
                  className={`relative group p-4 rounded-xl border transition-all duration-300 backdrop-blur-sm ${
                    index === activeFeature
                      ? 'bg-cyan-500/10 border-cyan-500/30 text-cyan-400 shadow-lg shadow-cyan-500/10'
                      : 'bg-gray-800/50 border-gray-700/50 text-gray-400 hover:bg-cyan-500/5 hover:border-cyan-600/30'
                  }`}
                  whileHover={{ scale: 1.02, y: -2 }}
                >
                  {/* Glow Effect */}
                  <motion.div
                    className={`absolute inset-0 ${feature.bgGlow} rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                    animate={activeFeature === index ? { opacity: [0, 0.3, 0] } : {}}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  
                  <div className="relative">
                    <div className={`w-10 h-10 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center mx-auto lg:mx-0 mb-3`}>
                      <Icon name={feature.icon} size={20} className="text-white" />
                    </div>
                    
                    <h3 className="text-sm font-semibold mb-1">
                      {feature.title}
                    </h3>
                    <p className="text-xs opacity-80 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Contact Stats & Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="space-y-8"
          >
            {/* Contact Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
              {contactStats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-4 sm:p-6 text-center hover:bg-cyan-500/5 hover:border-cyan-600/30 transition-all duration-300"
                  whileHover={{ scale: 1.05, y: -5 }}
                >
                  <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-xl flex items-center justify-center mx-auto mb-4`}>
                    <Icon name={stat.icon} size={24} className="text-white" />
                  </div>
                  <div className="text-2xl font-bold text-white mb-1">{stat.number}</div>
                  <div className="text-sm text-gray-300">{stat.label}</div>
                </motion.div>
              ))}
            </div>

            {/* Contact Methods */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="bg-gradient-to-br from-gray-900/60 via-gray-800/50 to-gray-900/60 rounded-3xl p-8 border border-cyan-400/20 backdrop-blur-xl shadow-2xl shadow-cyan-500/5"
            >
              <h3 className="text-2xl font-bold text-white mb-6 text-center">
                <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                  Multiple Ways to Connect
                </span>
              </h3>
              
              <div className="space-y-4">
                <motion.div 
                  className="group flex items-center space-x-4 p-4 rounded-2xl bg-gradient-to-br from-cyan-500/10 to-transparent border border-cyan-400/20 backdrop-blur-sm hover:border-cyan-400/40 transition-all duration-300"
                  whileHover={{ scale: 1.02, x: 5 }}
                >
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500 to-cyan-600 flex items-center justify-center group-hover:shadow-lg group-hover:shadow-cyan-500/25 transition-all">
                    <Icon name="Mail" size={20} className="text-white" />
                  </div>
                  <div>
                    <div className="text-cyan-300 font-medium">Email</div>
                    <div className="text-gray-300 text-sm">contact@codewithburhan.com</div>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="group flex items-center space-x-4 p-4 rounded-2xl bg-gradient-to-br from-purple-500/10 to-transparent border border-purple-400/20 backdrop-blur-sm hover:border-purple-400/40 transition-all duration-300"
                  whileHover={{ scale: 1.02, x: 5 }}
                >
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center group-hover:shadow-lg group-hover:shadow-purple-500/25 transition-all">
                    <Icon name="Phone" size={20} className="text-white" />
                  </div>
                  <div>
                    <div className="text-purple-300 font-medium">Phone</div>
                    <div className="text-gray-300 text-sm">+923275380226</div>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="group flex items-center space-x-4 p-4 rounded-2xl bg-gradient-to-br from-cyan-500/10 to-purple-500/10 border border-gray-600/20 backdrop-blur-sm hover:border-cyan-400/30 transition-all duration-300"
                  whileHover={{ scale: 1.02, x: 5 }}
                >
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500 to-purple-500 flex items-center justify-center group-hover:shadow-lg group-hover:shadow-cyan-500/25 transition-all">
                    <Icon name="MapPin" size={20} className="text-white" />
          </div>
                  <div>
                    <div className="text-cyan-300 font-medium">Location</div>
                    <div className="text-gray-300 text-sm">Okara, Pakistan</div>
          </div>
                </motion.div>
          </div>
        </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactHero;