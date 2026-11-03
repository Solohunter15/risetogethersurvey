import React from 'react';
import {
  SectionAResponse,
  AcademicStatus,
  UniversityId,
  CommunityId,
  DifferentlyAbledStatus,
  EntrepreneurStatus,
} from '../../types/survey';
import { SURVEY_QUESTIONS } from '../../data/surveyContent';
import { useSurveyStore } from '../../store/surveyStore';
import { DropdownSelect } from '../questions/DropdownSelect';
import { CheckboxMulti } from '../questions/CheckboxMulti';
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
  Accessibility,
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

  const q1Meta = SURVEY_QUESTIONS.q1;
  const q2Meta = SURVEY_QUESTIONS.q2;
  const q3Meta = SURVEY_QUESTIONS.q3;

  // Q1 Academic Status Error
  const q1Error = errors['academicStatus'] || errors['sectionA.academicStatus'] || errors['sectionA.academicStatusOther'] || null;

  // Q2 Errors
  const universityError = errors['university'] || errors['sectionA.university'] || errors['sectionA.universityOther'] || null;
  const programmeError = errors['programme'] || errors['sectionA.programme'] || null;

  // Q3 Errors
  const communitiesError = errors['communities'] || errors['sectionA.communities'] || errors['sectionA.communitiesOther'] || null;
  const involvementError = errors['involvementLevel'] || errors['sectionA.involvementLevel'] || null;

  // Q3 Communities change handler with mutual exclusivity
  const handleCommunitiesChange = (newValues: string[]) => {
    if (isReadOnly) return;
    onChange('communities', newValues as CommunityId[]);

    // If 'none' was selected, default involvementLevel to not_applicable
    if (newValues.includes('none')) {
      onChange('involvementLevel', ['not_applicable'] as any);
    }
  };

  return (
    <div className="space-y-12 animate-fadeIn" data-testid="section-a-about">
      
      {/* ==================================================================== */}
      {/* SECTION INTRO HEADING (PURPLE MOVEMENT STYLE)                        */}
      {/* ==================================================================== */}
      <div className="space-y-2">
        <h1 className="font-display font-black text-2xl sm:text-3xl md:text-4xl text-[#0B0A0F] dark:text-white tracking-tight">
          How would you like to take part?
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 font-sans leading-relaxed">
          Choose the path that fits you best.
        </p>
      </div>

      {/* ==================================================================== */}
      {/* QUESTION 1: ACADEMIC STATUS CARDS (PURPLE MOVEMENT ARCHETYPE)        */}
      {/* ==================================================================== */}
      <div className="space-y-4" data-testid="question-q1">
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

        {/* 3-Column Responsive Interactive Card Grid */}
        <div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 pt-1"
          role="radiogroup"
          aria-label={q1Meta.title}
        >
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
                  if (card.id !== 'other') {
                    onChange('academicStatusOther', '');
                  }
                }}
                onKeyDown={(e) => {
                  if (e.key === ' ' || e.key === 'Enter') {
                    e.preventDefault();
                    if (!isReadOnly) {
                      onChange('academicStatus', card.id);
                      if (card.id !== 'other') onChange('academicStatusOther', '');
                    }
                  }
                }}
                className={`relative flex flex-col justify-between p-5 sm:p-6 rounded-2xl border text-left cursor-pointer transition-all duration-200 select-none group ${
                  isSelected
                    ? 'border-2 border-[#0B0A0F] dark:border-[#CCFF00] bg-white dark:bg-[#181622] shadow-md dark:shadow-[0_0_20px_rgba(204,255,0,0.15)] ring-1 ring-[#0B0A0F]/15 dark:ring-[#CCFF00]/30'
                    : 'border-[#0B0A0F]/15 dark:border-white/10 bg-white dark:bg-[#121118] hover:border-[#0B0A0F] dark:hover:border-white/40 hover:-translate-y-0.5'
                } ${isReadOnly ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {/* Card Header: Pill Badge + Radio Circle */}
                <div className="flex items-center justify-between gap-3 mb-4">
                  <div
                    className={`inline-flex items-center space-x-2 px-3 py-1.5 rounded-full text-xs font-bold transition-colors ${
                      isSelected
                        ? 'bg-[#0B0A0F] text-[#CCFF00] dark:bg-[#CCFF00] dark:text-[#0B0A0F]'
                        : 'bg-[#0B0A0F]/8 dark:bg-white/10 text-[#0B0A0F] dark:text-white group-hover:bg-[#0B0A0F] group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-[#0B0A0F]'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{card.label}</span>
                  </div>

                  {/* Radio Circle Indicator */}
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                      isSelected
                        ? 'border-[#0B0A0F] dark:border-[#CCFF00] bg-[#CCFF00] dark:bg-[#0B0A0F]'
                        : 'border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800'
                    }`}
                  >
                    {isSelected && (
                      <span className="w-2 h-2 rounded-full bg-[#0B0A0F] dark:bg-[#CCFF00]" />
                    )}
                  </div>
                </div>

                {/* Card Description */}
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-sans leading-relaxed flex-1">
                  {card.desc}
                </p>

                {/* Other Input (if card is 'other' and selected) */}
                {card.id === 'other' && isSelected && (
                  <div 
                    className="mt-4 pt-3 border-t border-[#0B0A0F]/10 dark:border-white/10" 
                    onClick={(e) => e.stopPropagation()}
                  >
                    <label 
                      htmlFor="input-academic-other" 
                      className="block text-xs font-bold text-[#0B0A0F] dark:text-slate-200 mb-1"
                    >
                      Please specify your status / institution:
                    </label>
                    <input
                      id="input-academic-other"
                      type="text"
                      value={data.academicStatusOther || ''}
                      onChange={(e) => onChange('academicStatusOther', e.target.value)}
                      placeholder="e.g., Polytechnic, Distance Education, etc."
                      className="w-full px-3 py-2 rounded-xl border border-[#0B0A0F]/20 dark:border-white/20 bg-[#FBF9F4] dark:bg-[#0B0A0F] text-xs font-sans text-[#0B0A0F] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#CCFF00]"
                    />
                  </div>
                )}

                <input
                  type="radio"
                  name="academicStatus"
                  value={card.id}
                  checked={isSelected}
                  readOnly
                  className="sr-only pointer-events-none"
                  aria-hidden="true"
                  tabIndex={-1}
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* ==================================================================== */}
      {/* QUESTION 2: University, College & Programme Details                 */}
      {/* ==================================================================== */}
      <div className="pt-8 border-t border-[#0B0A0F]/10 dark:border-white/10 space-y-5" data-testid="question-q2">
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
            if (val !== 'other') {
              onChange('universityOther', '');
            }
          }}
          otherValue={data.universityOther}
          onOtherChange={(val) => onChange('universityOther', val)}
          error={universityError}
          required={q2Meta.required}
          disabled={isReadOnly}
          testId="q2-university-select"
        />

        {/* Aligned 2-Column Responsive Grid for College and Programme */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 pt-1">
          {/* Sub-question: College / Institution (Optional) */}
          <div className="space-y-1.5 flex flex-col justify-start">
            <label
              htmlFor="q2-college"
              className="block text-xs font-bold uppercase tracking-wider text-[#0B0A0F] dark:text-slate-300"
            >
              College / Institution <span className="text-slate-400 font-normal lowercase">(optional)</span>
            </label>
            <input
              id="q2-college"
              data-testid="input-college"
              type="text"
              value={data.college || ''}
              onChange={(e) => onChange('college', e.target.value)}
              placeholder="e.g., College of Engineering Trivandrum, Model Engineering College..."
              disabled={isReadOnly}
              className="w-full px-4 py-3 rounded-xl border border-[#0B0A0F]/20 dark:border-white/20 bg-white dark:bg-[#181622] text-[#0B0A0F] dark:text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-[#CCFF00] focus:border-[#0B0A0F] dark:focus:border-[#CCFF00] transition-colors"
            />
          </div>

          {/* Sub-question: Programme / Field of Study */}
          <div className="space-y-1.5 flex flex-col justify-start">
            <label
              htmlFor="q2-programme"
              className="block text-xs font-bold uppercase tracking-wider text-[#0B0A0F] dark:text-slate-300"
            >
              Programme / Field of Study <span className="text-[#0B0A0F] dark:text-[#CCFF00] font-black">*</span>
            </label>
            <input
              id="q2-programme"
              data-testid="input-programme"
              type="text"
              value={data.programme || ''}
              onChange={(e) => onChange('programme', e.target.value)}
              placeholder="e.g., BTech Computer Science, BCom, BSc Physics, MCA..."
              disabled={isReadOnly}
              aria-required="true"
              aria-invalid={!!programmeError}
              className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none transition-colors ${
                programmeError
                  ? 'border-red-500 bg-red-50 dark:bg-red-950/20 text-red-900 dark:text-red-200'
                  : 'border-[#0B0A0F]/20 dark:border-white/20 bg-white dark:bg-[#181622] text-[#0B0A0F] dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-[#CCFF00] focus:border-[#0B0A0F] dark:focus:border-[#CCFF00]'
              }`}
            />
            {programmeError && (
              <p className="text-xs text-red-600 dark:text-red-400 font-medium">
                {programmeError}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* ==================================================================== */}
      {/* QUESTION 3: Student Communities & Level of Involvement              */}
      {/* ==================================================================== */}
      <div className="pt-8 border-t border-[#0B0A0F]/10 dark:border-white/10 space-y-6" data-testid="question-q3">
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

        {/* Sub-question: Level of Involvement */}
        <div className="mt-5 p-5 sm:p-6 rounded-2xl bg-[#FBF9F4] dark:bg-[#181622] border border-[#0B0A0F]/10 dark:border-white/10 shadow-xs">
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

      {/* ==================================================================== */}
      {/* DEMOGRAPHIC CONTEXT CARDS (PURPLE MOVEMENT STYLE)                    */}
      {/* ==================================================================== */}
      <div className="pt-8 border-t border-[#0B0A0F]/10 dark:border-white/10 space-y-6">
        <div>
          <span className="font-mono text-[10px] uppercase font-bold tracking-widest text-[#0B0A0F] dark:text-[#CCFF00] bg-[#CCFF00]/30 dark:bg-[#CCFF00]/10 px-2 py-0.5 rounded">
            DEMOGRAPHIC CONTEXT
          </span>
          <h3 className="font-display font-bold text-lg text-[#0B0A0F] dark:text-white mt-1">
            Accessibility & Entrepreneurial Background
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Helps assess inclusivity, accommodations, and student venture participation statewide.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          
          {/* Differently-Abled Inquiry */}
          <div className="p-6 rounded-2xl bg-white dark:bg-[#181622] border border-[#0B0A0F]/15 dark:border-white/10 shadow-xs flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-[#0B0A0F] dark:text-slate-300">
                <Accessibility className="w-4 h-4 text-[#0B0A0F] dark:text-[#CCFF00]" />
                <span>Do you identify as a Differently-Abled person?</span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5 italic">Select one option.</p>
            </div>

            <div className="grid grid-cols-1 gap-2.5">
              {[
                { id: 'yes', label: 'Yes', desc: 'Registered disability or conditions requiring campus accommodations.' },
                { id: 'no', label: 'No', desc: 'Do not identify as differently-abled.' },
                { id: 'prefer_not_to_say', label: 'Prefer not to say', desc: 'Keep this demographic detail private.' },
              ].map((opt) => {
                const isSelected = data.isDifferentlyAbled === opt.id;
                return (
                  <div
                    key={opt.id}
                    onClick={() => !isReadOnly && onChange('isDifferentlyAbled', opt.id as DifferentlyAbledStatus)}
                    className={`p-3.5 rounded-xl border text-left cursor-pointer transition-all flex items-start justify-between gap-3 ${
                      isSelected
                        ? 'border-2 border-[#0B0A0F] dark:border-[#CCFF00] bg-[#CCFF00]/10 dark:bg-[#CCFF00]/5 ring-1 ring-[#0B0A0F]/10 dark:ring-[#CCFF00]/20'
                        : 'border-[#0B0A0F]/10 dark:border-white/10 hover:border-[#0B0A0F] dark:hover:border-white/30'
                    }`}
                  >
                    <div>
                      <span className="text-xs font-bold text-[#0B0A0F] dark:text-white block">{opt.label}</span>
                      <span className="text-[11px] text-slate-500 dark:text-slate-400 block mt-0.5">{opt.desc}</span>
                    </div>
                    <div className={`w-4 h-4 rounded-full border-2 mt-0.5 flex-shrink-0 flex items-center justify-center ${
                      isSelected ? 'border-[#0B0A0F] dark:border-[#CCFF00] bg-[#CCFF00] dark:bg-[#0B0A0F]' : 'border-slate-300'
                    }`}>
                      {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-[#0B0A0F] dark:bg-[#CCFF00]" />}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Entrepreneurship Inquiry */}
          <div className="p-6 rounded-2xl bg-white dark:bg-[#181622] border border-[#0B0A0F]/15 dark:border-white/10 shadow-xs flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-[#0B0A0F] dark:text-slate-300">
                <Rocket className="w-4 h-4 text-[#0B0A0F] dark:text-[#CCFF00]" />
                <span>Are you an entrepreneur owning / part of a business?</span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5 italic">Select one option.</p>
            </div>

            <div className="grid grid-cols-1 gap-2.5">
              {[
                { id: 'yes_founder', label: 'Yes — Founder', desc: 'Running or founding a registered business, startup, or venture.' },
                { id: 'yes_part_of_venture', label: 'Yes — Part of Team', desc: 'Core contributor or team member in an early student startup.' },
                { id: 'no', label: 'No', desc: 'Focusing on academic studies, projects, and career exploration.' },
              ].map((opt) => {
                const isSelected = data.isEntrepreneur === opt.id;
                return (
                  <div
                    key={opt.id}
                    onClick={() => !isReadOnly && onChange('isEntrepreneur', opt.id as EntrepreneurStatus)}
                    className={`p-3.5 rounded-xl border text-left cursor-pointer transition-all flex items-start justify-between gap-3 ${
                      isSelected
                        ? 'border-2 border-[#0B0A0F] dark:border-[#CCFF00] bg-[#CCFF00]/10 dark:bg-[#CCFF00]/5 ring-1 ring-[#0B0A0F]/10 dark:ring-[#CCFF00]/20'
                        : 'border-[#0B0A0F]/10 dark:border-white/10 hover:border-[#0B0A0F] dark:hover:border-white/30'
                    }`}
                  >
                    <div>
                      <span className="text-xs font-bold text-[#0B0A0F] dark:text-white block">{opt.label}</span>
                      <span className="text-[11px] text-slate-500 dark:text-slate-400 block mt-0.5">{opt.desc}</span>
                    </div>
                    <div className={`w-4 h-4 rounded-full border-2 mt-0.5 flex-shrink-0 flex items-center justify-center ${
                      isSelected ? 'border-[#0B0A0F] dark:border-[#CCFF00] bg-[#CCFF00] dark:bg-[#0B0A0F]' : 'border-slate-300'
                    }`}>
                      {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-[#0B0A0F] dark:bg-[#CCFF00]" />}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </div>

    </div>
  );
};

export default SectionAAbout;
