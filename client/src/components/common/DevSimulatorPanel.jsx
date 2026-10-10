import React from 'react';
import { ShieldAlert, Bug, Clock, Server, FileX, CheckCircle, X, FileQuestion } from 'lucide-react';

export function DevSimulatorPanel({ currentError, onSelectError, onClose }) {
  const SIMULATION_OPTIONS = [
    {
      type: 'NONE',
      label: 'Normal Mode (Clean)',
      icon: CheckCircle,
      desc: 'Standard AI generation & smart mock fallback.',
    },
    {
      type: 'MALFORMED_JSON',
      label: 'Simulate Malformed JSON',
      icon: FileX,
      desc: 'Simulates AI returning broken JSON missing quotes or brackets.',
    },
    {
      type: 'INVALID_SCHEMA',
      label: 'Simulate Invalid Schema',
      icon: Bug,
      desc: 'Simulates AI returning JSON with missing required Zod fields.',
    },
    {
      type: 'TIMEOUT',
      label: 'Simulate Request Timeout',
      icon: Clock,
      desc: 'Simulates a 25-second delay exceeding client timeout threshold.',
    },
    {
      type: 'SERVER_ERROR',
      label: 'Simulate 500 Server Error',
      icon: Server,
      desc: 'Simulates an unhandled backend exception (500 status).',
    },
    {
      type: 'EMPTY_RESPONSE',
      label: 'Simulate Empty Payload',
      icon: FileQuestion,
      desc: 'Simulates AI model returning a 0-byte text payload.',
    },
  ];

  return (
    <div className="fixed bottom-4 right-4 z-50 max-w-sm w-full glass-panel rounded-3xl p-5 shadow-2xl border-2 border-amber-400 dark:border-amber-600 bg-amber-50/95 dark:bg-slate-900/95 animate-slideUp">
      <div className="flex items-center justify-between mb-3 pb-2 border-b border-amber-200 dark:border-slate-800">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-amber-500 text-white rounded-lg">
            <ShieldAlert className="w-4 h-4" />
          </div>
          <div>
            <h4 className="font-extrabold text-sm text-slate-900 dark:text-white">
              Evaluator Test Bench
            </h4>
            <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">
              Simulate failure modes live
            </p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="space-y-2">
        {SIMULATION_OPTIONS.map((opt) => {
          const Icon = opt.icon;
          const isSelected = currentError === opt.type;

          return (
            <button
              key={opt.type}
              onClick={() => onSelectError(opt.type)}
              className={`w-full p-2.5 rounded-xl text-left text-xs font-semibold transition-all border flex items-start gap-2.5 ${
                isSelected
                  ? 'bg-amber-500 text-white border-amber-600 shadow-md'
                  : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 border-slate-200 dark:border-slate-700 hover:bg-amber-100/50 dark:hover:bg-slate-750'
              }`}
            >
              <Icon className={`w-4 h-4 flex-shrink-0 mt-0.5 ${isSelected ? 'text-white' : 'text-amber-600 dark:text-amber-400'}`} />
              <div>
                <span className="block font-bold">{opt.label}</span>
                <span className={`text-[10px] ${isSelected ? 'text-amber-100' : 'text-slate-500 dark:text-slate-400'}`}>
                  {opt.desc}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {currentError !== 'NONE' && (
        <div className="mt-3 p-2 rounded-xl bg-amber-200/60 dark:bg-amber-950/60 text-amber-950 dark:text-amber-200 text-[11px] font-medium text-center">
          ⚠️ Failure mode active! Submit a prompt above to test resilience.
        </div>
      )}
    </div>
  );
}
