/**
 * Kerala Student Experience & Higher Education Transformation Survey
 * Initiative: Beyond Syllabus & Rise Together 2026
 *
 * File: src/components/submission/ReviewAudit.tsx
 * Description: Pre-submission structured audit screen. Allows students to verify
 * all responses, view missing answer alerts, jump back to any section, download
 * personal data backups, and execute final submission.
 */

import React, { useState } from 'react';
import { 
  ClipboardCheck, 
  Edit3, 
  AlertTriangle, 
  Download, 
  ArrowLeft, 
  Sparkles,
  FileText,
  User,
  BookOpen,
  Briefcase,
  Users,
  Building2,
} from 'lucide-react';
import { useSurveyStore } from '../../store/surveyStore';
import { SURVEY_QUESTIONS, LIKERT_SCALE_GENERAL, LIKERT_SCALE_INTERNSHIP } from '../../data/surveyContent';
import { exportToJson, exportToCsv, submitSurveyToApi } from '../../utils/export';
import { SuccessModal } from './SuccessModal';

export interface ReviewAuditProps {
  onBackToSurvey?: () => void;
}

export const ReviewAudit: React.FC<ReviewAuditProps> = ({ onBackToSurvey }) => {
  const store = useSurveyStore();
  const { responses, goToStep, validateAllSections, setSubmittedState } = store;
  
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);
  const [submissionReceipt, setSubmissionReceipt] = useState<{ id: string; time: string } | null>(null);

  // Validate entire survey to detect any missing fields
  const validationSummary = validateAllSections();
  const hasErrors = !validationSummary.isValid;

  // Helper to resolve readable option label
  const getOptionLabel = (questionId: string, optionId: string): string => {
    const qDef = (SURVEY_QUESTIONS as any)[questionId];
    if (!qDef) return optionId;

    if (qDef.options) {
      const found = qDef.options.find((o: any) => o.id === optionId);
      if (found) return found.label;
    }

    if (qDef.subQuestions) {
      for (const sub of qDef.subQuestions) {
        if (sub.options) {
          const found = sub.options.find((o: any) => o.id === optionId);
          if (found) return found.label;
        }
      }
    }

    return optionId;
  };

  // Helper to resolve Likert rating label
  const getLikertLabel = (val: string, scale: typeof LIKERT_SCALE_GENERAL = LIKERT_SCALE_GENERAL): string => {
    const match = scale.find((s) => s.value === val);
    return match ? match.shortLabel : val;
  };

  // Handle final submission
  const handleSubmit = async () => {
    if (hasErrors) {
      alert('Please complete all required questions before final submission. Review the flagged sections below.');
      return;
    }

    setIsSubmitting(true);
    try {
      const result = await submitSurveyToApi(responses);
      if (result.success) {
        const time = new Date().toLocaleString();
        setSubmissionReceipt({ id: result.id, time });
        setSubmittedState(result.id);
        setShowSuccessModal(true);
      }
    } catch (err) {
      alert('Submission failed due to a network glitch. Please try again or download your JSON backup.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn" data-testid="review-audit-screen">
      
      {/* 1. Audit Header & Status Banner */}
      <div className="bg-gradient-to-r from-purple-900/10 via-indigo-900/10 to-orange-500/10 dark:from-purple-950/40 dark:to-orange-950/20 border border-purple-200 dark:border-purple-900/40 rounded-2xl p-6 sm:p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-purple-100 dark:bg-purple-950 text-purple-800 dark:text-purple-300 mb-2">
              <ClipboardCheck className="w-3.5 h-3.5" />
              <span>Pre-Submission Audit</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
              Verify Your Survey Responses
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-2xl">
              Please review your recorded answers across all six sections before submitting. You can click <strong>Edit Section</strong> on any card to update your responses.
            </p>
          </div>

          {/* Quick Export Backups */}
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              type="button"
              onClick={() => exportToJson(responses)}
              data-testid="download-json-btn"
              className="inline-flex items-center space-x-1.5 px-3.5 py-2 text-xs font-semibold rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#151320] text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition shadow-xs"
              title="Download client-side JSON backup"
            >
              <Download className="w-3.5 h-3.5 text-purple-600" />
              <span>Download JSON</span>
            </button>
            <button
              type="button"
              onClick={() => exportToCsv(responses)}
              data-testid="download-csv-btn"
              className="inline-flex items-center space-x-1.5 px-3.5 py-2 text-xs font-semibold rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#151320] text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition shadow-xs"
              title="Download client-side CSV backup"
            >
              <FileText className="w-3.5 h-3.5 text-orange-600" />
              <span>Download CSV</span>
            </button>
          </div>
        </div>

        {/* Global Validation Warning */}
        {hasErrors && (
          <div
            data-testid="audit-error-banner"
            className="mt-5 p-4 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-800/60 flex items-start space-x-3 text-amber-800 dark:text-amber-300"
          >
            <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5 text-amber-600 dark:text-amber-400" />
            <div className="text-xs sm:text-sm">
              <span className="font-bold">Incomplete Survey: </span>
              There are {validationSummary.totalErrors} unanswered required fields. Please edit the highlighted sections before submitting.
            </div>
          </div>
        )}
      </div>

      {/* 2. Structured Section Summaries */}
      <div className="space-y-6">

        {/* SECTION A SUMMARY */}
        <div data-testid="review-section-a" className="border border-slate-200 dark:border-purple-900/30 rounded-2xl bg-white dark:bg-[#151320] p-6 shadow-xs transition-all duration-200 hover:-translate-y-1 hover:border-purple-300 dark:hover:border-purple-800 animate-fadeInUp stagger-1">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-xl bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300">
                <User className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-bold text-[#F15E21] dark:text-[#FF7A45] uppercase">Section A</span>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">About You</h3>
              </div>
            </div>
            <button
              type="button"
              onClick={() => goToStep(1)}
              data-testid="edit-section-a-btn"
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg text-purple-700 dark:text-purple-300 bg-purple-50 dark:bg-purple-950/60 hover:bg-purple-100 dark:hover:bg-purple-900/50 transition"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Edit Section</span>
            </button>
          </div>

          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
            <div>
              <span className="text-slate-500 dark:text-slate-400 font-medium block">Academic Status</span>
              <span className="font-semibold text-slate-900 dark:text-slate-100">
                {getOptionLabel('q1', responses.sectionA.academicStatus) || <span className="text-red-500">Missing</span>}
                {responses.sectionA.academicStatusOther && ` (${responses.sectionA.academicStatusOther})`}
              </span>
            </div>
            <div>
              <span className="text-slate-500 dark:text-slate-400 font-medium block">University / Institution</span>
              <span className="font-semibold text-slate-900 dark:text-slate-100">
                {getOptionLabel('q2', responses.sectionA.university) || <span className="text-red-500">Missing</span>}
                {responses.sectionA.universityOther && ` (${responses.sectionA.universityOther})`}
              </span>
            </div>
            <div>
              <span className="text-slate-500 dark:text-slate-400 font-medium block">College Name</span>
              <span className="font-semibold text-slate-900 dark:text-slate-100">
                {responses.sectionA.college || <span className="text-slate-400 italic">Not specified (Optional)</span>}
              </span>
            </div>
            <div>
              <span className="text-slate-500 dark:text-slate-400 font-medium block">Programme / Field</span>
              <span className="font-semibold text-slate-900 dark:text-slate-100">
                {responses.sectionA.programme || <span className="text-red-500">Missing</span>}
              </span>
            </div>
            <div className="sm:col-span-2">
              <span className="text-slate-500 dark:text-slate-400 font-medium block mb-1">Student Communities</span>
              <div className="flex flex-wrap gap-1.5">
                {responses.sectionA.communities?.length > 0 ? (
                  responses.sectionA.communities.map((c) => (
                    <span key={c} className="px-2.5 py-1 rounded-md text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200">
                      {getOptionLabel('q3', c)}
                      {c === 'other' && responses.sectionA.communitiesOther ? ` (${responses.sectionA.communitiesOther})` : ''}
                    </span>
                  ))
                ) : (
                  <span className="text-red-500">Missing community selection</span>
                )}
              </div>
            </div>
            <div>
              <span className="text-slate-500 dark:text-slate-400 font-medium block">Involvement Level</span>
              <span className="font-semibold text-slate-900 dark:text-slate-100">
                {responses.sectionA.involvementLevel ? (
                  Array.isArray(responses.sectionA.involvementLevel) ? (
                    responses.sectionA.involvementLevel.length > 0 ? (
                      responses.sectionA.involvementLevel.map((id) => getOptionLabel('q3', id)).join(', ')
                    ) : (
                      <span className="text-red-500">Missing</span>
                    )
                  ) : (
                    getOptionLabel('q3', responses.sectionA.involvementLevel)
                  )
                ) : (
                  <span className="text-red-500">Missing</span>
                )}
              </span>
            </div>

            {responses.sectionA.isDifferentlyAbled && (
              <div>
                <span className="text-slate-500 dark:text-slate-400 font-medium block">Differently-Abled Status</span>
                <span className="font-semibold text-slate-900 dark:text-slate-100">
                  {responses.sectionA.isDifferentlyAbled === 'yes'
                    ? 'Yes'
                    : responses.sectionA.isDifferentlyAbled === 'no'
                    ? 'No'
                    : 'Prefer not to say'}
                </span>
              </div>
            )}

            {responses.sectionA.isEntrepreneur && (
              <div>
                <span className="text-slate-500 dark:text-slate-400 font-medium block">Entrepreneur / Business Status</span>
                <span className="font-semibold text-slate-900 dark:text-slate-100">
                  {responses.sectionA.isEntrepreneur === 'yes_founder'
                    ? 'Founder / Business Owner'
                    : responses.sectionA.isEntrepreneur === 'yes_part_of_venture'
                    ? 'Part of a Startup / Venture'
                    : 'No'}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* SECTION B SUMMARY */}
        <div data-testid="review-section-b" className="border border-slate-200 dark:border-purple-900/30 rounded-2xl bg-white dark:bg-[#151320] p-6 shadow-xs transition-all duration-200 hover:-translate-y-1 hover:border-purple-300 dark:hover:border-purple-800 animate-fadeInUp stagger-2">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-xl bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300">
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-bold text-[#F15E21] dark:text-[#FF7A45] uppercase">Section B</span>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Academic Experience & Learning</h3>
              </div>
            </div>
            <button
              type="button"
              onClick={() => goToStep(2)}
              data-testid="edit-section-b-btn"
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg text-purple-700 dark:text-purple-300 bg-purple-50 dark:bg-purple-950/60 hover:bg-purple-100 dark:hover:bg-purple-900/50 transition"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Edit Section</span>
            </button>
          </div>

          <div className="mt-4 space-y-4 text-xs sm:text-sm">
            <div>
              <span className="text-slate-500 dark:text-slate-400 font-medium block mb-1">Overall Experience Aspects (Max 3)</span>
              <div className="flex flex-wrap gap-1.5">
                {responses.sectionB.overallExperience?.length > 0 ? (
                  responses.sectionB.overallExperience.map((item) => (
                    <span key={item} className="px-2.5 py-1 rounded-md text-xs font-medium bg-purple-50 dark:bg-purple-950/60 text-purple-900 dark:text-purple-200 border border-purple-200 dark:border-purple-800">
                      {getOptionLabel('q4', item)}
                      {item === 'other' && responses.sectionB.overallExperienceOther ? ` (${responses.sectionB.overallExperienceOther})` : ''}
                    </span>
                  ))
                ) : (
                  <span className="text-red-500">Missing selections</span>
                )}
              </div>
            </div>

            <div>
              <span className="text-slate-500 dark:text-slate-400 font-medium block mb-2">Learning Experience Matrix Ratings (1-5 / NA)</span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {Object.entries(responses.sectionB.ratings || {}).map(([key, val]) => (
                  <div key={key} className="flex items-center justify-between p-2 rounded-lg bg-slate-50 dark:bg-slate-800/60">
                    <span className="text-slate-600 dark:text-slate-300 truncate pr-2">Statement {key.charAt(0)}</span>
                    <span className="font-bold px-2 py-0.5 rounded bg-white dark:bg-slate-700 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-600">
                      {getLikertLabel(val)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* SECTION C SUMMARY */}
        <div data-testid="review-section-c" className="border border-slate-200 dark:border-purple-900/30 rounded-2xl bg-white dark:bg-[#151320] p-6 shadow-xs transition-all duration-200 hover:-translate-y-1 hover:border-purple-300 dark:hover:border-purple-800 animate-fadeInUp stagger-3">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-xl bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300">
                <Briefcase className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-bold text-[#F15E21] dark:text-[#FF7A45] uppercase">Section C</span>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Internships & Career Readiness</h3>
              </div>
            </div>
            <button
              type="button"
              onClick={() => goToStep(3)}
              data-testid="edit-section-c-btn"
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg text-purple-700 dark:text-purple-300 bg-purple-50 dark:bg-purple-950/60 hover:bg-purple-100 dark:hover:bg-purple-900/50 transition"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Edit Section</span>
            </button>
          </div>

          <div className="mt-4 space-y-4 text-xs sm:text-sm">
            <div>
              <span className="text-slate-500 dark:text-slate-400 font-medium block">Internship Status</span>
              <span className="font-semibold text-slate-900 dark:text-slate-100">
                {getOptionLabel('q6', responses.sectionC.internshipStatus) || <span className="text-red-500">Missing</span>}
              </span>
            </div>

            {/* Quality Matrix (Only if undertaken) */}
            {['completed', 'current', 'both'].includes(responses.sectionC.internshipStatus) ? (
              <div>
                <span className="text-slate-500 dark:text-slate-400 font-medium block mb-2">Internship Quality Ratings</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {responses.sectionC.qualityRatings && Object.entries(responses.sectionC.qualityRatings).map(([key, val]) => (
                    <div key={key} className="flex items-center justify-between p-2 rounded-lg bg-slate-50 dark:bg-slate-800/60">
                      <span className="text-slate-600 dark:text-slate-300 truncate pr-2">Internship Criterion {key.charAt(0)}</span>
                      <span className="font-bold px-2 py-0.5 rounded bg-white dark:bg-slate-700 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-600">
                        {getLikertLabel(val, LIKERT_SCALE_INTERNSHIP)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/40 text-xs text-slate-500 dark:text-slate-400 italic">
                Quality Evaluation Matrix skipped (no internship experience).
              </div>
            )}

            <div>
              <span className="text-slate-500 dark:text-slate-400 font-medium block mb-1">Key Barriers Faced (Max 3)</span>
              <div className="flex flex-wrap gap-1.5">
                {responses.sectionC.barriers?.length > 0 ? (
                  responses.sectionC.barriers.map((b) => (
                    <span key={b} className="px-2.5 py-1 rounded-md text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200">
                      {getOptionLabel('q8', b)}
                      {b === 'other' && responses.sectionC.barriersOther ? ` (${responses.sectionC.barriersOther})` : ''}
                    </span>
                  ))
                ) : (
                  <span className="text-red-500">Missing barriers</span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* SECTION D SUMMARY */}
        <div data-testid="review-section-d" className="border border-slate-200 dark:border-purple-900/30 rounded-2xl bg-white dark:bg-[#151320] p-6 shadow-xs transition-all duration-200 hover:-translate-y-1 hover:border-purple-300 dark:hover:border-purple-800 animate-fadeInUp stagger-4">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-xl bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-bold text-[#F15E21] dark:text-[#FF7A45] uppercase">Section D</span>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Student Communities</h3>
              </div>
            </div>
            <button
              type="button"
              onClick={() => goToStep(4)}
              data-testid="edit-section-d-btn"
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg text-purple-700 dark:text-purple-300 bg-purple-50 dark:bg-purple-950/60 hover:bg-purple-100 dark:hover:bg-purple-900/50 transition"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Edit Section</span>
            </button>
          </div>

          <div className="mt-4 space-y-4 text-xs sm:text-sm">
            <div>
              <span className="text-slate-500 dark:text-slate-400 font-medium block mb-1">Value Gained (Max 3)</span>
              <div className="flex flex-wrap gap-1.5">
                {responses.sectionD.valueGained?.map((v) => (
                  <span key={v} className="px-2.5 py-1 rounded-md text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200">
                    {getOptionLabel('q9', v)}
                    {v === 'other' && responses.sectionD.valueGainedOther ? ` (${responses.sectionD.valueGainedOther})` : ''}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <span className="text-slate-500 dark:text-slate-400 font-medium block mb-1">Challenges in Communities (Max 3)</span>
              <div className="flex flex-wrap gap-1.5">
                {responses.sectionD.challengesFaced?.map((ch) => (
                  <span key={ch} className="px-2.5 py-1 rounded-md text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200">
                    {getOptionLabel('q10', ch)}
                    {ch === 'other' && responses.sectionD.challengesFacedOther ? ` (${responses.sectionD.challengesFacedOther})` : ''}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* SECTION E SUMMARY */}
        <div data-testid="review-section-e" className="border border-slate-200 dark:border-purple-900/30 rounded-2xl bg-white dark:bg-[#151320] p-6 shadow-xs transition-all duration-200 hover:-translate-y-1 hover:border-purple-300 dark:hover:border-purple-800 animate-fadeInUp stagger-5">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-xl bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300">
                <Building2 className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-bold text-[#F15E21] dark:text-[#FF7A45] uppercase">Section E</span>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Institutional Challenges & Opportunities</h3>
              </div>
            </div>
            <button
              type="button"
              onClick={() => goToStep(5)}
              data-testid="edit-section-e-btn"
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg text-purple-700 dark:text-purple-300 bg-purple-50 dark:bg-purple-950/60 hover:bg-purple-100 dark:hover:bg-purple-900/50 transition"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Edit Section</span>
            </button>
          </div>

          <div className="mt-4 space-y-4 text-xs sm:text-sm">
            <div>
              <span className="text-slate-500 dark:text-slate-400 font-medium block mb-1">Lived Campus Challenges (Max 3)</span>
              <div className="flex flex-wrap gap-1.5">
                {responses.sectionE.experiencedChallenges?.map((ec) => (
                  <span key={ec} className="px-2.5 py-1 rounded-md text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200">
                    {getOptionLabel('q11', ec)}
                    {ec === 'other' && responses.sectionE.experiencedChallengesOther ? ` (${responses.sectionE.experiencedChallengesOther})` : ''}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <span className="text-slate-500 dark:text-slate-400 font-medium block mb-1">Priority Transformations (Max 3)</span>
              <div className="flex flex-wrap gap-1.5">
                {responses.sectionE.improvements?.map((imp) => (
                  <span key={imp} className="px-2.5 py-1 rounded-md text-xs font-medium bg-orange-50 dark:bg-orange-950/40 text-orange-900 dark:text-orange-200 border border-orange-200 dark:border-orange-900">
                    {getOptionLabel('q12', imp)}
                    {imp === 'other' && responses.sectionE.improvementsOther ? ` (${responses.sectionE.improvementsOther})` : ''}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* SECTION F SUMMARY */}
        <div data-testid="review-section-f" className="border border-slate-200 dark:border-purple-900/30 rounded-2xl bg-white dark:bg-[#151320] p-6 shadow-xs transition-all duration-200 hover:-translate-y-1 hover:border-purple-300 dark:hover:border-purple-800 animate-fadeInUp stagger-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-xl bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-bold text-[#F15E21] dark:text-[#FF7A45] uppercase">Section F</span>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Student Voices & Solutions</h3>
              </div>
            </div>
            <button
              type="button"
              onClick={() => goToStep(6)}
              data-testid="edit-section-f-btn"
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg text-purple-700 dark:text-purple-300 bg-purple-50 dark:bg-purple-950/60 hover:bg-purple-100 dark:hover:bg-purple-900/50 transition"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Edit Section</span>
            </button>
          </div>

          <div className="mt-4 space-y-4 text-xs sm:text-sm">
            <div>
              <span className="text-slate-500 dark:text-slate-400 font-medium block mb-1">Major Problem Experienced</span>
              <p className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 text-slate-800 dark:text-slate-200 whitespace-pre-wrap">
                {responses.sectionF.majorProblem?.description || responses.sectionF.majorProblemNarrative || <span className="text-red-500">Missing response</span>}
              </p>
            </div>
            <div>
              <span className="text-slate-500 dark:text-slate-400 font-medium block mb-1">Proposed Practical Change</span>
              <p className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 text-slate-800 dark:text-slate-200 whitespace-pre-wrap">
                {responses.sectionF.proposedSolution?.description || responses.sectionF.practicalSolutionProposal || <span className="text-red-500">Missing response</span>}
              </p>
            </div>
            <div>
              <span className="text-slate-500 dark:text-slate-400 font-medium block mb-1">Collaboration Interest</span>
              <span className="font-semibold text-slate-900 dark:text-white">
                {getOptionLabel('q15', responses.sectionF.initiativeInterest || responses.sectionF.collaborativeReadiness || '') || <span className="text-red-500">Missing</span>}
              </span>
            </div>
          </div>
        </div>

      </div>

      {/* 3. Bottom Pre-Submission Action Controls */}
      <div className="pt-6 border-t border-slate-200 dark:border-purple-900/30 flex flex-col sm:flex-row items-center justify-between gap-4">
        <button
          type="button"
          onClick={() => (onBackToSurvey ? onBackToSurvey() : goToStep(6))}
          data-testid="back-to-survey-btn"
          className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#151320] text-slate-700 dark:text-slate-300 font-semibold text-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Section F</span>
        </button>

        <button
          type="button"
          onClick={handleSubmit}
          disabled={isSubmitting || hasErrors}
          data-testid="confirm-submit-btn"
          className={`w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-9 py-3.5 rounded-2xl font-black text-sm uppercase tracking-wider transition-all focus:outline-none ${
            hasErrors || isSubmitting
              ? 'bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-600 cursor-not-allowed shadow-none'
              : 'btn-neon shadow-lime-sm'
          }`}
        >
          {isSubmitting ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>Submitting Responses...</span>
            </>
          ) : (
            <>
              <ClipboardCheck className="w-5 h-5" />
              <span>Confirm & Submit Survey</span>
            </>
          )}
        </button>
      </div>

      {/* 4. Post-Submission Success Modal */}
      {showSuccessModal && submissionReceipt && (
        <SuccessModal
          submissionId={submissionReceipt.id}
          submittedAt={submissionReceipt.time}
          responses={responses}
          onClose={() => setShowSuccessModal(false)}
        />
      )}

    </div>
  );
};

export default ReviewAudit;
