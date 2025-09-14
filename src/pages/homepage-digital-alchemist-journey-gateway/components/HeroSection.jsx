import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';
import cmsContentService from '../../../services/cmsContentService';

const HeroSection = () => {
  const [imageOk, setImageOk] = useState(true);
  const [heroContent, setHeroContent] = useState({
    title: 'Digital Alchemist',
    subtitle: 'Transforming Ideas into Digital Excellence',
    description: 'I craft exceptional digital experiences that drive business growth and user engagement.',
    ctaText: 'Explore My Work',
    ctaLink: '/projects-showcase-gallery',
    backgroundImage: '/assets/images/hero.jpg'
  });

  useEffect(() => {
    const loadHeroContent = async () => {
      try {
        const result = await cmsContentService.getSectionContent('homepage', 'hero');
        if (result.success && result.data) {
          setHeroContent(prev => ({
            ...prev,
            ...result.data
          }));
          console.log('✅ Hero content loaded from CMS:', result.data, 'Source:', result.source);
        }
      } catch (error) {
        console.error('❌ Error loading hero content:', error);
      }
    };

    loadHeroContent();

    // Subscribe to content changes
    const unsubscribe = cmsContentService.subscribe((allContent) => {
      if (allContent.homepage?.hero) {
        setHeroContent(prev => ({
          ...prev,
          ...allContent.homepage.hero
        }));
        console.log('🔄 Hero content updated from CMS:', allContent.homepage.hero);
      }
    });

    return unsubscribe;
  }, []);

  return (
    <section className="relative bg-black text-white mb-0 overflow-hidden">
      {/* Grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.03)_1px,transparent_1px)] bg-[size:40px_40px] opacity-40"></div>

      {/* Mesh orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-24 -left-24 w-[20rem] h-[20rem] md:w-[28rem] md:h-[28rem] rounded-full bg-blue-500/15 blur-3xl" />
        <div className="absolute -bottom-32 -right-16 w-[24rem] h-[24rem] md:w-[34rem] md:h-[34rem] rounded-full bg-purple-500/15 blur-3xl" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[28rem] h-[28rem] md:w-[40rem] md:h-[40rem] rounded-full bg-amber-400/10 blur-3xl" />
      </div>

      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black"></div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 md:pt-28 pb-12 md:pb-16">
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Content */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            {/* Premium Badge */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm"
            >
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
              <span className="text-gray-300 font-medium text-sm">Available for Projects</span>
            </motion.div>

            {/* Main Headline */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="space-y-4"
            >
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight leading-tight">
                <span className="block text-white">{heroContent.title}</span>
                <span className="block text-blue-400">{heroContent.subtitle}</span>
              </h1>
              
              <p className="text-base md:text-xl text-gray-300 max-w-2xl leading-relaxed">
                {heroContent.description}
              </p>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 pt-2"
            >
              <Link to="/contact-multi-channel-collaboration-hub">
                <Button
                  size="lg"
                  className="bg-blue-600 text-white hover:bg-blue-500 transition-all duration-200 px-8 py-3"
                  iconName="Rocket"
                  iconPosition="left"
                >
                  Start Your Project
                </Button>
              </Link>

              <Link to={heroContent.ctaLink || "/projects-showcase-gallery"}>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-2 border-blue-400 text-blue-400 hover:bg-blue-400/10 hover:border-blue-300 transition-all duration-200 px-8 py-3"
                  iconName="Eye"
                  iconPosition="right"
                >
                  {heroContent.ctaText || "View My Work"}
                </Button>
              </Link>
            </motion.div>


          </motion.div>

          {/* Profile Photo */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="relative"
          >
            <div className="relative w-full max-w-sm mx-auto lg:max-w-md">
              {/* Profile photo with rounded edges */}
              {imageOk ? (
                <div className="relative group">
                  <img
                    src="/assets/images/hero.jpg"
                    alt="Burhan - Full-Stack Developer"
                    className="w-full h-auto rounded-[10px] border-2 border-white/10 transition-all duration-300 group-hover:border-blue-400 group-hover:shadow-lg group-hover:shadow-blue-400/25"
                    onError={() => setImageOk(false)}
                    loading="eager"
                  />
                  
                  {/* Online status indicator */}
                  <div className="absolute top-4 right-4">
                    <div className="w-4 h-4 bg-green-400 rounded-full border-2 border-white animate-pulse shadow-lg"></div>
                  </div>
                </div>
              ) : (
                <div className="relative group">
                  <div className="w-full aspect-[4/5] bg-gradient-to-br from-blue-600 to-blue-700 rounded-[10px] border-2 border-white/10 transition-all duration-300 group-hover:border-blue-400 group-hover:shadow-lg group-hover:shadow-blue-400/25 flex items-center justify-center">
                    <Icon name="User" size={80} className="text-white/80" />
                  </div>
                  
                  {/* Online status indicator */}
                  <div className="absolute top-4 right-4">
                    <div className="w-4 h-4 bg-green-400 rounded-full border-2 border-white animate-pulse shadow-lg"></div>
                  </div>
                </div>
              )}
            </div>

            {/* Client Review - Positioned under image */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.0 }}
              className="mt-6"
            >
              {/* Reza Review */}
              <div className="bg-white/5 border border-white/10 rounded-xl p-6 backdrop-blur-sm">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-teal-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                      R
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h4 className="text-white font-semibold">Reza</h4>
                      {/* 5 Yellow Stars */}
                      <div className="flex space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.3, delay: 1.2 + (i * 0.1) }}
                          >
                            <Icon name="Star" size={16} className="text-yellow-400 fill-current" />
                          </motion.div>
                        ))}
                      </div>
                    </div>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      "Working with Burhan was a pleasure! He understands exactly what clients want and delivers perfect solutions. His expertise in full-stack development is outstanding."
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;