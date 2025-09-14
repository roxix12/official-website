import { supabase } from './supabaseClient';

// In-memory cache of the latest content snapshot available to consumers
let currentContent = {};

/**
 * CMS Content Service for Main Website
 * Loads content from database or localStorage for display on main site
 */
class CMSContentService {
  constructor() {
    this.cache = new Map();
    this.cacheExpiry = 5 * 60 * 1000; // 5 minutes
    this.subscribers = [];
  }

  /**
   * Initialize the service and set up content loading
   */
  async initialize() {
    try {
      console.log('🔄 Initializing CMS content service...');
      
      // Load initial content
      await this.loadAllContent();
      
      // Set up storage event listener for real-time updates from admin panel
      this.setupStorageListener();
      
      // Set up database realtime subscription if available
      this.setupDatabaseSubscription();
      
      console.log('✅ CMS content service initialized');
    } catch (error) {
      console.error('❌ Failed to initialize CMS content service:', error);
    }
  }

  /**
   * Load content for a specific page
   */
  async loadPageContent(pageKey) {
    try {
      // Check cache first
      const cacheKey = `page_${pageKey}`;
      const cached = this.cache.get(cacheKey);
      if (cached && Date.now() - cached.timestamp < this.cacheExpiry) {
        return { success: true, data: cached.data, source: 'cache' };
      }

      // Try database first
      try {
        const { data: sections, error } = await supabase
          .from('content_sections')
          .select('*')
          .eq('page_key', pageKey)
          .eq('is_active', true);

        if (!error && sections && sections.length > 0) {
          const content = {};
          sections.forEach(section => {
            content[section.section_key] = section.section_content || {};
          });
          
          // Cache the result
          this.cache.set(cacheKey, { data: content, timestamp: Date.now() });
          
          console.log(`✅ Page content loaded from database: ${pageKey}`);
          return { success: true, data: content, source: 'database' };
        }
      } catch (dbError) {
        console.log('📦 Database unavailable, trying localStorage...');
      }

      // Fallback to localStorage
      const localContent = this.loadFromLocalStorage();
      if (localContent && localContent[pageKey]) {
        console.log(`✅ Page content loaded from localStorage: ${pageKey}`);
        return { success: true, data: localContent[pageKey], source: 'localStorage' };
      }

      // Return default content if nothing found
      const defaultContent = this.getDefaultContent(pageKey);
      console.log(`🔧 Using default content for: ${pageKey}`);
      return { success: true, data: defaultContent, source: 'default' };

    } catch (error) {
      console.error(`❌ Error loading page content for ${pageKey}:`, error);
      return { success: false, error: error.message };
    }
  }

  /**
   * Load all content
   */
  async loadAllContent() {
    try {
      // Try database first
      try {
        const { data: sections, error } = await supabase
          .from('content_sections')
          .select('*')
          .eq('is_active', true);

        if (!error && sections && sections.length > 0) {
          const content = {};
          sections.forEach(section => {
            if (!content[section.page_key]) {
              content[section.page_key] = {};
            }
            content[section.page_key][section.section_key] = section.section_content || {};
          });
          
          console.log('✅ All content loaded from database');
          currentContent = content;
          this.notifySubscribers(content);
          return { success: true, data: content, source: 'database' };
        }
      } catch (dbError) {
        console.log('📦 Database unavailable, trying localStorage...');
      }

      // Fallback to localStorage
      const localContent = this.loadFromLocalStorage();
      if (localContent && Object.keys(localContent).length > 0) {
        console.log('✅ Content loaded from localStorage');
        currentContent = localContent;
        this.notifySubscribers(localContent);
        return { success: true, data: localContent, source: 'localStorage' };
      }

      console.log('🔧 No content found, using defaults');
      return { success: true, data: {}, source: 'default' };

    } catch (error) {
      console.error('❌ Error loading all content:', error);
      return { success: false, error: error.message };
    }
  }

  /**
   * Public getters
   */
  getContent() {
    return currentContent;
  }

  getPageContent(pageKey) {
    return currentContent?.[pageKey] || {};
  }

