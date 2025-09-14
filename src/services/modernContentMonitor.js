import { supabase } from './supabaseClient';
// Note: Newsletter service functionality temporarily disabled for development
// import newsletterService from './newsletter';

class ModernContentMonitor {
  constructor() {
    this.blogSubscription = null;
    this.projectSubscription = null;
    this.isMonitoring = false;
  }

  /**
   * Start monitoring for new content
   */
  async startMonitoring() {
    try {
      console.log('🚀 Starting modern content monitoring...');

      if (this.isMonitoring) {
        console.log('⚠️ Monitoring already active');
        return { success: true, message: 'Already monitoring' };
      }

      // Monitor blog posts
      this.blogSubscription = supabase
        .channel('blog_posts_channel')
        .on(
          'postgres_changes',
          {
            event: 'INSERT',
            schema: 'public',
            table: 'blog_posts',
            filter: 'status=eq.published'
          },
          async (payload) => {
            console.log('📝 New published blog detected:', payload.new);
            await this.handleNewBlog(payload.new);
          }
        )
        .on(
          'postgres_changes',
          {
            event: 'UPDATE',
            schema: 'public',
            table: 'blog_posts',
            filter: 'status=eq.published'
          },
          async (payload) => {
            // Only send notification if status changed from draft to published
            if (payload.old.status !== 'published' && payload.new.status === 'published') {
              console.log('📝 Blog status changed to published:', payload.new);
              await this.handleNewBlog(payload.new);
            }
          }
        )
        .subscribe();

      // Monitor projects
      this.projectSubscription = supabase
        .channel('projects_channel')
        .on(
          'postgres_changes',
          {
            event: 'INSERT',
            schema: 'public',
            table: 'projects',
            filter: 'status=eq.completed'
          },
          async (payload) => {
            console.log('🚀 New completed project detected:', payload.new);
            await this.handleNewProject(payload.new);
          }
        )
        .on(
          'postgres_changes',
          {
            event: 'UPDATE',
            schema: 'public',
            table: 'projects',
            filter: 'status=eq.completed'
          },
          async (payload) => {
            // Only send notification if status changed to completed
            if (payload.old.status !== 'completed' && payload.new.status === 'completed') {
              console.log('🚀 Project status changed to completed:', payload.new);
              await this.handleNewProject(payload.new);
            }
          }
        )
        .subscribe();

      this.isMonitoring = true;
      console.log('✅ Content monitoring started successfully');

      return {
        success: true,
        message: 'Content monitoring started - subscribers will be notified automatically!'
      };

    } catch (error) {
      console.error('❌ Failed to start content monitoring:', error);
      return { success: false, error: error.message };
    }
  }

  /**
   * Handle new blog post
   */
  async handleNewBlog(blogPost) {
    try {
      console.log(`📧 Processing new blog notification: "${blogPost.title}"`);

      // Small delay to ensure database is fully updated
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Temporarily disabled newsletter service
      console.log(`📧 Newsletter notification would be sent for: "${blogPost.title}"`);
      const result = { success: true, sent: 0, message: 'Newsletter service disabled for development' };
      
      return result;

    } catch (error) {
      console.error('❌ Error handling new blog:', error);
      return { success: false, error: error.message };
    }
  }

  /**
   * Handle new project
   */
  async handleNewProject(project) {
    try {
      console.log(`📧 Processing new project notification: "${project.title}"`);

      // Small delay to ensure database is fully updated
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Temporarily disabled newsletter service
      console.log(`📧 Newsletter notification would be sent for: "${project.title}"`);
      const result = { success: true, sent: 0, message: 'Newsletter service disabled for development' };
      
      return result;

    } catch (error) {
      console.error('❌ Error handling new project:', error);
      return { success: false, error: error.message };
    }
  }

  /**
   * Stop monitoring
   */
  stopMonitoring() {
    try {
      console.log('🛑 Stopping content monitoring...');

      if (this.blogSubscription) {
        supabase.removeChannel(this.blogSubscription);
        this.blogSubscription = null;
      }

      if (this.projectSubscription) {
        supabase.removeChannel(this.projectSubscription);
        this.projectSubscription = null;
      }

      this.isMonitoring = false;
      console.log('✅ Content monitoring stopped');

      return { success: true, message: 'Content monitoring stopped' };

    } catch (error) {
      console.error('❌ Error stopping monitoring:', error);
      return { success: false, error: error.message };
    }
  }

  /**
   * Get monitoring status
   */
  getStatus() {
    return {
      isMonitoring: this.isMonitoring,
      blogSubscription: !!this.blogSubscription,
      projectSubscription: !!this.projectSubscription
    };
  }

  /**
   * Manual test - send notifications for latest content
   */
  async testNotifications() {
    try {
      console.log('🧪 Testing notifications with latest content...');

      // Get latest published blog
      const { data: latestBlog } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('status', 'published')
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

      // Get latest completed project
      const { data: latestProject } = await supabase
        .from('projects')
        .select('*')
        .eq('status', 'completed')
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

      const results = [];

      if (latestBlog) {
        console.log('📧 Testing blog notification...');
        const blogResult = { success: true, sent: 0, message: 'Newsletter service disabled for development' };
        results.push({ type: 'blog', title: latestBlog.title, ...blogResult });
      }

      if (latestProject) {
        console.log('📧 Testing project notification...');
        const projectResult = { success: true, sent: 0, message: 'Newsletter service disabled for development' };
        results.push({ type: 'project', title: latestProject.title, ...projectResult });
      }

      console.log('✅ Test notifications completed');
      
      return {
        success: true,
        message: 'Test notifications sent',
        results: results
      };

    } catch (error) {
      console.error('❌ Test notifications failed:', error);
      return { success: false, error: error.message };
    }
  }
}

// Create and export singleton instance
const modernContentMonitor = new ModernContentMonitor();
export default modernContentMonitor;
