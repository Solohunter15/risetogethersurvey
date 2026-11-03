import React, { useState } from 'react';
import { 
  Check, 
  ChevronDown, 
  ChevronUp, 
  LayoutGrid
} from 'lucide-react';
import { WIZARD_STEPS, WizardStepMeta } from '../../types/navigation';

interface ProgressBarProps {
  currentStep: number; // 1 to totalSteps
  visitedSteps: Set<number>;
  onStepClick: (stepNumber: number) => void;
  sectionCompletionStatus?: Record<number, boolean>;
  onReturnToHero?: () => void;
  wizardSteps?: WizardStepMeta[];
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  currentStep,
  visitedSteps,
  onStepClick,
  sectionCompletionStatus = {},
  onReturnToHero,
  wizardSteps,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const activeWizardSteps = wizardSteps || WIZARD_STEPS;
  const totalSteps = activeWizardSteps.length;
  
  const progressPercent = Math.round(((currentStep - 1) / Math.max(1, totalSteps - 1)) * 100);
  const activeStepMeta = activeWizardSteps[currentStep - 1] || activeWizardSteps[0];
  const gridColsClass = totalSteps === 6 ? 'md:grid-cols-6' : 'md:grid-cols-7';

  return (
    <nav 
      aria-label="Survey Progress" 
      className="mb-8 w-full transition-all"
    >
      {/* Top Reassurance Banner (Exact Purple Movement style) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs sm:text-sm text-slate-500 dark:text-slate-400 mb-6 gap-2">
        <p className="font-sans">
          Your responses save automatically as you go, so you can go back and change anything.
        </p>
        {onReturnToHero && (
          <button
            type="button"
            onClick={onReturnToHero}
            className="inline-flex items-center space-x-1.5 text-xs font-semibold text-[#0B0A0F] dark:text-[#CCFF00] hover:underline cursor-pointer self-start sm:self-auto"
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            <span>Return to Overview</span>
          </button>
        )}
      </div>

      {/* Horizontal Multi-Step Track (Purple Movement Stepper) */}
      <div className={`hidden md:grid ${gridColsClass} gap-3 mb-6`}>
        {activeWizardSteps.map((step) => {
          const isActive = step.stepNumber === currentStep;
          const isVisited = visitedSteps.has(step.stepNumber);
          const isCompleted = sectionCompletionStatus[step.stepNumber];
          const isClickable = isVisited || step.stepNumber <= currentStep;

          return (
            <button
              key={step.stepNumber}
              type="button"
              disabled={!isClickable}
              onClick={() => onStepClick(step.stepNumber)}
              className={`group flex flex-col items-start text-left space-y-2 transition-all duration-200 ${
                isClickable ? 'cursor-pointer' : 'cursor-not-allowed opacity-40'
              }`}
            >
              {/* Step Line Indicator */}
              <div 
                className={`w-full h-1 rounded-full transition-all duration-300 ${
                  isActive
                    ? 'bg-[#7C3AED] dark:bg-[#CCFF00] shadow-[0_0_8px_rgba(124,58,237,0.4)] dark:shadow-[0_0_8px_rgba(204,255,0,0.4)]'
                    : isCompleted
                    ? 'bg-[#0B0A0F]/60 dark:bg-white/60'
                    : isVisited
                    ? 'bg-[#0B0A0F]/30 dark:bg-white/30'
                    : 'bg-slate-200 dark:bg-white/10'
                }`}
              />

              {/* Step Label */}
              <div className="flex items-center space-x-1.5">
                {isCompleted && (
                  <Check className="w-3 h-3 text-emerald-600 dark:text-[#CCFF00] stroke-[3]" />
                )}
                <span 
                  className={`text-xs font-semibold transition-colors ${
                    isActive
                      ? 'text-[#7C3AED] dark:text-[#CCFF00] font-bold'
                      : isClickable
                      ? 'text-slate-600 dark:text-slate-400 group-hover:text-[#0B0A0F] dark:group-hover:text-white'
                      : 'text-slate-400 dark:text-slate-600'
                  }`}
                >
                  {step.shortTitle}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Mobile Stepper Header */}
      <div className="md:hidden flex items-center justify-between p-3.5 rounded-2xl bg-white dark:bg-[#121118] border border-[#0B0A0F]/15 dark:border-white/10 shadow-xs mb-4">
        <div>
          <span className="font-mono text-[11px] font-bold text-slate-500 uppercase tracking-wider">
            Step {currentStep} of {totalSteps}: {activeStepMeta.shortTitle}
          </span>
          <div className="text-xs font-bold text-[#0B0A0F] dark:text-white mt-0.5">
            {progressPercent}% Complete
          </div>
        </div>

        <button
          type="button"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="inline-flex items-center space-x-1 px-3 py-1.5 text-xs font-bold rounded-xl border border-[#0B0A0F]/15 dark:border-white/15 bg-[#FBF9F4] dark:bg-[#181622] text-[#0B0A0F] dark:text-white"
        >
          <span>Sections</span>
          {isMobileMenuOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden mb-6 p-3 rounded-2xl bg-white dark:bg-[#121118] border border-[#0B0A0F]/15 dark:border-white/10 space-y-1.5 animate-flowIn shadow-glass">
          {activeWizardSteps.map((step) => {
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
                className={`w-full flex items-center justify-between p-2.5 rounded-xl text-left transition-colors ${
                  isActive
                    ? 'bg-[#7C3AED]/10 dark:bg-[#CCFF00]/15 text-[#7C3AED] dark:text-[#CCFF00] font-bold'
                    : isClickable
                    ? 'text-slate-700 dark:text-slate-300 hover:bg-black/5 dark:hover:bg-white/5'
                    : 'text-slate-400 dark:text-slate-600 cursor-not-allowed opacity-50'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <span className="font-mono text-[10px] uppercase tracking-wider px-1.5 py-0.5 rounded-md bg-black/5 dark:bg-white/10">
                    {step.code}
                  </span>
                  <span className="text-xs font-medium">{step.title}</span>
                </div>
                {isCompleted && (
                  <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-[#CCFF00] stroke-[3]" />
                )}
              </button>
            );
          })}
        </div>
      )}
    </nav>
  );
};
