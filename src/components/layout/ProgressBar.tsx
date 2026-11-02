import React, { useState } from 'react';
import { 
  Check, 
  ChevronDown, 
  ChevronUp, 
  User, 
  BookOpen, 
  Briefcase, 
  Users, 
  Building2, 
  Sparkles, 
  ClipboardCheck,
  LayoutGrid
} from 'lucide-react';
import { WIZARD_STEPS } from '../../types/navigation';

interface ProgressBarProps {
  currentStep: number; // 1 to 7
  visitedSteps: Set<number>;
  onStepClick: (stepNumber: number) => void;
  sectionCompletionStatus?: Record<number, boolean>;
  onReturnToHero?: () => void;
}

const stepIcons: Record<string, React.FC<{ className?: string }>> = {
  User,
  BookOpen,
  Briefcase,
  Users,
  Building2,
  Sparkles,
  ClipboardCheck,
};

export const ProgressBar: React.FC<ProgressBarProps> = ({
  currentStep,
  visitedSteps,
  onStepClick,
  sectionCompletionStatus = {},
  onReturnToHero,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const totalSteps = WIZARD_STEPS.length;
  
  const progressPercent = Math.round(((currentStep - 1) / (totalSteps - 1)) * 100);
  const activeStepMeta = WIZARD_STEPS[currentStep - 1] || WIZARD_STEPS[0];

  return (
    <nav 
      aria-label="Survey Progress" 
      className="mb-8 bg-white dark:bg-[#121118] border border-[#0B0A0F]/15 dark:border-white/10 rounded-3xl p-4 sm:p-5 shadow-glass dark:shadow-glass-dark transition-all"
    >
      {/* Top Header: Section Meta & Metric */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
        <div className="flex items-center space-x-3">
          {onReturnToHero && (
            <button
              type="button"
              onClick={onReturnToHero}
              title="Return to Overview"
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl border border-[#0B0A0F]/15 dark:border-white/15 bg-[#FBF9F4] dark:bg-[#181622] hover:bg-[#CCFF00] hover:text-[#0B0A0F] dark:hover:bg-[#CCFF00] dark:hover:text-[#0B0A0F] text-xs font-mono font-bold text-[#0B0A0F] dark:text-white transition-all shadow-midnight-sm"
            >
              <LayoutGrid className="w-3.5 h-3.5 text-[#F15E21]" />
              <span>Overview</span>
            </button>
          )}

          <div>
            <div className="flex items-center space-x-2">
              <span className="font-mono text-xs font-black text-[#0B0A0F] dark:text-[#CCFF00]">
                CHAPTER {currentStep} / {totalSteps}
              </span>
              <span className="text-slate-300 dark:text-slate-700">•</span>
              <span className="text-xs text-slate-500 font-mono font-medium">
                {activeStepMeta.code === 'Conclusion' ? 'Celebration & Impact' : activeStepMeta.code === 'Review' ? 'Pre-Submission Audit' : `Section ${activeStepMeta.code}`}
              </span>
            </div>
            <h2 className="font-display font-extrabold text-base sm:text-lg text-[#0B0A0F] dark:text-white leading-tight">
              {activeStepMeta.title}
            </h2>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <span className="font-mono text-xs font-black px-2.5 py-1 rounded-full bg-[#CCFF00] text-[#0B0A0F] border border-[#0B0A0F]/20 shadow-lime-sm">
            {progressPercent}% Complete
          </span>
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden inline-flex items-center space-x-1 px-2.5 py-1 text-xs font-bold rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-slate-700 dark:text-slate-300"
          >
            <span>Sections</span>
            {isMobileMenuOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Progress Track with Neon Lime Glow */}
      <div 
        className="w-full h-2.5 bg-[#F5F2E9] dark:bg-slate-900 rounded-full overflow-hidden mb-3 border border-[#0B0A0F]/5 dark:border-white/5 relative" 
        role="progressbar" 
        aria-valuenow={progressPercent} 
        aria-valuemin={0} 
        aria-valuemax={100}
      >
        <div
          className="h-full bg-gradient-to-r from-[#55348A] via-[#F15E21] to-[#CCFF00] rounded-full transition-all duration-500 cubic-bezier(0.16, 1, 0.3, 1) shadow-lime-sm relative"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Desktop Step Buttons */}
      <div className="hidden md:grid grid-cols-7 gap-1.5 pt-2 border-t border-slate-100 dark:border-white/5">
        {WIZARD_STEPS.map((step) => {
          const isActive = step.stepNumber === currentStep;
          const isVisited = visitedSteps.has(step.stepNumber);
          const isCompleted = sectionCompletionStatus[step.stepNumber];
          const isClickable = isVisited || step.stepNumber <= currentStep;
          const Icon = stepIcons[step.iconName] || User;

          return (
            <button
              key={step.stepNumber}
              type="button"
              disabled={!isClickable}
              onClick={() => onStepClick(step.stepNumber)}
              className={`group flex flex-col items-center text-center p-2 rounded-2xl transition-all duration-200 ${
                isActive
                  ? 'bg-[#CCFF00] text-[#0B0A0F] border border-[#0B0A0F] shadow-midnight-sm scale-102 font-bold animate-popIn'
                  : isClickable
                  ? 'hover:bg-[#F5F2E9] dark:hover:bg-[#181622] text-slate-600 dark:text-slate-400 hover:-translate-y-0.5 cursor-pointer'
                  : 'opacity-40 cursor-not-allowed text-slate-400 dark:text-slate-600'
              }`}
            >
              <div
                className={`w-7 h-7 rounded-xl flex items-center justify-center font-bold text-xs mb-1 transition-transform group-hover:scale-105 ${
                  isActive
                    ? 'bg-[#0B0A0F] text-[#CCFF00] shadow-sm'
                    : isCompleted
                    ? 'bg-emerald-600 text-white'
                    : isVisited
                    ? 'bg-slate-800 dark:bg-slate-700 text-white'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
                }`}
              >
                {isCompleted ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : <Icon className="w-3.5 h-3.5" />}
              </div>

              <span className={`font-mono text-[10px] uppercase font-black tracking-wider ${
                isActive ? 'text-[#0B0A0F]' : 'text-slate-500'
              }`}>
                {step.code === 'Review' ? 'Review' : `Sec ${step.code}`}
              </span>
              <span className="text-[11px] font-semibold text-slate-700 dark:text-slate-300 line-clamp-1 max-w-[85px]">
                {step.shortTitle}
              </span>
            </button>
          );
        })}
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden mt-3 pt-3 border-t border-slate-100 dark:border-white/10 space-y-1.5 animate-flowIn">
          {WIZARD_STEPS.map((step) => {
            const isActive = step.stepNumber === currentStep;
            const isVisited = visitedSteps.has(step.stepNumber);
            const isCompleted = sectionCompletionStatus[step.stepNumber];
            const isClickable = isVisited || step.stepNumber <= currentStep;

            return (
              <button
                key={step.stepNumber}
                type="button"
                disabled={!isClickable}
                onClick={() => {
                  onStepClick(step.stepNumber);
                  setIsMobileMenuOpen(false);
                }}
                className={`w-full flex items-center justify-between p-2.5 rounded-xl text-left text-xs font-semibold transition-colors ${
                  isActive
                    ? 'bg-[#CCFF00] text-[#0B0A0F] font-black border border-[#0B0A0F]'
                    : isClickable
                    ? 'hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
                    : 'opacity-40 cursor-not-allowed text-slate-400'
                }`}
              >
                <div className="flex items-center space-x-2.5">
                  <span className="font-mono text-[10px] text-slate-500">[{step.code}]</span>
                  <span>{step.title}</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  {isCompleted && <Check className="w-3.5 h-3.5 text-emerald-600" />}
                  {isActive && (
                    <span className="font-mono text-[10px] text-[#0B0A0F] font-black bg-white px-2 py-0.5 rounded-full">
                      ACTIVE
                    </span>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      )}
    </nav>
  );
};
