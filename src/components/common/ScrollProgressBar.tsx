import React, { useState, useEffect } from 'react';

export const ScrollProgressBar: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight > 0) {
        const progress = (window.scrollY / scrollHeight) * 100;
        setScrollProgress(Math.min(100, Math.max(0, progress)));
        setIsVisible(window.scrollY > 20);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible && scrollProgress === 0) return null;

  return (
    <div 
      className="fixed top-0 left-0 right-0 h-[3.5px] z-[100] pointer-events-none transition-opacity duration-300"
      style={{ opacity: isVisible ? 1 : 0 }}
      aria-hidden="true"
    >
      {/* Background track */}
      <div className="w-full h-full bg-[#0B0A0F]/5 dark:bg-white/5" />

      {/* Dynamic neon lime / flame orange gradient scroll bar */}
      <div
        className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#CCFF00] via-[#D9FF26] to-[#F15E21] transition-all duration-75 ease-out shadow-[0_0_12px_rgba(204,255,0,0.8)]"
        style={{ width: `${scrollProgress}%` }}
      >
        {/* Leading tip glow beacon */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-white shadow-[0_0_10px_#CCFF00] animate-pulse" />
      </div>
    </div>
  );
};
