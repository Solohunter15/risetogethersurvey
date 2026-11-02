import { createInitialSurveyResponse, SURVEY_METADATA, SURVEY_SECTIONS, SURVEY_QUESTIONS } from '../../src/data/surveyContent';
import assert from 'node:assert/strict';

console.log('=== Starting Stress-Test on Survey Data & createInitialSurveyResponse ===');

// 1. Factory Function Verification
const resp1 = createInitialSurveyResponse();

// Metadata checks
assert.ok(resp1.metadata, 'metadata must exist');
assert.ok(!isNaN(Date.parse(resp1.metadata.startedAt)), 'metadata.startedAt must be a valid ISO date');
assert.equal(resp1.metadata.version, SURVEY_METADATA.version, 'metadata.version must match SURVEY_METADATA');
assert.equal(resp1.metadata.language, 'en', 'metadata.language must be "en"');
assert.ok(typeof resp1.metadata.clientTimestamp === 'number' && resp1.metadata.clientTimestamp > 0, 'metadata.clientTimestamp must be a positive number');

// Section A checks
assert.ok(resp1.sectionA, 'sectionA must exist');
assert.equal(resp1.sectionA.academicStatus, '', 'academicStatus must default to empty string');
assert.equal(resp1.sectionA.academicStatusOther, '', 'academicStatusOther must default to empty string');
assert.equal(resp1.sectionA.university, '', 'university must default to empty string');
assert.equal(resp1.sectionA.universityOther, '', 'universityOther must default to empty string');
assert.equal(resp1.sectionA.college, '', 'college must default to empty string');
assert.equal(resp1.sectionA.programme, '', 'programme must default to empty string');
assert.ok(Array.isArray(resp1.sectionA.communities), 'communities must be an array');
assert.equal(resp1.sectionA.communities.length, 0, 'communities array must be empty');
assert.equal(resp1.sectionA.communitiesOther, '', 'communitiesOther must default to empty string');
assert.equal(resp1.sectionA.involvementLevel, '', 'involvementLevel must default to empty string');

// Section B checks
assert.ok(resp1.sectionB, 'sectionB must exist');
assert.ok(Array.isArray(resp1.sectionB.overallExperience), 'overallExperience must be an array');
assert.equal(resp1.sectionB.overallExperience.length, 0, 'overallExperience must be empty');
assert.equal(resp1.sectionB.overallExperienceOther, '', 'overallExperienceOther must default to empty string');
assert.ok(resp1.sectionB.ratings, 'ratings object must exist');
const expectedRatingKeys = [
  'A_real_world_problems',
  'B_practical_opportunities',
  'C_faculty_guidance',
  'D_critical_thinking',
  'E_beyond_curriculum',
  'F_collaboration_teamwork',
];
assert.deepEqual(Object.keys(resp1.sectionB.ratings).sort(), expectedRatingKeys.sort(), 'Section B ratings must have all 6 statements');
for (const key of expectedRatingKeys) {
  assert.equal(resp1.sectionB.ratings[key], 'NA', `Rating ${key} must default to "NA"`);
}

// Section C checks
assert.ok(resp1.sectionC, 'sectionC must exist');
assert.equal(resp1.sectionC.internshipStatus, '', 'internshipStatus must default to empty string');
assert.equal(resp1.sectionC.qualityRatings, null, 'qualityRatings must default to null when no internship selected');
assert.ok(Array.isArray(resp1.sectionC.barriers), 'barriers must be an array');
assert.equal(resp1.sectionC.barriers.length, 0, 'barriers must be empty');
assert.equal(resp1.sectionC.barriersOther, '', 'barriersOther must default to empty string');

// Section D checks
assert.ok(resp1.sectionD, 'sectionD must exist');
assert.ok(Array.isArray(resp1.sectionD.valueGained), 'valueGained must be an array');
assert.equal(resp1.sectionD.valueGained.length, 0, 'valueGained must be empty');
assert.equal(resp1.sectionD.valueGainedOther, '', 'valueGainedOther must default to empty string');
assert.ok(Array.isArray(resp1.sectionD.challengesFaced), 'challengesFaced must be an array');
assert.equal(resp1.sectionD.challengesFaced.length, 0, 'challengesFaced must be empty');
assert.equal(resp1.sectionD.challengesFacedOther, '', 'challengesFacedOther must default to empty string');

// Section E checks
assert.ok(resp1.sectionE, 'sectionE must exist');
assert.ok(Array.isArray(resp1.sectionE.experiencedChallenges), 'experiencedChallenges must be an array');
assert.equal(resp1.sectionE.experiencedChallenges.length, 0, 'experiencedChallenges must be empty');
assert.equal(resp1.sectionE.experiencedChallengesOther, '', 'experiencedChallengesOther must default to empty string');
assert.ok(Array.isArray(resp1.sectionE.improvements), 'improvements must be an array');
assert.equal(resp1.sectionE.improvements.length, 0, 'improvements must be empty');
assert.equal(resp1.sectionE.improvementsOther, '', 'improvementsOther must default to empty string');

// Section F checks
assert.ok(resp1.sectionF, 'sectionF must exist');
assert.ok(resp1.sectionF.majorProblem && typeof resp1.sectionF.majorProblem.description === 'string', 'majorProblem.description must be string');
assert.equal(resp1.sectionF.majorProblem.description, '', 'majorProblem.description must be empty string');
assert.ok(resp1.sectionF.proposedSolution && typeof resp1.sectionF.proposedSolution.description === 'string', 'proposedSolution.description must be string');
assert.equal(resp1.sectionF.proposedSolution.description, '', 'proposedSolution.description must be empty string');
assert.equal(resp1.sectionF.initiativeInterest, '', 'initiativeInterest must default to empty string');
assert.ok(Array.isArray(resp1.sectionF.contributionAreas), 'contributionAreas must be an array');
assert.equal(resp1.sectionF.contributionAreas.length, 0, 'contributionAreas must be empty');
assert.equal(resp1.sectionF.contributionAreasOther, '', 'contributionAreasOther must default to empty string');

