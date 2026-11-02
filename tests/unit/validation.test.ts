import assert from 'node:assert/strict';
import {
  handleMultiSelectToggle,
  validateSectionA,
  validateSectionB,
  validateSectionC,
  validateSectionD,
  validateSectionE,
  validateSectionF,
  validateStep,
  validateSurvey,
} from '../../src/utils/validation';
import { createInitialSurveyResponse } from '../../src/data/surveyContent';

console.log('=== Starting Validation Engine Unit Tests ===');

// 1. handleMultiSelectToggle tests
console.log('Testing handleMultiSelectToggle...');

// Normal selection
let selections = handleMultiSelectToggle([], 'opt1', 3);
assert.deepEqual(selections, ['opt1'], 'Should add item to empty array');

selections = handleMultiSelectToggle(['opt1'], 'opt2', 3);
assert.deepEqual(selections, ['opt1', 'opt2'], 'Should add second item');

selections = handleMultiSelectToggle(['opt1', 'opt2'], 'opt3', 3);
assert.deepEqual(selections, ['opt1', 'opt2', 'opt3'], 'Should add third item (reaches cap)');

// Attempt 4th selection -> should be rejected by cap
const cappedSelections = handleMultiSelectToggle(selections, 'opt4', 3);
assert.deepEqual(cappedSelections, ['opt1', 'opt2', 'opt3'], 'Should reject 4th selection when capped at 3');

// Deselection
selections = handleMultiSelectToggle(selections, 'opt2', 3);
assert.deepEqual(selections, ['opt1', 'opt3'], 'Should deselect opt2');

// Mutual exclusivity test: selecting an exclusive option clears regular options
const exclusiveSelections = handleMultiSelectToggle(['opt1', 'opt3'], 'none', 3, true, ['none']);
assert.deepEqual(exclusiveSelections, ['none'], 'Selecting exclusive option should clear other selections');

// Selecting regular option should remove exclusive option
const afterExclusive = handleMultiSelectToggle(['none'], 'opt1', 3, false, ['none']);
assert.deepEqual(afterExclusive, ['opt1'], 'Selecting normal option should remove exclusive option');

console.log('✓ handleMultiSelectToggle PASSED');

// 2. Section A Validation
console.log('Testing Section A Validation...');
const emptyResponse = createInitialSurveyResponse();
let resA = validateSectionA(emptyResponse.sectionA);
assert.equal(resA.isValid, false, 'Empty Section A must be invalid');
assert.ok(resA.errors['sectionA.academicStatus'], 'Must require academicStatus');
assert.ok(resA.errors['sectionA.university'], 'Must require university');
assert.ok(resA.errors['sectionA.programme'], 'Must require programme');
assert.ok(resA.errors['sectionA.communities'], 'Must require communities');
assert.ok(resA.errors['sectionA.involvementLevel'], 'Must require involvementLevel');

// Valid Section A
const validSecA = {
  academicStatus: 'third_year' as const,
  academicStatusOther: '',
  university: 'ktu' as const,
  universityOther: '',
  college: 'CET',
  programme: 'B.Tech CSE',
  communities: ['foss' as const],
  communitiesOther: '',
  involvementLevel: 'active_member' as const,
};
resA = validateSectionA(validSecA);
assert.equal(resA.isValid, true, 'Fully answered Section A must be valid');
assert.equal(Object.keys(resA.errors).length, 0);

// "Other" validation
const secAWithOtherEmpty = {
  ...validSecA,
  academicStatus: 'other' as const,
  academicStatusOther: '',
};
resA = validateSectionA(secAWithOtherEmpty);
assert.equal(resA.isValid, false);
assert.ok(resA.errors['sectionA.academicStatusOther'], 'Must require academicStatusOther when status is other');

console.log('✓ Section A Validation PASSED');

// 3. Section B Validation
console.log('Testing Section B Validation...');
let resB = validateSectionB(emptyResponse.sectionB);
// Empty overallExperience
assert.equal(resB.isValid, false);
assert.ok(resB.errors['sectionB.overallExperience']);

// Max 3 cap violation test
const overSelectedB = {
  ...emptyResponse.sectionB,
  overallExperience: ['exam_focused', 'adequate_faculty_support', 'freedom_to_explore', 'soft_skills_development'] as any,
  ratings: {
    A_real_world_problems: '4' as const,
    B_practical_opportunities: '4' as const,
    C_faculty_guidance: '4' as const,
    D_critical_thinking: '4' as const,
    E_beyond_curriculum: '4' as const,
    F_collaboration_teamwork: '4' as const,
  },
};
resB = validateSectionB(overSelectedB);
assert.equal(resB.isValid, false);
assert.equal(resB.errors['sectionB.overallExperience'], 'You can select up to 3 options only.');

// Valid Section B
const validSecB = {
  overallExperience: ['exam_focused', 'freedom_to_explore'] as any,
  overallExperienceOther: '',
  ratings: {
    A_real_world_problems: '4' as const,
    B_practical_opportunities: '4' as const,
    C_faculty_guidance: '4' as const,
    D_critical_thinking: '4' as const,
    E_beyond_curriculum: '4' as const,
    F_collaboration_teamwork: '4' as const,
  },
};
resB = validateSectionB(validSecB);
assert.equal(resB.isValid, true, 'Valid Section B must pass');

