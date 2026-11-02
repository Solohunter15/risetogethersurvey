import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

export const ScrollToTopWidget: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight > 0) {
        const progress = Math.min(100, Math.max(0, (window.scrollY / scrollHeight) * 100));
        setScrollProgress(progress);
        setVisible(window.scrollY > 280);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  if (!visible) return null;

  // SVG circle circumference for r = 18 is 2 * PI * 18 ≈ 113.1
  const radius = 18;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (scrollProgress / 100) * circumference;

  return (
    <div className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-40 animate-popIn">
      <button
        type="button"
        onClick={scrollToTop}
        aria-label="Scroll to top of page"
        title={`Scrolled ${Math.round(scrollProgress)}% — Click to return to top`}
        className="group relative flex items-center justify-center w-12 h-12 rounded-full bg-white dark:bg-[#181622] text-[#0B0A0F] dark:text-[#FBF9F4] border border-[#0B0A0F]/15 dark:border-[#CCFF00]/40 shadow-xl hover:shadow-[0_0_20px_rgba(204,255,0,0.5)] hover:border-[#0B0A0F] dark:hover:border-[#CCFF00] transition-all duration-300 hover:-translate-y-1 active:translate-y-0.5 focus:outline-none"
      >
        {/* SVG Circular Progress Track */}
        <svg
          className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none p-1"
          viewBox="0 0 44 44"
        >
          {/* Background circle */}
          <circle
            cx="22"
            cy="22"
            r={radius}
            fill="none"
            className="stroke-[#0B0A0F]/10 dark:stroke-white/10"
            strokeWidth="2.5"
          />
          {/* Animated Progress circle */}
          <circle
            cx="22"
            cy="22"
            r={radius}
            fill="none"
            className="stroke-[#CCFF00] dark:stroke-[#CCFF00] transition-all duration-100 ease-out"
            strokeWidth="2.5"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
          />
        </svg>

        {/* Arrow Up Icon with subtle hover bounce */}
        <ArrowUp className="w-4 h-4 group-hover:-translate-y-0.5 group-hover:scale-110 transition-transform duration-200 text-[#0B0A0F] dark:text-[#CCFF00]" />

        {/* Scroll percentage floating indicator on hover */}
        <span className="absolute -top-7 left-1/2 -translate-x-1/2 bg-[#0B0A0F] dark:bg-[#CCFF00] text-white dark:text-[#0B0A0F] text-[10px] font-mono font-bold px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-sm">
          {Math.round(scrollProgress)}%
        </span>
      </button>
    </div>
  );
};
