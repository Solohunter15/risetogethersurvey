import React from 'react';
import { useSurveyStore } from '../../../store/surveyStore';
import { ORGANIZATION_QUESTIONS } from '../../../data/organizationSurveyContent';
import { RadioSingle } from '../../questions/RadioSingle';
import { CheckboxMulti } from '../../questions/CheckboxMulti';
import { GuidedTextarea } from '../../questions/GuidedTextarea';

// SECTION B: INDUSTRY EXPECTATIONS AND STUDENT READINESS
export const OrgSectionB: React.FC = () => {
  const store = useSurveyStore();
  const data = store.responses.organization?.sectionB || {
    expectedCapabilities: [],
    expectedCapabilitiesOther: '',
    freshGraduateReadiness: '',
    commonGaps: [],
    commonGapsOther: '',
    evaluationMethods: [],
    evaluationMethodsOther: '',
  };

  return (
    <div className="space-y-8 animate-fadeIn" data-testid="org-section-b">
      {/* Q4 */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#14121F] border border-[#0B0A0F]/12 dark:border-white/10 shadow-xs space-y-4">
        <CheckboxMulti
          id="org-q4"
          name="expectedCapabilities"
          title={ORGANIZATION_QUESTIONS.org_q4.title}
          instruction={ORGANIZATION_QUESTIONS.org_q4.instruction}
          options={ORGANIZATION_QUESTIONS.org_q4.options || []}
          values={data.expectedCapabilities || []}
          onChange={(vals) => store.setOrganizationAnswer('sectionB', 'expectedCapabilities', vals)}
          otherValue={data.expectedCapabilitiesOther}
          onOtherChange={(val) => store.setOrganizationAnswer('sectionB', 'expectedCapabilitiesOther', val)}
          maxSelections={5}
          layout="grid2"
          testId="org-question-q4"
        />
      </div>

      {/* Q5 */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#14121F] border border-[#0B0A0F]/12 dark:border-white/10 shadow-xs space-y-4">
        <RadioSingle
          id="org-q5"
          name="freshGraduateReadiness"
          title={ORGANIZATION_QUESTIONS.org_q5.title}
          instruction={ORGANIZATION_QUESTIONS.org_q5.instruction}
          options={ORGANIZATION_QUESTIONS.org_q5.options || []}
          value={data.freshGraduateReadiness}
          onChange={(val) => store.setOrganizationAnswer('sectionB', 'freshGraduateReadiness', val)}
          testId="org-question-q5"
        />
      </div>

      {/* Q6 */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#14121F] border border-[#0B0A0F]/12 dark:border-white/10 shadow-xs space-y-4">
        <CheckboxMulti
          id="org-q6"
          name="commonGaps"
          title={ORGANIZATION_QUESTIONS.org_q6.title}
          instruction={ORGANIZATION_QUESTIONS.org_q6.instruction}
          options={ORGANIZATION_QUESTIONS.org_q6.options || []}
          values={data.commonGaps || []}
          onChange={(vals) => store.setOrganizationAnswer('sectionB', 'commonGaps', vals)}
          otherValue={data.commonGapsOther}
          onOtherChange={(val) => store.setOrganizationAnswer('sectionB', 'commonGapsOther', val)}
          maxSelections={3}
          layout="grid2"
          testId="org-question-q6"
        />
      </div>

      {/* Q7 */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#14121F] border border-[#0B0A0F]/12 dark:border-white/10 shadow-xs space-y-4">
        <CheckboxMulti
          id="org-q7"
          name="evaluationMethods"
          title={ORGANIZATION_QUESTIONS.org_q7.title}
          instruction={ORGANIZATION_QUESTIONS.org_q7.instruction}
          options={ORGANIZATION_QUESTIONS.org_q7.options || []}
          values={data.evaluationMethods || []}
          onChange={(vals) => store.setOrganizationAnswer('sectionB', 'evaluationMethods', vals)}
          otherValue={data.evaluationMethodsOther}
          onOtherChange={(val) => store.setOrganizationAnswer('sectionB', 'evaluationMethodsOther', val)}
          layout="grid2"
          testId="org-question-q7"
        />
      </div>
    </div>
  );
};

// SECTION C: INDUSTRY-ACADEMIA COLLABORATION
export const OrgSectionC: React.FC = () => {
  const store = useSurveyStore();
  const data = store.responses.organization?.sectionC || {
    collaborationChallenges: [],
    collaborationChallengesOther: '',
    preventionReasons: [],
    preventionReasonsOther: '',
    collaborationInterest: '',
  };

  return (
    <div className="space-y-8 animate-fadeIn" data-testid="org-section-c">
      {/* Q8 */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#14121F] border border-[#0B0A0F]/12 dark:border-white/10 shadow-xs space-y-4">
        <CheckboxMulti
          id="org-q8"
          name="collaborationChallenges"
          title={ORGANIZATION_QUESTIONS.org_q8.title}
          instruction={ORGANIZATION_QUESTIONS.org_q8.instruction}
          options={ORGANIZATION_QUESTIONS.org_q8.options || []}
          values={data.collaborationChallenges || []}
          onChange={(vals) => store.setOrganizationAnswer('sectionC', 'collaborationChallenges', vals)}
          otherValue={data.collaborationChallengesOther}
          onOtherChange={(val) => store.setOrganizationAnswer('sectionC', 'collaborationChallengesOther', val)}
          maxSelections={3}
          layout="grid2"
          testId="org-question-q8"
        />
      </div>

      {/* Q9 */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#14121F] border border-[#0B0A0F]/12 dark:border-white/10 shadow-xs space-y-4">
        <CheckboxMulti
          id="org-q9"
          name="preventionReasons"
          title={ORGANIZATION_QUESTIONS.org_q9.title}
          instruction={ORGANIZATION_QUESTIONS.org_q9.instruction}
          options={ORGANIZATION_QUESTIONS.org_q9.options || []}
          values={data.preventionReasons || []}
          onChange={(vals) => store.setOrganizationAnswer('sectionC', 'preventionReasons', vals)}
          otherValue={data.preventionReasonsOther}
          onOtherChange={(val) => store.setOrganizationAnswer('sectionC', 'preventionReasonsOther', val)}
          maxSelections={3}
          layout="grid2"
          testId="org-question-q9"
        />
      </div>

      {/* Q10 */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#14121F] border border-[#0B0A0F]/12 dark:border-white/10 shadow-xs space-y-4">
        <RadioSingle
          id="org-q10"
          name="collaborationInterest"
          title={ORGANIZATION_QUESTIONS.org_q10.title}
          instruction={ORGANIZATION_QUESTIONS.org_q10.instruction}
          options={ORGANIZATION_QUESTIONS.org_q10.options || []}
          value={data.collaborationInterest}
          onChange={(val) => store.setOrganizationAnswer('sectionC', 'collaborationInterest', val)}
          testId="org-question-q10"
        />
      </div>
    </div>
  );
};

// SECTION D: OPPORTUNITIES AND COLLECTIVE ACTION
export const OrgSectionD: React.FC = () => {
  const store = useSurveyStore();
  const data = store.responses.organization?.sectionD || {
    potentialOpportunities: [],
    potentialOpportunitiesOther: '',
    collaborationAreas: [],
    collaborationAreasOther: '',
    encouragementFactors: [],
    encouragementFactorsOther: '',
  };

  return (
    <div className="space-y-8 animate-fadeIn" data-testid="org-section-d">
      {/* Q11 */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#14121F] border border-[#0B0A0F]/12 dark:border-white/10 shadow-xs space-y-4">
        <CheckboxMulti
          id="org-q11"
          name="potentialOpportunities"
          title={ORGANIZATION_QUESTIONS.org_q11.title}
          instruction={ORGANIZATION_QUESTIONS.org_q11.instruction}
          options={ORGANIZATION_QUESTIONS.org_q11.options || []}
          values={data.potentialOpportunities || []}
          onChange={(vals) => store.setOrganizationAnswer('sectionD', 'potentialOpportunities', vals)}
          otherValue={data.potentialOpportunitiesOther}
          onOtherChange={(val) => store.setOrganizationAnswer('sectionD', 'potentialOpportunitiesOther', val)}
          layout="grid2"
          testId="org-question-q11"
        />
      </div>

      {/* Q12 */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#14121F] border border-[#0B0A0F]/12 dark:border-white/10 shadow-xs space-y-4">
        <CheckboxMulti
          id="org-q12"
          name="collaborationAreas"
          title={ORGANIZATION_QUESTIONS.org_q12.title}
          instruction={ORGANIZATION_QUESTIONS.org_q12.instruction}
          options={ORGANIZATION_QUESTIONS.org_q12.options || []}
          values={data.collaborationAreas || []}
          onChange={(vals) => store.setOrganizationAnswer('sectionD', 'collaborationAreas', vals)}
          otherValue={data.collaborationAreasOther}
          onOtherChange={(val) => store.setOrganizationAnswer('sectionD', 'collaborationAreasOther', val)}
          maxSelections={3}
          layout="grid2"
          testId="org-question-q12"
        />
      </div>

      {/* Q13 */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#14121F] border border-[#0B0A0F]/12 dark:border-white/10 shadow-xs space-y-4">
        <CheckboxMulti
          id="org-q13"
          name="encouragementFactors"
          title={ORGANIZATION_QUESTIONS.org_q13.title}
          instruction={ORGANIZATION_QUESTIONS.org_q13.instruction}
          options={ORGANIZATION_QUESTIONS.org_q13.options || []}
          values={data.encouragementFactors || []}
          onChange={(vals) => store.setOrganizationAnswer('sectionD', 'encouragementFactors', vals)}
          otherValue={data.encouragementFactorsOther}
          onOtherChange={(val) => store.setOrganizationAnswer('sectionD', 'encouragementFactorsOther', val)}
          maxSelections={3}
          layout="grid2"
          testId="org-question-q13"
        />
      </div>
    </div>
  );
};

// SECTION E: ORGANISATIONAL PERSPECTIVES AND SOLUTIONS
export const OrgSectionE: React.FC = () => {
  const store = useSurveyStore();
  const data = store.responses.organization?.sectionE || {
    majorEcosystemProblem: '',
    practicalChangeProposal: '',
  };

  return (
    <div className="space-y-8 animate-fadeIn" data-testid="org-section-e">
      {/* Q14 */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#14121F] border border-[#0B0A0F]/12 dark:border-white/10 shadow-xs space-y-4">
        <GuidedTextarea
          id="org-q14"
          name="majorEcosystemProblem"
          title={ORGANIZATION_QUESTIONS.org_q14.title}
          instruction={ORGANIZATION_QUESTIONS.org_q14.instruction}
          contextNote={ORGANIZATION_QUESTIONS.org_q14.contextNote}
          guidingPrompts={ORGANIZATION_QUESTIONS.org_q14.guidingPrompts}
          placeholder={ORGANIZATION_QUESTIONS.org_q14.placeholder}
          value={data.majorEcosystemProblem}
          onChange={(val) => store.setOrganizationAnswer('sectionE', 'majorEcosystemProblem', val)}
          testId="org-question-q14"
        />
      </div>

      {/* Q15 */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#14121F] border border-[#0B0A0F]/12 dark:border-white/10 shadow-xs space-y-4">
        <GuidedTextarea
          id="org-q15"
          name="practicalChangeProposal"
          title={ORGANIZATION_QUESTIONS.org_q15.title}
          instruction={ORGANIZATION_QUESTIONS.org_q15.instruction}
          contextNote={ORGANIZATION_QUESTIONS.org_q15.contextNote}
          guidingPrompts={ORGANIZATION_QUESTIONS.org_q15.guidingPrompts}
          placeholder={ORGANIZATION_QUESTIONS.org_q15.placeholder}
          value={data.practicalChangeProposal}
          onChange={(val) => store.setOrganizationAnswer('sectionE', 'practicalChangeProposal', val)}
          testId="org-question-q15"
        />
      </div>
    </div>
  );
};
