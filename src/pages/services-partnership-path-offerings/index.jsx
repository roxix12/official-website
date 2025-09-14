import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';

import ServiceHero from './components/ServiceHero';
import ServiceTiers from './components/ServiceTiers';
import TechnicalShowcase from './components/TechnicalShowcase';
import SuccessStories from './components/SuccessStories';
import ConsultationBooking from './components/ConsultationBooking';
import MentorshipSection from './components/MentorshipSection';
import TrustSignals from './components/TrustSignals';
import { openCalendlyPopup } from '../../utils/calendly';
import Footer from '../../components/ui/Footer';

const ServicesPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Helmet>
        <title>Services - Partnership Path Offerings | Cdw Burhan</title>
        <meta 
          name="description" 
          content="Transform your digital vision into measurable business success. Shopify expert offering Launch Partnership, Growth Acceleration, and Platform Mastery services with proven results." 
        />
        <meta name="keywords" content="Shopify development, e-commerce solutions, web development services, digital transformation, React development, WordPress development" />
        <meta property="og:title" content="Services - Partnership Path Offerings | Cdw Burhan" />
        <meta property="og:description" content="Your Vision, My Expertise, Our Success. Professional development services with 98% client satisfaction and proven results." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="/services-partnership-path-offerings" />
      </Helmet>
      <Header />

      <main>
        <div id="services-hero"><ServiceHero /></div>
        <div id="services-tiers"><ServiceTiers /></div>
        <div id="services-tech"><TechnicalShowcase /></div>
        <div id="services-success"><SuccessStories /></div>
        <div id="services-trust"><TrustSignals /></div>
        <div id="services-mentorship"><MentorshipSection /></div>
        <div id="services-consult"><ConsultationBooking /></div>
      </main>
      <Footer />
    </div>
  );
};

export default ServicesPage;