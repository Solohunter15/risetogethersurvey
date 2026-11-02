import React from 'react';
import { ArrowUp, ShieldCheck, Heart, RotateCcw, LayoutGrid } from 'lucide-react';

interface FooterProps {
  onResetDraft?: () => void;
  onReturnToHero?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onResetDraft, onReturnToHero }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full mt-20 border-t border-[#0B0A0F]/10 dark:border-white/10 bg-[#F5F2E9]/70 dark:bg-[#0B0A0F] text-[#0B0A0F] dark:text-[#FBF9F4] py-16 transition-colors">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Editorial Vision Quote */}
        <div className="p-8 sm:p-10 rounded-3xl bg-white dark:bg-[#14121B] border border-[#0B0A0F]/10 dark:border-[#CCFF00]/30 text-center space-y-4 shadow-glass dark:shadow-glass-dark">
          <p className="font-display font-extrabold text-xl sm:text-2xl text-[#0B0A0F] dark:text-white max-w-2xl mx-auto leading-snug">
            "From identifying challenges to building solutions. From individual potential to collective progress."
          </p>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
            <strong className="text-[#55348A] dark:text-[#CCFF00]">The goal is simple:</strong> To ensure that every student has a meaningful opportunity to turn knowledge into capability, capability into demonstrable work, and demonstrable work into meaningful opportunities.
          </p>
        </div>

        {/* 3-Column Info & Context */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-xs text-slate-600 dark:text-slate-400">
          
          <div className="space-y-2">
            <h4 className="font-display font-bold text-[#0B0A0F] dark:text-white text-sm uppercase tracking-wider">
              About The Initiative
            </h4>
            <p className="leading-relaxed">
              This survey connects student voices directly with universities, industry leaders, policymakers, and communities across Kerala to foster systemic higher education reform.
            </p>
          </div>

          <div className="space-y-2">
            <h4 className="font-display font-bold text-[#0B0A0F] dark:text-white text-sm uppercase tracking-wider flex items-center space-x-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-[#CCFF00]" />
              <span>Data Protection & Privacy</span>
            </h4>
            <p className="leading-relaxed">
              Student participation is voluntary and anonymous. All aggregated data is analyzed exclusively for public higher education research and community development initiatives.
            </p>
          </div>

          <div className="space-y-4 flex flex-col md:items-end justify-between">
            <div className="flex flex-wrap gap-2">
              {onReturnToHero && (
                <button
                  type="button"
                  onClick={onReturnToHero}
                  className="inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-xl border border-[#0B0A0F]/15 dark:border-white/20 bg-white dark:bg-[#181622] text-[#0B0A0F] dark:text-white hover:bg-[#CCFF00] hover:text-[#0B0A0F] dark:hover:bg-[#CCFF00] dark:hover:text-[#0B0A0F] text-xs font-bold transition-all shadow-midnight-sm"
                >
                  <LayoutGrid className="w-3.5 h-3.5 text-[#F15E21]" />
                  <span>Overview</span>
                </button>
              )}
              <button
                type="button"
                onClick={scrollToTop}
                className="inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-xl border border-[#0B0A0F]/15 dark:border-white/20 bg-white dark:bg-[#181622] text-[#0B0A0F] dark:text-white hover:bg-[#CCFF00] hover:text-[#0B0A0F] dark:hover:bg-[#CCFF00] dark:hover:text-[#0B0A0F] text-xs font-bold transition-all shadow-midnight-sm"
              >
                <ArrowUp className="w-3.5 h-3.5" />
                <span>Top</span>
              </button>
            </div>

            {onResetDraft && (
              <button
                type="button"
                onClick={onResetDraft}
                className="inline-flex items-center space-x-1 text-slate-500 hover:text-red-600 dark:hover:text-red-400 transition-colors text-[11px]"
                title="Clear all saved draft answers"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset saved survey draft</span>
              </button>
            )}
          </div>

        </div>

        {/* Bottom Attribution */}
        <div className="pt-6 border-t border-[#0B0A0F]/10 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-2 font-mono">
          <p>© 2026 Beyond Syllabus & Rise Together. All student rights reserved.</p>
          <p className="flex items-center space-x-1">
            <span>Empowering students across Kerala</span>
            <Heart className="w-3 h-3 text-[#F15E21] fill-current" />
          </p>
        </div>

      </div>
    </footer>
  );
};
