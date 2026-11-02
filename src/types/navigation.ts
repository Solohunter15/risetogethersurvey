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
  stepNumber: number; // 1 to 7
  id: StepId;
  code: string;       // 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'Review'
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

