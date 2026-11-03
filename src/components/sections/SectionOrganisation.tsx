import React, { useState } from 'react';
import { ORGANISATION_SURVEY_QUESTIONS, OrgQuestion } from '../../data/organisationSurvey';
import { Check, ArrowRight, Sparkles } from 'lucide-react';

export const SectionOrganisation: React.FC = () => {
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSingleSelect = (questionId: string, optionId: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: optionId }));
  };

  const handleMultiToggle = (questionId: string, optionId: string, maxSelections?: number) => {
    setAnswers((prev) => {
      const current = (prev[questionId] as string[]) || [];
      if (current.includes(optionId)) {
        return { ...prev, [questionId]: current.filter((id) => id !== optionId) };
      }
      if (maxSelections && current.length >= maxSelections) {
        return prev;
      }
      return { ...prev, [questionId]: [...current, optionId] };
    });
  };

  const handleTextChange = (questionId: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (isSubmitted) {
    return (
      <div className="p-8 sm:p-12 rounded-3xl bg-white dark:bg-[#14121F] border border-[#0B0A0F]/15 dark:border-white/10 shadow-glass text-center space-y-6 animate-popIn">
        <div className="w-16 h-16 rounded-full bg-[#CCFF00] text-[#0B0A0F] mx-auto flex items-center justify-center shadow-lime-sm">
          <Sparkles className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <span className="font-mono text-xs font-black uppercase tracking-widest text-[#0B0A0F] dark:text-[#CCFF00]">
            ORGANISATION SURVEY SUBMITTED
          </span>
          <h2 className="font-display font-black text-3xl text-[#0B0A0F] dark:text-white">
            Thank you for your industry leadership!
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 max-w-xl mx-auto leading-relaxed">
            Your responses will directly inform university-industry collaboration frameworks and talent initiatives under Beyond Syllabus & Rise Together 2026.
          </p>
        </div>
        <button
          type="button"
          onClick={() => {
            setIsSubmitted(false);
            setAnswers({});
          }}
          className="px-6 py-2.5 rounded-full border border-[#0B0A0F]/20 dark:border-white/20 text-xs font-bold hover:bg-[#CCFF00] hover:text-[#0B0A0F] transition-all cursor-pointer"
        >
          Submit Another Response
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8 animate-fadeIn">
      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#14121F] border border-[#0B0A0F]/12 dark:border-white/10 shadow-xs space-y-2">
        <div className="flex items-center space-x-2">
          <span className="font-mono text-[10px] font-black uppercase tracking-wider bg-[#CCFF00] text-[#0B0A0F] px-2.5 py-0.5 rounded-md border border-[#0B0A0F]/20">
            ORGANISATION & INDUSTRY TRACK
          </span>
          <span className="text-xs text-slate-500 font-mono">• Beyond Syllabus & Rise Together 2026</span>
        </div>
        <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-[#0B0A0F] dark:text-white">
          Organisation & Industry Stakeholder Survey
        </h2>
        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-sans">
          Understanding industry expectations, graduate capabilities, and opportunities for structured partnerships between universities, industry, government, and student communities.
        </p>
      </div>

      {/* Render Questions */}
      {ORGANISATION_SURVEY_QUESTIONS.map((q: OrgQuestion) => {
        const value = answers[q.id];

        return (
          <div
            key={q.id}
            className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#14121F] border border-[#0B0A0F]/12 dark:border-white/10 shadow-xs space-y-4"
          >
            {/* Question Header */}
            <div>
              <span className="font-mono text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest block mb-1">
                {q.section}
              </span>
              <h3 className="text-base sm:text-lg font-bold text-[#0B0A0F] dark:text-white leading-snug">
                {q.title}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 italic mt-0.5">
                {q.instruction}
              </p>
            </div>

            {/* Single Choice Options */}
            {q.type === 'single_choice' && q.options && (
              <div className="p-4 sm:p-5 rounded-2xl bg-[#FBF9F4] dark:bg-[#181622]/80 border border-[#0B0A0F]/10 dark:border-white/10">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {q.options.map((opt) => {
                    const isSelected = value === opt.id;
                    return (
                      <div
                        key={opt.id}
                        onClick={() => handleSingleSelect(q.id, opt.id)}
                        className={`p-3.5 rounded-xl border text-left cursor-pointer transition-all flex items-center justify-between gap-3 ${
                          isSelected
                            ? 'border-2 border-[#0B0A0F] dark:border-[#CCFF00] bg-white dark:bg-[#1F1C2E] shadow-sm ring-1 ring-[#0B0A0F]/15 dark:ring-[#CCFF00]/30'
                            : 'border-[#0B0A0F]/12 dark:border-white/10 bg-white dark:bg-[#14121F] hover:border-[#0B0A0F] dark:hover:border-white/40'
                        }`}
                      >
                        <span className="text-xs sm:text-sm font-medium text-[#0B0A0F] dark:text-white">
                          {opt.label}
                        </span>
                        <div
                          className={`w-4 h-4 rounded-full border-2 flex-shrink-0 flex items-center justify-center ${
                            isSelected
                              ? 'border-[#0B0A0F] dark:border-[#CCFF00] bg-[#CCFF00] dark:bg-[#0B0A0F]'
                              : 'border-slate-300 dark:border-slate-600'
                          }`}
                        >
                          {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-[#0B0A0F] dark:bg-[#CCFF00]" />}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Multi Choice Options */}
            {q.type === 'multi_choice' && q.options && (
              <div className="p-4 sm:p-5 rounded-2xl bg-[#FBF9F4] dark:bg-[#181622]/80 border border-[#0B0A0F]/10 dark:border-white/10">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {q.options.map((opt) => {
                    const isSelected = (value as string[] || []).includes(opt.id);
                    return (
                      <div
                        key={opt.id}
                        onClick={() => handleMultiToggle(q.id, opt.id, q.maxSelections)}
                        className={`p-3.5 rounded-xl border text-left cursor-pointer transition-all flex items-center justify-between gap-3 ${
                          isSelected
                            ? 'border-2 border-[#0B0A0F] dark:border-[#CCFF00] bg-white dark:bg-[#1F1C2E] shadow-sm ring-1 ring-[#0B0A0F]/15 dark:ring-[#CCFF00]/30'
                            : 'border-[#0B0A0F]/12 dark:border-white/10 bg-white dark:bg-[#14121F] hover:border-[#0B0A0F] dark:hover:border-white/40'
                        }`}
                      >
                        <span className="text-xs sm:text-sm font-medium text-[#0B0A0F] dark:text-white">
                          {opt.label}
                        </span>
                        <div
                          className={`w-4 h-4 rounded-md border flex-shrink-0 flex items-center justify-center ${
                            isSelected
                              ? 'border-[#0B0A0F] dark:border-[#CCFF00] bg-[#0B0A0F] dark:bg-[#CCFF00] text-[#CCFF00] dark:text-[#0B0A0F]'
                              : 'border-slate-300 dark:border-slate-600'
                          }`}
                        >
                          {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Open-Ended Textarea */}
            {q.type === 'open_text' && (
              <div className="p-4 sm:p-5 rounded-2xl bg-[#FBF9F4] dark:bg-[#181622]/80 border border-[#0B0A0F]/10 dark:border-white/10">
                <textarea
                  rows={4}
                  value={value || ''}
                  onChange={(e) => handleTextChange(q.id, e.target.value)}
                  placeholder="Share your detailed response and practical proposals..."
                  className="w-full p-3.5 rounded-xl border border-[#0B0A0F]/15 dark:border-white/15 bg-white dark:bg-[#14121F] text-xs sm:text-sm text-[#0B0A0F] dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#CCFF00]"
                />
              </div>
            )}
          </div>
        );
      })}

      {/* Submit Action */}
      <div className="pt-4 flex justify-end">
        <button
          type="submit"
          className="px-8 py-3.5 rounded-full font-bold text-sm bg-[#0B0A0F] dark:bg-[#CCFF00] text-white dark:text-[#0B0A0F] hover:bg-[#CCFF00] hover:text-[#0B0A0F] shadow-midnight-sm transition-all flex items-center space-x-2 cursor-pointer"
        >
          <span>Submit Organisation Survey</span>
          <ArrowRight className="w-4 h-4 ml-1" />
        </button>
      </div>
    </form>
  );
};

export default SectionOrganisation;
