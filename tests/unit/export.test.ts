import assert from 'node:assert/strict';
import {
  generateJsonContent,
  generateCsvContent,
  generateSummaryText,
  submitSurveyToApi,
} from '../../src/utils/export';
import { createInitialSurveyResponse } from '../../src/data/surveyContent';

console.log('=== Starting Export Engine Unit Tests ===');

const mockResponse = createInitialSurveyResponse();
mockResponse.sectionA = {
  academicStatus: 'fourth_year',
  academicStatusOther: '',
  university: 'ktu',
  universityOther: '',
  college: 'Government Engineering College Barton Hill, Trivandrum',
  programme: 'Information Technology',
  communities: ['foss', 'mulearn'],
  communitiesOther: '',
  involvementLevel: 'organising_volunteer',
};
mockResponse.sectionB = {
  overallExperience: ['exam_focused', 'freedom_to_explore'],
  overallExperienceOther: '',
  ratings: {
    A_real_world_problems: '3',
    B_practical_opportunities: '4',
    C_faculty_guidance: '4',
    D_critical_thinking: '3',
    E_beyond_curriculum: '5',
    F_collaboration_teamwork: '4',
  },
};
mockResponse.sectionC = {
  internshipStatus: 'completed',
  qualityRatings: {
    A_practical_tools: '5',
    B_meaningful_projects: '4',
    C_mentor_guidance: '4',
    D_apply_academic_knowledge: '4',
    E_evaluated_by_tasks: '5',
    F_career_understanding: '5',
  },
  barriers: ['finding_genuine', 'academic_workload_attendance'],
  barriersOther: '',
};
mockResponse.sectionD = {
  valueGained: ['practical_technical_skills', 'networks_friendships'],
  valueGainedOther: '',
  challengesFaced: ['academic_workload', 'attendance_restrictions'],
  challengesFacedOther: '',
};
mockResponse.sectionE = {
  experiencedChallenges: ['exam_delays', 'attendance_rigidity'],
  experiencedChallengesOther: '',
  improvements: ['project_based_learning', 'verified_internships'],
  improvementsOther: '',
};
mockResponse.sectionF = {
  majorProblem: {
    description: 'Attendance rules prevent participating in real industry internships.',
  },
  proposedSolution: {
    description: 'Allow verified offline or remote internships to count towards semester credits.',
  },
  initiativeInterest: 'design_implement',
  contributionAreas: ['practical_learning', 'industry_projects'],
  contributionAreasOther: '',
};

// 1. JSON Export verification
console.log('Testing JSON Export Generation...');
const jsonStr = generateJsonContent(mockResponse);
assert.ok(jsonStr && typeof jsonStr === 'string', 'JSON export must be non-empty string');
const parsed = JSON.parse(jsonStr);
assert.equal(parsed.appName, 'Rise Together 2026 Survey');
assert.equal(parsed.surveyId, 'kerala-student-experience-2026');
assert.ok(parsed.response.metadata.submittedAt);
assert.equal(parsed.response.sectionA.programme, 'Information Technology');
assert.equal(parsed.response.sectionC.internshipStatus, 'completed');
assert.equal(parsed.response.sectionF.majorProblem.description, 'Attendance rules prevent participating in real industry internships.');
console.log('✓ JSON Export PASSED');

// 2. CSV Export RFC 4180 verification
console.log('Testing CSV Export Generation...');
const csvStr = generateCsvContent(mockResponse);
assert.ok(csvStr && typeof csvStr === 'string', 'CSV export must be non-empty string');
const lines = csvStr.trim().split('\n');
assert.equal(lines.length, 2, 'CSV must have 1 header line and 1 data line');
assert.ok(lines[0].includes('"Academic_Status"'), 'Header must contain Academic_Status');
assert.ok(lines[1].includes('"Information Technology"'), 'Data row must contain programme');
assert.ok(lines[1].includes('"foss; mulearn"'), 'Data row must format array with semicolon');

// CSV Special character escaping test
const specialCharsResponse = { ...mockResponse };
specialCharsResponse.sectionF = {
  ...mockResponse.sectionF,
  majorProblem: {
    description: 'Line 1\nLine 2 with "double quotes" and, comma.',
  },
};
const escapedCsv = generateCsvContent(specialCharsResponse);
assert.ok(escapedCsv.includes('""double quotes""'), 'Double quotes must be escaped with double double-quotes in RFC 4180');
console.log('✓ CSV Export PASSED');

// 3. Summary Text Generator verification
console.log('Testing Summary Text Generator...');
const summary = generateSummaryText(mockResponse);
assert.ok(summary.includes('Beyond Syllabus & Rise Together 2026'));
assert.ok(summary.includes('Information Technology'));
assert.ok(summary.includes('Attendance rules prevent participating'));
console.log('✓ Summary Text Generator PASSED');

// 4. Mock API Submitter verification
console.log('Testing Mock API Submitter...');
async function testApi() {
  const result = await submitSurveyToApi(mockResponse);
  assert.equal(result.success, true);
  assert.ok(result.id.startsWith('RT2026-'), 'Submission ID must start with RT2026-');
  assert.ok(result.message.includes('Rise Together 2026'));
  console.log('✓ Mock API Submitter PASSED');
}

testApi().then(() => {
  console.log('=== ALL EXPORT TESTS PASSED ===');
});