console.log('✓ Initial response structure and default values assertion PASSED');

// 2. Object Isolation & Immutability Test
const resp2 = createInitialSurveyResponse();
resp1.sectionA.communities.push('foss');
assert.equal(resp2.sectionA.communities.length, 0, 'Mutating resp1.sectionA.communities must not affect resp2');

resp1.sectionB.ratings['A_real_world_problems'] = '5';
assert.equal(resp2.sectionB.ratings['A_real_world_problems'], 'NA', 'Mutating resp1.sectionB.ratings must not affect resp2');

resp1.sectionF.majorProblem.description = 'Mutated problem';
assert.equal(resp2.sectionF.majorProblem.description, '', 'Mutating resp1.sectionF.majorProblem must not affect resp2');

console.log('✓ Instance reference isolation PASSED');

// 3. High Volume Performance / Stress Loop
const startTime = performance.now();
const iterations = 50000;
for (let i = 0; i < iterations; i++) {
  const r = createInitialSurveyResponse();
  if (i === 0) assert.ok(r.metadata.version);
}
const elapsedMs = performance.now() - startTime;
console.log(`✓ High-volume stress test: created ${iterations} responses in ${elapsedMs.toFixed(2)}ms (${(elapsedMs / iterations * 1000).toFixed(2)}µs per response)`);
assert.ok(elapsedMs < 2000, '50,000 response instantiations must take under 2 seconds');

// 4. Survey Questions & Verbatim Content Integrity Check
assert.equal(SURVEY_SECTIONS.length, 6, 'There must be exactly 6 survey sections (A through F)');
const questionKeys = Object.keys(SURVEY_QUESTIONS);
assert.equal(questionKeys.length, 15, 'There must be exactly 15 questions (q1 to q15)');

for (let i = 1; i <= 15; i++) {
  const qKey = `q${i}`;
  assert.ok(SURVEY_QUESTIONS[qKey], `Question ${qKey} must exist`);
  assert.equal(SURVEY_QUESTIONS[qKey].number, i, `Question ${qKey} number must match ${i}`);
}

// Check Capped Multi-Choice Constraints
assert.equal(SURVEY_QUESTIONS.q4.maxSelections, 3, 'Q4 maxSelections must be 3');
assert.equal(SURVEY_QUESTIONS.q8.maxSelections, 3, 'Q8 maxSelections must be 3');
assert.equal(SURVEY_QUESTIONS.q9.maxSelections, 3, 'Q9 maxSelections must be 3');
assert.equal(SURVEY_QUESTIONS.q10.maxSelections, 3, 'Q10 maxSelections must be 3');
assert.equal(SURVEY_QUESTIONS.q11.maxSelections, 3, 'Q11 maxSelections must be 3');
assert.equal(SURVEY_QUESTIONS.q12.maxSelections, 3, 'Q12 maxSelections must be 3');

// Check Exclusive Options
const q3None = SURVEY_QUESTIONS.q3.options?.find(o => o.id === 'none');
assert.ok(q3None?.isExclusive, 'Q3 none option must be marked isExclusive');

const q8None = SURVEY_QUESTIONS.q8.options?.find(o => o.id === 'no_barriers');
assert.ok(q8None?.isExclusive, 'Q8 no_barriers option must be marked isExclusive');

const q9NoVal = SURVEY_QUESTIONS.q9.options?.find(o => o.id === 'no_value_yet');
const q9NotAssoc = SURVEY_QUESTIONS.q9.options?.find(o => o.id === 'not_associated');
assert.ok(q9NoVal?.isExclusive, 'Q9 no_value_yet must be isExclusive');
assert.ok(q9NotAssoc?.isExclusive, 'Q9 not_associated must be isExclusive');

const q10NoChal = SURVEY_QUESTIONS.q10.options?.find(o => o.id === 'no_challenges');
const q10NotAssoc = SURVEY_QUESTIONS.q10.options?.find(o => o.id === 'not_associated');
assert.ok(q10NoChal?.isExclusive, 'Q10 no_challenges must be isExclusive');
assert.ok(q10NotAssoc?.isExclusive, 'Q10 not_associated must be isExclusive');

const q11NoChal = SURVEY_QUESTIONS.q11.options?.find(o => o.id === 'no_challenges');
assert.ok(q11NoChal?.isExclusive, 'Q11 no_challenges must be isExclusive');

// Check Categories in Q11 (22 items across 4 categories)
assert.equal(SURVEY_QUESTIONS.q11.categories?.length, 4, 'Q11 must define 4 categories');
assert.equal(SURVEY_QUESTIONS.q11.options?.length, 22, 'Q11 must define 22 total options (including no_challenges and other)');

console.log('✓ Survey Questions and constraints integrity check PASSED');

// 5. JSON Roundtrip
const jsonSerialized = JSON.stringify(createInitialSurveyResponse());
const parsed = JSON.parse(jsonSerialized);
assert.equal(parsed.metadata.version, SURVEY_METADATA.version);
assert.deepEqual(parsed.sectionB.ratings, resp2.sectionB.ratings);
console.log('✓ JSON serialization roundtrip PASSED');

console.log('=== ALL UNIT & STRESS CHECKS PASSED SUCCESSFULLY ===');
