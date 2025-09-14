import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const ContinuousLearning = () => {
  const [currentGoalIndex, setCurrentGoalIndex] = useState(0);
  const [progressAnimation, setProgressAnimation] = useState(false);

  const currentLearning = [
    {
      technology: 'Next.js 14',
      progress: 75,
      category: 'Frontend Framework',
      description: 'Mastering App Router, Server Components, and advanced optimization techniques',
      timeInvested: '40 hours',
      nextMilestone: 'Build full-stack e-commerce app',
      resources: ['Official Documentation', 'Vercel Tutorials', 'Community Projects'],
      icon: 'Zap',
      color: '#00D4FF',
      gradientColor: 'from-cyan-400 to-blue-500',
      glowColor: 'rgba(0, 212, 255, 0.4)'
    },
    {
      technology: 'TypeScript',
      progress: 60,
      category: 'Programming Language',
      description: 'Advanced type systems, generics, and integration with React ecosystem',
      timeInvested: '25 hours',
      nextMilestone: 'Refactor existing projects to TypeScript',
      resources: ['TypeScript Handbook', 'React TypeScript Cheatsheet', 'Practice Projects'],
      icon: 'Code',
      color: '#8B5CF6',
      gradientColor: 'from-purple-400 to-indigo-500',
      glowColor: 'rgba(139, 92, 246, 0.4)'
    },
    {
      technology: 'Prisma ORM',
      progress: 45,
      category: 'Database',
      description: 'Modern database toolkit for type-safe database access and migrations',
      timeInvested: '15 hours',
      nextMilestone: 'Implement in production project',
      resources: ['Prisma Documentation', 'Database Design Patterns', 'Migration Strategies'],
      icon: 'Database',
      color: '#10B981',
      gradientColor: 'from-emerald-400 to-green-500',
      glowColor: 'rgba(16, 185, 129, 0.4)'
    },
    {
      technology: 'Headless Commerce',
      progress: 80,
      category: 'E-commerce',
      description: 'Building decoupled e-commerce solutions with modern frontend frameworks',
      timeInvested: '60 hours',
      nextMilestone: 'Launch headless Shopify project',
      resources: ['Shopify Storefront API', 'GraphQL Best Practices', 'Performance Optimization'],
      icon: 'ShoppingCart',
      color: '#EC4899',
      gradientColor: 'from-pink-400 to-purple-500',
      glowColor: 'rgba(236, 72, 153, 0.4)'
    }
  ];

  const learningGoals = [
    {
      title: '2024 Q4 Goals',
      items: [
        { goal: 'Master Next.js 14 App Router', status: 'in-progress', priority: 'high' },
        { goal: 'Complete TypeScript certification', status: 'planned', priority: 'high' },
        { goal: 'Build 3 full-stack projects', status: 'in-progress', priority: 'medium' },
        { goal: 'Contribute to open source', status: 'completed', priority: 'low' }
      ]
    },
    {
      title: '2025 Q1 Roadmap',
      items: [
        { goal: 'Learn GraphQL & Apollo Client', status: 'planned', priority: 'high' },
        { goal: 'Explore AI/ML integration', status: 'planned', priority: 'medium' },
        { goal: 'Mobile development with React Native', status: 'planned', priority: 'low' },
        { goal: 'Advanced DevOps practices', status: 'planned', priority: 'medium' }
      ]
    }
  ];

  const emergingTech = [
    { name: 'AI Integration', interest: 'high', timeline: '2024 Q4' },
    { name: 'Web3 Development', interest: 'medium', timeline: '2025 Q1' },
    { name: 'Edge Computing', interest: 'high', timeline: '2025 Q2' },
    { name: 'Micro-frontends', interest: 'medium', timeline: '2024 Q4' }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentGoalIndex(prev => (prev + 1) % learningGoals.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setProgressAnimation(true);
    const timer = setTimeout(() => setProgressAnimation(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const getStatusColor = (status) => {
    const colors = {
      'completed': 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
      'in-progress': 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
      'planned': 'bg-amber-500/20 text-amber-400 border-amber-500/30'
    };
    return colors?.[status] || colors?.['planned'];
  };

  const getPriorityColor = (priority) => {
    const colors = {
      'high': 'bg-red-500/20 text-red-400 border-red-500/30',
      'medium': 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
      'low': 'bg-green-500/20 text-green-400 border-green-500/30'
    };
    return colors?.[priority] || colors?.['medium'];
  };

  return (
    <div className="relative bg-gradient-to-br from-black via-gray-900 to-black rounded-3xl border border-cyan-400/20 overflow-hidden backdrop-blur-xl shadow-2xl shadow-cyan-500/10">
      
      {/* Animated Background */}
      <div className="absolute inset-0">
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.02]">
          <div 
            className="absolute inset-0"
            style={{
              backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(0,212,255,0.3) 1px, transparent 0)',
              backgroundSize: '25px 25px'
            }}
          />
        </div>
        
        {/* Floating Orbs */}
        <motion.div 
          className="absolute top-20 left-10 w-32 h-32 bg-cyan-500/10 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.3, 1],
            opacity: [0.1, 0.3, 0.1]
          }}
          transition={{ 
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute bottom-20 right-10 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl"
          animate={{ 
            scale: [1.3, 1, 1.3],
            opacity: [0.3, 0.1, 0.3]
          }}
          transition={{ 
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      <div className="relative z-10 p-8">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.h2 
            className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Continuous Learning Journey
          </motion.h2>
          <motion.p 
            className="text-gray-400 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Staying ahead of the curve through constant learning and exploration of emerging technologies.
          </motion.p>
        </div>

        {/* Current Learning Progress */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {currentLearning?.map((item, index) => (
            <motion.div
              key={index}
              className="relative group bg-gradient-to-br from-gray-900/60 via-gray-800/50 to-gray-900/60 border border-cyan-400/20 rounded-2xl p-6 backdrop-blur-xl shadow-xl shadow-cyan-500/5 hover:border-cyan-400/40 transition-all duration-300"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
            >
              {/* Glow Effect */}
              <div 
                className="absolute inset-0 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: item.glowColor }}
              />
              
              <div className="relative">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <motion.div 
                      className="w-12 h-12 rounded-xl flex items-center justify-center shadow-lg"
                      style={{ 
                        background: `linear-gradient(135deg, ${item.color}, ${item.color}80)`,
                        boxShadow: `0 0 20px ${item.glowColor}`
                      }}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                    >
                      <Icon name={item?.icon} size={24} className="text-white" />
                    </motion.div>
                    <div>
                      <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                        {item?.technology}
                      </h3>
                      <p className="text-sm text-gray-400">{item?.category}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <motion.div 
                      className="text-2xl font-bold"
                      style={{ color: item.color }}
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      {item?.progress}%
                    </motion.div>
                    <div className="text-xs text-gray-400">Complete</div>
                  </div>
                </div>

                <p className="text-sm text-gray-300 mb-4 leading-relaxed">{item?.description}</p>

                {/* Progress Bar */}
                <div className="mb-6">
                  <div className="flex justify-between text-xs text-gray-400 mb-2">
                    <span>Progress</span>
                    <span>{item?.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-800/50 rounded-full h-3 overflow-hidden">
                    <motion.div
                      className="h-full rounded-full relative overflow-hidden"
                      style={{ 
                        background: `linear-gradient(90deg, ${item.color}, ${item.color}80)`,
                        boxShadow: `0 0 10px ${item.glowColor}`
                      }}
                      initial={{ width: 0 }}
                      animate={{ width: `${item?.progress}%` }}
                      transition={{ duration: 1.5, delay: index * 0.2 }}
                    >
                      <motion.div
                        className="absolute inset-0 bg-white/20"
                        animate={{ x: ['-100%', '100%'] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                      />
                    </motion.div>
                  </div>
                </div>

                {/* Details */}
                <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
                  <div>
                    <div className="text-gray-400 mb-1">Time Invested</div>
                    <div className="text-white font-medium">{item?.timeInvested}</div>
                  </div>
                  <div>
                    <div className="text-gray-400 mb-1">Next Milestone</div>
                    <div className="text-white font-medium">{item?.nextMilestone}</div>
                  </div>
                </div>

                {/* Resources */}
                <div>
                  <div className="text-xs text-gray-400 mb-3">Learning Resources</div>
                  <div className="flex flex-wrap gap-2">
                    {item?.resources?.map((resource, resourceIndex) => (
                      <motion.span
                        key={resourceIndex}
                        className="px-3 py-1 bg-cyan-500/20 text-cyan-300 rounded-full text-xs font-medium border border-cyan-500/30 hover:bg-cyan-500/30 transition-colors cursor-default"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.8 + resourceIndex * 0.1 }}
                        whileHover={{ scale: 1.05 }}
                      >
                        {resource}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Learning Goals */}
        <motion.div 
          className="relative group bg-gradient-to-br from-gray-900/60 via-gray-800/50 to-gray-900/60 border border-cyan-400/20 rounded-2xl p-8 backdrop-blur-xl shadow-xl shadow-cyan-500/5"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          {/* Glow Effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          <div className="relative">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                Learning Goals & Roadmap
              </h3>
              <div className="flex space-x-2">
                {learningGoals.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentGoalIndex(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      currentGoalIndex === index ? 'bg-cyan-400' : 'bg-gray-600'
                    }`}
                  />
                ))}
              </div>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={currentGoalIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5 }}
              >
                <h4 className="text-lg font-semibold text-white mb-4">
                  {learningGoals[currentGoalIndex]?.title}
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {learningGoals[currentGoalIndex]?.items?.map((item, index) => (
                    <motion.div
                      key={index}
                      className="flex items-center justify-between p-3 bg-gray-800/50 rounded-xl border border-gray-700/50 hover:border-cyan-400/30 transition-colors"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <span className="text-gray-300 font-medium">{item?.goal}</span>
                      <div className="flex space-x-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(item?.status)}`}>
                          {item?.status}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(item?.priority)}`}>
                          {item?.priority}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Emerging Tech Interest */}
        <motion.div 
          className="mt-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          <h4 className="text-lg font-semibold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent mb-4">
            Emerging Technologies on Radar
          </h4>
          <div className="flex flex-wrap justify-center gap-3">
            {emergingTech.map((tech, index) => (
              <motion.div
                key={index}
                className="px-4 py-2 bg-gradient-to-r from-gray-800/60 to-gray-700/60 rounded-full border border-gray-600/50 text-gray-300 text-sm hover:border-cyan-400/50 hover:text-cyan-300 transition-all duration-300"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.9 + index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                {tech.name}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ContinuousLearning;