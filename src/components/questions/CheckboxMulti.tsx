import React, { useId, useState } from 'react';
import { Check, AlertCircle, AlertTriangle } from 'lucide-react';
import { QuestionOption, QuestionCategoryDefinition } from '../../types/survey';

export interface CheckboxMultiProps {
  id: string;
  name: string;
  title?: string;
  instruction?: string;
  contextNote?: string;
  options: QuestionOption[];
  categories?: QuestionCategoryDefinition[];
  values: string[];
  onChange: (values: string[]) => void;
  otherValue?: string;
  onOtherChange?: (value: string) => void;
  maxSelections?: number;
  error?: string | null;
  required?: boolean;
  disabled?: boolean;
  testId?: string;
}

export const CheckboxMulti: React.FC<CheckboxMultiProps> = ({
  id,
  name,
  title,
  instruction,
  contextNote,
  options,
  categories,
  values = [],
  onChange,
  otherValue = '',
  onOtherChange,
  maxSelections,
  error,
  required = false,
  disabled = false,
  testId,
}) => {
  const componentId = useId();
  const errorId = `${id}-error-${componentId}`;
  const instructionId = `${id}-instruction-${componentId}`;
  const [capWarning, setCapWarning] = useState<string | null>(null);
  const [shakeTrigger, setShakeTrigger] = useState<boolean>(false);

  const isCapped = typeof maxSelections === 'number' && maxSelections > 0;
  const currentCount = values.length;
  const isAtMax = isCapped && currentCount >= maxSelections;

  // Toggle option selection with mutual exclusivity & capping
  const handleToggle = (optionId: string) => {
    if (disabled) return;
    setCapWarning(null);

    const targetOption = options.find((o) => o.id === optionId);
    if (!targetOption) return;

    const isCurrentlySelected = values.includes(optionId);

    // 1. If currently selected -> Unselect
    if (isCurrentlySelected) {
      const nextValues = values.filter((v) => v !== optionId);
      onChange(nextValues);
      if (targetOption.hasOtherInput || targetOption.id === 'other') {
        if (onOtherChange) onOtherChange('');
      }
      return;
    }

    // 2. If selecting an EXCLUSIVE option (e.g., "None", "No barriers")
    if (targetOption.isExclusive) {
      onChange([optionId]);
      if (onOtherChange) onOtherChange('');
      return;
    }

    // 3. If selecting a REGULAR option when an exclusive option was already selected
    const hasExclusiveSelected = values.some(
      (v) => options.find((opt) => opt.id === v)?.isExclusive
    );
    const cleanedValues = hasExclusiveSelected
      ? values.filter((v) => !options.find((opt) => opt.id === v)?.isExclusive)
      : [...values];

    // 4. Check capping limit
    if (isCapped && cleanedValues.length >= maxSelections) {
      setCapWarning(`You can select up to ${maxSelections} options. Please uncheck an item first.`);
      setShakeTrigger(true);
      setTimeout(() => setShakeTrigger(false), 500);
      return;
    }

    // 5. Normal addition
    onChange([...cleanedValues, optionId]);
  };

  const isOtherSelected = values.some((v) => {
    const opt = options.find((o) => o.id === v);
    return opt?.hasOtherInput || opt?.id === 'other';
  });

  const otherOption = options.find((o) => o.hasOtherInput || o.id === 'other');

  // Render a single option card
  const renderOptionCard = (option: QuestionOption) => {
    const isSelected = values.includes(option.id);
    const isDisabledByCap = isAtMax && !isSelected && !option.isExclusive;

    return (
      <div key={option.id} className="relative flex flex-col">
        <div
          data-testid={`option-${option.id}`}
          onClick={() => handleToggle(option.id)}
          role="checkbox"
          aria-checked={isSelected}
          tabIndex={disabled ? -1 : 0}
          onKeyDown={(e) => {
            if (e.key === ' ' || e.key === 'Enter') {
              e.preventDefault();
              handleToggle(option.id);
            }
          }}
          className={`group min-h-[52px] flex items-center justify-between p-4 sm:p-5 rounded-2xl border-2 cursor-pointer select-none transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0.5 shadow-xs ${
            isSelected
              ? 'border-[#0B0A0F] dark:border-[#CCFF00] bg-[#CCFF00]/10 dark:bg-[#CCFF00]/10 shadow-midnight-sm dark:shadow-lime-sm ring-1 ring-[#0B0A0F]/20 dark:ring-[#CCFF00]/30 font-bold'
              : isDisabledByCap
              ? 'border-[#0B0A0F]/10 dark:border-white/5 bg-slate-50/80 dark:bg-[#100D1C]/60 opacity-60 cursor-not-allowed'
              : 'border-[#0B0A0F]/15 dark:border-white/10 bg-white dark:bg-[#121118] hover:border-[#0B0A0F] dark:hover:border-[#CCFF00] hover:bg-[#F5F2E9] dark:hover:bg-[#181622]'
          } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {/* Checkbox Box & Label */}
          <div className="flex items-center space-x-3.5 pr-3 pointer-events-none">
            <div
              className={`w-5 h-5 rounded-md flex items-center justify-center border transition-all flex-shrink-0 ${
                isSelected
                  ? 'border-[#0B0A0F] dark:border-[#CCFF00] bg-[#0B0A0F] dark:bg-[#CCFF00] text-[#CCFF00] dark:text-[#0B0A0F] scale-105'
                  : 'border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 group-hover:border-[#CCFF00]'
              }`}
            >
              {isSelected && <Check className="w-3.5 h-3.5 stroke-[3] animate-checkPop" />}
            </div>

            <span
              className={`text-sm sm:text-base leading-snug transition-colors ${
                isSelected
                  ? 'text-[#0B0A0F] dark:text-white font-bold'
                  : 'text-slate-700 dark:text-slate-300 font-medium'
              }`}
            >
              {option.label}
            </span>
          </div>

          {/* Native Checkbox synced with state */}
          <input
            type="checkbox"
            name={name}
            value={option.id}
            checked={isSelected}
            readOnly
            disabled={disabled}
            className="sr-only pointer-events-none"
            aria-hidden="true"
            tabIndex={-1}
          />
        </div>
      </div>
    );
  };

  return (
    <fieldset
      id={id}
      data-testid={testId || `question-${id}`}
      className="w-full space-y-4 focus:outline-none"
      aria-describedby={error ? errorId : instructionId}
      disabled={disabled}
    >
      {/* Question Header & Counter Pill */}
      <legend className="w-full mb-2">
        <div className="flex items-start justify-between gap-3">
          <div>
            {title && (
              <span className="block text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-snug">
                {title}
                {required && <span className="text-[#0B0A0F] dark:text-[#CCFF00] font-black ml-1" title="Required">*</span>}
              </span>
            )}
            <span id={instructionId} className="block text-xs sm:text-sm font-medium text-slate-500 dark:text-slate-400 mt-1 italic">
              {instruction || (isCapped ? `Select up to ${maxSelections}.` : 'Select all that apply.')}
            </span>
          </div>

          {/* Selection Counter Pill */}
          {isCapped && (
            <div
              data-testid={`counter-pill-${id}`}
              className={`flex-shrink-0 inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-bold font-mono transition-all ${
                isAtMax
                  ? 'bg-[#CCFF00] text-[#0B0A0F] border border-[#0B0A0F]/30 shadow-lime-sm'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700'
              }`}
            >
              <span>{currentCount}</span>
              <span>/</span>
              <span>{maxSelections} selected</span>
            </div>
          )}
        </div>

        {contextNote && (
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-1.5 p-2.5 rounded-lg bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 leading-relaxed">
            {contextNote}
          </p>
        )}
      </legend>

      {/* Capping Warning Notification Banner */}
      {capWarning && (
        <div
          role="status"
          aria-live="assertive"
          data-testid={`cap-warning-${id}`}
          className={`flex items-center space-x-2 p-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-800/60 text-amber-800 dark:text-amber-300 text-xs font-semibold ${
            shakeTrigger ? 'animate-shake' : 'animate-fadeIn'
          }`}
        >
          <AlertTriangle className="w-4 h-4 flex-shrink-0 text-amber-600 dark:text-amber-400" />
          <span>{capWarning}</span>
        </div>
      )}

      {/* Options Rendering: Categorized (Q11) vs Standard List */}
      {categories && categories.length > 0 ? (
        <div className="space-y-6">
          {categories.map((cat) => {
            const categoryOptions = options.filter((opt) => cat.optionIds.includes(opt.id));
            if (categoryOptions.length === 0) return null;

            return (
              <div key={cat.id} className="space-y-2.5">
                <div className="flex items-center space-x-2 pb-1 border-b border-slate-100 dark:border-slate-800">
                  <span className="w-2 h-2 rounded-full bg-[#CCFF00]" />
                  <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                    {cat.title}
                  </h4>
                </div>
                <div className="flex flex-col space-y-2">
                  {categoryOptions.map(renderOptionCard)}
                </div>
              </div>
            );
          })}

          {/* Render Standalone Exclusive or "Other" options not in categories */}
          {options.filter((o) => !o.category).length > 0 && (
            <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
              {options.filter((o) => !o.category).map(renderOptionCard)}
            </div>
          )}
        </div>
      ) : (
        <div className="flex flex-col space-y-2.5">
          {options.map(renderOptionCard)}
        </div>
      )}

      {/* "Other: ___" Inline Text Input */}
      {isOtherSelected && otherOption && (
        <div
          data-testid={`other-input-container-${id}`}
          className="mt-3 p-3.5 rounded-2xl bg-[#FBF9F4] dark:bg-[#181622] border border-[#0B0A0F]/15 dark:border-white/10 space-y-1.5 animate-fadeIn"
        >
          <label
            htmlFor={`${id}-other-input`}
            className="block text-xs font-bold uppercase tracking-wider text-[#0B0A0F] dark:text-[#CCFF00]"
          >
            {otherOption.label.includes(':') ? otherOption.label : 'Please specify:'}
          </label>
          <input
            type="text"
            id={`${id}-other-input`}
            data-testid={`other-input-${id}`}
            value={otherValue}
            onChange={(e) => onOtherChange && onOtherChange(e.target.value)}
            placeholder={otherOption.otherPlaceholder || 'Please describe...'}
            disabled={disabled}
            autoFocus
            className="w-full min-h-[44px] px-3.5 py-2.5 rounded-xl border border-[#0B0A0F]/15 dark:border-white/15 bg-white dark:bg-[#121118] text-sm text-[#0B0A0F] dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#CCFF00] focus:border-[#0B0A0F] dark:focus:border-[#CCFF00] transition-colors"
          />
        </div>
      )}

      {/* Validation Error Message */}
      {error && (
        <div
          id={errorId}
          role="alert"
          data-testid={`error-${id}`}
          className="flex items-center space-x-1.5 text-xs font-semibold text-red-600 dark:text-red-400 mt-1.5 animate-fadeIn"
        >
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}
    </fieldset>
  );
};

export default CheckboxMulti;
