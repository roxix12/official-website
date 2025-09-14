import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '../../components/ui/Header';
import Footer from '../../components/ui/Footer';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import { fetchProjects, supabase } from '../../services/supabaseClient';

const ProjectsShowcase = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const categories = [
    { id: 'all', label: 'All Projects', icon: 'Grid' },
    { id: 'websites', label: 'Websites', icon: 'Globe' },
    { id: 'apps', label: 'Mobile Apps', icon: 'Smartphone' },
    { id: 'ecommerce', label: 'E-commerce', icon: 'ShoppingCart' },
    { id: 'tools', label: 'Tools & Utilities', icon: 'Settings' },
    { id: 'ui-ux', label: 'UI/UX Design', icon: 'Palette' }
  ];

  // Load projects from Supabase
  useEffect(() => {
    const loadProjects = async () => {
      try {
        setIsLoading(true);
        const supabaseProjects = await fetchProjects();
        setProjects(supabaseProjects);
      } catch (error) {
        console.error('Failed to load projects:', error);
        setProjects([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadProjects();

    // Real-time subscription for projects
    const channel = supabase
      ?.channel('projects_showcase_changes')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'projects' }, 
        (payload) => {
          console.log('Real-time project update:', payload);
          loadProjects(); // Reload projects on any change
        }
      )
      .subscribe();

    return () => {
      if (channel) {
        supabase.removeChannel(channel);
      }
    };
  }, []);

  // Remove the static projects array - now using dynamic data
  const staticProjects = [
    // REMOVED: All static project data
    // Now using real Supabase data via projects state
  ];

  // Filter projects based on category and search
  const filteredProjects = projects.filter(project => {
    const matchesCategory = activeCategory === 'all' || project.category === activeCategory;
    const matchesSearch = project.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.technologies?.some(tech => tech.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const handlePreviewWebsite = (project) => {
    if (project.liveUrl) {
      window.open(project.liveUrl, '_blank');
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-black text-white">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="animate-spin w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-gray-400">Loading projects...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }



  return (
    <div className="min-h-screen bg-black">
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-24 lg:pt-32 pb-20 bg-gradient-to-br from-black via-gray-900 to-black overflow-hidden">
        {/* Animated Background Patterns */}
        <div className="absolute inset-0">
          <div 
            className="absolute inset-0 opacity-[0.02]"
            style={{
              backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(0,212,255,0.3) 1px, transparent 0)',
              backgroundSize: '50px 50px'
            }}
          />
          <motion.div 
            className="absolute top-20 left-20 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl"
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.2, 0.1]
            }}
            transition={{ 
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div 
            className="absolute bottom-20 right-20 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"
            animate={{ 
              scale: [1.2, 1, 1.2],
              opacity: [0.2, 0.1, 0.2]
            }}
            transition={{ 
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div 
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-400/5 rounded-full blur-3xl"
            animate={{ 
              rotate: [0, 360],
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        </div>
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/10" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-500/30 rounded-full text-cyan-300 text-sm font-medium mb-8 backdrop-blur-sm hover:from-cyan-500/30 hover:to-purple-500/30 hover:border-cyan-400/50 transition-all duration-300"
            >
              <Icon name="FolderOpen" size={16} className="mr-2 text-cyan-400" />
              Complete Project Showcase
            </motion.div>

            <motion.h1 
              className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-8 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              <span className="text-white mb-3 block">My</span>
              <motion.span 
                className="block bg-gradient-to-r from-cyan-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent font-extrabold"
                animate={{ 
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                }}
                transition={{ 
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                style={{
                  backgroundSize: '200% 200%',
                  filter: 'drop-shadow(0 0 30px rgba(0,212,255,0.3))'
                }}
              >
                Project Gallery
              </motion.span>
            </motion.h1>

            <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
              Explore my comprehensive collection of websites, mobile apps, e-commerce platforms, 
              tools, and UI/UX designs. Each project represents a unique solution crafted with 
              passion and precision.
            </p>

            {/* Search Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="max-w-md mx-auto mb-12"
            >
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative">
                  <Icon name="Search" size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-cyan-400" />
                  <input
                    type="text"
                    placeholder="Search projects, technologies..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 bg-gradient-to-r from-gray-900/60 via-gray-800/50 to-gray-900/60 border border-cyan-400/20 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-400/50 backdrop-blur-xl transition-all duration-300 hover:border-cyan-400/40"
                  />
                </div>
              </div>
            </motion.div>

            {/* Project Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto"
            >
              {[
                { number: projects.length, label: 'Total Projects', icon: 'Folder', color: 'from-cyan-500 to-cyan-600' },
                { number: projects.filter(p => p.category === 'websites').length, label: 'Websites', icon: 'Globe', color: 'from-purple-500 to-purple-600' },
                { number: projects.filter(p => p.category === 'apps').length, label: 'Mobile Apps', icon: 'Smartphone', color: 'from-cyan-400 to-purple-500' },
                { number: projects.filter(p => p.category === 'ecommerce').length, label: 'E-commerce', icon: 'ShoppingCart', color: 'from-purple-400 to-cyan-500' }
              ].map((stat, index) => (
                <motion.div 
                  key={index} 
                  className="text-center group"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <div className="relative">
                    <div className={`w-16 h-16 bg-gradient-to-r ${stat.color} rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:shadow-xl group-hover:shadow-cyan-500/25 transition-all duration-300 group-hover:scale-110`}>
                      <Icon name={stat.icon} size={24} className="text-white" />
                    </div>
                  </div>
                  <motion.div 
                    className="text-3xl font-bold mb-2 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent"
                    animate={{ 
                      backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                    }}
                    transition={{ 
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: index * 0.2
                    }}
                    style={{ backgroundSize: '200% 200%' }}
                  >
                    {stat.number}
                  </motion.div>
                  <div className="text-gray-300 text-sm font-medium">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-12 bg-gradient-to-br from-black via-gray-900 to-black">
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
                  onClick={() => setActiveCategory(category.id)}
                  className={`relative group flex items-center px-6 py-3 rounded-2xl border transition-all duration-300 backdrop-blur-xl ${
                    activeCategory === category.id
                      ? 'bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border-cyan-500/50 text-cyan-300 shadow-lg shadow-cyan-500/25'
                      : 'bg-gradient-to-r from-gray-900/60 via-gray-800/50 to-gray-900/60 border-gray-700/50 text-gray-400 hover:border-cyan-400/30 hover:text-cyan-300'
                  }`}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {/* Glow Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className="relative flex items-center">
                    <Icon name={category.icon} size={18} className="mr-2" />
                    {category.label}
                    <span className={`ml-2 px-2 py-1 rounded-full text-xs transition-all duration-300 ${
                      activeCategory === category.id 
                        ? 'bg-cyan-500/30 text-cyan-200' 
                        : 'bg-gray-700/50 text-gray-500 group-hover:bg-cyan-500/20 group-hover:text-cyan-300'
                    }`}>
                      {category.id === 'all' ? projects.length : projects.filter(p => p.category === category.id).length}
                    </span>
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-20 bg-gradient-to-br from-black via-gray-900 to-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory + searchTerm}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredProjects.map((project, index) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  index={index}
                />
              ))}
            </motion.div>
          </AnimatePresence>

          {filteredProjects.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-20"
            >
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-full blur-3xl opacity-50" />
                <Icon name="Search" size={64} className="relative text-cyan-400/60 mx-auto mb-6" />
              </div>
              <h3 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-4">
                No Projects Found
              </h3>
              <p className="text-gray-300 mb-8 max-w-md mx-auto">
                Try adjusting your search terms or category filter to discover more projects.
              </p>
              <Button
                onClick={() => {
                  setSearchTerm('');
                  setActiveCategory('all');
                }}
                className="bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-500 hover:to-purple-500 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl hover:shadow-cyan-500/25 transform hover:scale-105 transition-all duration-300"
              >
                Clear Filters
              </Button>
            </motion.div>
          )}
        </div>
      </section>



      <Footer />
    </div>
  );
};

// Project Card Component
const ProjectCard = ({ project, index }) => {
  const [isHovered, setIsHovered] = useState(false);

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'in-progress': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'coming-soon': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'websites': return 'bg-blue-500/20 text-blue-400';
      case 'apps': return 'bg-green-500/20 text-green-400';
      case 'ecommerce': return 'bg-purple-500/20 text-purple-400';
      case 'tools': return 'bg-orange-500/20 text-orange-400';
      case 'ui-ux': return 'bg-pink-500/20 text-pink-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      viewport={{ once: true }}
      className="group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative bg-gradient-to-br from-gray-800/50 to-gray-900/80 backdrop-blur-sm border border-gray-700/50 rounded-3xl overflow-hidden transition-all duration-500 hover:border-gray-600/70 hover:shadow-2xl">
        {/* Project Image */}
        <div className="relative h-48 overflow-hidden">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          
          {/* Status Badge */}
          <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(project.status)}`}>
            {project.status.replace('-', ' ').toUpperCase()}
          </div>

          {/* Category Badge */}
          <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold ${getCategoryColor(project.category)}`}>
            {project.category.replace('-', ' ').toUpperCase()}
          </div>

          {/* Year */}
          <div className="absolute bottom-4 right-4 text-white/80 text-sm font-medium">
            {project.year}
          </div>
        </div>

        {/* Project Content */}
        <div className="p-6">
          <div className="flex items-start justify-between mb-4">
            <h3 className="text-xl font-bold text-white group-hover:text-blue-300 transition-colors line-clamp-2">
              {project.title}
            </h3>
          </div>

          <p className="text-gray-400 mb-4 line-clamp-2 leading-relaxed">
            {project.description}
          </p>

          {/* Client & Duration */}
          <div className="flex justify-between items-center mb-4 text-sm text-gray-500">
            <span>Client: {project.client}</span>
            <span>{project.duration}</span>
          </div>

          {/* Technologies */}
          <div className="flex flex-wrap gap-2 mb-6">
            {project.technologies.slice(0, 3).map((tech, techIndex) => (
              <span
                key={techIndex}
                className="px-2 py-1 bg-gray-700/50 text-gray-300 text-xs rounded-lg"
              >
                {tech}
              </span>
            ))}
            {project.technologies.length > 3 && (
              <span className="px-2 py-1 bg-gray-700/50 text-gray-300 text-xs rounded-lg">
                +{project.technologies.length - 3} more
              </span>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            {project.liveUrl && (
              <Button
                size="sm"
                onClick={() => window.open(project.liveUrl, '_blank')}
                className="flex-1 bg-blue-600 hover:bg-blue-500 text-white"
              >
                <Icon name="Eye" size={16} className="mr-2" />
                Preview
              </Button>
            )}
            
            {project.githubUrl && (
              <Button
                size="sm"
                variant="outline"
                onClick={() => window.open(project.githubUrl, '_blank')}
                className="flex-1 border-gray-600 text-gray-300 hover:bg-gray-800/50"
              >
                <Icon name="Code" size={16} className="mr-2" />
                Code
              </Button>
            )}

            {!project.githubUrl && (
              <Button
                size="sm"
                onClick={() => window.open(project.liveUrl, '_blank')}
                className="flex-1 bg-purple-600 hover:bg-purple-500 text-white"
              >
                <Icon name="Globe" size={16} className="mr-2" />
                Visit
              </Button>
            )}
          </div>
        </div>

        {/* Hover Overlay */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-gradient-to-t from-blue-600/20 via-transparent to-transparent pointer-events-none"
            />
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default ProjectsShowcase;
