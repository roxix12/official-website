import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const SkillProgressRings = () => {
  const [animatedValues, setAnimatedValues] = useState({});
  const [selectedCategory, setSelectedCategory] = useState('frontend');

  const skillCategories = [
    {
      id: 'frontend',
      name: 'Frontend Development',
      icon: 'Monitor',
      color: '#00D4FF',
      bgColor: 'bg-cyan-500/10',
      borderColor: 'border-cyan-500/30',
      skills: [
        { name: 'HTML/CSS', proficiency: 95, projects: 20, level: 'Expert' },
        { name: 'JavaScript', proficiency: 88, projects: 15, level: 'Advanced' },
        { name: 'React', proficiency: 85, projects: 6, level: 'Advanced' },
        { name: 'Liquid', proficiency: 90, projects: 8, level: 'Expert' }
      ]
    },
    {
      id: 'ecommerce',
      name: 'E-commerce Platforms',
      icon: 'ShoppingCart',
      color: '#10B981',
      bgColor: 'bg-emerald-500/10',
      borderColor: 'border-emerald-500/30',
      skills: [
        { name: 'Shopify', proficiency: 95, projects: 12, level: 'Expert' },
        { name: 'WooCommerce', proficiency: 80, projects: 5, level: 'Advanced' },
        { name: 'Payment Integration', proficiency: 85, projects: 8, level: 'Advanced' },
        { name: 'Analytics Setup', proficiency: 88, projects: 10, level: 'Expert' }
      ]
    },
    {
      id: 'backend',
      name: 'Backend & CMS',
      icon: 'Server',
      color: '#8B5CF6',
      bgColor: 'bg-purple-500/10',
      borderColor: 'border-purple-500/30',
      skills: [
        { name: 'PHP', proficiency: 78, projects: 7, level: 'Intermediate' },
        { name: 'WordPress', proficiency: 82, projects: 10, level: 'Advanced' },
        { name: 'Database Design', proficiency: 75, projects: 6, level: 'Intermediate' },
        { name: 'API Integration', proficiency: 80, projects: 9, level: 'Advanced' }
      ]
    },
    {
      id: 'optimization',
      name: 'Performance & SEO',
      icon: 'Gauge',
      color: '#F59E0B',
      bgColor: 'bg-amber-500/10',
      borderColor: 'border-amber-500/30',
      skills: [
        { name: 'Core Web Vitals', proficiency: 92, projects: 11, level: 'Expert' },
        { name: 'SEO Optimization', proficiency: 85, projects: 8, level: 'Advanced' },
        { name: 'Speed Optimization', proficiency: 90, projects: 9, level: 'Expert' },
        { name: 'Conversion Rate', proficiency: 88, projects: 7, level: 'Expert' }
      ]
    }
  ];

  const selectedCategoryData = skillCategories.find(cat => cat.id === selectedCategory);

  useEffect(() => {
    const timer = setTimeout(() => {
      const newAnimatedValues = {};
      skillCategories.forEach(category => {
        category.skills.forEach(skill => {
          newAnimatedValues[`${category.id}-${skill.name}`] = skill.proficiency;
        });
      });
      setAnimatedValues(newAnimatedValues);
    }, 300);

    return () => clearTimeout(timer);
  }, [selectedCategory]);

  const getLevelColor = (level) => {
    switch(level) {
      case 'Expert': return 'text-green-400';
      case 'Advanced': return 'text-blue-400';
      case 'Intermediate': return 'text-yellow-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <div className="bg-black text-white py-16">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">
            Technical <span className="text-cyan-400">Expertise</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Clean, focused view of my technical skills and real-world project experience
          </p>
        </div>

        {/* Category Selector */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {skillCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex items-center space-x-2 px-6 py-3 rounded-full border-2 transition-all duration-300 ${
                selectedCategory === category.id
                  ? `${category.bgColor} ${category.borderColor} text-white`
                  : 'border-gray-700 text-gray-400 hover:border-gray-600 hover:text-gray-300'
              }`}
            >
              <Icon name={category.icon} size={18} />
              <span className="font-medium">{category.name}</span>
            </button>
          ))}
        </div>

        {/* Selected Category Display */}
        <motion.div
          key={selectedCategory}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid lg:grid-cols-2 gap-12 items-center"
        >
          
          {/* Left Side - Category Info */}
          <div>
            <div className="flex items-center space-x-4 mb-8">
              <div 
                className="w-16 h-16 rounded-2xl flex items-center justify-center"
                style={{ backgroundColor: `${selectedCategoryData.color}20`, border: `2px solid ${selectedCategoryData.color}40` }}
              >
                <Icon 
                  name={selectedCategoryData.icon} 
                  size={32} 
                  style={{ color: selectedCategoryData.color }}
                />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">
                  {selectedCategoryData.name}
                </h3>
                <p className="text-gray-400">
                  {selectedCategoryData.skills.reduce((sum, skill) => sum + skill.projects, 0)} Total Projects
                </p>
              </div>
            </div>

            {/* Skills List */}
            <div className="space-y-6">
              {selectedCategoryData.skills.map((skill, index) => {
                const animatedValue = animatedValues[`${selectedCategory}-${skill.name}`] || 0;
                
                return (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="space-y-2"
                  >
                    <div className="flex justify-between items-center">
                      <h4 className="font-semibold text-white">{skill.name}</h4>
                      <div className="flex items-center space-x-3">
                        <span className={`text-sm font-medium ${getLevelColor(skill.level)}`}>
                          {skill.level}
                        </span>
                        <span className="text-gray-400 text-sm">
                          {skill.projects} projects
                        </span>
                      </div>
                    </div>
                    
                    {/* Skill Dots Visualization */}
                    <div className="flex items-center justify-between">
                      <div className="flex space-x-1">
                        {[...Array(10)].map((_, dotIndex) => (
                          <motion.div
                            key={dotIndex}
                            className="w-3 h-3 rounded-full"
                            style={{
                              backgroundColor: dotIndex < Math.round(animatedValue / 10) 
                                ? selectedCategoryData.color 
                                : '#374151'
                            }}
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ 
                              duration: 0.3, 
                              delay: index * 0.1 + dotIndex * 0.05 
                            }}
                          />
                        ))}
                      </div>
                      <div 
                        className="text-lg font-bold"
                        style={{ color: selectedCategoryData.color }}
                      >
                        {animatedValue}%
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Right Side - Visual Representation */}
          <div className="flex justify-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              {/* Main Circle */}
              <div className="w-80 h-80 relative">
                <svg className="w-full h-full transform -rotate-90">
                  {/* Background circle */}
                  <circle
                    cx="160"
                    cy="160"
                    r="140"
                    stroke="rgba(255,255,255,0.1)"
                    strokeWidth="4"
                    fill="none"
                  />
                  
                  {/* Skill arcs */}
                  {selectedCategoryData.skills.map((skill, index) => {
                    const animatedValue = animatedValues[`${selectedCategory}-${skill.name}`] || 0;
                    const startAngle = (index * 90) - 45;
                    const endAngle = startAngle + (animatedValue * 0.8);
                    const radius = 140 - (index * 20);
                    
                    const startX = 160 + radius * Math.cos((startAngle * Math.PI) / 180);
                    const startY = 160 + radius * Math.sin((startAngle * Math.PI) / 180);
                    const endX = 160 + radius * Math.cos((endAngle * Math.PI) / 180);
                    const endY = 160 + radius * Math.sin((endAngle * Math.PI) / 180);
                    
                    const largeArcFlag = endAngle - startAngle > 180 ? 1 : 0;
                    
                    return (
                      <motion.path
                        key={skill.name}
                        d={`M ${startX} ${startY} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${endX} ${endY}`}
                        stroke={selectedCategoryData.color}
                        strokeWidth="6"
                        fill="none"
                        strokeLinecap="round"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 1.5, delay: index * 0.2 }}
                        style={{ filter: `drop-shadow(0 0 6px ${selectedCategoryData.color}40)` }}
                      />
                    );
                  })}
                </svg>
                
                {/* Center content */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <div 
                    className="w-20 h-20 rounded-full flex items-center justify-center mb-4"
                    style={{ backgroundColor: `${selectedCategoryData.color}20` }}
                  >
                    <Icon 
                      name={selectedCategoryData.icon} 
                      size={40} 
                      style={{ color: selectedCategoryData.color }}
                    />
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white mb-1">
                      {Math.round(selectedCategoryData.skills.reduce((sum, skill) => sum + skill.proficiency, 0) / selectedCategoryData.skills.length)}%
                    </div>
                    <div className="text-gray-400 text-sm">
                      Average Proficiency
                    </div>
                  </div>
                </div>

                {/* Skill labels */}
                {selectedCategoryData.skills.map((skill, index) => {
                  const angle = (index * 90) - 45;
                  const labelRadius = 170;
                  const x = 160 + labelRadius * Math.cos((angle * Math.PI) / 180);
                  const y = 160 + labelRadius * Math.sin((angle * Math.PI) / 180);
                  
                  return (
                    <motion.div
                      key={skill.name}
                      className="absolute transform -translate-x-1/2 -translate-y-1/2"
                      style={{ left: x, top: y }}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                    >
                      <div className="bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-center">
                        <div className="text-white text-sm font-medium">
                          {skill.name}
                        </div>
                        <div 
                          className="text-xs font-bold"
                          style={{ color: selectedCategoryData.color }}
                        >
                          {animatedValues[`${selectedCategory}-${skill.name}`] || 0}%
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Summary Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 text-center"
        >
          {skillCategories.map((category) => (
            <div key={category.id} className="space-y-2">
              <div 
                className="text-2xl font-bold"
                style={{ color: category.color }}
              >
                {category.skills.reduce((sum, skill) => sum + skill.projects, 0)}
              </div>
              <div className="text-gray-400 text-sm">
                {category.name.split(' ')[0]} Projects
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default SkillProgressRings;