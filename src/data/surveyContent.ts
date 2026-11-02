/**
 * Kerala Student Experience & Higher Education Transformation Survey
 * Initiative: Beyond Syllabus & Rise Together 2026
 *
 * Authoritative Survey Content, Questions, Options, and Copy verbatim from ORIGINAL_REQUEST.md.
 */

import {
  LikertOption,
  QuestionDefinition,
  SectionDefinition,
  SurveyResponse,
} from '../types/survey';

// ============================================================================
// 1. Metadata & Global Informational Content
// ============================================================================

export const SURVEY_METADATA = {
  title: 'Kerala Student Experience & Higher Education Transformation Survey',
  subtitle: 'Understanding the challenges, opportunities and future of student learning in Kerala.',
  initiative: 'Beyond Syllabus and Rise Together 2026',
  version: '1.0.0',
  logoPath: '/logo.png',
  emblemPath: '/logo-emblem.png',

  objective: {
    title: 'Objective',
    paragraphs: [
      'Education should prepare students not only to succeed in examinations but also to think critically, solve real-world problems, develop practical skills, collaborate with others and contribute meaningfully to society.',
      'However, students experience different challenges across academic institutions, internships, student communities, industry interactions and career opportunities.',
      'This survey aims to understand the overall student experience in Kerala, identify gaps between academic education and real-world learning, evaluate the role of student-supported communities, and understand what changes students believe are necessary.',
    ],
    inquiryHeader: 'We want to hear directly from students:',
    inquiryBullets: [
      'What is working in higher education?',
      'What challenges are students facing?',
      'Are students getting sufficient practical learning and industry exposure?',
      'Are universities and student communities providing the support they need?',
      'What opportunities are students missing?',
      'What solutions can students and stakeholders build together?',
    ],
    contributionNote:
      'Your responses will contribute to discussions involving students, universities, industry, government and communities through Beyond Syllabus and Rise Together 2026.',
  },

  instructions: {
    title: 'Instructions',
    bullets: [
      'Answer based on your actual experiences.',
      'There are no right or wrong answers.',
      'Select the specified number of options for each question.',
      'Some questions allow multiple selections.',
      'Answer internship-related questions only if applicable.',
      'Open-ended questions are an opportunity to explain problems and propose solutions.',
      'Please do not share sensitive personal information.',
    ],
  },

  closing: {
    title: 'THANK YOU FOR YOUR PARTICIPATION',
    subhead: 'Your experience matters.',
    paragraphs: [
      'This survey is not simply about identifying what is wrong with higher education. It is about understanding what students need, recognising the opportunities that already exist, and identifying what can be improved through collective action.',
      'Through Beyond Syllabus and Rise Together 2026, we aim to connect student voices with the people and institutions capable of turning ideas into practical solutions.',
    ],
    goalHeader: 'The goal is simple:',
    goalStatement:
      'To ensure that every student has a meaningful opportunity to turn knowledge into capability, capability into demonstrable work, and demonstrable work into meaningful opportunities.',
    taglineBold: 'Beyond Syllabus. Rise Together 2026.',
    taglineSub:
      'From identifying challenges to building solutions. From individual potential to collective progress.',
  },
};

// ============================================================================
// 2. Rating Scale Definitions
// ============================================================================

export const LIKERT_SCALE_GENERAL: LikertOption[] = [
  { value: '1', label: '1 – Strongly Disagree', shortLabel: 'Strongly Disagree' },
  { value: '2', label: '2 – Disagree', shortLabel: 'Disagree' },
  { value: '3', label: '3 – Neither Agree nor Disagree', shortLabel: 'Neither' },
  { value: '4', label: '4 – Agree', shortLabel: 'Agree' },
  { value: '5', label: '5 – Strongly Agree', shortLabel: 'Strongly Agree' },
  { value: 'NA', label: 'N/A – Not Applicable / Unable to Assess', shortLabel: 'N/A' },
];

export const LIKERT_SCALE_INTERNSHIP: LikertOption[] = [
  { value: '1', label: '1 – Strongly Disagree', shortLabel: 'Strongly Disagree' },
  { value: '2', label: '2 – Disagree', shortLabel: 'Disagree' },
  { value: '3', label: '3 – Neither Agree nor Disagree', shortLabel: 'Neither' },
  { value: '4', label: '4 – Agree', shortLabel: 'Agree' },
  { value: '5', label: '5 – Strongly Agree', shortLabel: 'Strongly Agree' },
  { value: 'NA', label: 'N/A – Not Applicable', shortLabel: 'N/A' },
];

