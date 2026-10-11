import React from 'react';
import { Link } from 'react-router-dom';
import { useTripContext } from '../context/TripContext';
import { TripHeader } from '../components/trip/TripHeader';
import { ItineraryTimeline } from '../components/itinerary/ItineraryTimeline';
import { Compass, Sparkles } from 'lucide-react';

export function ItineraryPage() {
  const {
    itinerary,
    expandedStopIds,
    toggleExpandStop,
    removeStop,
    moveStop,
    editStop,
    addStop,
    resetItinerary,
  } = useTripContext();

  if (!itinerary) {
    return (
      <div className="text-center py-20 px-4 space-y-6 max-w-md mx-auto animate-fadeIn text-white">
        <div className="w-16 h-16 rounded-3xl bg-cyan-500/10 text-[#22D3EE] border border-cyan-500/20 flex items-center justify-center mx-auto mb-2">
          <Compass className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-extrabold text-[#F8FAFC] font-sans">
          No Active Itinerary Loaded
        </h2>
        <p className="text-xs text-[#94A3B8] leading-relaxed">
          Generate an itinerary on the Explore & Plan page or choose a saved trip from your library to start editing.
        </p>
        <Link
          to="/plan"
          className="px-6 py-3 rounded-2xl bg-[#22D3EE] hover:bg-cyan-300 text-[#080D1B] font-extrabold text-xs shadow-lg shadow-cyan-500/20 inline-flex items-center gap-2 transition-all active:scale-95"
        >
          <Sparkles className="w-4 h-4 text-[#080D1B]" />
          <span>Generate New Itinerary</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8 py-4 animate-fadeIn text-white">
      <TripHeader itinerary={itinerary} onReset={resetItinerary} />

      <ItineraryTimeline
        itinerary={itinerary}
        expandedStopIds={expandedStopIds}
        onToggleExpand={toggleExpandStop}
        onRemoveStop={removeStop}
        onMoveStop={moveStop}
        onEditStop={editStop}
        onAddStop={addStop}
      />
    </div>
  );
}
