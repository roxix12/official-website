import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../AppIcon';
import NewsletterSignup from '../NewsletterSignup';
import ModernNewsletterSignup from '../ModernNewsletterSignup';
// import modernNewsletterService from '../../services/modernNewsletterService';
import toast from 'react-hot-toast';
import siteSettingsService from '../../services/siteSettingsService';

const Footer = ({ variant = 'default', className = '' }) => {
  const currentYear = new Date().getFullYear();

  const [logo, setLogo] = useState('/assets/images/hero.jpg');
  const [siteName, setSiteName] = useState('Cdw Burhan');

  // Load site settings from site settings service
  useEffect(() => {
    // Get initial settings
    const branding = siteSettingsService.getBranding();
    const siteInfo = siteSettingsService.getSiteInfo();
    
    setLogo(branding.logo);
    setSiteName(siteInfo.siteName);

    // Subscribe to settings changes
    const unsubscribe = siteSettingsService.subscribe((updatedSettings) => {
      console.log('🔄 Footer: Settings updated', updatedSettings);
      if (updatedSettings.branding) {
        setLogo(updatedSettings.branding.logo);
      }
      if (updatedSettings.site_info) {
        setSiteName(updatedSettings.site_info.siteName);
      }
    });

    return unsubscribe;
  }, []);



  const legalLinks = [
    { name: 'Privacy Policy', path: '/privacy-policy' },
    { name: 'Terms of Service', path: '/terms-of-service' },
    { name: 'Cookie Policy', path: '/cookies-policy' }
  ];

  const quickLinks = [
    { name: 'Projects', path: '/projects-showcase-gallery' },
    { name: 'Free Resources', path: '/free-resources-hub' },
    { name: 'Services', path: '/services-partnership-path-offerings' },
    { name: 'Blog', path: '/blog-tutorials-insights' },
    { name: 'Contact', path: '/contact-multi-channel-collaboration-hub' }
  ];

  if (variant === 'minimal') {
    return (
      <footer className={`bg-gradient-to-br from-gray-900 via-black to-gray-900 border-t border-cyan-500/20 py-8 ${className}`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-gray-300">
              © {currentYear} Cdw Burhan. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              {legalLinks.map((link, index) => (
                <Link
                  key={index}
                  to={link.path}
                  className="text-gray-400 hover:text-cyan-400 transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </footer>
    );
  }

  return (
    <footer className={`bg-gradient-to-br from-gray-900 via-black to-gray-900 border-t border-cyan-500/20 py-12 ${className}`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Newsletter Section */}
        <div className="mb-8 pb-8 border-b border-cyan-500/20">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between space-y-4 md:space-y-0">
            <div className="flex-1 max-w-md">
              <h3 className="text-lg font-semibold text-white mb-2 flex items-center">
                <Icon name="Mail" size={20} className="mr-2 text-cyan-400" />
                Stay Connected
              </h3>
              <p className="text-sm text-gray-300 mb-4">
                Get exclusive insights and updates delivered to your inbox.
              </p>
            </div>
            <div className="flex-1 max-w-md">
              <ModernNewsletterSignup 
                variant="footer"
                source="website"
                showName={false}
                className="bg-transparent p-0"
                placeholder="Your email address"
                buttonText="Subscribe"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-8">
          
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-4">
              <img
                src={logo}
                alt={siteName}
                className="w-10 h-10 rounded-full object-cover ring-2 ring-white/20"
                onError={(e) => {
                  e.currentTarget.src = '/assets/images/no_image.png';
                }}
              />
              <div>
                <h3 className="text-lg font-semibold text-white">{siteName}</h3>
                <p className="text-sm text-cyan-400">FULL STACK DEV</p>
              </div>
            </div>
            <p className="text-sm text-gray-300 leading-relaxed mb-4">
              Transforming ideas into digital excellence through Shopify, WordPress & React development.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://github.com/cdwburhan"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-gray-800/50 flex items-center justify-center text-gray-400 hover:text-cyan-400 hover:bg-cyan-500/10 transition-all border border-gray-700/50 hover:border-cyan-500/30"
              >
                <Icon name="Github" size={16} />
              </a>
              <a
                href="https://linkedin.com/in/cdwburhan"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-gray-800/50 flex items-center justify-center text-gray-400 hover:text-cyan-400 hover:bg-cyan-500/10 transition-all border border-gray-700/50 hover:border-cyan-500/30"
              >
                <Icon name="Linkedin" size={16} />
              </a>
              <a
                href="https://twitter.com/cdwburhan"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-gray-800/50 flex items-center justify-center text-gray-400 hover:text-cyan-400 hover:bg-cyan-500/10 transition-all border border-gray-700/50 hover:border-cyan-500/30"
              >
                <Icon name="Twitter" size={16} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.path}
                    className="text-sm text-gray-400 hover:text-cyan-400 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Services</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="hover:text-cyan-400 transition-colors cursor-default">Shopify Development</li>
              <li className="hover:text-cyan-400 transition-colors cursor-default">WordPress Solutions</li>
              <li className="hover:text-cyan-400 transition-colors cursor-default">React Applications</li>
              <li className="hover:text-cyan-400 transition-colors cursor-default">Technical Consulting</li>
              <li className="hover:text-cyan-400 transition-colors cursor-default">Performance Optimization</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Contact</h4>
            <div className="space-y-3">
              <a
                href="mailto:contact@codewithburhan.com"
                className="flex items-center space-x-2 text-sm text-gray-400 hover:text-cyan-400 transition-colors"
              >
                <Icon name="Mail" size={14} />
                <span>contact@codewithburhan.com</span>
              </a>
              <a
                href="tel:+923275380226"
                className="flex items-center space-x-2 text-sm text-gray-400 hover:text-cyan-400 transition-colors"
              >
                <Icon name="Phone" size={14} />
                <span>+92 327 538 0226</span>
              </a>
              <div className="flex items-center space-x-2 text-sm text-gray-400">
                <Icon name="MapPin" size={14} />
                <span>Okara, Pakistan</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-8 border-t border-cyan-500/20">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-gray-300">
              © {currentYear} Cdw Burhan. All rights reserved. Built with passion and precision.
            </p>
            
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              {legalLinks.map((link, index) => (
                <Link
                  key={index}
                  to={link.path}
                  className="text-gray-400 hover:text-cyan-400 transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
