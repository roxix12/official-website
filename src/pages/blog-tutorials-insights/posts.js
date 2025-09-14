// Central blog dataset used by list and detail pages

const posts = [
  {
    id: 1,
    slug: 'shopify-store-setup-guide-2024',
    title: 'Complete Shopify Store Setup Guide 2024',
    excerpt: 'Step-by-step guide to create a professional Shopify store from scratch. Themes, apps, and optimization tips for maximum conversions.',
    category: 'shopify',
    image: '/assets/images/hero.jpg',
    date: '2024-01-15',
    readTime: '12 min',
    views: 2847,
    likes: 156,
    section: 'featured',
    content: 'Launching a Shopify store in 2024 is faster than ever, but there are still important decisions that separate great stores from average ones. In this comprehensive guide, we will configure core settings, choose a high‑converting theme, and install only the essential apps. Start by setting up your store details (currency, taxes, shipping). Then pick a fast, accessible theme. I recommend starting with Dawn and customizing using the Theme Editor and small Liquid snippets for performance. Optimize product pages with clear photography, benefit‑driven descriptions, and social proof. Install only key apps: analytics, reviews, FAQ/Help, and performance monitoring. Finally, test checkout thoroughly and enable abandoned checkout emails. Launch with a simple offer and measure everything.',
    tags: ['shopify', 'e-commerce', 'setup', 'tutorial']
  },
  
  {
    id: 2,
    slug: 'wordpress-custom-theme-development',
    title: 'WordPress Custom Theme Development from Scratch',
    excerpt: 'Create a custom WordPress theme from scratch using modern best practices, the Template Hierarchy, and Gutenberg block support.',
    category: 'wordpress',
    image: '/assets/images/hero.jpg',
    date: '2024-01-12',
    readTime: '18 min',
    views: 1923,
    likes: 98,
    section: 'featured',
    content: 'A custom theme gives you full control over UX and performance. We will scaffold the theme, register menus and sidebars, enqueue assets properly, and implement Gutenberg support. Avoid bloated page builders. Use the block editor and small, reusable components. Follow WordPress coding standards to keep your theme maintainable. We\'ll cover functions.php setup, template hierarchy, custom post types, and advanced custom fields integration.',
    tags: ['wordpress', 'theme-development', 'php', 'tutorial']
  },

  {
    id: 3,
    slug: 'react-performance-optimization-techniques',
    title: 'React Performance Optimization: Complete Guide',
    excerpt: 'Memoization, code‑splitting, bundle optimization, and advanced strategies for production React applications.',
    category: 'react',
    image: '/assets/images/hero.jpg',
    date: '2024-01-10',
    readTime: '15 min',
    views: 3456,
    likes: 234,
    section: 'featured',
    content: 'Performance is a feature. We will measure before optimizing, then apply memoization (React.memo, useMemo, useCallback), lazy‑load non‑critical routes, and remove dead code from bundles. Profile with the React DevTools Profiler and Lighthouse to ensure improvements are real. Learn about virtual DOM optimization, component splitting, and modern bundling techniques.',
    tags: ['react', 'performance', 'javascript', 'optimization']
  },

  {
    id: 4,
    slug: 'shopify-liquid-template-language-mastery',
    title: 'Shopify Liquid Template Language: Complete Mastery',
    excerpt: "Master Liquid with practical examples, filters, tags, and patterns you'll use daily in Shopify theme development.",
    category: 'shopify',
    image: '/assets/images/hero.jpg',
    date: '2024-01-08',
    readTime: '20 min',
    views: 1678,
    likes: 87,
    section: 'tutorials',
    content: 'Liquid is the language that powers Shopify themes. We will cover objects, tags, filters, and best practices for performance and maintainability. Keep snippets small and focused. Prefer section schema settings for merchant flexibility. Advanced topics include custom filters, complex loops, and dynamic content generation.',
    tags: ['shopify', 'liquid', 'templates', 'tutorial']
  },

  {
    id: 5,
    slug: 'react-hooks-deep-dive',
    title: 'React Hooks Deep Dive: Custom Hooks & Patterns',
    excerpt: 'Understand core hooks and how to compose custom hooks for real‑world features like data fetching, caching, and state management.',
    category: 'react',
    image: '/assets/images/hero.jpg',
    date: '2024-01-03',
    readTime: '22 min',
    views: 2156,
    likes: 145,
    section: 'tutorials',
    content: 'Hooks simplify state and side‑effects. We will write robust hooks with predictable lifecycles and clear dependencies. Compose hooks for data‑fetching, caching, and UI state to keep components small and readable. Learn advanced patterns like useReducer, useContext optimization, and custom hook composition.',
    tags: ['react', 'hooks', 'javascript', 'patterns']
  },

  {
    id: 6,
    slug: 'javascript-es6-modern-features',
    title: 'JavaScript ES6+ Modern Features Every Developer Should Know',
    excerpt: 'Comprehensive guide to modern JavaScript features including destructuring, modules, async/await, and more.',
    category: 'javascript',
    image: '/assets/images/hero.jpg',
    date: '2024-01-05',
    readTime: '16 min',
    views: 2890,
    likes: 178,
    section: 'tutorials',
    content: 'Modern JavaScript offers powerful features that make code more readable and maintainable. Learn destructuring, spread operator, template literals, and arrow functions. Explore modules, classes, promises, and async/await for better code organization and asynchronous programming. Advanced topics include generators, symbols, maps, sets, and the latest ES2024 features.',
    tags: ['javascript', 'es6', 'modern-js', 'tutorial']
  },

  {
    id: 7,
    slug: 'ecommerce-conversion-optimization',
    title: 'E-commerce Conversion Optimization: Proven Strategies',
    excerpt: 'Increase your online store conversion rates with these proven UX, design, and psychology-based strategies.',
    category: 'shopify',
    image: '/assets/images/hero.jpg',
    date: '2024-01-02',
    readTime: '14 min',
    views: 1834,
    likes: 112,
    section: 'insights',
    content: 'Conversion optimization is about understanding your customers and removing friction from their buying journey. Focus on page speed, clear value propositions, social proof, simplified checkout, and mobile optimization. A/B testing, heat maps, and user session recordings provide valuable insights for optimization.',
    tags: ['e-commerce', 'conversion', 'optimization', 'tips']
  },

  {
    id: 8,
    slug: 'wordpress-security-best-practices',
    title: 'WordPress Security: Complete Protection Guide',
    excerpt: 'Comprehensive security guide for WordPress websites including plugins, themes, hosting, and maintenance best practices.',
    category: 'wordpress',
    image: '/assets/images/hero.jpg',
    date: '2024-01-01',
    readTime: '19 min',
    views: 1567,
    likes: 89,
    section: 'tutorials',
    content: 'WordPress security requires a multi-layered approach. Start with strong passwords, regular updates, and reliable hosting. Install security plugins, enable two-factor authentication, and implement regular backups. Advanced topics include firewall configuration, malware scanning, and security headers.',
    tags: ['wordpress', 'security', 'protection', 'tutorial']
  },

  {
    id: 9,
    slug: 'react-state-management-comparison',
    title: 'React State Management: Redux vs Zustand vs Context',
    excerpt: 'Complete comparison of React state management solutions with practical examples and use case recommendations.',
    category: 'react',
    image: '/assets/images/hero.jpg',
    date: '2023-12-28',
    readTime: '17 min',
    views: 2345,
    likes: 167,
    section: 'insights',
    content: 'Choosing the right state management solution depends on your app size, team preferences, and complexity requirements. Context API is great for simple apps, Redux for complex enterprise applications, and Zustand for modern, lightweight solutions. Learn when to use each approach and how to migrate between different state management patterns.',
    tags: ['react', 'state-management', 'redux', 'context']
  },

  {
    id: 10,
    slug: 'shopify-app-development-guide',
    title: 'Shopify App Development: From Idea to App Store',
    excerpt: 'Complete guide to building and publishing Shopify apps using Node.js, React, and the Shopify API.',
    category: 'shopify',
    image: '/assets/images/hero.jpg',
    date: '2023-12-25',
    readTime: '25 min',
    views: 1456,
    likes: 78,
    section: 'tutorials',
    content: 'Building Shopify apps opens up opportunities for recurring revenue and helping merchants grow their businesses. Learn the Shopify CLI, App Bridge, GraphQL API, and webhook handling for robust app development. Cover app store submission, pricing strategies, and marketing your app to merchants.',
    tags: ['shopify', 'app-development', 'nodejs', 'tutorial']
  },

  {
    id: 11,
    slug: 'web-development-trends-2024',
    title: 'Web Development Trends 2024: What\'s Shaping the Future',
    excerpt: 'Explore the latest web development trends including AI integration, serverless architecture, and new JavaScript frameworks.',
    category: 'javascript',
    image: '/assets/images/hero.jpg',
    date: '2023-12-20',
    readTime: '13 min',
    views: 3124,
    likes: 201,
    section: 'insights',
    content: 'The web development landscape is evolving rapidly with AI-powered tools, edge computing, and progressive web apps leading the charge. New frameworks like Astro and SvelteKit are gaining traction, while established tools are adding AI capabilities. Focus on performance, accessibility, and user experience remains crucial as competition intensifies.',
    tags: ['web-development', 'trends', 'ai', 'insights']
  },

  {
    id: 12,
    slug: 'wordpress-gutenberg-custom-blocks',
    title: 'Creating Custom Gutenberg Blocks for WordPress',
    excerpt: 'Learn to build custom Gutenberg blocks using React, providing rich editing experiences for WordPress content creators.',
    category: 'wordpress',
    image: '/assets/images/hero.jpg',
    date: '2023-12-18',
    readTime: '21 min',
    views: 1789,
    likes: 95,
    section: 'tutorials',
    content: 'Custom Gutenberg blocks extend WordPress\'s editing capabilities and provide better user experiences for content creators. Learn block registration, inspector controls, rich text components, and block validation. Advanced topics include dynamic blocks, server-side rendering, and block patterns.',
    tags: ['wordpress', 'gutenberg', 'blocks', 'react']
  }
];

export default posts;