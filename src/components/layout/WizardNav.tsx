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
}) => {
  const isFirstStep = currentStep === 1;
  const isReviewStep = currentStep === totalSteps;

  return (
    <div className="mt-10 pt-6 border-t border-[#0B0A0F]/10 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
      
      {/* Left Action */}
      <div className="w-full sm:w-auto">
        {isFirstStep ? (
          onBackToHero && (
            <button
              type="button"
              onClick={onBackToHero}
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-5 py-3 rounded-xl border border-[#0B0A0F]/15 dark:border-white/15 bg-white dark:bg-[#181622] hover:bg-[#F5F2E9] dark:hover:bg-[#201D2E] text-[#0B0A0F] dark:text-white font-bold text-xs uppercase tracking-wide transition-all shadow-midnight-sm hover:-translate-y-0.5 active:translate-y-0.5"
            >
              <LayoutGrid className="w-3.5 h-3.5 text-[#F15E21]" />
              <span>← Back to Overview</span>
            </button>
          )
        ) : (
          <button
            type="button"
            onClick={onPrev}
            className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-6 py-3 rounded-xl border border-[#0B0A0F]/15 dark:border-white/15 bg-white dark:bg-[#181622] hover:bg-[#F5F2E9] dark:hover:bg-[#201D2E] text-[#0B0A0F] dark:text-white font-bold text-xs uppercase tracking-wide transition-all shadow-midnight-sm hover:-translate-y-0.5 active:translate-y-0.5"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Previous Chapter</span>
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
          className={`w-full sm:w-auto inline-flex items-center justify-center space-x-2.5 px-8 py-3.5 rounded-xl font-black text-xs sm:text-sm uppercase tracking-wider transition-all focus:outline-none cursor-pointer ${
            canProceed && !isSubmitting
              ? 'btn-neon shadow-lime-sm'
              : 'bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-600 cursor-not-allowed border-transparent shadow-none'
          }`}
        >
          {currentStep === 6 ? (
            <>
              <span>Complete Survey & View Conclusion</span>
              <Sparkles className="w-4 h-4 fill-[#0B0A0F]" />
            </>
          ) : isReviewStep ? (
            <>
              <span>{isSubmitting ? 'Transmitting...' : 'Submit Survey'}</span>
              <ClipboardCheck className="w-4 h-4" />
            </>
          ) : (
            <>
              <span>Next Chapter</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </div>

    </div>
  );
};
