import React, { useEffect, useState } from 'react';

export const AmbientBackground: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10" aria-hidden="true">
      {/* Dynamic Ambient Orb 1 - Top Left Neon Lime */}
      <div
        className="absolute -top-32 -left-32 w-96 h-96 sm:w-[480px] sm:h-[480px] rounded-full bg-[#CCFF00]/10 dark:bg-[#CCFF00]/8 blur-3xl transition-transform duration-700 ease-out animate-floatSlow"
        style={{
          transform: `translate3d(0, ${scrollY * 0.08}px, 0)`,
        }}
      />

      {/* Dynamic Ambient Orb 2 - Middle Right Flame Coral */}
      <div
        className="absolute top-1/3 -right-40 w-80 h-80 sm:w-[440px] sm:h-[440px] rounded-full bg-[#F15E21]/8 dark:bg-[#F15E21]/6 blur-3xl transition-transform duration-700 ease-out animate-float3D"
        style={{
          transform: `translate3d(0, ${-scrollY * 0.06}px, 0)`,
        }}
      />

      {/* Dynamic Ambient Orb 3 - Bottom Left Royal Deep Purple */}
      <div
        className="absolute bottom-10 left-1/4 w-80 h-80 sm:w-[500px] sm:h-[500px] rounded-full bg-[#55348A]/6 dark:bg-[#55348A]/10 blur-3xl transition-transform duration-700 ease-out animate-glowPulse"
        style={{
          transform: `translate3d(0, ${scrollY * 0.04}px, 0)`,
        }}
      />

      {/* Subtle fine dot grid texture */}
      <div className="absolute inset-0 story-grid opacity-30 dark:opacity-20" />
    </div>
  );
};
