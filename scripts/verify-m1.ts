import fs from 'fs';
import path from 'path';
import {
  SURVEY_METADATA,
  LIKERT_SCALE_GENERAL,
  LIKERT_SCALE_INTERNSHIP,
  SURVEY_SECTIONS,
  SURVEY_QUESTIONS,
  createInitialSurveyResponse,
} from '../src/data/surveyContent';

console.log('=== STARTING EMPIRICAL MILESTONE 1 VERIFICATION ===\n');

let passCount = 0;
let failCount = 0;

function assert(condition: boolean, testName: string, detail?: any) {
  if (condition) {
    console.log(`[PASS] ${testName}`);
    passCount++;
  } else {
    console.error(`[FAIL] ${testName}`, detail !== undefined ? detail : '');
    failCount++;
  }
}

// ============================================================================
// 1. Logo and Asset Integrity Checks
// ============================================================================
console.log('--- 1. Testing Branding Assets in public/ ---');

const originalLogoPath = 'C:/Users/jibum/.gemini/antigravity/brain/fcc08c21-35b3-4da5-85d0-d264978588f8/.user_uploaded/media_1793641446232_68a1d5e4.png';
const publicDir = 'public';

assert(fs.existsSync(originalLogoPath), 'Original uploaded logo exists');
const origBuf = fs.readFileSync(originalLogoPath);
const origWidth = origBuf.readUInt32BE(16);
const origHeight = origBuf.readUInt32BE(20);
const origAspect = (origWidth / origHeight).toFixed(4);

assert(origWidth === 1024 && origHeight === 640, `Original logo dimensions are 1024x640 (got ${origWidth}x${origHeight})`);

const pngAssets = [
  { name: 'logo.png', expectedW: 1024, expectedH: 640, expectedAspect: origAspect },
  { name: 'logo-transparent.png', expectedW: 1024, expectedH: 640, expectedAspect: origAspect },
  { name: 'logo-emblem.png', expectedW: 695, expectedH: 284, expectedAspect: (695/284).toFixed(4) },
  { name: 'logo-emblem-transparent.png', expectedW: 695, expectedH: 284, expectedAspect: (695/284).toFixed(4) },
];

const pngMagic = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);

for (const asset of pngAssets) {
  const filePath = path.join(publicDir, asset.name);
  assert(fs.existsSync(filePath), `Asset ${asset.name} exists in public/`);
  const buf = fs.readFileSync(filePath);
  assert(buf.length > 1000, `Asset ${asset.name} is non-empty (${buf.length} bytes)`);
  assert(buf.subarray(0, 8).equals(pngMagic), `Asset ${asset.name} has valid PNG signature`);
  const w = buf.readUInt32BE(16);
  const h = buf.readUInt32BE(20);
  assert(w === asset.expectedW && h === asset.expectedH, `Asset ${asset.name} dimensions match expected ${asset.expectedW}x${asset.expectedH} (got ${w}x${h})`);
  const aspect = (w / h).toFixed(4);
  assert(aspect === asset.expectedAspect, `Asset ${asset.name} aspect ratio matches (${aspect})`);
}

// Favicon SVG check
const faviconPath = path.join(publicDir, 'favicon.svg');
assert(fs.existsSync(faviconPath), 'public/favicon.svg exists');
const svgContent = fs.readFileSync(faviconPath, 'utf8');
assert(svgContent.includes('<svg') && svgContent.includes('</svg>'), 'favicon.svg contains valid root SVG tag');
assert(svgContent.includes('#55348A') && svgContent.includes('#F15E21'), 'favicon.svg contains official brand purple & orange colors');

// ============================================================================
// 2. Survey Structure, Sections, and Metadata
// ============================================================================
console.log('\n--- 2. Testing Survey Sections and Metadata ---');

assert(SURVEY_METADATA.title === 'Kerala Student Experience & Higher Education Transformation Survey', 'Metadata title verbatim match');
assert(SURVEY_METADATA.subtitle === 'Understanding the challenges, opportunities and future of student learning in Kerala.', 'Metadata subtitle verbatim match');
assert(SURVEY_METADATA.objective.paragraphs.length === 3, 'Objective has 3 paragraphs verbatim');
assert(SURVEY_METADATA.objective.inquiryBullets.length === 6, 'Objective inquiry has 6 inquiry bullet questions');
assert(SURVEY_METADATA.instructions.bullets.length === 7, 'Instructions list has exactly 7 bullets');

