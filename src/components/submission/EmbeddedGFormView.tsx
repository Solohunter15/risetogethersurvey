import React, { useState } from 'react';
import { ExternalLink, RefreshCw, ShieldCheck } from 'lucide-react';

interface EmbeddedGFormViewProps {
  formUrl?: string;
  onSwitchToInteractive?: () => void;
}

export const DEFAULT_GFORM_URL =
  'https://docs.google.com/forms/d/e/1FAIpQLSclhpQ7Ao_27_AfZP8QaA-npTSrhmOpsfTGUibn1sMQYUabTw/viewform?embedded=true';

export const EmbeddedGFormView: React.FC<EmbeddedGFormViewProps> = ({
  formUrl = DEFAULT_GFORM_URL,
  onSwitchToInteractive,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const rawUrl = formUrl.replace('?embedded=true', '');

  return (
    <div className="w-full space-y-6 animate-fadeIn">
      {/* Top Meta Card */}
      <div className="p-6 rounded-3xl bg-white dark:bg-[#14121F] border border-[#0B0A0F]/12 dark:border-white/10 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="font-mono text-[10px] font-black uppercase tracking-wider bg-[#CCFF00] text-[#0B0A0F] px-2.5 py-0.5 rounded-md border border-[#0B0A0F]/20">
              OFFICIAL GOOGLE FORM
            </span>
            <span className="text-xs text-slate-500 font-mono">• Rise Together 2026</span>
          </div>
          <h2 className="font-display font-extrabold text-lg sm:text-xl text-[#0B0A0F] dark:text-white mt-1">
            Kerala Student Experience & Transformation Survey
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            You are viewing the embedded Google Form directly within the platform.
          </p>
        </div>

        <div className="flex items-center space-x-2.5 self-stretch sm:self-auto">
          {onSwitchToInteractive && (
            <button
              type="button"
              onClick={onSwitchToInteractive}
              className="flex-1 sm:flex-none px-4 py-2 rounded-xl text-xs font-bold border border-[#0B0A0F]/15 dark:border-white/15 bg-[#FBF9F4] dark:bg-[#181622] text-[#0B0A0F] dark:text-white hover:bg-[#CCFF00] hover:text-[#0B0A0F] transition-all cursor-pointer"
            >
              Switch to Interactive Mode
            </button>
          )}

          <a
            href={rawUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-[#0B0A0F] dark:bg-[#CCFF00] text-white dark:text-[#0B0A0F] hover:scale-102 transition-all shadow-midnight-sm"
          >
            <span>Open in Tab</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Embedded Iframe Container */}
      <div className="relative rounded-3xl overflow-hidden bg-white dark:bg-[#14121F] border border-[#0B0A0F]/12 dark:border-white/10 shadow-glass min-h-[900px]">
        {isLoading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/90 dark:bg-[#14121F]/90 backdrop-blur-xs z-10 space-y-3">
            <RefreshCw className="w-8 h-8 text-[#0B0A0F] dark:text-[#CCFF00] animate-spin" />
            <span className="font-mono text-xs font-bold text-[#0B0A0F] dark:text-white">
              Loading Google Form...
            </span>
          </div>
        )}

        <iframe
          src={formUrl}
          title="Rise Together 2026 Google Form"
          width="100%"
          height="1400"
          frameBorder="0"
          marginHeight={0}
          marginWidth={0}
          onLoad={() => setIsLoading(false)}
          className="w-full min-h-[900px] border-none"
        >
          Loading Google Form…
        </iframe>
      </div>

      {/* Trust & Verification Footer Note */}
      <div className="flex items-center justify-center space-x-2 text-xs text-slate-500 dark:text-slate-400 font-sans">
        <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-[#CCFF00]" />
        <span>Secure submission powered directly by Google Forms • Beyond Syllabus & Rise Together 2026</span>
      </div>
    </div>
  );
};

export default EmbeddedGFormView;
