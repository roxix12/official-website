import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const TransformationMetrics = () => {
  const [counters, setCounters] = useState({
    businesses: 0,
    revenue: 0,
    countries: 0,
    satisfaction: 0
  });

  const finalValues = {
    businesses: 150,
    revenue: 250,
    countries: 25,
    satisfaction: 98
  };

  useEffect(() => {
    const duration = 2000; // 2 seconds
    const steps = 60; // 60 steps for smooth animation
    const stepDuration = duration / steps;

    const intervals = Object.keys(finalValues)?.map(key => {
      const increment = finalValues?.[key] / steps;
      let currentValue = 0;
      
      return setInterval(() => {
        currentValue += increment;
        if (currentValue >= finalValues?.[key]) {
          currentValue = finalValues?.[key];
          clearInterval(intervals?.find(interval => interval === this));
        }
        
        setCounters(prev => ({
          ...prev,
          [key]: Math.floor(currentValue)
        }));
      }, stepDuration);
    });

    return () => intervals?.forEach(interval => clearInterval(interval));
  }, []);

  const metrics = [
    {
      id: 'businesses',
      value: counters?.businesses,
      suffix: '+',
      label: 'Businesses Transformed',
      description: 'From small startups to established enterprises, each project tells a story of digital transformation.',
      icon: 'TrendingUp',
      color: 'neon-blue',
      gradient: 'from-neon-blue to-neon-blue/80'
    },
    {
      id: 'revenue',
      value: counters?.revenue,
      suffix: '%',
      label: 'Average Revenue Increase',
      description: 'Clients typically see significant revenue growth within 6 months of project completion.',
      icon: 'DollarSign',
      color: 'electric-gold',
      gradient: 'from-electric-gold to-electric-gold/80'
    },
    {
      id: 'countries',
      value: counters?.countries,
      suffix: '+',
      label: 'Countries Served',
      description: 'Global reach with local understanding, serving clients across five continents.',
      icon: 'Globe',
      color: 'neon-purple',
      gradient: 'from-neon-purple to-neon-purple/80'
    },
    {
      id: 'satisfaction',
      value: counters?.satisfaction,
      suffix: '%',
      label: 'Client Satisfaction',
      description: 'Measured through project completion rates, referrals, and long-term partnerships.',
      icon: 'Heart',
      color: 'neon-blue',
      gradient: 'from-neon-blue to-neon-purple'
    }
  ];

  return (
    <section className="py-16 bg-card/20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Impact by the <span className="gradient-text">Numbers</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Every metric represents real businesses transformed, real people empowered, and real dreams made digital reality.
            </p>
          </motion.div>
        </div>

        {/* Metrics Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {metrics?.map((metric, index) => (
            <motion.div
              key={metric?.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="bg-card border border-border rounded-xl p-6 text-center hover:border-accent/50 transition-all duration-300 hover:shadow-neon">
                {/* Icon */}
                <div className="relative mb-6">
                  <div className={`w-16 h-16 mx-auto rounded-full bg-gradient-to-br ${metric?.gradient} flex items-center justify-center shadow-lg group-hover:shadow-neon transition-all duration-300`}>
                    <Icon name={metric?.icon} size={28} className="text-black" />
                  </div>
                  
                  {/* Animated Ring */}
                  <div className="absolute inset-0 rounded-full">
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                      <circle
                        cx="50"
                        cy="50"
                        r="48"
                        fill="none"
                        stroke="rgba(255,255,255,0.1)"
                        strokeWidth="2"
                      />
                      <motion.circle
                        cx="50"
                        cy="50"
                        r="48"
                        fill="none"
                        stroke={`var(--color-${metric?.color})`}
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeDasharray={`${2 * Math.PI * 48}`}
                        initial={{ strokeDashoffset: 2 * Math.PI * 48 }}
                        animate={{ strokeDashoffset: 2 * Math.PI * 48 * 0.25 }}
                        transition={{ duration: 2, delay: index * 0.2 }}
                      />
                    </svg>
                  </div>
                </div>

                {/* Counter */}
                <div className="mb-4">
                  <div className="text-4xl md:text-5xl font-bold text-foreground mb-2">
                    <motion.span
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      {metric?.value}
                    </motion.span>
                    <span className={`text-${metric?.color}`}>{metric?.suffix}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {metric?.label}
                  </h3>
                </div>

                {/* Description */}
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {metric?.description}
                </p>

                {/* Hover Effect */}
                <motion.div
                  className="absolute inset-0 rounded-xl bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <div className="bg-card border border-border rounded-xl p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">
              Ready to become the next <span className="gradient-text">success story</span>?
            </h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Join the growing community of businesses that have transformed their digital presence through authentic partnership and technical excellence.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Icon name="Shield" size={16} className="text-accent" />
                <span>100% Satisfaction Guarantee</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Icon name="Clock" size={16} className="text-accent" />
                <span>Free Consultation</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Icon name="Users" size={16} className="text-accent" />
                <span>Ongoing Support</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TransformationMetrics;