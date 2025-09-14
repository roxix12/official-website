import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import { ToastProvider } from './components/ui/Toast';
import ChatAssistantFab from './components/ui/ChatAssistantFab';
import CookieConsent from './components/ui/CookieConsent';
import ServicesPage from './pages/services-partnership-path-offerings';
import SkillsInteractiveMasteryConstellation from './pages/skills-interactive-mastery-constellation';
import HomepageDigitalAlchemistJourneyGateway from './pages/homepage-digital-alchemist-journey-gateway';

import ContactMultiChannelCollaborationHub from './pages/contact-multi-channel-collaboration-hub';
import BlogPage from './pages/blog-tutorials-insights';
import BlogDetail from './pages/blog-tutorials-insights/Detail';
import ProjectsShowcase from './pages/projects-showcase-gallery';
import ChatAssistantPage from './pages/chat-cdw-burhan-assistant';
import FreeResourcesHub from './pages/free-resources-hub';
import TestEmailPage from './pages/test-email';
import PrivacyPolicy from './pages/legal/PrivacyPolicy';
import TermsOfService from './pages/legal/TermsOfService';
import CookiesPolicy from './pages/legal/CookiesPolicy';
import Unsubscribe from './pages/Unsubscribe';
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
import Profile from './pages/Profile';


const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ToastProvider>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<HomepageDigitalAlchemistJourneyGateway />} />
        <Route path="/services-partnership-path-offerings" element={<ServicesPage />} />
        <Route path="/skills-interactive-mastery-constellation" element={<SkillsInteractiveMasteryConstellation />} />
        <Route path="/homepage-digital-alchemist-journey-gateway" element={<HomepageDigitalAlchemistJourneyGateway />} />

        <Route path="/contact-multi-channel-collaboration-hub" element={<ContactMultiChannelCollaborationHub />} />
        <Route path="/blog-tutorials-insights" element={<BlogPage />} />
        <Route path="/blog-tutorials-insights/:slug" element={<BlogDetail />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog/:slug" element={<BlogDetail />} />
        <Route path="/projects-showcase-gallery" element={<ProjectsShowcase />} />
        <Route path="/free-resources-hub" element={<FreeResourcesHub />} />
        <Route path="/chat-cdw-burhan-assistant" element={<ChatAssistantPage />} />
        <Route path="/test-email" element={<TestEmailPage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-of-service" element={<TermsOfService />} />
        <Route path="/cookies-policy" element={<CookiesPolicy />} />
        <Route path="/legal/privacy" element={<PrivacyPolicy />} />
        <Route path="/legal/terms" element={<TermsOfService />} />
        <Route path="/legal/cookies" element={<CookiesPolicy />} />
        <Route path="/unsubscribe" element={<Unsubscribe />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/signup" element={<Signup />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      <ChatAssistantFab />
      <CookieConsent />
      </ToastProvider>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