assert(Array.isArray(SURVEY_SECTIONS) && SURVEY_SECTIONS.length === 6, 'SURVEY_SECTIONS has exactly 6 sections (A through F)');

const expectedSections = [
  { id: 'sectionA', number: 'A', title: 'SECTION A: ABOUT YOU', qCount: 3 },
  { id: 'sectionB', number: 'B', title: 'SECTION B: ACADEMIC EXPERIENCE AND PRACTICAL LEARNING', qCount: 2 },
  { id: 'sectionC', number: 'C', title: 'SECTION C: INTERNSHIPS, INDUSTRY EXPOSURE AND CAREER READINESS', qCount: 3 },
  { id: 'sectionD', number: 'D', title: 'SECTION D: STUDENT COMMUNITIES AND LEARNING BEYOND THE CLASSROOM', qCount: 2 },
  { id: 'sectionE', number: 'E', title: 'SECTION E: INSTITUTIONAL CHALLENGES AND STUDENT OPPORTUNITIES', qCount: 2 },
  { id: 'sectionF', number: 'F', title: 'SECTION F: STUDENT VOICES AND COLLECTIVE SOLUTIONS', qCount: 3 },
];

expectedSections.forEach(exp => {
  const sec = SURVEY_SECTIONS.find(s => s.id === exp.id);
  assert(!!sec, `Section ${exp.number} (${exp.id}) is present`);
  if (sec) {
    assert(sec.title === exp.title, `Section ${exp.number} title verbatim match: "${sec.title}"`);
    assert(sec.questionIds.length === exp.qCount, `Section ${exp.number} contains expected ${exp.qCount} question IDs`);
  }
});

// ============================================================================
// 3. Verbatim Question Completeness (Q1 - Q15)
// ============================================================================
console.log('\n--- 3. Testing Verbatim Questions (Q1 through Q15) ---');

assert(Object.keys(SURVEY_QUESTIONS).length === 15, `SURVEY_QUESTIONS contains exactly 15 questions (found ${Object.keys(SURVEY_QUESTIONS).length})`);

for (let i = 1; i <= 15; i++) {
  const qId = `q${i}`;
  assert(!!SURVEY_QUESTIONS[qId], `Question ${qId} exists in SURVEY_QUESTIONS`);
}

// Q1 Check
const q1 = SURVEY_QUESTIONS.q1;
assert(q1.title === '1. What is your current academic status?', 'Q1 title verbatim match');
assert(q1.instruction === 'Select one.', 'Q1 instruction verbatim match');
assert(q1.type === 'single_choice', 'Q1 is single_choice');
const q1ExpectedOptions = [
  'First Year',
  'Second Year',
  'Third Year',
  'Fourth Year',
  'Postgraduate',
  'Research Scholar',
  'Graduated / Working',
  'Other',
];
assert(q1.options.length === 8, `Q1 has 8 options (found ${q1.options.length})`);
q1ExpectedOptions.forEach((opt, idx) => {
  assert(q1.options[idx]?.label === opt, `Q1 option ${idx + 1} matches "${opt}"`);
});

// Q2 Check
const q2 = SURVEY_QUESTIONS.q2;
assert(q2.title === '2. Which university or academic institution are you associated with?', 'Q2 title verbatim match');
assert(q2.options.length === 8, `Q2 has 8 university options (found ${q2.options.length})`);
const q2ExpectedOptions = [
  'APJ Abdul Kalam Technological University (KTU)',
  'Mahatma Gandhi University (MGU)',
  'University of Kerala',
  'University of Calicut',
  'Kannur University',
  'Cochin University of Science and Technology (CUSAT)',
  'Kerala University of Health Sciences (KUHS)',
  'Other university or institution:',
];
q2ExpectedOptions.forEach((opt, idx) => {
  assert(q2.options[idx]?.label === opt, `Q2 option ${idx + 1} matches "${opt}"`);
});
assert(q2.subQuestions?.some(sq => sq.title.includes('College / Institution (Optional)')), 'Q2 has College / Institution (Optional) subquestion');
assert(q2.subQuestions?.some(sq => sq.title.includes('Programme / Field of Study')), 'Q2 has Programme / Field of Study subquestion');