console.log('✓ Section B Validation PASSED');

// 4. Section C Validation: Conditional Q7 Skipping
console.log('Testing Section C Validation & Conditional Logic...');
// Case 1: internshipStatus = 'none' -> Q7 skipped
const secCNone = {
  internshipStatus: 'none' as const,
  qualityRatings: null,
  barriers: ['no_barriers' as const],
  barriersOther: '',
};
let resC = validateSectionC(secCNone);
assert.equal(resC.isValid, true, 'Section C with none internship status must be valid even without qualityRatings');

// Case 2: internshipStatus = 'completed' -> Q7 required
const secCCompletedNoRatings = {
  internshipStatus: 'completed' as const,
  qualityRatings: null,
  barriers: ['lack_awareness' as const],
  barriersOther: '',
};
resC = validateSectionC(secCCompletedNoRatings);
assert.equal(resC.isValid, false, 'Completed internship without quality ratings must be invalid');
assert.ok(resC.errors['sectionC.qualityRatings']);

// Case 3: internshipStatus = 'completed' with all 6 ratings
const secCCompletedWithRatings = {
  internshipStatus: 'completed' as const,
  qualityRatings: {
    A_practical_tools: '4' as const,
    B_meaningful_projects: '4' as const,
    C_mentor_guidance: '4' as const,
    D_apply_academic_knowledge: '4' as const,
    E_evaluated_by_tasks: '4' as const,
    F_career_understanding: '4' as const,
  },
  barriers: ['lack_awareness' as const],
  barriersOther: '',
};
resC = validateSectionC(secCCompletedWithRatings);
assert.equal(resC.isValid, true, 'Completed internship with ratings must be valid');

// Case 4: Barriers > 3
const secCOverBarriers = {
  ...secCCompletedWithRatings,
  barriers: ['lack_awareness', 'finding_genuine', 'paid_internship_scams', 'financial_constraints'] as any,
};
resC = validateSectionC(secCOverBarriers);
assert.equal(resC.isValid, false);
assert.equal(resC.errors['sectionC.barriers'], 'You can select up to 3 barriers only.');

console.log('✓ Section C Validation & Conditional Branching PASSED');

// 5. Section D Validation
console.log('Testing Section D Validation...');
const validSecD = {
  valueGained: ['practical_technical_skills', 'mentorship'] as any,
  valueGainedOther: '',
  challengesFaced: ['academic_workload'] as any,
  challengesFacedOther: '',
};
const resD = validateSectionD(validSecD);
assert.equal(resD.isValid, true);
console.log('✓ Section D Validation PASSED');

// 6. Section E Validation: Unified Max 3 Cap
console.log('Testing Section E Validation...');
const validSecE = {
  experiencedChallenges: ['exam_delays', 'limited_lab_library', 'insufficient_mentorship'] as any,
  experiencedChallengesOther: '',
  improvements: ['project_based_learning', 'verified_internships'] as any,
  improvementsOther: '',
};
let resE = validateSectionE(validSecE);
assert.equal(resE.isValid, true, 'Valid Section E with 3 challenges must pass');

const overChallengesE = {
  ...validSecE,
  experiencedChallenges: ['exam_delays', 'limited_lab_library', 'insufficient_mentorship', 'heavy_workload'] as any,
};
resE = validateSectionE(overChallengesE);
assert.equal(resE.isValid, false, 'Over 3 challenges must fail');
assert.equal(resE.errors['sectionE.experiencedChallenges'], 'You can select up to 3 challenges across all categories.');
console.log('✓ Section E Validation PASSED');

// 7. Section F Validation: Text minimum lengths
console.log('Testing Section F Validation...');
const shortTextSecF = {
  majorProblem: { description: 'short' },
  proposedSolution: { description: 'short' },
  initiativeInterest: 'design_implement' as const,
  contributionAreas: [],
  contributionAreasOther: '',
};
let resF = validateSectionF(shortTextSecF);
assert.equal(resF.isValid, false, 'Short narratives (< 10 chars) must fail');
assert.ok(resF.errors['sectionF.majorProblem'].includes('minimum 10 characters'));
assert.ok(resF.errors['sectionF.proposedSolution'].includes('minimum 10 characters'));

const validSecF = {
  majorProblem: { description: 'Outdated lab software that does not run modern web tooling.' },
  proposedSolution: { description: 'Introduce credit-earning industry open-source internships.' },
  initiativeInterest: 'design_implement' as const,
  contributionAreas: ['opensource_tech' as const],
  contributionAreasOther: '',
};
resF = validateSectionF(validSecF);
assert.equal(resF.isValid, true, 'Valid Section F must pass');
console.log('✓ Section F Validation PASSED');

// 8. Global validateSurvey
console.log('Testing Global validateSurvey...');
const fullyPopulatedSurvey = {
  metadata: emptyResponse.metadata,
  sectionA: validSecA,
  sectionB: validSecB,
  sectionC: secCCompletedWithRatings,
  sectionD: validSecD,
  sectionE: validSecE,
  sectionF: validSecF,
};
const fullSurveyResult = validateSurvey(fullyPopulatedSurvey);
assert.equal(fullSurveyResult.isValid, true, 'Fully valid survey must pass validateSurvey');
assert.equal(fullSurveyResult.totalErrors, 0);

console.log('=== ALL VALIDATION TESTS PASSED ===');
