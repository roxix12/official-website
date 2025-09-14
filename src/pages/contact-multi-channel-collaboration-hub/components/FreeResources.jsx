import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';

const FreeResources = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const resources = [
    {
      title: 'Shopify Launch Checklist',
      description: 'Complete 50-point checklist to ensure your Shopify store is ready for launch',
      type: 'PDF Guide',
      downloads: '2,847',
      icon: 'CheckSquare',
      color: 'text-green-400',
      bgColor: 'bg-green-400/20'
    },
    {
      title: 'E-commerce SEO Template',
      description: 'Product page optimization template with meta descriptions and schema markup',
      type: 'Template',
      downloads: '1,923',
      icon: 'Search',
      color: 'text-blue-400',
      bgColor: 'bg-blue-400/20'
    },
    {
      title: 'Conversion Rate Audit',
      description: 'Self-assessment tool to identify conversion bottlenecks in your online store',
      type: 'Worksheet',
      downloads: '3,156',
      icon: 'TrendingUp',
      color: 'text-purple-400',
      bgColor: 'bg-purple-400/20'
    },
    {
      title: 'WordPress Security Guide',
      description: 'Essential security measures and plugins to protect your WordPress site',
      type: 'Guide',
      downloads: '1,674',
      icon: 'Shield',
      color: 'text-orange-400',
      bgColor: 'bg-orange-400/20'
    },
    {
      title: 'Client Onboarding Kit',
      description: 'Templates and processes for smooth project kickoffs and client communication',
      type: 'Kit',
      downloads: '892',
      icon: 'Users',
      color: 'text-cyan-400',
      bgColor: 'bg-cyan-400/20'
    },
    {
      title: 'Performance Optimization Checklist',
      description: 'Step-by-step guide to improve your website speed and Core Web Vitals',
      type: 'Checklist',
      downloads: '2,341',
      icon: 'Zap',
      color: 'text-yellow-400',
      bgColor: 'bg-yellow-400/20'
    }
  ];

  const handleSubscribe = (e) => {
    e?.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setTimeout(() => {
        setEmail('');
        setIsSubscribed(false);
      }, 3000);
    }
  };

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
            Free Resources <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">First</span>
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Get immediate value with these free templates, checklists, and guides. No strings attached – just practical tools to help you succeed.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12">
          {resources?.map((resource, index) => (
            <motion.div
              key={resource?.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative group bg-gradient-to-br from-gray-900/60 via-gray-800/50 to-gray-900/60 border border-cyan-400/20 rounded-xl p-4 sm:p-6 backdrop-blur-xl shadow-2xl shadow-cyan-500/5 hover:border-cyan-400/40 transition-all duration-300"
            >
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative">
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 ${resource?.bgColor} rounded-lg flex items-center justify-center group-hover:scale-110 transition-all duration-300 shadow-lg`}>
                    <Icon name={resource?.icon} size={20} className={resource?.color} />
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-gray-400">{resource?.type}</div>
                    <div className="text-sm font-medium text-white">{resource?.downloads} downloads</div>
                  </div>
                </div>

                <h3 className="text-lg font-bold mb-2 text-white">{resource?.title}</h3>
                <p className="text-gray-300 text-sm mb-6">{resource?.description}</p>

                <Button
                  variant="outline"
                  size="sm"
                  fullWidth
                  iconName="Download"
                  iconPosition="left"
                  className="border-cyan-400/50 text-cyan-300 hover:bg-cyan-500/10 hover:border-cyan-400 transition-all duration-300"
                >
                  Download Free
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Newsletter Signup */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
          className="relative group bg-gradient-to-br from-gray-900/60 via-gray-800/50 to-gray-900/60 border border-cyan-400/30 rounded-xl p-8 text-center backdrop-blur-xl shadow-2xl shadow-cyan-500/10"
        >
          {/* Glow Effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/15 to-purple-500/15 rounded-xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="relative">
            {isSubscribed ? (
              <div>
                <div className="inline-flex items-center justify-center w-16 h-16 bg-green-500/20 rounded-full mb-4">
                  <Icon name="CheckCircle" size={24} className="text-green-500" />
                </div>
                <h3 className="text-2xl font-bold mb-2 text-green-500">Welcome to the Community!</h3>
                <p className="text-gray-300">
                  Check your email for download links and welcome message.
                </p>
              </div>
            ) : (
              <>
                <motion.div 
                  className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-full mb-4 shadow-lg shadow-cyan-500/25"
                  whileHover={{ scale: 1.1, rotate: 360 }}
                  transition={{ duration: 0.8 }}
                >
                  <Icon name="Gift" size={24} className="text-cyan-400" />
                </motion.div>
                
                <h3 className="text-2xl font-bold mb-2 text-white">
                  Get All Resources + <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">Monthly Updates</span>
                </h3>
                <p className="text-gray-300 mb-6 max-w-md mx-auto">
                  Subscribe to receive all free resources instantly, plus monthly development tips, industry insights, and new tools.
                </p>
                
                <form onSubmit={handleSubscribe} className="max-w-md mx-auto">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Input
                      type="email"
                      placeholder="Enter your email address"
                      value={email}
                      onChange={(e) => setEmail(e?.target?.value)}
                      required
                      className="flex-1"
                    />
                    <Button
                      type="submit"
                      variant="default"
                      iconName="Send"
                      iconPosition="right"
                      className="bg-gradient-to-r from-cyan-600 to-purple-600 text-white hover:from-cyan-500 hover:to-purple-500 hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 border border-cyan-400/30 sm:w-auto"
                    >
                      Get Resources
                    </Button>
                  </div>
                </form>
                
                <p className="text-xs text-gray-400 mt-4">
                  No spam, ever. Unsubscribe with one click anytime.
                </p>
              </>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FreeResources;