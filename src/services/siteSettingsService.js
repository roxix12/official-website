import { supabase } from './supabaseClient';

/**
 * Site Settings Service for Main Website
 * Fetches site settings from database and applies them to the website
 */
class SiteSettingsService {
  constructor() {
    this.settings = {
      site_info: {
        siteName: 'Cdw Burhan',
        siteDescription: 'Full Stack Developer & Digital Transformation Expert',
        tagline: 'FULL STACK DEV'
      },
      branding: {
        logo: '/assets/images/hero.jpg',
        favicon: '/favicon.ico',
        logoAlt: 'Cdw Burhan Logo'
      },
      theme_colors: {
        primaryColor: '#00d4ff',
        secondaryColor: '#8b5cf6',
        accentColor: '#f59e0b',
        backgroundColor: '#000000'
      }
    };
    
    this.callbacks = [];
    this.subscription = null;
    this.isInitialized = false;
  }

  /**
   * Initialize the service
   */
  async initialize() {
    if (this.isInitialized) return;
    
    try {
      console.log('🔧 Initializing site settings service...');
      await this.loadSettings();
      this.setupRealtimeSubscription();
      this.applySettings();
      this.isInitialized = true;
      console.log('✅ Site settings service initialized');
    } catch (error) {
      console.error('❌ Failed to initialize site settings service:', error);
    }
  }

  /**
   * Load settings from database
   */
  async loadSettings() {
    try {
      console.log('📦 Loading site settings from database...');
      
      const { data, error } = await supabase
        .from('site_settings')
        .select('setting_key, setting_value')
        .eq('is_active', true);

      if (error) {
        console.error('❌ Error fetching site settings:', error);
        return;
      }

      if (data && data.length > 0) {
        // Update settings with database values
        data.forEach(setting => {
          if (this.settings[setting.setting_key]) {
            this.settings[setting.setting_key] = {
              ...this.settings[setting.setting_key],
              ...setting.setting_value
            };
          }
        });
        
        console.log('✅ Site settings loaded from database:', this.settings);
      } else {
        console.log('⚠️ No site settings found in database, using defaults');
      }

    } catch (error) {
      console.error('❌ Error loading site settings:', error);
    }
  }

  /**
   * Apply settings to the website
   */
  applySettings() {
    try {
      this.updateFavicon();
      this.updateTitle();
      this.notifyCallbacks();
      console.log('✅ Site settings applied');
    } catch (error) {
      console.error('❌ Error applying site settings:', error);
    }
  }

  /**
   * Update favicon dynamically
   */
  updateFavicon() {
    try {
      const faviconUrl = this.settings.branding.favicon;
      
      // Remove existing favicon links
      const existingFavicons = document.querySelectorAll('link[rel*="icon"]');
      existingFavicons.forEach(link => link.remove());

      // Create new favicon link
      const link = document.createElement('link');
      link.rel = 'icon';
      link.type = 'image/x-icon';
      link.href = faviconUrl;
      document.head.appendChild(link);
      
      // Also add as shortcut icon for better compatibility
      const shortcutLink = document.createElement('link');
      shortcutLink.rel = 'shortcut icon';
      shortcutLink.type = 'image/x-icon';
      shortcutLink.href = faviconUrl;
      document.head.appendChild(shortcutLink);

      console.log('✅ Favicon updated to:', faviconUrl);
    } catch (error) {
      console.error('❌ Error updating favicon:', error);
    }
  }

  /**
   * Update page title
   */
  updateTitle() {
    try {
      const siteName = this.settings.site_info.siteName;
      const siteDescription = this.settings.site_info.siteDescription;
      
      if (siteName && siteDescription) {
        // Update meta title
        const title = `${siteName} - ${siteDescription}`;
        document.title = title;
        
        // Update meta description
        let metaDescription = document.querySelector('meta[name="description"]');
        if (!metaDescription) {
          metaDescription = document.createElement('meta');
          metaDescription.name = 'description';
          document.head.appendChild(metaDescription);
        }
        metaDescription.content = siteDescription;
        
        console.log('✅ Page title and meta updated');
      }
    } catch (error) {
      console.error('❌ Error updating title:', error);
    }
  }

  /**
   * Setup realtime subscription for settings changes
   */
  setupRealtimeSubscription() {
    try {
      console.log('🔄 Setting up realtime subscription for site settings...');
      
      this.subscription = supabase
        .channel('site_settings_channel')
        .on(
          'postgres_changes',
          {
            event: '*',
            schema: 'public',
            table: 'site_settings'
          },
          (payload) => {
            console.log('🔄 Site settings changed in database:', payload);
            this.handleRealtimeChange(payload);
          }
        )
        .subscribe();
        
      console.log('✅ Realtime subscription setup complete');
    } catch (error) {
      console.error('❌ Error setting up realtime subscription:', error);
    }
  }

  /**
   * Handle realtime changes
   */
  async handleRealtimeChange(payload) {
    try {
      // Reload settings from database
      await this.loadSettings();
      
      // Apply the new settings
      this.applySettings();
      
      console.log('🔄 Settings updated from realtime change');
    } catch (error) {
      console.error('❌ Error handling realtime change:', error);
    }
  }

  /**
   * Get all settings
   */
  getSettings() {
    return { ...this.settings };
  }

  /**
   * Get specific setting section
   */
  getSetting(key) {
    return this.settings[key] || {};
  }

  /**
   * Get site info
   */
  getSiteInfo() {
    return this.settings.site_info;
  }

  /**
   * Get branding
   */
  getBranding() {
    return this.settings.branding;
  }

  /**
   * Get theme colors
   */
  getThemeColors() {
    return this.settings.theme_colors;
  }

  /**
   * Subscribe to settings changes
   */
  subscribe(callback) {
    this.callbacks.push(callback);
    return () => {
      this.callbacks = this.callbacks.filter(cb => cb !== callback);
    };
  }

  /**
   * Notify all subscribers of changes
   */
  notifyCallbacks() {
    this.callbacks.forEach(callback => {
      try {
        callback(this.settings);
      } catch (error) {
        console.error('❌ Error in settings callback:', error);
      }
    });
  }

  /**
   * Force reload settings
   */
  async reload() {
    console.log('🔄 Force reloading site settings...');
    await this.loadSettings();
    this.applySettings();
  }

  /**
   * Cleanup subscriptions
   */
  cleanup() {
    if (this.subscription) {
      supabase.removeChannel(this.subscription);
      this.subscription = null;
    }
    this.callbacks = [];
    this.isInitialized = false;
  }
}

// Create and export singleton instance
const siteSettingsService = new SiteSettingsService();
export default siteSettingsService;