// Q3 Check
const q3 = SURVEY_QUESTIONS.q3;
assert(q3.title === '3. Are you associated with any student-led or student-supported communities?', 'Q3 title verbatim match');
assert(q3.instruction === 'Select all that apply.', 'Q3 instruction is "Select all that apply."');
assert(q3.options.length === 15, `Q3 has 15 community options (found ${q3.options.length})`);
const q3ExpectedCommunities = [
  'FOSS / Open Source Communities',
  'AWS Cloud Clubs',
  'μLearn',
  'IEDC / Entrepreneurship and Innovation Communities',
  'TinkerHub',
  'Microsoft Learn Student Ambassadors (MLSA)',
  'Google Developer Groups / Developer Communities',
  'Robotics / Hardware Communities',
  'Coding / Programming Communities',
  'Design / Creative Communities',
  'Entrepreneurship / Startup Communities',
  'Technical or Professional Student Chapters',
  'Cultural, Social or Volunteering Communities',
  'Other:',
  'I am not currently associated with any student community.',
];
q3ExpectedCommunities.forEach((opt, idx) => {
  assert(q3.options[idx]?.label === opt, `Q3 option ${idx + 1} matches "${opt}"`);
});
const q3None = q3.options.find(o => o.id === 'none');
assert(q3None?.isExclusive === true, 'Q3 "I am not currently associated with any student community" has isExclusive: true');
const q3Involvement = q3.subQuestions?.find(sq => sq.id === 'involvementLevel');
assert(!!q3Involvement, 'Q3 has involvementLevel subquestion');
assert(q3Involvement?.title === 'How would you describe your involvement?', 'Q3 involvement title verbatim match');
assert(q3Involvement?.options.length === 6, 'Q3 involvement has 6 options');

// Q4 Check
const q4 = SURVEY_QUESTIONS.q4;
assert(q4.title === '4. How would you describe your overall educational experience?', 'Q4 title verbatim match');
assert(q4.instruction === 'Select up to three.', 'Q4 instruction is "Select up to three."');
assert(q4.maxSelections === 3, 'Q4 maxSelections is 3');
assert(q4.options.length === 10, `Q4 has 10 options (found ${q4.options.length})`);

// ============================================================================
// 4. Q5 Likert Matrix Verification
// ============================================================================
console.log('\n--- 4. Testing Q5 Likert Matrix ---');
const q5 = SURVEY_QUESTIONS.q5;
assert(q5.title === '5. How much do you agree with the following statements about your learning experience?', 'Q5 title verbatim match');
assert(q5.type === 'matrix_rating', 'Q5 type is matrix_rating');
assert(q5.scaleOptions?.length === 6, 'Q5 scaleOptions has 6 options (1-5 and N/A)');

const q5ExpectedRows = [
  { code: 'A', text: 'A. My academic learning helps me understand and solve real-world problems.' },
  { code: 'B', text: 'B. I receive sufficient opportunities for practical learning, projects, research and experimentation.' },
  { code: 'C', text: 'C. Faculty members or qualified mentors are accessible and provide meaningful guidance.' },
  { code: 'D', text: 'D. My educational institution encourages critical thinking, creativity and independent learning.' },
  { code: 'E', text: 'E. I have opportunities to develop skills beyond my prescribed curriculum.' },
  { code: 'F', text: 'F. My learning environment encourages collaboration, communication and teamwork.' },
];

assert(q5.matrixRows?.length === 6, `Q5 has exactly 6 matrix rows (found ${q5.matrixRows?.length})`);
q5ExpectedRows.forEach((row, idx) => {
  const actualRow = q5.matrixRows?.[idx];
  assert(!!actualRow, `Q5 row ${row.code} exists`);
  assert(actualRow?.code === row.code, `Q5 row ${row.code} code is '${row.code}'`);
  assert(actualRow?.statement === row.text, `Q5 row ${row.code} statement verbatim match: "${actualRow?.statement}"`);
  assert(actualRow?.id.startsWith(`${row.code}_`), `Q5 row ${row.code} id starts with "${row.code}_" (got ${actualRow?.id})`);
});

// Q6 Check
const q6 = SURVEY_QUESTIONS.q6;
assert(q6.title === '6. What is the status of your internship experience?', 'Q6 title verbatim match');
assert(q6.options.length === 5, 'Q6 has 5 options');

