import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTripContext } from '../context/TripContext';
import { useItineraryMap } from '../hooks/useItineraryMap';
import { TripHeader } from '../components/trip/TripHeader';
import { ItineraryTimeline } from '../components/itinerary/ItineraryTimeline';
import { ItineraryMap } from '../components/itinerary/ItineraryMap';
import { RouteSummary } from '../components/itinerary/RouteSummary';
import { Compass, Sparkles, Map, Columns, Calendar, List, Loader2 } from 'lucide-react';

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

  // View state: 'split' (desktop default), 'timeline', or 'map'
  const [viewMode, setViewMode] = useState('split');
  const [selectedDayNumber, setSelectedDayNumber] = useState('all');

  const {
    mappedStops,
    routesByDay,
    dailySummaries,
    totalDistanceKm,
    totalDurationSec,
    travelMode,
    setTravelMode,
    isLoadingGeo,
    isLoadingRoutes,
    selectedStopId,
    setSelectedStopId,
  } = useItineraryMap(itinerary, selectedDayNumber);

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

  const days = itinerary.days || [];

  return (
    <div className="space-y-6 py-4 animate-fadeIn text-white">
      {/* 1. Trip Header Banner */}
      <TripHeader itinerary={itinerary} onReset={resetItinerary} />

      {/* 2. View Mode Selector Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#111A2E] p-3 rounded-2xl border border-[#29354B] shadow-md">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-[#94A3B8] uppercase tracking-wider pl-2">
            View Layout:
          </span>

          <div className="flex items-center gap-1 bg-[#080D1B] p-1 rounded-xl border border-[#29354B]">
            {/* Timeline View Button */}
            <button
              onClick={() => setViewMode('timeline')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                viewMode === 'timeline'
                  ? 'bg-[#22D3EE] text-[#080D1B] shadow-sm'
                  : 'text-[#94A3B8] hover:text-white hover:bg-[#19243A]'
              }`}
            >
              <List className="w-3.5 h-3.5" />
              <span>Timeline</span>
            </button>

            {/* Split View Button (Desktop only) */}
            <button
              onClick={() => setViewMode('split')}
              className={`hidden lg:flex px-3 py-1.5 rounded-lg text-xs font-bold transition-all items-center gap-1.5 ${
                viewMode === 'split'
                  ? 'bg-[#22D3EE] text-[#080D1B] shadow-sm'
                  : 'text-[#94A3B8] hover:text-white hover:bg-[#19243A]'
              }`}
            >
              <Columns className="w-3.5 h-3.5" />
              <span>Split View</span>
            </button>

            {/* Map View Button */}
            <button
              onClick={() => setViewMode('map')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                viewMode === 'map'
                  ? 'bg-[#22D3EE] text-[#080D1B] shadow-sm'
                  : 'text-[#94A3B8] hover:text-white hover:bg-[#19243A]'
              }`}
            >
              <Map className="w-3.5 h-3.5" />
              <span>Map & Routes</span>
            </button>
          </div>
        </div>

        {/* Loading Indicators */}
        {(isLoadingGeo || isLoadingRoutes) && (
          <div className="flex items-center gap-2 text-xs font-semibold text-[#22D3EE] pr-2">
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
            <span>{isLoadingGeo ? 'Resolving geocoding...' : 'Calculating road routes...'}</span>
          </div>
        )}
      </div>

      {/* 3. Main Views Content */}

      {/* A. SPLIT VIEW (Desktop: Timeline on Left, Map & Route Summary on Right) */}
      <div className={`${viewMode === 'split' ? 'grid grid-cols-1 lg:grid-cols-12 gap-8' : 'hidden'}`}>
        {/* Left Column: Itinerary Timeline */}
        <div className="lg:col-span-6 xl:col-span-6 space-y-6">
          <ItineraryTimeline
            itinerary={itinerary}
            expandedStopIds={expandedStopIds}
            onToggleExpand={toggleExpandStop}
            onRemoveStop={removeStop}
            onMoveStop={moveStop}
            onEditStop={editStop}
            onAddStop={addStop}
            selectedDayNumber={selectedDayNumber}
            onSelectDay={setSelectedDayNumber}
            selectedStopId={selectedStopId}
            onSelectStop={setSelectedStopId}
          />
        </div>

        {/* Right Column: Sticky Interactive Map & Route Summary */}
        <div className="lg:col-span-6 xl:col-span-6 space-y-6">
          <div className="sticky top-24 space-y-6">
            <ItineraryMap
              mappedStops={mappedStops}
              routesByDay={routesByDay}
              selectedStopId={selectedStopId}
              onSelectStop={setSelectedStopId}
              selectedDayNumber={selectedDayNumber}
              travelMode={travelMode}
            />

            <RouteSummary
              dailySummaries={dailySummaries}
              totalDistanceKm={totalDistanceKm}
              totalDurationSec={totalDurationSec}
              travelMode={travelMode}
              onChangeTravelMode={setTravelMode}
              selectedStopId={selectedStopId}
              onSelectStop={setSelectedStopId}
              days={selectedDayNumber === 'all' ? days : days.filter((d) => d.day === selectedDayNumber)}
            />
          </div>
        </div>
      </div>

      {/* B. TIMELINE ONLY VIEW */}
      {viewMode === 'timeline' && (
        <div className="max-w-4xl mx-auto space-y-6">
          <ItineraryTimeline
            itinerary={itinerary}
            expandedStopIds={expandedStopIds}
            onToggleExpand={toggleExpandStop}
            onRemoveStop={removeStop}
            onMoveStop={moveStop}
            onEditStop={editStop}
            onAddStop={addStop}
            selectedDayNumber={selectedDayNumber}
            onSelectDay={setSelectedDayNumber}
            selectedStopId={selectedStopId}
            onSelectStop={setSelectedStopId}
          />
        </div>
      )}

      {/* C. MAP ONLY VIEW */}
      {viewMode === 'map' && (
        <div className="space-y-6">
          {/* Day selection tabs for Map view */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2">
            <button
              onClick={() => setSelectedDayNumber('all')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                selectedDayNumber === 'all'
                  ? 'bg-[#22D3EE] text-[#080D1B] border-[#22D3EE]'
                  : 'bg-[#111A2E] text-[#94A3B8] border-[#29354B] hover:bg-[#19243A]'
              }`}
            >
              All Days ({days.length})
            </button>
            {days.map((d) => (
              <button
                key={d.day}
                onClick={() => setSelectedDayNumber(d.day)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                  selectedDayNumber === d.day
                    ? 'bg-[#22D3EE] text-[#080D1B] border-[#22D3EE]'
                    : 'bg-[#111A2E] text-[#94A3B8] border-[#29354B] hover:bg-[#19243A]'
                }`}
              >
                Day {d.day} ({d.stops?.length || 0})
              </button>
            ))}
          </div>

          <ItineraryMap
            mappedStops={mappedStops}
            routesByDay={routesByDay}
            selectedStopId={selectedStopId}
            onSelectStop={setSelectedStopId}
            selectedDayNumber={selectedDayNumber}
            travelMode={travelMode}
          />

          <RouteSummary
            dailySummaries={dailySummaries}
            totalDistanceKm={totalDistanceKm}
            totalDurationSec={totalDurationSec}
            travelMode={travelMode}
            onChangeTravelMode={setTravelMode}
            selectedStopId={selectedStopId}
            onSelectStop={setSelectedStopId}
            days={selectedDayNumber === 'all' ? days : days.filter((d) => d.day === selectedDayNumber)}
          />
        </div>
      )}
    </div>
  );
}