  /**
   * Get content for a specific section
   */
  async getSectionContent(pageKey, sectionKey) {
    try {
      const pageResult = await this.loadPageContent(pageKey);
      if (pageResult.success && pageResult.data[sectionKey]) {
        return {
          success: true,
          data: pageResult.data[sectionKey],
          source: pageResult.source
        };
      }
      
      // Return default section content
      return {
        success: true,
        data: this.getDefaultSectionContent(pageKey, sectionKey),
        source: 'default'
      };
    } catch (error) {
      console.error(`❌ Error getting section content ${pageKey}/${sectionKey}:`, error);
      return { success: false, error: error.message };
    }
  }

  /**
   * Load from localStorage
   */
  loadFromLocalStorage() {
    try {
      const stored = localStorage.getItem('websiteContent');
      return stored ? JSON.parse(stored) : null;
    } catch (error) {
      console.error('❌ Error loading from localStorage:', error);
      return null;
    }
  }

  /**
   * Set up storage event listener for real-time updates
   */
  setupStorageListener() {
    window.addEventListener('storage', (event) => {
      if (event.key === 'websiteContent') {
        try {
          const newContent = JSON.parse(event.newValue);
          console.log('🔄 Content updated from admin panel:', newContent);
          
          // Update current content
          currentContent = newContent || {};
          
          // Notify subscribers
          this.notifySubscribers(newContent);
        } catch (error) {
          console.error('❌ Error parsing storage update:', error);
        }
      }
    });
  }

  /**
   * Set up database realtime subscription
   */
  setupDatabaseSubscription() {
    try {
      const subscription = supabase
        .channel('content_updates')
        .on(
          'postgres_changes',
          { event: '*', schema: 'public', table: 'content_sections' },
          (payload) => {
            console.log('🔄 Database content updated:', payload);
            // Clear cache and reload content
            this.cache.clear();
            this.loadAllContent();
          }
        )
        .subscribe();
        
      console.log('✅ Database realtime subscription active');
    } catch (error) {
      console.log('📦 Database realtime not available:', error.message);
    }
  }

  /**
   * Subscribe to content changes
   */
  subscribe(callback) {
    this.subscribers.push(callback);
    return () => {
      this.subscribers = this.subscribers.filter(cb => cb !== callback);
    };
  }

  /**
   * Notify all subscribers of content changes
   */
  notifySubscribers(content) {
    // Update current content
    currentContent = content || {};
    
    // Notify all subscribers
    this.subscribers.forEach(callback => {
      try {
        callback(content);
      } catch (error) {
        console.error('❌ Error in content subscriber:', error);
      }
    });
  }

  /**
   * Get default content structure
   */
  getDefaultContent(pageKey) {
    const defaults = {
      homepage: {
        hero: {
          title: 'Welcome to My Portfolio',
          subtitle: 'Full Stack Developer',
          description: 'Creating amazing digital experiences with modern technologies.',
          backgroundImage: '/assets/images/hero.jpg',
          ctaText: 'View My Work',
          ctaLink: '/portfolio'
        }
      },
      about: {
        hero: {
          title: 'About Me',
          subtitle: 'Passionate Developer',
          description: 'Learn about my journey, skills, and experience in web development.'
        }
      },
      contact: {
        hero: {
          title: 'Get In Touch',
          subtitle: 'Let\'s Work Together',
          description: 'Ready to start your next project? Contact me today.'
        }
      }
    };
    
    return defaults[pageKey] || {};
  }

  /**
   * Get default section content
   */
  getDefaultSectionContent(pageKey, sectionKey) {
    const content = this.getDefaultContent(pageKey);
    return content[sectionKey] || {
      title: 'Content Title',
      subtitle: 'Content Subtitle',
      description: 'This content can be edited from the admin panel.'
    };
  }

  /**
   * Clear cache
   */
  clearCache() {
    this.cache.clear();
  }

  /**
   * Get cache status
   */
  getCacheStatus() {
    return {
      size: this.cache.size,
      keys: Array.from(this.cache.keys())
    };
  }
}

// Create and export singleton instance
const cmsContentService = new CMSContentService();
export default cmsContentService;
