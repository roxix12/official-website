import React from 'react';
import { motion } from 'framer-motion';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';

const TestimonialsSection = () => {
  const testimonials = [
    {
      id: 1,
      name: 'Sarah Mitchell',
      company: 'Bloom & Co. Boutique',
      role: 'Founder',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      rating: 5,
      testimonial: `Working with Cdw was a game-changer for our business. His communication throughout the project was exceptional - always responsive, clear about timelines, and proactive with updates.\n\nWhat impressed me most was how he took time to understand our brand and customers before diving into development. The result? A Shopify store that not only looks amazing but converts 40% better than our old site.`,
      project: 'Shopify Store Development',
      result: '40% increase in conversions',
      timeline: '6 weeks'
    },
    {
      id: 2,
      name: 'Marcus Johnson',
      company: 'TechFlow Solutions',
      role: 'CEO',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      rating: 5,
      testimonial: `I've worked with many developers, but Cdw's approach to collaboration is unmatched. He doesn't just code - he partners with you to solve business problems.\n\nHis technical expertise combined with genuine care for project success made our WordPress migration seamless. Even months later, he's still available for questions and optimizations.`,
      project: 'WordPress Migration & Optimization',
      result: '60% faster load times',
      timeline: '4 weeks'
    },
    {
      id: 3,
      name: 'Elena Rodriguez',
      company: 'Artisan Marketplace',
      role: 'Operations Director',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      rating: 5,
      testimonial: `The consultation call with Cdw was worth its weight in gold. In just one hour, he identified three major issues with our current setup and provided a clear roadmap for improvement.\n\nHis ability to explain technical concepts in business terms helped our entire team understand the path forward. We've since hired him for the full project implementation.`,
      project: 'E-commerce Consultation',result: 'Clear 3-month roadmap',timeline: '1 hour call'
    },
    {
      id: 4,
      name: 'David Chen',company: 'Urban Fitness Co.',role: 'Marketing Manager',avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',rating: 5,testimonial: `Cdw's responsiveness is incredible. Whether it's a quick question via email or an urgent issue that needs immediate attention, he's always there.\n\nBeyond the technical skills, his project management and communication style made the entire process stress-free. Our Shopify Plus migration was completed ahead of schedule and under budget.`,
      project: 'Shopify Plus Migration',
      result: 'Completed ahead of schedule',
      timeline: '8 weeks'
    }
  ];

  const communicationStats = [
    {
      metric: '< 24 hours',
      description: 'Average response time',
      icon: 'Clock'
    },
    {
      metric: '98%',
      description: 'Client satisfaction rate',
      icon: 'Heart'
    },
    {
      metric: '100%',
      description: 'Projects delivered on time',
      icon: 'CheckCircle'
    },
    {
      metric: '85%',
      description: 'Clients become long-term partners',
      icon: 'Users'
    }
  ];

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-black via-gray-900 to-black">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            What Clients Say About <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">Working Together</span>
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Communication and collaboration quality matter as much as technical expertise. Here's what clients say about the partnership experience.
          </p>
        </motion.div>

        {/* Communication Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 mb-12 sm:mb-16"
        >
          {communicationStats?.map((stat, index) => (
            <motion.div 
              key={index} 
              className="text-center group"
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-lg mb-3 group-hover:shadow-lg group-hover:shadow-cyan-500/25 transition-all duration-300">
                <Icon name={stat?.icon} size={20} className="text-cyan-400" />
              </div>
              <div className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-1">{stat?.metric}</div>
              <div className="text-sm text-gray-300">{stat?.description}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {testimonials?.map((testimonial, index) => (
            <motion.div
              key={testimonial?.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative group bg-gradient-to-br from-gray-900/60 via-gray-800/50 to-gray-900/60 border border-cyan-400/20 rounded-xl p-4 sm:p-6 backdrop-blur-xl shadow-2xl shadow-cyan-500/5 hover:border-cyan-400/40 transition-all duration-300"
            >
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <Image
                      src={testimonial?.avatar}
                      alt={testimonial?.name}
                      className="w-12 h-12 rounded-full object-cover border-2 border-cyan-400/30"
                    />
                    <div>
                      <h4 className="font-semibold text-white">{testimonial?.name}</h4>
                      <p className="text-sm text-gray-300">
                        {testimonial?.role} at {testimonial?.company}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex space-x-1">
                    {[...Array(testimonial?.rating)]?.map((_, i) => (
                      <Icon key={i} name="Star" size={16} className="text-yellow-400 fill-current" />
                    ))}
                  </div>
                </div>

                {/* Testimonial Content */}
                <blockquote className="text-gray-300 mb-6 whitespace-pre-line">
                  "{testimonial?.testimonial}"
                </blockquote>

                {/* Project Details */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 pt-4 border-t border-gray-700/50">
                  <div>
                    <div className="text-xs text-gray-400 mb-1">Project</div>
                    <div className="text-sm font-medium text-white">{testimonial?.project}</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-400 mb-1">Result</div>
                    <div className="text-sm font-medium text-cyan-400">{testimonial?.result}</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-400 mb-1">Timeline</div>
                    <div className="text-sm font-medium text-white">{testimonial?.timeline}</div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="relative group bg-gradient-to-br from-gray-900/60 via-gray-800/50 to-gray-900/60 border border-cyan-400/30 rounded-xl p-8 backdrop-blur-xl shadow-2xl shadow-cyan-500/10">
            {/* Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/15 to-purple-500/15 rounded-xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="relative">
              <h3 className="text-2xl font-bold mb-4 text-white">
                Ready to Experience This Level of <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">Partnership</span>?
              </h3>
              <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
                Join the growing list of satisfied clients who've transformed their digital presence through collaborative partnership. Let's discuss your project today.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 bg-gradient-to-r from-cyan-600 to-purple-600 text-white rounded-lg font-medium hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 flex items-center justify-center space-x-2 border border-cyan-400/30"
                  onClick={() => {
                    const calendarSection = document.getElementById('contact-calendar');
                    if (calendarSection) {
                      calendarSection.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                >
                  <Icon name="Calendar" size={16} />
                  <span>Book Free Consultation</span>
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 border border-cyan-400/50 text-cyan-300 rounded-lg font-medium hover:bg-cyan-500/10 transition-all duration-300 flex items-center justify-center space-x-2 backdrop-blur-sm"
                  onClick={() => {
                    const contactForm = document.getElementById('contact-form');
                    if (contactForm) {
                      contactForm.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                >
                  <Icon name="MessageSquare" size={16} />
                  <span>Send Quick Message</span>
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;