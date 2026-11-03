import React from 'react';
import {
  SectionDResponse,
  CommunityValueId,
  CommunityChallengeId,
} from '../../types/survey';
import { SURVEY_QUESTIONS } from '../../data/surveyContent';
import { useSurveyStore } from '../../store/surveyStore';
import { CheckboxMulti } from '../questions/CheckboxMulti';

export interface SectionDCommunitiesProps {
  data?: SectionDResponse;
  onChange?: <K extends keyof SectionDResponse>(field: K, value: SectionDResponse[K]) => void;
  errors?: Record<string, string>;
  isReadOnly?: boolean;
}

export const SectionDCommunities: React.FC<SectionDCommunitiesProps> = (props) => {
  const store = useSurveyStore();
  const data = props.data ?? store.responses.sectionD;
  const onChange =
    props.onChange ??
    ((field, value) => store.setAnswer('sectionD', field, value));
  const errors = props.errors ?? store.errors;
  const isReadOnly = props.isReadOnly ?? false;

  const q9Meta = SURVEY_QUESTIONS.q9;
  const q10Meta = SURVEY_QUESTIONS.q10;

  const q9Error = errors['valueGained'] || errors['sectionD.valueGained'] || errors['sectionD.valueGainedOther'] || null;
  const q10Error = errors['challengesFaced'] || errors['sectionD.challengesFaced'] || errors['sectionD.challengesFacedOther'] || null;

  return (
    <div className="space-y-8 animate-fadeIn" data-testid="section-d-communities">
      
      {/* ==================================================================== */}
      {/* QUESTION 9: Value Gained from Student Communities Box Container     */}
      {/* ==================================================================== */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#14121F] border border-[#0B0A0F]/12 dark:border-white/10 shadow-xs space-y-4">
        <CheckboxMulti
          id="q9"
          name="valueGained"
          title={q9Meta.title}
          instruction={q9Meta.instruction}
          contextNote={q9Meta.contextNote}
          options={q9Meta.options || []}
          values={data.valueGained || []}
          onChange={(vals) => onChange('valueGained', vals as CommunityValueId[])}
          otherValue={data.valueGainedOther}
          onOtherChange={(val) => onChange('valueGainedOther', val)}
          maxSelections={3}
          error={q9Error}
          required={q9Meta.required}
          disabled={isReadOnly}
          testId="question-q9"
        />
      </div>

      {/* ==================================================================== */}
      {/* QUESTION 10: Challenges in Communities Box Container                 */}
      {/* ==================================================================== */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#14121F] border border-[#0B0A0F]/12 dark:border-white/10 shadow-xs space-y-4">
        <CheckboxMulti
          id="q10"
          name="challengesFaced"
          title={q10Meta.title}
          instruction={q10Meta.instruction}
          contextNote={q10Meta.contextNote}
          options={q10Meta.options || []}
          values={data.challengesFaced || []}
          onChange={(vals) => onChange('challengesFaced', vals as CommunityChallengeId[])}
          otherValue={data.challengesFacedOther}
          onOtherChange={(val) => onChange('challengesFacedOther', val)}
          maxSelections={3}
          error={q10Error}
          required={q10Meta.required}
          disabled={isReadOnly}
          testId="question-q10"
        />
      </div>

    </div>
  );
};

export default SectionDCommunities;
