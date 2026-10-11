import React from 'react';
import { Loader2, Compass, Sparkles } from 'lucide-react';

export function LoadingState({ onCancel }) {
  return (
    <div className="bg-[#111A2E] rounded-3xl p-8 sm:p-12 text-center max-w-xl mx-auto shadow-2xl border border-[#29354B] my-8 animate-fadeIn">
      <div className="relative w-16 h-16 mx-auto mb-6">
        <div className="absolute inset-0 rounded-2xl bg-cyan-500/20 animate-ping opacity-75" />
        <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-white shadow-lg shadow-cyan-500/30">
          <Compass className="w-8 h-8 animate-spin" style={{ animationDuration: '6s' }} />
        </div>
      </div>

      <h3 className="font-extrabold text-xl text-[#F8FAFC] mb-2 flex items-center justify-center gap-2">
        <Sparkles className="w-5 h-5 text-amber-400 animate-bounce" />
        Planning Your Custom Itinerary...
      </h3>

      <p className="text-xs sm:text-sm text-[#94A3B8] max-w-sm mx-auto mb-6 leading-relaxed">
        Building a balanced day-by-day schedule with realistic travel durations, cost estimates, and local recommendations.
      </p>

      {/* Skeleton Loading Card */}
      <div className="space-y-3 max-w-md mx-auto mb-6 opacity-75">
        <div className="h-4 bg-[#19243A] rounded-lg w-3/4 mx-auto animate-pulse" />
        <div className="h-12 bg-[#19243A] rounded-xl animate-pulse" />
        <div className="h-12 bg-[#19243A] rounded-xl animate-pulse" />
      </div>

      {onCancel && (
        <button
          onClick={onCancel}
          className="px-4 py-2 rounded-xl text-xs font-semibold text-rose-400 hover:bg-rose-950/40 border border-rose-800 transition-all"
        >
          Cancel Request
        </button>
      )}
    </div>
  );
}
