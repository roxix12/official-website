// Sitemap generator for better SEO
// This creates a dynamic sitemap based on your pages and blog posts

import posts from '../pages/blog-tutorials-insights/posts';

const BASE_URL = 'https://codewithburhan.com'; // Update with your actual domain

// Define your static pages with priority and change frequency
const staticPages = [
  {
    url: '/',
    priority: 1.0,
    changefreq: 'weekly',
    lastmod: new Date().toISOString()
  },
  {
    url: '/blog-tutorials-insights',
    priority: 0.9,
    changefreq: 'daily',
    lastmod: new Date().toISOString()
  },
  {
    url: '/projects-showcase-gallery',
    priority: 0.8,
    changefreq: 'weekly',
    lastmod: new Date().toISOString()
  },
  {
    url: '/free-resources-hub',
    priority: 0.9,
    changefreq: 'weekly',
    lastmod: new Date().toISOString()
  },
  {
    url: '/services-partnership-path-offerings',
    priority: 0.8,
    changefreq: 'monthly',
    lastmod: new Date().toISOString()
  },
  {
    url: '/contact-multi-channel-collaboration-hub',
    priority: 0.7,
    changefreq: 'monthly',
    lastmod: new Date().toISOString()
  },
  {
    url: '/about-complete-narrative-timeline',
    priority: 0.6,
    changefreq: 'monthly',
    lastmod: new Date().toISOString()
  },
  {
    url: '/skills-interactive-mastery-constellation',
    priority: 0.6,
    changefreq: 'monthly',
    lastmod: new Date().toISOString()
  }
];

// Generate sitemap for blog posts
const generateBlogSitemap = () => {
  return posts.map(post => ({
    url: `/blog-tutorials-insights/${post.slug}`,
    priority: 0.7,
    changefreq: 'monthly',
    lastmod: post.date ? new Date(post.date).toISOString() : new Date().toISOString()
  }));
};

// Generate complete sitemap
export const generateSitemap = () => {
  const blogPages = generateBlogSitemap();
  const allPages = [...staticPages, ...blogPages];

  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages.map(page => `  <url>
    <loc>${BASE_URL}${page.url}</loc>
    <lastmod>${page.lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  return sitemapXml;
};

// Generate robots.txt content
export const generateRobotsTxt = () => {
  return `User-agent: *
Allow: /

# Important pages
Allow: /blog-tutorials-insights/
Allow: /projects-showcase-gallery/
Allow: /free-resources-hub/
Allow: /services-partnership-path-offerings/
Allow: /contact-multi-channel-collaboration-hub/

# Block admin panel
Disallow: /admin-panel/

# Block test files
Disallow: /test-*
Disallow: /*.html

# Sitemap location
Sitemap: ${BASE_URL}/sitemap.xml

# Crawl-delay for respectful crawling
Crawl-delay: 1`;
};

// Helper function to download sitemap
export const downloadSitemap = () => {
  const sitemap = generateSitemap();
  const blob = new Blob([sitemap], { type: 'application/xml' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'sitemap.xml';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  window.URL.revokeObjectURL(url);
};

// Helper function to download robots.txt
export const downloadRobotsTxt = () => {
  const robotsTxt = generateRobotsTxt();
  const blob = new Blob([robotsTxt], { type: 'text/plain' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'robots.txt';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  window.URL.revokeObjectURL(url);
};
