/**
 * Kerala Student Experience & Higher Education Transformation Survey
 * Initiative: Beyond Syllabus & Rise Together 2026
 *
 * File: src/store/surveyStore.ts
 * Description: Fully typed reactive state management, debounced LocalStorage engine,
 * step navigation, and validation orchestrator using React 19 useSyncExternalStore.
 */

import { useSyncExternalStore } from 'react';
import {
  SurveyResponse,
  SectionId,
  SurveyValidationResult,
  SectionValidationResult,
} from '../types/survey';
import { createInitialSurveyResponse } from '../data/surveyContent';
import {
  validateStep,
  validateSurvey,
  handleMultiSelectToggle,
} from '../utils/validation';

export const LOCAL_STORAGE_KEY = 'rt2026_survey_responses_v1';
export const AUTOSAVE_DEBOUNCE_MS = 300;

export interface PersistedSurveyState {
  version: string;
  savedAt: string;
  currentStep: number;
  visitedSteps: number[];
  responses: SurveyResponse;
}

export interface SurveyStoreState {
  responses: SurveyResponse;
  currentStep: number; // 1 to 7 (1: Section A, ..., 6: Section F, 7: Review)
  visitedSteps: Set<number>;
  errors: Record<string, string>;
  isSaving: boolean;
  isAutosaved: boolean;
  lastSavedAt: string | null;
  draftRestored: boolean;
  restoredAt: string | null;
  isSubmitting: boolean;
  isSubmitted: boolean;
  submissionId: string | null;

  // Actions
  setAnswer: <S extends keyof SurveyResponse, K extends keyof SurveyResponse[S]>(
    section: S,
    field: K,
    value: SurveyResponse[S][K]
  ) => void;
  setSectionAnswer: <S extends keyof SurveyResponse>(
    section: S,
    patch: Partial<SurveyResponse[S]>
  ) => void;
  toggleMultiSelectOption: (
    section: keyof SurveyResponse,
    field: string,
    optionId: string,
    maxSelections?: number,
    isExclusive?: boolean,
    exclusiveIds?: string[]
  ) => void;
  setCurrentStep: (step: number) => void;
  nextStep: () => boolean;
  prevStep: () => void;
  goToStep: (step: number) => void;
  validateCurrentStep: () => boolean;
  validateAllSections: () => SurveyValidationResult;
  clearErrors: () => void;
  clearFieldError: (fieldKey: string) => void;
  resetSurvey: () => void;
  dismissDraftBanner: () => void;
  setSubmittedState: (id: string) => void;
}

// ---------------------------------------------------------------------------
// Store Implementation (Pub-Sub with useSyncExternalStore)
// ---------------------------------------------------------------------------

class SurveyStoreManager {
  private state: SurveyStoreState;
  private listeners: Set<() => void> = new Set();
  private debounceTimer: ReturnType<typeof setTimeout> | null = null;

  constructor() {
    this.state = this.getInitialState();
    this.hydrateFromStorage();
  }

  private getInitialState(): SurveyStoreState {
    return {
      responses: createInitialSurveyResponse(),
      currentStep: 1,
      visitedSteps: new Set([1]),
      errors: {},
      isSaving: false,
      isAutosaved: false,
      lastSavedAt: null,
      draftRestored: false,
      restoredAt: null,
      isSubmitting: false,
      isSubmitted: false,
      submissionId: null,

      setAnswer: this.setAnswer.bind(this),
      setSectionAnswer: this.setSectionAnswer.bind(this),
      toggleMultiSelectOption: this.toggleMultiSelectOption.bind(this),
      setCurrentStep: this.setCurrentStep.bind(this),
      nextStep: this.nextStep.bind(this),
      prevStep: this.prevStep.bind(this),
      goToStep: this.goToStep.bind(this),
      validateCurrentStep: this.validateCurrentStep.bind(this),
      validateAllSections: this.validateAllSections.bind(this),
      clearErrors: this.clearErrors.bind(this),
      clearFieldError: this.clearFieldError.bind(this),
      resetSurvey: this.resetSurvey.bind(this),
      dismissDraftBanner: this.dismissDraftBanner.bind(this),
      setSubmittedState: this.setSubmittedState.bind(this),
    };
  }

  public getState = (): SurveyStoreState => {
    return this.state;
  };

  public subscribe = (listener: () => void): (() => void) => {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  };

