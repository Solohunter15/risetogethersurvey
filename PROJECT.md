# Project: Kerala Student Experience & Higher Education Transformation Survey Website
# Initiative: Beyond Syllabus & Rise Together 2026

## Architecture
The application is a modern, responsive, mobile-first Single Page Application (SPA) built with Vite, React 19, TypeScript, and Tailwind CSS. It embeds the comprehensive 15-question survey across 6 thematic sections (A through F) with an interactive multi-step wizard, real-time constraint validation, robust LocalStorage autosave, pre-submission review audit, client-side JSON/CSV export, and post-submission engagement.

### Architecture Overview
```
+---------------------------------------------------------------------------------+
|                                App Shell (Layout)                               |
|  [Header: Logo & Theme Toggle] [Progress Bar & Step Wizard] [Status: Autosaved] |
+---------------------------------------------------------------------------------+
|                                                                                 |
|  [Active Wizard Step: Section A / B / C / D / E / F / Review / Success]         |
|  - Section A: About You (Q1 Academic Status, Q2 University/Field, Q3 Community) |
|  - Section B: Academic & Practical (Q4 Overall Experience, Q5 Rating Matrix)    |
|  - Section C: Internships & Readiness (Q6 Status, Q7 Quality Matrix, Q8 Barriers)|
|  - Section D: Student Communities (Q9 Value Gained, Q10 Challenges Faced)       |
|  - Section E: Institutional Opportunities (Q11 Challenges, Q12 Improvements)    |
|  - Section F: Student Voices (Q13 Major Problem, Q14 Solution, Q15 Next Steps)  |
|  - Review Step: Full summary audit with inline edit triggers                    |
|  - Success Step: Submission confirmation, JSON/CSV download, WhatsApp sharing   |
|                                                                                 |
+---------------------------------------------------------------------------------+
|                           State & Business Logic Layer                          |
|  - SurveyStore: Typed responses, activeStep, visitedSteps, validationErrors     |
|  - LocalStorage Engine: Debounced auto-sync, crash recovery, reset capability   |
|  - Validation Engine: Capped multi-select (max 3), mutual exclusivity, required |
|  - Exporters: JSON serializer, CSV transformer, Mock API submitter              |
+---------------------------------------------------------------------------------+
```

