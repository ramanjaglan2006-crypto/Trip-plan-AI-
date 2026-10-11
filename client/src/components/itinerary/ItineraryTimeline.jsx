import React, { useState } from 'react';
import { DayCard } from './DayCard';
import { Layers, Calendar } from 'lucide-react';

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
  const totalStops = days.reduce((sum, d) => sum + (d.stops?.length || 0), 0);

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Daily Navigation Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#29354B] pb-3 print:hidden">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-cyan-500/10 text-[#22D3EE] border border-cyan-500/20">
            <Layers className="w-4 h-4" />
          </div>
          <div>
            <span className="font-extrabold text-sm text-[#F8FAFC]">
              Day-by-Day Timeline
            </span>
            <span className="text-[11px] text-[#94A3B8] ml-2 font-medium">
              ({days.length} Days • {totalStops} Activities)
            </span>
          </div>
        </div>

        {/* Day Filter Chips with Activity Counts */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 max-w-full no-scrollbar">
          <button
            onClick={() => setSelectedDayNumber('all')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap border ${
              selectedDayNumber === 'all'
                ? 'bg-[#22D3EE] text-[#080D1B] border-[#22D3EE] shadow-md shadow-cyan-500/20'
                : 'bg-[#111A2E] text-[#94A3B8] border-[#29354B] hover:text-white hover:bg-[#19243A]'
            }`}
          >
            <span>All Days</span>
            <span className={`text-[10px] px-1.5 py-0.2 rounded-md ${
              selectedDayNumber === 'all' ? 'bg-[#080D1B]/20 text-[#080D1B]' : 'bg-[#19243A] text-slate-300'
            }`}>
              {days.length}
            </span>
          </button>

          {days.map((d) => {
            const stopCount = d.stops?.length || 0;
            const isSelected = selectedDayNumber === d.day;
            return (
              <button
                key={d.day}
                onClick={() => setSelectedDayNumber(d.day)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap border ${
                  isSelected
                    ? 'bg-[#22D3EE] text-[#080D1B] border-[#22D3EE] shadow-md shadow-cyan-500/20'
                    : 'bg-[#111A2E] text-[#94A3B8] border-[#29354B] hover:text-white hover:bg-[#19243A]'
                }`}
              >
                <span>Day {d.day}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-md ${
                  isSelected ? 'bg-[#080D1B]/20 text-[#080D1B]' : 'bg-[#19243A] text-slate-300'
                }`}>
                  {stopCount}
                </span>
              </button>
            );
          })}
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
