import React, { useState } from 'react';
import { Sparkles, Loader2, RotateCcw, Compass } from 'lucide-react';
import { ExamplePrompts } from './ExamplePrompts';

export function TripInput({ onSubmit, isLoading, onCancel }) {
  const [prompt, setPrompt] = useState('');
  const maxChars = 2000;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!prompt.trim() || isLoading) return;
    onSubmit(prompt.trim());
  };

  const handleSelectPreset = (presetText) => {
    setPrompt(presetText);
  };

  return (
    <div className="glass-panel rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-200/80 dark:border-slate-800/80 transition-all">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400">
            <Compass className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-bold text-lg text-slate-900 dark:text-white">
              Describe Your Trip
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Enter any natural language travel notes, destination, budget, or preferred activities
            </p>
          </div>
        </div>

        {prompt && (
          <button
            type="button"
            onClick={() => setPrompt('')}
            className="text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 flex items-center gap-1 transition-all"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Clear
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <textarea
            rows={4}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value.slice(0, maxChars))}
            placeholder="e.g., Plan a relaxed 5-day trip to Japan for two people. We love food, culture and photography. We want Tokyo and Kyoto with a moderate budget..."
            className="w-full px-4 py-3.5 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white/90 dark:bg-slate-900/90 text-slate-900 dark:text-white text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500/50 shadow-inner placeholder:text-slate-400 transition-all resize-none"
            disabled={isLoading}
          />
          <div className="absolute bottom-3 right-4 text-[11px] font-medium text-slate-400">
            {prompt.length} / {maxChars}
          </div>
        </div>

        {/* Quick Example Presets */}
        <ExamplePrompts onSelect={handleSelectPreset} disabled={isLoading} />

        {/* Submit Row */}
        <div className="pt-2 flex items-center justify-end gap-3">
          {isLoading && onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2.5 rounded-xl text-xs font-semibold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 border border-rose-200 dark:border-rose-800 transition-all"
            >
              Cancel Request
            </button>
          )}

          <button
            type="submit"
            disabled={!prompt.trim() || isLoading}
            className={`w-full sm:w-auto px-6 py-3 rounded-2xl font-bold text-sm text-white shadow-lg transition-all flex items-center justify-center gap-2 ${
              !prompt.trim() || isLoading
                ? 'bg-slate-300 dark:bg-slate-800 cursor-not-allowed shadow-none'
                : 'bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 shadow-blue-500/25 active:scale-98'
            }`}
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Building Itinerary...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Build My Itinerary</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
