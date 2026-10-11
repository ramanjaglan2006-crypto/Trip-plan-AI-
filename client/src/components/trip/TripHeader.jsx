import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Calendar, Users, Download, FileText, Printer, RotateCcw, ChevronDown, CheckCircle2, DollarSign } from 'lucide-react';
import { exportAsJSON, exportAsMarkdown } from '../../utils/storage';

export function TripHeader({ itinerary, onReset }) {
  const navigate = useNavigate();
  const [exportOpen, setExportOpen] = useState(false);
  const dropdownRef = useRef(null);

  const { trip = {}, days = [] } = itinerary || {};
  const totalStops = days.reduce((sum, d) => sum + (d.stops?.length || 0), 0);

  // Close export dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setExportOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleGenerateNew = () => {
    if (window.confirm('Do you want to create a new trip? Your current trip is saved in your library.')) {
      onReset();
      navigate('/plan');
    }
  };

  return (
    <div className="relative rounded-3xl bg-[#111A2E] border border-[#29354B] text-white p-6 sm:p-8 lg:p-10 shadow-2xl overflow-hidden">
      {/* Subtle Ambient Glow */}
      <div className="absolute top-0 right-0 -mr-16 -mt-16 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-60 h-60 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="space-y-4 max-w-3xl">
          {/* Eyebrow status badges */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 text-xs font-bold uppercase tracking-wider bg-cyan-500/10 text-[#22D3EE] border border-cyan-500/20 rounded-full">
              Interactive Itinerary
            </span>
            <span className="px-2.5 py-1 text-xs font-semibold bg-[#19243A] text-slate-300 border border-[#29354B] rounded-full">
              {totalStops} Planned Activities
            </span>
            <span className="px-2.5 py-1 text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" /> Auto-Saved
            </span>
          </div>

          {/* Title & Description */}
          <div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-[#F8FAFC] leading-tight font-sans">
              {trip.title || `${trip.destination} Itinerary`}
            </h2>
            <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed mt-2 max-w-2xl">
              {trip.summary}
            </p>
          </div>

          {/* Key Parameters Meta Pills */}
          <div className="flex flex-wrap items-center gap-2.5 text-xs font-semibold pt-1">
            <span className="flex items-center gap-1.5 bg-[#080D1B] text-slate-200 border border-[#29354B] px-3 py-1.5 rounded-xl">
              <MapPin className="w-3.5 h-3.5 text-rose-400" />
              {trip.destination}
            </span>
            <span className="flex items-center gap-1.5 bg-[#080D1B] text-slate-200 border border-[#29354B] px-3 py-1.5 rounded-xl">
              <Calendar className="w-3.5 h-3.5 text-amber-400" />
              {trip.duration} Days
            </span>
            <span className="flex items-center gap-1.5 bg-[#080D1B] text-slate-200 border border-[#29354B] px-3 py-1.5 rounded-xl">
              <Users className="w-3.5 h-3.5 text-emerald-400" />
              {trip.travelers} Travelers
            </span>
            {trip.budget && (
              <span className="flex items-center gap-1.5 bg-[#080D1B] text-slate-200 border border-[#29354B] px-3 py-1.5 rounded-xl">
                <DollarSign className="w-3.5 h-3.5 text-[#22D3EE]" />
                {trip.budget}
              </span>
            )}
          </div>
        </div>

        {/* Action Toolbar */}
        <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 print:hidden">
          {/* Generate New Trip Action */}
          <button
            onClick={handleGenerateNew}
            className="px-4 py-2.5 rounded-xl font-bold text-xs bg-[#19243A] hover:bg-[#22304d] text-slate-200 border border-[#29354B] transition-all flex items-center justify-center gap-2 shadow-sm"
            title="Generate a new itinerary"
          >
            <RotateCcw className="w-3.5 h-3.5 text-[#22D3EE]" />
            <span>New Trip</span>
          </button>

          {/* Export Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setExportOpen(!exportOpen)}
              className="px-4 py-2.5 rounded-xl font-extrabold text-xs bg-[#22D3EE] hover:bg-cyan-300 text-[#080D1B] shadow-lg shadow-cyan-500/20 transition-all flex items-center justify-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5 text-[#080D1B]" />
              <span>Export</span>
              <ChevronDown className="w-3.5 h-3.5 text-[#080D1B]" />
            </button>

            {exportOpen && (
              <div className="absolute right-0 mt-2 w-48 rounded-2xl bg-[#080D1B] border border-[#29354B] shadow-2xl p-2 z-50 space-y-1 animate-fadeIn">
                <button
                  onClick={() => {
                    exportAsJSON(itinerary);
                    setExportOpen(false);
                  }}
                  className="w-full px-3 py-2 text-left text-xs font-semibold text-slate-200 hover:text-white hover:bg-[#19243A] rounded-xl flex items-center gap-2 transition-colors"
                >
                  <Download className="w-3.5 h-3.5 text-[#22D3EE]" />
                  <span>Download JSON</span>
                </button>
                <button
                  onClick={() => {
                    exportAsMarkdown(itinerary);
                    setExportOpen(false);
                  }}
                  className="w-full px-3 py-2 text-left text-xs font-semibold text-slate-200 hover:text-white hover:bg-[#19243A] rounded-xl flex items-center gap-2 transition-colors"
                >
                  <FileText className="w-3.5 h-3.5 text-amber-400" />
                  <span>Download Markdown</span>
                </button>
                <button
                  onClick={() => {
                    setExportOpen(false);
                    window.print();
                  }}
                  className="w-full px-3 py-2 text-left text-xs font-semibold text-slate-200 hover:text-white hover:bg-[#19243A] rounded-xl flex items-center gap-2 transition-colors border-t border-[#29354B] pt-2"
                >
                  <Printer className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Print to PDF</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
