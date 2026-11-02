import React, { useId } from 'react';
import { Lightbulb, Check, AlertCircle, FileText } from 'lucide-react';

export interface GuidedTextareaProps {
  id: string;
  name: string;
  title?: string;
  instruction?: string;
  contextNote?: string;
  guidingPrompts?: string[];
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  minLength?: number;
  maxLength?: number;
  error?: string | null;
  required?: boolean;
  disabled?: boolean;
  testId?: string;
}

export const GuidedTextarea: React.FC<GuidedTextareaProps> = ({
  id,
  name,
  title,
  instruction = 'Open-ended question.',
  contextNote,
  guidingPrompts = [],
  placeholder = 'Type your response here...',
  value = '',
  onChange,
  minLength = 10,
  maxLength = 4000,
  error,
  required = false,
  disabled = false,
  testId,
}) => {
  const componentId = useId();
  const errorId = `${id}-error-${componentId}`;
  const charCount = value.length;
  const isMinMet = charCount >= minLength;
  const isNearMax = maxLength ? charCount > maxLength * 0.9 : false;

  const handleInsertTemplate = () => {
    if (disabled || !guidingPrompts.length) return;
    const template = guidingPrompts.map((p) => `• ${p}\n\n`).join('');
    if (!value || window.confirm('Insert the prompt outline into your text area? Existing text will be appended.')) {
      onChange(value ? `${value}\n\n${template}` : template);
    }
  };

  return (
    <div
      id={id}
      data-testid={testId || `question-${id}`}
      className="w-full space-y-3.5 focus:outline-none"
    >
      {/* Question Title & Instruction */}
      <div>
        {title && (
          <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-snug">
            {title}
            {required && <span className="text-[#F15E21] ml-1" title="Required">*</span>}
          </h3>
        )}
        {instruction && (
          <p className="text-xs sm:text-sm font-medium text-slate-500 dark:text-slate-400 mt-1 italic">
            {instruction}
          </p>
        )}
        {contextNote && (
          <div className="text-xs text-slate-600 dark:text-slate-400 mt-2 p-3 rounded-xl bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 leading-relaxed whitespace-pre-line">
            {contextNote}
          </div>
        )}
      </div>

      {/* Guiding Prompts Box */}
      {guidingPrompts.length > 0 && (
        <div
          data-testid={`guiding-prompts-${id}`}
          className="p-4 rounded-2xl bg-amber-50/70 dark:bg-amber-950/25 border border-amber-200/80 dark:border-amber-900/40 text-amber-950 dark:text-amber-100"
        >
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <Lightbulb className="w-4 h-4 text-amber-600 dark:text-amber-400 flex-shrink-0" />
              <span className="text-xs font-bold uppercase tracking-wider text-amber-900 dark:text-amber-300">
                Please explain:
              </span>
            </div>

            {/* Template Insert Quick Action */}
            <button
              type="button"
              onClick={handleInsertTemplate}
              disabled={disabled}
              className="inline-flex items-center space-x-1 text-[11px] font-semibold text-amber-800 dark:text-amber-300 hover:text-amber-950 dark:hover:text-amber-100 underline focus:outline-none"
              title="Insert prompt bullet points into editor"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Use as outline</span>
            </button>
          </div>

          <ul className="list-disc list-inside space-y-1 text-xs text-amber-900 dark:text-amber-200/90 leading-relaxed pl-1">
            {guidingPrompts.map((prompt, idx) => (
              <li key={idx} className="font-medium">
                {prompt}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Interactive Textarea & Character Counter */}
      <div className="relative">
        <textarea
          id={`${id}-textarea`}
          name={name}
          data-testid={`textarea-${id}`}
          rows={6}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          disabled={disabled}
          maxLength={maxLength}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : undefined}
          className={`w-full min-h-[160px] p-4 rounded-2xl border text-sm sm:text-base leading-relaxed bg-white dark:bg-[#1A1826] text-slate-900 dark:text-white placeholder-slate-400 resize-y transition-all focus:outline-none focus:ring-2 focus:ring-offset-1 dark:focus:ring-offset-[#151320] ${
            error
              ? 'border-red-400 dark:border-red-800 focus:ring-red-500'
              : 'border-[#0B0A0F]/15 dark:border-white/10 focus:border-[#0B0A0F] dark:focus:border-[#CCFF00] focus:ring-[#CCFF00]'
          } ${disabled ? 'opacity-50 cursor-not-allowed bg-slate-50' : ''}`}
        />

        {/* Bottom Metadata & Counter Footer */}
        <div className="mt-2 flex items-center justify-between text-xs font-medium text-slate-500 dark:text-slate-400 px-1">
          {/* Min Length Indicator */}
          <div>
            {minLength > 0 && (
              <span
                className={`inline-flex items-center space-x-1 ${
                  isMinMet
                    ? 'text-emerald-600 dark:text-emerald-400 font-semibold'
                    : 'text-slate-500 dark:text-slate-400'
                }`}
              >
                {isMinMet ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>Min length met</span>
                  </>
                ) : (
                  <span>Minimum {minLength} characters required</span>
                )}
              </span>
            )}
          </div>

          {/* Live Character Count */}
          <div
            data-testid={`char-count-${id}`}
            className={`font-mono text-xs ${
              isNearMax
                ? 'text-amber-600 dark:text-amber-400 font-bold'
                : 'text-slate-500 dark:text-slate-400'
            }`}
          >
            {charCount.toLocaleString()} / {maxLength.toLocaleString()} chars
          </div>
        </div>
      </div>

      {/* Validation Error */}
      {error && (
        <div
          id={errorId}
          role="alert"
          data-testid={`error-${id}`}
          className="flex items-center space-x-1.5 text-xs font-semibold text-red-600 dark:text-red-400 mt-1 animate-fadeIn"
        >
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
};

export default GuidedTextarea;
