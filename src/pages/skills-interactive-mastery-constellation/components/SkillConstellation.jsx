import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const SkillConstellation = () => {
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [hoveredSkill, setHoveredSkill] = useState(null);
  const [animationPhase, setAnimationPhase] = useState(0);
  const [pulsePhase, setPulsePhase] = useState(0);

  const coreSkills = [
    {
      id: 'shopify',
      name: 'Shopify Expert',
      category: 'E-commerce',
      proficiency: 95,
      isCore: true,
      verified: true,
      position: { x: 50, y: 50 },
      connections: ['liquid', 'javascript', 'react', 'optimization'],
      achievements: [
        'Shopify Partner Expert Status',
        '50+ Theme Customizations',
        'App Integration Specialist',
        'Performance Optimization Expert'
      ],
      projects: 12,
      yearsExperience: 4,
      icon: 'ShoppingBag',
      color: '#10B981',
      glowColor: 'rgba(16, 185, 129, 0.6)'
    },
    {
      id: 'liquid',
      name: 'Liquid Templating',
      category: 'Frontend',
      proficiency: 90,
      position: { x: 25, y: 30 },
      connections: ['shopify', 'javascript'],
      achievements: [
        'Custom Theme Development',
        'Dynamic Content Rendering',
        'Advanced Filter Logic'
      ],
      projects: 8,
      yearsExperience: 3,
      icon: 'Code',
      color: '#00D4FF',
      glowColor: 'rgba(0, 212, 255, 0.6)'
    },
    {
      id: 'javascript',
      name: 'JavaScript',
      category: 'Programming',
      proficiency: 88,
      position: { x: 75, y: 25 },
      connections: ['react', 'shopify', 'liquid', 'wordpress'],
      achievements: [
        'ES6+ Mastery',
        'DOM Manipulation Expert',
        'API Integration Specialist'
      ],
      projects: 15,
      yearsExperience: 4,
      icon: 'Zap',
      color: '#8B5CF6',
      glowColor: 'rgba(139, 92, 246, 0.6)'
    },
    {
      id: 'react',
      name: 'React',
      category: 'Frontend Framework',
      proficiency: 85,
      position: { x: 80, y: 70 },
      connections: ['javascript', 'shopify'],
      achievements: [
        'Component Architecture',
        'State Management',
        'Performance Optimization'
      ],
      projects: 6,
      yearsExperience: 2,
      icon: 'Atom',
      color: '#00D4FF',
      glowColor: 'rgba(0, 212, 255, 0.6)'
    },
    {
      id: 'wordpress',
      name: 'WordPress',
      category: 'CMS',
      proficiency: 82,
      position: { x: 20, y: 75 },
      connections: ['php', 'javascript'],
      achievements: [
        'Custom Theme Development',
        'Plugin Integration',
        'Performance Optimization'
      ],
      projects: 10,
      yearsExperience: 3,
      icon: 'Globe',
      color: '#8B5CF6',
      glowColor: 'rgba(139, 92, 246, 0.6)'
    },
    {
      id: 'php',
      name: 'PHP',
      category: 'Backend',
      proficiency: 78,
      position: { x: 15, y: 55 },
      connections: ['wordpress'],
      achievements: [
        'Server-side Logic',
        'Database Integration',
        'Custom Functionality'
      ],
      projects: 7,
      yearsExperience: 2,
      icon: 'Server',
      color: '#8B5CF6',
      glowColor: 'rgba(139, 92, 246, 0.6)'
    },
    {
      id: 'optimization',
      name: 'Performance Optimization',
      category: 'Technical',
      proficiency: 92,
      position: { x: 85, y: 45 },
      connections: ['shopify', 'javascript'],
      achievements: [
        'Core Web Vitals Expert',
        'Speed Optimization',
        'SEO Enhancement'
      ],
      projects: 11,
      yearsExperience: 3,
      icon: 'Gauge',
      color: '#F59E0B',
      glowColor: 'rgba(245, 158, 11, 0.6)'
    }
  ];

  // Animation effects
  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationPhase(prev => (prev + 1) % 3);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const pulseInterval = setInterval(() => {
      setPulsePhase(prev => (prev + 1) % coreSkills.length);
    }, 800);
    return () => clearInterval(pulseInterval);
  }, []);

  const getConnectionPath = (skill1, skill2) => {
    const dx = skill2?.position?.x - skill1?.position?.x;
    const dy = skill2?.position?.y - skill1?.position?.y;
    const midX = skill1?.position?.x + dx * 0.5;
    const midY = skill1?.position?.y + dy * 0.5 - 8;
    
    return `M ${skill1?.position?.x} ${skill1?.position?.y} Q ${midX} ${midY} ${skill2?.position?.x} ${skill2?.position?.y}`;
  };

  const renderConnections = () => {
    const connections = [];
    coreSkills?.forEach(skill => {
      skill?.connections?.forEach(connectionId => {
        const connectedSkill = coreSkills?.find(s => s?.id === connectionId);
        if (connectedSkill) {
          const isActive = selectedSkill && (selectedSkill?.id === skill?.id || selectedSkill?.id === connectionId);
          const isHovered = hoveredSkill && (hoveredSkill?.id === skill?.id || hoveredSkill?.id === connectionId);
          
          connections?.push(
            <motion.path
              key={`${skill?.id}-${connectionId}`}
              d={getConnectionPath(skill, connectedSkill)}
              stroke={isActive || isHovered ? '#00D4FF' : 'rgba(0, 212, 255, 0.2)'}
              strokeWidth={isActive || isHovered ? "3" : "1.5"}
              fill="none"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ 
                pathLength: 1, 
                opacity: isActive || isHovered ? 0.8 : 0.3,
                filter: isActive || isHovered ? 'drop-shadow(0 0 8px rgba(0, 212, 255, 0.8))' : 'none'
              }}
              transition={{ duration: 1.5, delay: Math.random() * 0.5 }}
              className="transition-all duration-500"
            />
          );
        }
      });
    });
    return connections;
  };

  return (
    <div className="relative w-full h-[700px] bg-gradient-to-br from-black via-gray-900 to-black rounded-3xl border border-cyan-400/20 overflow-hidden backdrop-blur-xl shadow-2xl shadow-cyan-500/10">
      
      {/* Animated Background */}
      <div className="absolute inset-0">
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.03]">
          <div 
            className="absolute inset-0"
            style={{
              backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(0,212,255,0.3) 1px, transparent 0)',
              backgroundSize: '40px 40px'
            }}
          />
        </div>
        
        {/* Floating Orbs */}
        <motion.div 
          className="absolute top-20 left-20 w-40 h-40 bg-cyan-500/10 rounded-full blur-3xl"
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
          className="absolute bottom-20 right-20 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl"
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

      {/* Header */}
      <div className="relative z-10 text-center pt-8 pb-4">
        <motion.h3 
          className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-2"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Interactive Skills Network
        </motion.h3>
        <motion.p 
          className="text-gray-400 text-sm max-w-2xl mx-auto px-4"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Explore the interconnected web of my technical skills. Click on any node to discover detailed information about proficiency levels, projects, and achievements.
        </motion.p>
      </div>

      {/* Legend */}
      <div className="absolute top-4 right-4 z-20 bg-gradient-to-br from-gray-900/80 via-gray-800/60 to-gray-900/80 backdrop-blur-xl border border-cyan-400/20 rounded-xl p-4">
        <h4 className="text-white font-semibold mb-2 text-sm">Legend</h4>
        <div className="space-y-2 text-xs">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-cyan-400 rounded-full"></div>
            <span className="text-gray-300">Core Skill Connection</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-emerald-400 rounded-full"></div>
            <span className="text-gray-300">Verified</span>
          </div>
        </div>
      </div>

      {/* SVG Constellation */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Connection Lines */}
        <g className="connections">
          {renderConnections()}
        </g>

        {/* Skill Nodes */}
        <g className="skill-nodes">
          {coreSkills?.map((skill, index) => (
            <g key={skill?.id} className="skill-node">
              
              {/* Pulsing Outer Ring */}
              {pulsePhase === index && (
                <motion.circle
                  cx={skill?.position?.x}
                  cy={skill?.position?.y}
                  r="0"
                  fill="none"
                  stroke={skill?.color}
                  strokeWidth="2"
                  opacity="0.6"
                  animate={{ 
                    r: [0, 12, 0],
                    opacity: [0.6, 0, 0]
                  }}
                  transition={{ 
                    duration: 2,
                    ease: "easeOut"
                  }}
                />
              )}
              
              {/* Skill Level Ring */}
              <circle
                cx={skill?.position?.x}
                cy={skill?.position?.y}
                r="7"
                fill="none"
                stroke={skill?.color}
                strokeWidth="2"
                strokeDasharray={`${(skill?.proficiency / 100) * 44} 44`}
                strokeDashoffset="0"
                transform={`rotate(-90 ${skill?.position?.x} ${skill?.position?.y})`}
                className="transition-all duration-500"
                opacity="0.7"
              />
              
              {/* Main Node */}
              <motion.circle
                cx={skill?.position?.x}
                cy={skill?.position?.y}
                r={skill?.isCore ? "5.5" : "4.5"}
                fill={selectedSkill?.id === skill?.id ? skill?.color : `${skill?.color}CC`}
                className="cursor-pointer transition-all duration-300"
                onClick={() => setSelectedSkill(selectedSkill?.id === skill?.id ? null : skill)}
                onMouseEnter={() => setHoveredSkill(skill)}
                onMouseLeave={() => setHoveredSkill(null)}
                whileHover={{ 
                  scale: 1.3,
                  filter: `drop-shadow(0 0 15px ${skill?.glowColor})`
                }}
                whileTap={{ scale: 0.9 }}
                style={{ 
                  filter: hoveredSkill?.id === skill?.id || selectedSkill?.id === skill?.id 
                    ? `drop-shadow(0 0 10px ${skill?.glowColor})` 
                    : 'none'
                }}
              />
              
              {/* Verified Badge */}
              {skill?.verified && (
                <motion.circle
                  cx={skill?.position?.x + 4}
                  cy={skill?.position?.y - 4}
                  r="2"
                  fill="#10B981"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                />
              )}
              
              {/* Skill Label */}
              <motion.text
                x={skill?.position?.x}
                y={skill?.position?.y + 12}
                textAnchor="middle"
                className="fill-white text-[3px] font-medium"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 + index * 0.1 }}
              >
                {skill?.name}
              </motion.text>
            </g>
          ))}
        </g>
      </svg>

      {/* Skill Detail Panel */}
      <AnimatePresence>
        {selectedSkill && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="absolute bottom-6 left-6 right-6 z-30"
          >
            <div className="relative bg-gradient-to-br from-gray-900/95 via-gray-800/90 to-gray-900/95 backdrop-blur-xl border border-cyan-400/30 rounded-2xl p-6 shadow-2xl shadow-cyan-500/20">
              {/* Glow Effect */}
              <div 
                className="absolute inset-0 rounded-2xl blur-xl opacity-20"
                style={{ background: selectedSkill?.glowColor }}
              />
              
              <div className="relative grid md:grid-cols-2 gap-6">
                {/* Left Column */}
                <div>
                  <div className="flex items-center space-x-3 mb-4">
                    <div 
                      className="w-12 h-12 rounded-xl flex items-center justify-center shadow-lg"
                      style={{ backgroundColor: `${selectedSkill?.color}20`, border: `2px solid ${selectedSkill?.color}` }}
                    >
                      <Icon name={selectedSkill?.icon} size={24} style={{ color: selectedSkill?.color }} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">{selectedSkill?.name}</h3>
                      <p className="text-gray-400 text-sm">{selectedSkill?.category}</p>
                    </div>
                    {selectedSkill?.verified && (
                      <div className="flex items-center space-x-1 bg-emerald-500/20 px-2 py-1 rounded-full">
                        <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                        <span className="text-emerald-400 text-xs font-medium">Verified</span>
                      </div>
                    )}
                  </div>
                  
                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold" style={{ color: selectedSkill?.color }}>
                        {selectedSkill?.proficiency}%
                      </div>
                      <div className="text-gray-400 text-xs">Proficiency</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-cyan-400">
                        {selectedSkill?.projects}
                      </div>
                      <div className="text-gray-400 text-xs">Projects</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-400">
                        {selectedSkill?.yearsExperience}
                      </div>
                      <div className="text-gray-400 text-xs">Years</div>
                    </div>
                  </div>
                </div>

                {/* Right Column */}
                <div>
                  <h4 className="text-white font-semibold mb-3">Key Achievements</h4>
                  <div className="space-y-2">
                    {selectedSkill?.achievements?.map((achievement, index) => (
                      <motion.div
                        key={index}
                        className="flex items-center space-x-2"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: selectedSkill?.color }}></div>
                        <span className="text-gray-300 text-sm">{achievement}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Close Button */}
              <button
                onClick={() => setSelectedSkill(null)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-700/50 hover:bg-gray-600/50 flex items-center justify-center transition-colors"
              >
                <Icon name="X" size={16} className="text-gray-400" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SkillConstellation;