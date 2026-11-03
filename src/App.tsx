import React, { useState, useEffect } from 'react';
import { Header } from './components/layout/Header';
import { HeroSection } from './components/layout/HeroSection';
import { ProgressBar } from './components/layout/ProgressBar';
import { WizardNav } from './components/layout/WizardNav';
import { Footer } from './components/layout/Footer';
import { DraftRestoredBanner } from './components/common/DraftRestoredBanner';
import { CongratulationsConclusion } from './components/submission/CongratulationsConclusion';
import { ScrollProgressBar } from './components/common/ScrollProgressBar';
import { ScrollToTopWidget } from './components/common/ScrollToTopWidget';
import { AmbientBackground } from './components/common/AmbientBackground';
import { WIZARD_STEPS } from './types/navigation';
import { useSurveyStore } from './store/surveyStore';

// Sections A-F
import { SectionAAbout } from './components/sections/SectionAAbout';
import { SectionBAcademic } from './components/sections/SectionBAcademic';
import { SectionCInternships } from './components/sections/SectionCInternships';
import { SectionDCommunities } from './components/sections/SectionDCommunities';
import { SectionEInstitutional } from './components/sections/SectionEInstitutional';
import { SectionFVoices } from './components/sections/SectionFVoices';
import { EmbeddedGFormView } from './components/submission/EmbeddedGFormView';

