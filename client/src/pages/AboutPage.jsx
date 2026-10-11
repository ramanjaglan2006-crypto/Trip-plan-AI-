import React, { useState } from 'react';
import { ShieldCheck, Layers, Compass, Mail, Send, CheckCircle2 } from 'lucide-react';

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
        <span className="px-3.5 py-1 rounded-full bg-cyan-500/10 text-[#22D3EE] border border-cyan-500/20 text-xs font-bold uppercase tracking-wider">
          About & Contact
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#F8FAFC] font-sans">
          About <span className="text-[#22D3EE]">TripWise AI</span>
        </h1>
        <p className="text-xs sm:text-sm text-[#94A3B8] max-w-xl mx-auto leading-relaxed">
          An intelligent, interactive travel itinerary engine built with modern React state management, AI generation, and fail-safe architecture.
        </p>
      </div>

      {/* Core Architectural Principles */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-[#111A2E] rounded-3xl p-7 border border-[#29354B] space-y-3 shadow-xl">
          <div className="w-11 h-11 rounded-xl bg-cyan-500/10 text-[#22D3EE] border border-cyan-500/20 flex items-center justify-center">
            <Layers className="w-5 h-5" />
          </div>
          <h3 className="font-extrabold text-xl text-[#F8FAFC]">Interactive State Ownership</h3>
          <p className="text-xs text-[#94A3B8] leading-relaxed">
            The AI model generates the initial structured itinerary. Once received, React state takes 100% ownership of the itinerary. Stop expansion, removal, editing, and reordering happen locally in real time.
          </p>
        </div>

        <div className="bg-[#111A2E] rounded-3xl p-7 border border-[#29354B] space-y-3 shadow-xl">
          <div className="w-11 h-11 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="font-extrabold text-xl text-[#F8FAFC]">Fail-Safe Architecture</h3>
          <p className="text-xs text-[#94A3B8] leading-relaxed">
            Unreliable LLM outputs (malformed JSON, syntax errors, network timeouts) are intercepted through defensive pipelines, JSON parsing repair, schema validation, and fallback generators so the app remains resilient.
          </p>
        </div>
      </div>

      {/* System Overview */}
      <div className="bg-[#111A2E] rounded-3xl p-8 border border-[#29354B] space-y-3 shadow-xl">
        <h3 className="font-extrabold text-xl text-[#F8FAFC] flex items-center gap-2">
          <Compass className="w-5 h-5 text-[#22D3EE]" />
          Technology Stack
        </h3>
        <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed">
          Built with React 18, Vite, Express, Tailwind CSS, Zod schema validation, Lucide icons, and Google Gemini. Designed with custom tokens, responsive mobile drawers, dark mode support, and offline local persistence.
        </p>
      </div>

      {/* Merged Contact Section */}
      <div id="contact" className="bg-[#111A2E] rounded-3xl p-6 sm:p-10 border border-[#29354B] shadow-2xl space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-cyan-500/10 text-[#22D3EE] border border-cyan-500/20 flex items-center justify-center">
            <Mail className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-extrabold text-2xl text-[#F8FAFC] font-sans">Get in Touch</h3>
            <p className="text-xs text-[#94A3B8]">Have questions, feedback, or inquiries? Reach out to us below.</p>
          </div>
        </div>

        {submitted ? (
          <div className="text-center py-8 space-y-3">
            <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
            <h3 className="font-extrabold text-xl text-[#F8FAFC]">Message Received!</h3>
            <p className="text-xs text-[#94A3B8] max-w-xs mx-auto">
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
                  className="w-full px-4 py-2.5 rounded-xl border border-[#29354B] bg-[#080D1B] text-white text-xs focus:outline-none focus:ring-2 focus:ring-[#22D3EE]"
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
                  className="w-full px-4 py-2.5 rounded-xl border border-[#29354B] bg-[#080D1B] text-white text-xs focus:outline-none focus:ring-2 focus:ring-[#22D3EE]"
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
                className="w-full px-4 py-2.5 rounded-xl border border-[#29354B] bg-[#080D1B] text-white text-xs focus:outline-none focus:ring-2 focus:ring-[#22D3EE] resize-none"
              />
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="submit"
                className="px-7 py-3 rounded-2xl bg-[#22D3EE] hover:bg-cyan-300 text-[#080D1B] font-extrabold text-xs shadow-md transition-all flex items-center gap-2 active:scale-95"
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
