import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ServiceTiers = () => {
  const [activeTab, setActiveTab] = useState('launch');

  const tiers = {
    launch: {
      name: 'Launch Package',
      price: '$2,500',
      duration: '2-3 weeks',
      description: 'Perfect for startups and small businesses ready to establish their online presence',
      color: 'from-green-500 to-emerald-600',
      bgColor: 'bg-green-500/10',
      borderColor: 'border-green-500/30',
      features: [
        { name: 'Custom Website Design', included: true, description: 'Responsive design tailored to your brand' },
        { name: 'Shopify/WordPress Setup', included: true, description: 'Complete platform configuration' },
        { name: 'Mobile Optimization', included: true, description: 'Perfect on all devices' },
        { name: 'Basic SEO Setup', included: true, description: 'Search engine optimization basics' },
        { name: 'Content Management', included: true, description: 'Easy-to-use admin panel' },
        { name: 'Contact Forms', included: true, description: 'Lead capture functionality' },
        { name: '30-Day Support', included: true, description: 'Post-launch assistance' },
        { name: 'Advanced Integrations', included: false, description: 'Third-party API connections' },
        { name: 'E-commerce Features', included: false, description: 'Shopping cart and payments' },
        { name: 'Custom Functionality', included: false, description: 'Bespoke feature development' }
      ]
    },
    growth: {
      name: 'Growth Package',
      price: '$4,500',
      duration: '3-4 weeks',
      description: 'Ideal for growing businesses that need advanced features and integrations',
      color: 'from-blue-500 to-purple-600',
      bgColor: 'bg-blue-500/10',
      borderColor: 'border-blue-500/30',
      popular: true,
      features: [
        { name: 'Custom Website Design', included: true, description: 'Advanced responsive design' },
        { name: 'Shopify/WordPress Setup', included: true, description: 'Complete platform configuration' },
        { name: 'Mobile Optimization', included: true, description: 'Perfect on all devices' },
        { name: 'Advanced SEO Setup', included: true, description: 'Comprehensive SEO optimization' },
        { name: 'Content Management', included: true, description: 'Advanced CMS functionality' },
        { name: 'Contact Forms', included: true, description: 'Advanced form functionality' },
        { name: '60-Day Support', included: true, description: 'Extended post-launch support' },
        { name: 'Advanced Integrations', included: true, description: 'Third-party API connections' },
        { name: 'E-commerce Features', included: true, description: 'Full shopping experience' },
        { name: 'Performance Optimization', included: true, description: 'Speed and efficiency focus' }
      ]
    },
    scale: {
      name: 'Scale Package',
      price: '$7,500',
      duration: '4-6 weeks',
      description: 'Enterprise-level solution for businesses ready to dominate their market',
      color: 'from-purple-500 to-pink-600',
      bgColor: 'bg-purple-500/10',
      borderColor: 'border-purple-500/30',
      features: [
        { name: 'Premium Website Design', included: true, description: 'Enterprise-grade design system' },
        { name: 'Full Platform Development', included: true, description: 'Complete custom development' },
        { name: 'Multi-device Optimization', included: true, description: 'Perfect across all platforms' },
        { name: 'Enterprise SEO Strategy', included: true, description: 'Comprehensive SEO approach' },
        { name: 'Advanced CMS', included: true, description: 'Enterprise content management' },
        { name: 'Advanced Forms & Analytics', included: true, description: 'Detailed tracking and forms' },
        { name: '90-Day Support', included: true, description: 'Premium ongoing support' },
        { name: 'Custom Integrations', included: true, description: 'Bespoke API development' },
        { name: 'Advanced E-commerce', included: true, description: 'Enterprise shopping features' },
        { name: 'Custom Functionality', included: true, description: 'Unlimited custom features' }
      ]
    }
  };

  const currentTier = tiers[activeTab];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-900 via-black to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            Choose Your <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Success Path</span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto">
            Transparent pricing, exceptional value. Every package includes everything you need to succeed online.
          </p>
        </motion.div>

        {/* Tab Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row justify-center mb-12 space-y-2 sm:space-y-0 sm:space-x-4"
        >
          {Object.entries(tiers).map(([key, tier]) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`relative px-6 py-4 rounded-xl font-semibold transition-all duration-300 ${
                activeTab === key
                  ? `bg-gradient-to-r ${tier.color} text-white shadow-lg`
                  : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 hover:text-white'
              }`}
            >
              {tier.popular && (
                <div className="absolute -top-2 -right-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-black text-xs font-bold px-2 py-1 rounded-full">
                  Popular
                </div>
              )}
              <div className="flex items-center space-x-2">
                <Icon 
                  name={key === 'launch' ? 'Rocket' : key === 'growth' ? 'TrendingUp' : 'Crown'} 
                  size={20} 
                />
                <span>{tier.name}</span>
              </div>
            </button>
          ))}
        </motion.div>

        {/* Package Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid lg:grid-cols-2 gap-12 items-start"
        >
          {/* Package Info */}
          <div className={`${currentTier.bgColor} border ${currentTier.borderColor} rounded-2xl p-8`}>
            <div className="text-center mb-8">
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">{currentTier.name}</h3>
              <p className="text-gray-300 mb-6">{currentTier.description}</p>
              <div className="flex items-center justify-center space-x-4 mb-6">
                <div className="text-4xl sm:text-5xl font-bold text-white">{currentTier.price}</div>
                <div className="text-gray-400">
                  <div className="text-sm">Delivery in</div>
                  <div className="font-semibold">{currentTier.duration}</div>
                </div>
              </div>
              <Link to="/contact-multi-channel-collaboration-hub">
                <Button
                  size="lg"
                  className={`bg-gradient-to-r ${currentTier.color} text-white hover:scale-105 shadow-lg transition-all duration-300 w-full sm:w-auto`}
                >
                  <Icon name="MessageCircle" size={20} className="mr-2" />
                  Get Started Today
                </Button>
              </Link>
            </div>
          </div>

          {/* Features List */}
          <div className="space-y-4">
            <h4 className="text-xl font-bold text-white mb-6">What's Included:</h4>
            {currentTier.features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`flex items-start space-x-3 p-4 rounded-lg transition-all duration-300 ${
                  feature.included 
                    ? 'bg-gray-800/50 border border-gray-700/50' 
                    : 'bg-gray-900/50 border border-gray-800/50 opacity-50'
                }`}
              >
                <Icon
                  name={feature.included ? 'Check' : 'X'}
                  size={20}
                  className={feature.included ? 'text-green-400 mt-0.5' : 'text-gray-500 mt-0.5'}
                />
                <div className="flex-1">
                  <h5 className={`font-semibold ${feature.included ? 'text-white' : 'text-gray-500'}`}>
                    {feature.name}
                  </h5>
                  <p className={`text-sm ${feature.included ? 'text-gray-300' : 'text-gray-600'}`}>
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="bg-gray-800/50 border border-gray-700/50 rounded-2xl p-8">
            <h3 className="text-xl font-bold text-white mb-4">All Packages Include:</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
              <div className="space-y-2">
                <Icon name="Shield" size={24} className="mx-auto text-green-400" />
                <div className="text-sm font-semibold text-white">Money-Back Guarantee</div>
                <div className="text-xs text-gray-400">100% satisfaction guaranteed</div>
              </div>
              <div className="space-y-2">
                <Icon name="Clock" size={24} className="mx-auto text-blue-400" />
                <div className="text-sm font-semibold text-white">On-Time Delivery</div>
                <div className="text-xs text-gray-400">Delivered when promised</div>
              </div>
              <div className="space-y-2">
                <Icon name="Users" size={24} className="mx-auto text-purple-400" />
                <div className="text-sm font-semibold text-white">Dedicated Support</div>
                <div className="text-xs text-gray-400">Direct access to me</div>
              </div>
              <div className="space-y-2">
                <Icon name="RefreshCw" size={24} className="mx-auto text-orange-400" />
                <div className="text-sm font-semibold text-white">Unlimited Revisions</div>
                <div className="text-xs text-gray-400">Until you're 100% happy</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ServiceTiers;