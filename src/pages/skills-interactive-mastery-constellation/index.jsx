import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';

import Footer from '../../components/ui/Footer';
import Icon from '../../components/AppIcon';
import SkillConstellation from './components/SkillConstellation';
import SkillProgressRings from './components/SkillProgressRings';
import LearningPathTimeline from './components/LearningPathTimeline';


import ContinuousLearning from './components/ContinuousLearning';

const SkillsInteractiveMasteryConstellation = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);

  const skillHighlights = [
    {
      category: 'E-commerce Expertise',
      description: 'Shopify verified expert with 50+ successful projects',
      icon: 'ShoppingBag',
      color: 'from-emerald-400 to-green-500',
      stats: '95% proficiency'
    },
    {
      category: 'Frontend Mastery',
      description: 'Modern JavaScript, React, and responsive design',
      icon: 'Monitor',
      color: 'from-cyan-400 to-blue-500',
      stats: '88% proficiency'
    },
    {
      category: 'Performance Optimization',
      description: 'Core Web Vitals expert with proven results',
      icon: 'Gauge',
      color: 'from-amber-400 to-orange-500',
      stats: '92% proficiency'
    },
    {
      category: 'Backend Development',
      description: 'PHP, WordPress, and database management',
      icon: 'Server',
      color: 'from-purple-400 to-pink-500',
      stats: '78% proficiency'
    },
    {
      category: 'Liquid Templating',
      description: 'Advanced Shopify theme customization',
      icon: 'Code',
      color: 'from-cyan-400 to-purple-500',
      stats: '90% proficiency'
    },
    {
      category: 'UI/UX Design',
      description: 'User-centered design and conversion optimization',
      icon: 'Palette',
      color: 'from-pink-400 to-rose-500',
      stats: '85% proficiency'
    },
    {
      category: 'SEO & Analytics',
      description: 'Search optimization and performance tracking',
      icon: 'TrendingUp',
      color: 'from-indigo-400 to-blue-500',
      stats: '87% proficiency'
    },
    {
      category: 'API Integration',
      description: 'Third-party services and custom integrations',
      icon: 'Zap',
      color: 'from-yellow-400 to-amber-500',
      stats: '82% proficiency'
    }
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const maxScroll = document.documentElement?.scrollHeight - window.innerHeight;
      const progress = (scrolled / maxScroll) * 100;
      setScrollProgress(progress);
      setIsScrolled(scrolled > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <Helmet>
        <title>Skills - Interactive Mastery Constellation | Cdw Burhan</title>
        <meta name="description" content="Explore Cdw Burhan's technical skills through an interactive constellation of expertise. From Shopify development to modern JavaScript frameworks, discover the journey of continuous learning and knowledge sharing." />
        <meta name="keywords" content="Shopify expert, JavaScript developer, React development, web performance, e-commerce optimization, technical skills, programming expertise" />
        <meta property="og:title" content="Skills - Interactive Mastery Constellation | Cdw Burhan" />
        <meta property="og:description" content="Interactive visualization of technical capabilities and learning journey. Explore skills in Shopify development, modern web technologies, and performance optimization." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="/skills-interactive-mastery-constellation" />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header />
        




        <main className="pt-16">
          {/* Hero Section */}
          <section className="pt-28 pb-20 px-6 lg:px-8 relative overflow-hidden">
            {/* Mesh orbs behind skills hero */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute -top-24 -left-24 w-[26rem] h-[26rem] rounded-full bg-blue-500/15 blur-3xl" />
              <div className="absolute -bottom-24 -right-16 w-[32rem] h-[32rem] rounded-full bg-purple-500/15 blur-3xl" />
              <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[40rem] h-[40rem] rounded-full bg-amber-400/10 blur-3xl" />
            </div>
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-16">
                <div className="inline-flex items-center space-x-2 bg-accent/10 text-accent px-4 py-2 rounded-full text-sm font-medium mb-6">
                  <Icon name="Star" size={16} />
                  <span>Interactive Skills Exploration</span>
                </div>
                
                <h1 className="text-4xl lg:text-6xl font-bold text-foreground mb-6">
                  Skills <span className="gradient-text">Constellation</span>
                </h1>
                
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
                  Explore my technical capabilities through an interactive journey of continuous learning, 
                  practical application, and knowledge sharing. From Shopify expertise to modern web technologies.
                </p>

                {/* Quick Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
                  {skillHighlights?.map((highlight, index) => (
                    <div key={index} className="bg-card border border-border rounded-xl p-6 hover:border-accent/50 transition-colors">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${highlight?.color} flex items-center justify-center mx-auto mb-3`}>
                        <Icon name={highlight?.icon} size={24} className="text-white" />
                      </div>
                      <h3 className="text-lg font-bold text-foreground mb-2">{highlight?.category}</h3>
                      <p className="text-sm text-muted-foreground mb-3">{highlight?.description}</p>
                      <div className="text-accent font-semibold text-sm">{highlight?.stats}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Skill Constellation */}
          <section id="constellation" className="py-20 px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-foreground mb-4">Interactive Skill Constellation</h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Explore the interconnected web of my technical skills. Click on any node to discover 
                  detailed information about proficiency levels, projects, and achievements.
                </p>
              </div>
              <SkillConstellation />
            </div>
          </section>

          {/* Proficiency Levels */}
          <section id="proficiency" className="py-20 px-6 lg:px-8 bg-muted/20">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-foreground mb-4">Proficiency Levels</h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Detailed breakdown of skill levels across different technology categories, 
                  with real project experience and continuous improvement tracking.
                </p>
              </div>
              <SkillProgressRings />
            </div>
          </section>

          {/* Learning Path Timeline */}
          <section id="learning-path" className="py-20 px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-foreground mb-4">Learning Journey Timeline</h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Follow the authentic path of skill acquisition, from first encounters to mastery. 
                  Each milestone represents real challenges overcome and knowledge gained.
                </p>
              </div>
              <LearningPathTimeline />
            </div>
          </section>





          {/* Continuous Learning */}
          <section id="continuous-learning" className="py-20 px-6 lg:px-8 bg-muted/20">
            <div className="max-w-7xl mx-auto">
              <ContinuousLearning />
            </div>
          </section>

          {/* Call to Action */}
          <section className="py-20 px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <div className="bg-gradient-to-r from-accent/10 to-neon-purple/10 rounded-3xl p-12 border border-accent/20">
                <div className="w-20 h-20 bg-gradient-to-br from-accent to-neon-purple rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Icon name="Rocket" size={40} className="text-white" />
                </div>
                
                <h2 className="text-3xl font-bold text-foreground mb-4">
                  Ready to Build Something Amazing?
                </h2>
                
                <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                  Let's combine these skills to create exceptional digital experiences. Whether it's a complex e-commerce solution or a cutting-edge web application, 
                  I'm ready to bring your vision to life.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button className="flex items-center justify-center space-x-2 px-8 py-4 bg-gradient-to-r from-accent to-neon-purple text-black rounded-lg font-semibold hover:shadow-neon transition-all duration-300 hover:scale-105">
                    <Icon name="MessageCircle" size={20} />
                    <span>Start a Project</span>
                  </button>
                  
                  <button className="flex items-center justify-center space-x-2 px-8 py-4 border border-accent text-accent rounded-lg font-semibold hover:bg-accent/10 transition-colors">
                    <Icon name="Calendar" size={20} />
                    <span>Schedule Consultation</span>
                  </button>
                </div>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default SkillsInteractiveMasteryConstellation;