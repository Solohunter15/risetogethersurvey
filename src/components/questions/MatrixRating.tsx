import React, { useId } from 'react';
import { Check, AlertCircle } from 'lucide-react';
import { LikertOption, MatrixRowDefinition, LikertRating } from '../../types/survey';

export interface MatrixRatingProps {
  id: string;
  name: string;
  title?: string;
  instruction?: string;
  contextNote?: string;
  matrixRows: MatrixRowDefinition[];
  scaleOptions: LikertOption[];
  values: Record<string, LikertRating | string>;
  onChange: (rowId: string, rating: LikertRating) => void;
  error?: string | null;
  rowErrors?: Record<string, string>;
  required?: boolean;
  disabled?: boolean;
  testId?: string;
}

export const MatrixRating: React.FC<MatrixRatingProps> = ({
  id,
  name,
  title,
  instruction = 'Use the following rating scale for each statement.',
  contextNote,
  matrixRows,
  scaleOptions,
  values = {},
  onChange,
  error,
  rowErrors = {},
  required = false,
  disabled = false,
  testId,
}) => {
  const componentId = useId();
  const errorId = `${id}-error-${componentId}`;

  const answeredCount = matrixRows.filter((r) => values[r.id] && values[r.id] !== '').length;

  return (
    <div
      id={id}
      data-testid={testId || `question-${id}`}
      className="w-full space-y-4 focus:outline-none"
    >
      {/* Title & Instruction Header */}
      <div className="w-full">
        <div className="flex items-start justify-between gap-3">
          <div>
            {title && (
              <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-snug">
                {title}
                {required && <span className="text-[#0B0A0F] dark:text-[#CCFF00] font-black ml-1" title="Required">*</span>}
              </h3>
            )}
            <p className="text-xs sm:text-sm font-medium text-slate-500 dark:text-slate-400 mt-1 italic">
              {instruction}
            </p>
          </div>

          {/* Progress Indicator */}
          <div className="flex-shrink-0 text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
            {answeredCount} of {matrixRows.length} answered
          </div>
        </div>

        {contextNote && (
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 p-2.5 rounded-lg bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 leading-relaxed">
            {contextNote}
          </p>
        )}
      </div>

      {/* Scale Legend Bar (Quick Reference) */}
      <div className="hidden sm:flex items-center justify-between text-[11px] font-semibold text-slate-500 dark:text-slate-400 px-3 py-1.5 rounded-lg bg-slate-100/70 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-700/40">
        <span>1 = Strongly Disagree</span>
        <span>3 = Neither Agree nor Disagree</span>
        <span>5 = Strongly Agree</span>
        <span>N/A = Not Applicable</span>
      </div>

      {/* ------------------------------------------------------------------- */}
      {/* Viewport 1: Desktop Table Layout (>= 768px)                         */}
      {/* ------------------------------------------------------------------- */}
      <div className="hidden md:block overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#1A1826] shadow-xs">
        <table className="w-full border-collapse text-left" role="table">
          <thead>
            <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-[#151320]">
              <th
                scope="col"
                className="py-3.5 px-4 text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 w-2/5"
              >
                Statement
              </th>
              {scaleOptions.map((opt) => (
                <th
                  key={opt.value}
                  scope="col"
                  className="py-3.5 px-2 text-center text-xs font-semibold text-slate-600 dark:text-slate-300 min-w-[70px]"
                >
                  <div className="flex flex-col items-center">
                    <span className="w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs bg-slate-200/80 dark:bg-slate-700 text-slate-800 dark:text-slate-200 mb-1">
                      {opt.value}
                    </span>
                    <span className="text-[10px] leading-tight text-slate-500 dark:text-slate-400 max-w-[65px] truncate">
                      {opt.shortLabel}
                    </span>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80">
            {matrixRows.map((row, idx) => {
              const selectedValue = values[row.id];
              const rowHasError = Boolean(rowErrors[row.id]);

              return (
                <tr
                  key={row.id}
                  data-testid={`matrix-row-${row.id}`}
                  className={`transition-colors ${
                    rowHasError
                      ? 'bg-red-50/40 dark:bg-red-950/20'
                      : idx % 2 === 0
                      ? 'bg-transparent'
                      : 'bg-slate-50/40 dark:bg-slate-800/20'
                  } hover:bg-[#CCFF00]/10 dark:hover:bg-[#CCFF00]/5`}
                >
                  {/* Row Statement Text */}
                  <td className="py-4 px-4 text-sm text-slate-900 dark:text-slate-100 font-medium">
                    <div className="flex items-start space-x-2.5">
                      <span className="w-5 h-5 rounded-md flex-shrink-0 flex items-center justify-center text-xs font-bold bg-[#CCFF00] text-[#0B0A0F]">
                        {row.code}
                      </span>
                      <span className="leading-snug">{row.statement}</span>
                    </div>
                  </td>

                  {/* Rating Radio Options */}
                  {scaleOptions.map((opt) => {
                    const isChecked = selectedValue === opt.value;
                    const radioId = `${name}-${row.id}-${opt.value}-${componentId}`;

                    return (
                      <td key={opt.value} className="py-3 px-2 text-center align-middle">
                        <label
                          htmlFor={radioId}
                          data-testid={`rating-${row.id}-${opt.value}`}
                          className={`inline-flex items-center justify-center w-10 h-10 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                            isChecked
                              ? 'border-[#0B0A0F] dark:border-[#CCFF00] bg-[#0B0A0F] dark:bg-[#CCFF00] text-[#CCFF00] dark:text-[#0B0A0F] font-black shadow-midnight-sm scale-105 ring-2 ring-[#CCFF00] animate-checkPop'
                              : 'border-slate-200 dark:border-slate-700/80 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:border-[#0B0A0F] dark:hover:border-[#CCFF00] hover:scale-105'
                          } ${disabled ? 'opacity-40 cursor-not-allowed' : ''}`}
                          title={`${row.code}: ${opt.label}`}
                        >
                          <span className="text-xs font-bold">{opt.value}</span>
                          <input
                            type="radio"
                            id={radioId}
                            name={`${name}-${row.id}`}
                            value={opt.value}
                            checked={isChecked}
                            onChange={() => onChange(row.id, opt.value as LikertRating)}
                            disabled={disabled}
                            className="sr-only"
                            aria-label={`${row.statement}: ${opt.label}`}
                          />
                        </label>
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* ------------------------------------------------------------------- */}
      {/* Viewport 2: Mobile Card Layout (< 768px)                           */}
      {/* ------------------------------------------------------------------- */}
      <div className="md:hidden space-y-4">
        {matrixRows.map((row) => {
          const selectedValue = values[row.id];
          const isRowAnswered = Boolean(selectedValue);
          const rowHasError = Boolean(rowErrors[row.id]);

          // Separate 1-5 numerical ratings from N/A
          const numericScales = scaleOptions.filter((opt) => opt.value !== 'NA');
          const naScale = scaleOptions.find((opt) => opt.value === 'NA');

          return (
            <div
              key={row.id}
              data-testid={`matrix-card-${row.id}`}
              className={`p-4 rounded-2xl border transition-all ${
                rowHasError
                  ? 'border-red-300 dark:border-red-800 bg-red-50/30 dark:bg-red-950/20'
                  : isRowAnswered
                  ? 'border-[#0B0A0F] dark:border-[#CCFF00] bg-white dark:bg-[#181622] shadow-xs'
                  : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-[#181622]'
              }`}
            >
              {/* Card Header: Statement */}
              <div className="flex items-start justify-between gap-2 mb-3">
                <div className="flex items-start space-x-2.5">
                  <span className="w-6 h-6 rounded-md flex-shrink-0 flex items-center justify-center text-xs font-bold bg-[#CCFF00] text-[#0B0A0F]">
                    {row.code}
                  </span>
                  <p className="text-sm font-semibold text-slate-900 dark:text-white leading-snug">
                    {row.statement}
                  </p>
                </div>
                {isRowAnswered && (
                  <span className="flex-shrink-0 text-[#0B0A0F] dark:text-[#CCFF00]" title="Answered">
                    <Check className="w-4 h-4 stroke-[3]" />
                  </span>
                )}
              </div>

              {/* 1 to 5 Rating Pill Grid */}
              <div className="grid grid-cols-5 gap-2 mb-2" role="radiogroup" aria-label={row.statement}>
                {numericScales.map((opt) => {
                  const isChecked = selectedValue === opt.value;
                  const radioId = `mobile-${name}-${row.id}-${opt.value}-${componentId}`;

                  return (
                    <label
                      key={opt.value}
                      htmlFor={radioId}
                      data-testid={`rating-mobile-${row.id}-${opt.value}`}
                      className={`min-h-[44px] flex flex-col items-center justify-center p-1.5 rounded-xl border cursor-pointer select-none transition-all duration-200 ${
                        isChecked
                          ? 'border-[#0B0A0F] dark:border-[#CCFF00] bg-[#0B0A0F] dark:bg-[#CCFF00] text-[#CCFF00] dark:text-[#0B0A0F] font-black shadow-midnight-sm scale-105 animate-checkPop'
                          : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/70 text-slate-800 dark:text-slate-200 hover:border-[#CCFF00] hover:scale-102'
                      } ${disabled ? 'opacity-40 cursor-not-allowed' : ''}`}
                    >
                      <span className="text-sm font-bold leading-none">{opt.value}</span>
                      <span className={`text-[9px] mt-0.5 truncate max-w-full leading-tight ${isChecked ? 'text-[#CCFF00] dark:text-[#0B0A0F]' : 'text-slate-500 dark:text-slate-400'}`}>
                        {opt.value === '1' ? 'Dis.' : opt.value === '5' ? 'Agr.' : ''}
                      </span>
                      <input
                        type="radio"
                        id={radioId}
                        name={`mobile-${name}-${row.id}`}
                        value={opt.value}
                        checked={isChecked}
                        onChange={() => onChange(row.id, opt.value as LikertRating)}
                        disabled={disabled}
                        className="sr-only"
                        aria-label={`${opt.label}`}
                      />
                    </label>
                  );
                })}
              </div>

              {/* N/A Pill Option */}
              {naScale && (
                <div className="pt-1">
                  <label
                    htmlFor={`mobile-${name}-${row.id}-NA-${componentId}`}
                    data-testid={`rating-mobile-${row.id}-NA`}
                    className={`min-h-[44px] w-full flex items-center justify-center space-x-2 px-3 py-2 rounded-xl border text-xs font-semibold cursor-pointer select-none transition-all ${
                      selectedValue === 'NA'
                        ? 'border-slate-700 dark:border-slate-300 bg-slate-800 dark:bg-slate-200 text-white dark:text-slate-900 shadow-xs'
                        : 'border-slate-200 dark:border-slate-700 bg-slate-50/80 dark:bg-slate-800/40 text-slate-600 dark:text-slate-400 hover:bg-slate-100'
                    } ${disabled ? 'opacity-40 cursor-not-allowed' : ''}`}
                  >
                    <span>{naScale.label}</span>
                    <input
                      type="radio"
                      id={`mobile-${name}-${row.id}-NA-${componentId}`}
                      name={`mobile-${name}-${row.id}`}
                      value="NA"
                      checked={selectedValue === 'NA'}
                      onChange={() => onChange(row.id, 'NA')}
                      disabled={disabled}
                      className="sr-only"
                    />
                  </label>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Global Matrix Error */}
      {error && (
        <div
          id={errorId}
          role="alert"
          data-testid={`error-${id}`}
          className="flex items-center space-x-1.5 text-xs font-semibold text-red-600 dark:text-red-400 mt-2 animate-fadeIn"
        >
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
};

export default MatrixRating;
