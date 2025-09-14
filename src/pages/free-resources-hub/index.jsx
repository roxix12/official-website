import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '../../components/ui/Header';
import Footer from '../../components/ui/Footer';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import { supabase } from '../../services/supabaseClient';
import { toast } from 'react-hot-toast';

const FreeResourcesHub = () => {
  const [resources, setResources] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedResource, setSelectedResource] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [likedResources, setLikedResources] = useState(new Set());

  // Load categories and resources
  useEffect(() => {
    loadCategories();
    loadResources();
  }, []);

  const loadCategories = async () => {
    try {
      console.log('Loading categories...');
      const { data, error } = await supabase
        .from('resource_categories')
        .select('*')
        .eq('is_active', true)
        .order('display_order');

      if (error) {
        console.error('Supabase error:', error);
        throw error;
      }
      
      console.log('Categories loaded:', data);
      setCategories(data || []);
    } catch (error) {
      console.error('Error loading categories:', error);
      toast.error(`Failed to load categories: ${error.message}`);
      setCategories([]);
    }
  };

  const loadResources = async () => {
    setIsLoading(true);
    try {
      console.log('Loading resources...');
      const { data, error } = await supabase
        .from('free_resources')
        .select(`
          *,
          resource_categories (
            category_name,
            category_key,
            category_icon,
            category_color
          )
        `)
        .eq('is_active', true)
        .order('is_featured', { ascending: false })
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Supabase error:', error);
        throw error;
      }
      
      console.log('Resources loaded:', data);
      setResources(data || []);
    } catch (error) {
      console.error('Error loading resources:', error);
      toast.error(`Failed to load resources: ${error.message}`);
      setResources([]);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredResources = resources.filter(resource => {
    const matchesCategory = selectedCategory === 'all' || 
      resource.resource_categories?.category_key === selectedCategory;
    const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const handleResourceClick = async (resource) => {
    setSelectedResource(resource);
    setIsModalOpen(true);
    
    // Increment view count
    try {
      await supabase.rpc('increment_resource_views', {
        resource_uuid: resource.id
      });
    } catch (error) {
      console.error('Error incrementing views:', error);
    }
  };

  const handleLikeResource = async (resourceId, event) => {
    event.stopPropagation();
    
    try {
      // Simple browser fingerprinting
      const userAgent = navigator.userAgent;
      const screen = `${window.screen.width}x${window.screen.height}`;
      const fingerprint = btoa(userAgent + screen).substring(0, 32);
      
      const { data, error } = await supabase.rpc('toggle_resource_like', {
        resource_uuid: resourceId,
        user_ip_addr: 'anonymous', // In production, you might want to get real IP
        user_fp: fingerprint
      });

      if (error) throw error;

      // Update local state
      const newLikedResources = new Set(likedResources);
      if (data.liked) {
        newLikedResources.add(resourceId);
        toast.success('Resource liked!');
      } else {
        newLikedResources.delete(resourceId);
        toast.success('Resource unliked!');
      }
      setLikedResources(newLikedResources);

      // Update resources list with new like count
      setResources(prev => prev.map(resource => 
        resource.id === resourceId 
          ? { ...resource, like_count: data.like_count }
          : resource
      ));
    } catch (error) {
      console.error('Error toggling like:', error);
      toast.error('Failed to update like');
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    toast.success('Copied to clipboard!');
  };

  const getDifficultyColor = (level) => {
    switch (level) {
      case 'beginner': return 'text-green-600 bg-green-100 dark:bg-green-900 dark:text-green-300';
      case 'intermediate': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900 dark:text-yellow-300';
      case 'advanced': return 'text-red-600 bg-red-100 dark:bg-red-900 dark:text-red-300';
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  const getResourceTypeIcon = (type) => {
    switch (type) {
      case 'prompt': return 'MessageSquare';
      case 'guide': return 'BookOpen';
      case 'tool': return 'Wrench';
      case 'tip': return 'Lightbulb';
      case 'account': return 'User';
      default: return 'FileText';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      <Helmet>
        <title>Free Resources Hub - Premium Tools, AI Prompts & Development Resources</title>
        <meta name="description" content="Access premium accounts for free, powerful AI prompts, development tools, and exclusive resources for developers and creators." />
        <meta name="keywords" content="free resources, premium accounts, ChatGPT prompts, AI tools, development resources, free trials" />
      </Helmet>
      
      <Header />
      
      <main className="pt-20">
        {/* Hero Section - Matching Website Style */}
        <section className="relative py-20 overflow-hidden bg-gradient-to-br from-gray-900 via-black to-gray-900">
          {/* Animated Background Pattern */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-600/20"></div>
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(circle at 25% 25%, cyan 1px, transparent 1px), radial-gradient(circle at 75% 75%, purple 1px, transparent 1px)`,
              backgroundSize: '50px 50px'
            }}></div>
          </div>

          {/* Floating Orbs */}
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className={`absolute w-20 h-20 rounded-full ${
                i % 4 === 0 ? 'bg-cyan-500/10' : 
                i % 4 === 1 ? 'bg-purple-500/10' : 
                i % 4 === 2 ? 'bg-blue-500/10' : 'bg-pink-500/10'
              } backdrop-blur-sm border border-white/10`}
              style={{
                left: `${5 + (i * 12)}%`,
                top: `${10 + (i % 3 * 30)}%`,
              }}
              animate={{
                y: [0, -30, 0],
                x: [0, 15, 0],
                scale: [1, 1.1, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 6 + i,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              {/* Badge */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-500/30 backdrop-blur-sm mb-8"
              >
                <Icon name="Gift" className="w-6 h-6 text-cyan-400 mr-3" />
                <span className="text-cyan-400 font-semibold text-lg">100% Free Premium Resources</span>
                <div className="ml-3 px-2 py-1 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full text-xs font-bold text-black">
                  NEW
                </div>
              </motion.div>
              
              {/* Main Title */}
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-6xl md:text-8xl font-bold mb-6"
              >
                <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Free Resources
                </span>
                <br />
                <span className="text-white text-5xl md:text-6xl">Hub</span>
              </motion.h1>
              
              {/* Subtitle */}
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto mb-12 leading-relaxed"
              >
                Unlock <span className="text-cyan-400 font-semibold">premium tools</span>, master <span className="text-purple-400 font-semibold">AI prompts</span>, 
                and access <span className="text-pink-400 font-semibold">exclusive resources</span>. 
                Everything you need to level up - completely free.
              </motion.p>

              {/* Stats Cards */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
                {[
                  { label: 'Free Resources', value: resources.length, icon: 'Gift', gradient: 'from-cyan-500 to-blue-500' },
                  { label: 'Categories', value: categories.length, icon: 'Grid', gradient: 'from-purple-500 to-pink-500' },
                  { label: 'AI Prompts', value: resources.filter(r => r.resource_type === 'prompt').length, icon: 'Brain', gradient: 'from-blue-500 to-cyan-500' },
                  { label: 'Premium Tips', value: resources.filter(r => r.resource_type === 'guide').length, icon: 'Crown', gradient: 'from-yellow-400 to-orange-500' }
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ delay: 0.8 + index * 0.1 }}
                    whileHover={{ scale: 1.05, y: -5 }}
                    className="relative group"
                  >
                    <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20 rounded-2xl p-6 hover:border-cyan-500/50 transition-all duration-300">
                      {/* Icon */}
                      <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r ${stat.gradient} flex items-center justify-center shadow-lg`}>
                        <Icon name={stat.icon} className="w-8 h-8 text-white" />
                      </div>
                      
                      {/* Value */}
                      <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                        {stat.value > 0 ? stat.value : 0}
                      </div>
                      
                      {/* Label */}
                      <div className="text-sm text-gray-300 font-medium">
                        {stat.label}
                      </div>

                      {/* Hover Glow Effect */}
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-xl"></div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Search and Filters - Matching Website Style */}
        <section className="py-16 bg-gradient-to-br from-gray-800 via-gray-900 to-black relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(circle at 20% 80%, cyan 1px, transparent 1px), radial-gradient(circle at 80% 20%, purple 1px, transparent 1px), radial-gradient(circle at 40% 40%, pink 1px, transparent 1px)`,
              backgroundSize: '100px 100px'
            }}></div>
          </div>
          
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Section Header */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
                Find Your Perfect Resource
              </h2>
              <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                Search through our collection of premium tools, AI prompts, and exclusive resources
              </p>
            </motion.div>

            {/* Search Bar */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="max-w-2xl mx-auto mb-12"
            >
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 shadow-xl overflow-hidden">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 p-4">
                      <Icon name="Search" className="w-6 h-6 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      placeholder="Search resources, AI prompts, premium tools..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="flex-1 py-4 pr-4 bg-transparent text-white placeholder-gray-400 focus:outline-none text-lg"
                    />
                    <div className="flex-shrink-0 p-2">
                      <div className="bg-gradient-to-r from-cyan-500 to-purple-500 rounded-xl p-2">
                        <Icon name="Sparkles" className="w-5 h-5 text-white" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Category Filters */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap justify-center gap-4"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory('all')}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  selectedCategory === 'all'
                    ? 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white shadow-lg shadow-cyan-500/25'
                    : 'bg-gray-800/50 text-gray-300 border border-gray-700/50 hover:border-cyan-500/50 hover:shadow-lg backdrop-blur-sm'
                }`}
              >
                <Icon name="Grid" className="w-5 h-5 inline-block mr-2" />
                All Resources
              </motion.button>
              
              {categories.map((category, index) => (
                <motion.button
                  key={category.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedCategory(category.category_key)}
                  className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center gap-2 ${
                    selectedCategory === category.category_key
                      ? 'text-white shadow-lg transform -translate-y-1'
                      : 'bg-gray-800/50 text-gray-300 border border-gray-700/50 hover:border-gray-600 hover:shadow-lg hover:transform hover:-translate-y-1 backdrop-blur-sm'
                  }`}
                  style={{
                    background: selectedCategory === category.category_key 
                      ? `linear-gradient(135deg, ${category.category_color}dd, ${category.category_color})`
                      : undefined,
                    boxShadow: selectedCategory === category.category_key 
                      ? `0 10px 25px ${category.category_color}40`
                      : undefined
                  }}
                >
                  <Icon name={category.category_icon || 'Gift'} className="w-5 h-5" />
                  {category.category_name}
                </motion.button>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Resources Grid - Matching Website Style */}
        <section className="py-20 bg-gradient-to-br from-black via-gray-900 to-gray-800 relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0" style={{
              backgroundImage: `linear-gradient(90deg, transparent 24%, rgba(255,255,255,.05) 25%, rgba(255,255,255,.05) 26%, transparent 27%, transparent 74%, rgba(255,255,255,.05) 75%, rgba(255,255,255,.05) 76%, transparent 77%, transparent), linear-gradient(0deg, transparent 24%, rgba(255,255,255,.05) 25%, rgba(255,255,255,.05) 26%, transparent 27%, transparent 74%, rgba(255,255,255,.05) 75%, rgba(255,255,255,.05) 76%, transparent 77%, transparent)`,
              backgroundSize: '75px 75px'
            }}></div>
          </div>
          
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="animate-pulse">
                    <div className="bg-gradient-to-br from-gray-700 to-gray-800 h-80 rounded-2xl"></div>
                  </div>
                ))}
              </div>
            ) : filteredResources.length === 0 ? (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-20"
              >
                <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-gray-800 to-gray-700 flex items-center justify-center">
                  <Icon name="Search" className="w-12 h-12 text-gray-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">
                  No resources found
                </h3>
                <p className="text-lg text-gray-400 max-w-md mx-auto">
                  Try adjusting your search terms or browse different categories
                </p>
              </motion.div>
            ) : (
              <>
                {/* Section Header */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="text-center mb-16"
                >
                  <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
                    Premium Resources
                  </h2>
                  <p className="text-lg text-gray-300">
                    {filteredResources.length} amazing resources found
                  </p>
                </motion.div>

                {/* Resources Grid */}
                <motion.div
                  layout
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                  <AnimatePresence>
                    {filteredResources.map((resource, index) => (
                      <motion.div
                        key={resource.id}
                        layout
                        initial={{ opacity: 0, y: 30, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -30, scale: 0.9 }}
                        transition={{ delay: index * 0.1, duration: 0.5 }}
                        whileHover={{ y: -10, scale: 1.02 }}
                        className="group cursor-pointer"
                        onClick={() => handleResourceClick(resource)}
                      >
                        <div className="relative bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-700/50 overflow-hidden h-full">
                          {/* Glow Effect */}
                          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                          
                          {/* Featured Badge */}
                          {resource.is_featured && (
                            <div className="absolute top-4 right-4 z-10">
                              <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                                ⭐ FEATURED
                              </div>
                            </div>
                          )}

                          {/* Resource Header */}
                          <div className="relative p-6 pb-4">
                            <div className="flex items-start justify-between mb-4">
                              <div className="flex items-center gap-3">
                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-lg bg-gradient-to-br`}
                                  style={{ 
                                    background: `linear-gradient(135deg, ${resource.resource_categories?.category_color}20, ${resource.resource_categories?.category_color}40)`
                                  }}
                                >
                                  <Icon 
                                    name={getResourceTypeIcon(resource.resource_type)} 
                                    className="w-6 h-6"
                                    style={{ color: resource.resource_categories?.category_color }}
                                  />
                                </div>
                                <div>
                                  <div className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
                                    {resource.resource_categories?.category_name}
                                  </div>
                                  <div className={`text-xs px-2 py-1 rounded-full font-medium ${getDifficultyColor(resource.difficulty_level)} mt-1`}>
                                    {resource.difficulty_level}
                                  </div>
                                </div>
                              </div>
                              <button
                                onClick={(e) => handleLikeResource(resource.id, e)}
                                className={`p-2 rounded-full transition-all duration-300 ${
                                  likedResources.has(resource.id)
                                    ? 'text-red-500 bg-red-50 dark:bg-red-900/20 scale-110'
                                    : 'text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20'
                                }`}
                              >
                                <Icon name="Heart" className="w-5 h-5" />
                              </button>
                            </div>
                            
                            <h3 className="font-bold text-xl text-white mb-3 group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:to-purple-400 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
                              {resource.title}
                            </h3>
                            
                            <p className="text-gray-300 text-sm leading-relaxed mb-4 line-clamp-3">
                              {resource.description}
                            </p>

                            {/* Tags */}
                            <div className="flex flex-wrap gap-2 mb-4">
                              {resource.tags?.slice(0, 3).map((tag) => (
                                <span
                                  key={tag}
                                  className="px-3 py-1 bg-gradient-to-r from-gray-700 to-gray-600 text-gray-300 text-xs rounded-full font-medium"
                                >
                                  #{tag}
                                </span>
                              ))}
                            </div>
                          </div>

                          {/* Stats and Time */}
                          <div className="px-6 py-4 bg-gradient-to-r from-gray-800/50 to-gray-700/50 border-t border-gray-700/50">
                            <div className="flex items-center justify-between text-sm">
                              <div className="flex items-center gap-4">
                                {resource.estimated_time && (
                                  <span className="text-gray-400 flex items-center gap-1">
                                    <Icon name="Clock" className="w-4 h-4" />
                                    {resource.estimated_time}
                                  </span>
                                )}
                              </div>
                              <div className="flex items-center gap-4 text-gray-400">
                                <span className="flex items-center gap-1">
                                  <Icon name="Eye" className="w-4 h-4" />
                                  {resource.view_count || 0}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Icon name="Heart" className="w-4 h-4" />
                                  {resource.like_count || 0}
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* CTA Footer */}
                          <div className="px-6 py-4 bg-gradient-to-r from-gray-900/80 to-gray-800/80">
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-semibold text-white">
                                View Full Resource
                              </span>
                              <div className="flex items-center gap-2 text-cyan-400 group-hover:translate-x-1 transition-transform duration-300">
                                <span className="text-sm font-medium">Explore</span>
                                <Icon name="ArrowRight" className="w-4 h-4" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </motion.div>
              </>
            )}
          </div>
        </section>
      </main>

      {/* Resource Detail Modal */}
      <AnimatePresence>
        {isModalOpen && selectedResource && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white dark:bg-gray-800 rounded-2xl max-w-4xl max-h-[90vh] overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="p-6 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-700 dark:to-gray-600">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div 
                        className="p-2 rounded-lg"
                        style={{ backgroundColor: `${selectedResource.resource_categories?.category_color}20` }}
                      >
                        <Icon 
                          name={getResourceTypeIcon(selectedResource.resource_type)} 
                          className="w-6 h-6"
                          style={{ color: selectedResource.resource_categories?.category_color }}
                        />
                      </div>
                      <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                        {selectedResource.resource_categories?.category_name}
                      </span>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                      {selectedResource.title}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400">
                      {selectedResource.description}
                    </p>
                  </div>
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                  >
                    <Icon name="X" className="w-6 h-6 text-gray-500" />
                  </button>
                </div>
              </div>

              {/* Modal Content */}
              <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
                {/* Main Content */}
                <div className="prose dark:prose-invert max-w-none mb-8">
                  <div className="whitespace-pre-wrap text-gray-700 dark:text-gray-300">
                    {selectedResource.content}
                  </div>
                </div>

                {/* Steps */}
                {selectedResource.steps && selectedResource.steps.length > 0 && (
                  <div className="mb-8">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                      Step-by-Step Guide
                    </h3>
                    <div className="space-y-4">
                      {selectedResource.steps.map((step, index) => (
                        <div key={index} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                          <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                            {index + 1}. {step.title}
                          </h4>
                          <p className="text-gray-600 dark:text-gray-400 mb-3">
                            {step.description}
                          </p>
                          {step.code && (
                            <div className="bg-gray-900 rounded-lg p-4 relative">
                              <button
                                onClick={() => copyToClipboard(step.code)}
                                className="absolute top-2 right-2 p-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-gray-300 hover:text-white transition-colors"
                              >
                                <Icon name="Copy" className="w-4 h-4" />
                              </button>
                              <pre className="text-green-400 text-sm overflow-x-auto pr-12">
                                {step.code}
                              </pre>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* External Links */}
                {selectedResource.external_links && selectedResource.external_links.length > 0 && (
                  <div className="mb-8">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                      Useful Links
                    </h3>
                    <div className="grid gap-3">
                      {selectedResource.external_links.map((link, index) => (
                        <a
                          key={index}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-3 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors"
                        >
                          <Icon name="ExternalLink" className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                          <div>
                            <div className="font-medium text-blue-900 dark:text-blue-100">
                              {link.title}
                            </div>
                            <div className="text-sm text-blue-600 dark:text-blue-400">
                              {link.description}
                            </div>
                          </div>
                        </a>
                      ))}
                    </div>
                  </div>
                )}

                {/* Tags */}
                {selectedResource.tags && selectedResource.tags.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                      Tags
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedResource.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-sm rounded-full"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
};

export default FreeResourcesHub;
