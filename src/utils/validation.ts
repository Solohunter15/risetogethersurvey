/**
 * Kerala Student Experience & Higher Education Transformation Survey
 * Initiative: Beyond Syllabus & Rise Together 2026
 *
 * File: src/utils/validation.ts
 * Description: Deterministic validation engine covering Sections A through F,
 * max 3 selection caps, mutual exclusivity, and conditional matrix rules.
 */

import {
  SurveyResponse,
  SectionId,
  SectionAResponse,
  SectionBResponse,
  SectionCResponse,
  SectionDResponse,
  SectionEResponse,
  SectionFResponse,
  SectionValidationResult,
  SurveyValidationResult,
  ValidationErrorMap,
} from '../types/survey';

// ---------------------------------------------------------------------------
// Multi-Select Toggle & Mutual Exclusivity Helper
// ---------------------------------------------------------------------------

/**
 * Handles adding/removing an option with automatic mutual exclusivity
 * and max selections enforcement.
 */
export function handleMultiSelectToggle<T extends string>(
  currentValues: T[],
  optionId: T,
  maxSelections?: number,
  isExclusive: boolean = false,
  exclusiveOptionIds: T[] = []
): T[] {
  const isCurrentlySelected = currentValues.includes(optionId);

  // If deselecting, simply remove it
  if (isCurrentlySelected) {
    return currentValues.filter((id) => id !== optionId);
  }

  // If selecting an exclusive option (e.g., 'none', 'no_barriers', 'no_challenges')
  if (isExclusive) {
    return [optionId];
  }

  // If selecting a normal option, remove any active exclusive options first
  const filtered = currentValues.filter((id) => !exclusiveOptionIds.includes(id));

  // If already at or exceeding maxSelections, reject new addition
  if (typeof maxSelections === 'number' && maxSelections > 0 && filtered.length >= maxSelections) {
    return filtered; // Cannot exceed maxSelections cap
  }

  return [...filtered, optionId];
}

// ---------------------------------------------------------------------------
// Section A: About You Validation
// ---------------------------------------------------------------------------

