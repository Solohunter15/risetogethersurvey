import React from 'react';
import {
  SectionFResponse,
  CollaborativeReadiness,
  ContributionAreaId,
} from '../../types/survey';
import { SURVEY_QUESTIONS } from '../../data/surveyContent';
import { useSurveyStore } from '../../store/surveyStore';
import { GuidedTextarea } from '../questions/GuidedTextarea';
import { RadioSingle } from '../questions/RadioSingle';
import { CheckboxMulti } from '../questions/CheckboxMulti';

export interface SectionFVoicesProps {
  data?: SectionFResponse;
  onChange?: <K extends keyof SectionFResponse>(field: K, value: SectionFResponse[K]) => void;
  errors?: Record<string, string>;
  isReadOnly?: boolean;
}

export const SectionFVoices: React.FC<SectionFVoicesProps> = (props) => {
  const store = useSurveyStore();
  const data = props.data ?? store.responses.sectionF;
  const onChange =
    props.onChange ??
    ((field, value) => store.setAnswer('sectionF', field, value));
  const errors = props.errors ?? store.errors;
  const isReadOnly = props.isReadOnly ?? false;

  const q13Meta = SURVEY_QUESTIONS.q13;
  const q14Meta = SURVEY_QUESTIONS.q14;
  const q15Meta = SURVEY_QUESTIONS.q15;

  const q13Error = errors['majorProblem'] || errors['sectionF.majorProblem'] || null;
  const q14Error = errors['proposedSolution'] || errors['sectionF.proposedSolution'] || null;
  const q15Error = errors['initiativeInterest'] || errors['sectionF.initiativeInterest'] || null;
  const q15SubError = errors['contributionAreasOther'] || errors['sectionF.contributionAreasOther'] || null;

  const currentInterest = data.initiativeInterest || data.collaborativeReadiness || '';
  const isInterestPositive = !!currentInterest && currentInterest !== 'not_now';

  const handleInterestChange = (val: string) => {
    if (isReadOnly) return;
    const interest = val as CollaborativeReadiness;
    onChange('initiativeInterest', interest);
    onChange('collaborativeReadiness', interest);

    if (interest === 'not_now') {
      onChange('contributionAreas', []);
      onChange('contributionAreasOther', '');
    }
  };

  return (
    <div className="space-y-12 animate-fadeIn" data-testid="section-f-voices">
      {/* ==================================================================== */}
      {/* QUESTION 13: Major Problem Narrative                                */}
      {/* ==================================================================== */}
      <GuidedTextarea
        id="q13"
        name="majorProblem"
        title={q13Meta.title}
        instruction={q13Meta.instruction}
        contextNote={q13Meta.contextNote}
        guidingPrompts={q13Meta.guidingPrompts}
        placeholder={q13Meta.placeholder}
        value={data.majorProblem?.description || data.majorProblemNarrative || ''}
        onChange={(val) => {
          onChange('majorProblem', { description: val });
          onChange('majorProblemNarrative', val);
        }}
        minLength={3}
        maxLength={4000}
        error={q13Error}
        required={q13Meta.required}
        disabled={isReadOnly}
        testId="question-q13"
      />

      {/* ==================================================================== */}
      {/* QUESTION 14: Practical Change Proposal                              */}
      {/* ==================================================================== */}
      <div className="pt-6 border-t border-slate-200 dark:border-slate-800/80">
        <GuidedTextarea
          id="q14"
          name="proposedSolution"
          title={q14Meta.title}
          instruction={q14Meta.instruction}
          contextNote={q14Meta.contextNote}
          guidingPrompts={q14Meta.guidingPrompts}
          placeholder={q14Meta.placeholder}
          value={data.proposedSolution?.description || data.practicalSolutionProposal || ''}
          onChange={(val) => {
            onChange('proposedSolution', { description: val });
            onChange('practicalSolutionProposal', val);
          }}
          minLength={3}
          maxLength={4000}
          error={q14Error}
          required={q14Meta.required}
          disabled={isReadOnly}
          testId="question-q14"
        />
      </div>

      {/* ==================================================================== */}
      {/* QUESTION 15: Collaborative Initiative & Contribution Focus          */}
      {/* ==================================================================== */}
      <div className="pt-6 border-t border-slate-200 dark:border-slate-800/80 space-y-6">
        <RadioSingle
          id="q15"
          name="initiativeInterest"
          title={q15Meta.title}
          instruction={q15Meta.instruction}
          contextNote={q15Meta.contextNote}
          options={q15Meta.options || []}
          value={currentInterest}
          onChange={handleInterestChange}
          error={q15Error}
          required={q15Meta.required}
          disabled={isReadOnly}
          testId="question-q15"
        />

        {/* Conditional Sub-question: Contribution Areas */}
        {isInterestPositive && (
          <div className="pt-4 border-t border-dashed border-slate-200 dark:border-slate-800 animate-fadeIn">
            <CheckboxMulti
              id="q15-areas"
              name="contributionAreas"
              title={q15Meta.subQuestions?.[0]?.title || 'Which areas would you be interested in contributing to?'}
              instruction={q15Meta.subQuestions?.[0]?.instruction || 'Select all that apply.'}
              options={q15Meta.subQuestions?.[0]?.options || []}
              values={data.contributionAreas || []}
              onChange={(vals) => onChange('contributionAreas', vals as ContributionAreaId[])}
              otherValue={data.contributionAreasOther}
              onOtherChange={(val) => onChange('contributionAreasOther', val)}
              error={q15SubError}
              required={false}
              disabled={isReadOnly}
              testId="question-q15-areas"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default SectionFVoices;
