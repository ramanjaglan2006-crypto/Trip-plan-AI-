import React from 'react';
import { Compass, Move, Layers, ShieldCheck } from 'lucide-react';

export function EmptyState() {
  return (
    <div className="text-center py-16 px-4 animate-fadeIn text-white">
      <div className="w-16 h-16 rounded-3xl bg-cyan-500/10 text-[#22D3EE] border border-cyan-500/20 flex items-center justify-center mx-auto mb-4 shadow-inner">
        <Compass className="w-8 h-8 animate-spin" style={{ animationDuration: '25s' }} />
      </div>

      <h3 className="text-2xl font-extrabold text-[#F8FAFC] mb-2 font-sans">
        Where do you want to go?
      </h3>
      <p className="text-xs sm:text-sm text-[#94A3B8] max-w-md mx-auto mb-10 leading-relaxed">
        Describe your travel destination or preferred style above. TripWise AI generates a structured itinerary, then hands you full interactive control to edit, reorder, expand, or remove stops locally.
      </p>

      {/* Feature Pillar Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 max-w-3xl mx-auto text-left">
        <div className="p-5 rounded-2xl bg-[#111A2E] border border-[#29354B] shadow-sm">
          <div className="w-9 h-9 rounded-xl bg-cyan-500/10 text-[#22D3EE] flex items-center justify-center mb-3">
            <Layers className="w-5 h-5" />
          </div>
          <h4 className="font-bold text-sm mb-1 text-[#F8FAFC]">Structured Output</h4>
          <p className="text-xs text-[#94A3B8] leading-relaxed">
            No unformatted chatbot text blocks. Returns clean JSON organized into day cards and activity stops.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-[#111A2E] border border-[#29354B] shadow-sm">
          <div className="w-9 h-9 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center mb-3">
            <Move className="w-5 h-5" />
          </div>
          <h4 className="font-bold text-sm mb-1 text-[#F8FAFC]">Interactive Control</h4>
          <p className="text-xs text-[#94A3B8] leading-relaxed">
            Expand details, delete activities, and reorder stops without calling the AI model again.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-[#111A2E] border border-[#29354B] shadow-sm">
          <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-3">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h4 className="font-bold text-sm mb-1 text-[#F8FAFC]">Robust Fail-Safe</h4>
          <p className="text-xs text-[#94A3B8] leading-relaxed">
            Zod schema validation, JSON repair, and stale request protection guarantee uninterrupted stability.
          </p>
        </div>
      </div>
    </div>
  );
}
