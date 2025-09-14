let calendlyLoadingPromise = null;

function appendCalendlyAssets() {
  // Add CSS
  if (!document.querySelector('link[data-calendly]')) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://assets.calendly.com/assets/external/widget.css';
    link.setAttribute('data-calendly', 'true');
    document.head.appendChild(link);
  }

  // Add Script
  return new Promise((resolve, reject) => {
    if (window.Calendly) return resolve(window.Calendly);
    const existing = document.querySelector('script[data-calendly]');
    if (existing) {
      existing.addEventListener('load', () => resolve(window.Calendly));
      existing.addEventListener('error', reject);
      return;
    }
    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    script.defer = true;
    script.setAttribute('data-calendly', 'true');
    script.onload = () => resolve(window.Calendly);
    script.onerror = reject;
    document.body.appendChild(script);
  });
}

export function loadCalendly() {
  if (!calendlyLoadingPromise) {
    calendlyLoadingPromise = appendCalendlyAssets();
  }
  return calendlyLoadingPromise;
}

export async function openCalendlyPopup(url = 'https://calendly.com/cdwburhan') {
  try {
    const Calendly = await loadCalendly();
    if (Calendly && Calendly.initPopupWidget) {
      Calendly.initPopupWidget({ url });
    }
  } catch (e) {
    // Silently fail
    // eslint-disable-next-line no-console
    console.error('Calendly failed to load', e);
  }
}

export async function initCalendlyBadge(options = {}) {
  try {
    const Calendly = await loadCalendly();
    if (Calendly && Calendly.initBadgeWidget) {
      const defaults = {
        url: 'https://calendly.com/cdwburhan',
        text: 'Schedule time with me',
        color: '#0069ff',
        textColor: '#ffffff',
        branding: true,
      };
      Calendly.initBadgeWidget({ ...defaults, ...options });
    }
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error('Calendly badge failed to init', e);
  }
}


