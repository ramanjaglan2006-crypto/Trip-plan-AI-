import React from 'react';
import { MapPin, Calendar, Users, Download, FileText, Printer, RotateCcw } from 'lucide-react';
import { exportAsJSON, exportAsMarkdown } from '../../utils/storage';

export function TripHeader({ itinerary, onReset }) {
  const { trip, days = [] } = itinerary;
  const totalStops = days.reduce((sum, d) => sum + (d.stops?.length || 0), 0);

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-800 text-white p-6 sm:p-10 shadow-2xl">
      {/* Background Glow */}
      <div className="absolute -right-10 -bottom-10 w-72 h-72 bg-white/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-3 max-w-2xl">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 text-xs font-extrabold uppercase tracking-wider bg-white/20 backdrop-blur-md rounded-full text-white border border-white/20">
              Interactive Itinerary
            </span>
            <span className="px-2.5 py-0.5 text-xs font-semibold bg-blue-900/40 text-blue-100 rounded-full border border-blue-400/30">
              {totalStops} Planned Stops
            </span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight leading-tight">
            {trip.title}
          </h2>

          <p className="text-sm sm:text-base text-blue-100/90 leading-relaxed">
            {trip.summary}
          </p>

          <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm font-semibold pt-2 text-white/90">
            <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-xl backdrop-blur-sm">
              <MapPin className="w-4 h-4 text-rose-300" />
              {trip.destination}
            </span>
            <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-xl backdrop-blur-sm">
              <Calendar className="w-4 h-4 text-amber-300" />
              {trip.duration} Days
            </span>
            <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-xl backdrop-blur-sm">
              <Users className="w-4 h-4 text-emerald-300" />
              {trip.travelers} Travelers
            </span>
          </div>
        </div>

        {/* Action Toolbar */}
        <div className="flex flex-wrap md:flex-col gap-2.5 print:hidden">
          <button
            onClick={onReset}
            className="px-4 py-2.5 rounded-2xl font-bold text-xs bg-white text-blue-900 hover:bg-blue-50 shadow-lg transition-all flex items-center justify-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Generate New Trip</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={() => exportAsJSON(itinerary)}
              className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition-all border border-white/20 flex-1 flex items-center justify-center gap-1"
              title="Export JSON"
            >
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">JSON</span>
            </button>

            <button
              onClick={() => exportAsMarkdown(itinerary)}
              className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition-all border border-white/20 flex-1 flex items-center justify-center gap-1"
              title="Export Markdown"
            >
              <FileText className="w-4 h-4" />
              <span className="hidden sm:inline">MD</span>
            </button>

            <button
              onClick={() => window.print()}
              className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition-all border border-white/20 flex-1 flex items-center justify-center gap-1"
              title="Print to PDF"
            >
              <Printer className="w-4 h-4" />
              <span className="hidden sm:inline">PDF</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