  private notify() {
    for (const listener of this.listeners) {
      listener();
    }
  }

  private setState(partial: Partial<SurveyStoreState>) {
    this.state = { ...this.state, ...partial };
    this.notify();
  }

  // -------------------------------------------------------------------------
  // LocalStorage Hydration & Autosave
  // -------------------------------------------------------------------------

  private hydrateFromStorage() {
    if (typeof window === 'undefined') return;

    try {
      const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (!raw) return;

      const parsed: PersistedSurveyState = JSON.parse(raw);
      if (parsed && parsed.responses) {
        const defaultResponses = createInitialSurveyResponse();
        const mergedResponses: SurveyResponse = {
          metadata: {
            ...defaultResponses.metadata,
            ...parsed.responses.metadata,
          },
          sectionA: {
            ...defaultResponses.sectionA,
            ...parsed.responses.sectionA,
          },
          sectionB: {
            ...defaultResponses.sectionB,
            ...parsed.responses.sectionB,
            ratings: {
              ...defaultResponses.sectionB.ratings,
              ...(parsed.responses.sectionB?.ratings || {}),
            },
          },
          sectionC: {
            ...defaultResponses.sectionC,
            ...parsed.responses.sectionC,
            qualityRatings: parsed.responses.sectionC?.qualityRatings ?? null,
          },
          sectionD: {
            ...defaultResponses.sectionD,
            ...parsed.responses.sectionD,
          },
          sectionE: {
            ...defaultResponses.sectionE,
            ...parsed.responses.sectionE,
          },
          sectionF: {
            ...defaultResponses.sectionF,
            ...parsed.responses.sectionF,
            majorProblem: {
              ...defaultResponses.sectionF.majorProblem,
              ...(parsed.responses.sectionF?.majorProblem || {}),
            },
            proposedSolution: {
              ...defaultResponses.sectionF.proposedSolution,
              ...(parsed.responses.sectionF?.proposedSolution || {}),
            },
          },
        };

        const restoredVisited = new Set(
          Array.isArray(parsed.visitedSteps) && parsed.visitedSteps.length > 0
            ? parsed.visitedSteps
            : [1]
        );

        const restoredStep =
          typeof parsed.currentStep === 'number' &&
          parsed.currentStep >= 1 &&
          parsed.currentStep <= 7
            ? parsed.currentStep
            : 1;

        restoredVisited.add(restoredStep);

        const formattedRestoredTime = parsed.savedAt
          ? new Date(parsed.savedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          : 'earlier session';

        this.setState({
          responses: mergedResponses,
          currentStep: restoredStep,
          visitedSteps: restoredVisited,
          draftRestored: true,
          restoredAt: formattedRestoredTime,
          lastSavedAt: formattedRestoredTime,
          isAutosaved: true,
        });
      }
    } catch (err) {
      console.warn('Failed to hydrate survey state from localStorage:', err);
    }
  }

  private scheduleAutosave() {
    if (typeof window === 'undefined') return;

    this.setState({ isSaving: true });

    if (this.debounceTimer) {
      clearTimeout(this.debounceTimer);
    }

    this.debounceTimer = setTimeout(() => {
      try {
        const payload: PersistedSurveyState = {
          version: '1.0.0',
          savedAt: new Date().toISOString(),
          currentStep: this.state.currentStep,
          visitedSteps: Array.from(this.state.visitedSteps),
          responses: this.state.responses,
        };

        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(payload));

        const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        this.setState({
          isSaving: false,
          isAutosaved: true,
          lastSavedAt: timeStr,
        });
      } catch (err) {
        console.error('Failed to autosave survey draft to localStorage:', err);
        this.setState({ isSaving: false });
      }
    }, AUTOSAVE_DEBOUNCE_MS);
  }

  // -------------------------------------------------------------------------
  // Actions
  // -------------------------------------------------------------------------

  public setAnswer<S extends keyof SurveyResponse, K extends keyof SurveyResponse[S]>(
    section: S,
    field: K,
    value: SurveyResponse[S][K]
  ) {
    const updatedResponses: SurveyResponse = {
      ...this.state.responses,
      [section]: {
        ...this.state.responses[section],
        [field]: value,
      },
    };

    // Auto-clear specific field error if present
    const fieldKey = `${String(section)}.${String(field)}`;
    const newErrors = { ...this.state.errors };
    if (newErrors[fieldKey]) {
      delete newErrors[fieldKey];
    }

    this.setState({
      responses: updatedResponses,
      errors: newErrors,
    });

    this.scheduleAutosave();
  }

