import React, { useEffect } from "react";
import { Toaster } from 'react-hot-toast';
import Routes from "./Routes";
import "./styles/blog-content.css";
import modernContentMonitor from './services/modernContentMonitor';
import siteSettingsService from './services/siteSettingsService';
import cmsContentService from './services/cmsContentService';
import { AuthProvider } from './contexts/AuthContext';

function App() {
  useEffect(() => {
    // Initialize content notification monitoring on app start
    const initializeNotifications = async () => {
      try {
        const result = await modernContentMonitor.startMonitoring();
      } catch (error) {

      }
    };

    // Initialize site settings service
    const initializeSiteSettings = async () => {
      try {
        await siteSettingsService.initialize();
      } catch (error) {

      }
    };

    // Initialize CMS content service
    const initializeCMSContent = async () => {
      try {
        await cmsContentService.initialize();
      } catch (error) {

      }
    };

    initializeNotifications();
    initializeSiteSettings();
    initializeCMSContent();

    // Cleanup on app unmount
    return () => {
      modernContentMonitor.stopMonitoring();
    };
  }, []);

  return (
    <AuthProvider>
      <Routes />
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#363636',
            color: '#fff',
          },
          success: {
            duration: 3000,
            theme: {
              primary: '#4aed88',
            },
          },
        }}
      />
    </AuthProvider>
  );
}

export default App;
