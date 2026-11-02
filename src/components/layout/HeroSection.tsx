import React, { useState } from 'react';
import { 
  ArrowRight, 
  ShieldCheck, 
  Clock, 
  Users, 
  BookOpen, 
  Briefcase, 
  Building2, 
  MessageSquare,
  CheckCircle2, 
  HelpCircle,
  Compass,
  ChevronDown,
  ChevronUp,
  Sparkles
} from 'lucide-react';

interface HeroSectionProps {
  onStartSurvey: () => void;
  onSelectSection?: (stepNumber: number) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ 
  onStartSurvey,
  onSelectSection 
}) => {
  const [showInstructions, setShowInstructions] = useState(false);
  const [hoveredInquiry, setHoveredInquiry] = useState<number | null>(null);

  const coreQuestions = [
    {
      num: '01',
      title: 'What is working in higher education?',
      desc: 'Identifying positive learning models, faculty mentors, and institutional strengths that empower students.',
    },
    {
      num: '02',
      title: 'What challenges are students facing?',
      desc: 'Addressing rigid syllabus workload, exam focus, attendance bottlenecks, and administrative hurdles.',
    },
    {
      num: '03',
      title: 'Are students getting practical learning & exposure?',
      desc: 'Evaluating access to genuine internships, industry software/equipment, real projects, and skilled mentorship.',
    },
    {
      num: '04',
      title: 'Are universities & communities providing support?',
      desc: 'Analyzing the role of student communities (IEDC, μLearn, TinkerHub, FOSS) vs campus restrictions.',
    },
    {
      num: '05',
      title: 'What opportunities are students missing?',
      desc: 'Highlighting barriers outside tier-1 cities, paid vs unpaid internships, and financial roadblocks.',
    },
    {
      num: '06',
      title: 'What solutions can students build together?',
      desc: 'Crowdsourcing student-backed interventions to present directly to universities, government, and industry.',
    },
  ];

  const sectionsList = [
    { num: '01', code: 'A', title: 'About You', desc: 'Academic status, university & student community affiliations', icon: Users, qCount: 3 },
    { num: '02', code: 'B', title: 'Academic Experience', desc: 'Theory vs practical balance, curriculum scope & faculty guidance', icon: BookOpen, qCount: 2 },
    { num: '03', code: 'C', title: 'Internships & Career', desc: 'Internship quality, access barriers & industry readiness', icon: Briefcase, qCount: 3 },
    { num: '04', code: 'D', title: 'Student Communities', desc: 'Peer learning value, hackathons & club participation bottlenecks', icon: Compass, qCount: 2 },
    { num: '05', code: 'E', title: 'Institutional Challenges', desc: 'Exams, results, labs, placements & campus support services', icon: Building2, qCount: 2 },
    { num: '06', code: 'F', title: 'Voices & Solutions', desc: 'Your lived problem narrative & actionable policy proposals', icon: MessageSquare, qCount: 3 },
  ];

  const surveyInstructions = [
    'Answer based on your actual experiences.',
    'There are no right or wrong answers.',
    'Select the specified number of options for each question (e.g., up to three).',
    'Some questions allow multiple selections.',
    'Answer internship-related questions only if applicable.',
    'Open-ended questions are an opportunity to explain problems and propose solutions.',
    'Please do not share sensitive personal information.',
  ];

  return (
    <div className="w-full space-y-16 sm:space-y-24 animate-flowIn">
      
      {/* 1. OPEN-AIR HERO STAGE (NO RESTRICTIVE BOXES OR HEAVY CONTAINERS) */}
      <section className="relative pt-6 sm:pt-10 pb-4 text-center max-w-4xl mx-auto space-y-8">
        
        {/* Soft atmospheric background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-[#CCFF00]/10 dark:bg-[#CCFF00]/5 blur-3xl pointer-events-none -z-10" />

        {/* UNCONSTRAINED, HIGH-RESOLUTION BRAND LOGO */}
        <div className="w-full flex justify-center py-2 animate-popIn">
          <img
            src="/logo-clean.png"
            alt="Rise Together 2026"
            className="h-24 sm:h-32 md:h-40 w-auto max-w-full object-contain dark:hidden drop-shadow-sm hover:scale-105 transition-transform duration-300"
          />
          <img
            src="/logo-clean-dark.png"
            alt="Rise Together 2026"
            className="h-24 sm:h-32 md:h-40 w-auto max-w-full object-contain hidden dark:block drop-shadow-[0_0_30px_rgba(204,255,0,0.25)] hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Headline & Description with Open Air */}
        <div className="space-y-4 max-w-3xl mx-auto animate-fadeInUp flow-delay-1">
          <h1 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl lg:text-[50px] leading-[1.12] text-[#0B0A0F] dark:text-white tracking-tight">
            Kerala Student Experience & Higher Education Transformation Survey
          </h1>

          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 font-medium leading-relaxed max-w-2xl mx-auto">
            Understanding the challenges, opportunities, and future of student learning across universities, internships, and communities in Kerala.
          </p>
        </div>

        {/* Fluid Objective Statement (Open Borderless Callout) */}
        <div className="max-w-2xl mx-auto text-left border-l-2 border-[#CCFF00] pl-4 sm:pl-5 py-1 text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed font-sans animate-slideInLeft flow-delay-2">
          Education should prepare students not only to succeed in examinations but also to <strong className="text-[#0B0A0F] dark:text-white">think critically, solve real-world problems, build practical skills, and contribute meaningfully to society</strong>.
        </div>

        {/* Primary Action Buttons */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4 animate-fadeInUp flow-delay-3">
          <button
            type="button"
            onClick={onStartSurvey}
            className="btn-neon w-full sm:w-auto inline-flex items-center justify-center space-x-3 px-10 py-4 rounded-2xl font-black text-sm uppercase tracking-wider focus:outline-none group shadow-lime-sm"
          >
            <span>Start Survey</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
          </button>

          <button
            type="button"
            onClick={() => setShowInstructions(!showInstructions)}
            className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-6 py-4 rounded-2xl bg-white dark:bg-[#181622] text-[#0B0A0F] dark:text-white hover:bg-[#F5F2E9] dark:hover:bg-[#201D2E] font-bold text-xs uppercase tracking-wider border border-[#0B0A0F]/15 dark:border-white/10 transition-all shadow-midnight-sm hover:-translate-y-0.5"
          >
            <HelpCircle className="w-4 h-4 text-[#F15E21]" />
            <span>{showInstructions ? 'Hide Instructions' : 'View Instructions'}</span>
            {showInstructions ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>

        {/* Telemetry Chips (Fluid Strip) */}
        <div className="flex flex-wrap items-center justify-center gap-6 pt-6 font-mono text-xs text-slate-500 dark:text-slate-400 border-t border-[#0B0A0F]/10 dark:border-white/10 max-w-2xl mx-auto animate-fadeIn flow-delay-4">
          <span className="flex items-center space-x-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#CCFF00] animate-pulse" />
            <span>6 Survey Sections</span>
          </span>
          <span className="flex items-center space-x-1.5">
            <Clock className="w-3.5 h-3.5 text-[#F15E21]" />
            <span>~5–7 Minutes</span>
          </span>
          <span className="flex items-center space-x-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-[#CCFF00]" />
            <span>100% Anonymous</span>
          </span>
        </div>

        {/* Expandable Instructions Drawer */}
        {showInstructions && (
          <div className="p-6 rounded-2xl bg-white dark:bg-[#181622] border border-[#0B0A0F]/15 dark:border-[#CCFF00]/40 text-left animate-slideInDown space-y-3 shadow-glass dark:shadow-glass-dark max-w-2xl mx-auto">
            <div className="flex items-center space-x-2 font-display font-bold text-xs uppercase tracking-wider text-[#0B0A0F] dark:text-[#CCFF00]">
              <Sparkles className="w-4 h-4 text-[#F15E21]" />
              <span>Instructions for Respondents</span>
            </div>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-slate-700 dark:text-slate-300">
              {surveyInstructions.map((instruction, idx) => (
                <li key={idx} className="flex items-start space-x-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#0B0A0F] dark:text-[#CCFF00] flex-shrink-0 mt-0.5" />
                  <span>{instruction}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

      </section>

      {/* 2. OPEN EDITORIAL INQUIRY INDEX (NOT BOXED CARDS) */}
      <section className="max-w-4xl mx-auto space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 pb-4 border-b border-[#0B0A0F]/15 dark:border-white/15">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-[#55348A] dark:text-[#CCFF00] font-bold">
              [ THE INQUIRY // DIRECT FROM STUDENTS ]
            </span>
            <h3 className="font-display font-bold text-2xl sm:text-3xl text-[#0B0A0F] dark:text-white mt-1">
              Six Questions We Bring to the Table
            </h3>
          </div>
          <span className="text-xs font-mono text-slate-500">
            Hover to explore themes
          </span>
        </div>

        {/* Open-Air Editorial List */}
        <div className="divide-y divide-[#0B0A0F]/10 dark:divide-white/10">
          {coreQuestions.map((q, idx) => {
            const isHovered = hoveredInquiry === idx;
            return (
              <div
                key={q.num}
                onMouseEnter={() => setHoveredInquiry(idx)}
                onMouseLeave={() => setHoveredInquiry(null)}
                className={`py-5 sm:py-6 transition-all duration-200 cursor-pointer flex flex-col md:flex-row md:items-baseline justify-between gap-4 px-2 sm:px-4 rounded-xl animate-fadeInUp stagger-${idx + 1} ${
                  isHovered ? 'bg-white/60 dark:bg-white/5 pl-4 sm:pl-6 shadow-xs' : ''
                }`}
              >
                <div className="flex items-baseline space-x-4">
                  <span className={`font-mono text-sm sm:text-base font-black transition-colors ${
                    isHovered ? 'text-[#0B0A0F] dark:text-[#CCFF00]' : 'text-slate-400'
                  }`}>
                    {q.num}
                  </span>
                  <h4 className="font-display font-bold text-base sm:text-lg text-[#0B0A0F] dark:text-white leading-snug">
                    {q.title}
                  </h4>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 md:max-w-md leading-relaxed pl-8 md:pl-0">
                  {q.desc}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. FLUID CHAPTER TIMELINE (ACCESSIBLE & MODERN) */}
      <section className="max-w-4xl mx-auto space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 pb-4 border-b border-[#0B0A0F]/15 dark:border-white/15">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-[#F15E21] font-bold">
              [ SURVEY TIMELINE // 6 CHAPTERS ]
            </span>
            <h3 className="font-display font-bold text-2xl sm:text-3xl text-[#0B0A0F] dark:text-white mt-1">
              Survey Structure & Jump-In
            </h3>
          </div>
          <span className="text-xs font-mono text-slate-500">
            Select any section to enter
          </span>
        </div>

        {/* Clean Open Chapter Rows */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
          {sectionsList.map((sec, idx) => {
            const Icon = sec.icon;
            return (
              <button
                key={sec.code}
                type="button"
                onClick={() => {
                  if (onSelectSection) onSelectSection(idx + 1);
                  else onStartSurvey();
                }}
                className={`p-5 rounded-2xl bg-white/70 dark:bg-[#181622]/70 hover:bg-white dark:hover:bg-[#181622] border border-[#0B0A0F]/10 dark:border-white/10 hover:border-[#0B0A0F] dark:hover:border-[#CCFF00] text-left transition-all duration-200 shadow-xs hover:shadow-midnight-sm hover:-translate-y-1 flex items-center justify-between group animate-fadeInUp stagger-${idx + 1}`}
              >
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 rounded-xl bg-[#FBF9F4] dark:bg-[#201D2E] border border-[#0B0A0F]/10 dark:border-white/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    <Icon className="w-5 h-5 text-slate-600 dark:text-slate-300 group-hover:text-[#F15E21] transition-colors" />
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="font-mono text-[10px] font-black text-[#0B0A0F] bg-[#CCFF00] px-1.5 py-0.2 rounded">
                        SEC {sec.code}
                      </span>
                      <span className="font-mono text-[10px] text-slate-400">
                        {sec.qCount} Questions
                      </span>
                    </div>
                    <h4 className="font-display font-bold text-sm sm:text-base text-[#0B0A0F] dark:text-white mt-0.5">
                      {sec.title}
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">
                      {sec.desc}
                    </p>
                  </div>
                </div>

                <div className="flex-shrink-0 pl-3">
                  <span className="font-mono text-xs font-bold text-slate-400 group-hover:text-[#0B0A0F] dark:group-hover:text-[#CCFF00] group-hover:translate-x-1 transition-all inline-block">
                    →
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* 4. LIGHT-MODE COMPLIANT CLOSING CALL TO ACTION */}
      <div className="max-w-4xl mx-auto p-8 sm:p-10 rounded-3xl bg-white dark:bg-[#14121B] text-[#0B0A0F] dark:text-[#FBF9F4] border border-[#0B0A0F]/15 dark:border-[#CCFF00]/40 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-glass dark:shadow-glass-dark animate-popIn">
        <div className="space-y-1.5 text-center sm:text-left">
          <h4 className="font-display font-extrabold text-xl sm:text-2xl text-[#0B0A0F] dark:text-white">
            Ready to shape higher education in Kerala?
          </h4>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-md">
            From identifying challenges to building solutions. From individual potential to collective progress.
          </p>
        </div>

        <button
          type="button"
          onClick={onStartSurvey}
          className="btn-neon px-9 py-4 rounded-2xl font-black text-sm uppercase tracking-wider inline-flex items-center space-x-2 flex-shrink-0 group shadow-lime-sm"
        >
          <span>Start Section A</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
        </button>
      </div>

    </div>
  );
};
