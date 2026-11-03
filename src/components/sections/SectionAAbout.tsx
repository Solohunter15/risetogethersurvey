import React from 'react';
import {
  SectionAResponse,
  AcademicStatus,
  UniversityId,
  CommunityId,
  DifferentlyAbledStatus,
  ParticipantRole,
} from '../../types/survey';
import { SURVEY_QUESTIONS } from '../../data/surveyContent';
import { ORGANIZATION_QUESTIONS } from '../../data/organizationSurveyContent';
import { ENTREPRENEUR_QUESTIONS } from '../../data/entrepreneurSurveyContent';
import { useSurveyStore } from '../../store/surveyStore';
import { DropdownSelect } from '../questions/DropdownSelect';
import { CheckboxMulti } from '../questions/CheckboxMulti';
import { RadioSingle } from '../questions/RadioSingle';
import {
  Sparkles,
  BookOpen,
  Layers,
  Award,
  GraduationCap,
  Search,
  Briefcase,
  HelpCircle,
  Rocket,
  Building2,
  Accessibility,
  CheckCircle2,
  ShieldAlert,
  User,
} from 'lucide-react';

export interface SectionAAboutProps {
  data?: SectionAResponse;
  onChange?: <K extends keyof SectionAResponse>(field: K, value: SectionAResponse[K]) => void;
  errors?: Record<string, string>;
  isReadOnly?: boolean;
}

interface AcademicCardDef {
  id: AcademicStatus;
  label: string;
  badge: string;
  desc: string;
  icon: React.FC<{ className?: string }>;
}

const ACADEMIC_CARDS: AcademicCardDef[] = [
  {
    id: 'first_year',
    label: 'First Year',
    badge: 'Undergraduate',
    desc: 'Beginning undergraduate studies; exploring campus resources, core foundational courses, and student societies.',
    icon: Sparkles,
  },
  {
    id: 'second_year',
    label: 'Second Year',
    badge: 'Undergraduate',
    desc: 'Core departmental subjects, technical fundamentals, lab projects, and building peer networks.',
    icon: BookOpen,
  },
  {
    id: 'third_year',
    label: 'Third Year',
    badge: 'Undergraduate',
    desc: 'Specialized subjects, active hackathons, and seeking industry internships and mentorship.',
    icon: Layers,
  },
  {
    id: 'fourth_year',
    label: 'Fourth Year',
    badge: 'Final Year',
    desc: 'Capstone projects, campus recruitment, professional certifications, and preparing for career placement.',
    icon: Award,
  },
  {
    id: 'postgraduate',
    label: 'Postgraduate',
    badge: 'Masters Degree',
    desc: 'Master’s programmes (MTech, MCA, MSc, MBA); research depth, publications, and specialized coursework.',
    icon: GraduationCap,
  },
  {
    id: 'research_scholar',
    label: 'Research Scholar',
    badge: 'Doctoral / PhD',
    desc: 'Doctoral candidates conducting original empirical research, scholarly publications, and academic inquiry.',
    icon: Search,
  },
  {
    id: 'graduated_working',
    label: 'Graduated / Working',
    badge: 'Alumni / Career',
    desc: 'Alumni transitioning into industry, startup ventures, freelance work, or career advancements.',
    icon: Briefcase,
  },
  {
    id: 'other',
    label: 'Other Path',
    badge: 'Custom Pathway',
    desc: 'Polytechnic, vocational diploma, distance education, or personalized self-directed learning paths.',
    icon: HelpCircle,
  },
];

