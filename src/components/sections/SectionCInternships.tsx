import React from 'react';
import { Info } from 'lucide-react';
import {
  SectionCResponse,
  InternshipStatus,
  InternshipBarrierId,
  LikertRating,
} from '../../types/survey';
import { SURVEY_QUESTIONS, LIKERT_SCALE_INTERNSHIP } from '../../data/surveyContent';
import { useSurveyStore } from '../../store/surveyStore';
import { RadioSingle } from '../questions/RadioSingle';
import { MatrixRating } from '../questions/MatrixRating';
import { CheckboxMulti } from '../questions/CheckboxMulti';

export interface SectionCInternshipsProps {
  data?: SectionCResponse;
  onChange?: <K extends keyof SectionCResponse>(field: K, value: SectionCResponse[K]) => void;
  errors?: Record<string, string>;
  isReadOnly?: boolean;
}

export const SectionCInternships: React.FC<SectionCInternshipsProps> = (props) => {
  const store = useSurveyStore();
  const data = props.data ?? store.responses.sectionC;
  const onChange =
    props.onChange ??
    ((field, value) => store.setAnswer('sectionC', field, value));
  const errors = props.errors ?? store.errors;
  const isReadOnly = props.isReadOnly ?? false;

  const q6Meta = SURVEY_QUESTIONS.q6;
  const q7Meta = SURVEY_QUESTIONS.q7;
  const q8Meta = SURVEY_QUESTIONS.q8;

  const q6Error = errors['internshipStatus'] || errors['sectionC.internshipStatus'] || null;
  const q7Error = errors['qualityRatings'] || errors['sectionC.qualityRatings'] || null;
  const q8Error = errors['barriers'] || errors['sectionC.barriers'] || errors['sectionC.barriersOther'] || null;

  const hasInternship = ['completed', 'current', 'both'].includes(data.internshipStatus || '');

  // Extract row-level errors for Q7 if any
  const q7RowErrors: Record<string, string> = {};
  if (q7Meta.matrixRows) {
    for (const row of q7Meta.matrixRows) {
      const err = errors[`qualityRatings.${row.id}`] || errors[`sectionC.qualityRatings.${row.id}`];
      if (err) {
        q7RowErrors[row.id] = err;
      }
    }
  }

  const handleStatusChange = (val: string) => {
    if (isReadOnly) return;
    const status = val as InternshipStatus;
    onChange('internshipStatus', status);

    if (status === 'none' || status === 'not_required') {
      onChange('qualityRatings', null);
    } else if (!data.qualityRatings) {
      onChange('qualityRatings', {});
    }
  };

  const handleQualityRatingChange = (rowId: string, rating: LikertRating) => {
    if (isReadOnly) return;
    const nextRatings = { ...(data.qualityRatings || {}), [rowId]: rating };
    onChange('qualityRatings', nextRatings);
  };

  return (
    <div className="space-y-12 animate-fadeIn" data-testid="section-c-internships">
      {/* ==================================================================== */}
      {/* QUESTION 6: Internship Status                                       */}
      {/* ==================================================================== */}
      <RadioSingle
        id="q6"
        name="internshipStatus"
        title={q6Meta.title}
        instruction={q6Meta.instruction}
        contextNote={q6Meta.contextNote}
        options={q6Meta.options || []}
        value={data.internshipStatus}
        onChange={handleStatusChange}
        error={q6Error}
        required={q6Meta.required}
        disabled={isReadOnly}
        testId="question-q6"
      />

      {/* ==================================================================== */}
      {/* QUESTION 7: Internship Quality Evaluation (Conditional on Q6)        */}
      {/* ==================================================================== */}
      <div className="pt-6 border-t border-slate-200 dark:border-slate-800/80" data-testid="question-q7-container">
        {!hasInternship ? (
          <div
            data-testid="q7-skipped-notice"
            className="p-4 sm:p-5 rounded-2xl bg-slate-100/80 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 flex items-start space-x-3 text-slate-600 dark:text-slate-300 animate-fadeIn"
          >
            <Info className="w-5 h-5 text-purple-600 dark:text-purple-400 mt-0.5 flex-shrink-0" />
            <div className="space-y-1">
              <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200">
                Question 7 Skipped (Not Applicable)
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                You indicated that you have not undertaken an internship or that your academic programme does not require one.
                This question is automatically bypassed. Please proceed to Question 8 below.
              </p>
            </div>
          </div>
        ) : (
          <MatrixRating
            id="q7"
            name="internshipQuality"
            title={q7Meta.title}
            instruction={q7Meta.instruction}
            contextNote={q7Meta.contextNote}
            matrixRows={q7Meta.matrixRows || []}
            scaleOptions={LIKERT_SCALE_INTERNSHIP}
            values={data.qualityRatings || {}}
            onChange={handleQualityRatingChange}
            error={q7Error}
            rowErrors={q7RowErrors}
            required={hasInternship}
            disabled={isReadOnly}
            testId="question-q7"
          />
        )}
      </div>

      {/* ==================================================================== */}
      {/* QUESTION 8: Barriers to Internships & Opportunities (Max 3)         */}
      {/* ==================================================================== */}
      <div className="pt-6 border-t border-slate-200 dark:border-slate-800/80">
        <CheckboxMulti
          id="q8"
          name="barriers"
          title={q8Meta.title}
          instruction={q8Meta.instruction}
          contextNote={q8Meta.contextNote}
          options={q8Meta.options || []}
          values={data.barriers || []}
          onChange={(vals) => onChange('barriers', vals as InternshipBarrierId[])}
          otherValue={data.barriersOther}
          onOtherChange={(val) => onChange('barriersOther', val)}
          maxSelections={3}
          error={q8Error}
          required={q8Meta.required}
          disabled={isReadOnly}
          testId="question-q8"
        />
      </div>
    </div>
  );
};

export default SectionCInternships;
