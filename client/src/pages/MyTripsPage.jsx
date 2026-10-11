import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useTripContext } from '../context/TripContext';
import { getSavedTrips, exportAsJSON, exportAsMarkdown } from '../utils/storage';
import { Bookmark, MapPin, Calendar, Users, ArrowRight, Trash2, Download, FileText, Sparkles, Search } from 'lucide-react';

export function MyTripsPage() {
  const [trips, setTrips] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const { loadTrip } = useTripContext();
  const navigate = useNavigate();

  useEffect(() => {
    setTrips(getSavedTrips());
  }, []);

  const handleDelete = (title) => {
    if (window.confirm(`Are you sure you want to delete "${title || 'this trip'}"?`)) {
      const updated = trips.filter((t) => t.trip?.title !== title);
      setTrips(updated);
      try {
        localStorage.setItem('tripwise_ai_saved_trips', JSON.stringify(updated));
      } catch (e) {
        console.error(e);
      }
    }
  };

  const handleOpenTrip = (savedItinerary) => {
    loadTrip(savedItinerary);
    navigate('/itinerary');
  };

  const filteredTrips = trips.filter((t) => {
    const title = t.trip?.title?.toLowerCase() || '';
    const dest = t.trip?.destination?.toLowerCase() || '';
    const q = searchQuery.toLowerCase();
    return title.includes(q) || dest.includes(q);
  });

  return (
    <div className="space-y-8 py-4 animate-fadeIn text-white">
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#29354B] pb-6">
        <div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#F8FAFC] font-sans">
            My <span className="text-[#22D3EE]">Saved Trips</span>
          </h1>
          <p className="text-xs sm:text-sm text-[#94A3B8] mt-1">
            Access, reopen, and export all offline travel itineraries ({trips.length} saved)
          </p>
        </div>

        <div className="flex items-center gap-3">
          {trips.length > 0 && (
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-[#94A3B8] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search trips..."
                className="pl-8 pr-3 py-2 rounded-xl border border-[#29354B] bg-[#111A2E] text-white text-xs placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-[#22D3EE] w-40 sm:w-56"
              />
            </div>
          )}

          <Link
            to="/plan"
            className="px-5 py-2.5 rounded-xl bg-[#22D3EE] hover:bg-cyan-300 text-[#080D1B] font-extrabold text-xs shadow-md shadow-cyan-500/20 transition-all flex items-center gap-1.5 active:scale-95"
          >
            <Sparkles className="w-4 h-4 text-[#080D1B]" />
            <span>New Trip</span>
          </Link>
        </div>
      </div>

      {trips.length === 0 ? (
        /* Empty State */
        <div className="text-center py-20 px-6 bg-[#111A2E] rounded-3xl border border-[#29354B] max-w-md mx-auto space-y-4 shadow-xl">
          <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 text-[#22D3EE] border border-cyan-500/20 flex items-center justify-center mx-auto">
            <Bookmark className="w-8 h-8" />
          </div>
          <h3 className="font-extrabold text-xl text-[#F8FAFC]">No Saved Trips Yet</h3>
          <p className="text-xs text-[#94A3B8] leading-relaxed">
            Generate an itinerary on the Explore & Plan page and it will be preserved automatically in your local offline storage.
          </p>
          <div className="pt-2">
            <Link
              to="/plan"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-[#22D3EE] hover:bg-cyan-300 text-[#080D1B] font-extrabold text-xs shadow-lg shadow-cyan-500/20 transition-all"
            >
              <Sparkles className="w-4 h-4 text-[#080D1B]" />
              <span>Start Planning Your First Trip</span>
            </Link>
          </div>
        </div>
      ) : (
        /* Trips Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredTrips.map((itinerary, idx) => {
            const trip = itinerary.trip || {};
            const totalStops = (itinerary.days || []).reduce(
              (sum, d) => sum + (d.stops?.length || 0),
              0
            );

            return (
              <div
                key={idx}
                className="bg-[#111A2E] rounded-3xl p-6 sm:p-7 border border-[#29354B] space-y-5 hover:border-[#22D3EE]/50 transition-all flex flex-col justify-between shadow-xl"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-cyan-500/10 text-[#22D3EE] px-2.5 py-0.5 rounded-full border border-cyan-500/20">
                      {totalStops} Activities Planned
                    </span>
                    <button
                      onClick={() => handleDelete(trip.title)}
                      className="p-1.5 text-[#94A3B8] hover:text-rose-400 hover:bg-[#19243A] rounded-lg transition-colors"
                      title="Delete saved trip"
                      aria-label="Delete saved trip"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <h3 className="font-extrabold text-xl text-[#F8FAFC]">
                    {trip.title || 'Custom Adventure'}
                  </h3>

                  <p className="text-xs text-[#94A3B8] line-clamp-2 leading-relaxed">
                    {trip.summary || 'Custom editable travel itinerary.'}
                  </p>

                  <div className="flex flex-wrap items-center gap-2.5 text-xs text-slate-300 pt-1">
                    <span className="flex items-center gap-1 bg-[#080D1B] px-2.5 py-1 rounded-lg border border-[#29354B]">
                      <MapPin className="w-3.5 h-3.5 text-rose-400" />
                      {trip.destination}
                    </span>
                    <span className="flex items-center gap-1 bg-[#080D1B] px-2.5 py-1 rounded-lg border border-[#29354B]">
                      <Calendar className="w-3.5 h-3.5 text-amber-400" />
                      {trip.duration} Days
                    </span>
                    <span className="flex items-center gap-1 bg-[#080D1B] px-2.5 py-1 rounded-lg border border-[#29354B]">
                      <Users className="w-3.5 h-3.5 text-emerald-400" />
                      {trip.travelers} Travelers
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-[#29354B]">
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => exportAsJSON(itinerary)}
                      className="p-2 rounded-xl bg-[#080D1B] text-[#94A3B8] hover:text-white text-xs border border-[#29354B] transition-colors"
                      title="Export JSON"
                    >
                      <Download className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => exportAsMarkdown(itinerary)}
                      className="p-2 rounded-xl bg-[#080D1B] text-[#94A3B8] hover:text-white text-xs border border-[#29354B] transition-colors"
                      title="Export Markdown"
                    >
                      <FileText className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <button
                    onClick={() => handleOpenTrip(itinerary)}
                    className="px-4 py-2 rounded-xl bg-[#22D3EE] hover:bg-cyan-300 text-[#080D1B] font-extrabold text-xs shadow-md transition-all flex items-center gap-1.5 active:scale-95"
                  >
                    <span>View & Edit Itinerary</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
