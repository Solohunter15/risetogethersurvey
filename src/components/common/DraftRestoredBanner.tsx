/**
 * Kerala Student Experience & Higher Education Transformation Survey
 * Initiative: Beyond Syllabus & Rise Together 2026
 *
 * File: src/components/common/DraftRestoredBanner.tsx
 * Description: Visible alert banner when an autosaved draft is loaded from localStorage.
 */

import React from 'react';
import { History, RotateCcw, X } from 'lucide-react';
import { useSurveyStore } from '../../store/surveyStore';

export const DraftRestoredBanner: React.FC = () => {
  const { draftRestored, restoredAt, dismissDraftBanner, resetSurvey } = useSurveyStore();

  if (!draftRestored) return null;

  const handleResetWithConfirm = () => {
    if (
      window.confirm(
        'Are you sure you want to clear your saved survey draft and restart? This will erase all previously entered answers and cannot be undone.'
      )
    ) {
      resetSurvey();
    }
  };

  return (
    <div
      role="status"
      aria-live="polite"
      className="mb-6 rounded-2xl border border-purple-200 dark:border-purple-800 bg-purple-50/90 dark:bg-purple-950/60 p-4 shadow-xs backdrop-blur-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs sm:text-sm animate-slideInDown"
    >
      <div className="flex items-center space-x-3">
        <div className="p-2 rounded-xl bg-purple-200/70 dark:bg-purple-900/80 text-purple-800 dark:text-purple-300 flex-shrink-0">
          <History className="w-4 h-4" />
        </div>
        <div>
          <span className="font-bold text-purple-900 dark:text-purple-200">
            Survey draft restored
          </span>
          <p className="text-slate-600 dark:text-slate-300 text-xs mt-0.5">
            Your progress from {restoredAt || 'a previous session'} was automatically recovered.
          </p>
        </div>
      </div>

      <div className="flex items-center space-x-2 self-end sm:self-auto">
        <button
          type="button"
          onClick={handleResetWithConfirm}
          className="inline-flex items-center space-x-1 px-3 py-1.5 rounded-lg text-xs font-semibold text-red-700 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/50 transition border border-transparent hover:border-red-200 dark:hover:border-red-900"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Clear & Restart</span>
        </button>

        <button
          type="button"
          onClick={dismissDraftBanner}
          className="p-1.5 rounded-lg text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 hover:bg-purple-100 dark:hover:bg-purple-900/40 transition"
          aria-label="Dismiss banner"
          title="Dismiss banner"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default DraftRestoredBanner;
