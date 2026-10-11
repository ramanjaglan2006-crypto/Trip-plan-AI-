import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, ShieldCheck, Compass, Sliders, Clock, MapPin, Calendar, CheckCircle2, FileText, Layers, Download } from 'lucide-react';

export function HomePage() {
  return (
    <div className="space-y-20 pb-16 animate-fadeIn text-white">
      {/* SECTION 1: TWO-COLUMN HERO EXPERIENCE */}
      <section className="relative rounded-3xl overflow-hidden p-8 sm:p-12 lg:p-16 border border-[#29354B] bg-[#111A2E] shadow-2xl">
        {/* Subtle Ambient Background Gradient */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Copy & Actions */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 text-[#22D3EE] border border-cyan-500/20 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>AI-POWERED TRAVEL PLANNER</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1] text-[#F8FAFC] font-sans">
              Your Next Adventure, <br />
              <span className="bg-gradient-to-r from-[#22D3EE] via-teal-300 to-blue-400 bg-clip-text text-transparent">
                Planned Intelligently.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-[#94A3B8] leading-relaxed max-w-xl font-normal">
              Build personalized travel itineraries in seconds. Discover destinations, organize activities, and customize every detail of your journey.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                to="/plan"
                className="px-7 py-3.5 rounded-2xl bg-[#22D3EE] hover:bg-cyan-300 text-[#080D1B] font-extrabold text-sm shadow-lg shadow-cyan-500/20 transition-all flex items-center gap-2 group active:scale-95"
              >
                <span>Plan My Trip</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
              <Link
                to="/plan"
                className="px-6 py-3.5 rounded-2xl bg-[#19243A] hover:bg-[#202e4a] text-[#F8FAFC] font-semibold text-sm border border-[#29354B] transition-all"
              >
                Explore Destinations
              </Link>
            </div>

            {/* Compact Supporting Value Statement */}
            <div className="pt-4 border-t border-[#29354B]/80 flex flex-wrap items-center gap-6 text-xs text-[#94A3B8] font-medium">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                Personalized itineraries
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                Flexible plans
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                Simple exports
              </span>
            </div>
          </div>

          {/* Right Column: Polished Itinerary Visual Preview Card */}
          <div className="lg:col-span-5">
            <div className="rounded-2xl bg-[#080D1B] border border-[#29354B] p-5 shadow-2xl relative overflow-hidden space-y-4">
              {/* Destination Image Banner */}
              <div className="relative h-44 rounded-xl overflow-hidden border border-[#29354B]">
                <img
                  src="https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=800&auto=format&fit=crop"
                  alt="Kyoto, Japan preview"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#080D1B] via-transparent to-black/20" />
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs">
                  <span className="px-2.5 py-1 rounded-md bg-[#080D1B]/80 backdrop-blur-md text-[#22D3EE] font-bold border border-cyan-800/40">
                    5-Day Sample
                  </span>
                  <span className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-[#080D1B]/80 backdrop-blur-md text-white font-semibold">
                    <MapPin className="w-3 h-3 text-rose-400" /> Tokyo & Kyoto
                  </span>
                </div>
              </div>

              {/* Trip Header Preview */}
              <div>
                <h3 className="font-extrabold text-base text-[#F8FAFC]">
                  Tokyo & Kyoto Cultural Highlights
                </h3>
                <p className="text-xs text-[#94A3B8] mt-0.5">
                  Day 1: Modern Wonders & Historic Sanctuaries
                </p>
              </div>

              {/* Daily Stops Sample List */}
              <div className="space-y-2 pt-1">
                <div className="p-2.5 rounded-xl bg-[#111A2E] border border-[#29354B] flex items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2.5">
                    <span className="w-2 h-2 rounded-full bg-cyan-400" />
                    <span className="font-semibold text-slate-200">Meiji Shrine & Forest Walk</span>
                  </div>
                  <span className="text-[10px] text-[#94A3B8] bg-[#19243A] px-2 py-0.5 rounded font-medium">09:00 AM</span>
                </div>

                <div className="p-2.5 rounded-xl bg-[#111A2E] border border-[#29354B] flex items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    <span className="font-semibold text-slate-200">Tsukiji Gourmet Market</span>
                  </div>
                  <span className="text-[10px] text-[#94A3B8] bg-[#19243A] px-2 py-0.5 rounded font-medium">12:30 PM</span>
                </div>

                <div className="p-2.5 rounded-xl bg-[#111A2E] border border-[#29354B] flex items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2.5">
                    <span className="w-2 h-2 rounded-full bg-purple-400" />
                    <span className="font-semibold text-slate-200">Shibuya Sky Sunset Vista</span>
                  </div>
                  <span className="text-[10px] text-[#94A3B8] bg-[#19243A] px-2 py-0.5 rounded font-medium">04:30 PM</span>
                </div>
              </div>

              {/* Presentational Footer Tag */}
              <div className="pt-2 border-t border-[#29354B] flex items-center justify-between text-[11px] text-[#94A3B8]">
                <span className="flex items-center gap-1 text-emerald-400 font-semibold">
                  <Sliders className="w-3.5 h-3.5" /> Reorder & Edit Stops Live
                </span>
                <span className="text-slate-400">PDF / JSON Export</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: HOW IT WORKS */}
      <section className="space-y-10">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-[#22D3EE]">Simple & Intelligent</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#F8FAFC] font-sans">
            How TripWise AI Works For You
          </h2>
          <p className="text-sm text-[#94A3B8] max-w-xl mx-auto">
            From natural language prompt to a tailored, interactive travel plan in three clean steps.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Step 1 */}
          <div className="bg-[#111A2E] rounded-2xl p-7 border border-[#29354B] space-y-4 hover:border-cyan-500/40 transition-all flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-cyan-500/10 text-[#22D3EE] flex items-center justify-center font-bold text-lg">
                <Compass className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-xl text-[#F8FAFC]">
                1. Describe Your Trip
              </h3>
              <p className="text-xs text-[#94A3B8] leading-relaxed">
                Enter your destination, duration, travelers, budget tier, and preferred themes. Our AI engine structures a comprehensive daily itinerary.
              </p>
            </div>
            <div className="pt-2 text-xs font-bold text-[#22D3EE] flex items-center gap-1">
              Natural language support <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Step 2 */}
          <div className="bg-[#111A2E] rounded-2xl p-7 border border-[#29354B] space-y-4 hover:border-teal-500/40 transition-all flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-teal-500/10 text-teal-400 flex items-center justify-center font-bold text-lg">
                <Sliders className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-xl text-[#F8FAFC]">
                2. Customize Everything
              </h3>
              <p className="text-xs text-[#94A3B8] leading-relaxed">
                Add stops, delete unwanted visits, change scheduled times, and reorder activities up or down without re-triggering AI calls or losing edits.
              </p>
            </div>
            <div className="pt-2 text-xs font-bold text-teal-400 flex items-center gap-1">
              100% In-browser reactivity <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Step 3 */}
          <div className="bg-[#111A2E] rounded-2xl p-7 border border-[#29354B] space-y-4 hover:border-blue-500/40 transition-all flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center font-bold text-lg">
                <Download className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-xl text-[#F8FAFC]">
                3. Save & Export Anywhere
              </h3>
              <p className="text-xs text-[#94A3B8] leading-relaxed">
                Your itineraries persist automatically in your offline library. Export formatted Markdown, standard JSON, or print directly to clean PDF documents.
              </p>
            </div>
            <div className="pt-2 text-xs font-bold text-blue-400 flex items-center gap-1">
              Offline persistence <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: THE TRIPWISE ADVANTAGE */}
      <section className="bg-[#111A2E] rounded-3xl p-8 sm:p-12 border border-[#29354B] space-y-8">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 block mb-1">
            Engineered For Travelers
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#F8FAFC] font-sans">
            Why Choose TripWise AI
          </h2>
          <p className="text-sm text-[#94A3B8] max-w-2xl mt-2 leading-relaxed">
            Unlike static chatbots that produce uneditable walls of text, TripWise AI creates structured data models that you can interact with and refine.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
          <div className="space-y-3 p-5 rounded-2xl bg-[#080D1B]/50 border border-[#29354B]">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
              <Clock className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-[#F8FAFC]">Hours Turned Into Minutes</h3>
            <p className="text-xs text-[#94A3B8] leading-relaxed">
              No more searching 30 tabs for hours. Get a complete, realistic itinerary calibrated for timing, budget, and travel style in seconds.
            </p>
          </div>

          <div className="space-y-3 p-5 rounded-2xl bg-[#080D1B]/50 border border-[#29354B]">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-[#22D3EE] flex items-center justify-center">
              <Sliders className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-[#F8FAFC]">Live In-Memory Adjustments</h3>
            <p className="text-xs text-[#94A3B8] leading-relaxed">
              Move stops up or down, edit durations and costs, and append new stops. All operations run instantly in local state without server delays.
            </p>
          </div>

          <div className="space-y-3 p-5 rounded-2xl bg-[#080D1B]/50 border border-[#29354B]">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-[#F8FAFC]">Fault-Tolerant Architecture</h3>
            <p className="text-xs text-[#94A3B8] leading-relaxed">
              Equipped with Zod schema verification, JSON repair, stale request protection, and offline fallback generators for continuous uptime.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 4: CALL TO ACTION */}
      <section className="rounded-3xl p-8 sm:p-12 border border-[#29354B] bg-gradient-to-r from-[#111A2E] via-[#19243A] to-[#111A2E] text-center space-y-6">
        <div className="max-w-2xl mx-auto space-y-3">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#F8FAFC] tracking-tight font-sans">
            Ready to plan your next journey?
          </h2>
          <p className="text-sm text-[#94A3B8] leading-relaxed">
            Create your custom itinerary now. Completely free, customizable, and instantly exportable.
          </p>
        </div>

        <div>
          <Link
            to="/plan"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-[#22D3EE] hover:bg-cyan-300 text-[#080D1B] font-extrabold text-sm shadow-xl shadow-cyan-500/20 transition-all active:scale-95"
          >
            <Sparkles className="w-4 h-4" />
            <span>Start Planning with TripWise AI</span>
          </Link>
        </div>
      </section>
    </div>
  );
}