// ============================================================================
// 5. Q7 Likert Matrix Verification
// ============================================================================
console.log('\n--- 5. Testing Q7 Likert Matrix ---');
const q7 = SURVEY_QUESTIONS.q7;
assert(q7.title === '7. If you have undertaken an internship, how would you evaluate its quality?', 'Q7 title verbatim match');
assert(q7.instruction === 'Answer only if you have undertaken an internship.', 'Q7 instruction verbatim match');
assert(q7.type === 'matrix_rating', 'Q7 type is matrix_rating');
assert(q7.condition !== undefined, 'Q7 has condition linked to Q6 internship status');

const q7ExpectedRows = [
  { code: 'A', text: 'A. The internship helped me develop practical skills using relevant tools, technologies, equipment or software.' },
  { code: 'B', text: 'B. I worked on meaningful projects or real-world problems rather than merely completing formalities.' },
  { code: 'C', text: 'C. I received adequate guidance from qualified mentors.' },
  { code: 'D', text: 'D. I could apply knowledge from my academic programme to practical situations.' },
  { code: 'E', text: 'E. My learning was evaluated through practical tasks, project work or demonstrations rather than certificate completion alone.' },
  { code: 'F', text: 'F. The internship improved my understanding of professional expectations and career opportunities.' },
];

assert(q7.matrixRows?.length === 6, `Q7 has exactly 6 matrix rows (found ${q7.matrixRows?.length})`);
q7ExpectedRows.forEach((row, idx) => {
  const actualRow = q7.matrixRows?.[idx];
  assert(!!actualRow, `Q7 row ${row.code} exists`);
  assert(actualRow?.code === row.code, `Q7 row ${row.code} code is '${row.code}'`);
  assert(actualRow?.statement === row.text, `Q7 row ${row.code} statement verbatim match: "${actualRow?.statement}"`);
  assert(actualRow?.id.startsWith(`${row.code}_`), `Q7 row ${row.code} id starts with "${row.code}_" (got ${actualRow?.id})`);
});

// Q8 Check
const q8 = SURVEY_QUESTIONS.q8;
assert(q8.title === '8. What are the biggest barriers preventing you from accessing internships, industry exposure, research or professional opportunities?', 'Q8 title verbatim match');
assert(q8.instruction === 'Select up to three.', 'Q8 instruction is "Select up to three."');
assert(q8.maxSelections === 3, 'Q8 maxSelections is 3');
assert(q8.options.length === 14, `Q8 has 14 options (found ${q8.options.length})`);
const q8NoBarriers = q8.options.find(o => o.id === 'no_barriers');
assert(q8NoBarriers?.isExclusive === true, 'Q8 "I have not faced significant barriers" has isExclusive: true');

// Q9 Check
const q9 = SURVEY_QUESTIONS.q9;
assert(q9.title === '9. How much value have you gained from participating in student-led communities or initiatives?', 'Q9 title verbatim match');
assert(q9.maxSelections === 3, 'Q9 maxSelections is 3');
assert(q9.options.length === 14, `Q9 has 14 options (found ${q9.options.length})`);

// Q10 Check
const q10 = SURVEY_QUESTIONS.q10;
assert(q10.title === '10. What challenges do you face in participating in or gaining value from student communities and extracurricular initiatives?', 'Q10 title verbatim match');
assert(q10.maxSelections === 3, 'Q10 maxSelections is 3');
assert(q10.options.length === 16, `Q10 has 16 options (found ${q10.options.length})`);

// Q11 Check
const q11 = SURVEY_QUESTIONS.q11;
assert(q11.title === '11. Which of the following challenges have you personally experienced during your educational journey?', 'Q11 title verbatim match');
assert(q11.maxSelections === 3, 'Q11 maxSelections is 3');
assert(q11.categories?.length === 4, `Q11 has 4 category groupings (found ${q11.categories?.length})`);
assert(q11.options.length === 22, `Q11 has 22 total options (found ${q11.options.length})`);

// Q12 Check
const q12 = SURVEY_QUESTIONS.q12;
assert(q12.title === '12. Which improvements would make the biggest difference to your educational experience and future opportunities?', 'Q12 title verbatim match');
assert(q12.maxSelections === 3, 'Q12 maxSelections is 3');
assert(q12.options.length === 18, `Q12 has 18 options (found ${q12.options.length})`);

