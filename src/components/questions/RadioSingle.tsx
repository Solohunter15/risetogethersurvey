import React, { useId } from 'react';
import { Check, AlertCircle } from 'lucide-react';
import { QuestionOption } from '../../types/survey';

export interface RadioSingleProps {
  id: string;
  name: string;
  title?: string;
  instruction?: string;
  contextNote?: string;
  options: QuestionOption[];
  value: string;
  onChange: (value: string) => void;
  otherValue?: string;
  onOtherChange?: (value: string) => void;
  error?: string | null;
  required?: boolean;
  disabled?: boolean;
  layout?: 'stacked' | 'grid2';
  testId?: string;
}

export const RadioSingle: React.FC<RadioSingleProps> = ({
  id,
  name,
  title,
  instruction = 'Select one.',
  contextNote,
  options,
  value,
  onChange,
  otherValue = '',
  onOtherChange,
  error,
  required = false,
  disabled = false,
  layout = 'stacked',
  testId,
}) => {
  const componentId = useId();
  const errorId = `${id}-error-${componentId}`;
  const instructionId = `${id}-instruction-${componentId}`;

  const handleOptionClick = (optionId: string) => {
    if (disabled) return;
    onChange(optionId);
  };

  const selectedOption = options.find((opt) => opt.id === value);
  const showOtherInput = selectedOption?.hasOtherInput || selectedOption?.id === 'other';

  return (
    <fieldset
      id={id}
      data-testid={testId || `question-${id}`}
      className="w-full space-y-4 focus:outline-none"
      aria-describedby={error ? errorId : instructionId}
      disabled={disabled}
    >
      {/* Title & Instruction Header */}
      {(title || instruction) && (
        <legend className="w-full mb-2">
          {title && (
            <span className="block text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-snug">
              {title}
              {required && <span className="text-[#0B0A0F] dark:text-[#CCFF00] font-black ml-1" title="Required">*</span>}
            </span>
          )}
          {instruction && (
            <span id={instructionId} className="block text-xs sm:text-sm font-medium text-slate-500 dark:text-slate-400 mt-1 italic">
              {instruction}
            </span>
          )}
          {contextNote && (
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1.5 p-2.5 rounded-lg bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 leading-relaxed">
              {contextNote}
            </p>
          )}
        </legend>
      )}

      {/* Options Container */}
      <div
        className={
          layout === 'grid2'
            ? 'grid grid-cols-1 sm:grid-cols-2 gap-3'
            : 'flex flex-col space-y-2.5'
        }
        role="radiogroup"
        aria-required={required}
      >
        {options.map((option) => {
          const isSelected = value === option.id;

          return (
            <div key={option.id} className="relative flex flex-col">
        <div
          data-testid={`option-${option.id}`}
          onClick={() => handleOptionClick(option.id)}
          role="radio"
          aria-checked={isSelected}
          tabIndex={disabled ? -1 : 0}
          onKeyDown={(e) => {
            if (e.key === ' ' || e.key === 'Enter') {
              e.preventDefault();
              handleOptionClick(option.id);
            }
          }}
          className={`group min-h-[48px] flex items-center justify-between p-3.5 sm:p-4 rounded-2xl border cursor-pointer select-none transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0.5 ${
            isSelected
              ? 'border-[#0B0A0F] dark:border-[#CCFF00] bg-[#CCFF00]/15 dark:bg-[#CCFF00]/10 shadow-midnight-sm dark:shadow-lime-sm ring-1 ring-[#CCFF00]'
              : 'border-[#0B0A0F]/12 dark:border-white/10 bg-white dark:bg-[#181622] hover:border-[#0B0A0F] dark:hover:border-[#CCFF00] hover:bg-[#F5F2E9] dark:hover:bg-[#201D2E]'
          } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {/* Visual Label Text */}
          <div className="flex items-center space-x-3.5 pr-3 pointer-events-none">
            {/* Custom Radio Button Indicator */}
            <div
              className={`w-5 h-5 rounded-full flex items-center justify-center border transition-all flex-shrink-0 ${
                isSelected
                  ? 'border-[#0B0A0F] dark:border-[#CCFF00] bg-[#0B0A0F] dark:bg-[#CCFF00] text-white scale-105'
                  : 'border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 group-hover:border-[#CCFF00]'
              }`}
            >
              {isSelected ? (
                <span className="w-2 h-2 rounded-full bg-[#CCFF00] dark:bg-[#0B0A0F] block animate-checkPop" />
              ) : null}
            </div>

            <span
              className={`text-sm sm:text-base font-medium leading-snug transition-colors ${
                isSelected
                  ? 'text-[#0B0A0F] dark:text-white font-bold'
                  : 'text-slate-700 dark:text-slate-300'
              }`}
            >
              {option.label}
            </span>
          </div>

          {/* Checked Icon Pill */}
          {isSelected && (
            <span className="flex-shrink-0 text-[#0B0A0F] dark:text-[#CCFF00] pointer-events-none">
              <Check className="w-4 h-4 stroke-[3] animate-checkPop" />
            </span>
          )}

          {/* Hidden Native Radio Input */}
          <input
            type="radio"
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
        })}
      </div>

      {/* "Other: ___" Inline Text Input Reveal */}
      {showOtherInput && (
        <div
          data-testid={`other-input-container-${id}`}
          className="mt-3 p-3.5 rounded-2xl bg-[#FBF9F4] dark:bg-[#181622] border border-[#0B0A0F]/15 dark:border-white/10 space-y-1.5 animate-fadeIn"
        >
          <label
            htmlFor={`${id}-other-input`}
            className="block text-xs font-bold uppercase tracking-wider text-[#0B0A0F] dark:text-[#CCFF00]"
          >
            {selectedOption?.label.includes(':')
              ? selectedOption.label
              : 'Please specify your details:'}
          </label>
          <input
            type="text"
            id={`${id}-other-input`}
            data-testid={`other-input-${id}`}
            value={otherValue}
            onChange={(e) => onOtherChange && onOtherChange(e.target.value)}
            placeholder={selectedOption?.otherPlaceholder || 'Type your details here...'}
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

export default RadioSingle;
