import { ParticipantRole } from './survey';

export type StepId = 
  | 'sectionA' 
  | 'sectionB' 
  | 'sectionC' 
  | 'sectionD' 
  | 'sectionE' 
  | 'sectionF' 
  | 'review' 
  | 'success';

export interface WizardStepMeta {
  stepNumber: number; // 1 to total
  id: StepId;
  code: string;       // 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'Review' | 'Conclusion'
  title: string;
  shortTitle: string;
  subtitle: string;
  iconName: string;
  questionCount: number;
}

export const WIZARD_STEPS: WizardStepMeta[] = [
  {
    stepNumber: 1,
    id: 'sectionA',
    code: 'A',
    title: 'Section A: About You',
    shortTitle: 'About You',
    subtitle: 'Academic background, institution & community affiliation',
    iconName: 'User',
    questionCount: 3,
  },
  {
    stepNumber: 2,
    id: 'sectionB',
    code: 'B',
    title: 'Section B: Academic Experience & Practical Learning',
    shortTitle: 'Academics',
    subtitle: 'Learning balance, curriculum scope & faculty mentorship',
    iconName: 'BookOpen',
    questionCount: 2,
  },
  {
    stepNumber: 3,
    id: 'sectionC',
    code: 'C',
    title: 'Section C: Internships, Industry Exposure & Career Readiness',
    shortTitle: 'Internships',
    subtitle: 'Internship status, quality evaluation & access barriers',
    iconName: 'Briefcase',
    questionCount: 3,
  },
  {
    stepNumber: 4,
    id: 'sectionD',
    code: 'D',
    title: 'Section D: Student Communities & Learning Beyond Classroom',
    shortTitle: 'Communities',
    subtitle: 'Value gained, peer collaboration & participation bottlenecks',
    iconName: 'Users',
    questionCount: 2,
  },
  {
    stepNumber: 5,
    id: 'sectionE',
    code: 'E',
    title: 'Section E: Institutional Challenges & Student Opportunities',
    shortTitle: 'Challenges',
    subtitle: 'Lived campus obstacles & priority transformations',
    iconName: 'Building2',
    questionCount: 2,
  },
  {
    stepNumber: 6,
    id: 'sectionF',
    code: 'F',
    title: 'Section F: Student Voices & Collective Solutions',
    shortTitle: 'Voices',
    subtitle: 'Major lived problem, actionable change proposal & collaboration',
    iconName: 'Sparkles',
    questionCount: 3,
  },
  {
    stepNumber: 7,
    id: 'review',
    code: 'Conclusion',
    title: 'Congratulations & Creative Conclusion',
    shortTitle: 'Conclusion',
    subtitle: 'Survey completed. Review your recorded impact, verified credential & next steps.',
    iconName: 'Sparkles',
    questionCount: 0,
  },
];

export const ENTREPRENEUR_WIZARD_STEPS: WizardStepMeta[] = [
  {
    stepNumber: 1,
    id: 'sectionA',
    code: 'A',
    title: 'Section A: About You',
    shortTitle: 'About You',
    subtitle: 'Entrepreneur position, journey stage & operating sector',
    iconName: 'User',
    questionCount: 3,
  },
  {
    stepNumber: 2,
    id: 'sectionB',
    code: 'B',
    title: 'Section B: Starting and Building a Venture',
    shortTitle: 'Venture',
    subtitle: 'Founder motivations, challenges & resource accessibility',
    iconName: 'Rocket',
    questionCount: 3,
  },
  {
    stepNumber: 3,
    id: 'sectionC',
    code: 'C',
    title: 'Section C: Funding, Market Access & Growth',
    shortTitle: 'Funding',
    subtitle: 'Capital bottlenecks, customer acquisition & ecosystem support',
    iconName: 'Briefcase',
    questionCount: 3,
  },
  {
    stepNumber: 4,
    id: 'sectionD',
    code: 'D',
    title: 'Section D: Education, Talent & Entrepreneurial Support',
    shortTitle: 'Talent',
    subtitle: 'Institutional support & early-stage talent acquisition',
    iconName: 'Users',
    questionCount: 2,
  },
  {
    stepNumber: 5,
    id: 'sectionE',
    code: 'E',
    title: 'Section E: Ecosystem Challenges & Solutions',
    shortTitle: 'Ecosystem',
    subtitle: 'Systemic obstacles, lived challenge & proposed reform',
    iconName: 'Building2',
    questionCount: 3,
  },
  {
    stepNumber: 6,
    id: 'sectionF',
    code: 'F',
    title: 'Section F: Collaboration & Future Opportunities',
    shortTitle: 'Collaboration',
    subtitle: 'Impactful support needs & collaborative initiative participation',
    iconName: 'Sparkles',
    questionCount: 1,
  },
  {
    stepNumber: 7,
    id: 'review',
    code: 'Conclusion',
    title: 'Congratulations & Creative Conclusion',
    shortTitle: 'Conclusion',
    subtitle: 'Survey completed. Review your recorded impact, verified credential & next steps.',
    iconName: 'Sparkles',
    questionCount: 0,
  },
];

export const ORGANIZATION_WIZARD_STEPS: WizardStepMeta[] = [
  {
    stepNumber: 1,
    id: 'sectionA',
    code: 'A',
    title: 'Section A: Organisation Profile',
    shortTitle: 'Profile',
    subtitle: 'Organisation type, leadership role & student engagement',
    iconName: 'Building2',
    questionCount: 3,
  },
  {
    stepNumber: 2,
    id: 'sectionB',
    code: 'B',
    title: 'Section B: Industry Expectations & Student Readiness',
    shortTitle: 'Expectations',
    subtitle: 'Workforce capabilities, readiness assessment & evaluation',
    iconName: 'BookOpen',
    questionCount: 4,
  },
  {
    stepNumber: 3,
    id: 'sectionC',
    code: 'C',
    title: 'Section C: Industry–Academia Collaboration',
    shortTitle: 'Collaboration',
    subtitle: 'Collaboration bottlenecks, obstacles & structured programmes',
    iconName: 'Briefcase',
    questionCount: 3,
  },
  {
    stepNumber: 4,
    id: 'sectionD',
    code: 'D',
    title: 'Section D: Opportunities & Collective Action',
    shortTitle: 'Opportunities',
    subtitle: 'Student opportunity offerings, priority areas & incentives',
    iconName: 'Users',
    questionCount: 3,
  },
  {
    stepNumber: 5,
    id: 'sectionE',
    code: 'E',
    title: 'Section E: Organisational Perspectives & Solutions',
    shortTitle: 'Solutions',
    subtitle: 'Ecosystem problem diagnosis & actionable proposals for change',
    iconName: 'Sparkles',
    questionCount: 2,
  },
  {
    stepNumber: 6,
    id: 'review',
    code: 'Conclusion',
    title: 'Congratulations & Creative Conclusion',
    shortTitle: 'Conclusion',
    subtitle: 'Survey completed. Review your recorded impact, verified credential & next steps.',
    iconName: 'Sparkles',
    questionCount: 0,
  },
];

export const getWizardStepsForRole = (role?: ParticipantRole): WizardStepMeta[] => {
  if (role === 'organization') return ORGANIZATION_WIZARD_STEPS;
  if (role === 'entrepreneur') return ENTREPRENEUR_WIZARD_STEPS;
  return WIZARD_STEPS;
};
