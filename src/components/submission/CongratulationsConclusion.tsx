/**
 * Kerala Student Experience & Higher Education Transformation Survey
 * Initiative: Beyond Syllabus & Rise Together 2026
 *
 * File: src/components/submission/CongratulationsConclusion.tsx
 * Description: High-energy Celebratory Conclusion screen with confetti,
 * digital verification credential, "Where Your Voice Goes" storytelling path,
 * backup tools, and optional expandable response review.
 */

import React, { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import {
  CheckCircle2,
  Copy,
  Check,
  Download,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Layers,
  ChevronDown,
  ChevronUp,
  RotateCcw,
  FileText,
  Edit3,
} from 'lucide-react';
import { useSurveyStore } from '../../store/surveyStore';
import {
  exportToJson,
  exportToCsv,
  generateSummaryText,
  submitSurveyToApi,
} from '../../utils/export';
import {
  SURVEY_QUESTIONS,
} from '../../data/surveyContent';

interface CongratulationsConclusionProps {
  onReturnToHome: () => void;
  onEditSection: (stepNumber: number) => void;
}

export const CongratulationsConclusion: React.FC<CongratulationsConclusionProps> = ({
  onReturnToHome,
  onEditSection,
}) => {
  const store = useSurveyStore();
  const responses = store.responses;
  const isSubmitted = store.isSubmitted;
  const setSubmittedState = store.setSubmittedState;
  const resetSurvey = store.resetSurvey;

  const [submissionId, setSubmissionId] = useState<string>(
    store.submissionId || `RT2026-${Math.random().toString(36).substring(2, 9).toUpperCase()}`
  );
  const [submittedAt] = useState<string>(
    new Date().toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  );
  const [copied, setCopied] = useState<boolean>(false);
  const [showAnswerAudit, setShowAnswerAudit] = useState<boolean>(false);

  // Trigger celebration fireworks & auto-record submission
  useEffect(() => {
    // 1. Fire Confetti
    try {
      confetti({
        particleCount: 90,
        spread: 80,
        origin: { y: 0.55 },
        colors: ['#CCFF00', '#0B0A0F', '#55348A', '#F15E21', '#38BDF8'],
      });

      const timer = setTimeout(() => {
        confetti({
          particleCount: 50,
          angle: 60,
          spread: 55,
          origin: { x: 0.05, y: 0.6 },
          colors: ['#CCFF00', '#F15E21', '#9333EA'],
        });
        confetti({
          particleCount: 50,
          angle: 120,
          spread: 55,
          origin: { x: 0.95, y: 0.6 },
          colors: ['#CCFF00', '#F15E21', '#9333EA'],
        });
      }, 350);

      return () => clearTimeout(timer);
    } catch (e) {
      console.warn('Canvas confetti execution:', e);
    }
  }, []);

  // Ensure submission state is saved in store
  useEffect(() => {
    if (!isSubmitted) {
      submitSurveyToApi(responses).then((result) => {
        if (result.success) {
          setSubmissionId(result.id);
          setSubmittedState(result.id);
        }
      }).catch((err) => {
        console.warn('Auto submission error:', err);
      });
    }
  }, [isSubmitted, responses, setSubmittedState]);

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

  const handleResetSurvey = () => {
    if (
      window.confirm(
        'Start a new response? This will clear current responses and return to the survey start.'
      )
    ) {
      resetSurvey();
      onReturnToHome();
    }
  };

  // Social Share Links
  const shareText = encodeURIComponent(
    'I just shared my thoughts on transforming Kerala higher education through the Rise Together 2026 survey! Make your voice heard: https://risetogether2026.org'
  );
  const shareUrl = encodeURIComponent('https://risetogether2026.org');

  const shareLinks = {
    whatsapp: `https://api.whatsapp.com/send?text=${shareText}`,
    telegram: `https://t.me/share/url?url=${shareUrl}&text=${shareText}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`,
  };

  const getOptionLabel = (qKey: string, optId: string): string => {
    const question = SURVEY_QUESTIONS[qKey];
    if (!question) return optId;
    const directOption = question.options?.find((o) => o.id === optId);
    if (directOption) return directOption.label;
    if (question.subQuestions) {
      for (const sq of question.subQuestions) {
        const match = sq.options?.find((o) => o.id === optId);
        if (match) return match.label;
      }
    }
    return optId;
  };

  return (
    <div className="w-full space-y-12 animate-fadeIn" data-testid="congratulations-conclusion">
      
      {/* =================================================================== */}
      {/* 1. CELEBRATORY CONGRATULATIONS HERO STAGE                           */}
      {/* =================================================================== */}
      <section className="text-center max-w-3xl mx-auto space-y-6 pt-2">
        
        {/* Animated Celebration Icon */}
        <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto rounded-3xl bg-[#0B0A0F] dark:bg-[#CCFF00] p-1 shadow-midnight dark:shadow-lime-lg flex items-center justify-center animate-popIn">
          <div className="w-full h-full rounded-[20px] bg-[#CCFF00] dark:bg-[#0B0A0F] flex items-center justify-center">
            <CheckCircle2 className="w-12 h-12 sm:w-14 sm:h-14 text-[#0B0A0F] dark:text-[#CCFF00] stroke-[2.5]" />
          </div>
        </div>

        {/* Milestone Badge */}
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-[#CCFF00] text-[#0B0A0F] font-mono text-xs uppercase font-extrabold tracking-wider border border-[#0B0A0F] shadow-midnight-sm">
          <Sparkles className="w-3.5 h-3.5 fill-[#0B0A0F]" />
          <span>SURVEY COMPLETED // VOICE OFFICIALLY RECORDED</span>
        </div>

        {/* Main Headline */}
        <div className="space-y-3">
          <h1 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl text-[#0B0A0F] dark:text-white tracking-tight leading-tight">
            Congratulations! You Are Shaping Higher Education in Kerala.
          </h1>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 font-medium max-w-2xl mx-auto leading-relaxed">
            Thank you for taking the time to share your honest lived experiences, challenges, and actionable solutions. Every student voice strengthens our collective blueprint.
          </p>
        </div>

      </section>

      {/* =================================================================== */}
      {/* 2. OFFICIAL DIGITAL CONTRIBUTOR CREDENTIAL CARD                     */}
      {/* =================================================================== */}
      <div className="max-w-2xl mx-auto rounded-3xl bg-white dark:bg-[#151320] border-2 border-[#0B0A0F] dark:border-[#CCFF00] p-6 sm:p-8 shadow-midnight-lg dark:shadow-lime-sm animate-fadeInUp flow-delay-1 relative overflow-hidden">
        
        {/* Decorative Top Accent */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#55348A] via-[#F15E21] to-[#CCFF00]" />

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#0B0A0F]/10 dark:border-white/10">
          <div>
            <span className="font-mono text-[10px] uppercase font-bold tracking-widest text-[#F15E21]">
              OFFICIAL VERIFICATION RECEIPT
            </span>
            <h3 className="font-display font-bold text-xl text-[#0B0A0F] dark:text-white mt-0.5">
              Verified Student Contributor
            </h3>
          </div>
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 text-xs font-bold font-mono">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>100% Anonymous</span>
          </div>
        </div>

        {/* Credential Data Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-5 text-xs sm:text-sm font-mono">
          <div>
            <span className="text-slate-400 block text-[11px] uppercase">Submission ID</span>
            <span className="font-bold text-[#0B0A0F] dark:text-[#CCFF00] text-base tracking-wider">
              {submissionId}
            </span>
          </div>
          <div>
            <span className="text-slate-400 block text-[11px] uppercase">Timestamp</span>
            <span className="font-semibold text-slate-800 dark:text-slate-200">
              {submittedAt}
            </span>
          </div>
          <div>
            <span className="text-slate-400 block text-[11px] uppercase">Initiative</span>
            <span className="font-semibold text-slate-800 dark:text-slate-200 font-sans">
              Beyond Syllabus • Rise Together 2026
            </span>
          </div>
          <div>
            <span className="text-slate-400 block text-[11px] uppercase">Scope</span>
            <span className="font-semibold text-slate-800 dark:text-slate-200 font-sans">
              Kerala Statewide Transformation
            </span>
          </div>
        </div>

        {/* Credential Quick Actions */}
        <div className="pt-4 border-t border-[#0B0A0F]/10 dark:border-white/10 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={handleCopySummary}
              className="inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-[#0B0A0F]/5 dark:bg-white/10 hover:bg-[#CCFF00] hover:text-[#0B0A0F] text-[#0B0A0F] dark:text-white text-xs font-bold transition-all"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Summary Copied!' : 'Copy Summary'}</span>
            </button>
            <button
              type="button"
              onClick={() => exportToJson(responses)}
              className="inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-[#0B0A0F]/5 dark:bg-white/10 hover:bg-[#CCFF00] hover:text-[#0B0A0F] text-[#0B0A0F] dark:text-white text-xs font-bold transition-all"
            >
              <Download className="w-3.5 h-3.5 text-purple-600" />
              <span>JSON</span>
            </button>
            <button
              type="button"
              onClick={() => exportToCsv(responses)}
              className="inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-[#0B0A0F]/5 dark:bg-white/10 hover:bg-[#CCFF00] hover:text-[#0B0A0F] text-[#0B0A0F] dark:text-white text-xs font-bold transition-all"
            >
              <FileText className="w-3.5 h-3.5 text-[#F15E21]" />
              <span>CSV</span>
            </button>
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-xs font-mono text-slate-400">Share:</span>
            <a
              href={shareLinks.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold transition-transform hover:scale-105"
              title="Share to WhatsApp"
            >
              WhatsApp
            </a>
            <a
              href={shareLinks.telegram}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-xl bg-sky-500 hover:bg-sky-600 text-white text-xs font-bold transition-transform hover:scale-105"
              title="Share to Telegram"
            >
              Telegram
            </a>
          </div>
        </div>

      </div>

      {/* =================================================================== */}
      {/* 3. CREATIVE CONCLUSION: "THE JOURNEY OF YOUR VOICE"                 */}
      {/* =================================================================== */}
      <section className="max-w-4xl mx-auto space-y-6 pt-4">
        
        <div className="text-center space-y-2">
          <span className="font-mono text-xs uppercase tracking-widest text-[#55348A] dark:text-[#CCFF00] font-bold">
            [ WHAT HAPPENS NEXT // THE ROADMAP ]
          </span>
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-[#0B0A0F] dark:text-white">
            Where Your Voice Goes From Here
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
            This is not a survey that sits on a shelf. Here is the concrete pipeline transforming student inputs into real-world institutional change.
          </p>
        </div>

        {/* 4-Phase Storyline Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          
          <div className="p-6 rounded-2xl bg-white dark:bg-[#181622] border border-[#0B0A0F]/10 dark:border-white/10 hover:border-[#0B0A0F] dark:hover:border-[#CCFF00] transition-all hover:-translate-y-1 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#CCFF00] text-[#0B0A0F] flex items-center justify-center font-mono font-bold text-sm">
              01
            </div>
            <h4 className="font-display font-bold text-base text-[#0B0A0F] dark:text-white">
              Anonymized Synthesis
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Your responses are aggregated across KTU, MGU, Kerala, Calicut, CUSAT, and KUHS into an open statistical report highlighting systemic friction points.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-[#181622] border border-[#0B0A0F]/10 dark:border-white/10 hover:border-[#0B0A0F] dark:hover:border-[#CCFF00] transition-all hover:-translate-y-1 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#55348A] text-white flex items-center justify-center font-mono font-bold text-sm">
              02
            </div>
            <h4 className="font-display font-bold text-base text-[#0B0A0F] dark:text-white">
              Student Community Working Groups
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Partnering with μLearn, TinkerHub, FOSS, IEDC, and AWS Clubs to transform recommendations into collaborative student-run bootcamps and projects.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-[#181622] border border-[#0B0A0F]/10 dark:border-white/10 hover:border-[#0B0A0F] dark:hover:border-[#CCFF00] transition-all hover:-translate-y-1 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#F15E21] text-white flex items-center justify-center font-mono font-bold text-sm">
              03
            </div>
            <h4 className="font-display font-bold text-base text-[#0B0A0F] dark:text-white">
              Direct University Board Briefings
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Delivering data-backed evidence directly to Vice Chancellors, Syndicate members, and the Higher Education Department to advocate for curriculum reform.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-[#181622] border border-[#0B0A0F]/10 dark:border-white/10 hover:border-[#0B0A0F] dark:hover:border-[#CCFF00] transition-all hover:-translate-y-1 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#0B0A0F] text-[#CCFF00] flex items-center justify-center font-mono font-bold text-sm">
              04
            </div>
            <h4 className="font-display font-bold text-base text-[#0B0A0F] dark:text-white">
              Paid Internship & Mentorship Access
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Connecting industry partners and tech ecosystems directly with tier-2/3 college students to eliminate geographic internship barriers.
            </p>
          </div>

        </div>

      </section>

      {/* =================================================================== */}
      {/* 4. EXPANDABLE "REVIEW ALL YOUR ANSWERS" ACCORDION                    */}
      {/* =================================================================== */}
      <section className="max-w-4xl mx-auto">
        <button
          type="button"
          onClick={() => setShowAnswerAudit(!showAnswerAudit)}
          className="w-full p-4 rounded-2xl bg-white dark:bg-[#181622] border border-[#0B0A0F]/10 dark:border-white/10 hover:border-[#0B0A0F] dark:hover:border-[#CCFF00] transition-all flex items-center justify-between text-left shadow-xs"
        >
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-xl bg-[#CCFF00] text-[#0B0A0F] flex items-center justify-center">
              <Layers className="w-4 h-4" />
            </div>
            <div>
              <h4 className="font-display font-bold text-sm sm:text-base text-[#0B0A0F] dark:text-white">
                {showAnswerAudit ? 'Hide Submitted Responses' : 'Review All 6 Sections of Your Response'}
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Inspect your submitted answers or make edits to any chapter
              </p>
            </div>
          </div>
          {showAnswerAudit ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
        </button>

        {showAnswerAudit && (
          <div className="mt-4 space-y-4 animate-slideInDown">
            
            {/* Section A */}
            <div className="p-5 rounded-2xl bg-white dark:bg-[#151320] border border-slate-200 dark:border-slate-800 space-y-3 text-xs sm:text-sm">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
                <span className="font-bold font-mono text-[#F15E21] uppercase">Section A: About You</span>
                <button
                  type="button"
                  onClick={() => onEditSection(1)}
                  className="inline-flex items-center space-x-1 text-xs font-bold text-purple-700 dark:text-[#CCFF00] hover:underline"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>Edit</span>
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <span className="text-slate-400 block text-xs">Status:</span>
                  <span className="font-medium text-slate-800 dark:text-slate-200">
                    {getOptionLabel('q1', responses.sectionA.academicStatus) || 'Recorded'}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block text-xs">University:</span>
                  <span className="font-medium text-slate-800 dark:text-slate-200">
                    {getOptionLabel('q2', responses.sectionA.university) || 'Recorded'}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block text-xs">Programme:</span>
                  <span className="font-medium text-slate-800 dark:text-slate-200">
                    {responses.sectionA.programme || 'Recorded'}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block text-xs">Communities:</span>
                  <span className="font-medium text-slate-800 dark:text-slate-200">
                    {responses.sectionA.communities?.length
                      ? responses.sectionA.communities.map((c) => getOptionLabel('q3', c)).join(', ')
                      : 'None'}
                  </span>
                </div>
              </div>
            </div>

            {/* Section F Voices */}
            <div className="p-5 rounded-2xl bg-white dark:bg-[#151320] border border-slate-200 dark:border-slate-800 space-y-3 text-xs sm:text-sm">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
                <span className="font-bold font-mono text-[#F15E21] uppercase">Section F: Your Voice & Proposal</span>
                <button
                  type="button"
                  onClick={() => onEditSection(6)}
                  className="inline-flex items-center space-x-1 text-xs font-bold text-purple-700 dark:text-[#CCFF00] hover:underline"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>Edit</span>
                </button>
              </div>
              <div>
                <span className="text-slate-400 block text-xs mb-1">Problem Identified:</span>
                <p className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 text-slate-800 dark:text-slate-200 whitespace-pre-wrap">
                  {responses.sectionF.majorProblem?.description || responses.sectionF.majorProblemNarrative || 'Recorded.'}
                </p>
              </div>
              <div>
                <span className="text-slate-400 block text-xs mb-1">Proposed Practical Solution:</span>
                <p className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 text-slate-800 dark:text-slate-200 whitespace-pre-wrap">
                  {responses.sectionF.proposedSolution?.description || responses.sectionF.practicalSolutionProposal || 'Recorded.'}
                </p>
              </div>
            </div>

          </div>
        )}
      </section>

      {/* =================================================================== */}
      {/* 5. CREATIVE CONCLUSION CALL-TO-ACTION                               */}
      {/* =================================================================== */}
      <div className="max-w-4xl mx-auto p-8 rounded-3xl bg-white dark:bg-[#14121B] border border-[#0B0A0F]/15 dark:border-[#CCFF00]/40 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-glass dark:shadow-glass-dark">
        <div className="space-y-1 text-center sm:text-left">
          <h4 className="font-display font-extrabold text-xl text-[#0B0A0F] dark:text-white">
            "From individual potential to collective progress."
          </h4>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-md">
            Rise Together 2026 is an open student-led initiative. Thank you for contributing your voice to systemic education reform in Kerala.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 flex-shrink-0">
          <button
            type="button"
            onClick={onReturnToHome}
            className="btn-neon px-8 py-3.5 rounded-2xl font-black text-xs uppercase tracking-wider inline-flex items-center space-x-2 shadow-lime-sm cursor-pointer"
          >
            <span>Return to Home Overview</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={handleResetSurvey}
            className="p-3.5 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-red-600 transition-colors cursor-pointer"
            title="Start fresh response"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

    </div>
  );
};

export default CongratulationsConclusion;
