import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { getSavedTrips, exportAsJSON, exportAsMarkdown } from '../utils/storage';
import { Bookmark, MapPin, Calendar, Users, ArrowRight, Trash2, Download, FileText, Sparkles } from 'lucide-react';

export function MyTripsPage() {
  const [trips, setTrips] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setTrips(getSavedTrips());
  }, []);

  const handleDelete = (title) => {
    const updated = trips.filter((t) => t.trip?.title !== title);
    setTrips(updated);
    try {
      localStorage.setItem('tripwise_ai_saved_trips', JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="space-y-8 py-4 animate-fadeIn text-white">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black text-white font-sans">
            My <span className="text-cyan-400">Saved Trips</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Access and manage your stored offline itineraries ({trips.length})
          </p>
        </div>

        <Link
          to="/plan"
          className="px-5 py-2.5 rounded-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-extrabold text-xs shadow-md transition-all flex items-center gap-1.5"
        >
          <Sparkles className="w-4 h-4" />
          <span>New Trip</span>
        </Link>
      </div>

      {trips.length === 0 ? (
        <div className="text-center py-20 px-4 bg-slate-900/60 rounded-3xl border border-slate-800 max-w-md mx-auto space-y-4">
          <Bookmark className="w-10 h-10 text-slate-500 mx-auto opacity-50" />
          <h3 className="font-bold text-lg text-white">No saved trips yet</h3>
          <p className="text-xs text-slate-400">
            Generate an itinerary on the Explore page and it will automatically save here.
          </p>
          <Link
            to="/plan"
            className="inline-block px-5 py-2 rounded-full bg-slate-800 text-cyan-400 font-bold text-xs border border-slate-700"
          >
            Start Planning
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {trips.map((itinerary, idx) => {
            const trip = itinerary.trip || {};
            return (
              <div
                key={idx}
                className="bg-slate-900/90 rounded-3xl p-6 border border-slate-800 space-y-4 hover:border-cyan-500/50 transition-all flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-cyan-500/20 text-cyan-300 px-2.5 py-0.5 rounded-full border border-cyan-500/30">
                      Saved Session
                    </span>
                    <button
                      onClick={() => handleDelete(trip.title)}
                      className="p-1 text-slate-500 hover:text-rose-400 transition-colors"
                      title="Delete trip"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <h3 className="font-extrabold text-xl text-white">
                    {trip.title || 'Custom Trip'}
                  </h3>

                  <p className="text-xs text-slate-400 line-clamp-2">
                    {trip.summary}
                  </p>

                  <div className="flex flex-wrap items-center gap-3 text-xs text-slate-300 pt-1">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-rose-400" />
                      {trip.destination}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-amber-400" />
                      {trip.duration} Days
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="w-3.5 h-3.5 text-emerald-400" />
                      {trip.travelers} Travelers
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => exportAsJSON(itinerary)}
                      className="p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white text-xs border border-slate-700"
                      title="Export JSON"
                    >
                      <Download className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => exportAsMarkdown(itinerary)}
                      className="p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white text-xs border border-slate-700"
                      title="Export Markdown"
                    >
                      <FileText className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <Link
                    to="/itinerary"
                    className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-extrabold text-xs shadow-md transition-all flex items-center gap-1"
                  >
                    <span>View Itinerary</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
