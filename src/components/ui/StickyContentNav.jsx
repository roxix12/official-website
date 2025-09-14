import React, { useEffect, useMemo, useState } from 'react';
import Icon from '../AppIcon';

/**
 * StickyContentNav
 * - Horizontal section navigation that appears under the header when you scroll.
 * - Highlights the currently visible section.
 * - Smooth-scrolls to sections and accounts for sticky header height.
 */
function StickyContentNav({ sections = [], offsetTopPx = 68, revealAt = 100 }) {
  const [activeSection, setActiveSection] = useState(sections?.[0]?.id || null);
  const [isScrolled, setIsScrolled] = useState(false);

  const sectionIds = useMemo(() => sections?.map(s => s?.id).filter(Boolean), [sections]);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY || 0;
      setIsScrolled(scrolled > revealAt);

      const candidates = sectionIds
        .map(id => document.getElementById(id))
        .filter(Boolean);

      const current = candidates.find(el => {
        const rect = el.getBoundingClientRect();
        return rect.top <= offsetTopPx + 60 && rect.bottom >= offsetTopPx + 60;
      });
      if (current && current.id !== activeSection) {
        setActiveSection(current.id);
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sectionIds, offsetTopPx, revealAt, activeSection]);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    const top = Math.max(0, el.offsetTop - (offsetTopPx + 56));
    window.scrollTo({ top, behavior: 'smooth' });
  };

  if (!sections?.length) return null;

  return (
    <div
      className={`fixed left-0 right-0 z-30 transition-all duration-500 ease-out ${
        isScrolled ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
      } md:block`}
      style={{ top: `${offsetTopPx}px` }}
    >
      <div className="bg-background/95 backdrop-blur-md border-b border-border shadow-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center justify-start lg:justify-center gap-1 py-3 overflow-x-auto scrollbar-hide px-2">
            {sections.map((s, index) => (
              <button
                key={s.id}
                onClick={() => scrollToSection(s.id)}
                className={`flex items-center space-x-2 px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all duration-300 whitespace-nowrap hover:scale-105 hover:shadow-md ${
                  activeSection === s.id
                    ? 'bg-accent/10 text-accent border border-accent/20 shadow-md neon-border-active scale-105'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/20 hover:border hover:border-muted/40'
                }`}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {s.icon ? <Icon name={s.icon} size={14} className="sm:w-4 sm:h-4" /> : null}
                <span className="hidden sm:inline">{s.title}</span>
                <span className="sm:hidden">{s.title.split(' ')[0]}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}

export default StickyContentNav;


