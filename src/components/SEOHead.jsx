import React from 'react';
import { Helmet } from 'react-helmet';

const SEOHead = ({
  title,
  description,
  keywords,
  image,
  url,
  type = 'website',
  author = 'Burhan Ahmad',
  siteName = 'CDW Burhan - Full Stack Developer & Digital Alchemist',
  twitterHandle = '@cdwburhan',
  publishedTime,
  modifiedTime,
  tags,
  category,
  readTime,
  canonicalUrl,
  noindex = false,
  structuredData
}) => {
  // Helpers to guard against Symbols and non-string values
  const toSafeString = (value, fallback = '') => {
    try {
      if (value === null || value === undefined) return fallback;
      // Avoid implicit Symbol -> string conversions that throw
      if (typeof value === 'symbol') {
        return value.toString();
      }
      if (typeof value === 'object') {
        return JSON.stringify(value);
      }
      return String(value);
    } catch (error) {
      return fallback;
    }
  };
  const toSafeStringArray = (arr) => {
    if (!Array.isArray(arr)) return [];
    return arr.map((v) => toSafeString(v)).filter((v) => v.length > 0);
  };
  // Default values
  const defaultTitle = 'CDW Burhan - Full Stack Developer & Digital Alchemist';
  const defaultDescription = 'Transform your digital presence with expert Shopify development, WordPress customization, and cutting-edge web solutions. Specializing in e-commerce optimization and performance enhancement.';
  const defaultImage = `${window.location.origin}/assets/images/hero.jpg`;
  const defaultUrl = window.location.href;
  const baseUrl = window.location.origin;

  // Processed values
  const seoTitle = title ? `${toSafeString(title)} | ${toSafeString(siteName)}` : defaultTitle;
  const seoDescription = toSafeString(description || defaultDescription);
  const imgCandidate = toSafeString(image, '');
  const seoImage = imgCandidate ? (imgCandidate.startsWith('http') ? imgCandidate : `${baseUrl}${imgCandidate}`) : defaultImage;
  const seoUrl = toSafeString(url || canonicalUrl || defaultUrl);
  const seoKeywords = Array.isArray(keywords)
    ? toSafeStringArray(keywords).join(', ')
    : toSafeString(
        keywords ||
          'Shopify development, WordPress customization, full stack developer, e-commerce, web development, performance optimization, digital transformation'
      );

  // Generate structured data
  const generateStructuredData = () => {
    if (structuredData) {
      return structuredData;
    }

    const baseStructuredData = {
      "@context": "https://schema.org",
      "@type": type === 'article' ? 'BlogPosting' : 'WebPage',
      "headline": title || defaultTitle,
      "description": seoDescription,
      "image": seoImage,
      "url": seoUrl,
      "author": {
        "@type": "Person",
        "name": author,
        "url": `${baseUrl}/about-complete-narrative-timeline`,
        "jobTitle": "Full Stack Developer & Digital Alchemist",
        "worksFor": {
          "@type": "Organization",
          "name": "CDW Burhan",
          "url": baseUrl
        },
        "sameAs": [
          "https://linkedin.com/in/cdwburhan",
          "https://github.com/cdwburhan",
          "https://twitter.com/cdwburhan"
        ]
      },
      "publisher": {
        "@type": "Organization",
        "name": siteName,
        "url": baseUrl,
        "logo": {
          "@type": "ImageObject",
          "url": `${baseUrl}/favicon.ico`
        }
      }
    };

    // Add article-specific data
    if (type === 'article') {
      baseStructuredData.datePublished = publishedTime;
      baseStructuredData.dateModified = modifiedTime || publishedTime;
      baseStructuredData.mainEntityOfPage = {
        "@type": "WebPage",
        "@id": seoUrl
      };
      
      if (category) {
        baseStructuredData.articleSection = category;
      }
      
      const safeTags = toSafeStringArray(tags);
      if (safeTags.length > 0) {
        baseStructuredData.keywords = safeTags.join(', ');
      }

      if (readTime) {
        baseStructuredData.timeRequired = `PT${readTime.replace(/\D/g, '')}M`;
      }
    }

    // Add breadcrumb data for blog posts
    if (type === 'article' && category) {
      baseStructuredData.breadcrumb = {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": baseUrl
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Blog",
            "item": `${baseUrl}/blog-tutorials-insights`
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": title
          }
        ]
      };
    }

    return baseStructuredData;
  };

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{seoTitle}</title>
      <meta name="description" content={seoDescription} />
      <meta name="keywords" content={seoKeywords} />
      <meta name="author" content={author} />
      
      {/* Canonical URL */}
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
      
      {/* Robots */}
      {noindex && <meta name="robots" content="noindex, nofollow" />}
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={seoTitle} />
      <meta property="og:description" content={seoDescription} />
      <meta property="og:image" content={seoImage} />
      <meta property="og:url" content={seoUrl} />
      <meta property="og:site_name" content={siteName} />
      
      {/* Article specific Open Graph */}
      {type === 'article' && (
        <>
          {publishedTime && <meta property="article:published_time" content={publishedTime} />}
          {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
          {author && <meta property="article:author" content={author} />}
          {category && <meta property="article:section" content={category} />}
          {toSafeStringArray(tags).map((tag, index) => (
            <meta key={index} property="article:tag" content={tag} />
          ))}
        </>
      )}
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={twitterHandle} />
      <meta name="twitter:creator" content={twitterHandle} />
      <meta name="twitter:title" content={seoTitle} />
      <meta name="twitter:description" content={seoDescription} />
      <meta name="twitter:image" content={seoImage} />
      
      {/* Additional Meta Tags */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
      <meta name="language" content="English" />
      <meta name="revisit-after" content="7 days" />
      
      {/* Favicon */}
      <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" href="/favicon.ico" />
      
      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(generateStructuredData(), null, 2)}
      </script>
      
      {/* Additional SEO enhancements */}
      <meta name="theme-color" content="#3B82F6" />
      <meta name="msapplication-TileColor" content="#3B82F6" />
      
      {/* Preconnect to external domains for performance */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://images.unsplash.com" />
      <link rel="preconnect" href="https://api.formspree.io" />
    </Helmet>
  );
};

export default SEOHead;
