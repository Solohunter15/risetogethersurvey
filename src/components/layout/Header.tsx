import React, { useState, useEffect } from 'react';
import { Sun, Moon, FileText, ArrowRight, Compass } from 'lucide-react';

interface HeaderProps {
  lastSavedAt?: string | null;
  isSaving?: boolean;
  currentStep?: number;
  totalSteps?: number;
  activeView?: 'hero' | 'survey';
  onToggleView?: (view: 'hero' | 'survey') => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentStep = 1,
  totalSteps = 7,
  activeView = 'hero',
  onToggleView,
}) => {
  // Default strictly to Light Mode (false) unless user explicitly saved 'dark'
  const [isDark, setIsDark] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('rt2026_theme');
      return stored === 'dark';
    }
    return false;
  });

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
      localStorage.setItem('rt2026_theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('rt2026_theme', 'light');
    }
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark((prev) => !prev);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-[#FBF9F4]/90 dark:bg-[#0B0A0F]/90 backdrop-blur-md border-b border-[#0B0A0F]/10 dark:border-white/10 transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Brand Logo: Clean, un-congested, no restrictive boxes */}
          <div 
            onClick={() => onToggleView && onToggleView('hero')}
            className="flex items-center space-x-3 sm:space-x-4 cursor-pointer group"
          >
            {/* Free-standing logo without arbitrary container box */}
            <div className="flex items-center">
              <img
                src="/logo-clean.png"
                alt="Rise Together 2026"
                className="h-10 sm:h-12 w-auto object-contain dark:hidden transition-transform duration-200 group-hover:scale-102"
              />
              <img
                src="/logo-clean-dark.png"
                alt="Rise Together 2026"
                className="h-10 sm:h-12 w-auto object-contain hidden dark:block transition-transform duration-200 group-hover:scale-102 drop-shadow-[0_0_12px_rgba(204,255,0,0.2)]"
              />
            </div>

            {/* Subtle Initiative Context Tag */}
            <div className="hidden sm:flex flex-col border-l border-[#0B0A0F]/15 dark:border-white/15 pl-3.5">
              <span className="font-mono text-[10px] uppercase font-bold tracking-widest text-[#0B0A0F] dark:text-[#CCFF00]">
                Statewide Survey 2026
              </span>
              <span className="font-sans text-xs text-slate-500 dark:text-slate-400 font-medium tracking-tight">
                The Purple Movement • Kerala
              </span>
            </div>
          </div>

          {/* Right Navigation Controls */}
          <div className="flex items-center space-x-2.5 sm:space-x-4">
            
            {/* Survey Navigation Action */}
            {onToggleView && (
              <div className="flex items-center space-x-2">
                {activeView === 'hero' ? (
                  <button
                    type="button"
                    onClick={() => onToggleView('survey')}
                    className="inline-flex items-center space-x-2 px-3.5 sm:px-4 py-2 rounded-xl bg-[#CCFF00] text-[#0B0A0F] font-bold text-xs uppercase tracking-wider border border-[#0B0A0F] shadow-midnight-sm hover:scale-102 transition-all cursor-pointer"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>Start Survey</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <div className="inline-flex items-center space-x-2">
                    <button
                      type="button"
                      onClick={() => onToggleView('hero')}
                      className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-white dark:bg-[#181622] text-[#0B0A0F] dark:text-white border border-[#0B0A0F]/15 dark:border-white/15 text-xs font-semibold hover:border-[#0B0A0F] transition-all shadow-midnight-sm cursor-pointer"
                    >
                      <Compass className="w-3.5 h-3.5 text-slate-500" />
                      <span>Overview</span>
                    </button>
                    <span className="font-mono text-xs font-bold bg-[#CCFF00] text-[#0B0A0F] px-2.5 py-1 rounded-xl border border-[#0B0A0F]/20">
                      Chapter {currentStep}/{totalSteps}
                    </span>
                  </div>
                )}
              </div>
            )}

            {/* Theme Switcher */}
            <button
              onClick={toggleTheme}
              type="button"
              aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
              className="p-2 sm:p-2.5 rounded-xl border border-[#0B0A0F]/15 dark:border-white/15 bg-white dark:bg-[#181622] text-[#0B0A0F] dark:text-white hover:bg-[#CCFF00] hover:text-[#0B0A0F] dark:hover:bg-[#CCFF00] dark:hover:text-[#0B0A0F] transition-all shadow-midnight-sm"
            >
              {isDark ? (
                <Sun className="w-4 h-4 text-[#CCFF00] group-hover:text-[#0B0A0F]" />
              ) : (
                <Moon className="w-4 h-4" />
              )}
            </button>

          </div>
        </div>
      </div>
    </header>
  );
};