export function validateSectionA(data: SectionAResponse): SectionValidationResult {
  const errors: ValidationErrorMap = {};

  // Q1: Academic Status
  if (!data.academicStatus || data.academicStatus.trim() === '') {
    errors['sectionA.academicStatus'] = 'Please select your current academic status.';
  } else if (data.academicStatus === 'other' && (!data.academicStatusOther || data.academicStatusOther.trim() === '')) {
    errors['sectionA.academicStatusOther'] = 'Please specify your academic status.';
  }

  // Q2: University & Programme
  if (!data.university || data.university.trim() === '') {
    errors['sectionA.university'] = 'Please select your associated university or institution.';
  } else if (data.university === 'other' && (!data.universityOther || data.universityOther.trim() === '')) {
    errors['sectionA.universityOther'] = 'Please specify your university or institution.';
  }

  if (!data.programme || data.programme.trim() === '') {
    errors['sectionA.programme'] = 'Please enter your programme or field of study.';
  }

  // Q3: Communities & Involvement
  if (!data.communities || data.communities.length === 0) {
    errors['sectionA.communities'] = 'Please select at least one community or "I am not currently associated".';
  } else {
    if (data.communities.includes('other' as any) && (!data.communitiesOther || data.communitiesOther.trim() === '')) {
      errors['sectionA.communitiesOther'] = 'Please specify the community name.';
    }
  }

  const hasInvolvement = Array.isArray(data.involvementLevel)
    ? data.involvementLevel.length > 0
    : !!data.involvementLevel && data.involvementLevel.trim() !== '';

  if (!hasInvolvement) {
    errors['sectionA.involvementLevel'] = 'Please select your level of community involvement.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

// ---------------------------------------------------------------------------
// Section B: Academic Experience & Practical Learning Validation
// ---------------------------------------------------------------------------

export const EXPECTED_LEARNING_STATEMENTS = [
  'A_real_world_problems',
  'B_practical_opportunities',
  'C_faculty_guidance',
  'D_critical_thinking',
  'E_beyond_curriculum',
  'F_collaboration_teamwork',
];

export function validateSectionB(data: SectionBResponse): SectionValidationResult {
  const errors: ValidationErrorMap = {};

  // Q4: Overall Educational Experience (Max 3)
  if (!data.overallExperience || data.overallExperience.length === 0) {
    errors['sectionB.overallExperience'] = 'Please select at least one description of your educational experience.';
  } else if (data.overallExperience.length > 3) {
    errors['sectionB.overallExperience'] = 'You can select up to 3 options only.';
  } else if (data.overallExperience.includes('other' as any) && (!data.overallExperienceOther || data.overallExperienceOther.trim() === '')) {
    errors['sectionB.overallExperienceOther'] = 'Please specify your experience.';
  }

  // Q5: Agreement Likert Matrix (6 statements)
  if (!data.ratings) {
    errors['sectionB.ratings'] = 'Please rate all statements in the learning experience matrix.';
  } else {
    for (const stmtId of EXPECTED_LEARNING_STATEMENTS) {
      if (!data.ratings[stmtId] || data.ratings[stmtId].trim() === '') {
        errors[`sectionB.ratings.${stmtId}`] = 'Please provide a rating for this statement.';
      }
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

// ---------------------------------------------------------------------------
// Section C: Internships, Industry Exposure & Career Readiness Validation
// ---------------------------------------------------------------------------

export const EXPECTED_INTERNSHIP_STATEMENTS = [
  'A_practical_tools',
  'B_meaningful_projects',
  'C_mentor_guidance',
  'D_apply_academic_knowledge',
  'E_evaluated_by_tasks',
  'F_career_understanding',
];

export function validateSectionC(data: SectionCResponse): SectionValidationResult {
  const errors: ValidationErrorMap = {};

  // Q6: Internship Status
  if (!data.internshipStatus || data.internshipStatus.trim() === '') {
    errors['sectionC.internshipStatus'] = 'Please select your internship experience status.';
  }

  // Q7: Internship Quality Evaluation (Conditional on Q6)
  const hasInternship = ['completed', 'current', 'both'].includes(data.internshipStatus);
  if (hasInternship) {
    if (!data.qualityRatings) {
      errors['sectionC.qualityRatings'] = 'Please evaluate the quality statements for your internship experience.';
    } else {
      for (const stmtId of EXPECTED_INTERNSHIP_STATEMENTS) {
        if (!data.qualityRatings[stmtId] || data.qualityRatings[stmtId].trim() === '') {
          errors[`sectionC.qualityRatings.${stmtId}`] = 'Please rate this internship statement.';
        }
      }
    }
  }

  // Q8: Barriers (Max 3)
  if (!data.barriers || data.barriers.length === 0) {
    errors['sectionC.barriers'] = 'Please select up to three barriers, or "I have not faced significant barriers".';
  } else if (data.barriers.length > 3) {
    errors['sectionC.barriers'] = 'You can select up to 3 barriers only.';
  } else if (data.barriers.includes('other' as any) && (!data.barriersOther || data.barriersOther.trim() === '')) {
    errors['sectionC.barriersOther'] = 'Please specify the barrier.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

// ---------------------------------------------------------------------------
// Section D: Student Communities & Learning Beyond Classroom Validation
// ---------------------------------------------------------------------------

export function validateSectionD(data: SectionDResponse): SectionValidationResult {
  const errors: ValidationErrorMap = {};

  // Q9: Value Gained (Max 3)
  if (!data.valueGained || data.valueGained.length === 0) {
    errors['sectionD.valueGained'] = 'Please select up to three values gained, or an applicable alternative.';
  } else if (data.valueGained.length > 3) {
    errors['sectionD.valueGained'] = 'You can select up to 3 values only.';
  } else if (data.valueGained.includes('other' as any) && (!data.valueGainedOther || data.valueGainedOther.trim() === '')) {
    errors['sectionD.valueGainedOther'] = 'Please specify the value gained.';
  }

  // Q10: Challenges Faced (Max 3)
  if (!data.challengesFaced || data.challengesFaced.length === 0) {
    errors['sectionD.challengesFaced'] = 'Please select up to three challenges faced, or an applicable alternative.';
  } else if (data.challengesFaced.length > 3) {
    errors['sectionD.challengesFaced'] = 'You can select up to 3 challenges only.';
  } else if (data.challengesFaced.includes('other' as any) && (!data.challengesFacedOther || data.challengesFacedOther.trim() === '')) {
    errors['sectionD.challengesFacedOther'] = 'Please specify the challenge faced.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

// ---------------------------------------------------------------------------
// Section E: Institutional Challenges & Opportunities Validation
// ---------------------------------------------------------------------------

export function validateSectionE(data: SectionEResponse): SectionValidationResult {
  const errors: ValidationErrorMap = {};

  // Q11: Experienced Challenges (Max 3 across all 4 categories)
  if (!data.experiencedChallenges || data.experiencedChallenges.length === 0) {
    errors['sectionE.experiencedChallenges'] = 'Please select up to three challenges you experienced.';
  } else if (data.experiencedChallenges.length > 3) {
    errors['sectionE.experiencedChallenges'] = 'You can select up to 3 challenges across all categories.';
  } else if (data.experiencedChallenges.includes('other' as any) && (!data.experiencedChallengesOther || data.experiencedChallengesOther.trim() === '')) {
    errors['sectionE.experiencedChallengesOther'] = 'Please specify the challenge.';
  }

  // Q12: High-Impact Improvements (Max 3)
  if (!data.improvements || data.improvements.length === 0) {
    errors['sectionE.improvements'] = 'Please select up to three improvements that would make the biggest difference.';
  } else if (data.improvements.length > 3) {
    errors['sectionE.improvements'] = 'You can select up to 3 improvements only.';
  } else if (data.improvements.includes('other' as any) && (!data.improvementsOther || data.improvementsOther.trim() === '')) {
    errors['sectionE.improvementsOther'] = 'Please specify the improvement.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

// ---------------------------------------------------------------------------
// Section F: Student Voices & Collective Solutions Validation
// ---------------------------------------------------------------------------

export function validateSectionF(data: SectionFResponse): SectionValidationResult {
  const errors: ValidationErrorMap = {};

  // Q13: Major Problem (Open-ended essay, min 3 chars)
  const problemText = data.majorProblem?.description?.trim() || data.majorProblemNarrative?.trim() || '';
  if (!problemText) {
    errors['sectionF.majorProblem'] = 'Please describe a major problem you personally experienced as a student.';
  } else if (problemText.length < 3) {
    errors['sectionF.majorProblem'] = 'Please provide a response (minimum 3 characters).';
  }

  // Q14: Practical Solution (Open-ended essay, min 3 chars)
  const solutionText = data.proposedSolution?.description?.trim() || data.practicalSolutionProposal?.trim() || '';
  if (!solutionText) {
    errors['sectionF.proposedSolution'] = 'Please propose one practical change to improve higher education in Kerala.';
  } else if (solutionText.length < 3) {
    errors['sectionF.proposedSolution'] = 'Please provide a solution (minimum 3 characters).';
  }

  // Q15: Initiative Interest
  const interest = data.initiativeInterest || data.collaborativeReadiness || '';
  if (!interest || interest.trim() === '') {
    errors['sectionF.initiativeInterest'] = 'Please select whether you would be interested in contributing.';
  } else if (interest !== 'not_now') {
    if (data.contributionAreas?.includes('other' as any) && (!data.contributionAreasOther || data.contributionAreasOther.trim() === '')) {
      errors['sectionF.contributionAreasOther'] = 'Please specify the contribution area.';
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

// ---------------------------------------------------------------------------
// Step Dispatcher & Global Survey Validator
// ---------------------------------------------------------------------------

export function validateStep(stepNumber: number, responses: SurveyResponse): SectionValidationResult {
  switch (stepNumber) {
    case 1:
      return validateSectionA(responses.sectionA);
    case 2:
      return validateSectionB(responses.sectionB);
    case 3:
      return validateSectionC(responses.sectionC);
    case 4:
      return validateSectionD(responses.sectionD);
    case 5:
      return validateSectionE(responses.sectionE);
    case 6:
      return validateSectionF(responses.sectionF);
    case 7:
      return { isValid: true, errors: {} }; // Review step
    default:
      return { isValid: true, errors: {} };
  }
}

export function validateSurvey(responses: SurveyResponse): SurveyValidationResult {
  const sectionResults: Record<SectionId, SectionValidationResult> = {
    sectionA: validateSectionA(responses.sectionA),
    sectionB: validateSectionB(responses.sectionB),
    sectionC: validateSectionC(responses.sectionC),
    sectionD: validateSectionD(responses.sectionD),
    sectionE: validateSectionE(responses.sectionE),
    sectionF: validateSectionF(responses.sectionF),
  };

  let totalErrors = 0;
  let isValid = true;

  for (const key of Object.keys(sectionResults) as SectionId[]) {
    const res = sectionResults[key];
    const errorCount = Object.keys(res.errors).length;
    totalErrors += errorCount;
    if (!res.isValid) {
      isValid = false;
    }
  }

  return {
    isValid,
    sectionResults,
    totalErrors,
  };
}
