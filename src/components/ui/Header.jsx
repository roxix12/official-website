import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Button from './Button';
import { openCalendlyPopup } from '../../utils/calendly';
import Icon from '../AppIcon';
import siteSettingsService from '../../services/siteSettingsService';
import AuthButton from '../auth/AuthButton';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [logo, setLogo] = useState('/assets/images/hero.jpg');
  const [siteName, setSiteName] = useState('Cdw Burhan');
  const location = useLocation();

  const navigationItems = [
    { name: 'Home', path: '/', icon: 'Home' },
    { name: 'Projects', path: '/projects-showcase-gallery', icon: 'Grid' },
    { name: 'Free Resources', path: '/free-resources-hub', icon: 'Gift' },
    { name: 'Services', path: '/services-partnership-path-offerings', icon: 'Zap' },
    { name: 'Skills', path: '/skills-interactive-mastery-constellation', icon: 'Target' },
    { name: 'Blog', path: '/blog-tutorials-insights', icon: 'FileText' }
  ];

  const secondaryItems = [
    { name: 'Contact', path: '/contact-multi-channel-collaboration-hub', icon: 'MessageCircle' },
    // Chat removed per request
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Load site settings from site settings service
  useEffect(() => {
    // Get initial settings
    const branding = siteSettingsService.getBranding();
    const siteInfo = siteSettingsService.getSiteInfo();
    
    setLogo(branding.logo);
    setSiteName(siteInfo.siteName);

    // Subscribe to settings changes
    const unsubscribe = siteSettingsService.subscribe((updatedSettings) => {
      console.log('🔄 Header: Settings updated', updatedSettings);
      if (updatedSettings.branding) {
        setLogo(updatedSettings.branding.logo);
      }
      if (updatedSettings.site_info) {
        setSiteName(updatedSettings.site_info.siteName);
      }
    });

    return unsubscribe;
  }, []);

  // Removed Calendly floating badge per request; popups still work on buttons

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const isActivePath = (path) => {
    return location?.pathname === path;
  };

  return (
    <header 
      className={`fixed top-4 left-4 right-4 z-50 transition-all duration-500 ease-out rounded-xl sm:rounded-2xl lg:rounded-full ${
        isScrolled 
          ? 'bg-black/95 backdrop-blur-xl border border-white/30 shadow-2xl shadow-black/50' 
          : 'bg-black/70 backdrop-blur-lg border border-white/10'
      }`}
      style={{
        backdropFilter: isScrolled ? 'blur(20px) saturate(180%)' : 'blur(12px) saturate(120%)',
      }}
    >
      <div className="w-full">
        <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center space-x-3 group transition-all duration-300 hover:scale-105"
            onClick={closeMenu}
          >
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500/30 to-purple-500/30 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <img
                src={logo}
                alt={siteName}
                className="relative w-8 h-8 sm:w-9 sm:h-9 rounded-full object-cover ring-2 ring-white/30 border border-white/20 shadow-lg group-hover:ring-white/50 transition-all duration-300"
                onError={(e) => {
                  e.currentTarget.src = '/assets/images/no_image.png';
                }}
              />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-base sm:text-lg font-semibold text-white group-hover:text-blue-300 transition-colors duration-300">{siteName}</h1>
              <p className="text-xs text-gray-400 -mt-1 group-hover:text-gray-300 transition-colors duration-300">FULL STACK DEV</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navigationItems?.map((item) => (
              <Link
                key={item?.path}
                to={item?.path}
                className={`relative group px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  isActivePath(item?.path)
                    ? 'text-white bg-gradient-to-r from-cyan-500/25 to-purple-500/25 shadow-lg shadow-cyan-500/20 border border-cyan-400/30' 
                    : 'text-gray-300 hover:text-white hover:bg-gradient-to-r hover:from-cyan-500/10 hover:to-purple-500/10 hover:border hover:border-cyan-400/20'
                }`}
              >
                <div className="flex items-center space-x-2 relative z-10">
                  <Icon name={item?.icon} size={16} className="group-hover:text-cyan-300 transition-colors duration-300" />
                  <span className="group-hover:text-cyan-100 transition-colors duration-300">{item?.name}</span>
                </div>
                {isActivePath(item?.path) && (
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-8 h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent rounded-full shadow-sm shadow-cyan-400/50"></div>
                )}
                {!isActivePath(item?.path) && (
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent rounded-full group-hover:w-8 transition-all duration-300"></div>
                )}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA & Secondary Nav */}
          <div className="hidden lg:flex items-center space-x-4">
            {secondaryItems?.map((item) => (
              <Link
                key={item?.path}
                to={item?.path}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 border ${
                  isActivePath(item?.path)
                    ? 'text-white bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border-cyan-400/30' 
                    : 'text-gray-400 hover:text-white hover:bg-cyan-500/10 border-transparent hover:border-cyan-400/20'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <Icon name={item?.icon} size={16} />
                  <span>{item?.name}</span>
                </div>
              </Link>
            ))}
            
            {/* Authentication Button */}
            <AuthButton />
            
            <Button 
              variant="default" 
              size="sm"
              className="bg-gradient-to-r from-cyan-600 to-purple-600 text-white hover:from-cyan-500 hover:to-purple-500 shadow-lg hover:shadow-xl hover:shadow-cyan-500/25 transform hover:scale-105 transition-all duration-300 border border-cyan-400/30"
              onClick={() => openCalendlyPopup('https://calendly.com/cdwburhan')}
            >
              <Icon name="Calendar" size={16} className="mr-2" />
              Book Consultation
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="lg:hidden p-3 rounded-full text-gray-300 hover:text-white hover:bg-gradient-to-r hover:from-white/15 hover:to-white/10 hover:shadow-lg transform hover:scale-105 transition-all duration-300"
            aria-label="Toggle menu"
          >
            <Icon name={isMenuOpen ? "X" : "Menu"} size={24} className="transition-transform duration-300" />
          </button>
        </div>

        {/* Mobile Navigation */}
        <div 
          className={`lg:hidden transition-all duration-300 ease-in-out ${
            isMenuOpen 
              ? 'max-h-screen opacity-100 mt-4' 
              : 'max-h-0 opacity-0 overflow-hidden mt-0'
          }`}
        >
          <div className="mx-4 px-6 py-4 bg-gradient-to-b from-black/95 to-black/90 backdrop-blur-xl border border-white/20 shadow-2xl rounded-2xl"
            style={{ backdropFilter: 'blur(20px) saturate(180%)' }}
          >
            <nav className="space-y-2">
              {navigationItems?.map((item) => (
                <Link
                  key={item?.path}
                  to={item?.path}
                  onClick={closeMenu}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-full text-sm font-medium transition-all duration-300 border ${
                    isActivePath(item?.path)
                      ? 'text-white bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border-cyan-400/30' 
                      : 'text-gray-300 hover:text-white hover:bg-cyan-500/10 border-transparent hover:border-cyan-400/20'
                  }`}
                >
                  <Icon name={item?.icon} size={18} />
                  <span>{item?.name}</span>
                  {isActivePath(item?.path) && (
                    <div className="ml-auto w-2 h-2 bg-cyan-400 rounded-full shadow-sm shadow-cyan-400/50"></div>
                  )}
                </Link>
              ))}
              
              {secondaryItems?.map((item) => (
                <Link
                  key={item?.path}
                  to={item?.path}
                  onClick={closeMenu}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-full text-sm font-medium transition-all duration-300 border ${
                    isActivePath(item?.path)
                      ? 'text-white bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border-cyan-400/30' 
                      : 'text-gray-400 hover:text-white hover:bg-cyan-500/10 border-transparent hover:border-cyan-400/20'
                  }`}
                >
                  <Icon name={item?.icon} size={18} />
                  <span>{item?.name}</span>
                </Link>
              ))}
            </nav>

            <div className="mt-6 pt-4 border-t border-white/10 space-y-3">
              {/* Mobile Authentication */}
              <div className="flex justify-center">
                <AuthButton className="w-full" />
              </div>
              
              <Button 
                variant="default" 
                fullWidth
                className="bg-gradient-to-r from-cyan-600 to-purple-600 text-white hover:from-cyan-500 hover:to-purple-500 shadow-lg hover:shadow-xl hover:shadow-cyan-500/25 transform hover:scale-105 transition-all duration-300 border border-cyan-400/30"
                onClick={() => {
                  closeMenu();
                  openCalendlyPopup('https://calendly.com/cdwburhan');
                }}
              >
                <Icon name="Calendar" size={16} className="mr-2" />
                Book Free Consultation
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;