import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const ServiceHero = () => {
  const [activeFeature, setActiveFeature] = useState(0);

  // Auto-rotate features every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature(prev => (prev + 1) % 4);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const features = [
    {
      icon: 'Zap',
      title: 'Premium UI/UX',
      description: 'Modern, elegant designs that convert',
      color: 'from-cyan-400 to-cyan-600',
      bgGlow: 'shadow-cyan-500/20'
    },
    {
      icon: 'Shield',
      title: 'Secure & Reliable',
      description: 'Enterprise-grade security standards',
      color: 'from-purple-400 to-purple-600',
      bgGlow: 'shadow-purple-500/20'
    },
    {
      icon: 'Gauge',
      title: 'Performance First',
      description: 'Optimized for speed and efficiency',
      color: 'from-cyan-500 to-purple-500',
      bgGlow: 'shadow-cyan-500/20'
    },
    {
      icon: 'Trophy',
      title: 'Results Driven',
      description: 'Proven track record of success',
      color: 'from-purple-500 to-cyan-500',
      bgGlow: 'shadow-purple-500/20'
    }
  ];

  const stats = [
    {
      number: '100+',
      label: 'Projects Delivered',
      icon: 'Briefcase',
      description: 'Delivered across 15+ industries',
      color: 'from-cyan-400 to-cyan-600',
      glowColor: 'shadow-cyan-500/30'
    },
    {
      number: '98%',
      label: 'Client Satisfaction',
      icon: 'Heart',
      description: 'Based on client feedback',
      color: 'from-purple-400 to-purple-600',
      glowColor: 'shadow-purple-500/30'
    },
    {
      number: '5+',
      label: 'Years Experience',
      icon: 'Star',
      description: 'Continuous learning & growth',
      color: 'from-cyan-500 to-purple-500',
      glowColor: 'shadow-cyan-500/30'
    },
    {
      number: 'Verified',
      label: 'Shopify Expert',
      icon: 'Shield',
      description: 'Official Shopify Partner',
      color: 'from-purple-500 to-cyan-500',
      glowColor: 'shadow-purple-500/30'
    }
  ];

  return (
    <section 
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 lg:pt-32 bg-gradient-to-br from-gray-900 via-black to-gray-900"
    >
      {/* Simple Clean Background */}
      <div className="absolute inset-0">
        {/* Subtle Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.8) 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }}
        />
        
        {/* Professional Animated Orbs */}
        <motion.div 
          className="absolute top-20 left-20 w-72 h-72 bg-cyan-500/8 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.8, 1, 0.8]
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute bottom-20 right-20 w-80 h-80 bg-purple-500/8 rounded-full blur-3xl"
          animate={{
            scale: [1.1, 1, 1.1],
            opacity: [1, 0.8, 1]
          }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-cyan-500/5 to-purple-500/5 rounded-full blur-3xl"
          animate={{
            rotate: [0, 360],
            scale: [1, 1.05, 1]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/10" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Clean Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            {/* Clean Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ 
                opacity: 1, 
                y: 0,
                boxShadow: [
                  "0 0 0 0 rgba(0, 212, 255, 0.4)",
                  "0 0 20px 5px rgba(0, 212, 255, 0.1)",
                  "0 0 0 0 rgba(0, 212, 255, 0.4)"
                ]
              }}
              transition={{ 
                delay: 0.2,
                boxShadow: { duration: 2, repeat: Infinity, ease: "easeInOut" }
              }}
              className="inline-flex items-center px-4 py-2 bg-cyan-500/10 border border-cyan-500/30 rounded-full text-cyan-400 text-sm font-medium mb-8 backdrop-blur-sm"
            >
              <Icon name="Sparkles" size={16} className="mr-2" />
              Your Vision, My Expertise, Our Success
            </motion.div>

            {/* Clean Main Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold mb-8 leading-[1.1]"
            >
              <span className="block text-white mb-3 antialiased">
                Transform Your
              </span>
              <motion.span 
                className="block bg-gradient-to-r from-cyan-400 via-purple-400 to-cyan-300 bg-clip-text text-transparent font-extrabold antialiased"
                style={{
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  filter: 'drop-shadow(0 0 20px rgba(0, 212, 255, 0.3))'
                }}
                animate={{
                  filter: [
                    'drop-shadow(0 0 20px rgba(0, 212, 255, 0.3))',
                    'drop-shadow(0 0 30px rgba(0, 212, 255, 0.5))',
                    'drop-shadow(0 0 20px rgba(0, 212, 255, 0.3))'
                  ]
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                Digital Presence
              </motion.span>
            </motion.h1>

            {/* Clean Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="text-lg sm:text-xl text-gray-300 mb-10 max-w-2xl mx-auto lg:mx-0 leading-relaxed antialiased"
            >
              Partner with me for{' '}
              <span className="text-cyan-400 font-semibold">
                fast, elegant solutions
              </span>
              {' '}in Shopify, WordPress & React that ship with confidence and drive real business results.
            </motion.p>

                        {/* Clean CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12"
            >
              <Link to="/contact-multi-channel-collaboration-hub">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-cyan-600 to-purple-600 text-white hover:from-cyan-500 hover:to-purple-500 shadow-lg hover:shadow-xl hover:shadow-cyan-500/25 transform hover:scale-105 transition-all duration-300 px-8 py-4 text-lg font-semibold border border-cyan-400/30"
                >
                  <Icon name="Rocket" size={20} className="mr-3" />
                  Book Free Discovery Call
                </Button>
              </Link>
              
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

            {/* Clean Feature Badges */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1, duration: 0.8 }}
              className="grid grid-cols-2 lg:grid-cols-4 gap-4"
            >
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.3 + index * 0.1, duration: 0.6 }}
                  className={`p-4 rounded-xl border transition-all duration-300 backdrop-blur-sm ${
                    index === activeFeature
                      ? 'bg-cyan-500/10 border-cyan-500/30 text-cyan-400 shadow-lg shadow-cyan-500/10'
                      : 'bg-gray-800/50 border-gray-700/50 text-gray-400 hover:bg-cyan-500/5 hover:border-cyan-600/30'
                  }`}
                  whileHover={{ scale: 1.02, y: -2 }}
                >
                  <div className={`w-10 h-10 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center mx-auto lg:mx-0 mb-3`}>
                    <Icon name={feature.icon} size={20} className="text-white" />
                  </div>
                  
                  <h3 className="text-sm font-semibold mb-1 antialiased">
                    {feature.title}
                  </h3>
                  <p className="text-xs opacity-80 leading-relaxed antialiased">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

                    {/* Clean Stats Grid */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="grid grid-cols-2 gap-6"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 text-center hover:bg-cyan-500/5 hover:border-cyan-600/30 transition-all duration-300"
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-xl flex items-center justify-center mx-auto mb-4`}>
                  <Icon name={stat.icon} size={24} className="text-white" />
                </div>
                <div className="text-2xl sm:text-3xl font-bold text-white mb-2">{stat.number}</div>
                <div className="text-sm font-semibold text-gray-300 mb-1">{stat.label}</div>
                <div className="text-xs text-gray-500">{stat.description}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ServiceHero;