// ============================================================================
// 3. Section Definitions
// ============================================================================

export const SURVEY_SECTIONS: SectionDefinition[] = [
  {
    id: 'sectionA',
    stepIndex: 1,
    number: 'A',
    title: 'SECTION A: ABOUT YOU',
    subtitle: 'Demographics, academic status, and community affiliations',
    description: 'Tell us about your educational background and involvement in student communities.',
    questionIds: ['q1', 'q2', 'q3'],
  },
  {
    id: 'sectionB',
    stepIndex: 2,
    number: 'B',
    title: 'SECTION B: ACADEMIC EXPERIENCE AND PRACTICAL LEARNING',
    subtitle: 'Curriculum, examination focus, and practical learning balance',
    description: 'Assess the balance between theoretical coursework, practical application, and mentor guidance.',
    questionIds: ['q4', 'q5'],
  },
  {
    id: 'sectionC',
    stepIndex: 3,
    number: 'C',
    title: 'SECTION C: INTERNSHIPS, INDUSTRY EXPOSURE AND CAREER READINESS',
    subtitle: 'Internship quality, professional exposure, and career access barriers',
    description: 'Evaluate your internship experiences and identify the key obstacles to industry opportunities.',
    questionIds: ['q6', 'q7', 'q8'],
  },
  {
    id: 'sectionD',
    stepIndex: 4,
    number: 'D',
    title: 'SECTION D: STUDENT COMMUNITIES AND LEARNING BEYOND THE CLASSROOM',
    subtitle: 'Community value, peer learning, and participation challenges',
    description: 'Reflect on how student-led communities have influenced your learning and the challenges you face in participating.',
    questionIds: ['q9', 'q10'],
  },
  {
    id: 'sectionE',
    stepIndex: 5,
    number: 'E',
    title: 'SECTION E: INSTITUTIONAL CHALLENGES AND STUDENT OPPORTUNITIES',
    subtitle: 'Institutional friction points and highest-priority improvements',
    description: 'Highlight personal institutional challenges and indicate which improvements would create the greatest impact.',
    questionIds: ['q11', 'q12'],
  },
  {
    id: 'sectionF',
    stepIndex: 6,
    number: 'F',
    title: 'SECTION F: STUDENT VOICES AND COLLECTIVE SOLUTIONS',
    subtitle: 'Open problem analysis, practical proposals, and collaborative action',
    description: 'Articulate a major challenge you faced, propose an actionable solution, and join collaborative initiatives.',
    questionIds: ['q13', 'q14', 'q15'],
  },
];

// ============================================================================
// 4. Verbatim Questions Repository (Q1 - Q15)
// ============================================================================