  public setSectionAnswer<S extends keyof SurveyResponse>(
    section: S,
    patch: Partial<SurveyResponse[S]>
  ) {
    const updatedResponses: SurveyResponse = {
      ...this.state.responses,
      [section]: {
        ...this.state.responses[section],
        ...patch,
      },
    };

    this.setState({ responses: updatedResponses });
    this.scheduleAutosave();
  }

  public toggleMultiSelectOption(
    section: keyof SurveyResponse,
    field: string,
    optionId: string,
    maxSelections: number = 3,
    isExclusive: boolean = false,
    exclusiveIds: string[] = []
  ) {
    const currentValues = ((this.state.responses[section] as any)?.[field] as string[]) || [];
    const nextValues = handleMultiSelectToggle(
      currentValues,
      optionId,
      maxSelections,
      isExclusive,
      exclusiveIds
    );

    this.setAnswer(section as any, field as any, nextValues as any);
  }

  public setCurrentStep(step: number) {
    const bounded = Math.max(1, Math.min(7, step));
    const newVisited = new Set(this.state.visitedSteps);
    newVisited.add(bounded);

    this.setState({
      currentStep: bounded,
      visitedSteps: newVisited,
    });

    this.scheduleAutosave();
  }

  public nextStep(): boolean {
    const validation = this.validateCurrentStep();
    if (!validation) {
      return false;
    }

    if (this.state.currentStep < 7) {
      this.setCurrentStep(this.state.currentStep + 1);
      return true;
    }
    return true;
  }

  public prevStep() {
    if (this.state.currentStep > 1) {
      this.setCurrentStep(this.state.currentStep - 1);
    }
  }

  public goToStep(step: number) {
    this.setCurrentStep(step);
  }

  public validateCurrentStep(): boolean {
    if (this.state.currentStep === 7) {
      // Review step: validate full survey
      const allResults = this.validateAllSections();
      return allResults.isValid;
    }

    const result: SectionValidationResult = validateStep(
      this.state.currentStep,
      this.state.responses
    );

    this.setState({ errors: result.errors });
    return result.isValid;
  }

  public validateAllSections(): SurveyValidationResult {
    const result = validateSurvey(this.state.responses);

    // Flatten all section errors into single record
    const allErrors: Record<string, string> = {};
    for (const secKey of Object.keys(result.sectionResults) as SectionId[]) {
      Object.assign(allErrors, result.sectionResults[secKey].errors);
    }

    this.setState({ errors: allErrors });
    return result;
  }

  public clearErrors() {
    this.setState({ errors: {} });
  }

  public clearFieldError(fieldKey: string) {
    if (this.state.errors[fieldKey]) {
      const next = { ...this.state.errors };
      delete next[fieldKey];
      this.setState({ errors: next });
    }
  }

  public resetSurvey() {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(LOCAL_STORAGE_KEY);
    }

    this.setState({
      responses: createInitialSurveyResponse(),
      currentStep: 1,
      visitedSteps: new Set([1]),
      errors: {},
      isSaving: false,
      isAutosaved: false,
      lastSavedAt: null,
      draftRestored: false,
      restoredAt: null,
      isSubmitting: false,
      isSubmitted: false,
      submissionId: null,
    });
  }

  public dismissDraftBanner() {
    this.setState({ draftRestored: false });
  }

  public setSubmittedState(id: string) {
    this.setState({
      isSubmitted: true,
      submissionId: id,
      isSubmitting: false,
    });
  }
}

// Singleton Store Instance
export const surveyStore = new SurveyStoreManager();

// ---------------------------------------------------------------------------
// React Hook: useSurveyStore
// ---------------------------------------------------------------------------

export function useSurveyStore(): SurveyStoreState;
export function useSurveyStore<T>(selector: (state: SurveyStoreState) => T): T;
export function useSurveyStore<T>(selector?: (state: SurveyStoreState) => T): T | SurveyStoreState {
  const getSnapshot = () => {
    const fullState = surveyStore.getState();
    return selector ? selector(fullState) : fullState;
  };

  return useSyncExternalStore(
    surveyStore.subscribe,
    getSnapshot,
    getSnapshot
  );
}

export default useSurveyStore;
