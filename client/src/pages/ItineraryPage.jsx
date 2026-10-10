import React from 'react';
import { Link } from 'react-router-dom';
import { useTripContext } from '../context/TripContext';
import { TripHeader } from '../components/trip/TripHeader';
import { ItineraryTimeline } from '../components/itinerary/ItineraryTimeline';
import { Compass, Sparkles, ArrowRight } from 'lucide-react';

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
        <div className="w-16 h-16 rounded-3xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center mx-auto mb-2">
          <Compass className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-black text-white font-sans">
          No active itinerary loaded
        </h2>
        <p className="text-xs text-slate-400 leading-relaxed">
          Generate an itinerary or load a saved trip session to start editing your stops.
        </p>
        <Link
          to="/plan"
          className="px-6 py-3 rounded-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-extrabold text-xs shadow-lg inline-flex items-center gap-2"
        >
          <Sparkles className="w-4 h-4" />
          <span>Generate New Trip</span>
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
