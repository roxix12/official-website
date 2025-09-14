import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const LearningPathTimeline = () => {
  const [selectedPath, setSelectedPath] = useState('shopify');

  const learningPaths = {
    shopify: {
      title: 'Shopify Mastery Journey',
      description: 'From first theme edit to verified expert status',
      color: 'from-emerald-400 to-green-500',
      glowColor: 'rgba(16, 185, 129, 0.4)',
      icon: 'ShoppingBag',
      milestones: [
        {
          year: '2020',
          title: 'First Shopify Encounter',
          description: 'Discovered Shopify while helping a local business owner set up their online store. Spent nights learning Liquid templating.',
          skills: ['Basic Liquid', 'Theme Structure'],
          achievement: 'First successful theme customization',
          difficulty: 'Beginner'
        },
        {
          year: '2021',
          title: 'Theme Development Focus',
          description: 'Dove deep into custom theme development. Built first completely custom theme from scratch for a fashion brand.',
          skills: ['Advanced Liquid', 'JavaScript Integration', 'Responsive Design'],
          achievement: '5 custom themes delivered',
          difficulty: 'Intermediate'
        },
        {
          year: '2022',
          title: 'App Integration & Performance',
          description: 'Learned app ecosystem integration and performance optimization. Achieved 90+ PageSpeed scores consistently.',
          skills: ['App Integration', 'Performance Optimization', 'Core Web Vitals'],
          achievement: 'Shopify Partner status achieved',
          difficulty: 'Advanced'
        },
        {
          year: '2023',
          title: 'Expert Verification',
          description: 'Achieved Shopify Expert verification. Leading complex enterprise-level projects with advanced customizations.',
          skills: ['Enterprise Solutions', 'Advanced Performance', 'Team Leadership'],
          achievement: 'Shopify Expert status verified',
          difficulty: 'Expert'
        },
        {
          year: '2024',
          title: 'Innovation & Mentoring',
          description: 'Developing cutting-edge solutions and mentoring upcoming developers in the Shopify ecosystem.',
          skills: ['Innovation', 'Mentoring', 'Advanced Architecture'],
          achievement: '50+ successful projects completed',
          difficulty: 'Master'
        }
      ]
    },
    frontend: {
      title: 'Frontend Evolution Path',
      description: 'Journey from basic HTML to modern React applications',
      color: 'from-cyan-400 to-blue-500',
      glowColor: 'rgba(0, 212, 255, 0.4)',
      icon: 'Monitor',
      milestones: [
        {
          year: '2019',
          title: 'HTML & CSS Foundation',
          description: 'Started with basic HTML and CSS. Built first static websites using borrowed computer at internet cafe.',
          skills: ['HTML5', 'CSS3', 'Basic JavaScript'],
          achievement: 'First responsive website',
          difficulty: 'Beginner'
        },
        {
          year: '2020',
          title: 'JavaScript Mastery',
          description: 'Focused on JavaScript fundamentals. Built interactive features and learned DOM manipulation.',
          skills: ['ES6+', 'DOM Manipulation', 'Event Handling'],
          achievement: 'Interactive web applications',
          difficulty: 'Intermediate'
        },
        {
          year: '2021',
          title: 'Framework Introduction',
          description: 'Learned jQuery and started exploring modern frameworks. Built first single-page applications.',
          skills: ['jQuery', 'AJAX', 'API Integration'],
          achievement: 'Dynamic web applications',
          difficulty: 'Intermediate'
        },
        {
          year: '2022',
          title: 'React Development',
          description: 'Transitioned to React. Built component-based applications with modern development practices.',
          skills: ['React', 'Component Architecture', 'State Management'],
          achievement: 'Modern React applications',
          difficulty: 'Advanced'
        },
        {
          year: '2024',
          title: 'Advanced Patterns',
          description: 'Mastered advanced React patterns, performance optimization, and modern tooling.',
          skills: ['Advanced React', 'Performance Optimization', 'Modern Tooling'],
          achievement: 'Production-grade applications',
          difficulty: 'Expert'
        }
      ]
    },
    backend: {
      title: 'Backend & CMS Journey',
      description: 'Server-side development and content management',
      color: 'from-purple-400 to-pink-500',
      glowColor: 'rgba(139, 92, 246, 0.4)',
      icon: 'Server',
      milestones: [
        {
          year: '2020',
          title: 'WordPress Basics',
          description: 'Started with WordPress customization for client projects. Learned PHP basics and theme development.',
          skills: ['WordPress', 'Basic PHP', 'MySQL'],
          achievement: 'First custom WordPress theme',
          difficulty: 'Beginner'
        },
        {
          year: '2021',
          title: 'PHP Development',
          description: 'Expanded PHP knowledge for custom functionality. Built custom plugins and advanced features.',
          skills: ['Advanced PHP', 'Custom Post Types', 'Plugin Development'],
          achievement: 'Custom WordPress solutions',
          difficulty: 'Intermediate'
        },
        {
          year: '2022',
          title: 'Database & APIs',
          description: 'Learned database design and API development. Integrated third-party services and built custom endpoints.',
          skills: ['Database Design', 'REST APIs', 'Third-party Integration'],
          achievement: 'Full-stack applications',
          difficulty: 'Advanced'
        },
        {
          year: '2023',
          title: 'Performance & Security',
          description: 'Focused on backend performance optimization and security best practices.',
          skills: ['Performance Optimization', 'Security', 'Caching'],
          achievement: 'Enterprise-level solutions',
          difficulty: 'Expert'
        }
      ]
    }
  };

  const currentPath = learningPaths?.[selectedPath];

  const getDifficultyColor = (difficulty) => {
    const colors = {
      'Beginner': 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
      'Intermediate': 'bg-amber-500/20 text-amber-400 border-amber-500/30',
      'Advanced': 'bg-orange-500/20 text-orange-400 border-orange-500/30',
      'Expert': 'bg-red-500/20 text-red-400 border-red-500/30',
      'Master': 'bg-purple-500/20 text-purple-400 border-purple-500/30'
    };
    return colors?.[difficulty] || colors?.['Beginner'];
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
              backgroundSize: '30px 30px'
            }}
          />
        </div>
        
        {/* Floating Orbs */}
        <motion.div 
          className="absolute top-10 right-20 w-32 h-32 bg-cyan-500/10 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1]
          }}
          transition={{ 
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute bottom-10 left-20 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl"
          animate={{ 
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.1, 0.2]
          }}
          transition={{ 
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      <div className="relative z-10 p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <motion.h3 
            className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Learning Journey Timeline
          </motion.h3>
          <motion.p 
            className="text-gray-400 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Follow the authentic path of skill acquisition, from first encounters to mastery. 
            Each milestone represents real challenges overcome and knowledge gained.
          </motion.p>
        </div>

        {/* Path Selector */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {Object.entries(learningPaths)?.map(([key, path]) => (
            <motion.button
              key={key}
              onClick={() => setSelectedPath(key)}
              className={`relative group flex items-center space-x-3 px-6 py-3 rounded-2xl border transition-all duration-300 backdrop-blur-xl ${
                selectedPath === key
                  ? 'bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border-cyan-500/50 text-cyan-300 shadow-lg shadow-cyan-500/25'
                  : 'bg-gradient-to-r from-gray-900/60 via-gray-800/50 to-gray-900/60 border-gray-700/50 text-gray-400 hover:border-cyan-400/30 hover:text-cyan-300'
              }`}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative flex items-center space-x-2">
                <Icon name={path?.icon} size={18} />
                <span className="font-medium">{path?.title}</span>
              </div>
            </motion.button>
          ))}
        </div>

        {/* Current Path Display */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedPath}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            {/* Path Header */}
            <div className="flex items-center justify-center space-x-4 mb-8">
              <div 
                className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg"
                style={{ 
                  background: `linear-gradient(135deg, ${currentPath?.glowColor}, transparent)`,
                  border: `2px solid ${currentPath?.glowColor}`
                }}
              >
                <Icon name={currentPath?.icon} size={32} className="text-white" />
              </div>
              <div>
                <h3 className={`text-2xl font-bold bg-gradient-to-r ${currentPath?.color} bg-clip-text text-transparent`}>
                  {currentPath?.title}
                </h3>
                <p className="text-gray-400">{currentPath?.description}</p>
              </div>
            </div>

            {/* Timeline */}
            <div className="relative max-w-4xl mx-auto">
              {/* Timeline Line */}
              <div 
                className="absolute left-8 top-0 bottom-0 w-1 rounded-full blur-sm"
                style={{ background: `linear-gradient(to bottom, ${currentPath?.glowColor}, transparent)` }}
              />

              {/* Milestones */}
              <div className="space-y-8">
                {currentPath?.milestones?.map((milestone, index) => (
                  <motion.div
                    key={index}
                    className="relative flex items-start space-x-6"
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    {/* Timeline Node */}
                    <div className="relative z-10 flex-shrink-0">
                      <motion.div 
                        className="w-16 h-16 rounded-full bg-gradient-to-br from-gray-900/80 via-gray-800/60 to-gray-900/80 border-2 flex items-center justify-center backdrop-blur-xl shadow-lg"
                        style={{ borderColor: currentPath?.glowColor }}
                        whileHover={{ scale: 1.1 }}
                        animate={{
                          boxShadow: [
                            `0 0 0 ${currentPath?.glowColor}`,
                            `0 0 20px ${currentPath?.glowColor}`,
                            `0 0 0 ${currentPath?.glowColor}`
                          ]
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <span 
                          className="text-sm font-bold"
                          style={{ color: currentPath?.glowColor?.replace('0.4', '1') }}
                        >
                          {milestone?.year}
                        </span>
                      </motion.div>
                    </div>

                    {/* Milestone Content */}
                    <motion.div 
                      className="flex-1 relative group bg-gradient-to-br from-gray-900/60 via-gray-800/50 to-gray-900/60 border border-cyan-400/20 rounded-2xl p-6 backdrop-blur-xl shadow-xl shadow-cyan-500/5 hover:border-cyan-400/40 transition-all duration-300"
                      whileHover={{ y: -5, scale: 1.02 }}
                    >
                      {/* Glow Effect */}
                      <div 
                        className="absolute inset-0 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                        style={{ background: currentPath?.glowColor }}
                      />
                      
                      <div className="relative">
                        {/* Header */}
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <h4 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                              {milestone?.title}
                            </h4>
                            <p className="text-gray-300 leading-relaxed">
                              {milestone?.description}
                            </p>
                          </div>
                          <div className={`px-3 py-1 rounded-full text-xs font-medium border ${getDifficultyColor(milestone?.difficulty)}`}>
                            {milestone?.difficulty}
                          </div>
                        </div>

                        {/* Skills Acquired */}
                        <div className="mb-4">
                          <h5 className="text-sm font-semibold text-gray-400 mb-2">Skills Acquired</h5>
                          <div className="flex flex-wrap gap-2">
                            {milestone?.skills?.map((skill, skillIndex) => (
                              <motion.span
                                key={skillIndex}
                                className="px-3 py-1 bg-cyan-500/20 text-cyan-300 rounded-full text-xs font-medium border border-cyan-500/30"
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.5 + skillIndex * 0.1 }}
                                whileHover={{ scale: 1.05 }}
                              >
                                {skill}
                              </motion.span>
                            ))}
                          </div>
                        </div>

                        {/* Key Achievement */}
                        <div className="flex items-center space-x-2">
                          <div className="w-5 h-5 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 flex items-center justify-center">
                            <Icon name="Trophy" size={12} className="text-white" />
                          </div>
                          <span className="text-yellow-400 font-medium text-sm">
                            {milestone?.achievement}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default LearningPathTimeline;