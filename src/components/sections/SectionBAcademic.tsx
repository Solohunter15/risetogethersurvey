import React from 'react';
import {
  SectionBResponse,
  OverallExperienceId,
  LikertRating,
} from '../../types/survey';
import { SURVEY_QUESTIONS, LIKERT_SCALE_GENERAL } from '../../data/surveyContent';
import { useSurveyStore } from '../../store/surveyStore';
import { CheckboxMulti } from '../questions/CheckboxMulti';
import { MatrixRating } from '../questions/MatrixRating';

export interface SectionBAcademicProps {
  data?: SectionBResponse;
  onChange?: <K extends keyof SectionBResponse>(field: K, value: SectionBResponse[K]) => void;
  errors?: Record<string, string>;
  isReadOnly?: boolean;
}

export const SectionBAcademic: React.FC<SectionBAcademicProps> = (props) => {
  const store = useSurveyStore();
  const data = props.data ?? store.responses.sectionB;
  const onChange =
    props.onChange ??
    ((field, value) => store.setAnswer('sectionB', field, value));
  const errors = props.errors ?? store.errors;
  const isReadOnly = props.isReadOnly ?? false;

  const q4Meta = SURVEY_QUESTIONS.q4;
  const q5Meta = SURVEY_QUESTIONS.q5;

  const q4Error = errors['overallExperience'] || errors['sectionB.overallExperience'] || errors['sectionB.overallExperienceOther'] || null;
  const q5Error = errors['ratings'] || errors['sectionB.ratings'] || null;

  // Extract row-level errors for Q5 if any
  const q5RowErrors: Record<string, string> = {};
  if (q5Meta.matrixRows) {
    for (const row of q5Meta.matrixRows) {
      const err = errors[`ratings.${row.id}`] || errors[`sectionB.ratings.${row.id}`];
      if (err) {
        q5RowErrors[row.id] = err;
      }
    }
  }

  const handleRatingChange = (rowId: string, rating: LikertRating) => {
    if (isReadOnly) return;
    const nextRatings = { ...(data.ratings || {}), [rowId]: rating };
    onChange('ratings', nextRatings);
  };

  return (
    <div className="space-y-12 animate-fadeIn" data-testid="section-b-academic">
      {/* ==================================================================== */}
      {/* QUESTION 4: Overall Educational Experience (Max 3)                  */}
      {/* ==================================================================== */}
      <CheckboxMulti
        id="q4"
        name="overallExperience"
        title={q4Meta.title}
        instruction={q4Meta.instruction}
        contextNote={q4Meta.contextNote}
        options={q4Meta.options || []}
        values={data.overallExperience || []}
        onChange={(vals) => onChange('overallExperience', vals as OverallExperienceId[])}
        otherValue={data.overallExperienceOther}
        onOtherChange={(val) => onChange('overallExperienceOther', val)}
        maxSelections={3}
        error={q4Error}
        required={q4Meta.required}
        disabled={isReadOnly}
        testId="question-q4"
      />

      {/* ==================================================================== */}
      {/* QUESTION 5: Learning Experience Likert Rating Matrix                */}
      {/* ==================================================================== */}
      <div className="pt-6 border-t border-slate-200 dark:border-slate-800/80">
        <MatrixRating
          id="q5"
          name="learningExperience"
          title={q5Meta.title}
          instruction={q5Meta.instruction}
          contextNote={q5Meta.contextNote}
          matrixRows={q5Meta.matrixRows || []}
          scaleOptions={LIKERT_SCALE_GENERAL}
          values={data.ratings || {}}
          onChange={handleRatingChange}
          error={q5Error}
          rowErrors={q5RowErrors}
          required={q5Meta.required}
          disabled={isReadOnly}
          testId="question-q5"
        />
      </div>
    </div>
  );
};

export default SectionBAcademic;
