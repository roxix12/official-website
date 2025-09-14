import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const SuccessStories = () => {
  const [activeStory, setActiveStory] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [hoveredMetric, setHoveredMetric] = useState(null);
  const [particles, setParticles] = useState([]);
  const sectionRef = useRef(null);

  // Initialize particles
  useEffect(() => {
    const newParticles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 1 + Math.random() * 2,
      speed: 0.05 + Math.random() * 0.15,
      direction: Math.random() * Math.PI * 2,
      opacity: 0.1 + Math.random() * 0.3,
    }));
    setParticles(newParticles);
  }, []);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setActiveStory(prev => (prev + 1) % successStories.length);
    }, 8000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  // Animate particles
  useEffect(() => {
    const animateParticles = () => {
      setParticles(prev => prev.map(particle => ({
        ...particle,
        x: (particle.x + Math.cos(particle.direction) * particle.speed) % 100,
        y: (particle.y + Math.sin(particle.direction) * particle.speed) % 100,
        direction: particle.direction + 0.001,
      })));
    };

    const interval = setInterval(animateParticles, 50);
    return () => clearInterval(interval);
  }, []);

  const successStories = [
    {
      id: 1,
      clientName: "Sarah's Boutique",
      industry: "Fashion Retail",
      challenge: "Outdated website with poor mobile experience and low conversion rates",
      solution: "Complete Shopify redesign with mobile-first approach and conversion optimization",
      results: {
        conversionIncrease: "147%",
        loadTimeReduction: "2.3s",
        revenueIncrease: "$45,000",
        timeframe: "3 months"
      },
      color: "#10B981", // Green
      gradient: "from-green-500 to-emerald-500",
      testimonial: `Working with Cdw was transformative for our business. Not only did he deliver an amazing website, but he took the time to understand our brand and customers. The results speak for themselves - we've never seen growth like this before.`,
      clientImage: "https://images.unsplash.com/photo-1494790108755-2616b612b619?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&h=200&q=80",
      beforeImage: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&h=300&q=80",
      afterImage: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&h=300&q=80",
      tags: ["Shopify", "E-commerce", "Mobile Optimization"]
    },
    {
      id: 2,
      clientName: "TechStart Solutions",
      industry: "B2B Technology",
      challenge: "Complex service offerings poorly communicated, low lead generation",
      solution: "Custom WordPress platform with clear service presentation and lead capture",
      results: {
        conversionIncrease: "234%",
        loadTimeReduction: "1.8s",
        revenueIncrease: "$120,000",
        timeframe: "4 months"
      },
      color: "#3B82F6", // Blue
      gradient: "from-blue-500 to-cyan-500",
      testimonial: `Cdw transformed our online presence completely. Our complex B2B services are now clearly presented, and we're generating more qualified leads than ever. The attention to detail and strategic thinking exceeded our expectations.`,
      clientImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&h=200&q=80",
      beforeImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&h=300&q=80",
      afterImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&h=300&q=80",
      tags: ["WordPress", "B2B", "Lead Generation"]
    },
    {
      id: 3,
      clientName: "FitLife Nutrition",
      industry: "Health & Wellness",
      challenge: "High cart abandonment, poor checkout experience, low customer retention",
      solution: "Shopify Plus migration with optimized checkout and subscription features",
      results: {
        conversionIncrease: "186%",
        loadTimeReduction: "3.1s",
        revenueIncrease: "$89,000",
        timeframe: "2 months"
      },
      color: "#8B5CF6", // Purple
      gradient: "from-purple-500 to-pink-500",
      testimonial: `The transformation of our store has been incredible. Cart abandonment dropped significantly, and our subscription model is now thriving. Cdw's expertise in e-commerce optimization is unmatched.`,
      clientImage: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&h=200&q=80",
      beforeImage: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&h=300&q=80",
      afterImage: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&h=300&q=80",
      tags: ["Shopify Plus", "Subscriptions", "Optimization"]
    }
  ];

  const currentStory = successStories[activeStory];

  const handleStoryChange = (index) => {
    setActiveStory(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000); // Resume after 10s
  };

  return (
    <section 
      ref={sectionRef}
      className="relative py-20 bg-gradient-to-br from-black via-gray-900 to-black overflow-hidden"
    >
      {/* Animated Background Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full"
            style={{
              width: particle.size,
              height: particle.size,
              backgroundColor: currentStory.color,
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              opacity: particle.opacity,
            }}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [particle.opacity, particle.opacity * 1.5, particle.opacity],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        {/* Enhanced Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 rounded-full mb-8"
            animate={{
              boxShadow: [
                "0 0 20px rgba(59, 130, 246, 0.3)",
                "0 0 40px rgba(147, 51, 234, 0.4)",
                "0 0 20px rgba(59, 130, 246, 0.3)",
              ],
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <Icon name="Trophy" size={20} className="mr-2 text-blue-400" />
            <span className="text-blue-300 font-medium">SUCCESS STORIES</span>
          </motion.div>

          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="text-white">Real </span>
            <motion.span
              className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent"
              animate={{
                backgroundPosition: ['0%', '100%', '0%'],
              }}
              transition={{ duration: 5, repeat: Infinity }}
              style={{ backgroundSize: '200% 200%' }}
            >
              Results
            </motion.span>
          </h2>

          <motion.p
            className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            See how strategic development partnerships drive{' '}
            <motion.span
              className="text-blue-400 font-semibold"
              animate={{ color: ["#60A5FA", "#A78BFA", "#60A5FA"] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              measurable business growth
            </motion.span>
            {' '}across industries.
          </motion.p>
        </motion.div>

        {/* Story Navigation */}
        <motion.div
          className="flex justify-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="flex space-x-4">
            {successStories.map((story, index) => (
              <motion.button
                key={story.id}
                onClick={() => handleStoryChange(index)}
                className={`relative p-4 rounded-2xl transition-all duration-300 ${
                  activeStory === index ? 'scale-110' : 'hover:scale-105'
                }`}
                style={{
                  background: activeStory === index 
                    ? `linear-gradient(135deg, ${story.color}, ${story.color}CC)` 
                    : 'rgba(255,255,255,0.1)',
                  border: `2px solid ${activeStory === index ? story.color : 'transparent'}`,
                }}
                whileHover={{ 
                  boxShadow: `0 0 20px ${story.color}60`,
                }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center"
                  animate={{
                    backgroundColor: activeStory === index ? 'rgba(0,0,0,0.2)' : 'rgba(255,255,255,0.2)',
                  }}
                >
                  <span className="text-sm font-bold text-white">{story.clientName.charAt(0)}</span>
                </motion.div>
                
                {/* Progress Bar */}
                {activeStory === index && (
                  <motion.div
                    className="absolute bottom-1 left-1 right-1 h-1 bg-white/30 rounded-full overflow-hidden"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <motion.div
                      className="h-full bg-white"
                      initial={{ width: '0%' }}
                      animate={{ width: '100%' }}
                      transition={{ duration: 8, ease: "linear" }}
                      key={activeStory} // Reset animation when story changes
                    />
                  </motion.div>
                )}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Enhanced Story Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeStory}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
            initial={{ opacity: 0, y: 30, rotateX: -10 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            exit={{ opacity: 0, y: -30, rotateX: 10 }}
            transition={{ duration: 0.6 }}
          >
            {/* Story Details */}
            <motion.div
              className="space-y-8"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              {/* Client Info */}
              <div className="flex items-center space-x-4 mb-6">
                <motion.div
                  className="relative"
                  whileHover={{ scale: 1.1 }}
                >
                  <Image
                    src={currentStory.clientImage}
                    alt={currentStory.clientName}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <motion.div
                    className="absolute inset-0 rounded-full"
                    style={{
                      boxShadow: `0 0 20px ${currentStory.color}60`,
                    }}
                    animate={{
                      scale: [1, 1.1, 1],
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </motion.div>
                
                <div>
                  <h3 className="text-2xl font-bold text-white">{currentStory.clientName}</h3>
                  <p className="text-gray-400">{currentStory.industry}</p>
                </div>
              </div>

              {/* Challenge & Solution */}
              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-semibold text-white mb-3 flex items-center">
                    <Icon name="AlertCircle" size={20} className="mr-2 text-red-400" />
                    Challenge
                  </h4>
                  <p className="text-gray-300 leading-relaxed">{currentStory.challenge}</p>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-white mb-3 flex items-center">
                    <Icon name="Lightbulb" size={20} className="mr-2 text-yellow-400" />
                    Solution
                  </h4>
                  <p className="text-gray-300 leading-relaxed">{currentStory.solution}</p>
                </div>
              </div>

              {/* Technology Tags */}
              <div className="flex flex-wrap gap-2">
                {currentStory.tags.map((tag, index) => (
                  <motion.span
                    key={tag}
                    className="px-4 py-2 rounded-full text-sm font-medium backdrop-blur-sm"
                    style={{
                      backgroundColor: `${currentStory.color}20`,
                      color: currentStory.color,
                      border: `1px solid ${currentStory.color}40`,
                    }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{
                      scale: 1.05,
                      backgroundColor: `${currentStory.color}30`,
                    }}
                  >
                    {tag}
                  </motion.span>
                ))}
              </div>

              {/* Testimonial */}
              <motion.blockquote
                className="relative p-6 rounded-2xl border"
                style={{
                  background: `linear-gradient(135deg, ${currentStory.color}10, transparent)`,
                  borderColor: `${currentStory.color}30`,
                }}
                animate={{
                  boxShadow: [
                    `0 5px 15px ${currentStory.color}20`,
                    `0 10px 25px ${currentStory.color}30`,
                    `0 5px 15px ${currentStory.color}20`,
                  ],
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <Icon 
                  name="Quote" 
                  size={24} 
                  className="mb-4"
                  style={{ color: currentStory.color }}
                />
                <p className="text-gray-300 leading-relaxed italic mb-4">
                  "{currentStory.testimonial}"
                </p>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                    <Icon name="Star" size={14} className="text-white" />
                  </div>
                  <div className="flex space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Icon key={i} name="Star" size={14} style={{ color: currentStory.color }} />
                    ))}
                  </div>
                </div>
              </motion.blockquote>
            </motion.div>

            {/* Results Metrics */}
            <motion.div
              className="space-y-8"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              {/* Metrics Grid */}
              <div className="grid grid-cols-2 gap-6">
                {Object.entries(currentStory.results).map(([key, value], index) => (
                  <motion.div
                    key={key}
                    className="relative p-6 rounded-2xl border backdrop-blur-sm text-center cursor-pointer"
                    style={{
                      background: `linear-gradient(135deg, ${currentStory.color}15, transparent)`,
                      borderColor: hoveredMetric === key ? currentStory.color : `${currentStory.color}30`,
                    }}
                    onMouseEnter={() => setHoveredMetric(key)}
                    onMouseLeave={() => setHoveredMetric(null)}
                    whileHover={{ 
                      scale: 1.05,
                      boxShadow: `0 15px 30px ${currentStory.color}30`,
                    }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 + (index * 0.1) }}
                  >
                    {/* Floating particles for hovered metric */}
                    <AnimatePresence>
                      {hoveredMetric === key && (
                        <div className="absolute inset-0 pointer-events-none">
                          {Array.from({ length: 6 }).map((_, i) => (
                            <motion.div
                              key={i}
                              className="absolute w-1 h-1 rounded-full"
                              style={{ backgroundColor: currentStory.color }}
                              initial={{ 
                                opacity: 0,
                                x: "50%",
                                y: "50%",
                              }}
                              animate={{
                                opacity: [0, 1, 0],
                                x: `${50 + (Math.cos(i * Math.PI / 3) * 100)}%`,
                                y: `${50 + (Math.sin(i * Math.PI / 3) * 100)}%`,
                                scale: [0, 1, 0],
                              }}
                              exit={{ opacity: 0 }}
                              transition={{
                                duration: 2,
                                repeat: Infinity,
                                delay: i * 0.2,
                              }}
                            />
                          ))}
                        </div>
                      )}
                    </AnimatePresence>

                    <motion.div
                      className="text-3xl font-bold mb-2"
                      style={{ color: currentStory.color }}
                      animate={{
                        scale: hoveredMetric === key ? [1, 1.1, 1] : 1,
                        textShadow: hoveredMetric === key 
                          ? [`0 0 10px ${currentStory.color}`, `0 0 20px ${currentStory.color}`, `0 0 10px ${currentStory.color}`]
                          : `0 0 5px ${currentStory.color}`,
                      }}
                      transition={{ duration: 0.5 }}
                    >
                      {value}
                    </motion.div>
                    <div className="text-sm text-gray-400 capitalize font-medium">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Before/After Preview */}
              <motion.div
                className="relative rounded-2xl overflow-hidden border"
                style={{ borderColor: `${currentStory.color}30` }}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8 }}
              >
                <div className="grid grid-cols-2 gap-1">
                  <div className="relative group">
                    <Image
                      src={currentStory.beforeImage}
                      alt="Before"
                      className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                      <span className="text-white font-semibold">BEFORE</span>
                    </div>
                  </div>
                  <div className="relative group">
                    <Image
                      src={currentStory.afterImage}
                      alt="After"
                      className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-center justify-center">
                      <span className="text-white font-semibold">AFTER</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default SuccessStories;