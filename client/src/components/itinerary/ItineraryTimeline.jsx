import React, { useState } from 'react';
import { DayCard } from './DayCard';
import { Layers } from 'lucide-react';

export function ItineraryTimeline({
  itinerary,
  expandedStopIds,
  onToggleExpand,
  onRemoveStop,
  onMoveStop,
  onEditStop,
  onAddStop,
}) {
  const [selectedDayNumber, setSelectedDayNumber] = useState('all');

  const days = itinerary.days || [];

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Day Filter Toolbar */}
      <div className="flex items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-3 print:hidden">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-blue-100 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400">
            <Layers className="w-4 h-4" />
          </div>
          <span className="font-extrabold text-sm text-slate-900 dark:text-white">
            Daily Timeline
          </span>
        </div>

        {/* Day Filter Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
          <button
            onClick={() => setSelectedDayNumber('all')}
            className={`px-3 py-1 rounded-xl text-xs font-semibold transition-all border ${
              selectedDayNumber === 'all'
                ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 border-transparent'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700 hover:bg-slate-200'
            }`}
          >
            All Days ({days.length})
          </button>
          {days.map((d) => (
            <button
              key={d.day}
              onClick={() => setSelectedDayNumber(d.day)}
              className={`px-3 py-1 rounded-xl text-xs font-semibold transition-all border ${
                selectedDayNumber === d.day
                  ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700 hover:bg-slate-200'
              }`}
            >
              Day {d.day}
            </button>
          ))}
        </div>
      </div>

      {/* Renders Day Cards */}
      <div className="space-y-6">
        {days
          .filter((d) => selectedDayNumber === 'all' || d.day === selectedDayNumber)
          .map((day) => (
            <DayCard
              key={day.day}
              day={day}
              expandedStopIds={expandedStopIds}
              onToggleExpand={onToggleExpand}
              onRemoveStop={onRemoveStop}
              onMoveStop={onMoveStop}
              onEditStop={onEditStop}
              onAddStop={onAddStop}
            />
          ))}
      </div>
    </div>
  );
}
