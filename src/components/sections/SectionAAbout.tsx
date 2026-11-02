import React from 'react';
import {
  SectionAResponse,
  AcademicStatus,
  UniversityId,
  CommunityId,
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

      {/* ==================================================================== */}
      {/* QUESTION 2: University, College & Programme                         */}
      {/* ==================================================================== */}
      <div className="space-y-6 pt-6 border-t border-slate-200 dark:border-slate-800/80" data-testid="question-q2">
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

        {/* Sub-question: College / Institution (Optional) */}
        <div className="space-y-1.5 pt-1">
          <label
            htmlFor="q2-college"
            className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300"
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
            placeholder="e.g. College of Engineering Trivandrum (CET), Model Engineering College, TKM"
            className="w-full min-h-[44px] px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#1A1826] text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        {/* Sub-question: Programme / Field of Study (Required) */}
        <div className="space-y-1.5 pt-1">
          <label
            htmlFor="q2-programme"
            className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300"
          >
            Programme / Field of Study <span className="text-[#F15E21]">*</span>
          </label>
          <input
            id="q2-programme"
            data-testid="input-programme"
            type="text"
            value={data.programme || ''}
            disabled={isReadOnly}
            onChange={(e) => onChange('programme', e.target.value)}
            placeholder="e.g. B.Tech Computer Science and Engineering, B.Sc Physics, MCA, MBA"
            className={`w-full min-h-[44px] px-3.5 py-2.5 text-sm rounded-xl border bg-white dark:bg-[#1A1826] text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 ${
              programmeError
                ? 'border-red-400 dark:border-red-800 focus:ring-red-500'
                : 'border-slate-300 dark:border-slate-700'
            }`}
          />
          {programmeError && (
            <p className="text-xs text-red-600 dark:text-red-400 mt-1" role="alert">
              {programmeError}
            </p>
          )}
        </div>
      </div>

      {/* ==================================================================== */}
      {/* QUESTION 3: Student Communities & Involvement                       */}
      {/* ==================================================================== */}
      <div className="space-y-8 pt-6 border-t border-slate-200 dark:border-slate-800/80" data-testid="question-q3">
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
  );
};

export default SectionAAbout;
