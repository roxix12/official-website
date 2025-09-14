import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SkillsConstellation = () => {
  const [activeSkill, setActiveSkill] = useState(null);
  const [hoveredSkill, setHoveredSkill] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [particles, setParticles] = useState([]);
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);

  // Initialize particles
  useEffect(() => {
    const newParticles = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      speed: 0.1 + Math.random() * 0.2,
      direction: Math.random() * Math.PI * 2,
      size: 1 + Math.random() * 2,
      opacity: 0.1 + Math.random() * 0.3,
    }));
    setParticles(newParticles);
  }, []);

  // Animate particles
  useEffect(() => {
    if (!isVisible) return;
    
    const animateParticles = () => {
      setParticles(prev => prev.map(particle => ({
        ...particle,
        x: particle.x + Math.cos(particle.direction) * particle.speed,
        y: particle.y + Math.sin(particle.direction) * particle.speed,
        direction: particle.direction + 0.005,
      })));
    };

    const interval = setInterval(animateParticles, 50);
    return () => clearInterval(interval);
  }, [isVisible]);

  // Track mouse position
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        setMousePosition({
          x: ((e.clientX - rect.left) / rect.width) * 100,
          y: ((e.clientY - rect.top) / rect.height) * 100,
        });
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const skills = [
    {
      id: 'javascript',
      name: 'JavaScript',
      fullName: 'JavaScript/TypeScript',
      icon: 'Code',
      percent: 92,
      projects: 15,
      brandColor: '#F7DF1E',
      glowColor: '#FFD700',
      position: { x: 20, y: 25 },
      expertise: 'ES6+, TypeScript, Node.js, Advanced Patterns',
      certifications: ['Advanced JS', 'TypeScript Pro'],
      yearlyGrowth: '+12%'
    },
    {
      id: 'react',
      name: 'React',
      fullName: 'React & Next.js',
      icon: 'Atom',
      percent: 90,
      projects: 12,
      brandColor: '#61DAFB',
      glowColor: '#00D4FF',
      position: { x: 70, y: 30 },
      expertise: 'Hooks, Context, SSR, Performance Optimization',
      certifications: ['React Expert', 'Next.js Certified'],
      yearlyGrowth: '+18%'
    },
    {
      id: 'shopify',
      name: 'Shopify',
      fullName: 'Shopify Development',
      icon: 'ShoppingBag',
      percent: 95,
      projects: 20,
      brandColor: '#95BF47',
      glowColor: '#7CB342',
      position: { x: 45, y: 15 },
      expertise: 'Liquid, Theme Dev, App Development, Plus Features',
      certifications: ['Shopify Expert', 'Plus Certified'],
      yearlyGrowth: '+25%'
    },
    {
      id: 'woocommerce',
      name: 'WooCommerce',
      fullName: 'WooCommerce & WordPress',
      icon: 'Store',
      percent: 80,
      projects: 8,
      brandColor: '#96588A',
      glowColor: '#B39BC8',
      position: { x: 15, y: 65 },
      expertise: 'Custom Plugins, Payment Gateways, Performance',
      certifications: ['WooCommerce Expert'],
      yearlyGrowth: '+15%'
    },
    {
      id: 'liquid',
      name: 'Liquid',
      fullName: 'Liquid Template Engine',
      icon: 'Droplet',
      percent: 90,
      projects: 10,
      brandColor: '#26B6EA',
      glowColor: '#00BCD4',
      position: { x: 75, y: 70 },
      expertise: 'Advanced Templating, Performance, Custom Filters',
      certifications: ['Liquid Master'],
      yearlyGrowth: '+20%'
    },
    {
      id: 'analytics',
      name: 'Analytics',
      fullName: 'Analytics & Optimization',
      icon: 'BarChart3',
      percent: 88,
      projects: 14,
      brandColor: '#E37400',
      glowColor: '#FF9800',
      position: { x: 60, y: 55 },
      expertise: 'GA4, GTM, Conversion Optimization, A/B Testing',
      certifications: ['Google Analytics', 'Conversion Expert'],
      yearlyGrowth: '+22%'
    },
  ];

  const handleSkillHover = (skill) => {
    setHoveredSkill(skill);
    setActiveSkill(skill?.id);
  };

  const handleSkillLeave = () => {
    setHoveredSkill(null);
    setActiveSkill(null);
  };

  return (
    <section 
      ref={sectionRef}
      className="relative py-20 bg-gradient-to-br from-black via-gray-900 to-black overflow-hidden antialiased"
      style={{
        fontSmooth: 'always',
        WebkitFontSmoothing: 'antialiased',
        MozOsxFontSmoothing: 'grayscale',
        textRendering: 'optimizeLegibility',
      }}
      onMouseEnter={() => setIsVisible(true)}
    >
      {/* Animated Background Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute w-1 h-1 bg-blue-400 rounded-full"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              opacity: particle.opacity,
            }}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [particle.opacity, particle.opacity * 1.5, particle.opacity],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Dynamic Mouse Follower */}
      <motion.div
        className="absolute pointer-events-none"
        style={{
          left: `${mousePosition.x}%`,
          top: `${mousePosition.y}%`,
          transform: 'translate(-50%, -50%)',
        }}
        animate={{
          scale: hoveredSkill ? [1, 1.5, 1] : 1,
        }}
        transition={{ duration: 0.3 }}
      >
        <div className="w-32 h-32 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-xl" />
      </motion.div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Enhanced Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
        >
          <motion.div
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 rounded-full mb-6"
            animate={{
              boxShadow: [
                "0 0 20px rgba(59, 130, 246, 0.3)",
                "0 0 40px rgba(147, 51, 234, 0.4)",
                "0 0 20px rgba(59, 130, 246, 0.3)",
              ],
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <Icon name="Zap" size={20} className="mr-2 text-blue-400" />
            <span className="text-blue-300 font-medium">SKILL MASTERY SHOWCASE</span>
          </motion.div>
          
          <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent">
            Proficiency{' '}
            <motion.span
              className="relative inline-block"
              animate={{
                textShadow: [
                  "0 0 10px #3B82F6",
                  "0 0 20px #8B5CF6",
                  "0 0 10px #3B82F6",
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Highlights
              <motion.div
                className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                animate={{
                  scaleX: [0.5, 1, 0.5],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.span>
          </h2>
          
          <motion.p
            className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Interactive showcase of cutting-edge technologies with{' '}
            <motion.span
              className="text-blue-400 font-semibold"
              animate={{ color: ["#60A5FA", "#A78BFA", "#60A5FA"] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              real-world impact
            </motion.span>
            {' '}and measurable expertise.
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Interactive Skills Grid */}
          <div className="relative">
            <motion.div
              className="grid grid-cols-2 gap-6"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, staggerChildren: 0.1 }}
              viewport={{ once: true }}
            >
              {skills.map((skill, index) => (
                <motion.div
                  key={skill.id}
                  className="relative group cursor-pointer"
                  initial={{ opacity: 0, y: 50, rotateY: -15 }}
                  whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
                  transition={{ 
                    duration: 0.6, 
                    delay: index * 0.1,
                    type: "spring",
                    stiffness: 100
                  }}
                  whileHover={{ 
                    scale: 1.05, 
                    rotateY: 5,
                    z: 10,
                  }}
                  onMouseEnter={() => handleSkillHover(skill)}
                  onMouseLeave={handleSkillLeave}
                  style={{
                    transformStyle: "preserve-3d",
                    backfaceVisibility: "hidden",
                    perspective: 1000,
                  }}
                >
                  {/* Skill Card */}
                  <motion.div
                    className="relative p-6 rounded-2xl border backdrop-blur-sm overflow-hidden"
                    style={{
                      background: `linear-gradient(135deg, ${skill.brandColor}15, rgba(0,0,0,0.4))`,
                      borderColor: hoveredSkill?.id === skill.id ? skill.brandColor : 'rgba(255,255,255,0.1)',
                    }}
                    animate={{
                      boxShadow: hoveredSkill?.id === skill.id
                        ? `0 20px 40px ${skill.brandColor}40, 0 0 80px ${skill.glowColor}30`
                        : "0 5px 15px rgba(0,0,0,0.3)",
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Floating particles around hovered card */}
                    <AnimatePresence>
                      {hoveredSkill?.id === skill.id && (
                        <div className="absolute inset-0 pointer-events-none">
                          {Array.from({ length: 8 }).map((_, i) => (
                            <motion.div
                              key={i}
                              className="absolute w-2 h-2 rounded-full"
                              style={{ backgroundColor: skill.brandColor }}
                              initial={{ 
                                opacity: 0,
                                x: "50%",
                                y: "50%",
                              }}
                              animate={{
                                opacity: [0, 1, 0],
                                x: `${50 + (Math.cos(i * Math.PI / 4) * 150)}%`,
                                y: `${50 + (Math.sin(i * Math.PI / 4) * 150)}%`,
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

                    {/* Icon with enhanced effects */}
                    <motion.div
                      className="relative mb-4"
                      animate={{
                        rotate: hoveredSkill?.id === skill.id ? [0, 5, -5, 0] : 0,
                      }}
                      transition={{ duration: 0.5 }}
                    >
                      <motion.div
                        className="w-16 h-16 rounded-xl flex items-center justify-center relative"
                        style={{
                          background: `linear-gradient(135deg, ${skill.brandColor}, ${skill.glowColor})`,
                        }}
                        animate={{
                          scale: hoveredSkill?.id === skill.id ? 1.1 : 1,
                          boxShadow: hoveredSkill?.id === skill.id
                            ? `0 0 30px ${skill.brandColor}80`
                            : `0 0 15px ${skill.brandColor}40`,
                        }}
                      >
                        <Icon name={skill.icon} size={28} className="text-black font-bold" />
                        
                        {/* Rotating ring effect */}
                        <motion.div
                          className="absolute inset-0 rounded-xl border-2"
                          style={{ borderColor: skill.brandColor }}
                          animate={{
                            rotate: hoveredSkill?.id === skill.id ? 360 : 0,
                            scale: hoveredSkill?.id === skill.id ? 1.2 : 1,
                            opacity: hoveredSkill?.id === skill.id ? 0.8 : 0,
                          }}
                          transition={{ duration: 2, ease: "linear" }}
                        />
                      </motion.div>
                    </motion.div>

                    {/* Skill Info */}
                    <div className="space-y-3">
                      <div>
                        <h3 className="text-lg font-bold text-white mb-1">{skill.name}</h3>
                        <p className="text-sm text-gray-400">{skill.projects} projects</p>
                  </div>
                  
                      {/* Animated Progress Ring */}
                      <div className="relative w-20 h-20 mx-auto">
                        <svg className="w-20 h-20 transform -rotate-90" viewBox="0 0 80 80">
                          {/* Background circle */}
                      <circle
                            cx="40"
                            cy="40"
                            r="35"
                        stroke="rgba(255,255,255,0.1)"
                            strokeWidth="6"
                            fill="transparent"
                      />
                          {/* Progress circle */}
                      <motion.circle
                            cx="40"
                            cy="40"
                            r="35"
                            stroke={skill.brandColor}
                            strokeWidth="6"
                            fill="transparent"
                        strokeLinecap="round"
                            strokeDasharray={`${2 * Math.PI * 35}`}
                            initial={{ strokeDashoffset: 2 * Math.PI * 35 }}
                            whileInView={{
                              strokeDashoffset: 2 * Math.PI * 35 * (1 - skill.percent / 100),
                            }}
                            transition={{ duration: 2, delay: index * 0.2 }}
                            style={{
                              filter: hoveredSkill?.id === skill.id 
                                ? `drop-shadow(0 0 10px ${skill.brandColor})`
                                : 'none',
                            }}
                      />
                    </svg>
                        
                        {/* Percentage in center */}
                        <motion.div
                          className="absolute inset-0 flex items-center justify-center"
                          animate={{
                            scale: hoveredSkill?.id === skill.id ? 1.1 : 1,
                          }}
                        >
                          <span 
                            className="text-2xl font-bold"
                            style={{ color: skill.brandColor }}
                          >
                            {skill.percent}%
                          </span>
                        </motion.div>
                  </div>
                    </div>

                    {/* Hover overlay with additional info */}
                    <AnimatePresence>
                      {hoveredSkill?.id === skill.id && (
                        <motion.div
                          className="absolute inset-0 rounded-2xl p-4 flex flex-col justify-center text-center backdrop-blur-sm"
                          style={{
                            background: `linear-gradient(135deg, ${skill.brandColor}F0, ${skill.glowColor}E6)`,
                            backdropFilter: 'blur(10px)',
                          }}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.9 }}
                          transition={{ duration: 0.3, ease: "easeOut" }}
                        >
                                                    <div className="relative z-10 antialiased">
                            <h4 className="font-bold text-lg mb-3 text-black drop-shadow-sm tracking-wide">{skill.fullName}</h4>
                            <div className="space-y-2">
                              <div className="font-semibold text-black drop-shadow-sm">
                                Growth: <span className="text-black font-bold">{skill.yearlyGrowth}</span>
                              </div>
                              <div className="text-sm text-black/90 leading-relaxed drop-shadow-sm px-1 font-medium">
                                {skill.expertise}
                              </div>
                    </div>
                  </div>
                          
                          {/* Better background overlay for text readability */}
                          <div 
                            className="absolute inset-0 rounded-2xl"
                            style={{
                              background: `linear-gradient(135deg, ${skill.brandColor}CC, ${skill.glowColor}AA)`,
                            }}
                          />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Enhanced Interactive Panel */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <AnimatePresence mode="wait">
              {activeSkill ? (
                <motion.div
                  key={activeSkill}
                  initial={{ opacity: 0, y: 20, rotateX: -15 }}
                  animate={{ opacity: 1, y: 0, rotateX: 0 }}
                  exit={{ opacity: 0, y: -20, rotateX: 15 }}
                  transition={{ duration: 0.4, type: "spring" }}
                  className="relative p-8 rounded-3xl border"
                  style={{
                    background: `linear-gradient(135deg, ${skills.find(s => s.id === activeSkill)?.brandColor}20, transparent)`,
                    borderColor: skills.find(s => s.id === activeSkill)?.brandColor,
                    boxShadow: `0 25px 50px ${skills.find(s => s.id === activeSkill)?.brandColor}30`,
                  }}
                >
                  {(() => {
                    const skill = skills.find(s => s.id === activeSkill);
                    return (
                      <div className="space-y-6">
                        {/* Header */}
                        <div className="flex items-center space-x-4">
                          <motion.div
                            className="w-16 h-16 rounded-xl flex items-center justify-center"
                            style={{
                              background: `linear-gradient(135deg, ${skill.brandColor}, ${skill.glowColor})`,
                  }}
                  animate={{
                              boxShadow: [
                                `0 0 20px ${skill.brandColor}60`,
                                `0 0 40px ${skill.brandColor}80`,
                                `0 0 20px ${skill.brandColor}60`,
                              ],
                            }}
                            transition={{ duration: 2, repeat: Infinity }}
                          >
                            <Icon name={skill.icon} size={32} className="text-black" />
                          </motion.div>
                          
                          <div>
                            <h3 className="text-2xl font-bold text-white">{skill.fullName}</h3>
                            <motion.div
                              className="text-lg font-semibold"
                              style={{ color: skill.brandColor }}
                              animate={{ opacity: [0.7, 1, 0.7] }}
                              transition={{ duration: 1.5, repeat: Infinity }}
                            >
                              {skill.percent}% Proficiency
                            </motion.div>
            </div>
          </div>

                        {/* Stats Grid */}
                        <div className="grid grid-cols-2 gap-4">
                          <motion.div
                            className="p-4 rounded-xl bg-white/5 border border-white/10"
                            whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.08)" }}
                          >
                            <div className="text-2xl font-bold text-white">{skill.projects}</div>
                            <div className="text-sm text-gray-400">Projects Completed</div>
                          </motion.div>
                          
              <motion.div
                            className="p-4 rounded-xl bg-white/5 border border-white/10"
                            whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.08)" }}
                          >
                            <div 
                              className="text-2xl font-bold"
                              style={{ color: skill.brandColor }}
                            >
                              {skill.yearlyGrowth}
                            </div>
                            <div className="text-sm text-gray-400">Annual Growth</div>
                          </motion.div>
                        </div>

                        {/* Expertise Details */}
                        <div className="space-y-3">
                          <h4 className="text-lg font-semibold text-white">Core Expertise</h4>
                          <motion.p
                            className="text-gray-300 leading-relaxed"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                          >
                            {skill.expertise}
                          </motion.p>
                        </div>

                        {/* Certifications */}
                        <div className="space-y-3">
                          <h4 className="text-lg font-semibold text-white">Certifications</h4>
                          <div className="flex flex-wrap gap-2">
                            {skill.certifications?.map((cert, index) => (
                              <motion.span
                                key={cert}
                                className="px-3 py-1 rounded-full text-sm font-medium"
                                style={{
                                  backgroundColor: `${skill.brandColor}30`,
                                  color: skill.brandColor,
                                  border: `1px solid ${skill.brandColor}60`,
                                }}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.3 + index * 0.1 }}
                                whileHover={{
                                  scale: 1.05,
                                  backgroundColor: `${skill.brandColor}50`,
                                }}
                              >
                                {cert}
                              </motion.span>
                            ))}
                        </div>
                        </div>
                      </div>
                  );
                })()}
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                  className="relative p-8 rounded-3xl border border-white/10 bg-gradient-to-br from-blue-500/10 to-purple-500/10 text-center"
                >
                  <motion.div
                    animate={{
                      scale: [1, 1.05, 1],
                      opacity: [0.5, 0.8, 0.5],
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 flex items-center justify-center"
                  >
                    <Icon name="MousePointer" size={32} className="text-blue-400" />
                  </motion.div>
                  
                  <h3 className="text-2xl font-bold text-white mb-4">Explore My Skills</h3>
                  <p className="text-gray-300 mb-6 leading-relaxed">
                    Hover over any skill card to see detailed expertise information, 
                    certifications, and growth metrics.
                  </p>

                  {/* Overall Stats */}
                  <div className="grid grid-cols-2 gap-6 mb-8">
                    <motion.div
                      className="text-center"
                      animate={{ y: [0, -5, 0] }}
                      transition={{ duration: 2, repeat: Infinity, delay: 0 }}
                    >
                      <div className="text-3xl font-bold text-blue-400 mb-1">6+</div>
                      <div className="text-sm text-gray-400">Core Technologies</div>
              </motion.div>
                    
                    <motion.div
                      className="text-center"
                      animate={{ y: [0, -5, 0] }}
                      transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                    >
                      <div className="text-3xl font-bold text-purple-400 mb-1">90%</div>
                      <div className="text-sm text-gray-400">Average Proficiency</div>
                    </motion.div>
            </div>

            <Link to="/skills-interactive-mastery-constellation">
              <Button 
                variant="outline" 
                      size="lg"
                      className="border-blue-400 text-blue-400 hover:bg-blue-400/10 group"
                    >
                      <Icon name="Compass" size={20} className="mr-2 group-hover:rotate-180 transition-transform duration-500" />
                Explore Full Skills Matrix
              </Button>
            </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SkillsConstellation;