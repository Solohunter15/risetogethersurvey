/**
 * Kerala Student Experience & Higher Education Transformation Survey
 * Initiative: Beyond Syllabus & Rise Together 2026
 *
 * File: src/components/submission/SuccessModal.tsx
 * Description: Post-submission celebration modal with canvas-confetti,
 * response summary copying, multi-platform social sharing, and Beyond Syllabus CTA.
 */

import React, { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  CheckCircle2, 
  Copy, 
  Check, 
  Download, 
  X, 
} from 'lucide-react';
import { SurveyResponse } from '../../types/survey';
import { exportToJson, exportToCsv, generateSummaryText } from '../../utils/export';
import { SURVEY_METADATA } from '../../data/surveyContent';

export interface SuccessModalProps {
  submissionId: string;
  submittedAt: string;
  responses: SurveyResponse;
  onClose: () => void;
}

export const SuccessModal: React.FC<SuccessModalProps> = ({
  submissionId,
  submittedAt,
  responses,
  onClose,
}) => {
  const [copied, setCopied] = useState<boolean>(false);

  // Trigger celebration confetti on mount
  useEffect(() => {
    try {
      // First burst
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#55348A', '#F15E21', '#9333EA', '#F97316', '#38BDF8'],
      });

      // Side fireworks burst
      setTimeout(() => {
        confetti({
          particleCount: 50,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ['#55348A', '#F15E21', '#FBBF24'],
        });
        confetti({
          particleCount: 50,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ['#55348A', '#F15E21', '#FBBF24'],
        });
      }, 250);
    } catch (e) {
      console.warn('Canvas confetti execution failed:', e);
    }
  }, []);

  const handleCopySummary = async () => {
    const summary = generateSummaryText(responses);
    try {
      await navigator.clipboard.writeText(summary);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch (e) {
      alert('Summary copied to clipboard!');
    }
  };

  // Social Share URLs
  const shareText = encodeURIComponent(
    'I just shared my thoughts on transforming Kerala higher education through the Rise Together 2026 survey! Make your voice heard: https://risetogether2026.org'
  );
  const shareUrl = encodeURIComponent('https://risetogether2026.org');

  const shareLinks = {
    whatsapp: `https://api.whatsapp.com/send?text=${shareText}`,
    telegram: `https://t.me/share/url?url=${shareUrl}&text=${shareText}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`,
    twitter: `https://twitter.com/intent/tweet?text=${shareText}`,
  };

  return (
    <div 
      role="dialog" 
      aria-modal="true" 
      data-testid="success-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-slate-950/70 backdrop-blur-sm animate-fadeIn"
    >
      <div className="relative w-full max-w-xl rounded-3xl bg-white dark:bg-[#151320] border border-slate-200 dark:border-purple-900/40 shadow-2xl p-6 sm:p-8 overflow-hidden animate-popIn">
        
        {/* Top Decorative Gradient Ribbon */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-purple-700 via-orange-500 to-amber-400" />

        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close modal"
          data-testid="modal-close-btn"
          className="absolute top-4 right-4 p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Body */}
        <div className="text-center pt-2">
          
          {/* Celebratory Icon */}
          <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto rounded-3xl bg-gradient-to-tr from-purple-700 to-[#F15E21] p-0.5 shadow-xl shadow-orange-500/20 flex items-center justify-center">
            <div className="w-full h-full bg-white dark:bg-[#151320] rounded-[22px] flex items-center justify-center">
              <CheckCircle2 className="w-10 h-10 sm:w-12 sm:h-12 text-[#F15E21] dark:text-[#FF7A45]" />
            </div>
          </div>

          <h3 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-4">
            Thank You for Shaping the Future!
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-300 mt-2 max-w-md mx-auto">
            Your voice and actionable solutions are now officially recorded for <strong>Beyond Syllabus & Rise Together 2026</strong>.
          </p>

          {/* Submission Receipt Badge */}
          <div className="mt-5 p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-purple-900/40 text-xs flex flex-col sm:flex-row items-center justify-between gap-2">
            <div>
              <span className="text-slate-500 dark:text-slate-400">Submission ID: </span>
              <span data-testid="submission-id" className="font-mono font-bold text-purple-700 dark:text-purple-300">{submissionId}</span>
            </div>
            <div className="text-slate-500 dark:text-slate-400">
              <span>Recorded: </span>
              <span className="font-medium text-slate-700 dark:text-slate-300">{submittedAt}</span>
            </div>
          </div>

          {/* Action Buttons: Copy Summary & Backups */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2.5">
            <button
              type="button"
              onClick={handleCopySummary}
              data-testid="copy-summary-btn"
              className="inline-flex items-center space-x-1.5 px-4 py-2 text-xs sm:text-sm font-semibold rounded-xl bg-purple-100 dark:bg-purple-950 text-purple-800 dark:text-purple-300 hover:bg-purple-200 dark:hover:bg-purple-900 transition"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Summary Copied!' : 'Copy Summary'}</span>
            </button>
            <button
              type="button"
              onClick={() => exportToJson(responses)}
              data-testid="modal-download-json-btn"
              className="inline-flex items-center space-x-1.5 px-4 py-2 text-xs sm:text-sm font-semibold rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#151320] text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition"
            >
              <Download className="w-4 h-4 text-purple-600" />
              <span>Download JSON</span>
            </button>
            <button
              type="button"
              onClick={() => exportToCsv(responses)}
              data-testid="modal-download-csv-btn"
              className="inline-flex items-center space-x-1.5 px-4 py-2 text-xs sm:text-sm font-semibold rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#151320] text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition"
            >
              <Download className="w-4 h-4 text-orange-600" />
              <span>Download CSV</span>
            </button>
          </div>

          {/* Social Share Section */}
          <div className="mt-6 pt-5 border-t border-slate-200 dark:border-slate-800">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3">
              Inspire Fellow Students in Kerala to Participate
            </p>
            <div className="flex items-center justify-center space-x-3">
              <a
                href={shareLinks.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                data-testid="share-whatsapp"
                className="px-3.5 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold transition flex items-center space-x-1"
              >
                <span>WhatsApp</span>
              </a>
              <a
                href={shareLinks.telegram}
                target="_blank"
                rel="noopener noreferrer"
                data-testid="share-telegram"
                className="px-3.5 py-1.5 rounded-xl bg-sky-500 hover:bg-sky-600 text-white text-xs font-bold transition flex items-center space-x-1"
              >
                <span>Telegram</span>
              </a>
              <a
                href={shareLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                data-testid="share-linkedin"
                className="px-3.5 py-1.5 rounded-xl bg-blue-700 hover:bg-blue-800 text-white text-xs font-bold transition flex items-center space-x-1"
              >
                <span>LinkedIn</span>
              </a>
              <a
                href={shareLinks.twitter}
                target="_blank"
                rel="noopener noreferrer"
                data-testid="share-twitter"
                className="px-3.5 py-1.5 rounded-xl bg-slate-900 hover:bg-black text-white text-xs font-bold transition flex items-center space-x-1"
              >
                <span>X / Twitter</span>
              </a>
            </div>
          </div>

          {/* Beyond Syllabus Vision Quote */}
          <div className="mt-6 p-4 rounded-2xl bg-gradient-to-r from-purple-900/10 to-orange-500/10 border border-purple-200/50 dark:border-purple-900/30 text-left">
            <p className="text-xs italic text-slate-600 dark:text-slate-300">
              "{SURVEY_METADATA.closing.goalStatement}"
            </p>
            <div className="mt-2 text-[11px] font-extrabold text-[#F15E21] dark:text-[#FF7A45]">
              {SURVEY_METADATA.closing.taglineBold}
            </div>
          </div>

          {/* Done / Dismiss Button */}
          <div className="mt-6">
            <button
              type="button"
              onClick={onClose}
              data-testid="modal-done-btn"
              className="w-full py-2.5 rounded-xl font-bold text-sm bg-slate-900 hover:bg-slate-800 dark:bg-purple-900 dark:hover:bg-purple-800 text-white transition shadow-md"
            >
              Done & Return to Survey
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};

export default SuccessModal;