export const App: React.FC = () => {
  const store = useSurveyStore();
  const {
    currentStep,
    visitedSteps,
    lastSavedAt,
    isSaving,
    errors,
    nextStep,
    prevStep,
    goToStep,
    resetSurvey,
  } = store;

  const [viewMode, setViewMode] = useState<'hero' | 'survey'>('hero');
  const [surveyFormat, setSurveyFormat] = useState<'interactive' | 'gform'>('interactive');

  // Smooth scroll to container when step changes in survey mode
  useEffect(() => {
    if (viewMode === 'survey') {
      const el = document.getElementById('survey-active-container');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }, [currentStep, viewMode]);

  const activeMeta = WIZARD_STEPS[currentStep - 1] || WIZARD_STEPS[0];
  const stepValidationError = Object.values(errors)[0] || null;

  const handleNextStep = () => {
    const isValid = nextStep();
    if (isValid) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setTimeout(() => {
        const firstErrorEl = document.querySelector('[role="alert"], [aria-invalid="true"]');
        if (firstErrorEl) {
          firstErrorEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 50);
    }
  };

  const handleStartSurvey = () => {
    setViewMode('survey');
    goToStep(1);
    setTimeout(() => {
      const el = document.getElementById('survey-active-container');
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 40);
  };

  const handleSelectSection = (stepNumber: number) => {
    setViewMode('survey');
    goToStep(stepNumber);
    setTimeout(() => {
      const el = document.getElementById('survey-active-container');
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 40);
  };

  const handleResetDraft = () => {
    if (
      window.confirm(
        'Are you sure you want to clear your saved survey draft and restart? This action cannot be undone.'
      )
    ) {
      resetSurvey();
      alert('Your survey draft has been cleared.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FBF9F4] dark:bg-[#0B0A0F] text-[#0B0A0F] dark:text-[#FBF9F4] transition-colors duration-300 relative selection:bg-[#CCFF00] selection:text-[#0B0A0F]">
      
      {/* 0. Top Dynamic Scroll Progress Indicator */}
      <ScrollProgressBar />

      {/* 0. Ambient Floating Depth Background & Grid */}
      <AmbientBackground />
      
      {/* 1. Header with Autosave status & View Switcher */}
      <Header
        currentStep={currentStep}
        totalSteps={WIZARD_STEPS.length}
        lastSavedAt={lastSavedAt}
        isSaving={isSaving}
        activeView={viewMode}
        onToggleView={(view) => {
          setViewMode(view);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* 2. Main Layout Shell */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Draft Restored Alert Banner */}
        <DraftRestoredBanner />

        {/* VIEW 1: STORYTELLING HERO WITH 3D ELEMENTS */}
        {viewMode === 'hero' ? (
          <HeroSection
            onStartSurvey={handleStartSurvey}
            onSelectSection={handleSelectSection}
            onOpenGForm={() => {
              setViewMode('survey');
              setSurveyFormat('gform');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        ) : (
          /* VIEW 2: STEP-BY-STEP SURVEY CHAPTERS OR EMBEDDED GFORM */
          <div className="space-y-8 animate-flowIn">
            
            {/* Survey Format Switcher (Interactive vs Official Embedded Google Form) */}
            <div className="flex items-center justify-between p-1.5 rounded-2xl bg-white dark:bg-[#14121F] border border-[#0B0A0F]/12 dark:border-white/10 shadow-xs max-w-sm mx-auto">
              <button
                type="button"
                onClick={() => setSurveyFormat('interactive')}
                className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  surveyFormat === 'interactive'
                    ? 'bg-[#0B0A0F] dark:bg-[#CCFF00] text-white dark:text-[#0B0A0F] shadow-midnight-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-[#0B0A0F] dark:hover:text-white'
                }`}
              >
                ✨ Interactive Mode
              </button>
              <button
                type="button"
                onClick={() => setSurveyFormat('gform')}
                className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  surveyFormat === 'gform'
                    ? 'bg-[#0B0A0F] dark:bg-[#CCFF00] text-white dark:text-[#0B0A0F] shadow-midnight-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-[#0B0A0F] dark:hover:text-white'
                }`}
              >
                📝 Embedded Google Form
              </button>
            </div>

            {surveyFormat === 'gform' ? (
              <EmbeddedGFormView onSwitchToInteractive={() => setSurveyFormat('interactive')} />
            ) : (
              <>
                {/* Step Pipeline Indicator */}
                <ProgressBar
                  currentStep={currentStep}
                  visitedSteps={visitedSteps}
                  onStepClick={(step) => goToStep(step)}
                  onReturnToHero={() => {
                    setViewMode('hero');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                />

                {/* Dynamic Survey Question Container */}
                <section
                  id="survey-active-container"
                  aria-live="polite"
                  className="bg-white dark:bg-[#121118] border border-[#0B0A0F]/15 dark:border-white/10 rounded-3xl p-6 sm:p-10 md:p-12 shadow-glass dark:shadow-glass-dark transition-all"
                >
                  {/* Section Header (Sections B to F; Section A has custom Purple Movement display heading) */}
                  {currentStep > 1 && currentStep < 7 && (
                    <div className="mb-8 pb-5 border-b border-[#0B0A0F]/10 dark:border-white/10">
                      <div className="flex items-center space-x-2 font-mono text-xs uppercase tracking-wider text-[#0B0A0F] dark:text-[#CCFF00] font-black mb-1.5">
                        <span className="bg-[#CCFF00] text-[#0B0A0F] px-2.5 py-1 rounded-lg font-black tracking-wider border border-[#0B0A0F]/20">
                          {`SECTION ${activeMeta.code} OF 6`}
                        </span>
                      </div>
                      <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-[#0B0A0F] dark:text-white tracking-tight">
                        {activeMeta.title}
                      </h2>
                      <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mt-1.5 font-sans leading-relaxed">
                        {activeMeta.subtitle}
                      </p>
                    </div>
                  )}

              {/* Wizard Step Switcher with Smooth Slide-in Transition */}
              <div key={currentStep} className="space-y-8 animate-fadeInUp">
                {currentStep === 1 && <SectionAAbout />}
                {currentStep === 2 && <SectionBAcademic />}
                {currentStep === 3 && <SectionCInternships />}
                {currentStep === 4 && <SectionDCommunities />}
                {currentStep === 5 && <SectionEInstitutional />}
                {currentStep === 6 && <SectionFVoices />}
                {currentStep === 7 && (
                  <CongratulationsConclusion
                    onReturnToHome={() => {
                      setViewMode('hero');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    onEditSection={(stepNum) => goToStep(stepNum)}
                  />
                )}
              </div>

              {/* Bottom Navigation */}
              {currentStep < 7 && (
                <WizardNav
                  currentStep={currentStep}
                  totalSteps={WIZARD_STEPS.length}
                  onPrev={prevStep}
                  onNext={handleNextStep}
                  onJumpToReview={() => goToStep(7)}
                  onBackToHero={() => {
                    setViewMode('hero');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  canProceed={true}
                  validationError={stepValidationError}
                  isSubmitting={false}
                />
              )}
            </section>
              </>
            )}
          </div>
        )}
      </main>

      {/* 3. Midnight Black Footer */}
      <Footer 
        onResetDraft={handleResetDraft}
        onReturnToHero={() => {
          setViewMode('hero');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* 4. Interactive Floating Scroll-to-Top Widget */}
      <ScrollToTopWidget />
    </div>
  );
};

export default App;
