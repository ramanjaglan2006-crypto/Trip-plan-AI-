import React, { useState } from 'react';
import { ShieldCheck, Layers, Compass, Mail, Send, CheckCircle2, MessageSquare } from 'lucide-react';

export function AboutPage() {
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-12 py-4 animate-fadeIn text-white">
      {/* Header */}
      <div className="text-center space-y-3">
        <span className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-xs font-bold uppercase tracking-wider">
          About & Contact
        </span>
        <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white font-sans">
          About <span className="text-cyan-400">TripWise AI</span>
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto leading-relaxed">
          An intelligent, interactive travel itinerary engine built with modern React state management, AI generation, and fail-safe architecture.
        </p>
      </div>

      {/* Core Architectural Principles */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-slate-900/90 rounded-3xl p-6 border border-slate-800 space-y-3 shadow-xl">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center">
            <Layers className="w-5 h-5" />
          </div>
          <h3 className="font-extrabold text-xl text-white">Interactive State Ownership</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            The AI model generates the initial structured itinerary. Once received, React state takes 100% ownership of the itinerary. Stop expansion, removal, editing, and reordering happen locally in real time.
          </p>
        </div>

        <div className="bg-slate-900/90 rounded-3xl p-6 border border-slate-800 space-y-3 shadow-xl">
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
      <div className="bg-slate-900/90 rounded-3xl p-8 border border-slate-800 space-y-4 shadow-xl">
        <h3 className="font-extrabold text-xl text-white flex items-center gap-2">
          <Compass className="w-5 h-5 text-cyan-400" />
          Technology Stack
        </h3>
        <p className="text-xs text-slate-300 leading-relaxed">
          Built with React 18, Vite, Express, Tailwind CSS, Zod schema validation, Lucide icons, and Google Gemini. Designed with full glassmorphism, responsive mobile drawers, dark mode support, and offline local persistence.
        </p>
      </div>

      {/* Merged Contact Section */}
      <div id="contact" className="bg-slate-900/90 rounded-3xl p-6 sm:p-10 border border-slate-800 shadow-2xl space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center">
            <Mail className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-extrabold text-2xl text-white font-sans">Get in Touch</h3>
            <p className="text-xs text-slate-400">Have questions, feedback, or inquiries? Reach out to us below.</p>
          </div>
        </div>

        {submitted ? (
          <div className="text-center py-8 space-y-3">
            <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
            <h3 className="font-extrabold text-xl text-white">Message Received!</h3>
            <p className="text-xs text-slate-400 max-w-xs mx-auto">
              Thank you for reaching out. We will get back to you shortly!
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 pt-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">Your Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Alex Morgan"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-700 bg-slate-800 text-white text-xs focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">Email Address</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-700 bg-slate-800 text-white text-xs focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">Message / Inquiry</label>
              <textarea
                rows={4}
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Write your message here..."
                className="w-full px-4 py-2.5 rounded-xl border border-slate-700 bg-slate-800 text-white text-xs focus:outline-none focus:ring-2 focus:ring-cyan-500 resize-none"
              />
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="submit"
                className="px-6 py-3 rounded-full bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-400 hover:to-emerald-400 text-slate-950 font-extrabold text-xs shadow-md transition-all flex items-center gap-2"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Send Message</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
