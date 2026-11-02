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
import { RadioSingle } from '../questions/RadioSingle';
import { DropdownSelect } from '../questions/DropdownSelect';
import { CheckboxMulti } from '../questions/CheckboxMulti';

export interface SectionAAboutProps {
  data?: SectionAResponse;
  onChange?: <K extends keyof SectionAResponse>(field: K, value: SectionAResponse[K]) => void;
  errors?: Record<string, string>;
  isReadOnly?: boolean;
}

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

  // Q1 Academic Status
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
    <div className="space-y-10 animate-fadeIn" data-testid="section-a-about">
      
      {/* ==================================================================== */}
      {/* QUESTION 1: Current Academic Status                                 */}
      {/* ==================================================================== */}
      <div className="space-y-3">
        <RadioSingle
          id="q1"
          name="academicStatus"
          title={q1Meta.title}
          instruction={q1Meta.instruction}
          contextNote={q1Meta.contextNote}
          options={q1Meta.options || []}
          value={data.academicStatus}
          onChange={(val) => {
            onChange('academicStatus', val as AcademicStatus);
            if (val !== 'other') {
              onChange('academicStatusOther', '');
            }
          }}
          otherValue={data.academicStatusOther}
          onOtherChange={(val) => onChange('academicStatusOther', val)}
          error={q1Error}
          required={q1Meta.required}
          disabled={isReadOnly}
          layout="grid2"
          testId="question-q1"
        />
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
              disabled={isReadOnly}
              onChange={(e) => onChange('college', e.target.value)}
              placeholder="e.g. CET, Model Engineering College, TKM"
              className="w-full min-h-[46px] px-4 py-2.5 text-sm rounded-2xl border border-[#0B0A0F]/15 dark:border-white/15 bg-white dark:bg-[#181622] text-[#0B0A0F] dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#CCFF00] focus:border-[#0B0A0F] dark:focus:border-[#CCFF00] transition-all shadow-xs"
            />
          </div>

          {/* Sub-question: Programme / Field of Study (Required) */}
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
              disabled={isReadOnly}
              onChange={(e) => onChange('programme', e.target.value)}
              placeholder="e.g. B.Tech Computer Science, B.Sc Physics, MCA"
              className={`w-full min-h-[46px] px-4 py-2.5 text-sm rounded-2xl border bg-white dark:bg-[#181622] text-[#0B0A0F] dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#CCFF00] focus:border-[#0B0A0F] dark:focus:border-[#CCFF00] transition-all shadow-xs ${
                programmeError
                  ? 'border-red-500 dark:border-red-500'
                  : 'border-[#0B0A0F]/15 dark:border-white/15'
              }`}
            />
            {programmeError && (
              <p className="text-xs text-red-600 dark:text-red-400 font-medium" role="alert">
                {programmeError}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* ==================================================================== */}
      {/* QUESTION 3: Student Communities & Involvement                       */}
      {/* ==================================================================== */}
      <div className="pt-8 border-t border-[#0B0A0F]/10 dark:border-white/10 space-y-8" data-testid="question-q3">
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
          testId="question-q3-communities"
        />

        {/* Sub-question: Level of Involvement (Multi-Choice) */}
        <div className="p-5 sm:p-6 rounded-2xl bg-[#FBF9F4] dark:bg-[#181622]/60 border border-[#0B0A0F]/10 dark:border-white/10">
          <CheckboxMulti
            id="q3-involvement"
            name="involvementLevel"
            title={q3Meta.subQuestions?.[0]?.title || 'How would you describe your involvement?'}
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
      {/* ALIGNED 2-COLUMN PROFILE & CONTEXT SECTION                           */}
      {/* ==================================================================== */}
      <div className="pt-8 border-t border-[#0B0A0F]/10 dark:border-white/10">
        <div className="mb-5">
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
          {/* Left Card: Differently-Abled */}
          <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-[#181622] border border-[#0B0A0F]/10 dark:border-white/10 shadow-xs h-full flex flex-col justify-between">
            <RadioSingle
              id="q-differently-abled"
              name="isDifferentlyAbled"
              title="Do you identify as a Differently-Abled person?"
              instruction="Select one."
              options={[
                { id: 'yes', label: 'Yes' },
                { id: 'no', label: 'No' },
                { id: 'prefer_not_to_say', label: 'Prefer not to say' },
              ]}
              value={data.isDifferentlyAbled || ''}
              onChange={(val) => onChange('isDifferentlyAbled', val as DifferentlyAbledStatus)}
              disabled={isReadOnly}
              layout="stacked"
              testId="question-differently-abled"
            />
          </div>

          {/* Right Card: Entrepreneurship */}
          <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-[#181622] border border-[#0B0A0F]/10 dark:border-white/10 shadow-xs h-full flex flex-col justify-between">
            <RadioSingle
              id="q-entrepreneur"
              name="isEntrepreneur"
              title="Are you an entrepreneur owning / part of a business?"
              instruction="Select one."
              options={[
                { id: 'yes_founder', label: 'Yes — Founder / Running a business or venture' },
                { id: 'yes_part_of_venture', label: 'Yes — Part of a student startup team' },
                { id: 'no', label: 'No' },
              ]}
              value={data.isEntrepreneur || ''}
              onChange={(val) => onChange('isEntrepreneur', val as EntrepreneurStatus)}
              disabled={isReadOnly}
              layout="stacked"
              testId="question-entrepreneur"
            />
          </div>
        </div>
      </div>

    </div>
  );
};

export default SectionAAbout;
