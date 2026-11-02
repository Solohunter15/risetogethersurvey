import React, { useState } from 'react';
import { 
  ChevronDown, 
  ChevronUp, 
  Sparkles, 
  CheckCircle2, 
  Info, 
  ShieldCheck, 
  ArrowRight,
  HelpCircle
} from 'lucide-react';

interface HeroProps {
  onStartSurvey?: () => void;
  isCompactInitially?: boolean;
}

export const Hero: React.FC<HeroProps> = ({ 
  onStartSurvey,
  isCompactInitially = false 
}) => {
  const [isExpanded, setIsExpanded] = useState(!isCompactInitially);

  const coreQuestions = [
    "What is working in higher education?",
    "What challenges are students facing?",
    "Are students getting sufficient practical learning and industry exposure?",
    "Are universities and student communities providing the support they need?",
    "What opportunities are students missing?",
    "What solutions can students and stakeholders build together?",
  ];

  const surveyInstructions = [
    "Answer based on your actual experiences.",
    "There are no right or wrong answers.",
    "Select the specified number of options for each question (adhere to max limits).",
    "Some questions allow multiple selections.",
    "Answer internship-related questions only if applicable.",
    "Open-ended questions are an opportunity to explain problems and propose solutions.",
    "Please do not share sensitive personal information.",
  ];

  return (
    <section className="relative overflow-hidden mb-8 rounded-3xl bg-gradient-to-b from-purple-50/70 via-white to-orange-50/40 dark:from-purple-950/20 dark:via-[#151320] dark:to-orange-950/10 border border-purple-100 dark:border-purple-900/30 p-6 sm:p-8 md:p-10 shadow-sm transition-all duration-300">
      
      {/* Background Decorative Starburst Blobs */}
      <div className="absolute -top-24 -right-24 w-72 h-72 bg-purple-500/10 dark:bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-orange-500/10 dark:bg-orange-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto">
        
        {/* Initiative Badge & Toggle */}
        <div className="flex items-center justify-between mb-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Beyond Syllabus & Rise Together 2026</span>
          </div>

          <button
            onClick={() => setIsExpanded(!isExpanded)}
            type="button"
            className="inline-flex items-center space-x-1.5 text-xs font-medium text-slate-500 hover:text-purple-700 dark:text-slate-400 dark:hover:text-purple-300 focus:outline-none transition-colors"
          >
            <span>{isExpanded ? 'Hide survey context' : 'Show survey context & instructions'}</span>
            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>

        {/* Survey Main Title & Subtitle */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight mb-3">
          Kerala Student Experience & Higher Education Transformation Survey
        </h1>
        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 font-medium mb-6">
          Understanding the challenges, opportunities and future of student learning in Kerala.
        </p>

        {/* Collapsible Content Section */}
        {isExpanded && (
          <div className="space-y-6 pt-2 border-t border-purple-100 dark:border-purple-900/20 transition-all duration-300">
            
            {/* Objective Narrative */}
            <div className="space-y-3 text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed">
              <p>
                Education should prepare students not only to succeed in examinations but also to think critically, solve real-world problems, develop practical skills, collaborate with others and contribute meaningfully to society.
              </p>
              <p>
                However, students experience different challenges across academic institutions, internships, student communities, industry interactions and career opportunities.
              </p>
              <p>
                This survey aims to understand the overall student experience in Kerala, identify gaps between academic education and real-world learning, evaluate the role of student-supported communities, and understand what changes students believe are necessary.
              </p>
            </div>

            {/* 6 Core Inquiries Grid */}
            <div>
              <h2 className="text-sm font-bold uppercase tracking-wider text-purple-900 dark:text-purple-300 mb-3 flex items-center space-x-2">
                <HelpCircle className="w-4 h-4 text-[#F15E21]" />
                <span>We want to hear directly from students:</span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                {coreQuestions.map((question, idx) => (
                  <div
                    key={idx}
                    className="flex items-start space-x-2.5 p-3 rounded-xl bg-white/80 dark:bg-[#1A1726]/80 border border-slate-200/80 dark:border-purple-900/30 shadow-xs"
                  >
                    <span className="flex-shrink-0 w-5 h-5 rounded-full bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 font-bold text-xs flex items-center justify-center mt-0.5">
                      {idx + 1}
                    </span>
                    <span className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-medium">
                      {question}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Stakeholder Impact Note */}
            <div className="p-4 rounded-xl bg-orange-50/80 dark:bg-orange-950/20 border border-orange-200/80 dark:border-orange-900/40 text-xs sm:text-sm text-orange-900 dark:text-orange-200">
              <p>
                Your responses will contribute to discussions involving students, universities, industry, government and communities through <strong className="font-bold">Beyond Syllabus and Rise Together 2026</strong>.
              </p>
            </div>

            {/* Instructions & Confidentiality Box */}
            <div className="p-4 sm:p-5 rounded-2xl bg-white/90 dark:bg-[#151320] border border-slate-200 dark:border-slate-800">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200 mb-2.5 flex items-center space-x-2">
                <Info className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                <span>Instructions for Respondents</span>
              </h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600 dark:text-slate-400">
                {surveyInstructions.map((instruction, idx) => (
                  <li key={idx} className="flex items-start space-x-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span>{instruction}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-3.5 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center space-x-2 text-xs text-slate-500 dark:text-slate-400 font-medium">
                <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
                <span>Confidential survey. No personal identification documents or sensitive personal data are collected.</span>
              </div>
            </div>

            {/* CTA Button */}
            {onStartSurvey && (
              <div className="pt-2 flex justify-center sm:justify-start">
                <button
                  type="button"
                  onClick={onStartSurvey}
                  className="inline-flex items-center space-x-2 px-6 py-3 rounded-xl bg-[#F15E21] hover:bg-[#D94814] dark:bg-[#FF7A45] dark:hover:bg-[#F15E21] text-white font-semibold text-sm shadow-md hover:shadow-lg transition-all focus:outline-none focus:ring-2 focus:ring-[#F15E21] focus:ring-offset-2"
                >
                  <span>Start Survey</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}

          </div>
        )}

      </div>
    </section>
  );
};

