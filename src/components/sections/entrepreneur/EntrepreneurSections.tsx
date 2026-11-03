import React from 'react';
import { useSurveyStore } from '../../../store/surveyStore';
import {
  ENTREPRENEUR_QUESTIONS,
  DIFFICULTY_SCALE,
  AGREEMENT_SCALE,
} from '../../../data/entrepreneurSurveyContent';
import { RadioSingle } from '../../questions/RadioSingle';
import { CheckboxMulti } from '../../questions/CheckboxMulti';
import { MatrixRating } from '../../questions/MatrixRating';
import { GuidedTextarea } from '../../questions/GuidedTextarea';
import { LikertRating } from '../../../types/survey';

// SECTION B: STARTING AND BUILDING A VENTURE
export const EntSectionB: React.FC = () => {
  const store = useSurveyStore();
  const data = store.responses.entrepreneur?.sectionB || {
    motivations: [],
    motivationsOther: '',
    ventureChallenges: [],
    ventureChallengesOther: '',
    resourceDifficultyRatings: {},
  };

  return (
    <div className="space-y-8 animate-fadeIn" data-testid="ent-section-b">
      {/* Q4 */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#14121F] border border-[#0B0A0F]/12 dark:border-white/10 shadow-xs space-y-4">
        <CheckboxMulti
          id="ent-q4"
          name="motivations"
          title={ENTREPRENEUR_QUESTIONS.ent_q4.title}
          instruction={ENTREPRENEUR_QUESTIONS.ent_q4.instruction}
          options={ENTREPRENEUR_QUESTIONS.ent_q4.options || []}
          values={data.motivations || []}
          onChange={(vals) => store.setEntrepreneurAnswer('sectionB', 'motivations', vals)}
          otherValue={data.motivationsOther}
          onOtherChange={(val) => store.setEntrepreneurAnswer('sectionB', 'motivationsOther', val)}
          maxSelections={3}
          layout="grid2"
          testId="ent-question-q4"
        />
      </div>

      {/* Q5 */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#14121F] border border-[#0B0A0F]/12 dark:border-white/10 shadow-xs space-y-4">
        <CheckboxMulti
          id="ent-q5"
          name="ventureChallenges"
          title={ENTREPRENEUR_QUESTIONS.ent_q5.title}
          instruction={ENTREPRENEUR_QUESTIONS.ent_q5.instruction}
          options={ENTREPRENEUR_QUESTIONS.ent_q5.options || []}
          values={data.ventureChallenges || []}
          onChange={(vals) => store.setEntrepreneurAnswer('sectionB', 'ventureChallenges', vals)}
          otherValue={data.ventureChallengesOther}
          onOtherChange={(val) => store.setEntrepreneurAnswer('sectionB', 'ventureChallengesOther', val)}
          maxSelections={3}
          layout="grid2"
          testId="ent-question-q5"
        />
      </div>

      {/* Q6 - Likert Matrix: Difficulty Scale */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#14121F] border border-[#0B0A0F]/12 dark:border-white/10 shadow-xs space-y-4">
        <MatrixRating
          id="ent-q6"
          name="resourceDifficultyRatings"
          title={ENTREPRENEUR_QUESTIONS.ent_q6.title}
          instruction={ENTREPRENEUR_QUESTIONS.ent_q6.instruction}
          matrixRows={ENTREPRENEUR_QUESTIONS.ent_q6.matrixRows || []}
          scaleOptions={DIFFICULTY_SCALE}
          values={data.resourceDifficultyRatings || {}}
          onChange={(rowId, rating) => {
            const updated = { ...(data.resourceDifficultyRatings || {}), [rowId]: rating };
            store.setEntrepreneurAnswer('sectionB', 'resourceDifficultyRatings', updated);
          }}
          testId="ent-question-q6"
        />
      </div>
    </div>
  );
};

// SECTION C: FUNDING, MARKET ACCESS AND GROWTH
export const EntSectionC: React.FC = () => {
  const store = useSurveyStore();
  const data = store.responses.entrepreneur?.sectionC || {
    fundingChallenges: [],
    fundingChallengesOther: '',
    marketAccessChallenges: [],
    marketAccessChallengesOther: '',
    ecosystemSupportRatings: {},
  };

  return (
    <div className="space-y-8 animate-fadeIn" data-testid="ent-section-c">
      {/* Q7 */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#14121F] border border-[#0B0A0F]/12 dark:border-white/10 shadow-xs space-y-4">
        <CheckboxMulti
          id="ent-q7"
          name="fundingChallenges"
          title={ENTREPRENEUR_QUESTIONS.ent_q7.title}
          instruction={ENTREPRENEUR_QUESTIONS.ent_q7.instruction}
          options={ENTREPRENEUR_QUESTIONS.ent_q7.options || []}
          values={data.fundingChallenges || []}
          onChange={(vals) => store.setEntrepreneurAnswer('sectionC', 'fundingChallenges', vals)}
          otherValue={data.fundingChallengesOther}
          onOtherChange={(val) => store.setEntrepreneurAnswer('sectionC', 'fundingChallengesOther', val)}
          maxSelections={3}
          layout="grid2"
          testId="ent-question-q7"
        />
      </div>

      {/* Q8 */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#14121F] border border-[#0B0A0F]/12 dark:border-white/10 shadow-xs space-y-4">
        <CheckboxMulti
          id="ent-q8"
          name="marketAccessChallenges"
          title={ENTREPRENEUR_QUESTIONS.ent_q8.title}
          instruction={ENTREPRENEUR_QUESTIONS.ent_q8.instruction}
          options={ENTREPRENEUR_QUESTIONS.ent_q8.options || []}
          values={data.marketAccessChallenges || []}
          onChange={(vals) => store.setEntrepreneurAnswer('sectionC', 'marketAccessChallenges', vals)}
          otherValue={data.marketAccessChallengesOther}
          onOtherChange={(val) => store.setEntrepreneurAnswer('sectionC', 'marketAccessChallengesOther', val)}
          maxSelections={3}
          layout="grid2"
          testId="ent-question-q8"
        />
      </div>

      {/* Q9 - Likert Matrix: Agreement Scale */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#14121F] border border-[#0B0A0F]/12 dark:border-white/10 shadow-xs space-y-4">
        <MatrixRating
          id="ent-q9"
          name="ecosystemSupportRatings"
          title={ENTREPRENEUR_QUESTIONS.ent_q9.title}
          instruction={ENTREPRENEUR_QUESTIONS.ent_q9.instruction}
          matrixRows={ENTREPRENEUR_QUESTIONS.ent_q9.matrixRows || []}
          scaleOptions={AGREEMENT_SCALE}
          values={data.ecosystemSupportRatings || {}}
          onChange={(rowId, rating: LikertRating) => {
            const updated = { ...(data.ecosystemSupportRatings || {}), [rowId]: rating };
            store.setEntrepreneurAnswer('sectionC', 'ecosystemSupportRatings', updated);
          }}
          testId="ent-question-q9"
        />
      </div>
    </div>
  );
};

// SECTION D: EDUCATION, TALENT AND ENTREPRENEURIAL SUPPORT
export const EntSectionD: React.FC = () => {
  const store = useSurveyStore();
  const data = store.responses.entrepreneur?.sectionD || {
    academicInstitutionSupport: '',
    academicInstitutionSupportOther: '',
    talentChallenges: [],
    talentChallengesOther: '',
  };

  return (
    <div className="space-y-8 animate-fadeIn" data-testid="ent-section-d">
      {/* Q10 */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#14121F] border border-[#0B0A0F]/12 dark:border-white/10 shadow-xs space-y-4">
        <RadioSingle
          id="ent-q10"
          name="academicInstitutionSupport"
          title={ENTREPRENEUR_QUESTIONS.ent_q10.title}
          instruction={ENTREPRENEUR_QUESTIONS.ent_q10.instruction}
          options={ENTREPRENEUR_QUESTIONS.ent_q10.options || []}
          value={data.academicInstitutionSupport}
          onChange={(val) => store.setEntrepreneurAnswer('sectionD', 'academicInstitutionSupport', val)}
          otherValue={data.academicInstitutionSupportOther}
          onOtherChange={(val) => store.setEntrepreneurAnswer('sectionD', 'academicInstitutionSupportOther', val)}
          testId="ent-question-q10"
        />
      </div>

      {/* Q11 */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#14121F] border border-[#0B0A0F]/12 dark:border-white/10 shadow-xs space-y-4">
        <CheckboxMulti
          id="ent-q11"
          name="talentChallenges"
          title={ENTREPRENEUR_QUESTIONS.ent_q11.title}
          instruction={ENTREPRENEUR_QUESTIONS.ent_q11.instruction}
          options={ENTREPRENEUR_QUESTIONS.ent_q11.options || []}
          values={data.talentChallenges || []}
          onChange={(vals) => store.setEntrepreneurAnswer('sectionD', 'talentChallenges', vals)}
          otherValue={data.talentChallengesOther}
          onOtherChange={(val) => store.setEntrepreneurAnswer('sectionD', 'talentChallengesOther', val)}
          maxSelections={3}
          layout="grid2"
          testId="ent-question-q11"
        />
      </div>
    </div>
  );
};

// SECTION E: ENTREPRENEURIAL ECOSYSTEM CHALLENGES AND SOLUTIONS
export const EntSectionE: React.FC = () => {
  const store = useSurveyStore();
  const data = store.responses.entrepreneur?.sectionE || {
    systemicChallenges: [],
    systemicChallengesOther: '',
    personalExperienceChallenge: '',
    ecosystemProposedSolution: '',
  };

  return (
    <div className="space-y-8 animate-fadeIn" data-testid="ent-section-e">
      {/* Q12 */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#14121F] border border-[#0B0A0F]/12 dark:border-white/10 shadow-xs space-y-4">
        <CheckboxMulti
          id="ent-q12"
          name="systemicChallenges"
          title={ENTREPRENEUR_QUESTIONS.ent_q12.title}
          instruction={ENTREPRENEUR_QUESTIONS.ent_q12.instruction}
          options={ENTREPRENEUR_QUESTIONS.ent_q12.options || []}
          values={data.systemicChallenges || []}
          onChange={(vals) => store.setEntrepreneurAnswer('sectionE', 'systemicChallenges', vals)}
          otherValue={data.systemicChallengesOther}
          onOtherChange={(val) => store.setEntrepreneurAnswer('sectionE', 'systemicChallengesOther', val)}
          maxSelections={3}
          layout="grid2"
          testId="ent-question-q12"
        />
      </div>

      {/* Q13 */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#14121F] border border-[#0B0A0F]/12 dark:border-white/10 shadow-xs space-y-4">
        <GuidedTextarea
          id="ent-q13"
          name="personalExperienceChallenge"
          title={ENTREPRENEUR_QUESTIONS.ent_q13.title}
          instruction={ENTREPRENEUR_QUESTIONS.ent_q13.instruction}
          contextNote={ENTREPRENEUR_QUESTIONS.ent_q13.contextNote}
          guidingPrompts={ENTREPRENEUR_QUESTIONS.ent_q13.guidingPrompts}
          placeholder={ENTREPRENEUR_QUESTIONS.ent_q13.placeholder}
          value={data.personalExperienceChallenge}
          onChange={(val) => store.setEntrepreneurAnswer('sectionE', 'personalExperienceChallenge', val)}
          minLength={30}
          testId="ent-question-q13"
        />
      </div>

      {/* Q14 */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#14121F] border border-[#0B0A0F]/12 dark:border-white/10 shadow-xs space-y-4">
        <GuidedTextarea
          id="ent-q14"
          name="ecosystemProposedSolution"
          title={ENTREPRENEUR_QUESTIONS.ent_q14.title}
          instruction={ENTREPRENEUR_QUESTIONS.ent_q14.instruction}
          contextNote={ENTREPRENEUR_QUESTIONS.ent_q14.contextNote}
          guidingPrompts={ENTREPRENEUR_QUESTIONS.ent_q14.guidingPrompts}
          placeholder={ENTREPRENEUR_QUESTIONS.ent_q14.placeholder}
          value={data.ecosystemProposedSolution}
          onChange={(val) => store.setEntrepreneurAnswer('sectionE', 'ecosystemProposedSolution', val)}
          minLength={30}
          testId="ent-question-q14"
        />
      </div>
    </div>
  );
};

// SECTION F: SUPPORT AND COLLABORATIVE OPPORTUNITIES
export const EntSectionF: React.FC = () => {
  const store = useSurveyStore();
  const data = store.responses.entrepreneur?.sectionF || {
    supportDifference: [],
    supportDifferenceOther: '',
    collaborativeInterest: '',
  };

  const subQ = ENTREPRENEUR_QUESTIONS.ent_q15.subQuestions?.[0];

  return (
    <div className="space-y-8 animate-fadeIn" data-testid="ent-section-f">
      {/* Q15 Main */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#14121F] border border-[#0B0A0F]/12 dark:border-white/10 shadow-xs space-y-4">
        <CheckboxMulti
          id="ent-q15"
          name="supportDifference"
          title={ENTREPRENEUR_QUESTIONS.ent_q15.title}
          instruction={ENTREPRENEUR_QUESTIONS.ent_q15.instruction}
          options={ENTREPRENEUR_QUESTIONS.ent_q15.options || []}
          values={data.supportDifference || []}
          onChange={(vals) => store.setEntrepreneurAnswer('sectionF', 'supportDifference', vals)}
          otherValue={data.supportDifferenceOther}
          onOtherChange={(val) => store.setEntrepreneurAnswer('sectionF', 'supportDifferenceOther', val)}
          maxSelections={3}
          layout="grid2"
          testId="ent-question-q15"
        />
      </div>

      {/* Q15 Sub */}
      {subQ && (
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#14121F] border border-[#0B0A0F]/12 dark:border-white/10 shadow-xs space-y-4">
          <RadioSingle
            id="ent-q15-sub"
            name="collaborativeInterest"
            title={subQ.title}
            instruction={subQ.instruction}
            options={subQ.options || []}
            value={data.collaborativeInterest}
            onChange={(val) => store.setEntrepreneurAnswer('sectionF', 'collaborativeInterest', val)}
            testId="ent-question-q15-sub"
          />
        </div>
      )}
    </div>
  );
};
