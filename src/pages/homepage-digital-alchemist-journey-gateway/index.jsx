import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import Header from '../../components/ui/Header';

import Footer from '../../components/ui/Footer';
import SEOHead from '../../components/SEOHead';
import HeroSection from './components/HeroSection';
import TimelinePreview from './components/TimelinePreview';
import SkillsConstellation from './components/SkillsConstellation';
import TransformationMetrics from './components/TransformationMetrics';
import FeaturedTestimonial from './components/FeaturedTestimonial';
import ModernNewsletterSignup from '../../components/ModernNewsletterSignup';

const HomepageDigitalAlchemistJourneyGateway = () => {
  useEffect(() => {
    // Set page title
    document.title = 'Cdw Burhan - Digital Alchemist | From Borrowed Dreams to Digital Gold';
    
    // Scroll to top on page load
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">
      <SEOHead
        title="CDW Burhan - Full Stack Developer & Digital Alchemist"
        description="Transform your digital presence with expert Shopify development, WordPress customization, and cutting-edge web solutions. From borrowed dreams to digital gold - discover how I can elevate your business."
        keywords="full stack developer, Shopify development, WordPress customization, e-commerce solutions, web development, React.js, digital transformation, performance optimization"
        image="/assets/images/hero.jpg"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "Person",
          "name": "Burhan Ahmad",
          "jobTitle": "Full Stack Developer & Digital Alchemist",
          "description": "Expert in Shopify development, WordPress customization, and modern web technologies",
          "url": window.location.origin,
          "sameAs": [
            "https://linkedin.com/in/cdwburhan",
            "https://github.com/cdwburhan",
            "https://twitter.com/cdwburhan"
          ],
          "knowsAbout": [
            "Shopify Development",
            "WordPress Customization",
            "React.js",
            "JavaScript",
            "E-commerce Solutions",
            "Web Performance Optimization",
            "Full Stack Development"
          ],
          "offers": {
            "@type": "Service",
            "serviceType": "Web Development Services",
            "description": "Custom web development, e-commerce solutions, and digital transformation services"
          }
        }}
      />
      <Header />

      <main>
        {/* Hero Section */}
        <motion.div id="home-hero"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <HeroSection />
        </motion.div>

        {/* Timeline Preview Section */}
        <motion.div id="home-timeline"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <TimelinePreview />
        </motion.div>

        {/* Skills Constellation Section */}
        <motion.div id="home-skills"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <SkillsConstellation />
        </motion.div>

        {/* Transformation Metrics Section */}
        <motion.div id="home-metrics"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <TransformationMetrics />
        </motion.div>

        {/* Featured Testimonial Section */}
        <motion.div id="home-testimonial"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <FeaturedTestimonial />
        </motion.div>

        {/* Newsletter Signup Section */}
        <motion.div id="newsletter-signup"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true, margin: "-100px" }}
          className="py-20"
        >
          <div className="container mx-auto px-4">
            <ModernNewsletterSignup
              title="🚀 Join the Digital Transformation Journey"
              description="Get exclusive insights, tutorials, and case studies delivered to your inbox. Learn how to turn your digital dreams into reality."
              variant="default"
              source="website"
              showName={false}
              className="max-w-2xl mx-auto"
            />
          </div>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
};

export default HomepageDigitalAlchemistJourneyGateway;