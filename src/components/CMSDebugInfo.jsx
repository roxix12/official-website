import React, { useState, useEffect } from 'react';
import cmsContentService from '../services/cmsContentService';

const CMSDebugInfo = () => {
  const [debugInfo, setDebugInfo] = useState({
    content: {},
    lastUpdate: null,
    contentKeys: []
  });

  useEffect(() => {
    // Load initial content
    const loadDebugInfo = () => {
      const content = cmsContentService.getContent();
      setDebugInfo({
        content: content,
        lastUpdate: new Date().toLocaleTimeString(),
        contentKeys: Object.keys(content)
      });
    };

    loadDebugInfo();

    // Subscribe to content changes
    const unsubscribe = cmsContentService.subscribe((allContent) => {
      setDebugInfo({
        content: allContent,
        lastUpdate: new Date().toLocaleTimeString(),
        contentKeys: Object.keys(allContent || {})
      });
    });

    return unsubscribe;
  }, []);

  // Component disabled: return null to avoid rendering
  return null;
};

export default CMSDebugInfo;
