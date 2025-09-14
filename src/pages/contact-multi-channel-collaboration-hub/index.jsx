import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import SEOHead from '../../components/SEOHead';

import Footer from '../../components/ui/Footer';
import ContactHero from './components/ContactHero';
import ContactForm from './components/ContactForm';
import CalendarBooking from './components/CalendarBooking';
import CommunicationChannels from './components/CommunicationChannels';
import FreeResources from './components/FreeResources';
import FAQ from './components/FAQ';
import TestimonialsSection from './components/TestimonialsSection';
import TrustSignals from './components/TrustSignals';

const ContactMultiChannelCollaborationHub = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEOHead
        title="Contact - Multi-Channel Collaboration Hub"
        description="Transform your vision into reality. Multiple ways to connect for consultation, project discussions, and collaboration. Free consultation available with expert web development services."
        keywords="contact web developer, Shopify consultation, WordPress expert, project collaboration, free resources, web development services, digital transformation"
        canonicalUrl={`${window.location.origin}/contact-multi-channel-collaboration-hub`}
        structuredData={{
          "@context": "https://schema.org",
          "@type": "ContactPage",
          "name": "Contact CDW Burhan",
          "description": "Multiple ways to connect for web development consultation and project collaboration",
          "url": `${window.location.origin}/contact-multi-channel-collaboration-hub`,
          "mainEntity": {
            "@type": "Organization",
            "name": "CDW Burhan Development Services",
            "contactPoint": {
              "@type": "ContactPoint",
              "telephone": "+1-XXX-XXX-XXXX",
              "contactType": "Customer Service",
              "email": "contact@codewithburhan.com",
              "availableLanguage": "English",
              "areaServed": "Worldwide"
            }
          }
        }}
      />
      <Header />

      <main className="pt-16">
        <div id="contact-hero"><ContactHero /></div>
        <div id="contact-form"><ContactForm /></div>
        <div id="contact-calendar"><CalendarBooking /></div>
        <div id="contact-channels"><CommunicationChannels /></div>
        <div id="contact-resources"><FreeResources /></div>
        <div id="contact-faq"><FAQ /></div>
        <div id="contact-testimonials"><TestimonialsSection /></div>
        <div id="contact-trust"><TrustSignals /></div>
      </main>
      <Footer />
    </div>
  );
};

export default ContactMultiChannelCollaborationHub;