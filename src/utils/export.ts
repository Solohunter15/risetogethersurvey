/**
 * Kerala Student Experience & Higher Education Transformation Survey
 * Initiative: Beyond Syllabus & Rise Together 2026
 *
 * File: src/utils/export.ts
 * Description: Client-side JSON and CSV file download utilities, clipboard summary
 * generator, and simulated API submission service.
 */

import { SurveyResponse, SurveyExportJson } from '../types/survey';
import { SURVEY_METADATA } from '../data/surveyContent';

// ---------------------------------------------------------------------------
// 1. JSON Exporter
// ---------------------------------------------------------------------------

export function generateJsonContent(response: SurveyResponse): string {
  const exportPayload: SurveyExportJson = {
    exportDate: new Date().toISOString(),
    appName: 'Rise Together 2026 Survey',
    surveyId: 'kerala-student-experience-2026',
    response: {
      metadata: {
        surveyVersion: SURVEY_METADATA.version,
        submittedAt: new Date().toISOString(),
        language: 'en',
        clientTimestamp: Date.now(),
      },
      sectionA: response.sectionA,
      sectionB: response.sectionB,
      sectionC: response.sectionC,
      sectionD: response.sectionD,
      sectionE: response.sectionE,
      sectionF: response.sectionF,
    },
  };

  return JSON.stringify(exportPayload, null, 2);
}

export function exportToJson(
  response: SurveyResponse,
  filename: string = 'kerala-student-survey-response.json'
): void {
  const jsonString = generateJsonContent(response);
  const blob = new Blob([jsonString], { type: 'application/json;charset=utf-8;' });
  triggerFileDownload(blob, filename);
}

// ---------------------------------------------------------------------------
// 2. CSV Exporter (RFC 4180 Compliant)
// ---------------------------------------------------------------------------

