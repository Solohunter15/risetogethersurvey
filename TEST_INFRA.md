# E2E Test Infra: Kerala Student Experience & Transformation Survey

## Test Philosophy
- Opaque-box, requirement-driven.
- Derived directly from `ORIGINAL_REQUEST.md` and user-facing survey specifications without coupling to internal component implementations.
- Systematic 4-tier methodology: Category-Partition, Boundary Value Analysis, Pairwise Combinatorial Testing, and Real-World Workload Testing.

## Feature Inventory & Test Coverage
| # | Feature | Source (Requirement) | Tier 1 (Coverage) | Tier 2 (Boundaries) | Tier 3 (Cross-Feature) | Tier 4 (Workload) |
|---|---------|---------------------|:-----------------:|:-------------------:|:---------------------:|:-----------------:|
| 1 | Logo, Header & Theme | ORIGINAL_REQUEST §Header, Logo asset | 5 tests | 3 tests | ✓ | ✓ |
| 2 | Section A (About You) | ORIGINAL_REQUEST §A (Q1, Q2, Q3) | 6 tests | 5 tests | ✓ | ✓ |
| 3 | Section B (Academic & Practical) | ORIGINAL_REQUEST §B (Q4, Q5) | 6 tests | 5 tests | ✓ | ✓ |
| 4 | Section C (Internships & Industry) | ORIGINAL_REQUEST §C (Q6, Q7, Q8) | 6 tests | 5 tests | ✓ | ✓ |
| 5 | Section D (Communities) | ORIGINAL_REQUEST §D (Q9, Q10) | 5 tests | 5 tests | ✓ | ✓ |
| 6 | Section E (Institutional Challenges) | ORIGINAL_REQUEST §E (Q11, Q12) | 6 tests | 5 tests | ✓ | ✓ |
| 7 | Section F (Voices & Solutions) | ORIGINAL_REQUEST §F (Q13, Q14, Q15) | 6 tests | 5 tests | ✓ | ✓ |
| 8 | Multi-Step Navigation & Progress | ORIGINAL_REQUEST §Instructions | 5 tests | 5 tests | ✓ | ✓ |
| 9 | Validation & Max-3 Capping | ORIGINAL_REQUEST §Constraints | 5 tests | 6 tests | ✓ | ✓ |
| 10| LocalStorage Autosave & Recovery | User Experience Guarantee | 5 tests | 4 tests | ✓ | ✓ |
| 11| Review & Inline Edit Screen | Submission Audit | 5 tests | 3 tests | ✓ | ✓ |
| 12| JSON & CSV Export Generators | Data Portability | 5 tests | 4 tests | ✓ | ✓ |
| 13| Post-Submission & Social Share | ORIGINAL_REQUEST §Conclusion | 5 tests | 3 tests | ✓ | ✓ |

## Test Architecture
- **Test Runner**: Playwright (`@playwright/test`) executing against `vite preview` (or `vite dev` on local port 5173 / 4173) using pre-installed Chromium `chromium-1223` in `%LOCALAPPDATA%\ms-playwright`.
- **Invocation**: `npm run test:e2e` or `npx playwright test`
- **Output & Artifacts**: Playwright standard console reporter and HTML/JSON test results.
- **Pass/Fail Semantics**: 100% tests must pass with exit code 0. Zero flaky test allowances.

## Real-World Application Scenarios (Tier 4)
| # | Scenario | Features Exercised | Viewport |
|---|----------|--------------------|----------|
| 1 | Complete First-Year Engineering Student Survey | All Sections A-F, Q6 no-internship skip, autosave, submission, JSON export | Mobile (375x812) |
| 2 | Final-Year KTU Student with Internship & IEDC Leadership | All Sections A-F, Q6/Q7 matrix evaluation, Q11 institutional bottlenecks, CSV export | Desktop (1280x800) |
| 3 | Postgraduate Researcher with Deep Problem & Solution Input | Structured textareas Q13/Q14, Q15 multi-contributions, Review audit editing | Tablet (768x1024) |
| 4 | Offline / Session Interruption & Recovery | Partial completion of Sections A-C, browser reload, state restoration, continuation | Desktop (1440x900) |
| 5 | Dark Mode End-to-End Submission & Social Sharing | Theme toggle, full survey completion, WhatsApp share intent verification | Mobile (412x915) |

## Coverage Thresholds
- **Tier 1 (Feature Coverage)**: ≥5 tests per major feature area (Minimum: 50 tests)
- **Tier 2 (Boundary & Corner Cases)**: ≥5 tests for boundary conditions (max-3 cap violations, empty required fields, conditional branch triggers, mutual exclusivity resets)
- **Tier 3 (Cross-Feature Combinations)**: Pairwise interactions (Theme toggle + Autosave + Step navigation + Capping)
- **Tier 4 (Real-World Scenarios)**: ≥5 complete end-to-end user journeys
- **Total Suite Minimum**: >75 test assertions
