import React, { useEffect, useState, useMemo } from 'react';
import { Helmet } from 'react-helmet';
import { motion, AnimatePresence } from 'framer-motion';

import Footer from '../../components/ui/Footer';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Header from '../../components/ui/Header';
import SEOHead from '../../components/SEOHead';
import ModernNewsletterSignup from '../../components/ModernNewsletterSignup';
import { Link } from 'react-router-dom';
import postsData from './posts';
import { fetchBlogPosts, supabase } from '../../services/supabaseClient';
import cmsContentService from '../../services/cmsContentService';

const BlogPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('grid'); // grid or list
  const [sortBy, setSortBy] = useState('newest'); // newest, oldest, popular, trending
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [heroContent, setHeroContent] = useState({
    title: 'Blog & Tutorials',
    subtitle: 'Expert Insights on Web Development', 
    description: 'Comprehensive tutorials, development insights, and case studies'
  });

  // Load blog posts from Supabase on mount
  useEffect(() => {
    const loadBlogPosts = async () => {
      try {
        setIsLoading(true);
        const supabasePosts = await fetchBlogPosts();
        
        // Transform Supabase data to match expected format - NO FALLBACK TO DEMO CONTENT
        const transformedPosts = supabasePosts.map(post => ({
          id: post.id,
          title: post.title,
          slug: post.slug || post.title.toLowerCase().replace(/\s+/g, '-'),
          excerpt: post.excerpt,
          content: post.content,
          category: post.category,
          tags: post.tags || [],
          image: post.image || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
          date: post.createdAt,
          readTime: post.readTime || '5 min read',
          views: post.views || 0,
          likes: post.likes || 0,
          status: post.status
        }));
        setPosts(transformedPosts);
      } catch (error) {
        console.error('Failed to load blog posts from Supabase:', error);
        setPosts([]); // Empty array instead of demo content
      } finally {
        setIsLoading(false);
      }
    };

    loadBlogPosts();

    // Setup real-time subscription for blog posts
    const setupRealtimeSubscription = () => {
      if (!supabase) return;

      const channel = supabase
        .channel('blog_posts_changes')
        .on('postgres_changes', 
          { event: '*', schema: 'public', table: 'blog_posts' }, 
          (payload) => {
            console.log('Real-time update:', payload);
            
            if (payload.eventType === 'INSERT') {
              const newPost = {
                id: payload.new.id,
                title: payload.new.title,
                slug: payload.new.slug || payload.new.title.toLowerCase().replace(/\s+/g, '-'),
                excerpt: payload.new.excerpt,
                content: payload.new.content,
                category: payload.new.category,
                tags: payload.new.tags || [],
                image: payload.new.image || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
                date: payload.new.createdAt,
                readTime: payload.new.readTime || '5 min read',
                views: payload.new.views || 0,
                likes: payload.new.likes || 0,
                status: payload.new.status
              };
              setPosts(prev => [newPost, ...prev]);
            }
            
            if (payload.eventType === 'UPDATE') {
              setPosts(prev => prev.map(post => 
                post.id === payload.new.id ? {
                  ...post,
                  title: payload.new.title,
                  excerpt: payload.new.excerpt,
                  content: payload.new.content,
                  category: payload.new.category,
                  tags: payload.new.tags || [],
                  image: payload.new.image || post.image,
                  readTime: payload.new.readTime || post.readTime,
                  status: payload.new.status
                } : post
              ));
            }
            
            if (payload.eventType === 'DELETE') {
              setPosts(prev => prev.filter(post => post.id !== payload.old.id));
            }
          }
        )
        .subscribe();

      return () => {
        supabase.removeChannel(channel);
      };
    };

    const cleanup = setupRealtimeSubscription();
    return cleanup;
  }, []);

  // Load hero content from CMS
  useEffect(() => {
    const loadHeroContent = async () => {
      try {
        const result = await cmsContentService.getSectionContent('blog', 'hero');
        if (result.success && result.data) {
          setHeroContent(prev => ({
            ...prev,
            ...result.data
          }));
          console.log('✅ Blog hero content loaded from CMS:', result.data, 'Source:', result.source);
        }
      } catch (error) {
        console.error('❌ Error loading blog hero content:', error);
      }
    };

    loadHeroContent();

    // Subscribe to content changes
    const unsubscribe = cmsContentService.subscribe((allContent) => {
      if (allContent.blog?.hero) {
        setHeroContent(prev => ({
          ...prev,
          ...allContent.blog.hero
        }));
        console.log('🔄 Blog hero content updated from CMS:', allContent.blog.hero);
      }
    });

    return unsubscribe;
  }, []);

  // Generate categories dynamically from posts + predefined ones
  const generateCategories = () => {
    const baseCats = [
      { id: 'all', label: 'All Posts', icon: 'Grid', count: posts.length },
    ];

    // Get unique categories from posts
    const uniqueCategories = [...new Set(posts.map(p => p.category).filter(Boolean))];
    
    // Map categories to display with icons
    const categoryMap = {
      'react': { label: 'React', icon: 'Code' },
      'javascript': { label: 'JavaScript', icon: 'Zap' },
      'typescript': { label: 'TypeScript', icon: 'FileText' },
      'nodejs': { label: 'Node.js', icon: 'Server' },
      'css': { label: 'CSS', icon: 'Palette' },
      'html': { label: 'HTML', icon: 'Globe' },
      'vue': { label: 'Vue.js', icon: 'Triangle' },
      'angular': { label: 'Angular', icon: 'Box' },
      'python': { label: 'Python', icon: 'Terminal' },
      'php': { label: 'PHP', icon: 'Code' },
      'laravel': { label: 'Laravel', icon: 'Layers' },
      'wordpress': { label: 'WordPress', icon: 'Globe' },
      'shopify': { label: 'Shopify', icon: 'ShoppingBag' },
      'ecommerce': { label: 'E-commerce', icon: 'ShoppingCart' },
      'web-development': { label: 'Web Development', icon: 'Monitor' },
      'mobile-development': { label: 'Mobile Development', icon: 'Smartphone' },
      'ui-ux': { label: 'UI/UX Design', icon: 'Palette' },
      'design': { label: 'Design', icon: 'Brush' },
      'productivity': { label: 'Productivity', icon: 'Clock' },
      'tutorials': { label: 'Tutorials', icon: 'BookOpen' },
      'tips': { label: 'Tips & Tricks', icon: 'Lightbulb' },
      'other': { label: 'Other', icon: 'MoreHorizontal' }
    };

    // Create category objects for unique categories found in posts
    const dynamicCats = uniqueCategories.map(cat => ({
      id: cat,
      label: categoryMap[cat]?.label || cat.charAt(0).toUpperCase() + cat.slice(1),
      icon: categoryMap[cat]?.icon || 'Tag',
      count: posts.filter(p => p.category === cat).length
    }));

    // Add special tag-based categories
    const tagBasedCats = [
      { id: 'tutorials', label: 'Tutorials', icon: 'BookOpen', count: posts.filter(p => p.tags?.includes('tutorial')).length },
      { id: 'tips', label: 'Tips & Tricks', icon: 'Lightbulb', count: posts.filter(p => p.tags?.includes('tips')).length }
    ].filter(cat => cat.count > 0); // Only show if there are posts

    return [...baseCats, ...dynamicCats, ...tagBasedCats];
  };

  const categories = useMemo(() => generateCategories(), [posts]);

  // Filter and sort posts
  const filteredPosts = posts
    .filter(post => {
      const matchesCategory = selectedCategory === 'all' || 
                             post.category === selectedCategory ||
                             (selectedCategory === 'tutorials' && post.tags?.includes('tutorial')) ||
                             (selectedCategory === 'tips' && post.tags?.includes('tips'));
      const matchesSearch = searchTerm === '' || 
                           post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           post.tags?.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      return matchesCategory && matchesSearch;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'oldest':
          return new Date(a.date) - new Date(b.date);
        case 'popular':
          return (b.views || 0) - (a.views || 0);
        case 'trending':
          return (b.likes || 0) - (a.likes || 0);
        default: // newest
          return new Date(b.date) - new Date(a.date);
      }
    });

  const formatDate = (d) => new Date(d).toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  const getReadingTime = (content) => {
    const wordsPerMinute = 200;
    let words = 500; // Default word count
    
    if (Array.isArray(content)) {
      // If content is an array, join all paragraphs and count words
      words = content.join(' ').split(' ').length;
    } else if (typeof content === 'string') {
      // If content is a string, split and count words
      words = content.split(' ').length;
    }
    
    return Math.ceil(words / wordsPerMinute);
  };

  const getCategoryColor = (category) => {
    const colors = {
      shopify: 'bg-green-500/20 text-green-400 border-green-500/30',
      wordpress: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
      react: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
      javascript: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
      default: 'bg-gray-500/20 text-gray-400 border-gray-500/30'
    };
    return colors[category] || colors.default;
  };

  const FeaturedPost = ({ post }) => (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="relative bg-gradient-to-br from-gray-800/50 to-gray-900/80 backdrop-blur-sm border border-gray-700/50 rounded-3xl overflow-hidden group hover:border-gray-600/70 transition-all duration-500"
    >
      <div className="grid md:grid-cols-2 gap-0">
        <div className="relative h-64 md:h-full overflow-hidden">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold border ${getCategoryColor(post.category)}`}>
            {post.category?.toUpperCase()}
          </div>
          <div className="absolute top-4 right-4 px-3 py-1 bg-black/50 rounded-full text-white text-xs backdrop-blur-sm">
            Featured
          </div>
        </div>
        
        <div className="p-8 md:p-12 flex flex-col justify-center">
          <div className="flex items-center gap-4 mb-4 text-sm text-gray-400">
            <span className="flex items-center gap-1">
              <Icon name="Calendar" size={14} />
              {formatDate(post.date)}
            </span>
            <span className="flex items-center gap-1">
              <Icon name="Clock" size={14} />
              {post.readTime || `${getReadingTime(post.content)} min read`}
            </span>
            <span className="flex items-center gap-1">
              <Icon name="Eye" size={14} />
              {post.views || 0} views
            </span>
          </div>
          
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 group-hover:text-blue-300 transition-colors">
            {post.title}
          </h2>
          
          <p className="text-gray-300 mb-6 leading-relaxed line-clamp-3">
            {post.excerpt}
          </p>
          
          <div className="flex flex-wrap gap-2 mb-6">
            {post.tags?.slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-gray-700/50 text-gray-300 text-xs rounded-full"
              >
                #{tag}
              </span>
            ))}
          </div>
          
          <Link to={`/blog/${post.slug}`}>
            <Button className="bg-blue-600 hover:bg-blue-500 text-white">
              <Icon name="ArrowRight" size={16} className="mr-2" />
              Read Full Article
            </Button>
          </Link>
        </div>
      </div>
    </motion.div>
  );

  const PostCard = ({ post, index, isListView = false }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      className={`relative bg-gradient-to-br from-gray-800/50 to-gray-900/80 backdrop-blur-sm border border-gray-700/50 rounded-2xl overflow-hidden group hover:border-gray-600/70 transition-all duration-500 hover:shadow-2xl ${
        isListView ? 'flex' : ''
      }`}
    >
      <div className={`relative ${isListView ? 'w-64 flex-shrink-0' : 'h-48'} overflow-hidden`}>
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <div className={`absolute top-3 left-3 px-2 py-1 rounded-lg text-xs font-semibold border ${getCategoryColor(post.category)}`}>
          {post.category?.toUpperCase()}
        </div>
      </div>
      
      <div className="p-6 flex-1">
        <div className="flex items-center gap-3 mb-3 text-xs text-gray-400">
          <span className="flex items-center gap-1">
            <Icon name="Calendar" size={12} />
            {formatDate(post.date)}
          </span>
          <span className="flex items-center gap-1">
            <Icon name="Clock" size={12} />
            {post.readTime || `${getReadingTime(post.content)} min`}
          </span>
          <span className="flex items-center gap-1">
            <Icon name="Eye" size={12} />
            {post.views || 0}
          </span>
        </div>
        
        <h3 className={`font-bold text-white mb-3 group-hover:text-blue-300 transition-colors line-clamp-2 ${
          isListView ? 'text-lg' : 'text-xl'
        }`}>
          {post.title}
        </h3>
        
        <p className="text-gray-400 mb-4 leading-relaxed line-clamp-2">
          {post.excerpt}
        </p>
        
        <div className="flex flex-wrap gap-1 mb-4">
          {post.tags?.slice(0, 2).map((tag, tagIndex) => (
            <span
              key={tagIndex}
              className="px-2 py-1 bg-gray-700/50 text-gray-300 text-xs rounded-md"
            >
              #{tag}
            </span>
          ))}
        </div>
        
        <div className="flex items-center justify-between">
          <Link to={`/blog/${post.slug}`}>
            <Button size="sm" variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800/50">
              <Icon name="ArrowRight" size={14} className="mr-1" />
              Read More
            </Button>
          </Link>
          
          <div className="flex items-center gap-2 text-gray-500">
            <button className="hover:text-red-400 transition-colors">
              <Icon name="Heart" size={14} />
            </button>
            <span className="text-xs">{post.likes || 0}</span>
            <button className="hover:text-blue-400 transition-colors">
              <Icon name="Share" size={14} />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-black">
      <SEOHead
        title="Blog & Tutorials - Expert Insights on Web Development"
        description="Explore comprehensive tutorials, insights, and case studies on Shopify development, WordPress customization, React.js, and modern web technologies. Learn from real-world projects and expert tips."
        keywords="web development blog, Shopify tutorials, WordPress guides, React.js tips, full stack development, e-commerce solutions, performance optimization, JavaScript tutorials"
        canonicalUrl={`${window.location.origin}/blog-tutorials-insights`}
        structuredData={{
          "@context": "https://schema.org",
          "@type": "Blog",
          "name": "CDW Burhan Development Blog",
          "description": "Expert insights on web development, Shopify, WordPress, and modern JavaScript frameworks",
          "url": `${window.location.origin}/blog-tutorials-insights`,
          "author": {
            "@type": "Person",
            "name": "Burhan Ahmad",
            "jobTitle": "Full Stack Developer & Digital Alchemist"
          },
          "blogPost": posts.slice(0, 10).map(post => ({
            "@type": "BlogPosting",
            "headline": post.title,
            "description": post.excerpt,
            "url": `${window.location.origin}/blog-tutorials-insights/${post.slug}`,
            "datePublished": post.date,
            "author": {
              "@type": "Person",
              "name": "Burhan Ahmad"
            }
          }))
        }}
      />
      
      <Header />
      
      {/* Header Section - Clean & Professional */}
      <section className="pt-32 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">
              <span className="text-white">{heroContent.title || 'Blog & Tutorials'}</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              {heroContent.description || 'Comprehensive tutorials, development insights, and case studies'}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-12 bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="flex flex-wrap justify-center gap-4">
              {categories.map((category, index) => (
                <motion.button
                  key={category.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center px-4 py-3 rounded-2xl border transition-all duration-300 ${
                    selectedCategory === category.id
                      ? 'bg-blue-500/20 border-blue-500/50 text-blue-300'
                      : 'bg-gray-800/50 border-gray-700/50 text-gray-400 hover:bg-gray-800/70 hover:border-gray-600/70'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon name={category.icon} size={16} className="mr-2" />
                  {category.label}
                  <span className={`ml-2 px-2 py-1 rounded-full text-xs ${
                    selectedCategory === category.id ? 'bg-blue-500/30 text-blue-200' : 'bg-gray-700/50 text-gray-500'
                  }`}>
                    {category.count}
                  </span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Post */}
      {!isLoading && filteredPosts.length > 0 && (
        <section className="py-20 bg-black">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="mb-16"
            >
              <h2 className="text-3xl font-bold text-white text-center mb-4">Featured Article</h2>
              <p className="text-gray-400 text-center mb-12">Our most popular and comprehensive tutorial</p>
              <FeaturedPost post={filteredPosts[0]} />
            </motion.div>
          </div>
        </section>
      )}

      {/* Posts Grid/List */}
      <section className="py-20 bg-gray-900/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            {/* Search and Filters */}
            <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 mb-8">
              <div className="flex flex-col lg:flex-row gap-4">
                {/* Search Bar */}
                <div className="relative flex-1">
                  <Icon name="Search" size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search articles, tutorials, technologies..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent"
                  />
                </div>

                {/* Sort and View Options */}
                <div className="flex gap-3">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                  >
                    <option value="newest">Newest First</option>
                    <option value="oldest">Oldest First</option>
                    <option value="popular">Most Popular</option>
                    <option value="trending">Trending</option>
                  </select>

                  {/* View Mode Toggle */}
                  <div className="flex bg-gray-800/50 border border-gray-700/50 rounded-xl overflow-hidden">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`p-3 transition-colors ${
                        viewMode === 'grid' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white'
                      }`}
                    >
                      <Icon name="Grid" size={18} />
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`p-3 transition-colors ${
                        viewMode === 'list' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white'
                      }`}
                    >
                      <Icon name="List" size={18} />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-white">
                All Articles 
                <span className="text-gray-400 text-lg ml-3">({filteredPosts.length})</span>
              </h2>
            </div>

            {isLoading ? (
              <div className="text-center py-16">
                <div className="animate-spin w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
                <h3 className="text-2xl font-bold text-white mb-2">Loading Blog Posts</h3>
                <p className="text-gray-400">
                  Fetching the latest articles from our database...
                </p>
              </div>
            ) : (
              <>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`${selectedCategory}-${searchTerm}-${viewMode}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className={
                      viewMode === 'grid' 
                        ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'
                        : 'space-y-6'
                    }
                  >
                    {filteredPosts.slice(1).map((post, index) => (
                      <PostCard
                        key={post.id}
                        post={post}
                        index={index}
                        isListView={viewMode === 'list'}
                      />
                    ))}
                  </motion.div>
                </AnimatePresence>

                {filteredPosts.length === 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-20"
              >
                <Icon name="Search" size={64} className="text-gray-600 mx-auto mb-6" />
                <h3 className="text-2xl font-bold text-white mb-4">No Articles Found</h3>
                <p className="text-gray-400 mb-8">
                  Try adjusting your search terms or category filter.
                </p>
                <Button
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory('all');
                  }}
                  className="bg-blue-600 hover:bg-blue-500"
                >
                  Clear Filters
                </Button>
              </motion.div>
            )}
              </>
            )}
          </motion.div>
        </div>
      </section>

      {/* Newsletter Subscription */}
      <section className="py-20 bg-gradient-to-r from-blue-900/20 to-purple-900/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <ModernNewsletterSignup
              title="📚 Never Miss a Tutorial"
              description="Get the latest web development tutorials, insights, and best practices delivered straight to your inbox. Join thousands of developers already subscribed!"
              variant="default"
              source="website"
              showName={false}
              placeholder="Enter your email for latest tutorials"
              buttonText="Subscribe to Newsletter"
              className="max-w-2xl mx-auto"
            />
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default BlogPage;