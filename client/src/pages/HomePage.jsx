import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, ShieldCheck, Compass, Sliders, Zap, CheckCircle2, Clock } from 'lucide-react';

export function HomePage() {
  return (
    <div className="space-y-20 pb-16 animate-fadeIn text-white">
      {/* HERO SECTION (Styled like Reference Screenshot 1) */}
      <section className="relative min-h-[580px] rounded-3xl overflow-hidden flex items-center justify-between p-8 sm:p-14 border border-slate-800 shadow-2xl bg-slate-900">
        {/* Background Image & Ambient Overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-45 mix-blend-luminosity scale-105 transition-transform duration-1000"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1600&auto=format&fit=crop')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent" />

        {/* Content Container */}
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center w-full">
          {/* Headline Left */}
          <div className="lg:col-span-7 space-y-4">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" /> Next Generation AI Travel Engine
            </span>
            <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tight leading-none text-white drop-shadow-md font-sans">
              PLAN YOUR <br />
              <span className="bg-gradient-to-r from-cyan-400 via-emerald-400 to-blue-500 bg-clip-text text-transparent">
                NEXT TRIP
              </span> <br />
              WITH AI
            </h1>
          </div>

          {/* Translucent Glass Card Right */}
          <div className="lg:col-span-5 bg-slate-900/80 backdrop-blur-xl p-8 rounded-3xl border border-slate-700/80 shadow-2xl space-y-6">
            <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-medium">
              TripWise AI builds your itinerary in seconds. Edit stops, reorder schedules, and customize every day. Travel smarter, not harder.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link
                to="/plan"
                className="px-6 py-3 rounded-2xl bg-white text-slate-950 font-extrabold text-sm shadow-lg hover:bg-slate-100 transition-all flex items-center gap-2"
              >
                <span>Start planning</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/about"
                className="px-6 py-3 rounded-2xl bg-slate-800/80 hover:bg-slate-800 text-white font-bold text-sm border border-slate-700 transition-all"
              >
                Learn more
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: HOW IT WORKS FOR YOU (Styled like Reference Screenshot 2 & 3) */}
      <section className="space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white font-sans">
            How TripWise AI works for <span className="text-slate-400">you</span>
          </h2>
          <p className="text-sm text-slate-400 max-w-xl mx-auto">
            Three core architectural tools that handle everything from start to finish.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Card 1: Itineraries built by AI */}
          <div className="md:col-span-4 bg-slate-900/90 rounded-3xl p-8 border border-slate-800 space-y-6 flex flex-col justify-between hover:border-cyan-500/50 transition-all">
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center">
              <Compass className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-extrabold text-2xl text-white mb-2">
                Itineraries built by AI
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Let our cutting-edge algorithm do the heavy lifting and map out your realistic journey in structured JSON format.
              </p>
            </div>
            <Link to="/plan" className="text-xs font-bold text-cyan-400 flex items-center gap-1 hover:underline pt-4">
              DISCOVER <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Card 2: Command Center - Change anything */}
          <div className="md:col-span-8 bg-slate-900/90 rounded-3xl p-8 sm:p-10 border border-slate-800 space-y-6 flex flex-col justify-between hover:border-emerald-500/50 transition-all">
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
              COMMAND CENTER
            </span>
            <div className="space-y-3">
              <h3 className="font-black text-3xl sm:text-5xl tracking-tight text-white leading-none font-sans">
                Change anything <br />
                with a few taps
              </h3>
              <p className="text-sm text-slate-400 max-w-md">
                Your bespoke trip stays entirely flexible. Expand, remove, or reorder stops without making extra AI calls.
              </p>
            </div>
            <div className="pt-4 flex flex-wrap items-center gap-4">
              <Link
                to="/plan"
                className="px-6 py-3 rounded-full bg-white text-slate-950 font-extrabold text-xs shadow-lg hover:bg-slate-100 transition-all"
              >
                Customize Now
              </Link>
              <Link to="/about" className="text-xs font-bold text-slate-400 hover:text-white flex items-center gap-1">
                LEARN MORE <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: WHAT MAKES US DIFFERENT (Styled like Reference Screenshot 4) */}
      <section className="bg-slate-900/90 rounded-3xl p-8 sm:p-12 border border-slate-800 space-y-8">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-widest text-emerald-400 block mb-2">
            THE EDGE
          </span>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white font-sans">
            What makes TripWise <span className="text-emerald-400">different</span>
          </h2>
          <p className="text-sm text-slate-400 max-w-2xl mt-2 leading-relaxed">
            Travel planning used to demand patience and compromise. TripWise AI removes both. The AI handles the initial structuring while React state keeps you in total control.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
          <div className="space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <Clock className="w-5 h-5" />
            </div>
            <h3 className="font-extrabold text-lg text-white">Hours become minutes</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Stop spending days researching. Get a complete, highly-tailored structured itinerary instantly.
            </p>
          </div>

          <div className="space-y-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center">
              <Sliders className="w-5 h-5" />
            </div>
            <h3 className="font-extrabold text-lg text-white">Trips made personal</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              The AI learns what matters to you and builds your schedule accordingly. You can edit stop details live.
            </p>
          </div>

          <div className="space-y-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-extrabold text-lg text-white">Fail-safe architecture</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Zod schema validation, JSON repair, and stale request cancellation ensure zero application crashes.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 4: TRUSTED STATS BANNER (Styled like Reference Screenshot 5) */}
      <section className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        <div className="md:col-span-6 bg-slate-900/90 rounded-3xl p-8 border border-slate-800 space-y-4">
          <span className="text-[10px] font-bold uppercase tracking-widest text-cyan-400">
            RESULTS & TRUST
          </span>
          <h3 className="font-black text-3xl sm:text-4xl text-white tracking-tight font-sans">
            Trusted by travelers everywhere
          </h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            TripWise AI helps users spend less time planning and more time experiencing the world.
          </p>
          <div className="pt-2">
            <Link
              to="/plan"
              className="px-6 py-3 rounded-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-extrabold text-xs shadow-lg inline-block"
            >
              Start your trip
            </Link>
          </div>
        </div>

        <div className="md:col-span-6 bg-slate-900/90 rounded-3xl p-8 border border-slate-800 text-center flex flex-col items-center justify-center min-h-[220px]">
          <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500 block mb-2">
            Global Coverage
          </span>
          <span className="text-6xl sm:text-7xl font-black text-white font-sans tracking-tight">
            180+
          </span>
          <p className="text-xs text-slate-400 font-medium mt-2">
            Plan anywhere in the world.
          </p>
        </div>
      </section>
    </div>
  );
}
