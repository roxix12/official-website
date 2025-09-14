import React, { useEffect, useState } from 'react';

/**
 * ScrollProgressBar
 * Fixed, minimal scroll progress indicator that sits just under the sticky `Header`.
 * - Appears on all pages for consistent UX
 * - Gradient bar with subtle hover affordances
 */
function ScrollProgressBar({ offsetTopPx = 68 }) {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = maxScroll > 0 ? (scrolled / maxScroll) * 100 : 0;
      setScrollProgress(progress);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed left-0 right-0 z-40 group" style={{ top: `${offsetTopPx}px` }}>
      {/* Track */}
      <div className="w-full h-1.5 bg-white/5 backdrop-blur-md group-hover:h-2 transition-all duration-300 relative overflow-hidden">
        {/* Animated sheen */}
        <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-[1600ms] ease-out bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        {/* Progress */}
        <div
          className="h-full relative transition-all duration-500"
          style={{ width: `${scrollProgress}%` }}
        >
          <div className="absolute inset-0 bg-[conic-gradient(at_left,_theme(colors.blue.500),_theme(colors.cyan.400),_theme(colors.purple.500))]" />
          {/* Glow */}
          <div className="absolute -inset-x-6 -inset-y-1 blur-md bg-blue-500/20" />
          {/* Knob */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-3 h-3 rounded-full bg-white/80 shadow-[0_0_12px_rgba(59,130,246,0.8)] ring-2 ring-blue-400/40" />
          {/* Tooltip */}
          <div className="absolute right-0 -top-9 -translate-y-full translate-x-1/2 bg-black/80 backdrop-blur border border-white/10 rounded-md px-2.5 py-1 text-[11px] font-medium text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
            {Math.round(scrollProgress)}%
          </div>
        </div>
      </div>
    </div>
  );
}

export default ScrollProgressBar;