// Q13 Check
const q13 = SURVEY_QUESTIONS.q13;
assert(q13.title === '13. What is one major problem you have personally experienced as a student?', 'Q13 title verbatim match');
assert(q13.guidingPrompts?.length === 4, `Q13 has 4 guiding prompts (found ${q13.guidingPrompts?.length})`);

// Q14 Check
const q14 = SURVEY_QUESTIONS.q14;
assert(q14.title === '14. If you could introduce one practical change to improve higher education and student opportunities in Kerala, what would you propose?', 'Q14 title verbatim match');
assert(q14.guidingPrompts?.length === 5, `Q14 has 5 guiding prompts (found ${q14.guidingPrompts?.length})`);

// Q15 Check
const q15 = SURVEY_QUESTIONS.q15;
assert(q15.title === '15. Would you be interested in contributing to initiatives that bring students, universities, industries, government and communities together to implement solutions to these challenges?', 'Q15 title verbatim match');
assert(q15.options.length === 6, `Q15 has 6 response options (found ${q15.options.length})`);
assert(q15.subQuestions?.[0]?.options?.length === 10, 'Q15 optional contribution areas has 10 options');

// ============================================================================
// 6. Response Factory Verification
// ============================================================================
console.log('\n--- 6. Testing Initial Survey Response Factory ---');
const initial = createInitialSurveyResponse();
assert(initial.metadata.version === '1.0.0', 'Initial state metadata version is 1.0.0');
assert(initial.sectionA.academicStatus === '', 'sectionA.academicStatus initialized to empty string');
assert(Array.isArray(initial.sectionA.communities) && initial.sectionA.communities.length === 0, 'sectionA.communities initialized to empty array');
assert(Object.keys(initial.sectionB.ratings).length === 6, 'sectionB.ratings initialized with all 6 Q5 matrix rows');
assert(initial.sectionC.qualityRatings === null, 'sectionC.qualityRatings initialized to null pending conditional check');

// ============================================================================
// 7. Build and Static Distribution Integrity
// ============================================================================
console.log('\n--- 7. Testing Build & Bundle Distribution in dist/ ---');
const distIndex = 'dist/index.html';
assert(fs.existsSync(distIndex), 'dist/index.html exists');
const distHtml = fs.readFileSync(distIndex, 'utf8');
assert(distHtml.includes('<div id="root"></div>'), 'dist/index.html contains root mounting element <div id="root"></div>');

const distAssets = fs.existsSync('dist/assets') ? fs.readdirSync('dist/assets') : [];
const distJs = distAssets.find(f => f.startsWith('index-') && f.endsWith('.js'));
const distCss = distAssets.find(f => f.startsWith('index-') && f.endsWith('.css'));

assert(!!distJs, `Found production JavaScript chunk in dist/assets/ (${distJs})`);
assert(!!distCss, `Found production CSS stylesheet in dist/assets/ (${distCss})`);

if (distJs) {
  const jsSize = fs.statSync(path.join('dist/assets', distJs)).size;
  assert(jsSize > 100000, `Production JS bundle is substantial (${jsSize} bytes > 100KB)`);
}

if (distCss) {
  const cssSize = fs.statSync(path.join('dist/assets', distCss)).size;
  assert(cssSize > 10000, `Production CSS bundle is substantial (${cssSize} bytes > 10KB)`);
}

// Verify static assets copied to dist root
for (const asset of pngAssets) {
  const distAssetPath = path.join('dist', asset.name);
  assert(fs.existsSync(distAssetPath), `Asset ${asset.name} copied to dist/`);
  if (fs.existsSync(distAssetPath)) {
    const buf = fs.readFileSync(distAssetPath);
    assert(buf.subarray(0, 8).equals(pngMagic), `dist/${asset.name} has valid PNG signature`);
  }
}
assert(fs.existsSync('dist/favicon.svg'), 'dist/favicon.svg exists');

console.log(`\n=== VERIFICATION SUMMARY ===`);
console.log(`Passed: ${passCount}`);
console.log(`Failed: ${failCount}`);

if (failCount > 0) {
  process.exit(1);
} else {
  console.log('\nALL EMPIRICAL TESTS PASSED SUCCESSFULLY!');
}

