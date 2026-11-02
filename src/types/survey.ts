/**
 * Kerala Student Experience & Higher Education Transformation Survey
 * Initiative: Beyond Syllabus & Rise Together 2026
 *
 * Comprehensive TypeScript Schema & Type Definitions
 */

// ============================================================================
// 1. Primitive & Discrete Scale Types
// ============================================================================

export type LikertRating = '1' | '2' | '3' | '4' | '5' | 'NA';
export type NumericLikertRating = 1 | 2 | 3 | 4 | 5;

export interface LikertOption {
  value: LikertRating;
  label: string;
  shortLabel: string;
}

// ============================================================================
// 2. Question Enums / Union Identifiers
// ============================================================================

// Section A: About You
export type AcademicStatus =
  | 'first_year'
  | 'second_year'
  | 'third_year'
  | 'fourth_year'
  | 'postgraduate'
  | 'research_scholar'
  | 'graduated_working'
  | 'other';

export type UniversityId =
  | 'ktu'
  | 'mgu'
  | 'uok'
  | 'uoc'
  | 'kannur'
  | 'cusat'
  | 'kuhs'
  | 'other';

export type CommunityId =
  | 'foss'
  | 'aws_cloud'
  | 'mulearn'
  | 'iedc'
  | 'tinkerhub'
  | 'mlsa'
  | 'gdg'
  | 'robotics'
  | 'coding'
  | 'design'
  | 'entrepreneurship'
  | 'tech_chapters'
  | 'cultural_social'
  | 'other'
  | 'none';

export type CommunityInvolvementLevel =
  | 'core_leader'
  | 'organising_volunteer'
  | 'active_member'
  | 'occasional_participant'
  | 'beginner'
  | 'not_applicable';

// Section B: Academic Experience
export type OverallExperienceId =
  | 'theory_practical_balance'
  | 'exam_focused'
  | 'sufficient_practical_opps'
  | 'limited_curriculum_scope'
  | 'heavy_academic_workload'
  | 'adequate_faculty_support'
  | 'freedom_to_explore'
  | 'soft_skills_development'
  | 'life_work_preparedness'
  | 'other';

export type LearningStatementId =
  | 'A_real_world_problems'
  | 'B_practical_opportunities'
  | 'C_faculty_guidance'
  | 'D_critical_thinking'
  | 'E_beyond_curriculum'
  | 'F_collaboration_teamwork';

// Section C: Internships & Readiness
export type InternshipStatus =
  | 'completed'
  | 'current'
  | 'both'
  | 'none'
  | 'not_required';

export type InternshipQualityStatementId =
  | 'A_practical_tools'
  | 'B_meaningful_projects'
  | 'C_mentor_guidance'
  | 'D_apply_academic_knowledge'
  | 'E_evaluated_by_tasks'
  | 'F_career_understanding';

export type InternshipBarrierId =
  | 'lack_awareness'
  | 'finding_genuine'
  | 'paid_internship_scams'
  | 'limited_in_field'
  | 'lack_industry_connections'
  | 'academic_workload_attendance'
  | 'limited_faculty_guidance'
  | 'lack_skills_confidence'
  | 'financial_constraints'
  | 'limited_access_mentors'
  | 'geographical_limitations'
  | 'lack_real_world_projects'
  | 'no_barriers'
  | 'other';

// Section D: Student Communities
export type CommunityValueId =
  | 'practical_technical_skills'
  | 'real_world_projects'
  | 'technologies_beyond_curriculum'
  | 'mentorship'
  | 'communication_presentation'
  | 'leadership_organisation'
  | 'networks_friendships'
  | 'career_internships'
  | 'entrepreneurship_ideas'
  | 'open_source_social_impact'
  | 'competitions_hackathons'
  | 'no_value_yet'
  | 'not_associated'
  | 'other';

export type CommunityChallengeId =
  | 'lack_awareness'
  | 'academic_workload'
  | 'attendance_restrictions'
  | 'permission_support_difficulties'
  | 'lack_funding_infrastructure'
  | 'limited_mentor_access'
  | 'intro_heavy_low_practical'
  | 'finding_collaborators'
  | 'lack_continuity'
  | 'cliquish_concentration'
  | 'limited_inter_community_collab'
  | 'lack_recognition'
  | 'conversion_to_careers'
  | 'no_challenges'
  | 'not_associated'
  | 'other';

