import React, { useState } from 'react';
import { AlertTriangle, RefreshCw, Sparkles, Terminal, ChevronDown, ChevronUp } from 'lucide-react';

export function ErrorState({ error, onRetry, onUseFallback, onClear }) {
  const [showDetails, setShowDetails] = useState(false);

  const getTitle = () => {
    switch (error?.code) {
      case 'MALFORMED_JSON':
        return 'AI Output Syntax Error (Malformed JSON)';
      case 'INVALID_SCHEMA':
      case 'SCHEMA_INVALID':
        return 'AI Schema Mismatch (Invalid Itinerary Shape)';
      case 'AI_TIMEOUT':
      case 'TIMEOUT':
        return 'Itinerary Request Timed Out (25s Exceeded)';
      case 'SERVER_ERROR':
        return 'Internal Server Error (HTTP 500)';
      case 'EMPTY_RESPONSE':
        return 'Empty Payload Returned by AI Model';
      case 'RATE_LIMITED':
        return 'API Rate Limit Exceeded (HTTP 429)';
      default:
        return 'Unable to Build Itinerary';
    }
  };

  return (
    <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-rose-200 dark:border-rose-900/60 shadow-xl bg-gradient-to-b from-rose-50/80 to-white dark:from-rose-950/30 dark:to-slate-900 my-6 animate-fadeIn">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-2xl bg-rose-100 dark:bg-rose-900/50 text-rose-600 dark:text-rose-400 flex items-center justify-center flex-shrink-0 shadow-inner">
          <AlertTriangle className="w-7 h-7" />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wide bg-rose-200 dark:bg-rose-900 text-rose-900 dark:text-rose-200 rounded-md">
              {error?.code || 'ERROR'}
            </span>
            <span className="text-xs text-rose-600 dark:text-rose-400 font-medium">
              Fail-safe Handler Intercepted Error
            </span>
          </div>

          <h3 className="font-extrabold text-lg sm:text-xl text-rose-950 dark:text-rose-100 mb-2">
            {getTitle()}
          </h3>

          <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
            {error?.message || 'An unexpected failure occurred while requesting the travel model.'}
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={onRetry}
              className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center gap-1.5"
            >
              <RefreshCw className="w-4 h-4" /> Retry Generation
            </button>

            {onUseFallback && (
              <button
                onClick={onUseFallback}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center gap-1.5"
              >
                <Sparkles className="w-4 h-4" /> Use Smart Mock Generator
              </button>
            )}

            <button
              onClick={onClear}
              className="px-4 py-2 bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 text-slate-700 dark:text-slate-300 font-bold text-xs rounded-xl transition-all"
            >
              Edit Prompt
            </button>
          </div>

          {/* Technical Details Inspection Toggle */}
          {error?.details && (
            <div className="mt-4 pt-4 border-t border-rose-200/60 dark:border-rose-900/60">
              <button
                onClick={() => setShowDetails(!showDetails)}
                className="text-xs font-semibold text-rose-700 dark:text-rose-300 hover:underline flex items-center gap-1"
              >
                <Terminal className="w-3.5 h-3.5" />
                {showDetails ? 'Hide Technical Stack Trace' : 'Inspect Diagnostic Trace'}
                {showDetails ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
              </button>

              {showDetails && (
                <pre className="mt-2 p-3 rounded-xl bg-slate-900 text-slate-100 text-[11px] font-mono overflow-x-auto max-h-48 whitespace-pre-wrap border border-slate-800">
                  {typeof error.details === 'string' ? error.details : JSON.stringify(error.details, null, 2)}
                </pre>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
