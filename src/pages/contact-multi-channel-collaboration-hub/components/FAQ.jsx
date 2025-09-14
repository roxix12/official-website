import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      category: 'Shopify Projects',
      questions: [
        {
          question: 'How long does a typical Shopify store development take?',
          answer: `A standard Shopify store typically takes 4-8 weeks depending on complexity:\n\n• Basic store setup: 2-3 weeks\n• Custom theme development: 4-6 weeks\n• Complex integrations: 6-8 weeks\n• Enterprise solutions: 8-12 weeks\n\nI provide detailed timelines during our discovery call based on your specific requirements.`
        },
        {
          question: 'Do you work with existing Shopify stores or only new builds?',
          answer: `I work with both! Services include:\n\n• New store development from scratch\n• Existing store redesigns and optimization\n• Theme customization and updates\n• App integrations and custom functionality\n• Performance optimization and speed improvements\n• Migration from other platforms to Shopify\n\nMany clients come to me for store improvements and ongoing maintenance.`
        },
        {
          question: 'What\'s included in your Shopify development service?',
          answer: `Comprehensive Shopify development includes:\n\n• Custom theme development or customization\n• Responsive design for all devices\n• Product catalog setup and optimization\n• Payment gateway integration\n• Shipping configuration\n• SEO optimization\n• Basic training and documentation\n• 30-day post-launch support\n\nAdditional services like content creation, photography, and marketing setup are available separately.`
        }
      ]
    },
    {
      category: 'Pricing & Process',
      questions: [
        {
          question: 'How do you structure your pricing?',
          answer: `I offer transparent, value-based pricing:\n\n• Discovery calls are always free\n• Fixed-price projects with clear scope\n• Hourly rates for ongoing maintenance ($150/hour)\n• Retainer packages for long-term partnerships\n• No hidden fees or surprise charges\n\nPricing depends on project complexity, timeline, and specific requirements. I provide detailed quotes after understanding your needs.`
        },
        {
          question: 'What\'s your typical project process?',
          answer: `My proven 6-step process ensures success:\n\n1. Discovery Call - Understanding your vision and requirements\n2. Proposal & Agreement - Detailed scope, timeline, and pricing\n3. Design Phase - Wireframes, mockups, and approval\n4. Development - Building your solution with regular updates\n5. Testing & Refinement - Quality assurance and optimizations\n6. Launch & Support - Go-live assistance and ongoing support\n\nYou'll have full visibility and input throughout the entire process.`
        },
        {
          question: 'Do you require payment upfront?',
          answer: `Payment is structured for mutual protection:\n\n• 50% deposit to begin work\n• 25% at milestone completion (usually design approval)\n• 25% final payment upon project completion\n• Ongoing work is billed monthly\n• All payments are secured through contracts\n\nThis structure ensures commitment from both sides and maintains cash flow throughout the project.`
        }
      ]
    },
    {
      category: 'Technical & Support',
      questions: [
        {
          question: 'What technologies and platforms do you specialize in?',
          answer: `My core expertise includes:\n\n• Shopify & Shopify Plus development\n• WordPress custom development\n• React.js and modern JavaScript\n• Custom API integrations\n• Performance optimization\n• SEO and conversion optimization\n• Third-party app integrations\n• Database design and management\n\nI stay current with the latest technologies and best practices in e-commerce development.`
        },
        {
          question: 'Do you provide ongoing support after project completion?',
          answer: `Yes! Support options include:\n\n• 30-day free support included with all projects\n• Monthly maintenance retainers starting at $500/month\n• On-demand hourly support at $150/hour\n• Emergency support for critical issues\n• Training and documentation for your team\n• Performance monitoring and optimization\n\nI believe in long-term partnerships and am here to help your business grow.`
        },
        {
          question: 'Can you help with website performance and speed optimization?',
          answer: `Absolutely! Performance optimization is crucial:\n\n• Core Web Vitals improvement\n• Image optimization and compression\n• Code minification and caching\n• Database query optimization\n• CDN setup and configuration\n• Mobile performance enhancement\n• Third-party script optimization\n• Regular performance audits\n\nI can improve existing sites or build new ones with performance as a priority from day one.`
        }
      ]
    }
  ];

  const toggleFAQ = (categoryIndex, questionIndex) => {
    const globalIndex = faqs?.slice(0, categoryIndex)?.reduce((acc, cat) => acc + cat?.questions?.length, 0) + questionIndex;
    setOpenIndex(openIndex === globalIndex ? -1 : globalIndex);
  };

  const getGlobalIndex = (categoryIndex, questionIndex) => {
    return faqs?.slice(0, categoryIndex)?.reduce((acc, cat) => acc + cat?.questions?.length, 0) + questionIndex;
  };

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-black via-gray-900 to-black">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            Frequently Asked <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">Questions</span>
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Get answers to common questions about my services, process, and approach. Don't see your question? Feel free to reach out directly.
          </p>
        </motion.div>

        <div className="space-y-8">
          {faqs?.map((category, categoryIndex) => (
            <motion.div
              key={category?.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
              viewport={{ once: true }}
            >
              <h3 className="text-xl font-bold mb-4">
                <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                  {category?.category}
                </span>
              </h3>
              
              <div className="space-y-4">
                {category?.questions?.map((faq, questionIndex) => {
                  const globalIndex = getGlobalIndex(categoryIndex, questionIndex);
                  const isOpen = openIndex === globalIndex;
                  
                  return (
                    <div
                      key={questionIndex}
                      className="relative group bg-gradient-to-br from-gray-900/60 via-gray-800/50 to-gray-900/60 border border-cyan-400/20 rounded-lg overflow-hidden hover:border-cyan-400/40 transition-all duration-300 backdrop-blur-xl shadow-lg shadow-cyan-500/5"
                    >
                      {/* Glow Effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-lg blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <div className="relative">
                        <button
                          onClick={() => toggleFAQ(categoryIndex, questionIndex)}
                          className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-cyan-500/5 transition-all duration-300 relative z-10"
                        >
                          <span className="font-medium pr-4 text-white">{faq?.question}</span>
                          <Icon 
                            name={isOpen ? "ChevronUp" : "ChevronDown"} 
                            size={20} 
                            className={`text-cyan-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                          />
                        </button>
                        <AnimatePresence>
                          {isOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3 }}
                              className="overflow-hidden relative z-10"
                            >
                              <div className="px-6 pb-4 text-gray-300 whitespace-pre-line">
                                {faq?.answer}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <div className="relative group bg-gradient-to-br from-gray-900/60 via-gray-800/50 to-gray-900/60 border border-cyan-400/20 rounded-lg p-6 backdrop-blur-xl shadow-lg shadow-cyan-500/5">
            {/* Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-lg blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="relative">
              <h4 className="font-semibold mb-2 text-white">
                <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                  Still have questions?
                </span>
              </h4>
              <p className="text-gray-300 mb-4">
                I'm here to help! Reach out through any of the channels above or schedule a free discovery call to discuss your specific needs.
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-sm">
                <div className="flex items-center space-x-2">
                  <Icon name="Clock" size={16} className="text-cyan-400" />
                  <span className="text-gray-300">Usually respond within 24 hours</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="MessageCircle" size={16} className="text-purple-400" />
                  <span className="text-gray-300">Free consultation calls available</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;