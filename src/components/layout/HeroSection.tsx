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
  Sparkles,
  Flame,
  Layers,
  HeartHandshake,
  Check,
  Award
} from 'lucide-react';
import { ScrollReveal } from '../common/ScrollReveal';

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
      title: 'What Is Working in Higher Education?',
      desc: 'Identifying positive academic experiences, effective teaching practices, supportive faculty members, accessible learning resources, and institutional initiatives that genuinely benefit students.',
    },
    {
      num: '02',
      title: 'What Challenges Are Students Facing?',
      desc: 'Understanding academic pressure, examination systems, curriculum limitations, attendance policies, administrative difficulties, financial constraints, and barriers affecting student well-being.',
    },
    {
      num: '03',
      title: 'Are Students Getting Practical Learning and Industry Exposure?',
      desc: 'Evaluating access to internships, industry projects, laboratory facilities, professional software, technical equipment, skill development programmes, and real-world learning opportunities.',
    },
    {
      num: '04',
      title: 'Are Institutions and Student Communities Providing Adequate Support?',
      desc: 'Examining the contribution of colleges, universities, polytechnics, student organisations, clubs, innovation communities, and peer-learning networks in supporting student development.',
    },
    {
      num: '05',
      title: 'What Opportunities Are Students Missing?',
      desc: 'Identifying gaps in career guidance, scholarships, internships, placements, entrepreneurship support, research opportunities, industry connections, and access to opportunities beyond major cities.',
    },
    {
      num: '06',
      title: 'What Solutions Can Students Build Together?',
      desc: 'Collecting student recommendations, innovative ideas, institutional improvements, policy suggestions, and practical interventions that can make higher education more relevant, accessible, and future-ready.',
    },
  ];

  const sectionsList = [
    { 
      num: '01', 
      code: 'A', 
      title: 'About You', 
      desc: 'Help us understand your educational background, academic status, institution, and student community. We use this information to understand the diversity of student experiences across Kerala.', 
      icon: Users, 
      qCount: 3 
    },
    { 
      num: '02', 
      code: 'B', 
      title: 'Academic Experience', 
      desc: 'Tell us about your classroom experience, teaching methods, curriculum, examinations, academic workload, and the balance between theoretical and practical learning.', 
      icon: BookOpen, 
      qCount: 2 
    },
    { 
      num: '03', 
      code: 'C', 
      title: 'Internships & Career', 
      desc: 'Share your experiences with internships, placements, industry exposure, career guidance, professional skills, and employment opportunities.', 
      icon: Briefcase, 
      qCount: 3 
    },
    { 
      num: '04', 
      code: 'D', 
      title: 'Student Communities', 
      desc: 'Explore the role of student clubs, peer-learning groups, hackathons, innovation communities, student organisations, and extracurricular activities in your development.', 
      icon: Compass, 
      qCount: 2 
    },
    { 
      num: '05', 
      code: 'E', 
      title: 'Institutional Challenges', 
      desc: 'Identify the institutional barriers affecting your education, including examinations, infrastructure, laboratories, administrative processes, placements, and campus support systems.', 
      icon: Building2, 
      qCount: 2 
    },
    { 
      num: '06', 
      code: 'F', 
      title: 'Voices & Solutions', 
      desc: 'This is where your ideas matter most. Share the problems you want addressed, improvements you expect, and solutions you believe can transform higher education in Kerala.', 
      icon: MessageSquare, 
      qCount: 3 
    },
  ];

  const surveyInstructions = [
    {
      title: '1. Answer Honestly',
      desc: 'There are no right or wrong answers. We are interested in your genuine experiences and opinions.',
    },
    {
      title: '2. Share Your Actual Experiences',
      desc: 'Respond based on your educational journey, institutional environment, and personal observations.',
    },
    {
      title: '3. Complete All Six Sections',
      desc: 'The survey covers six dimensions of student experience. Your responses across all sections help us understand the bigger picture.',
    },
    {
      title: '4. Be Specific Where Possible',
      desc: 'For questions involving challenges and suggestions, provide practical examples and recommendations wherever possible.',
    },
    {
      title: '5. Your Privacy Matters',
      desc: 'Your responses will be handled confidentially and used for the stated research and educational improvement purposes.',
    },
    {
      title: '6. Take Your Time',
      desc: 'The survey takes approximately 5–7 minutes to complete with automatic local draft saving.',
    },
  ];

  return (
    <div className="w-full space-y-16 sm:space-y-24 animate-flowIn">
      
      {/* =================================================================== */}
      {/* PAGE 1: HOMEPAGE / LANDING PAGE HERO                                */}
      {/* =================================================================== */}
      <section className="relative pt-4 sm:pt-8 pb-4 text-center max-w-4xl mx-auto space-y-8">
        
        {/* Soft atmospheric background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] rounded-full bg-[#CCFF00]/10 dark:bg-[#CCFF00]/5 blur-3xl pointer-events-none -z-10" />

        {/* High-Resolution Brand Logo with 3D Float */}
        <div className="w-full flex justify-center py-2 animate-popIn perspective-1000">
          <div className="card-3d inline-block cursor-pointer">
            <img
              src="/logo-clean.png"
              alt="Rise Together 2026"
              className="h-24 sm:h-32 md:h-36 w-auto max-w-full object-contain dark:hidden drop-shadow-sm transition-transform duration-500 ease-out hover:scale-105"
            />
            <img
              src="/logo-clean-dark.png"
              alt="Rise Together 2026"
              className="h-24 sm:h-32 md:h-36 w-auto max-w-full object-contain hidden dark:block drop-shadow-[0_0_35px_rgba(204,255,0,0.3)] transition-transform duration-500 ease-out hover:scale-105"
            />
          </div>
        </div>

        {/* Super Header & Campaign Badge */}
        <div className="flex flex-col items-center space-y-2 animate-fadeInUp">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[#CCFF00] text-[#0B0A0F] font-mono text-[11px] font-extrabold uppercase tracking-widest border border-[#0B0A0F]/20 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 fill-[#0B0A0F]" />
            <span>STATEWIDE SURVEY 2026 • THE PURPLE MOVEMENT × KERALA</span>
          </div>

          <h1 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl lg:text-[52px] leading-[1.12] text-[#0B0A0F] dark:text-white tracking-tight max-w-3xl">
            <span className="shimmer-text">Kerala Student Experience</span> & Higher Education Transformation Survey
          </h1>

          <p className="font-display font-bold text-lg sm:text-xl text-[#0B0A0F] dark:text-[#CCFF00] tracking-tight">
            “Your Education. Your Experience. Your Voice. Your Future.”
          </p>
        </div>

        {/* Main Narrative Paragraphs */}
        <div className="space-y-4 max-w-2xl mx-auto text-sm sm:text-base text-slate-700 dark:text-slate-300 font-sans leading-relaxed animate-fadeInUp flow-delay-1">
          <p>
            Higher education is more than classrooms, examinations, and certificates. It is about developing skills, discovering opportunities, building confidence, and preparing for the real world.
          </p>
          <p className="font-medium text-[#0B0A0F] dark:text-white">
            But are students in Kerala receiving the education and opportunities they truly need?
          </p>
          <p>
            <strong className="text-[#0B0A0F] dark:text-[#CCFF00]">Rise Together 2026</strong> is a statewide student consultation initiated by <strong>The Purple Movement</strong> to understand the real experiences, challenges, aspirations, and expectations of students across Kerala.
          </p>
          <p className="text-slate-500 dark:text-slate-400 italic">
            We want to understand what is working, what is missing, and what needs to change.
          </p>
        </div>

        {/* Strategic Callout: WHY YOUR VOICE MATTERS */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#121118] border-2 border-[#0B0A0F]/15 dark:border-white/10 text-left shadow-sm max-w-3xl mx-auto space-y-4">
          <div className="flex items-center space-x-2 font-mono text-xs uppercase tracking-widest font-black text-[#0B0A0F] dark:text-[#CCFF00]">
            <Award className="w-4 h-4 text-[#0B0A0F] dark:text-[#CCFF00]" />
            <span>WHY YOUR VOICE MATTERS</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            Education should prepare students not only to succeed in examinations but also to:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm font-semibold text-[#0B0A0F] dark:text-slate-200">
            {[
              'Think critically and independently.',
              'Solve real-world problems.',
              'Develop practical and professional skills.',
              'Access meaningful internships and career opportunities.',
              'Participate in innovation and entrepreneurship.',
              'Contribute meaningfully to society.',
            ].map((pt, i) => (
              <div key={i} className="flex items-start space-x-2 p-2.5 rounded-xl bg-[#FBF9F4] dark:bg-[#181622] border border-[#0B0A0F]/8 dark:border-white/5">
                <CheckCircle2 className="w-4 h-4 text-[#0B0A0F] dark:text-[#CCFF00] flex-shrink-0 mt-0.5" />
                <span>{pt}</span>
              </div>
            ))}
          </div>
          <p className="text-xs sm:text-sm font-bold text-[#0B0A0F] dark:text-[#CCFF00] pt-1">
            This survey is an opportunity to make student experiences visible and turn collective voices into actionable solutions.
          </p>
        </div>

        {/* Primary Action Buttons */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4 animate-fadeInUp flow-delay-2">
          <button
            type="button"
            onClick={onStartSurvey}
            className="w-full sm:w-auto inline-flex items-center justify-center space-x-3 px-10 py-4 rounded-full bg-[#0B0A0F] dark:bg-[#CCFF00] text-[#CCFF00] dark:text-[#0B0A0F] hover:bg-[#CCFF00] hover:text-[#0B0A0F] dark:hover:bg-white dark:hover:text-[#0B0A0F] font-black text-sm uppercase tracking-wider focus:outline-none group shadow-midnight-sm dark:shadow-lime-sm transition-all hover:scale-102 active:scale-98 cursor-pointer"
          >
            <span>Start the Survey</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
          </button>

          <button
            type="button"
            onClick={() => setShowInstructions(!showInstructions)}
            className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-7 py-4 rounded-full bg-white dark:bg-[#181622] text-[#0B0A0F] dark:text-white hover:bg-[#F5F2E9] dark:hover:bg-[#201D2E] font-bold text-xs uppercase tracking-wider border border-[#0B0A0F]/20 dark:border-white/15 transition-all shadow-sm hover:-translate-y-0.5 cursor-pointer"
          >
            <HelpCircle className="w-4 h-4 text-[#0B0A0F] dark:text-[#CCFF00]" />
            <span>{showInstructions ? 'Hide Instructions' : 'View Survey Instructions'}</span>
            {showInstructions ? <ChevronUp className="w-4 h-4 ml-1" /> : <ChevronDown className="w-4 h-4 ml-1" />}
          </button>
        </div>

        {/* Survey At A Glance Telemetry Strip */}
        <div className="p-4 sm:p-5 rounded-2xl bg-white/70 dark:bg-[#121118]/70 border border-[#0B0A0F]/10 dark:border-white/10 max-w-3xl mx-auto space-y-2">
          <div className="text-[11px] font-mono font-bold uppercase tracking-widest text-slate-500">
            SURVEY AT A GLANCE
          </div>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 font-mono text-xs text-slate-700 dark:text-slate-300">
            <span className="flex items-center space-x-1.5 font-bold">
              <span className="w-2 h-2 rounded-full bg-[#CCFF00]" />
              <span>6 Survey Sections</span>
            </span>
            <span className="flex items-center space-x-1.5">
              <Clock className="w-3.5 h-3.5 text-[#0B0A0F] dark:text-[#CCFF00]" />
              <span>~5–7 Minutes</span>
            </span>
            <span className="flex items-center space-x-1.5">
              <Layers className="w-3.5 h-3.5 text-[#0B0A0F] dark:text-[#CCFF00]" />
              <span>15 Questions</span>
            </span>
            <span className="flex items-center space-x-1.5">
              <Compass className="w-3.5 h-3.5 text-[#0B0A0F] dark:text-[#CCFF00]" />
              <span>Open to Students Across Kerala</span>
            </span>
            <span className="flex items-center space-x-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-[#CCFF00]" />
              <span>Confidential Student Responses</span>
            </span>
          </div>
        </div>

        {/* Expandable Page 4 Instructions Drawer */}
        {showInstructions && (
          <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#151320] border-2 border-[#0B0A0F] dark:border-[#CCFF00] text-left animate-slideInDown space-y-6 shadow-midnight-lg max-w-3xl mx-auto">
            <div className="space-y-1">
              <span className="font-mono text-xs uppercase tracking-widest text-[#0B0A0F] dark:text-[#CCFF00] font-bold">
                PAGE 4 // BEFORE YOU BEGIN
              </span>
              <h3 className="font-display font-extrabold text-2xl text-[#0B0A0F] dark:text-white">
                A Few Things to Know
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                Thank you for participating in Rise Together 2026. This survey is designed to understand the actual experiences and expectations of students pursuing higher education in Kerala. Please read the following instructions before proceeding.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {surveyInstructions.map((item, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-[#FBF9F4] dark:bg-[#181622] border border-[#0B0A0F]/10 dark:border-white/10 space-y-1">
                  <h4 className="text-xs font-bold text-[#0B0A0F] dark:text-white flex items-center space-x-2">
                    <Check className="w-3.5 h-3.5 text-[#0B0A0F] dark:text-[#CCFF00] stroke-[3]" />
                    <span>{item.title}</span>
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed pl-5">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>

            <div className="p-4 rounded-2xl bg-[#0B0A0F] text-white dark:bg-[#CCFF00] dark:text-[#0B0A0F] space-y-1 text-xs">
              <p className="font-bold uppercase tracking-wider font-mono">
                IMPORTANT
              </p>
              <p className="opacity-90">
                Please submit only one response. Ensure that your answers accurately reflect your genuine educational experiences.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 border-t border-[#0B0A0F]/10 dark:border-white/10">
              <p className="text-xs font-bold text-[#0B0A0F] dark:text-[#CCFF00]">
                READY? Your voice is an important part of this collective effort.
              </p>
              <button
                type="button"
                onClick={onStartSurvey}
                className="inline-flex items-center justify-center space-x-2 px-6 py-2.5 rounded-full bg-[#0B0A0F] dark:bg-[#CCFF00] text-[#CCFF00] dark:text-[#0B0A0F] font-bold text-xs uppercase tracking-wider cursor-pointer shadow-xs hover:scale-102"
              >
                <span>Begin Section A</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

      </section>

      {/* =================================================================== */}
      {/* PAGE 2: SIX QUESTIONS WE BRING TO THE TABLE                         */}
      {/* =================================================================== */}
      <ScrollReveal animation="fade-up" delay={50}>
        <section className="max-w-4xl mx-auto space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 pb-4 border-b border-[#0B0A0F]/15 dark:border-white/15">
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-[#0B0A0F] dark:text-[#CCFF00] font-bold flex items-center space-x-1.5">
                <Flame className="w-3.5 h-3.5 text-[#0B0A0F] dark:text-[#CCFF00]" />
                <span>THE INQUIRY // DIRECT FROM STUDENTS</span>
              </span>
              <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-[#0B0A0F] dark:text-white mt-1">
                Six Questions We Bring to the Table
              </h2>
            </div>
            <p className="text-xs font-mono text-slate-500 max-w-xs text-left sm:text-right">
              Exploring six critical dimensions of student life in Kerala
            </p>
          </div>

          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            Understanding higher education requires listening to the people experiencing it every day. Through this survey, we explore six critical dimensions of student life and the higher education ecosystem in Kerala.
          </p>

          {/* 6 Key Inquiries Grid (Box Cards) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {coreQuestions.map((q, idx) => {
              const isHovered = hoveredInquiry === idx;
              return (
                <ScrollReveal key={q.num} animation="fade-up" delay={idx * 50}>
                  <div
                    onMouseEnter={() => setHoveredInquiry(idx)}
                    onMouseLeave={() => setHoveredInquiry(null)}
                    className={`p-6 rounded-2xl border text-left transition-all duration-300 flex flex-col justify-between space-y-3 h-full ${
                      isHovered 
                        ? 'border-[#0B0A0F] dark:border-[#CCFF00] bg-white dark:bg-[#181622] shadow-midnight-sm -translate-y-1' 
                        : 'border-[#0B0A0F]/12 dark:border-white/10 bg-white dark:bg-[#121118]'
                    }`}
                  >
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <span className="font-mono text-xs font-black px-2 py-0.5 rounded bg-[#CCFF00] text-[#0B0A0F]">
                          {q.num}
                        </span>
                        <h3 className="font-display font-bold text-base text-[#0B0A0F] dark:text-white leading-snug">
                          {q.title}
                        </h3>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                        {q.desc}
                      </p>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>

          {/* The Objective Callout Box */}
          <div className="p-6 rounded-2xl bg-[#FBF9F4] dark:bg-[#181622] border border-[#0B0A0F]/15 dark:border-white/10 space-y-2 text-left">
            <span className="font-mono text-[11px] font-bold uppercase tracking-widest text-[#0B0A0F] dark:text-[#CCFF00]">
              THE OBJECTIVE
            </span>
            <p className="text-sm sm:text-base font-bold text-[#0B0A0F] dark:text-white">
              Move beyond identifying problems.
            </p>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Understand student realities, recognise opportunities, and develop actionable recommendations for transforming higher education in Kerala.
            </p>
          </div>
        </section>
      </ScrollReveal>

      {/* =================================================================== */}
      {/* PAGE 3: SURVEY SECTIONS & JUMP-IN                                   */}
      {/* =================================================================== */}
      <ScrollReveal animation="fade-up" delay={100}>
        <section className="max-w-4xl mx-auto space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 pb-4 border-b border-[#0B0A0F]/15 dark:border-white/15">
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-[#0B0A0F] dark:text-[#CCFF00] font-bold flex items-center space-x-1.5">
                <Layers className="w-3.5 h-3.5 text-[#0B0A0F] dark:text-[#CCFF00]" />
                <span>SURVEY STRUCTURE // 6 SECTIONS</span>
              </span>
              <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-[#0B0A0F] dark:text-white mt-1">
                Explore the Six Dimensions of Your Student Experience
              </h2>
            </div>
            <span className="text-xs font-mono text-slate-500">
              Select any section to enter
            </span>
          </div>

          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            Every student's educational journey is different. These six sections help us understand the complete picture.
          </p>

          {/* Section Box-Like Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {sectionsList.map((sec, idx) => {
              const Icon = sec.icon;
              return (
                <ScrollReveal key={sec.code} animation="fade-up" delay={idx * 60}>
                  <button
                    type="button"
                    onClick={() => {
                      if (onSelectSection) onSelectSection(idx + 1);
                      else onStartSurvey();
                    }}
                    className="w-full p-6 rounded-2xl bg-white dark:bg-[#121118] border border-[#0B0A0F]/15 dark:border-white/10 hover:border-[#0B0A0F] dark:hover:border-[#CCFF00] text-left transition-all duration-300 shadow-xs hover:shadow-midnight-sm hover:-translate-y-1 flex flex-col justify-between group active:scale-[0.99] cursor-pointer h-full space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-xl bg-[#FBF9F4] dark:bg-[#201D2E] border border-[#0B0A0F]/10 dark:border-white/10 flex items-center justify-center flex-shrink-0 group-hover:scale-105 group-hover:border-[#CCFF00] transition-all">
                          <Icon className="w-5 h-5 text-slate-700 dark:text-slate-200 group-hover:text-[#0B0A0F] dark:group-hover:text-[#CCFF00] transition-colors" />
                        </div>
                        <div>
                          <span className="font-mono text-[10px] font-black text-[#0B0A0F] bg-[#CCFF00] px-2 py-0.5 rounded">
                            SECTION {sec.code}
                          </span>
                          <span className="font-mono text-[10px] text-slate-400 ml-2">
                            {sec.qCount} Questions
                          </span>
                        </div>
                      </div>
                      <span className="font-mono text-xs font-bold text-slate-400 group-hover:text-[#0B0A0F] dark:group-hover:text-[#CCFF00] group-hover:translate-x-1 transition-transform">
                        →
                      </span>
                    </div>

                    <div>
                      <h3 className="font-display font-bold text-base sm:text-lg text-[#0B0A0F] dark:text-white group-hover:text-[#0B0A0F] dark:group-hover:text-[#CCFF00] transition-colors">
                        SECTION {sec.code} — {sec.title.toUpperCase()}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed mt-1">
                        {sec.desc}
                      </p>
                    </div>
                  </button>
                </ScrollReveal>
              );
            })}
          </div>
        </section>
      </ScrollReveal>

      {/* =================================================================== */}
      {/* STRATEGIC IMPACT & CAMPAIGN CLOSING                                 */}
      {/* =================================================================== */}
      <ScrollReveal animation="scale" delay={120}>
        <div className="max-w-4xl mx-auto p-8 sm:p-12 rounded-3xl bg-white dark:bg-[#121118] text-[#0B0A0F] dark:text-[#FBF9F4] border-2 border-[#0B0A0F] dark:border-[#CCFF00] flex flex-col md:flex-row items-center justify-between gap-8 shadow-midnight-lg">
          <div className="space-y-3 text-center md:text-left flex-1">
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-[#CCFF00] text-[#0B0A0F] font-mono text-[10px] font-black uppercase tracking-wider">
              <HeartHandshake className="w-3.5 h-3.5" />
              <span>COLLECTIVE ACTION</span>
            </div>
            <h3 className="font-display font-black text-2xl sm:text-3xl text-[#0B0A0F] dark:text-white leading-tight">
              Ready to Shape Higher Education in Kerala?
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-lg">
              Your experience is important. Your observations are valuable. Your recommendations can contribute to meaningful change. Let's understand the present and build a better future together.
            </p>
            <p className="text-xs font-mono font-bold text-[#0B0A0F] dark:text-[#CCFF00] italic pt-1">
              “We are not just asking students what is wrong. We are bringing students together to understand what needs to change and what we can build together.”
            </p>
          </div>

          <div className="flex-shrink-0 w-full md:w-auto">
            <button
              type="button"
              onClick={onStartSurvey}
              className="w-full md:w-auto px-10 py-5 rounded-full bg-[#0B0A0F] dark:bg-[#CCFF00] text-[#CCFF00] dark:text-[#0B0A0F] hover:bg-[#CCFF00] hover:text-[#0B0A0F] dark:hover:bg-white dark:hover:text-[#0B0A0F] font-black text-sm uppercase tracking-wider inline-flex items-center justify-center space-x-3 group shadow-midnight-sm dark:shadow-lime-sm transition-all hover:scale-102 cursor-pointer"
            >
              <span>Start Section A</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
            </button>
          </div>
        </div>
      </ScrollReveal>

    </div>
  );
};

export default HeroSection;