// Section E: Institutional Challenges & Opportunities
export type InstitutionalCategory =
  | 'academic_admin'
  | 'infrastructure_resources'
  | 'mentorship_career'
  | 'student_support';

export type InstitutionalChallengeId =
  | 'exam_delays'
  | 'revaluation_cert_delays'
  | 'admin_info_support'
  | 'heavy_workload'
  | 'attendance_rigidity'
  | 'curriculum_impractical'
  | 'limited_lab_library'
  | 'inadequate_research_infra'
  | 'limited_software_tools'
  | 'insufficient_mentorship'
  | 'limited_quality_internships'
  | 'lack_placement_support'
  | 'scholarship_unawareness'
  | 'soft_skills_barrier'
  | 'financial_barriers'
  | 'insufficient_community_support'
  | 'limited_entrepreneurship'
  | 'limited_student_voice'
  | 'wellbeing_counselling_gaps'
  | 'limited_inter_college_collab'
  | 'no_challenges'
  | 'other';

export type ImprovementId =
  | 'project_based_learning'
  | 'university_industry_partnerships'
  | 'verified_internships'
  | 'exam_evaluation_reform'
  | 'industry_relevant_curricula'
  | 'stronger_faculty_mentorship'
  | 'better_labs_innovation_spaces'
  | 'academic_flexibility'
  | 'academic_credit_for_projects'
  | 'career_soft_skills'
  | 'student_community_support'
  | 'startup_incubation'
  | 'scholarships_funding'
  | 'central_opportunity_portal'
  | 'cross_college_collaboration'
  | 'student_governance'
  | 'wellbeing_support'
  | 'other';

// Section F: Student Voices
export type CollaborativeReadiness =
  | 'design_implement'
  | 'pilot_programmes'
  | 'organise_coordinate'
  | 'ideas_discussions'
  | 'maybe_conditional'
  | 'not_now';

export type ContributionAreaId =
  | 'practical_learning'
  | 'industry_projects'
  | 'research_innovation'
  | 'entrepreneurship_startups'
  | 'opensource_tech'
  | 'student_communities'
  | 'education_policy'
  | 'social_impact'
  | 'career_mentorship'
  | 'other';

// Navigation & Wizard Sections
export type SectionId =
  | 'sectionA'
  | 'sectionB'
  | 'sectionC'
  | 'sectionD'
  | 'sectionE'
  | 'sectionF';

export type WizardStepId =
  | 'intro'
  | 'sectionA'
  | 'sectionB'
  | 'sectionC'
  | 'sectionD'
  | 'sectionE'
  | 'sectionF'
  | 'review'
  | 'success';

// ============================================================================
// 3. Question Schema & Content Structures
// ============================================================================

export type QuestionType =
  | 'single_choice'
  | 'multi_choice'
  | 'matrix_rating'
  | 'open_text'
  | 'composite';

export interface QuestionOption {
  id: string;
  label: string;
  isExclusive?: boolean;
  hasOtherInput?: boolean;
  otherPlaceholder?: string;
  category?: InstitutionalCategory;
}

export interface MatrixRowDefinition {
  id: string;
  code: string;
  statement: string;
}

export interface QuestionCategoryDefinition {
  id: InstitutionalCategory;
  title: string;
  description?: string;
  optionIds: string[];
}

export interface SubQuestionDefinition {
  id: string;
  title: string;
  instruction?: string;
  type: QuestionType;
  required?: boolean;
  options?: QuestionOption[];
  placeholder?: string;
  condition?: {
    field: string;
    operator: 'equals' | 'not_equals' | 'includes' | 'not_includes';
    value: any;
  };
}

