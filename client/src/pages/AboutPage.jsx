import React from 'react';
import { ShieldCheck, Layers, Cpu, CheckCircle2 } from 'lucide-react';

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
          Frontend Internship Assignment submission built around first-principles engineering, structured JSON parsing, Zod schema validation, and fail-safe state management.
        </p>
      </div>

      {/* Core Architectural Principles */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-slate-900/90 rounded-3xl p-6 border border-slate-800 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center">
            <Layers className="w-5 h-5" />
          </div>
          <h3 className="font-extrabold text-xl text-white">No Chatbot Principle</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            The AI model acts strictly as an initial structured data generator. Once received, React state takes 100% ownership of the itinerary. Stop expansion, removal, editing, and reordering happen locally without triggering AI calls.
          </p>
        </div>

        <div className="bg-slate-900/90 rounded-3xl p-6 border border-slate-800 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="font-extrabold text-xl text-white">6-Layer Failure Strategy</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Unreliable LLM outputs (malformed JSON, wrong shape, timeouts, 500 errors) are intercepted through code fence stripping, JSON.parse repair patches, Zod schema validation, and defensive fallbacks so the app NEVER crashes.
          </p>
        </div>
      </div>

      {/* AI Usage Note Section */}
      <div className="bg-slate-900/90 rounded-3xl p-8 border border-slate-800 space-y-4">
        <h3 className="font-extrabold text-xl text-white flex items-center gap-2">
          <Cpu className="w-5 h-5 text-cyan-400" />
          AI Usage Note (Transparency)
        </h3>
        <p className="text-xs text-slate-300 leading-relaxed">
          In compliance with assignment guidelines, AI development tools were used during development for brainstorming, boilerplate scaffolding, Tailwind token styling, drafting Zod schemas, and generating synthetic malformed payloads. All final React hooks, Express endpoints, AbortController stale guards, and component architecture were reviewed, tested, and understood for interview walk-throughs.
        </p>
      </div>
    </div>
  );
}
