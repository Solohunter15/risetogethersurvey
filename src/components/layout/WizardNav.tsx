import React from 'react';
import { ArrowLeft, ArrowRight, ClipboardCheck, AlertCircle, LayoutGrid, Sparkles } from 'lucide-react';

interface WizardNavProps {
  currentStep: number;
  totalSteps: number;
  onPrev: () => void;
  onNext: () => void;
  onJumpToReview?: () => void;
  onBackToHero?: () => void;
  canProceed?: boolean;
  validationError?: string | null;
  isSubmitting?: boolean;
  nextSectionTitle?: string;
}

export const WizardNav: React.FC<WizardNavProps> = ({
  currentStep,
  totalSteps = 7,
  onPrev,
  onNext,
  onJumpToReview,
  onBackToHero,
  canProceed = true,
  validationError = null,
  isSubmitting = false,
  nextSectionTitle,
}) => {
  const isFirstStep = currentStep === 1;
  const isReviewStep = currentStep === totalSteps;
  const isPenultimateStep = currentStep === totalSteps - 1;

  return (
    <div className="mt-10 pt-6 border-t border-[#0B0A0F]/10 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
      
      {/* Left Action */}
      <div className="w-full sm:w-auto">
        {isFirstStep ? (
          onBackToHero && (
            <button
              type="button"
              onClick={onBackToHero}
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-5 py-3 rounded-xl border border-[#0B0A0F]/15 dark:border-white/15 bg-white dark:bg-[#181622] hover:bg-[#F5F2E9] dark:hover:bg-[#201D2E] text-[#0B0A0F] dark:text-white font-bold text-xs uppercase tracking-wide transition-all shadow-midnight-sm hover:-translate-y-0.5 active:translate-y-0.5 cursor-pointer"
            >
              <LayoutGrid className="w-3.5 h-3.5 text-[#0B0A0F] dark:text-[#CCFF00]" />
              <span>← Back to Overview</span>
            </button>
          )
        ) : (
          <button
            type="button"
            onClick={onPrev}
            className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-6 py-3 rounded-xl border border-[#0B0A0F]/15 dark:border-white/15 bg-white dark:bg-[#181622] hover:bg-[#F5F2E9] dark:hover:bg-[#201D2E] text-[#0B0A0F] dark:text-white font-bold text-xs uppercase tracking-wide transition-all shadow-midnight-sm hover:-translate-y-0.5 active:translate-y-0.5 cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Previous Section</span>
          </button>
        )}
      </div>

      {/* Validation Message */}
      {validationError && (
        <div className="flex items-center space-x-2 text-xs font-bold text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/40 px-4 py-2.5 rounded-xl border border-red-200 dark:border-red-900/40 animate-shake">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{validationError}</span>
        </div>
      )}

      {/* Right Action */}
      <div className="w-full sm:w-auto flex items-center space-x-3">
        {onJumpToReview && !isReviewStep && currentStep >= 4 && currentStep < 6 && (
          <button
            type="button"
            onClick={onJumpToReview}
            className="hidden sm:inline-flex items-center space-x-1.5 text-xs font-bold text-[#0B0A0F] dark:text-[#CCFF00] hover:underline px-3 py-2 cursor-pointer"
          >
            <ClipboardCheck className="w-3.5 h-3.5" />
            <span>Audit Screen →</span>
          </button>
        )}

        <button
          type="button"
          onClick={onNext}
          disabled={!canProceed || isSubmitting}
          className={`w-full sm:w-auto inline-flex items-center justify-center space-x-2.5 px-8 py-3.5 rounded-full font-bold text-xs sm:text-sm tracking-wide transition-all focus:outline-none cursor-pointer ${
            canProceed && !isSubmitting
              ? 'bg-[#0B0A0F] dark:bg-[#CCFF00] text-white dark:text-[#0B0A0F] hover:bg-[#CCFF00] hover:text-[#0B0A0F] dark:hover:bg-white dark:hover:text-[#0B0A0F] shadow-midnight-sm dark:shadow-lime-sm hover:scale-102 active:scale-98'
              : 'bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-600 cursor-not-allowed border-transparent shadow-none'
          }`}
        >
          {isReviewStep ? (
            <>
              <span>{isSubmitting ? 'Transmitting...' : 'Submit Survey'}</span>
              <ClipboardCheck className="w-4 h-4 ml-1" />
            </>
          ) : isPenultimateStep ? (
            <>
              <span>Complete Survey & View Conclusion</span>
              <Sparkles className="w-4 h-4 ml-1 fill-current" />
            </>
          ) : nextSectionTitle ? (
            <>
              <span>Continue to {nextSectionTitle}</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </>
          ) : (
            <>
              <span>Next Section</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </>
          )}
        </button>
      </div>

    </div>
  );
};
