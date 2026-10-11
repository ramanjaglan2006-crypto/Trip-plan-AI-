import React, { useState } from 'react';
import { StopCard } from './StopCard';
import { Plus, MapPin, Calendar, X, Sparkles } from 'lucide-react';

export function DayCard({
  day,
  expandedStopIds,
  onToggleExpand,
  onRemoveStop,
  onMoveStop,
  onEditStop,
  onAddStop,
  selectedStopId,
  onSelectStop,
}) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newTime, setNewTime] = useState('10:00 AM');
  const [newDuration, setNewDuration] = useState(90);
  const [newCategory, setNewCategory] = useState('Sightseeing');
  const [newCost, setNewCost] = useState('$15');
  const [newDesc, setNewDesc] = useState('');

  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newStop = {
      id: `day${day.day}-stop-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      time: newTime.trim() || '12:00 PM',
      title: newTitle.trim(),
      description: newDesc.trim() || 'Custom added travel stop.',
      durationMinutes: Number(newDuration) || 90,
      category: newCategory,
      estimatedCost: newCost.trim() || '$0',
      tips: [],
    };

    onAddStop(day.day, newStop);
    setNewTitle('');
    setNewDesc('');
    setShowAddForm(false);
  };

  return (
    <div className="bg-[#111A2E] rounded-3xl p-6 sm:p-8 border border-[#29354B] shadow-xl mb-6">
      {/* Day Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6 border-b border-[#29354B] pb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-[#19243A] border border-[#29354B] flex flex-col items-center justify-center text-[#22D3EE] font-extrabold shadow-md">
            <span className="text-[10px] uppercase tracking-wider text-[#94A3B8]">Day</span>
            <span className="text-lg leading-none">{day.day}</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-extrabold text-xl text-[#F8FAFC]">
                {day.title}
              </h3>
              {day.location && (
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-rose-400 bg-rose-950/40 px-2 py-0.5 rounded-md border border-rose-800">
                  <MapPin className="w-3 h-3" />
                  {day.location}
                </span>
              )}
            </div>
            <p className="text-xs text-[#94A3B8] mt-0.5">
              {day.summary}
            </p>
          </div>
        </div>

        {/* Add Stop Trigger */}
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#19243A] hover:bg-[#202e4a] text-[#22D3EE] font-semibold text-xs border border-[#29354B] transition-all shadow-sm"
        >
          <Plus className="w-4 h-4" />
          <span>Add Stop</span>
        </button>
      </div>

      {/* Add Custom Stop Form */}
      {showAddForm && (
        <form
          onSubmit={handleAddSubmit}
          className="mb-6 p-5 rounded-2xl bg-[#080D1B] border border-[#29354B] space-y-3 animate-fadeIn"
        >
          <div className="flex items-center justify-between mb-1">
            <h4 className="font-bold text-xs text-[#22D3EE] uppercase tracking-wider flex items-center gap-1.5">
              <Plus className="w-3.5 h-3.5" />
              Add Activity to Day {day.day}
            </h4>
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              className="text-[#94A3B8] hover:text-white p-1 rounded-lg"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            <input
              type="text"
              required
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="Stop Title (e.g. Afternoon Tea at Cafe)"
              className="sm:col-span-2 px-3.5 py-2 rounded-xl border border-[#29354B] bg-[#111A2E] text-white text-xs focus:outline-none focus:ring-2 focus:ring-[#22D3EE]"
            />
            <input
              type="text"
              value={newTime}
              onChange={(e) => setNewTime(e.target.value)}
              placeholder="Time (e.g. 03:00 PM)"
              className="px-3.5 py-2 rounded-xl border border-[#29354B] bg-[#111A2E] text-white text-xs focus:outline-none focus:ring-2 focus:ring-[#22D3EE]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            <input
              type="number"
              value={newDuration}
              onChange={(e) => setNewDuration(e.target.value)}
              placeholder="Duration (mins)"
              className="px-3.5 py-2 rounded-xl border border-[#29354B] bg-[#111A2E] text-white text-xs focus:outline-none focus:ring-2 focus:ring-[#22D3EE]"
            />
            <input
              type="text"
              value={newCost}
              onChange={(e) => setNewCost(e.target.value)}
              placeholder="Cost (e.g. $15)"
              className="px-3.5 py-2 rounded-xl border border-[#29354B] bg-[#111A2E] text-white text-xs focus:outline-none focus:ring-2 focus:ring-[#22D3EE]"
            />
            <select
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              className="px-3.5 py-2 rounded-xl border border-[#29354B] bg-[#111A2E] text-white text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#22D3EE]"
            >
              <option value="Sightseeing">Sightseeing</option>
              <option value="Food">Food & Dining</option>
              <option value="Culture">Culture & History</option>
              <option value="Adventure">Adventure</option>
              <option value="Relaxation">Relaxation</option>
            </select>
          </div>

          <input
            type="text"
            value={newDesc}
            onChange={(e) => setNewDesc(e.target.value)}
            placeholder="Brief description or tips..."
            className="w-full px-3.5 py-2 rounded-xl border border-[#29354B] bg-[#111A2E] text-white text-xs focus:outline-none focus:ring-2 focus:ring-[#22D3EE]"
          />

          <div className="flex justify-end gap-2 pt-1">
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              className="px-3.5 py-1.5 rounded-xl text-xs font-semibold text-[#94A3B8] hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 bg-[#22D3EE] hover:bg-cyan-300 text-[#080D1B] font-extrabold rounded-xl text-xs shadow-md transition-all"
            >
              Save Activity
            </button>
          </div>
        </form>
      )}

      {/* Stop List or Empty Day Notice */}
      {day.stops.length === 0 ? (
        <div className="text-center py-8 px-4 rounded-2xl border border-dashed border-[#29354B] bg-[#080D1B]/40">
          <Calendar className="w-8 h-8 text-[#94A3B8] mx-auto mb-2" />
          <p className="text-sm font-semibold text-slate-300">
            No activities planned for this day yet.
          </p>
          <button
            onClick={() => setShowAddForm(true)}
            className="mt-2 text-xs font-bold text-[#22D3EE] hover:underline"
          >
            + Add an activity manually
          </button>
        </div>
      ) : (
        <div className="relative space-y-3">
          {/* Subtle Vertical Timeline Connector Line */}
          <div className="absolute left-[28px] top-6 bottom-6 w-[2px] bg-[#29354B] pointer-events-none hidden sm:block" />

          {day.stops.map((stop, idx) => (
            <StopCard
              key={stop.id}
              stop={stop}
              isExpanded={expandedStopIds.has(stop.id)}
              onToggleExpand={() => onToggleExpand(stop.id)}
              onMoveUp={() => onMoveStop(day.day, idx, 'up')}
              onMoveDown={() => onMoveStop(day.day, idx, 'down')}
              isFirst={idx === 0}
              isLast={idx === day.stops.length - 1}
              onRemove={() => onRemoveStop(day.day, stop.id)}
              onEdit={(updated) => onEditStop(day.day, updated)}
              isSelected={selectedStopId === stop.id}
              onSelect={onSelectStop}
            />
          ))}
        </div>
      )}
    </div>
  );
}
