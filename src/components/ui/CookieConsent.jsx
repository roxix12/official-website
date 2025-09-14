import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '../AppIcon';
import Button from './Button';

const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [preferences, setPreferences] = useState({
    essential: true, // Always true, cannot be changed
    analytics: false,
    functional: false,
    marketing: false
  });

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      // Show banner after a short delay
      const timer = setTimeout(() => setIsVisible(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAcceptAll = () => {
    const allPreferences = {
      essential: true,
      analytics: true,
      functional: true,
      marketing: true
    };
    savePreferences(allPreferences);
    setIsVisible(false);
  };

  const handleRejectOptional = () => {
    const essentialOnly = {
      essential: true,
      analytics: false,
      functional: false,
      marketing: false
    };
    savePreferences(essentialOnly);
    setIsVisible(false);
  };

  const handleSavePreferences = () => {
    savePreferences(preferences);
    setIsVisible(false);
  };

  const savePreferences = (prefs) => {
    localStorage.setItem('cookie-consent', JSON.stringify({
      preferences: prefs,
      timestamp: new Date().toISOString(),
      version: '1.0'
    }));

    // You can add analytics tracking here based on preferences
    if (prefs.analytics) {
      // Initialize analytics
      console.log('Analytics enabled');
    }
    if (prefs.functional) {
      // Initialize functional cookies
      console.log('Functional cookies enabled');
    }
    if (prefs.marketing) {
      // Initialize marketing cookies
      console.log('Marketing cookies enabled');
    }
  };

  const handlePreferenceChange = (type) => {
    if (type === 'essential') return; // Cannot change essential cookies
    setPreferences(prev => ({
      ...prev,
      [type]: !prev[type]
    }));
  };

  const cookieTypes = [
    {
      id: 'essential',
      title: 'Essential',
      description: 'Required for the website to function properly',
      icon: 'Key',
      color: 'green',
      required: true
    },
    {
      id: 'analytics',
      title: 'Analytics', 
      description: 'Help us understand how you use our website',
      icon: 'BarChart3',
      color: 'blue',
      required: false
    },
    {
      id: 'functional',
      title: 'Functional',
      description: 'Remember your preferences and settings',
      icon: 'Settings',
      color: 'purple',
      required: false
    },
    {
      id: 'marketing',
      title: 'Marketing',
      description: 'Used to show you relevant content and ads',
      icon: 'Target',
      color: 'orange',
      required: false
    }
  ];

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6"
      >
        <div className="max-w-6xl mx-auto">
          <div className="bg-card border border-border rounded-2xl shadow-2xl backdrop-blur-lg">
            
            {!showDetails ? (
              /* Simple Banner */
              <div className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                  {/* Icon and Content */}
                  <div className="flex items-start gap-4 flex-1">
                    <div className="w-12 h-12 rounded-full bg-amber-600/20 flex items-center justify-center flex-shrink-0">
                      <Icon name="Cookie" size={24} className="text-amber-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-semibold text-foreground mb-2">
                        We use cookies to enhance your experience
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        We use essential cookies to make our site work. With your consent, we may also use 
                        non-essential cookies to improve user experience, personalize content, and analyze website traffic.
                      </p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col sm:flex-row gap-3 lg:flex-shrink-0">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setShowDetails(true)}
                      className="text-muted-foreground border-border hover:bg-muted"
                    >
                      <Icon name="Settings" size={14} className="mr-2" />
                      Customize
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleRejectOptional}
                      className="text-muted-foreground hover:bg-muted"
                    >
                      Reject Optional
                    </Button>
                    <Button
                      variant="default"
                      size="sm"
                      onClick={handleAcceptAll}
                      className="bg-blue-600 hover:bg-blue-500"
                    >
                      <Icon name="Check" size={14} className="mr-2" />
                      Accept All
                    </Button>
                  </div>
                </div>

                {/* Privacy Links */}
                <div className="mt-4 pt-4 border-t border-border">
                  <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
                    <a href="/privacy-policy" className="hover:text-foreground transition-colors">
                      Privacy Policy
                    </a>
                    <a href="/cookies-policy" className="hover:text-foreground transition-colors">
                      Cookie Policy
                    </a>
                    <a href="/terms-of-service" className="hover:text-foreground transition-colors">
                      Terms of Service
                    </a>
                  </div>
                </div>
              </div>
            ) : (
              /* Detailed Preferences */
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold text-foreground">Cookie Preferences</h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowDetails(false)}
                    className="text-muted-foreground"
                  >
                    <Icon name="X" size={16} />
                  </Button>
                </div>

                <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                  We use different types of cookies for various purposes. You can choose which types of cookies 
                  you're comfortable with. Essential cookies are required for the website to function properly.
                </p>

                {/* Cookie Categories */}
                <div className="space-y-4 mb-6">
                  {cookieTypes.map((type) => (
                    <div key={type.id} className="flex items-start gap-4 p-4 bg-muted/30 rounded-lg">
                      <div className={`w-8 h-8 rounded-lg bg-${type.color}-600/20 flex items-center justify-center flex-shrink-0`}>
                        <Icon name={type.icon} size={16} className={`text-${type.color}-400`} />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-1">
                          <h4 className="font-medium text-foreground">{type.title}</h4>
                          {type.required && (
                            <span className="text-xs px-2 py-0.5 bg-red-500/20 text-red-300 rounded-full">
                              Required
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground">{type.description}</p>
                      </div>

                      <div className="flex-shrink-0">
                        <button
                          onClick={() => handlePreferenceChange(type.id)}
                          disabled={type.required}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                            preferences[type.id]
                              ? 'bg-blue-600'
                              : 'bg-gray-600'
                          } ${type.required ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                              preferences[type.id] ? 'translate-x-6' : 'translate-x-1'
                            }`}
                          />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-3 justify-end">
                  <Button
                    variant="outline"
                    onClick={handleRejectOptional}
                    className="border-border text-muted-foreground hover:bg-muted"
                  >
                    Reject Optional
                  </Button>
                  <Button
                    variant="default"
                    onClick={handleSavePreferences}
                    className="bg-blue-600 hover:bg-blue-500"
                  >
                    <Icon name="Save" size={14} className="mr-2" />
                    Save Preferences
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default CookieConsent;
