import React, { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useInView } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const TimelinePreview = () => {
  const [hoveredMilestone, setHoveredMilestone] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.3 });

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 25, stiffness: 700 };
  const mouseXSpring = useSpring(mouseX, springConfig);
  const mouseYSpring = useSpring(mouseY, springConfig);

  const milestones = [
    {
      id: 1,
      year: "2019",
      title: "First Client Success",
      description: "Transformed a local business with my first Shopify store, proving that determination could overcome any technical challenge.",
      icon: "Trophy",
      color: "from-yellow-400 to-orange-500",
      bgColor: "bg-yellow-500/10",
      borderColor: "border-yellow-500/30",
      textColor: "text-yellow-400",
      impact: "$50K+",
      metric: "Revenue Generated",
      story: "With just a borrowed computer and endless determination, I delivered my first client project. The $500 payment felt like a million dollars - validation that I could turn code into real business value.",
      particles: 25
    },
    {
      id: 2,
      year: "2021",
      title: "Shopify Expert Verification",
      description: "Achieved official Shopify Expert status, joining an elite community of verified developers worldwide.",
      icon: "Award",
      color: "from-purple-400 to-pink-500",
      bgColor: "bg-purple-500/10",
      borderColor: "border-purple-500/30",
      textColor: "text-purple-400",
      impact: "Top 5%",
      metric: "Global Developers",
      story: "After dozens of successful projects and countless late nights learning, Shopify recognized my expertise. This badge opened doors I never imagined possible.",
      particles: 30
    },
    {
      id: 3,
      year: "2023",
      title: "Community Impact",
      description: "Launched free educational resources, helping 500+ aspiring developers start their journey.",
      icon: "Users",
      color: "from-blue-400 to-cyan-500",
      bgColor: "bg-blue-500/10",
      borderColor: "border-blue-500/30",
      textColor: "text-blue-400",
      impact: "500+",
      metric: "Developers Mentored",
      story: "Remembering my own struggles, I created free tutorials and mentorship programs. Watching others succeed using my guidance became more rewarding than any client payment.",
      particles: 35
    },
    {
      id: 4,
      year: "2024",
      title: "Global Recognition",
      description: "Featured in Shopify's success stories, inspiring developers across 25+ countries.",
      icon: "Globe",
      color: "from-green-400 to-emerald-500",
      bgColor: "bg-green-500/10",
      borderColor: "border-green-500/30",
      textColor: "text-green-400",
      impact: "25+",
      metric: "Countries Reached",
      story: "From a small town with limited resources to being featured by Shopify globally. The journey that started with borrowed dreams had become an inspiration for thousands.",
      particles: 40
    }
  ];

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        setMousePosition({ x, y });
        mouseX.set(x);
        mouseY.set(y);
      }
    };

    const element = sectionRef.current;
    if (element) {
      element.addEventListener('mousemove', handleMouseMove);
      return () => element.removeEventListener('mousemove', handleMouseMove);
    }
  }, [mouseX, mouseY]);

  // Auto-advance timeline
  useEffect(() => {
    if (!isInView) return;
    
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % milestones.length);
    }, 4000);
    
    return () => clearInterval(interval);
  }, [isInView, milestones.length]);

  const FloatingParticle = ({ delay, duration, milestone }) => (
    <motion.div
      className={`absolute w-1 h-1 ${milestone.bgColor} rounded-full`}
      initial={{ 
        opacity: 0, 
        scale: 0,
        x: Math.random() * 400 - 200,
        y: Math.random() * 300 - 150
      }}
      animate={{ 
        opacity: [0, 1, 0], 
        scale: [0, 1, 0],
        x: Math.random() * 600 - 300,
        y: Math.random() * 400 - 200,
        rotate: 360
      }}
      transition={{ 
        duration: duration || 3, 
        delay: delay || 0, 
        repeat: Infinity,
        ease: "easeInOut"
      }}
    />
  );

  return (
    <section ref={sectionRef} className="relative py-20 bg-gradient-to-br from-slate-900/50 via-slate-800/30 to-slate-900/50 overflow-hidden">
      {/* Dynamic Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Animated Grid */}
        <motion.div 
          className="absolute inset-0 opacity-10"
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%']
          }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.3) 1px, transparent 0)',
            backgroundSize: '50px 50px'
          }}
        />
        
        {/* Mouse Follower Effect */}
        <motion.div
          className="absolute w-96 h-96 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 blur-3xl"
          style={{
            x: mouseXSpring,
            y: mouseYSpring,
            translateX: '-50%',
            translateY: '-50%'
          }}
        />

        {/* Floating Orbs */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-32 h-32 rounded-full bg-gradient-to-r from-cyan-500/5 to-blue-500/5 blur-xl"
            animate={{
              x: [0, 100, 0],
              y: [0, -100, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              delay: i * 1.5
            }}
            style={{
              left: `${10 + i * 15}%`,
              top: `${10 + i * 10}%`
            }}
          />
        ))}
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        {/* Enhanced Section Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="relative">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white relative z-10">
                <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                  The Journey of
                </span>
                <br />
                <span className="relative inline-block">
                  <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                    Transformation
                  </span>
                  <motion.div
                    className="absolute -inset-1 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 blur-lg -z-10"
                    animate={{ opacity: [0.3, 0.8, 0.3] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  />
                </span>
              </h2>
            </div>
            
            <motion.p 
              className="text-xl text-slate-100 max-w-4xl mx-auto leading-relaxed antialiased drop-shadow-sm"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              viewport={{ once: true }}
              style={{ 
                textRendering: 'optimizeLegibility',
                backfaceVisibility: 'hidden'
              }}
            >
              Every milestone tells a story of persistence, learning, and the power of authentic determination over privilege.
            </motion.p>

            {/* Progress Indicator */}
            <div className="flex justify-center space-x-2 mt-8">
              {milestones.map((_, index) => (
                <motion.div
                  key={index}
                  className={`w-3 h-3 rounded-full cursor-pointer transition-all duration-300 ${
                    index === activeIndex ? 'bg-blue-400 scale-125' : 'bg-slate-600'
                  }`}
                  whileHover={{ scale: 1.2 }}
                  onClick={() => setActiveIndex(index)}
                />
              ))}
            </div>
          </motion.div>
        </div>

        {/* Enhanced Timeline */}
        <div className="relative">
          {/* Dynamic Timeline Line */}
          <motion.div 
            className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-blue-400 via-purple-400 to-green-400 hidden lg:block"
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            transition={{ duration: 2, ease: "easeOut" }}
            viewport={{ once: true }}
            style={{ transformOrigin: 'top' }}
          />

          {/* Progress Line */}
          <motion.div 
            className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b from-blue-400 to-purple-400 hidden lg:block z-10"
            initial={{ height: 0 }}
            animate={{ height: `${((activeIndex + 1) / milestones.length) * 100}%` }}
            transition={{ duration: 1, ease: "easeInOut" }}
          />

          <div className="space-y-16 lg:space-y-24">
            {milestones.map((milestone, index) => (
              <motion.div
                key={milestone.id}
                initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ 
                  duration: 0.8, 
                  delay: index * 0.2,
                  type: "spring",
                  bounce: 0.4
                }}
                viewport={{ once: true }}
                className={`relative flex items-center ${
                  index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                }`}
                onMouseEnter={() => setHoveredMilestone(milestone.id)}
                onMouseLeave={() => setHoveredMilestone(null)}
              >
                {/* Enhanced Timeline Node */}
                <motion.div 
                  className={`absolute left-1/2 transform -translate-x-1/2 w-8 h-8 rounded-full border-4 border-background z-20 hidden lg:flex items-center justify-center ${milestone.bgColor}`}
                  whileHover={{ scale: 1.5 }}
                  animate={index === activeIndex ? {
                    scale: [1, 1.3, 1],
                    boxShadow: [
                      '0 0 0 0 rgba(59, 130, 246, 0.7)',
                      '0 0 0 20px rgba(59, 130, 246, 0)',
                      '0 0 0 0 rgba(59, 130, 246, 0.7)'
                    ]
                  } : {}}
                  transition={{ duration: 2, repeat: index === activeIndex ? Infinity : 0 }}
                >
                  <motion.div
                    className={`w-4 h-4 rounded-full bg-gradient-to-r ${milestone.color}`}
                    animate={{ rotate: 360 }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  />
                </motion.div>

                {/* Floating Particles around active milestone */}
                {(hoveredMilestone === milestone.id || index === activeIndex) && (
                  <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                    {[...Array(milestone.particles)].map((_, i) => (
                      <FloatingParticle
                        key={`${milestone.id}-${i}`}
                        delay={i * 0.1}
                        duration={2 + Math.random() * 2}
                        milestone={milestone}
                      />
                    ))}
                  </div>
                )}

                {/* Enhanced Content Card */}
                <div className={`w-full lg:w-5/12 ${index % 2 === 0 ? 'lg:pr-12' : 'lg:pl-12'}`}>
                  <motion.div 
                    className={`relative group ${milestone.bgColor} ${milestone.borderColor} border-2 rounded-2xl p-8 transition-all duration-500 backdrop-blur-sm`}
                    whileHover={{ 
                      scale: 1.05,
                      rotateY: index % 2 === 0 ? 5 : -5,
                      z: 50
                    }}
                    animate={index === activeIndex ? {
                      boxShadow: [
                        '0 0 0 0 rgba(59, 130, 246, 0.4)',
                        '0 0 30px 10px rgba(59, 130, 246, 0.1)',
                        '0 0 0 0 rgba(59, 130, 246, 0.4)'
                      ]
                    } : {}}
                    transition={{ duration: 2, repeat: index === activeIndex ? Infinity : 0 }}
                    style={{ transformStyle: 'preserve-3d' }}
                  >
                    {/* Holographic Border Effect */}
                    <motion.div
                      className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/10 to-transparent"
                      animate={hoveredMilestone === milestone.id ? {
                        x: [-200, 200],
                        opacity: [0, 1, 0]
                      } : {}}
                      transition={{ duration: 1.5, ease: "easeInOut" }}
                    />

                    <div className="relative space-y-6">
                      {/* Icon and Year Header */}
                      <div className="flex items-center justify-between">
                        <motion.div 
                          className={`w-16 h-16 rounded-xl bg-gradient-to-br ${milestone.color} flex items-center justify-center shadow-lg`}
                          whileHover={{ rotate: 360, scale: 1.1 }}
                          transition={{ duration: 0.6 }}
                        >
                          <Icon name={milestone.icon} size={28} className="text-white drop-shadow-lg" />
                        </motion.div>
                        
                        <motion.div
                          className="text-right"
                          initial={{ opacity: 0, x: 20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.2 }}
                        >
                          <div className={`text-3xl font-bold ${milestone.textColor}`}>
                            {milestone.year}
                          </div>
                          <div className="text-sm text-slate-200 antialiased">
                            {milestone.metric}
                          </div>
                        </motion.div>
                      </div>

                      {/* Title and Description */}
                      <div className="space-y-4">
                        <motion.h3 
                          className="text-2xl font-bold text-white drop-shadow-sm antialiased"
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.3 }}
                          style={{ 
                            textRendering: 'optimizeLegibility',
                            backfaceVisibility: 'hidden'
                          }}
                        >
                          {milestone.title}
                        </motion.h3>
                        
                        <motion.p 
                          className="text-slate-200 leading-relaxed antialiased drop-shadow-sm"
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.4 }}
                          style={{ 
                            textRendering: 'optimizeLegibility',
                            backfaceVisibility: 'hidden'
                          }}
                        >
                          {milestone.description}
                        </motion.p>
                      </div>

                      {/* Impact Metrics */}
                      <motion.div
                        className={`inline-flex items-center space-x-3 px-4 py-2 rounded-full ${milestone.bgColor} border ${milestone.borderColor}`}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5 }}
                      >
                        <span className={`text-2xl font-bold ${milestone.textColor}`}>
                          {milestone.impact}
                        </span>
                        <span className="text-sm text-slate-400">
                          {milestone.metric}
                        </span>
                      </motion.div>

                      {/* Enhanced Story Snippet */}
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{
                          height: hoveredMilestone === milestone.id ? 'auto' : 0,
                          opacity: hoveredMilestone === milestone.id ? 1 : 0
                        }}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className={`pt-6 border-t ${milestone.borderColor} space-y-3`}>
                          <div className="flex items-center space-x-2">
                            <motion.div
                              className={`w-2 h-2 rounded-full bg-gradient-to-r ${milestone.color}`}
                              animate={{ scale: [1, 1.5, 1] }}
                              transition={{ duration: 1, repeat: Infinity }}
                            />
                            <span className={`text-sm font-semibold ${milestone.textColor}`}>
                              Behind the Scenes
                            </span>
                          </div>
                          <p className="text-sm text-slate-100 italic leading-relaxed antialiased drop-shadow-sm">
                            "{milestone.story}"
                          </p>
                        </div>
                      </motion.div>
                    </div>
                  </motion.div>
                </div>

                {/* Mobile Timeline Indicator */}
                <motion.div 
                  className={`w-6 h-6 rounded-full border-4 border-background absolute left-6 top-8 lg:hidden ${milestone.bgColor}`}
                  whileHover={{ scale: 1.3 }}
                  animate={index === activeIndex ? {
                    scale: [1, 1.2, 1],
                    boxShadow: [
                      '0 0 0 0 rgba(59, 130, 246, 0.7)',
                      '0 0 0 10px rgba(59, 130, 246, 0)',
                      '0 0 0 0 rgba(59, 130, 246, 0.7)'
                    ]
                  } : {}}
                  transition={{ duration: 2, repeat: index === activeIndex ? Infinity : 0 }}
                />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Achievement Summary */}
        <motion.div
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {milestones.map((milestone, index) => (
              <motion.div
                key={`summary-${milestone.id}`}
                className={`p-6 rounded-xl ${milestone.bgColor} border ${milestone.borderColor} backdrop-blur-sm`}
                whileHover={{ scale: 1.05, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <div className={`text-3xl font-bold ${milestone.textColor} mb-2`}>
                  {milestone.impact}
                </div>
                <div className="text-sm text-slate-200 antialiased">
                  {milestone.metric}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TimelinePreview;