import React from 'react';
import { Compass, Move, Layers, ShieldCheck } from 'lucide-react';

export function EmptyState() {
  return (
    <div className="text-center py-16 px-4 animate-fadeIn">
      <div className="w-16 h-16 rounded-3xl bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center mx-auto mb-4 shadow-inner">
        <Compass className="w-8 h-8 animate-spin" style={{ animationDuration: '25s' }} />
      </div>

      <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white mb-2">
        Where do you want to go?
      </h3>
      <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto mb-10 leading-relaxed">
        Describe your trip ideas above. TripWise AI generates a structured itinerary, then hand you full interactive control to edit, reorder, expand, or remove stops locally.
      </p>

      {/* Feature Pillar Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 max-w-3xl mx-auto text-left">
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="w-9 h-9 rounded-xl bg-indigo-100 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-3">
            <Layers className="w-5 h-5" />
          </div>
          <h4 className="font-bold text-sm mb-1 text-slate-900 dark:text-white">Structured Output</h4>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            No chatbot paragraph dumps. Returns clean JSON parsed into day cards and stops.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="w-9 h-9 rounded-xl bg-purple-100 dark:bg-purple-950/50 text-purple-600 dark:text-purple-400 flex items-center justify-center mb-3">
            <Move className="w-5 h-5" />
          </div>
          <h4 className="font-bold text-sm mb-1 text-slate-900 dark:text-white">Interactive Manipulation</h4>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            Expand details, remove stops, and reorder stops without calling the AI model again.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="w-9 h-9 rounded-xl bg-emerald-100 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-3">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h4 className="font-bold text-sm mb-1 text-slate-900 dark:text-white">Robust Fail-Safe</h4>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            Zod schema validation, JSON repair, and stale request cancellation ensure zero app crashes.
          </p>
        </div>
      </div>
    </div>
  );
}
