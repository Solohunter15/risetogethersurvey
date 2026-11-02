import React from 'react';
import {
  SectionEResponse,
  InstitutionalChallengeId,
  ImprovementId,
} from '../../types/survey';
import { SURVEY_QUESTIONS } from '../../data/surveyContent';
import { useSurveyStore } from '../../store/surveyStore';
import { CheckboxMulti } from '../questions/CheckboxMulti';

export interface SectionEInstitutionalProps {
  data?: SectionEResponse;
  onChange?: <K extends keyof SectionEResponse>(field: K, value: SectionEResponse[K]) => void;
  errors?: Record<string, string>;
  isReadOnly?: boolean;
}

export const SectionEInstitutional: React.FC<SectionEInstitutionalProps> = (props) => {
  const store = useSurveyStore();
  const data = props.data ?? store.responses.sectionE;
  const onChange =
    props.onChange ??
    ((field, value) => store.setAnswer('sectionE', field, value));
  const errors = props.errors ?? store.errors;
  const isReadOnly = props.isReadOnly ?? false;

  const q11Meta = SURVEY_QUESTIONS.q11;
  const q12Meta = SURVEY_QUESTIONS.q12;

  const q11Error = errors['experiencedChallenges'] || errors['sectionE.experiencedChallenges'] || errors['sectionE.experiencedChallengesOther'] || null;
  const q12Error = errors['improvements'] || errors['sectionE.improvements'] || errors['sectionE.improvementsOther'] || null;

  return (
    <div className="space-y-12 animate-fadeIn" data-testid="section-e-institutional">
      {/* ==================================================================== */}
      {/* QUESTION 11: Institutional Challenges (4 Categories, Global Max 3)  */}
      {/* ==================================================================== */}
      <CheckboxMulti
        id="q11"
        name="experiencedChallenges"
        title={q11Meta.title}
        instruction={`${q11Meta.instruction} (Select up to 3 across all categories combined).`}
        contextNote={q11Meta.contextNote}
        options={q11Meta.options || []}
        categories={q11Meta.categories}
        values={data.experiencedChallenges || []}
        onChange={(vals) => onChange('experiencedChallenges', vals as InstitutionalChallengeId[])}
        otherValue={data.experiencedChallengesOther}
        onOtherChange={(val) => onChange('experiencedChallengesOther', val)}
        maxSelections={3}
        error={q11Error}
        required={q11Meta.required}
        disabled={isReadOnly}
        testId="question-q11"
      />

      {/* ==================================================================== */}
      {/* QUESTION 12: High-Impact Improvements (Max 3)                        */}
      {/* ==================================================================== */}
      <div className="pt-6 border-t border-slate-200 dark:border-slate-800/80">
        <CheckboxMulti
          id="q12"
          name="improvements"
          title={q12Meta.title}
          instruction={q12Meta.instruction}
          contextNote={q12Meta.contextNote}
          options={q12Meta.options || []}
          values={data.improvements || []}
          onChange={(vals) => onChange('improvements', vals as ImprovementId[])}
          otherValue={data.improvementsOther}
          onOtherChange={(val) => onChange('improvementsOther', val)}
          maxSelections={3}
          error={q12Error}
          required={q12Meta.required}
          disabled={isReadOnly}
          testId="question-q12"
        />
      </div>
    </div>
  );
};

export default SectionEInstitutional;