function escapeCsvCell(value: any): string {
  if (value === null || value === undefined) return '""';
  const stringValue = Array.isArray(value) ? value.join('; ') : String(value);
  if (/[",\n\r]/.test(stringValue)) {
    return `"${stringValue.replace(/"/g, '""')}"`;
  }
  return `"${stringValue}"`;
}

export function generateCsvContent(response: SurveyResponse): string {
  const headers = [
    'Timestamp',
    'Survey_Version',
    'Academic_Status',
    'Academic_Status_Other',
    'University',
    'University_Other',
    'College',
    'Programme',
    'Communities',
    'Communities_Other',
    'Involvement_Level',
    'Differently_Abled',
    'Entrepreneur_Status',
    'Overall_Experience',
    'Overall_Experience_Other',
    'Rating_RealWorldProblems',
    'Rating_PracticalOpportunities',
    'Rating_FacultyGuidance',
    'Rating_CriticalThinking',
    'Rating_BeyondCurriculum',
    'Rating_CollaborationTeamwork',
    'Internship_Status',
    'Internship_Quality_Tools',
    'Internship_Quality_Meaningful',
    'Internship_Quality_Mentors',
    'Internship_Quality_ApplyAcademic',
    'Internship_Quality_TaskEvaluated',
    'Internship_Quality_CareerUnderstanding',
    'Internship_Barriers',
    'Internship_Barriers_Other',
    'Community_Value_Gained',
    'Community_Value_Gained_Other',
    'Community_Challenges',
    'Community_Challenges_Other',
    'Institutional_Challenges',
    'Institutional_Challenges_Other',
    'Priority_Improvements',
    'Priority_Improvements_Other',
    'Major_Problem_Description',
    'Proposed_Practical_Solution',
    'Initiative_Interest',
    'Contribution_Areas',
    'Contribution_Areas_Other',
  ];

  const row = [
    new Date().toISOString(),
    SURVEY_METADATA.version,
    response.sectionA.academicStatus,
    response.sectionA.academicStatusOther || '',
    response.sectionA.university,
    response.sectionA.universityOther || '',
    response.sectionA.college || '',
    response.sectionA.programme,
    response.sectionA.communities,
    response.sectionA.communitiesOther || '',
    Array.isArray(response.sectionA.involvementLevel)
      ? response.sectionA.involvementLevel.join(';')
      : response.sectionA.involvementLevel,
    response.sectionA.isDifferentlyAbled || '',
    response.sectionA.isEntrepreneur || '',
    response.sectionB.overallExperience,
    response.sectionB.overallExperienceOther || '',
    response.sectionB.ratings?.A_real_world_problems || 'NA',
    response.sectionB.ratings?.B_practical_opportunities || 'NA',
    response.sectionB.ratings?.C_faculty_guidance || 'NA',
    response.sectionB.ratings?.D_critical_thinking || 'NA',
    response.sectionB.ratings?.E_beyond_curriculum || 'NA',
    response.sectionB.ratings?.F_collaboration_teamwork || 'NA',
    response.sectionC.internshipStatus,
    response.sectionC.qualityRatings?.A_practical_tools || 'NA',
    response.sectionC.qualityRatings?.B_meaningful_projects || 'NA',
    response.sectionC.qualityRatings?.C_mentor_guidance || 'NA',
    response.sectionC.qualityRatings?.D_apply_academic_knowledge || 'NA',
    response.sectionC.qualityRatings?.E_evaluated_by_tasks || 'NA',
    response.sectionC.qualityRatings?.F_career_understanding || 'NA',
    response.sectionC.barriers,
    response.sectionC.barriersOther || '',
    response.sectionD.valueGained,
    response.sectionD.valueGainedOther || '',
    response.sectionD.challengesFaced,
    response.sectionD.challengesFacedOther || '',
    response.sectionE.experiencedChallenges,
    response.sectionE.experiencedChallengesOther || '',
    response.sectionE.improvements,
    response.sectionE.improvementsOther || '',
    response.sectionF.majorProblem?.description || response.sectionF.majorProblemNarrative || '',
    response.sectionF.proposedSolution?.description || response.sectionF.practicalSolutionProposal || '',
    response.sectionF.initiativeInterest || response.sectionF.collaborativeReadiness || '',
    response.sectionF.contributionAreas || [],
    response.sectionF.contributionAreasOther || '',
  ];

  const headerLine = headers.map(escapeCsvCell).join(',');
  const rowLine = row.map(escapeCsvCell).join(',');

  return `${headerLine}\n${rowLine}\n`;
}

export function exportToCsv(
  response: SurveyResponse,
  filename: string = 'kerala-student-survey-response.csv'
): void {
  const csvString = generateCsvContent(response);
  const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
  triggerFileDownload(blob, filename);
}

// ---------------------------------------------------------------------------
// 3. Helper: Browser File Downloader
// ---------------------------------------------------------------------------

function triggerFileDownload(blob: Blob, filename: string): void {
  if (typeof window === 'undefined') return;

  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

// ---------------------------------------------------------------------------
// 4. Clipboard Text Summary Generator
// ---------------------------------------------------------------------------

export function generateSummaryText(response: SurveyResponse): string {
  const secA = response.sectionA;
  const secF = response.sectionF;

  const differentlyAbledLabel = secA.isDifferentlyAbled === 'yes' ? 'Yes' : secA.isDifferentlyAbled === 'no' ? 'No' : secA.isDifferentlyAbled ? 'Prefer not to say' : '';
  const entrepreneurLabel = secA.isEntrepreneur === 'yes_founder' ? 'Yes (Founder / Business Owner)' : secA.isEntrepreneur === 'yes_part_of_venture' ? 'Yes (Part of startup)' : secA.isEntrepreneur === 'no' ? 'No' : '';

  return `The Purple Movement • Rise Together 2026 - Survey Response Summary
------------------------------------------------------------
Academic Status: ${secA.academicStatus}
University / Institution: ${secA.university}
Programme: ${secA.programme}
Communities: ${secA.communities?.join(', ') || 'None'}${differentlyAbledLabel ? `\nDifferently-Abled: ${differentlyAbledLabel}` : ''}${entrepreneurLabel ? `\nEntrepreneur Status: ${entrepreneurLabel}` : ''}

Key Problem Identified:
${secF.majorProblem?.description || secF.majorProblemNarrative || 'N/A'}

Proposed Practical Solution:
${secF.proposedSolution?.description || secF.practicalSolutionProposal || 'N/A'}

Collaborative Readiness: ${secF.initiativeInterest || secF.collaborativeReadiness || 'N/A'}
------------------------------------------------------------
Recorded: ${new Date().toLocaleString()}
Initiative: The Purple Movement • Rise Together 2026`;
}

// ---------------------------------------------------------------------------
// 5. Mock API Submission Service
// ---------------------------------------------------------------------------

export async function submitSurveyToApi(
  response: SurveyResponse
): Promise<{ success: boolean; id: string; message: string }> {
  // Simulate network latency (800ms)
  await new Promise((resolve) => setTimeout(resolve, 800));

  const submissionId = `RT2026-${Math.random().toString(36).substring(2, 9).toUpperCase()}`;

  // Log payload for auditing
  console.info('[Survey API Mock] Received Survey Submission:', {
    id: submissionId,
    timestamp: new Date().toISOString(),
    payload: response,
  });

  return {
    success: true,
    id: submissionId,
    message: 'Survey responses successfully recorded for The Purple Movement & Rise Together 2026.',
  };
}