## Feature Inventory
| # | Feature | Description | Milestone | Source |
|---|---------|-------------|-----------|--------|
| 1 | Project Scaffolding | Vite + React 19 + TypeScript + Tailwind CSS setup | M1 | Survey |
| 2 | Logo Asset & Brand Tokens | Master logo extraction, cropping, favicon, and brand color palette (#55348A, #F15E21, etc.) | M1 | Survey |
| 3 | Responsive App Shell | Header, Hero, Step navigation wizard, Progress bar, Footer, Theme toggle (Dark/Light) | M1 | Survey |
| 4 | Question Input Primitives | Accessible Radio, Checkbox, Matrix Table/Cards, Dropdown, Textarea | M2 | Survey |
| 5 | Section A (About You) | Q1 Academic status, Q2 University & Programme, Q3 Community & Involvement | M2 | Survey |
| 6 | Section B (Academic Experience) | Q4 Experience (max 3 cap), Q5 Agreement Likert Matrix (6 statements, 1-5/NA) | M2 | Survey |
| 7 | Section C (Internships) | Q6 Status, Q7 Quality Likert Matrix (conditional on Q6), Q8 Barriers (max 3) | M2 | Survey |
| 8 | Section D (Student Communities) | Q9 Value gained (max 3), Q10 Challenges faced (max 3) with exclusive logic | M2 | Survey |
| 9 | Section E (Institutional Needs) | Q11 Challenges (22 items in 4 categories, max 3), Q12 Improvements (max 3) | M2 | Survey |
| 10| Section F (Voices & Solutions) | Q13 Problem essay, Q14 Practical solution essay, Q15 Collaborative action | M2 | Survey |
| 11| Survey State Store & Autosave | Typed response state, localStorage debounced persistence, crash restore | M3 | Survey |
| 12| Validation & Constraint Rules | Real-time validation, max-3 cap blocking, mutual exclusivity unchecking | M3 | Survey |
| 13| Review & Audit Screen | Read-only structured summary before submission with section jump-edit links | M3 | Survey |
| 14| Export & Submission Service | Client-side JSON download, CSV download, mock API submission handler | M3 | Survey |
| 15| Post-Submission Celebration | Success confirmation modal, copy summary, WhatsApp/Telegram share links | M3 | Survey |
| 16| E2E Testing Suite (Tiers 1-4) | Playwright test suite for all features, boundaries, combinations, and E2E | M4 | E2E Track |
| 17| Adversarial Hardening & Audit | Tier 5 adversarial stress testing + Forensic Integrity verification | M5 | Final Gate |

## Milestones
| # | Name | Scope | Dependencies | Status |
|---|------|-------|-------------|--------|
| M1 | Scaffolding, Logo Asset & Design System | Vite/React/TS/Tailwind scaffold, logo assets, brand tokens, Layout shell, Theme toggle | none | DONE |
| M2 | Survey Component Primitives & Sections A-F | Accessible question primitives, exact copy and options for Q1-Q15 across all 6 sections | M1 | IN_PROGRESS |
| M3 | Form State, Validation, Autosave, Review & Export | Reactive store, max-3 validation, autosave, review audit screen, JSON/CSV export, success modal | M2 | PLANNED |
| M4 | E2E Testing Suite (Tiers 1-4) | Playwright test harness, Tier 1-4 test suites, TEST_READY.md publication | M1 | PLANNED |
| M5 | 100% E2E Pass, Adversarial Hardening & Forensic Audit | Verification against 100% tests, Tier 5 challenger stress tests, forensic audit clean verdict | M3, M4 | PLANNED |

## Code Layout
```
e:\Projects\TPM\RiseTogther\
├── index.html
├── package.json
├── vite.config.ts
├── tsconfig.json
├── tailwind.config.js / postcss.config.js
├── public/
│   ├── favicon.svg
│   ├── logo.png             # Official Rise Together 2026 logo
│   └── logo-emblem.png      # Extracted emblem
├── src/
│   ├── main.tsx
│   ├── App.tsx
│   ├── index.css            # Tailwind directives and CSS variables
│   ├── types/
│   │   ├── survey.ts        # TypeScript schemas and response interfaces
│   │   └── navigation.ts    # Wizard step definitions
│   ├── data/
│   │   └── surveyContent.ts # Authoritative survey questions, options, descriptions
│   ├── store/
│   │   ├── surveyStore.ts   # Survey state, autosave, step controller
│   │   └── themeStore.ts    # Light/Dark mode state
│   ├── utils/
│   │   ├── validation.ts    # Constraint and rule validators (max 3, mutual exclusion)
│   │   └── export.ts        # JSON and CSV export generators
│   └── components/
│       ├── layout/
│       │   ├── Header.tsx   # Logo, branding title, theme toggle
│       │   ├── ProgressBar.tsx # Step dots and percentage tracker
│       │   ├── WizardNav.tsx # Back / Next / Review button bar
│       │   └── Footer.tsx   # Attribution and privacy note
│       ├── questions/
│       │   ├── RadioSingle.tsx
│       │   ├── CheckboxMulti.tsx # With max-limit awareness
│       │   ├── MatrixRating.tsx  # Responsive desktop table + mobile cards
│       │   ├── GuidedTextarea.tsx
│       │   └── DropdownSelect.tsx
│       ├── sections/
│       │   ├── SectionAAbout.tsx
│       │   ├── SectionBAcademic.tsx
│       │   ├── SectionCInternships.tsx
│       │   ├── SectionDCommunities.tsx
│       │   ├── SectionEInstitutional.tsx
│       │   └── SectionFVoices.tsx
│       └── submission/
│           ├── ReviewAudit.tsx   # Pre-submission review screen
│           └── SuccessModal.tsx  # Post-submission celebration & share
└── tests/
    └── e2e/
        ├── tier1-features.spec.ts
        ├── tier2-boundaries.spec.ts
        ├── tier3-cross-feature.spec.ts
        └── tier4-application.spec.ts
```

## Interface Contracts
### Survey Response Model (`src/types/survey.ts`)
```typescript
export interface SurveyResponse {
  metadata: {
    startedAt: string;
    completedAt?: string;
    version: string;
  };
  sectionA: {
    academicStatus: string;
    university: string;
    universityOther?: string;
    college?: string;
    programme: string;
    communities: string[];
    communitiesOther?: string;
    involvementLevel: string;
  };
  sectionB: {
    overallExperience: string[]; // max 3
    overallExperienceOther?: string;
    ratings: Record<string, string>; // statementId -> 1..5 | N/A
  };
  sectionC: {
    internshipStatus: string;
    qualityRatings?: Record<string, string>; // conditional on Q6
    barriers: string[]; // max 3
    barriersOther?: string;
  };
  sectionD: {
    valueGained: string[]; // max 3
    valueGainedOther?: string;
    challengesFaced: string[]; // max 3
    challengesFacedOther?: string;
  };
  sectionE: {
    experiencedChallenges: string[]; // max 3 across all categories
    experiencedChallengesOther?: string;
    improvements: string[]; // max 3
    improvementsOther?: string;
  };
  sectionF: {
    majorProblem: {
      description: string;
    };
    proposedSolution: {
      description: string;
    };
    initiativeInterest: string;
    contributionAreas?: string[];
    contributionAreasOther?: string;
  };
}
```

### Store Contract (`src/store/surveyStore.ts`)
```typescript
export interface SurveyStoreState {
  responses: Partial<SurveyResponse>;
  currentStep: number; // 0..7 (0: Intro/A, 1: B, 2: C, 3: D, 4: E, 5: F, 6: Review, 7: Submitted)
  errors: Record<string, string>;
  isAutosaved: boolean;
  lastSavedAt: string | null;
  setAnswer: (section: string, field: string, value: any) => void;
  nextStep: () => boolean;
  prevStep: () => void;
  goToStep: (step: number) => void;
  validateCurrentStep: () => boolean;
  resetSurvey: () => void;
  submitSurvey: () => Promise<boolean>;
}
```