export const SURVEY_QUESTIONS: Record<string, QuestionDefinition> = {
  // --------------------------------------------------------------------------
  // SECTION A: ABOUT YOU
  // --------------------------------------------------------------------------
  q1: {
    id: 'q1',
    number: 1,
    sectionId: 'sectionA',
    title: '1. What is your current academic status?',
    instruction: 'Select one.',
    type: 'single_choice',
    required: true,
    options: [
      { id: 'first_year', label: 'First Year' },
      { id: 'second_year', label: 'Second Year' },
      { id: 'third_year', label: 'Third Year' },
      { id: 'fourth_year', label: 'Fourth Year' },
      { id: 'postgraduate', label: 'Postgraduate' },
      { id: 'research_scholar', label: 'Research Scholar' },
      { id: 'graduated_working', label: 'Graduated / Working' },
      { id: 'other', label: 'Other', hasOtherInput: true, otherPlaceholder: 'Please specify status' },
    ],
  },

  q2: {
    id: 'q2',
    number: 2,
    sectionId: 'sectionA',
    title: '2. Which university or academic institution are you associated with?',
    instruction: 'Select one.',
    type: 'composite',
    required: true,
    options: [
      { id: 'ktu', label: 'APJ Abdul Kalam Technological University (KTU)' },
      { id: 'mgu', label: 'Mahatma Gandhi University (MGU)' },
      { id: 'uok', label: 'University of Kerala' },
      { id: 'uoc', label: 'University of Calicut' },
      { id: 'kannur', label: 'Kannur University' },
      { id: 'cusat', label: 'Cochin University of Science and Technology (CUSAT)' },
      { id: 'kuhs', label: 'Kerala University of Health Sciences (KUHS)' },
      { id: 'other', label: 'Other university or institution:', hasOtherInput: true, otherPlaceholder: 'Specify university or institution' },
    ],
    subQuestions: [
      {
        id: 'college',
        title: 'College / Institution (Optional):',
        type: 'open_text',
        required: false,
        placeholder: 'e.g., College of Engineering Trivandrum, Model Engineering College, etc.',
      },
      {
        id: 'programme',
        title: 'Programme / Field of Study:',
        type: 'open_text',
        required: true,
        placeholder: 'e.g., B.Tech Computer Science, B.Sc Physics, MCA, etc.',
      },
    ],
  },

  q3: {
    id: 'q3',
    number: 3,
    sectionId: 'sectionA',
    title: '3. Are you associated with any student-led or student-supported communities?',
    instruction: 'Select all that apply.',
    type: 'multi_choice',
    required: true,
    options: [
      { id: 'foss', label: 'FOSS / Open Source Communities' },
      { id: 'aws_cloud', label: 'AWS Cloud Clubs' },
      { id: 'mulearn', label: 'μLearn' },
      { id: 'iedc', label: 'IEDC / Entrepreneurship and Innovation Communities' },
      { id: 'tinkerhub', label: 'TinkerHub' },
      { id: 'mlsa', label: 'Microsoft Learn Student Ambassadors (MLSA)' },
      { id: 'gdg', label: 'Google Developer Groups / Developer Communities' },
      { id: 'robotics', label: 'Robotics / Hardware Communities' },
      { id: 'coding', label: 'Coding / Programming Communities' },
      { id: 'design', label: 'Design / Creative Communities' },
      { id: 'entrepreneurship', label: 'Entrepreneurship / Startup Communities' },
      { id: 'tech_chapters', label: 'Technical or Professional Student Chapters' },
      { id: 'cultural_social', label: 'Cultural, Social or Volunteering Communities' },
      { id: 'other', label: 'Other:', hasOtherInput: true, otherPlaceholder: 'Please specify community' },
      {
        id: 'none',
        label: 'I am not currently associated with any student community.',
        isExclusive: true,
      },
    ],
    subQuestions: [
      {
        id: 'involvementLevel',
        title: 'How would you describe your involvement?',
        instruction: 'Select all that apply.',
        type: 'multi_choice',
        required: true,
        options: [
          { id: 'core_leader', label: 'Core team member / Community leader' },
          { id: 'organising_volunteer', label: 'Organising team / Volunteer' },
          { id: 'active_member', label: 'Active member' },
          { id: 'occasional_participant', label: 'Occasional participant' },
          { id: 'beginner', label: 'Beginner / Recently joined' },
          { id: 'not_applicable', label: 'Not applicable', isExclusive: true },
        ],
      },
    ],
  },

  // --------------------------------------------------------------------------
  // SECTION B: ACADEMIC EXPERIENCE AND PRACTICAL LEARNING
  // --------------------------------------------------------------------------
  q4: {
    id: 'q4',
    number: 4,
    sectionId: 'sectionB',
    title: '4. How would you describe your overall educational experience?',
    instruction: 'Select up to three.',
    type: 'multi_choice',
    required: true,
    maxSelections: 3,
    options: [
      { id: 'theory_practical_balance', label: 'My education provides a good balance between theoretical and practical learning.' },
      { id: 'exam_focused', label: 'Most of my learning is focused on examinations, marks and completing the syllabus.' },
      { id: 'sufficient_practical_opps', label: 'I get sufficient opportunities to work on practical projects and real-world problems.' },
      { id: 'limited_curriculum_scope', label: 'I have limited opportunities to explore subjects beyond my prescribed curriculum.' },
      { id: 'heavy_academic_workload', label: 'Academic workload leaves me with little time for additional learning and skill development.' },
      { id: 'adequate_faculty_support', label: 'I receive adequate support from faculty members and mentors.' },
      { id: 'freedom_to_explore', label: 'I have sufficient freedom to explore my interests and develop additional skills.' },
      { id: 'soft_skills_development', label: 'I have opportunities to develop communication, leadership, teamwork and problem-solving skills.' },
      { id: 'life_work_preparedness', label: 'My educational experience is preparing me for life and work beyond graduation.' },
      { id: 'other', label: 'Other:', hasOtherInput: true, otherPlaceholder: 'Please specify' },
    ],
  },

  q5: {
    id: 'q5',
    number: 5,
    sectionId: 'sectionB',
    title: '5. How much do you agree with the following statements about your learning experience?',
    instruction: 'Use the following rating scale for each statement.',
    type: 'matrix_rating',
    required: true,
    scaleOptions: LIKERT_SCALE_GENERAL,
    matrixRows: [
      {
        id: 'A_real_world_problems',
        code: 'A',
        statement: 'A. My academic learning helps me understand and solve real-world problems.',
      },
      {
        id: 'B_practical_opportunities',
        code: 'B',
        statement: 'B. I receive sufficient opportunities for practical learning, projects, research and experimentation.',
      },
      {
        id: 'C_faculty_guidance',
        code: 'C',
        statement: 'C. Faculty members or qualified mentors are accessible and provide meaningful guidance.',
      },
      {
        id: 'D_critical_thinking',
        code: 'D',
        statement: 'D. My educational institution encourages critical thinking, creativity and independent learning.',
      },
      {
        id: 'E_beyond_curriculum',
        code: 'E',
        statement: 'E. I have opportunities to develop skills beyond my prescribed curriculum.',
      },
      {
        id: 'F_collaboration_teamwork',
        code: 'F',
        statement: 'F. My learning environment encourages collaboration, communication and teamwork.',
      },
    ],
  },

  // --------------------------------------------------------------------------
  // SECTION C: INTERNSHIPS, INDUSTRY EXPOSURE AND CAREER READINESS
  // --------------------------------------------------------------------------
  q6: {
    id: 'q6',
    number: 6,
    sectionId: 'sectionC',
    title: '6. What is the status of your internship experience?',
    instruction: 'Select one.',
    type: 'single_choice',
    required: true,
    options: [
      { id: 'completed', label: 'Completed at least one internship.' },
      { id: 'current', label: 'Currently undertaking an internship.' },
      { id: 'both', label: 'Both completed and currently undertaking an internship.' },
      { id: 'none', label: 'Have not undertaken any internship.' },
      { id: 'not_required', label: 'My academic programme does not currently require an internship.' },
    ],
  },

  q7: {
    id: 'q7',
    number: 7,
    sectionId: 'sectionC',
    title: '7. If you have undertaken an internship, how would you evaluate its quality?',
    instruction: 'Answer only if you have undertaken an internship.',
    type: 'matrix_rating',
    required: false, // Conditionally required when Q6 is completed, current, or both
    condition: {
      field: 'sectionC.internshipStatus',
      operator: 'includes',
      value: ['completed', 'current', 'both'],
    },
    scaleOptions: LIKERT_SCALE_INTERNSHIP,
    matrixRows: [
      {
        id: 'A_practical_tools',
        code: 'A',
        statement: 'A. The internship helped me develop practical skills using relevant tools, technologies, equipment or software.',
      },
      {
        id: 'B_meaningful_projects',
        code: 'B',
        statement: 'B. I worked on meaningful projects or real-world problems rather than merely completing formalities.',
      },
      {
        id: 'C_mentor_guidance',
        code: 'C',
        statement: 'C. I received adequate guidance from qualified mentors.',
      },
      {
        id: 'D_apply_academic_knowledge',
        code: 'D',
        statement: 'D. I could apply knowledge from my academic programme to practical situations.',
      },
      {
        id: 'E_evaluated_by_tasks',
        code: 'E',
        statement: 'E. My learning was evaluated through practical tasks, project work or demonstrations rather than certificate completion alone.',
      },
      {
        id: 'F_career_understanding',
        code: 'F',
        statement: 'F. The internship improved my understanding of professional expectations and career opportunities.',
      },
    ],
  },

  q8: {
    id: 'q8',
    number: 8,
    sectionId: 'sectionC',
    title: '8. What are the biggest barriers preventing you from accessing internships, industry exposure, research or professional opportunities?',
    instruction: 'Select up to three.',
    type: 'multi_choice',
    required: true,
    maxSelections: 3,
    options: [
      { id: 'lack_awareness', label: 'Lack of awareness about available opportunities.' },
      { id: 'finding_genuine', label: 'Difficulty finding genuine and relevant internships.' },
      { id: 'paid_internship_scams', label: 'Internships that require students to pay substantial fees.' },
      { id: 'limited_in_field', label: 'Limited opportunities in my academic field.' },
      { id: 'lack_industry_connections', label: 'Lack of industry connections or professional networks.' },
      { id: 'academic_workload_attendance', label: 'Academic workload, attendance requirements or examination schedules.' },
      { id: 'limited_faculty_guidance', label: 'Limited guidance from my institution or faculty.' },
      { id: 'lack_skills_confidence', label: 'Lack of practical skills or confidence to apply for opportunities.' },
      { id: 'financial_constraints', label: 'Financial constraints, including travel and accommodation.' },
      { id: 'limited_access_mentors', label: 'Limited access to mentors and experienced professionals.' },
      { id: 'geographical_limitations', label: 'Limited opportunities outside major cities.' },
      { id: 'lack_real_world_projects', label: 'Lack of opportunities to work on real-world problems.' },
      {
        id: 'no_barriers',
        label: 'I have not faced significant barriers.',
        isExclusive: true,
      },
      { id: 'other', label: 'Other:', hasOtherInput: true, otherPlaceholder: 'Please specify' },
    ],
  },

  // --------------------------------------------------------------------------
  // SECTION D: STUDENT COMMUNITIES AND LEARNING BEYOND THE CLASSROOM
  // --------------------------------------------------------------------------
  q9: {
    id: 'q9',
    number: 9,
    sectionId: 'sectionD',
    title: '9. How much value have you gained from participating in student-led communities or initiatives?',
    instruction: 'Select up to three.',
    type: 'multi_choice',
    required: true,
    maxSelections: 3,
    options: [
      { id: 'practical_technical_skills', label: 'Developed practical technical skills.' },
      { id: 'real_world_projects', label: 'Worked on real-world projects.' },
      { id: 'technologies_beyond_curriculum', label: 'Learned technologies beyond my academic curriculum.' },
      { id: 'mentorship', label: 'Received mentorship from experienced individuals.' },
      { id: 'communication_presentation', label: 'Improved communication and presentation skills.' },
      { id: 'leadership_organisation', label: 'Developed leadership and organisational abilities.' },
      { id: 'networks_friendships', label: 'Built friendships and professional networks.' },
      { id: 'career_internships', label: 'Accessed internships, employment or career opportunities.' },
      { id: 'entrepreneurship_ideas', label: 'Explored entrepreneurship and developed ideas.' },
      { id: 'open_source_social_impact', label: 'Contributed to open-source or social-impact projects.' },
      { id: 'competitions_hackathons', label: 'Participated in competitions, hackathons or innovation programmes.' },
      {
        id: 'no_value_yet',
        label: 'I have not gained significant value from community participation yet.',
        isExclusive: true,
      },
      {
        id: 'not_associated',
        label: 'I am not associated with any student community.',
        isExclusive: true,
      },
      { id: 'other', label: 'Other:', hasOtherInput: true, otherPlaceholder: 'Please specify' },
    ],
  },

  q10: {
    id: 'q10',
    number: 10,
    sectionId: 'sectionD',
    title: '10. What challenges do you face in participating in or gaining value from student communities and extracurricular initiatives?',
    instruction: 'Select up to three.',
    type: 'multi_choice',
    required: true,
    maxSelections: 3,
    options: [
      { id: 'lack_awareness', label: 'Lack of awareness about available communities and opportunities.' },
      { id: 'academic_workload', label: 'Academic workload leaves insufficient time to participate.' },
      { id: 'attendance_restrictions', label: 'Attendance requirements or institutional restrictions.' },
      { id: 'permission_support_difficulties', label: 'Difficulty obtaining permission or institutional support for activities.' },
      { id: 'lack_funding_infrastructure', label: 'Lack of funding, infrastructure, equipment or resources.' },
      { id: 'limited_mentor_access', label: 'Limited access to experienced mentors and industry professionals.' },
      { id: 'intro_heavy_low_practical', label: 'Too many introductory sessions and insufficient practical projects.' },
      { id: 'finding_collaborators', label: 'Difficulty finding committed teammates or collaborators.' },
      { id: 'lack_continuity', label: 'Lack of continuity and knowledge transfer between student leaders.' },
      { id: 'cliquish_concentration', label: 'Community activities are concentrated among a small group of members.' },
      { id: 'limited_inter_community_collab', label: 'Limited collaboration between different student communities.' },
      { id: 'lack_recognition', label: 'Lack of recognition for projects, volunteering and community contributions.' },
      { id: 'conversion_to_careers', label: 'Difficulty converting learning into internships, employment or tangible outcomes.' },
      {
        id: 'no_challenges',
        label: 'I do not face significant challenges.',
        isExclusive: true,
      },
      {
        id: 'not_associated',
        label: 'I am not associated with any student community.',
        isExclusive: true,
      },
      { id: 'other', label: 'Other:', hasOtherInput: true, otherPlaceholder: 'Please specify' },
    ],
  },

  // --------------------------------------------------------------------------
  // SECTION E: INSTITUTIONAL CHALLENGES AND STUDENT OPPORTUNITIES
  // --------------------------------------------------------------------------
  q11: {
    id: 'q11',
    number: 11,
    sectionId: 'sectionE',
    title: '11. Which of the following challenges have you personally experienced during your educational journey?',
    instruction: 'Select up to three.',
    type: 'multi_choice',
    required: true,
    maxSelections: 3,
    categories: [
      {
        id: 'academic_admin',
        title: 'Academic and Administrative Challenges',
        optionIds: [
          'exam_delays',
          'revaluation_cert_delays',
          'admin_info_support',
          'heavy_workload',
          'attendance_rigidity',
          'curriculum_impractical',
        ],
      },
      {
        id: 'infrastructure_resources',
        title: 'Infrastructure and Learning Resources',
        optionIds: [
          'limited_lab_library',
          'inadequate_research_infra',
          'limited_software_tools',
        ],
      },
      {
        id: 'mentorship_career',
        title: 'Mentorship and Career Development',
        optionIds: [
          'insufficient_mentorship',
          'limited_quality_internships',
          'lack_placement_support',
          'scholarship_unawareness',
          'soft_skills_barrier',
        ],
      },
      {
        id: 'student_support',
        title: 'Student Support and Participation',
        optionIds: [
          'financial_barriers',
          'insufficient_community_support',
          'limited_entrepreneurship',
          'limited_student_voice',
          'wellbeing_counselling_gaps',
          'limited_inter_college_collab',
        ],
      },
    ],
    options: [
      // Category 1: Academic and Administrative Challenges
      {
        id: 'exam_delays',
        label: 'Delays in examinations, evaluation or publication of results.',
        category: 'academic_admin',
      },
      {
        id: 'revaluation_cert_delays',
        label: 'Delays in revaluation, certificates, mark lists or academic documentation.',
        category: 'academic_admin',
      },
      {
        id: 'admin_info_support',
        label: 'Difficulty obtaining clear academic information or administrative support.',
        category: 'academic_admin',
      },
      {
        id: 'heavy_workload',
        label: 'Heavy academic workload and limited time for additional learning.',
        category: 'academic_admin',
      },
      {
        id: 'attendance_rigidity',
        label: 'Attendance requirements that restrict participation in internships, projects or extracurricular activities.',
        category: 'academic_admin',
      },
      {
        id: 'curriculum_impractical',
        label: 'Curriculum that does not provide sufficient practical or experiential learning.',
        category: 'academic_admin',
      },

      // Category 2: Infrastructure and Learning Resources
      {
        id: 'limited_lab_library',
        label: 'Limited access to laboratories, equipment, libraries or digital learning resources.',
        category: 'infrastructure_resources',
      },
      {
        id: 'inadequate_research_infra',
        label: 'Inadequate infrastructure for research, innovation or experimentation.',
        category: 'infrastructure_resources',
      },
      {
        id: 'limited_software_tools',
        label: 'Limited access to technical facilities and professional software.',
        category: 'infrastructure_resources',
      },

      // Category 3: Mentorship and Career Development
      {
        id: 'insufficient_mentorship',
        label: 'Insufficient faculty mentorship or career guidance.',
        category: 'mentorship_career',
      },
      {
        id: 'limited_quality_internships',
        label: 'Limited access to quality internships and industry interaction.',
        category: 'mentorship_career',
      },
      {
        id: 'lack_placement_support',
        label: 'Lack of placement support or professional networking opportunities.',
        category: 'mentorship_career',
      },
      {
        id: 'scholarship_unawareness',
        label: 'Limited awareness of scholarships, fellowships, competitions and career opportunities.',
        category: 'mentorship_career',
      },
      {
        id: 'soft_skills_barrier',
        label: 'Difficulty developing communication, leadership and professional skills.',
        category: 'mentorship_career',
      },

      // Category 4: Student Support and Participation
      {
        id: 'financial_barriers',
        label: 'Financial barriers to participating in learning programmes and opportunities.',
        category: 'student_support',
      },
      {
        id: 'insufficient_community_support',
        label: 'Insufficient support for student-led communities and initiatives.',
        category: 'student_support',
      },
      {
        id: 'limited_entrepreneurship',
        label: 'Limited opportunities for entrepreneurship, innovation and research.',
        category: 'student_support',
      },
      {
        id: 'limited_student_voice',
        label: 'Limited student participation in decisions affecting academic and campus life.',
        category: 'student_support',
      },
      {
        id: 'wellbeing_counselling_gaps',
        label: 'Insufficient access to student wellbeing, counselling or support services.',
        category: 'student_support',
      },
      {
        id: 'limited_inter_college_collab',
        label: 'Limited opportunities to collaborate with students from other institutions.',
        category: 'student_support',
      },

      // General / Exclusive Options
      {
        id: 'no_challenges',
        label: 'I have not experienced significant challenges.',
        isExclusive: true,
      },
      {
        id: 'other',
        label: 'Other:',
        hasOtherInput: true,
        otherPlaceholder: 'Please specify',
      },
    ],
  },

  q12: {
    id: 'q12',
    number: 12,
    sectionId: 'sectionE',
    title: '12. Which improvements would make the biggest difference to your educational experience and future opportunities?',
    instruction: 'Select up to three.',
    type: 'multi_choice',
    required: true,
    maxSelections: 3,
    options: [
      { id: 'project_based_learning', label: 'More practical, project-based and real-world learning.' },
      { id: 'university_industry_partnerships', label: 'Stronger university-industry partnerships.' },
      { id: 'verified_internships', label: 'Better access to genuine internships and industry-sponsored projects.' },
      { id: 'exam_evaluation_reform', label: 'Improved examination, evaluation and result-management processes.' },
      { id: 'industry_relevant_curricula', label: 'Updated and more industry-relevant curricula.' },
      { id: 'stronger_faculty_mentorship', label: 'Stronger faculty mentorship and career guidance.' },
      { id: 'better_labs_innovation_spaces', label: 'Better laboratories, research facilities and innovation spaces.' },
      { id: 'academic_flexibility', label: 'Greater flexibility to explore interests beyond the prescribed curriculum.' },
      { id: 'academic_credit_for_projects', label: 'Recognition or academic credit for meaningful projects, research, volunteering and demonstrated skills.' },
      { id: 'career_soft_skills', label: 'Better career preparation, including communication, teamwork and problem-solving.' },
      { id: 'student_community_support', label: 'Greater support for student communities, clubs and peer-learning networks.' },
      { id: 'startup_incubation', label: 'More opportunities for entrepreneurship, startups and student-led innovation.' },
      { id: 'scholarships_funding', label: 'Better access to scholarships, financial support and affordable programmes.' },
      { id: 'central_opportunity_portal', label: 'A central platform for discovering verified internships, projects, mentors and opportunities.' },
      { id: 'cross_college_collaboration', label: 'Stronger collaboration between different colleges and student communities.' },
      { id: 'student_governance', label: 'Greater student participation in institutional decision-making.' },
      { id: 'wellbeing_support', label: 'Better student wellbeing and support services.' },
      { id: 'other', label: 'Other:', hasOtherInput: true, otherPlaceholder: 'Please specify' },
    ],
  },

  // --------------------------------------------------------------------------
  // SECTION F: STUDENT VOICES AND COLLECTIVE SOLUTIONS
  // --------------------------------------------------------------------------
  q13: {
    id: 'q13',
    number: 13,
    sectionId: 'sectionF',
    title: '13. What is one major problem you have personally experienced as a student?',
    instruction: 'Open-ended question.',
    type: 'open_text',
    required: true,
    minLength: 10,
    maxLength: 4000,
    contextNote:
      'It could relate to academic learning, examinations, internships, industry exposure, infrastructure, mentorship, student communities, career opportunities, administration or any other aspect of your educational experience.',
    guidingPrompts: [
      'What exactly happened?',
      'How did it affect you or other students?',
      'How frequently does this problem occur?',
      'What do you think is causing it?',
    ],
    placeholder: 'Describe your personal experience in detail according to the questions above...',
  },

  q14: {
    id: 'q14',
    number: 14,
    sectionId: 'sectionF',
    title: '14. If you could introduce one practical change to improve higher education and student opportunities in Kerala, what would you propose?',
    instruction: 'Open-ended question.',
    type: 'open_text',
    required: true,
    minLength: 10,
    maxLength: 4000,
    contextNote:
      'We want to hear practical solutions, not just complaints.\n\nYour idea does not need to be a large policy change. It could be a small, achievable intervention that makes a meaningful difference.',
    guidingPrompts: [
      'What exactly should change?',
      'What solution do you recommend?',
      'Who should take responsibility: universities, colleges, faculty, government, industry, student communities or other stakeholders?',
      'How could the solution be implemented?',
      'What outcome would demonstrate that it is working?',
    ],
    placeholder: 'Explain your proposed solution and how it could be practically executed...',
  },

  q15: {
    id: 'q15',
    number: 15,
    sectionId: 'sectionF',
    title: '15. Would you be interested in contributing to initiatives that bring students, universities, industries, government and communities together to implement solutions to these challenges?',
    instruction: 'Select one.',
    type: 'single_choice',
    required: true,
    options: [
      { id: 'design_implement', label: 'Yes, I would like to help design and implement solutions.' },
      { id: 'pilot_programmes', label: 'Yes, I would like to participate in real-world projects or pilot programmes.' },
      { id: 'organise_coordinate', label: 'Yes, I would like to help organise and coordinate initiatives.' },
      { id: 'ideas_discussions', label: 'Yes, I would like to contribute ideas and participate in discussions.' },
      { id: 'maybe_conditional', label: 'Maybe, depending on the initiative and time commitment.' },
      { id: 'not_now', label: 'Not at this time.' },
    ],
    subQuestions: [
      {
        id: 'contributionAreas',
        title: 'Optional: Which areas would you be interested in contributing to?',
        instruction: 'Select all that apply.',
        type: 'multi_choice',
        required: false,
        condition: {
          field: 'sectionF.initiativeInterest',
          operator: 'not_equals',
          value: 'not_now',
        },
        options: [
          { id: 'practical_learning', label: 'Practical learning and skill development.' },
          { id: 'industry_projects', label: 'Industry projects and internships.' },
          { id: 'research_innovation', label: 'Research and innovation.' },
          { id: 'entrepreneurship_startups', label: 'Entrepreneurship and startups.' },
          { id: 'opensource_tech', label: 'Open-source and technology projects.' },
          { id: 'student_communities', label: 'Student communities and peer learning.' },
          { id: 'education_policy', label: 'Education policy and institutional improvements.' },
          { id: 'social_impact', label: 'Social impact and community development.' },
          { id: 'career_mentorship', label: 'Career guidance and mentorship.' },
          { id: 'other', label: 'Other:', hasOtherInput: true, otherPlaceholder: 'Please specify area' },
        ],
      },
    ],
  },
};

