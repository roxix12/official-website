import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const TechnicalShowcase = () => {
  const [activeCode, setActiveCode] = useState('shopify');

  const technologies = {
    shopify: {
      name: 'Shopify Development',
      icon: 'ShoppingBag',
      color: 'from-green-500 to-emerald-600',
      description: 'Custom themes, apps, and e-commerce solutions',
      code: `// Custom Shopify Liquid Template
{% assign featured_products = collections.featured.products %}

<div class="product-grid">
  {% for product in featured_products limit: 8 %}
    <div class="product-card" data-product-id="{{ product.id }}">
      <img src="{{ product.featured_image | img_url: '400x400' }}" 
           alt="{{ product.title }}">
      <h3>{{ product.title }}</h3>
      <span class="price">{{ product.price | money }}</span>
      <button class="add-to-cart btn-primary">
        Add to Cart
      </button>
    </div>
  {% endfor %}
</div>`,
      features: [
        'Custom Theme Development',
        'Shopify Plus Solutions',
        'Payment Gateway Integration',
        'Inventory Management',
        'Performance Optimization'
      ]
    },
    react: {
      name: 'React Development',
      icon: 'Code',
      color: 'from-blue-500 to-cyan-600',
      description: 'Modern React applications with cutting-edge features',
      code: `// React Component with Hooks
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const ProductCard = ({ product }) => {
  const [isLoading, setIsLoading] = useState(false);
  
  const addToCart = async () => {
    setIsLoading(true);
    try {
      await fetch('/api/cart/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId: product.id })
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div 
      whileHover={{ scale: 1.05 }}
      className="product-card"
    >
      <img src={product.image} alt={product.title} />
      <h3>{product.title}</h3>
      <button onClick={addToCart} disabled={isLoading}>
        {isLoading ? 'Adding...' : 'Add to Cart'}
      </button>
    </motion.div>
  );
};`,
      features: [
        'Component Architecture',
        'State Management',
        'API Integration',
        'Performance Optimization',
        'Modern UI/UX'
      ]
    },
    wordpress: {
      name: 'WordPress Development',
      icon: 'Globe',
      color: 'from-purple-500 to-pink-600',
      description: 'Custom WordPress themes and plugins',
      code: `<?php
// Custom WordPress Theme Functions
function custom_theme_setup() {
    add_theme_support('post-thumbnails');
    add_theme_support('custom-logo');
    add_theme_support('html5', array(
        'search-form',
        'comment-form',
        'comment-list',
        'gallery',
        'caption'
    ));
}
add_action('after_setup_theme', 'custom_theme_setup');

// Custom Post Type
function create_portfolio_post_type() {
    register_post_type('portfolio',
        array(
            'labels' => array(
                'name' => 'Portfolio',
                'singular_name' => 'Portfolio Item'
            ),
            'public' => true,
            'supports' => array('title', 'editor', 'thumbnail'),
            'has_archive' => true,
        )
    );
}
add_action('init', 'create_portfolio_post_type');
?>`,
      features: [
        'Custom Theme Development',
        'Plugin Development',
        'Custom Post Types',
        'Advanced Custom Fields',
        'Performance Optimization'
      ]
    }
  };

  const currentTech = technologies[activeCode];

  return (
    <section className="py-20 bg-gray-900">
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
            Technical <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Expertise</span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto">
            Cutting-edge technologies and proven methodologies to bring your vision to life.
          </p>
        </motion.div>

        {/* Technology Selector */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row justify-center mb-12 space-y-2 sm:space-y-0 sm:space-x-4"
        >
          {Object.entries(technologies).map(([key, tech]) => (
            <button
              key={key}
              onClick={() => setActiveCode(key)}
              className={`px-6 py-4 rounded-xl font-semibold transition-all duration-300 ${
                activeCode === key
                  ? `bg-gradient-to-r ${tech.color} text-white shadow-lg`
                  : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 hover:text-white'
              }`}
            >
              <div className="flex items-center space-x-2">
                <Icon name={tech.icon} size={20} />
                <span className="hidden sm:inline">{tech.name}</span>
                <span className="sm:hidden">{tech.name.split(' ')[0]}</span>
              </div>
            </button>
          ))}
        </motion.div>

        {/* Content Display */}
        <motion.div
          key={activeCode}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid lg:grid-cols-2 gap-12"
        >
          {/* Code Display */}
          <div className="bg-gray-800 rounded-2xl overflow-hidden border border-gray-700">
            <div className="bg-gray-900 px-6 py-4 border-b border-gray-700">
              <div className="flex items-center space-x-2">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <div className="text-gray-400 text-sm ml-4">{currentTech.name}</div>
              </div>
            </div>
            <div className="p-6">
              <pre className="text-sm text-gray-300 overflow-x-auto">
                <code>{currentTech.code}</code>
              </pre>
            </div>
          </div>

          {/* Technology Details */}
          <div className="space-y-8">
            <div>
              <div className={`inline-flex items-center px-4 py-2 bg-gradient-to-r ${currentTech.color} rounded-full text-white text-sm font-medium mb-4`}>
                <Icon name={currentTech.icon} size={16} className="mr-2" />
                {currentTech.name}
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">
                Professional {currentTech.name.split(' ')[0]} Solutions
              </h3>
              <p className="text-gray-300 text-lg mb-8">
                {currentTech.description}
              </p>
            </div>

            {/* Features List */}
            <div>
              <h4 className="text-xl font-bold text-white mb-6">Key Capabilities:</h4>
              <div className="space-y-4">
                {currentTech.features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center space-x-3 p-4 bg-gray-800/50 rounded-lg border border-gray-700/50"
                  >
                    <Icon name="Check" size={20} className="text-green-400" />
                    <span className="text-gray-300 font-medium">{feature}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="pt-6"
            >
              <Link
                to="/projects-showcase-gallery"
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-500 hover:to-purple-500 transition-all duration-300 transform hover:scale-105"
              >
                <Icon name="Eye" size={20} className="mr-2" />
                View {currentTech.name.split(' ')[0]} Projects
              </Link>
            </motion.div>
          </div>
        </motion.div>

        {/* Tech Stack */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-20"
        >
          <h3 className="text-2xl font-bold text-white text-center mb-12">
            Technologies & Tools I Use
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
            {[
              { name: 'JavaScript', icon: 'Code' },
              { name: 'React', icon: 'Zap' },
              { name: 'Node.js', icon: 'Server' },
              { name: 'Shopify', icon: 'ShoppingBag' },
              { name: 'WordPress', icon: 'Globe' },
              { name: 'Git', icon: 'GitBranch' }
            ].map((tech, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center p-4 bg-gray-800/50 rounded-xl border border-gray-700/50 hover:bg-gray-700/50 transition-all duration-300"
              >
                <Icon name={tech.icon} size={32} className="mx-auto text-blue-400 mb-3" />
                <div className="text-sm font-medium text-gray-300">{tech.name}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TechnicalShowcase;