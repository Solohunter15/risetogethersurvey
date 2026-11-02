import React, { useState, useRef, useEffect, useId } from 'react';
import { ChevronDown, Check, Search, AlertCircle } from 'lucide-react';
import { QuestionOption } from '../../types/survey';

export interface DropdownSelectProps {
  id: string;
  name: string;
  title?: string;
  instruction?: string;
  contextNote?: string;
  placeholder?: string;
  options: QuestionOption[];
  value: string;
  onChange: (value: string) => void;
  otherValue?: string;
  onOtherChange?: (value: string) => void;
  error?: string | null;
  required?: boolean;
  disabled?: boolean;
  testId?: string;
}

export const DropdownSelect: React.FC<DropdownSelectProps> = ({
  id,
  name,
  title,
  instruction = 'Select one.',
  contextNote,
  placeholder = 'Select an option...',
  options,
  value,
  onChange,
  otherValue = '',
  onOtherChange,
  error,
  required = false,
  disabled = false,
  testId,
}) => {
  const componentId = useId();
  const errorId = `${id}-error-${componentId}`;
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);

  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const selectedOption = options.find((opt) => opt.id === value);
  const showOtherInput = selectedOption?.hasOtherInput || selectedOption?.id === 'other';

  // Filtered options based on user search query
  const filteredOptions = options.filter((opt) =>
    opt.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
        setSearchQuery('');
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Autofocus search input when dropdown opens
  useEffect(() => {
    if (isOpen && filteredOptions.length > 5 && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isOpen, filteredOptions.length]);

  const handleSelect = (optionId: string) => {
    onChange(optionId);
    setIsOpen(false);
    setSearchQuery('');
    triggerRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) return;

    if (!isOpen) {
      if (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        setIsOpen(true);
      }
      return;
    }

    if (e.key === 'Escape') {
      e.preventDefault();
      setIsOpen(false);
      triggerRef.current?.focus();
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHighlightedIndex((prev) => (prev < filteredOptions.length - 1 ? prev + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : filteredOptions.length - 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (highlightedIndex >= 0 && highlightedIndex < filteredOptions.length) {
        handleSelect(filteredOptions[highlightedIndex].id);
      }
    }
  };

  return (
    <div
      id={id}
      data-testid={testId || `question-${id}`}
      ref={containerRef}
      className="w-full space-y-3.5 focus:outline-none"
    >
      {/* Title & Instruction Header */}
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
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 p-2.5 rounded-lg bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 leading-relaxed">
            {contextNote}
          </p>
        )}
      </div>

      {/* Combobox Trigger Button */}
      <div className="relative">
        <input type="hidden" name={name} value={value} />
        <button
          ref={triggerRef}
          type="button"
          data-testid={`dropdown-trigger-${id}`}
          onClick={() => !disabled && setIsOpen(!isOpen)}
          onKeyDown={handleKeyDown}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          disabled={disabled}
          className={`w-full min-h-[48px] px-4 py-3 flex items-center justify-between rounded-2xl border text-left text-sm sm:text-base font-medium transition-all focus:outline-none focus:ring-2 focus:ring-[#CCFF00] ${
            isOpen
              ? 'border-[#0B0A0F] dark:border-[#CCFF00] ring-2 ring-[#CCFF00]/40 bg-white dark:bg-[#181622] shadow-midnight-sm'
              : 'border-[#0B0A0F]/15 dark:border-white/10 bg-white dark:bg-[#181622] hover:border-[#0B0A0F] dark:hover:border-[#CCFF00]'
          } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          <span className={selectedOption ? 'text-[#0B0A0F] dark:text-white font-semibold' : 'text-slate-400'}>
            {selectedOption ? selectedOption.label : placeholder}
          </span>
          <ChevronDown
            className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${
              isOpen ? 'transform rotate-180 text-[#0B0A0F] dark:text-[#CCFF00]' : ''
            }`}
          />
        </button>

        {/* Dropdown Menu Container */}
        {isOpen && (
          <div
            data-testid={`dropdown-menu-${id}`}
            className="absolute z-30 mt-2 w-full rounded-2xl border border-[#0B0A0F]/15 dark:border-white/15 bg-white dark:bg-[#181622] shadow-xl overflow-hidden animate-slideInDown"
          >
            {/* Search Filter Input (When > 5 options) */}
            {options.length > 5 && (
              <div className="p-2.5 border-b border-[#0B0A0F]/10 dark:border-white/10 bg-[#FBF9F4] dark:bg-[#14121B]">
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                  <input
                    ref={searchInputRef}
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search options..."
                    className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm rounded-xl border border-[#0B0A0F]/15 dark:border-white/15 bg-white dark:bg-[#181622] text-[#0B0A0F] dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#CCFF00]"
                  />
                </div>
              </div>
            )}

            {/* Listbox Options */}
            <ul
              role="listbox"
              tabIndex={-1}
              className="max-h-60 overflow-y-auto p-1.5 space-y-1 focus:outline-none"
            >
              {filteredOptions.length > 0 ? (
                filteredOptions.map((opt, index) => {
                  const isSelected = opt.id === value;
                  const isHighlighted = index === highlightedIndex;

                  return (
                    <li
                      key={opt.id}
                      role="option"
                      aria-selected={isSelected}
                      data-testid={`dropdown-option-${opt.id}`}
                      onClick={() => handleSelect(opt.id)}
                      onMouseEnter={() => setHighlightedIndex(index)}
                      className={`min-h-[44px] flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium cursor-pointer transition-colors ${
                        isSelected
                          ? 'bg-[#CCFF00]/25 dark:bg-[#CCFF00]/15 text-[#0B0A0F] dark:text-[#CCFF00] font-bold border border-[#CCFF00]/40'
                          : isHighlighted
                          ? 'bg-[#F5F2E9] dark:bg-white/5 text-[#0B0A0F] dark:text-white'
                          : 'text-[#0B0A0F] dark:text-slate-200 hover:bg-[#F5F2E9] dark:hover:bg-white/5'
                      }`}
                    >
                      <span className="leading-snug">{opt.label}</span>
                      {isSelected && (
                        <Check className="w-4 h-4 text-[#0B0A0F] dark:text-[#CCFF00] animate-checkPop flex-shrink-0 ml-2 stroke-[2.5]" />
                      )}
                    </li>
                  );
                })
              ) : (
                <li className="px-4 py-3 text-xs text-slate-400 text-center">
                  No matching options found.
                </li>
              )}
            </ul>
          </div>
        )}
      </div>

      {/* "Other: ___" Inline Text Input */}
      {showOtherInput && (
        <div
          data-testid={`other-input-container-${id}`}
          className="mt-3 p-3.5 rounded-2xl bg-[#FBF9F4] dark:bg-[#181622] border border-[#0B0A0F]/15 dark:border-white/10 space-y-1.5 animate-popIn"
        >
          <label
            htmlFor={`${id}-other-input`}
            className="block text-xs font-bold uppercase tracking-wider text-[#0B0A0F] dark:text-[#CCFF00]"
          >
            {selectedOption?.label.includes(':') ? selectedOption.label : 'Please specify:'}
          </label>
          <input
            type="text"
            id={`${id}-other-input`}
            data-testid={`other-input-${id}`}
            value={otherValue}
            onChange={(e) => onOtherChange && onOtherChange(e.target.value)}
            placeholder={selectedOption?.otherPlaceholder || 'Please describe...'}
            disabled={disabled}
            autoFocus
            className="w-full min-h-[44px] px-3.5 py-2.5 rounded-xl border border-[#0B0A0F]/15 dark:border-white/15 bg-white dark:bg-[#121118] text-sm text-[#0B0A0F] dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#CCFF00] focus:border-[#0B0A0F] dark:focus:border-[#CCFF00] transition-colors"
          />
        </div>
      )}

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

export default DropdownSelect;