export interface QuestionDefinition {
  id: string;
  number: number;
  sectionId: SectionId;
  title: string;
  instruction: string;
  type: QuestionType;
  required: boolean;
  maxSelections?: number;
  options?: QuestionOption[];
  matrixRows?: MatrixRowDefinition[];
  scaleOptions?: LikertOption[];
  categories?: QuestionCategoryDefinition[];
  subQuestions?: SubQuestionDefinition[];
  condition?: {
    field: string;
    operator: 'equals' | 'not_equals' | 'includes' | 'not_includes';
    value: any;
  };
  contextNote?: string;
  guidingPrompts?: string[];
  placeholder?: string;
  minLength?: number;
  maxLength?: number;
}

export interface SectionDefinition {
  id: SectionId;
  stepIndex: number;
  number: 'A' | 'B' | 'C' | 'D' | 'E' | 'F';
  title: string;
  subtitle: string;
  description: string;
  questionIds: string[];
}

// ============================================================================
// 4. Survey Response Data Model
// ============================================================================

export interface SurveyMetadata {
  startedAt: string;
  completedAt?: string;
  version: string;
  language?: string;
  clientTimestamp?: number;
}

export interface SectionAResponse {
  academicStatus: AcademicStatus | '';
  academicStatusOther?: string;
  university: UniversityId | '';
  universityOther?: string;
  college?: string; // Optional
  programme: string; // Required
  communities: CommunityId[];
  communitiesOther?: string;
  involvementLevel: CommunityInvolvementLevel | CommunityInvolvementLevel[] | '';
}

export interface SectionBResponse {
  overallExperience: OverallExperienceId[]; // Max 3
  overallExperienceOther?: string;
  ratings: Record<LearningStatementId | string, LikertRating>;
}

export interface SectionCResponse {
  internshipStatus: InternshipStatus | '';
  qualityRatings?: Record<InternshipQualityStatementId | string, LikertRating> | null;
  barriers: InternshipBarrierId[]; // Max 3
  barriersOther?: string;
}

export interface SectionDResponse {
  valueGained: CommunityValueId[]; // Max 3
  valueGainedOther?: string;
  challengesFaced: CommunityChallengeId[]; // Max 3
  challengesFacedOther?: string;
}

export interface SectionEResponse {
  experiencedChallenges: InstitutionalChallengeId[]; // Max 3 across 4 categories
  experiencedChallengesOther?: string;
  improvements: ImprovementId[]; // Max 3
  improvementsOther?: string;
}

export interface SectionFResponse {
  majorProblem: {
    description: string;
  };
  proposedSolution: {
    description: string;
  };
  initiativeInterest: CollaborativeReadiness | '';
  contributionAreas?: ContributionAreaId[];
  contributionAreasOther?: string;

  // Compatibility aliases for survey_spec / export routines:
  majorProblemNarrative?: string;
  practicalSolutionProposal?: string;
  collaborativeReadiness?: CollaborativeReadiness;
}

export interface SurveyResponse {
  metadata: SurveyMetadata;
  sectionA: SectionAResponse;
  sectionB: SectionBResponse;
  sectionC: SectionCResponse;
  sectionD: SectionDResponse;
  sectionE: SectionEResponse;
  sectionF: SectionFResponse;
}

// ============================================================================
// 5. Validation Errors & Form State
// ============================================================================

export type ValidationErrorMap = Record<string, string>;

export interface SectionValidationResult {
  isValid: boolean;
  errors: ValidationErrorMap;
}

export interface SurveyValidationResult {
  isValid: boolean;
  sectionResults: Record<SectionId, SectionValidationResult>;
  totalErrors: number;
}

// ============================================================================
// 6. JSON & CSV Export Payloads
// ============================================================================

export interface SurveySubmissionPayload {
  metadata: {
    surveyVersion: string;
    submittedAt: string;
    language: string;
    clientTimestamp?: number;
  };
  sectionA: SectionAResponse;
  sectionB: SectionBResponse;
  sectionC: SectionCResponse;
  sectionD: SectionDResponse;
  sectionE: SectionEResponse;
  sectionF: SectionFResponse;
}

export interface SurveyExportJson {
  exportDate: string;
  appName: string;
  surveyId: string;
  response: SurveySubmissionPayload;
}

export interface CsvColumnMapping {
  header: string;
  accessor: (response: SurveyResponse) => string;
}

