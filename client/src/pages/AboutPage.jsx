import React from 'react';
import { ShieldCheck, Layers, Cpu, Compass } from 'lucide-react';

export function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-10 py-4 animate-fadeIn text-white">
      <div className="text-center space-y-3">
        <span className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-xs font-bold uppercase tracking-wider">
          Architecture & Engineering
        </span>
        <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white font-sans">
          About <span className="text-cyan-400">TripWise AI</span>
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto leading-relaxed">
          A modern, intelligent travel planning application built around first-principles engineering, structured JSON parsing, schema validation, and interactive state management.
        </p>
      </div>

      {/* Core Architectural Principles */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-slate-900/90 rounded-3xl p-6 border border-slate-800 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center">
            <Layers className="w-5 h-5" />
          </div>
          <h3 className="font-extrabold text-xl text-white">Interactive State Ownership</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            The AI model generates the initial structured itinerary. Once received, React state takes 100% ownership of the itinerary. Stop expansion, removal, editing, and reordering happen locally in real time.
          </p>
        </div>

        <div className="bg-slate-900/90 rounded-3xl p-6 border border-slate-800 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="font-extrabold text-xl text-white">Fail-Safe Architecture</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Unreliable LLM outputs (malformed JSON, syntax errors, network timeouts) are intercepted through defensive pipelines, JSON parsing repair, schema validation, and fallback generators so the app remains resilient.
          </p>
        </div>
      </div>

      {/* System Overview */}
      <div className="bg-slate-900/90 rounded-3xl p-8 border border-slate-800 space-y-4">
        <h3 className="font-extrabold text-xl text-white flex items-center gap-2">
          <Compass className="w-5 h-5 text-cyan-400" />
          Technology Stack
        </h3>
        <p className="text-xs text-slate-300 leading-relaxed">
          Built with React 18, Vite, Express, Tailwind CSS, Zod schema validation, Lucide icons, and Google Gemini. Designed with full glassmorphism, responsive mobile drawers, dark mode support, and offline local persistence.
        </p>
      </div>
    </div>
  );
}