export const SectionAAbout: React.FC<SectionAAboutProps> = (props) => {
  const store = useSurveyStore();
  const data = props.data ?? store.responses.sectionA;
  const onChange =
    props.onChange ??
    ((field, value) => store.setAnswer('sectionA', field, value));
  const errors = props.errors ?? store.errors;
  const isReadOnly = props.isReadOnly ?? false;

  const currentRole: ParticipantRole = data.participantRole || 'student';

  const orgData = store.responses.organization?.sectionA || {
    orgType: '',
    orgTypeOther: '',
    orgRole: '',
    orgRoleOther: '',
    studentEngagement: [],
    studentEngagementOther: '',
  };

  const entData = store.responses.entrepreneur?.sectionA || {
    entrepreneurPosition: '',
    entrepreneurPositionOther: '',
    journeyStage: '',
    operatingSectors: [],
    operatingSectorsOther: '',
  };

  const handleRoleSelect = (role: ParticipantRole) => {
    if (isReadOnly) return;
    onChange('participantRole', role);
    if (role === 'entrepreneur') {
      onChange('isEntrepreneur', 'yes_founder');
    } else if (role === 'student') {
      onChange('isEntrepreneur', 'no');
    }
  };

  // Student Section A Question Metadata
  const q1Meta = SURVEY_QUESTIONS.q1;
  const q2Meta = SURVEY_QUESTIONS.q2;
  const q3Meta = SURVEY_QUESTIONS.q3;

  const q1Error = errors['academicStatus'] || errors['sectionA.academicStatus'] || errors['sectionA.academicStatusOther'] || null;
  const universityError = errors['university'] || errors['sectionA.university'] || errors['sectionA.universityOther'] || null;
  const programmeError = errors['programme'] || errors['sectionA.programme'] || null;
  const communitiesError = errors['communities'] || errors['sectionA.communities'] || errors['sectionA.communitiesOther'] || null;
  const involvementError = errors['involvementLevel'] || errors['sectionA.involvementLevel'] || null;

  const handleCommunitiesChange = (newValues: string[]) => {
    if (isReadOnly) return;
    onChange('communities', newValues as CommunityId[]);
    if (newValues.includes('none')) {
      onChange('involvementLevel', ['not_applicable'] as any);
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn" data-testid="section-a-about">
      
      {/* ==================================================================== */}
      {/* SECTION INTRO HEADING                                                */}
      {/* ==================================================================== */}
      <div className="space-y-2">
        <h1 className="font-display font-black text-2xl sm:text-3xl md:text-4xl text-[#0B0A0F] dark:text-white tracking-tight">
          How would you like to take part?
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 font-sans leading-relaxed">
          Choose the path that fits you best. The survey questions will dynamically adjust to your perspective.
        </p>
      </div>

      {/* ==================================================================== */}
      {/* 1. THREE ROLE CONTAINERS AT FIRST: STUDENT | ENTREPRENEUR | ORG      */}
      {/* ==================================================================== */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#14121F] border border-[#0B0A0F]/12 dark:border-white/10 shadow-xs space-y-5">
        <div className="flex items-center justify-between">
          <div>
            <span className="font-mono text-xs uppercase tracking-wider text-[#7C3AED] dark:text-[#CCFF00] font-bold">
              Step 1: Role Identification
            </span>
            <h2 className="font-display font-black text-xl sm:text-2xl text-[#0B0A0F] dark:text-white mt-1">
              How would you like to take part?
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 font-sans mt-0.5">
              Choose the path that fits you best. The survey questions will dynamically adjust to your perspective.
            </p>
          </div>
          <span className="hidden sm:inline-block text-xs text-slate-500 font-medium italic self-start">
            Select one.
          </span>
        </div>

        {/* 3 Containers Grid - Matching Purple Movement join layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5" role="radiogroup" aria-label="Participant Role">
          
          {/* Card 1: Individual / Student */}
          <div
            role="radio"
            aria-checked={currentRole === 'student'}
            tabIndex={isReadOnly ? -1 : 0}
            onClick={() => handleRoleSelect('student')}
            onKeyDown={(e) => {
              if (e.key === ' ' || e.key === 'Enter') {
                e.preventDefault();
                handleRoleSelect('student');
              }
            }}
            className={`p-6 sm:p-7 rounded-2xl border text-left cursor-pointer transition-all duration-200 select-none flex flex-col justify-between ${
              currentRole === 'student'
                ? 'border-2 border-[#7C3AED] dark:border-[#CCFF00] bg-white dark:bg-[#181528] shadow-md ring-2 ring-[#7C3AED]/20 dark:ring-[#CCFF00]/20'
                : 'border-slate-200 dark:border-white/10 bg-white dark:bg-[#121118] hover:border-slate-400 dark:hover:border-white/30 hover:-translate-y-0.5'
            } ${isReadOnly ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <div>
              {/* Header: Icon + Title + Radio */}
              <div className="flex items-center justify-between gap-3 mb-4">
                <div className="flex items-center space-x-3.5">
                  <div className="w-11 h-11 rounded-xl bg-[#7C3AED] text-white flex items-center justify-center shrink-0 shadow-sm">
                    <User className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-lg sm:text-xl text-slate-900 dark:text-white leading-tight">
                      Individual
                    </h3>
                    <span className="text-[11px] font-mono font-semibold text-slate-500 dark:text-slate-400">
                      Student & Learner
                    </span>
                  </div>
                </div>
                <div
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all shrink-0 ${
                    currentRole === 'student'
                      ? 'border-[#7C3AED] dark:border-[#CCFF00] bg-white dark:bg-[#181528]'
                      : 'border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800'
                  }`}
                >
                  {currentRole === 'student' && (
                    <span className="w-2.5 h-2.5 rounded-full bg-[#7C3AED] dark:bg-[#CCFF00]" />
                  )}
                </div>
              </div>

              {/* Description */}
              <p className="text-sm text-slate-600 dark:text-slate-300 font-sans leading-relaxed">
                Students, creators, entrepreneurs and professionals. Bring your skills, time, ideas or mentorship to activities and projects.
              </p>
            </div>
          </div>

          {/* Card 2: Organization */}
          <div
            role="radio"
            aria-checked={currentRole === 'organization'}
            tabIndex={isReadOnly ? -1 : 0}
            onClick={() => handleRoleSelect('organization')}
            onKeyDown={(e) => {
              if (e.key === ' ' || e.key === 'Enter') {
                e.preventDefault();
                handleRoleSelect('organization');
              }
            }}
            className={`p-6 sm:p-7 rounded-2xl border text-left cursor-pointer transition-all duration-200 select-none flex flex-col justify-between ${
              currentRole === 'organization'
                ? 'border-2 border-[#7C3AED] dark:border-[#CCFF00] bg-white dark:bg-[#181528] shadow-md ring-2 ring-[#7C3AED]/20 dark:ring-[#CCFF00]/20'
                : 'border-slate-200 dark:border-white/10 bg-white dark:bg-[#121118] hover:border-slate-400 dark:hover:border-white/30 hover:-translate-y-0.5'
            } ${isReadOnly ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <div>
              {/* Header: Icon + Title + Radio */}
              <div className="flex items-center justify-between gap-3 mb-4">
                <div className="flex items-center space-x-3.5">
                  <div className="w-11 h-11 rounded-xl bg-[#7C3AED] text-white flex items-center justify-center shrink-0 shadow-sm">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-lg sm:text-xl text-slate-900 dark:text-white leading-tight">
                      Organization
                    </h3>
                    <span className="text-[11px] font-mono font-semibold text-slate-500 dark:text-slate-400">
                      Industry & Academia
                    </span>
                  </div>
                </div>
                <div
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all shrink-0 ${
                    currentRole === 'organization'
                      ? 'border-[#7C3AED] dark:border-[#CCFF00] bg-white dark:bg-[#181528]'
                      : 'border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800'
                  }`}
                >
                  {currentRole === 'organization' && (
                    <span className="w-2.5 h-2.5 rounded-full bg-[#7C3AED] dark:bg-[#CCFF00]" />
                  )}
                </div>
              </div>

              {/* Description */}
              <p className="text-sm text-slate-600 dark:text-slate-300 font-sans leading-relaxed">
                Nonprofits, startups, companies, universities and research labs. Offer real challenges, expertise, venues or people — and co-run sessions or pilots.
              </p>
            </div>
          </div>

          {/* Card 3: Entrepreneur */}
          <div
            role="radio"
            aria-checked={currentRole === 'entrepreneur'}
            tabIndex={isReadOnly ? -1 : 0}
            onClick={() => handleRoleSelect('entrepreneur')}
            onKeyDown={(e) => {
              if (e.key === ' ' || e.key === 'Enter') {
                e.preventDefault();
                handleRoleSelect('entrepreneur');
              }
            }}
            className={`p-6 sm:p-7 rounded-2xl border text-left cursor-pointer transition-all duration-200 select-none flex flex-col justify-between ${
              currentRole === 'entrepreneur'
                ? 'border-2 border-[#7C3AED] dark:border-[#CCFF00] bg-white dark:bg-[#181528] shadow-md ring-2 ring-[#7C3AED]/20 dark:ring-[#CCFF00]/20'
                : 'border-slate-200 dark:border-white/10 bg-white dark:bg-[#121118] hover:border-slate-400 dark:hover:border-white/30 hover:-translate-y-0.5'
            } ${isReadOnly ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <div>
              {/* Header: Icon + Title + Radio */}
              <div className="flex items-center justify-between gap-3 mb-4">
                <div className="flex items-center space-x-3.5">
                  <div className="w-11 h-11 rounded-xl bg-[#7C3AED] text-white flex items-center justify-center shrink-0 shadow-sm">
                    <Rocket className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-lg sm:text-xl text-slate-900 dark:text-white leading-tight">
                      Entrepreneur
                    </h3>
                    <span className="text-[11px] font-mono font-semibold text-slate-500 dark:text-slate-400">
                      Founder & Innovator
                    </span>
                  </div>
                </div>
                <div
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all shrink-0 ${
                    currentRole === 'entrepreneur'
                      ? 'border-[#7C3AED] dark:border-[#CCFF00] bg-white dark:bg-[#181528]'
                      : 'border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800'
                  }`}
                >
                  {currentRole === 'entrepreneur' && (
                    <span className="w-2.5 h-2.5 rounded-full bg-[#7C3AED] dark:bg-[#CCFF00]" />
                  )}
                </div>
              </div>

              {/* Description */}
              <p className="text-sm text-slate-600 dark:text-slate-300 font-sans leading-relaxed">
                Founders, student creators, and business builders. Solve systemic barriers, access capital & mentorship, and scale ventures across Kerala.
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* ==================================================================== */}
      {/* 2. COMMON QUESTION ABOUT DISABILITY: EXACTLY 3 OPTIONS               */}
      {/* ==================================================================== */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#14121F] border border-[#0B0A0F]/12 dark:border-white/10 shadow-xs space-y-4" data-testid="question-differently-abled">
        <div className="flex items-center justify-between">
          <div className="text-sm font-bold uppercase tracking-wider text-[#0B0A0F] dark:text-slate-300 flex items-center space-x-2">
            <Accessibility className="w-4 h-4 text-[#0B0A0F] dark:text-[#CCFF00]" />
            <span>Do you identify as a Differently-Abled person?</span>
          </div>
          <span className="text-xs text-slate-500 font-medium italic">
            Select one.
          </span>
        </div>

        {/* Choices Box Container with exactly 3 options */}
        <div className="p-4 sm:p-5 rounded-2xl bg-[#FBF9F4] dark:bg-[#181622]/80 border border-[#0B0A0F]/10 dark:border-white/10">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3" role="radiogroup" aria-label="Differently-Abled Identification">
            {[
              { id: 'yes', label: 'Yes', icon: Accessibility },
              { id: 'no', label: 'No', icon: CheckCircle2 },
              { id: 'prefer_not_to_say', label: "Don't want to say", icon: ShieldAlert },
            ].map((opt) => {
              const isSelected = data.isDifferentlyAbled === opt.id;
              const Icon = opt.icon;

              return (
                <div
                  key={opt.id}
                  role="radio"
                  aria-checked={isSelected}
                  tabIndex={isReadOnly ? -1 : 0}
                  onClick={() => !isReadOnly && onChange('isDifferentlyAbled', opt.id as DifferentlyAbledStatus)}
                  onKeyDown={(e) => {
                    if (e.key === ' ' || e.key === 'Enter') {
                      e.preventDefault();
                      if (!isReadOnly) onChange('isDifferentlyAbled', opt.id as DifferentlyAbledStatus);
                    }
                  }}
                  className={`p-4 rounded-xl border text-left cursor-pointer transition-all flex items-center justify-between gap-3 ${
                    isSelected
                      ? 'border-2 border-[#0B0A0F] dark:border-[#CCFF00] bg-white dark:bg-[#1F1C2E] shadow-sm ring-1 ring-[#0B0A0F]/10 dark:ring-[#CCFF00]/20'
                      : 'border-[#0B0A0F]/10 dark:border-white/10 bg-white dark:bg-[#14121F] hover:border-[#0B0A0F] dark:hover:border-white/30 hover:-translate-y-0.5'
                  }`}
                >
                  <div className="inline-flex items-center space-x-2 font-bold text-xs text-[#0B0A0F] dark:text-white">
                    <Icon className="w-4 h-4 text-[#0B0A0F] dark:text-[#CCFF00]" />
                    <span>{opt.label}</span>
                  </div>
                  <div className={`w-4 h-4 rounded-full border-2 flex-shrink-0 flex items-center justify-center ${
                    isSelected ? 'border-[#0B0A0F] dark:border-[#CCFF00] bg-[#CCFF00] dark:bg-[#0B0A0F]' : 'border-slate-300 dark:border-slate-600'
                  }`}>
                    {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-[#0B0A0F] dark:bg-[#CCFF00]" />}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ==================================================================== */}
      {/* 3. DYNAMIC QUESTIONS BASED ON ROLE SELECTION                         */}
      {/* ==================================================================== */}

      {/* ------------------------------------------------------------------ */}
      {/* TRACK 1: STUDENT QUESTIONS                                          */}
      {/* ------------------------------------------------------------------ */}
      {currentRole === 'student' && (
        <>
          {/* Question 1: Academic Status */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#14121F] border border-[#0B0A0F]/12 dark:border-white/10 shadow-xs space-y-4" data-testid="question-q1">
            <div className="flex items-center justify-between">
              <div className="text-sm font-bold uppercase tracking-wider text-[#0B0A0F] dark:text-slate-300">
                {q1Meta.title}
                <span className="text-[#0B0A0F] dark:text-[#CCFF00] font-black ml-1">*</span>
              </div>
              <span className="text-xs text-slate-500 font-medium italic">
                {q1Meta.instruction}
              </span>
            </div>

            {q1Error && (
              <div role="alert" className="text-xs font-bold text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/40 px-3.5 py-2 rounded-xl border border-red-200 dark:border-red-900/40">
                {q1Error}
              </div>
            )}

            <div className="p-4 sm:p-5 rounded-2xl bg-[#FBF9F4] dark:bg-[#181622]/80 border border-[#0B0A0F]/10 dark:border-white/10">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4" role="radiogroup" aria-label={q1Meta.title}>
                {ACADEMIC_CARDS.map((card) => {
                  const isSelected = data.academicStatus === card.id;
                  const Icon = card.icon;

                  return (
                    <div
                      key={card.id}
                      data-testid={`option-${card.id}`}
                      role="radio"
                      aria-checked={isSelected}
                      tabIndex={isReadOnly ? -1 : 0}
                      onClick={() => {
                        if (isReadOnly) return;
                        onChange('academicStatus', card.id);
                        if (card.id !== 'other') onChange('academicStatusOther', '');
                      }}
                      className={`relative flex flex-col justify-between p-5 rounded-xl border text-left cursor-pointer transition-all duration-200 select-none group ${
                        isSelected
                          ? 'border-2 border-[#0B0A0F] dark:border-[#CCFF00] bg-white dark:bg-[#1F1C2E] shadow-sm ring-1 ring-[#0B0A0F]/15 dark:ring-[#CCFF00]/30'
                          : 'border-[#0B0A0F]/12 dark:border-white/10 bg-white dark:bg-[#14121F] hover:border-[#0B0A0F] dark:hover:border-white/40 hover:-translate-y-0.5'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-3 mb-3">
                        <div className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-bold ${
                          isSelected ? 'bg-[#0B0A0F] text-[#CCFF00] dark:bg-[#CCFF00] dark:text-[#0B0A0F]' : 'bg-[#0B0A0F]/8 dark:bg-white/10 text-[#0B0A0F] dark:text-white'
                        }`}>
                          <Icon className="w-3.5 h-3.5" />
                          <span>{card.label}</span>
                        </div>
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                          isSelected ? 'border-[#0B0A0F] dark:border-[#CCFF00] bg-[#CCFF00] dark:bg-[#0B0A0F]' : 'border-slate-300 dark:border-slate-600'
                        }`}>
                          {isSelected && <span className="w-2 h-2 rounded-full bg-[#0B0A0F] dark:bg-[#CCFF00]" />}
                        </div>
                      </div>
                      <p className="text-xs text-slate-600 dark:text-slate-400 font-sans leading-relaxed flex-1">{card.desc}</p>
                      {card.id === 'other' && isSelected && (
                        <div className="mt-3 pt-3 border-t border-[#0B0A0F]/10 dark:border-white/10" onClick={(e) => e.stopPropagation()}>
                          <input
                            type="text"
                            value={data.academicStatusOther || ''}
                            onChange={(e) => onChange('academicStatusOther', e.target.value)}
                            placeholder="Specify your status or institution..."
                            className="w-full px-3 py-2 rounded-xl border border-[#0B0A0F]/20 dark:border-white/20 bg-white dark:bg-[#0B0A0F] text-xs font-sans text-[#0B0A0F] dark:text-white focus:ring-2 focus:ring-[#CCFF00]"
                          />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Question 2: University, College & Programme */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#14121F] border border-[#0B0A0F]/12 dark:border-white/10 shadow-xs space-y-5" data-testid="question-q2">
            <DropdownSelect
              id="q2-university"
              name="university"
              title={q2Meta.title}
              instruction={q2Meta.instruction}
              contextNote={q2Meta.contextNote}
              placeholder="-- Select University or Institution --"
              options={q2Meta.options || []}
              value={data.university}
              onChange={(val) => {
                onChange('university', val as UniversityId);
                if (val !== 'other') onChange('universityOther', '');
              }}
              otherValue={data.universityOther}
              onOtherChange={(val) => onChange('universityOther', val)}
              error={universityError}
              required={q2Meta.required}
              disabled={isReadOnly}
              testId="q2-university-select"
            />

            <div className="p-4 sm:p-5 rounded-2xl bg-[#FBF9F4] dark:bg-[#181622]/80 border border-[#0B0A0F]/10 dark:border-white/10 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5 flex flex-col justify-start">
                <label htmlFor="q2-college" className="block text-xs font-bold uppercase tracking-wider text-[#0B0A0F] dark:text-slate-300">
                  College / Institution <span className="text-slate-400 font-normal lowercase">(optional)</span>
                </label>
                <input
                  id="q2-college"
                  data-testid="input-college"
                  type="text"
                  value={data.college || ''}
                  onChange={(e) => onChange('college', e.target.value)}
                  placeholder="e.g., College of Engineering Trivandrum..."
                  disabled={isReadOnly}
                  className="w-full px-4 py-3 rounded-xl border border-[#0B0A0F]/20 dark:border-white/20 bg-white dark:bg-[#14121F] text-[#0B0A0F] dark:text-white placeholder-slate-400 text-sm focus:ring-2 focus:ring-[#CCFF00]"
                />
              </div>

              <div className="space-y-1.5 flex flex-col justify-start">
                <label htmlFor="q2-programme" className="block text-xs font-bold uppercase tracking-wider text-[#0B0A0F] dark:text-slate-300">
                  Programme / Field of Study <span className="text-[#0B0A0F] dark:text-[#CCFF00] font-black">*</span>
                </label>
                <input
                  id="q2-programme"
                  data-testid="input-programme"
                  type="text"
                  value={data.programme || ''}
                  onChange={(e) => onChange('programme', e.target.value)}
                  placeholder="e.g., BTech Computer Science, MCA..."
                  disabled={isReadOnly}
                  className="w-full px-4 py-3 rounded-xl border border-[#0B0A0F]/20 dark:border-white/20 bg-white dark:bg-[#14121F] text-[#0B0A0F] dark:text-white placeholder-slate-400 text-sm focus:ring-2 focus:ring-[#CCFF00]"
                />
                {programmeError && <p className="text-xs text-red-600 dark:text-red-400 font-medium">{programmeError}</p>}
              </div>
            </div>
          </div>

          {/* Question 3: Student Communities */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#14121F] border border-[#0B0A0F]/12 dark:border-white/10 shadow-xs space-y-6" data-testid="question-q3">
            <CheckboxMulti
              id="q3-communities"
              name="communities"
              title={q3Meta.title}
              instruction={q3Meta.instruction}
              contextNote={q3Meta.contextNote}
              options={q3Meta.options || []}
              values={data.communities || []}
              onChange={handleCommunitiesChange}
              otherValue={data.communitiesOther}
              onOtherChange={(val) => onChange('communitiesOther', val)}
              error={communitiesError}
              required={q3Meta.required}
              disabled={isReadOnly}
              testId="q3-communities-checkboxes"
            />

            <div className="p-5 sm:p-6 rounded-2xl bg-[#FBF9F4] dark:bg-[#181622]/80 border border-[#0B0A0F]/10 dark:border-white/10 shadow-xs">
              <CheckboxMulti
                id="q3-involvement"
                name="involvementLevel"
                title={q3Meta.subQuestions?.[0]?.title || 'What has been your level of involvement?'}
                instruction={q3Meta.subQuestions?.[0]?.instruction || 'Select all that apply.'}
                options={q3Meta.subQuestions?.[0]?.options || []}
                values={
                  Array.isArray(data.involvementLevel)
                    ? data.involvementLevel
                    : data.involvementLevel
                    ? [data.involvementLevel]
                    : []
                }
                onChange={(vals) => onChange('involvementLevel', vals as any)}
                error={involvementError}
                required={q3Meta.subQuestions?.[0]?.required ?? true}
                disabled={isReadOnly || (data.communities || []).includes('none')}
                testId="question-q3-involvement"
              />
            </div>
          </div>
        </>
      )}

      {/* ------------------------------------------------------------------ */}
      {/* TRACK 2: ORGANISATION PROFILE QUESTIONS                            */}
      {/* ------------------------------------------------------------------ */}
      {currentRole === 'organization' && (
        <>
          {/* Org Q1: Organisation Type */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#14121F] border border-[#0B0A0F]/12 dark:border-white/10 shadow-xs space-y-4">
            <RadioSingle
              id="org-q1"
              name="orgType"
              title={ORGANIZATION_QUESTIONS.org_q1.title}
              instruction={ORGANIZATION_QUESTIONS.org_q1.instruction}
              options={ORGANIZATION_QUESTIONS.org_q1.options || []}
              value={orgData.orgType}
              onChange={(val) => store.setOrganizationAnswer('sectionA', 'orgType', val)}
              otherValue={orgData.orgTypeOther}
              onOtherChange={(val) => store.setOrganizationAnswer('sectionA', 'orgTypeOther', val)}
              required={true}
              disabled={isReadOnly}
              layout="grid2"
              testId="org-question-q1"
            />
          </div>

          {/* Org Q2: Role in Organisation */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#14121F] border border-[#0B0A0F]/12 dark:border-white/10 shadow-xs space-y-4">
            <RadioSingle
              id="org-q2"
              name="orgRole"
              title={ORGANIZATION_QUESTIONS.org_q2.title}
              instruction={ORGANIZATION_QUESTIONS.org_q2.instruction}
              options={ORGANIZATION_QUESTIONS.org_q2.options || []}
              value={orgData.orgRole}
              onChange={(val) => store.setOrganizationAnswer('sectionA', 'orgRole', val)}
              otherValue={orgData.orgRoleOther}
              onOtherChange={(val) => store.setOrganizationAnswer('sectionA', 'orgRoleOther', val)}
              required={true}
              disabled={isReadOnly}
              layout="grid2"
              testId="org-question-q2"
            />
          </div>

          {/* Org Q3: Current Engagement */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#14121F] border border-[#0B0A0F]/12 dark:border-white/10 shadow-xs space-y-4">
            <CheckboxMulti
              id="org-q3"
              name="studentEngagement"
              title={ORGANIZATION_QUESTIONS.org_q3.title}
              instruction={ORGANIZATION_QUESTIONS.org_q3.instruction}
              options={ORGANIZATION_QUESTIONS.org_q3.options || []}
              values={orgData.studentEngagement || []}
              onChange={(vals) => store.setOrganizationAnswer('sectionA', 'studentEngagement', vals)}
              otherValue={orgData.studentEngagementOther}
              onOtherChange={(val) => store.setOrganizationAnswer('sectionA', 'studentEngagementOther', val)}
              required={true}
              disabled={isReadOnly}
              testId="org-question-q3"
            />
          </div>
        </>
      )}

      {/* ------------------------------------------------------------------ */}
      {/* TRACK 3: ENTREPRENEUR & STARTUP PROFILE QUESTIONS                   */}
      {/* ------------------------------------------------------------------ */}
      {currentRole === 'entrepreneur' && (
        <>
          {/* Ent Q1: Current Position */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#14121F] border border-[#0B0A0F]/12 dark:border-white/10 shadow-xs space-y-4">
            <RadioSingle
              id="ent-q1"
              name="entrepreneurPosition"
              title={ENTREPRENEUR_QUESTIONS.ent_q1.title}
              instruction={ENTREPRENEUR_QUESTIONS.ent_q1.instruction}
              options={ENTREPRENEUR_QUESTIONS.ent_q1.options || []}
              value={entData.entrepreneurPosition}
              onChange={(val) => store.setEntrepreneurAnswer('sectionA', 'entrepreneurPosition', val)}
              otherValue={entData.entrepreneurPositionOther}
              onOtherChange={(val) => store.setEntrepreneurAnswer('sectionA', 'entrepreneurPositionOther', val)}
              required={true}
              disabled={isReadOnly}
              layout="grid2"
              testId="ent-question-q1"
            />
          </div>

          {/* Ent Q2: Current Stage */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#14121F] border border-[#0B0A0F]/12 dark:border-white/10 shadow-xs space-y-4">
            <RadioSingle
              id="ent-q2"
              name="journeyStage"
              title={ENTREPRENEUR_QUESTIONS.ent_q2.title}
              instruction={ENTREPRENEUR_QUESTIONS.ent_q2.instruction}
              options={ENTREPRENEUR_QUESTIONS.ent_q2.options || []}
              value={entData.journeyStage}
              onChange={(val) => store.setEntrepreneurAnswer('sectionA', 'journeyStage', val)}
              required={true}
              disabled={isReadOnly}
              layout="grid2"
              testId="ent-question-q2"
            />
          </div>

          {/* Ent Q3: Operating Sectors */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#14121F] border border-[#0B0A0F]/12 dark:border-white/10 shadow-xs space-y-4">
            <CheckboxMulti
              id="ent-q3"
              name="operatingSectors"
              title={ENTREPRENEUR_QUESTIONS.ent_q3.title}
              instruction={ENTREPRENEUR_QUESTIONS.ent_q3.instruction}
              options={ENTREPRENEUR_QUESTIONS.ent_q3.options || []}
              values={entData.operatingSectors || []}
              onChange={(vals) => store.setEntrepreneurAnswer('sectionA', 'operatingSectors', vals)}
              otherValue={entData.operatingSectorsOther}
              onOtherChange={(val) => store.setEntrepreneurAnswer('sectionA', 'operatingSectorsOther', val)}
              required={true}
              disabled={isReadOnly}
              layout="grid2"
              testId="ent-question-q3"
            />
          </div>
        </>
      )}

    </div>
  );
};

export default SectionAAbout;
