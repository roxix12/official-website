import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const TrustSignals = () => {
  const [activeStatIndex, setActiveStatIndex] = useState(0);
  const [visibleCerts, setVisibleCerts] = useState(new Set());

  // Auto-cycle through stats
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStatIndex(prev => (prev + 1) % 4);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Animate certifications in sequence
  useEffect(() => {
    const timer = setTimeout(() => {
      certifications.forEach((_, index) => {
        setTimeout(() => {
          setVisibleCerts(prev => new Set([...prev, index]));
        }, index * 200);
      });
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const trustStats = [
    {
      number: '100+',
      label: 'Projects Delivered',
      icon: 'Briefcase',
      description: 'Successfully completed across various industries',
      color: 'from-blue-500 to-cyan-500',
      bgGlow: 'bg-blue-500/20'
    },
    {
      number: '98%',
      label: 'Client Satisfaction',
      icon: 'Heart',
      description: 'Based on post-project feedback and reviews',
      color: 'from-red-500 to-pink-500',
      bgGlow: 'bg-red-500/20'
    },
    {
      number: '5+',
      label: 'Years Experience',
      icon: 'Star',
      description: 'Continuous learning and professional growth',
      color: 'from-yellow-500 to-orange-500',
      bgGlow: 'bg-yellow-500/20'
    },
    {
      number: '24/7',
      label: 'Support Available',
      icon: 'Clock',
      description: 'Dedicated support during project timeline',
      color: 'from-green-500 to-emerald-500',
      bgGlow: 'bg-green-500/20'
    }
  ];

  const certifications = [
    {
      name: 'Shopify Expert',
      issuer: 'Shopify',
      icon: 'ShoppingBag',
      status: 'Verified',
      color: 'from-green-500 to-emerald-600',
      badge: '⭐',
      year: '2023'
    },
    {
      name: 'React Developer',
      issuer: 'Meta',
      icon: 'Code',
      status: 'Certified',
      color: 'from-blue-500 to-cyan-600',
      badge: '🏆',
      year: '2024'
    },
    {
      name: 'Web Performance',
      issuer: 'Google',
      icon: 'Gauge',
      status: 'Certified',
      color: 'from-yellow-500 to-orange-600',
      badge: '🚀',
      year: '2024'
    },
    {
      name: 'WordPress Expert',
      issuer: 'WordPress',
      icon: 'Globe',
      status: 'Certified',
      color: 'from-purple-500 to-pink-600',
      badge: '💎',
      year: '2023'
    }
  ];

  const guarantees = [
    {
      title: '100% Money-Back Guarantee',
      description: 'If you\'re not completely satisfied with the final result, get your money back.',
      icon: 'Shield',
      color: 'text-green-400',
      bgColor: 'bg-green-500/10',
      borderColor: 'border-green-500/30'
    },
    {
      title: 'On-Time Delivery Promise',
      description: 'Your project will be delivered on schedule, or you get a discount on the next one.',
      icon: 'Clock',
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/10',
      borderColor: 'border-blue-500/30'
    },
    {
      title: 'Unlimited Revisions',
      description: 'We\'ll keep refining until you\'re 100% happy with the result.',
      icon: 'RefreshCw',
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/10',
      borderColor: 'border-purple-500/30'
    },
    {
      title: 'Post-Launch Support',
      description: 'Free support and maintenance for 30-90 days after project completion.',
      icon: 'Users',
      color: 'text-orange-400',
      bgColor: 'bg-orange-500/10',
      borderColor: 'border-orange-500/30'
    }
  ];

  return (
    <section className="relative py-24 bg-gradient-to-br from-black via-gray-900 to-black overflow-hidden">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 25% 25%, rgba(59, 130, 246, 0.1) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(147, 51, 234, 0.1) 0%, transparent 50%)',
            backgroundSize: '400px 400px',
            animation: 'pulse 4s ease-in-out infinite alternate'
          }} />
        </div>
        
        {/* Floating Orbs */}
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.6, 0.3, 0.6]
          }}
          transition={{ duration: 4, repeat: Infinity, delay: 2 }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Enhanced Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <motion.div
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 rounded-full mb-8"
            whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(59, 130, 246, 0.4)" }}
          >
            <Icon name="Award" size={20} className="text-blue-400 mr-2" />
            <span className="text-blue-300 font-semibold">Trusted Excellence</span>
          </motion.div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-8">
            <span className="text-white">Trusted by</span>
            <br />
            <motion.span
              className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent"
              animate={{
                backgroundPosition: ['0%', '100%', '0%']
              }}
              transition={{ duration: 5, repeat: Infinity }}
              style={{ backgroundSize: '200% 200%' }}
            >
              Businesses Worldwide
            </motion.span>
          </h2>
          
          <motion.p
            className="text-xl sm:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            viewport={{ once: true }}
          >
            Built on transparency, delivered with excellence. Here's why clients choose to work with me.
          </motion.p>
        </motion.div>

        {/* Enhanced Trust Statistics */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-24"
        >
          {trustStats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: index * 0.15, duration: 0.6 }}
              viewport={{ once: true }}
              className={`relative group`}
            >
              {/* Glow Effect */}
              <motion.div
                className={`absolute inset-0 ${stat.bgGlow} rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                animate={activeStatIndex === index ? { opacity: [0, 0.5, 0] } : {}}
                transition={{ duration: 2, repeat: Infinity }}
              />
              
              <motion.div
                className={`relative text-center p-8 bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-3xl transition-all duration-500 ${
                  activeStatIndex === index ? 'border-blue-500/50 bg-gray-800/70' : 'hover:border-gray-700/70 hover:bg-gray-800/60'
                }`}
                whileHover={{ scale: 1.05, y: -10 }}
                animate={activeStatIndex === index ? { scale: [1, 1.02, 1] } : {}}
                transition={{ duration: 0.6 }}
              >
                <motion.div
                  className={`w-20 h-20 bg-gradient-to-r ${stat.color} rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-2xl`}
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.8 }}
                  animate={activeStatIndex === index ? { 
                    boxShadow: [
                      "0 0 20px rgba(59, 130, 246, 0.4)",
                      "0 0 40px rgba(59, 130, 246, 0.6)",
                      "0 0 20px rgba(59, 130, 246, 0.4)"
                    ]
                  } : {}}
                >
                  <Icon name={stat.icon} size={32} className="text-white" />
                </motion.div>
                
                <motion.div
                  className="text-4xl font-bold text-white mb-3"
                  animate={activeStatIndex === index ? { scale: [1, 1.1, 1] } : {}}
                  transition={{ duration: 1 }}
                >
                  {stat.number}
                </motion.div>
                
                <div className="text-lg font-semibold text-gray-300 mb-3">{stat.label}</div>
                <div className="text-sm text-gray-400 leading-relaxed">{stat.description}</div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Enhanced Certifications */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          viewport={{ once: true }}
          className="mb-24"
        >
          <h3 className="text-3xl font-bold text-white text-center mb-4">
            Professional <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">Certifications</span>
          </h3>
          <p className="text-gray-400 text-center mb-12">Verified expertise from industry leaders</p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {certifications.map((cert, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30, rotateY: -90 }}
                animate={visibleCerts.has(index) ? { opacity: 1, y: 0, rotateY: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="relative group"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <motion.div
                  className={`relative text-center p-8 bg-gray-900/50 border border-gray-800 rounded-2xl transition-all duration-500 hover:border-gray-700 backdrop-blur-sm`}
                  whileHover={{ 
                    scale: 1.05, 
                    rotateY: 10,
                    boxShadow: "0 20px 40px rgba(0,0,0,0.3)"
                  }}
                >
                  {/* Badge */}
                  <div className="absolute -top-3 -right-3 text-2xl bg-gray-800 rounded-full w-12 h-12 flex items-center justify-center border-2 border-gray-700">
                    {cert.badge}
                  </div>
                  
                  {/* Year Badge */}
                  <div className="absolute top-4 left-4 bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-300 text-xs font-bold px-2 py-1 rounded-full border border-blue-500/30">
                    {cert.year}
                  </div>

                  <motion.div
                    className={`w-20 h-20 bg-gradient-to-r ${cert.color} rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl`}
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 1 }}
                  >
                    <Icon name={cert.icon} size={32} className="text-white" />
                  </motion.div>
                  
                  <h4 className="text-xl font-bold text-white mb-2">{cert.name}</h4>
                  <p className="text-gray-400 text-sm mb-4">by {cert.issuer}</p>
                  
                  <motion.span
                    className="inline-block px-4 py-2 bg-green-500/20 text-green-400 text-sm font-bold rounded-full border border-green-500/30"
                    whileHover={{ scale: 1.1 }}
                  >
                    ✓ {cert.status}
                  </motion.span>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Enhanced Guarantees */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h3 className="text-3xl font-bold text-white text-center mb-4">
            My <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">Guarantee</span> to You
          </h3>
          <p className="text-gray-400 text-center mb-12">Your success is guaranteed</p>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {guarantees.map((guarantee, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.15, duration: 0.6 }}
                viewport={{ once: true }}
                className="group"
              >
                <motion.div
                  className={`flex items-start space-x-6 p-8 ${guarantee.bgColor} border ${guarantee.borderColor} rounded-2xl transition-all duration-500 hover:border-opacity-60 backdrop-blur-sm`}
                  whileHover={{ scale: 1.02, y: -5 }}
                >
                  <motion.div
                    className={`flex-shrink-0 w-16 h-16 bg-gradient-to-r from-gray-700 to-gray-600 rounded-2xl flex items-center justify-center`}
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.8 }}
                  >
                    <Icon name={guarantee.icon} size={28} className={guarantee.color} />
                  </motion.div>
                  
                  <div className="flex-1">
                    <h4 className="text-xl font-bold text-white mb-3 group-hover:text-blue-300 transition-colors">
                      {guarantee.title}
                    </h4>
                    <p className="text-gray-300 leading-relaxed">{guarantee.description}</p>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Enhanced Contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          viewport={{ once: true }}
          className="relative"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/15 to-purple-500/15 rounded-3xl blur-2xl" />
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-purple-500/5 rounded-3xl" />
          <div className="relative text-center bg-gradient-to-br from-gray-900/60 via-gray-800/50 to-gray-900/60 rounded-3xl p-16 border border-cyan-400/40 backdrop-blur-xl shadow-2xl shadow-cyan-500/10">
            <div className="inline-block mb-8">
            
              <h3 className="text-4xl sm:text-5xl font-bold mb-6 leading-tight text-white">
                Ready to Get Started?
              </h3>
            </div>
            
            <motion.p 
              className="text-xl text-gray-200 mb-12 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              Let's discuss your project and see how we can bring your vision to life. 
              <span className="text-cyan-400 font-semibold"> Get in touch for a free consultation.</span>
            </motion.p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-4xl mx-auto">
              <motion.div 
                className="group flex flex-col items-center space-y-3 p-6 rounded-2xl bg-gradient-to-br from-cyan-500/10 to-transparent border border-cyan-400/20 backdrop-blur-sm hover:border-cyan-400/40 transition-all duration-300"
                whileHover={{ scale: 1.05, y: -5 }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500 to-cyan-600 flex items-center justify-center group-hover:shadow-lg group-hover:shadow-cyan-500/25 transition-all">
                  <Icon name="Mail" size={20} className="text-white" />
                </div>
                <span className="text-gray-300 group-hover:text-cyan-300 transition-colors font-medium">contact@codewithburhan.com</span>
              </motion.div>
              
              <motion.div 
                className="group flex flex-col items-center space-y-3 p-6 rounded-2xl bg-gradient-to-br from-purple-500/10 to-transparent border border-purple-400/20 backdrop-blur-sm hover:border-purple-400/40 transition-all duration-300"
                whileHover={{ scale: 1.05, y: -5 }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center group-hover:shadow-lg group-hover:shadow-purple-500/25 transition-all">
                  <Icon name="Phone" size={20} className="text-white" />
                </div>
                <span className="text-gray-300 group-hover:text-purple-300 transition-colors font-medium">+923275380226</span>
              </motion.div>
              
              <motion.div 
                className="group flex flex-col items-center space-y-3 p-6 rounded-2xl bg-gradient-to-br from-cyan-500/10 to-purple-500/10 border border-gray-600/20 backdrop-blur-sm hover:border-cyan-400/30 transition-all duration-300"
                whileHover={{ scale: 1.05, y: -5 }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
              >
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500 to-purple-500 flex items-center justify-center group-hover:shadow-lg group-hover:shadow-cyan-500/25 transition-all">
                  <Icon name="MapPin" size={20} className="text-white" />
                </div>
                <span className="text-gray-300 group-hover:text-cyan-300 transition-colors font-medium">Okara, Pakistan</span>
              </motion.div>
            </div>

            <motion.div
              whileHover={{ scale: 1.08, y: -3 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-2xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity"></div>
              <Link to="/contact-multi-channel-collaboration-hub">
                <Button
                  size="lg"
                  className="relative bg-gradient-to-r from-cyan-600 via-purple-600 to-cyan-600 text-white hover:from-cyan-500 hover:via-purple-500 hover:to-cyan-500 shadow-2xl hover:shadow-cyan-500/30 transform transition-all duration-300 px-16 py-5 text-xl font-bold border-2 border-cyan-400/50 hover:border-cyan-300 rounded-2xl overflow-hidden group"
                >
                <Icon name="Rocket" size={24} className="mr-4 group-hover:rotate-12 transition-transform duration-300" />
                Start Your Project Today
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent"
                  animate={{ x: [-300, 300] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                />
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-purple-400/20"
                  animate={{ 
                    background: [
                      "linear-gradient(to right, rgba(34, 211, 238, 0.2), rgba(168, 85, 247, 0.2))",
                      "linear-gradient(to right, rgba(168, 85, 247, 0.2), rgba(34, 211, 238, 0.2))",
                      "linear-gradient(to right, rgba(34, 211, 238, 0.2), rgba(168, 85, 247, 0.2))"
                    ]
                  }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                />
                </Button>
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TrustSignals;