// ============================================================================
// 5. Initial Clean State Factory
// ============================================================================

export const createInitialSurveyResponse = (): SurveyResponse => ({
  metadata: {
    startedAt: new Date().toISOString(),
    version: SURVEY_METADATA.version,
    language: 'en',
    clientTimestamp: Date.now(),
  },
  sectionA: {
    academicStatus: '',
    academicStatusOther: '',
    university: '',
    universityOther: '',
    college: '',
    programme: '',
    communities: [],
    communitiesOther: '',
    involvementLevel: '',
  },
  sectionB: {
    overallExperience: [],
    overallExperienceOther: '',
    ratings: {
      A_real_world_problems: 'NA',
      B_practical_opportunities: 'NA',
      C_faculty_guidance: 'NA',
      D_critical_thinking: 'NA',
      E_beyond_curriculum: 'NA',
      F_collaboration_teamwork: 'NA',
    },
  },
  sectionC: {
    internshipStatus: '',
    qualityRatings: null,
    barriers: [],
    barriersOther: '',
  },
  sectionD: {
    valueGained: [],
    valueGainedOther: '',
    challengesFaced: [],
    challengesFacedOther: '',
  },
  sectionE: {
    experiencedChallenges: [],
    experiencedChallengesOther: '',
    improvements: [],
    improvementsOther: '',
  },
  sectionF: {
    majorProblem: {
      description: '',
    },
    proposedSolution: {
      description: '',
    },
    initiativeInterest: '',
    contributionAreas: [],
    contributionAreasOther: '',
  },
});

