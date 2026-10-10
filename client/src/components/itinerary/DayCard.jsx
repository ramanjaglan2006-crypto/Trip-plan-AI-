import React, { useState } from 'react';
import { StopCard } from './StopCard';
import { Plus, MapPin, Calendar, X } from 'lucide-react';

export function DayCard({
  day,
  expandedStopIds,
  onToggleExpand,
  onRemoveStop,
  onMoveStop,
  onEditStop,
  onAddStop,
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
    <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800/80 shadow-lg mb-6">
      {/* Day Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6 border-b border-slate-200/80 dark:border-slate-800/80 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 flex flex-col items-center justify-center text-white font-extrabold shadow-md shadow-blue-500/20">
            <span className="text-[10px] uppercase tracking-wider opacity-80">Day</span>
            <span className="text-lg leading-none">{day.day}</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-extrabold text-xl text-slate-900 dark:text-white">
                {day.title}
              </h3>
              {day.location && (
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/40 px-2 py-0.5 rounded-md border border-rose-200 dark:border-rose-800">
                  <MapPin className="w-3 h-3" />
                  {day.location}
                </span>
              )}
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              {day.summary}
            </p>
          </div>
        </div>

        {/* Add Stop Trigger */}
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-blue-50 dark:bg-blue-950/50 hover:bg-blue-100 text-blue-600 dark:text-blue-400 font-semibold text-xs border border-blue-200 dark:border-blue-800 transition-all shadow-sm"
        >
          <Plus className="w-4 h-4" />
          <span>Add Stop</span>
        </button>
      </div>

      {/* Add Custom Stop Form */}
      {showAddForm && (
        <form
          onSubmit={handleAddSubmit}
          className="mb-6 p-4 rounded-2xl bg-blue-50/50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 space-y-3 animate-fadeIn"
        >
          <div className="flex items-center justify-between mb-1">
            <h4 className="font-bold text-xs text-blue-900 dark:text-blue-200 uppercase tracking-wider">
              Add Custom Stop to Day {day.day}
            </h4>
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              className="text-slate-400 hover:text-slate-600 p-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            <input
              type="text"
              required
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="Stop Title (e.g. Afternoon Tea at Local Cafe)"
              className="sm:col-span-2 px-3 py-1.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs"
            />
            <input
              type="text"
              value={newTime}
              onChange={(e) => setNewTime(e.target.value)}
              placeholder="Time (e.g. 03:00 PM)"
              className="px-3 py-1.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            <input
              type="number"
              value={newDuration}
              onChange={(e) => setNewDuration(e.target.value)}
              placeholder="Duration (mins)"
              className="px-3 py-1.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs"
            />
            <input
              type="text"
              value={newCost}
              onChange={(e) => setNewCost(e.target.value)}
              placeholder="Cost (e.g. $15)"
              className="px-3 py-1.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs"
            />
            <select
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              className="px-3 py-1.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-medium"
            >
              <option value="Sightseeing">Sightseeing</option>
              <option value="Food">Food</option>
              <option value="Culture">Culture</option>
              <option value="Adventure">Adventure</option>
              <option value="Relaxation">Relaxation</option>
            </select>
          </div>

          <input
            type="text"
            value={newDesc}
            onChange={(e) => setNewDesc(e.target.value)}
            placeholder="Brief description..."
            className="w-full px-3 py-1.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs"
          />

          <div className="flex justify-end gap-2 pt-1">
            <button
              type="submit"
              className="px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs shadow-sm transition-all"
            >
              Save Custom Stop
            </button>
          </div>
        </form>
      )}

      {/* Stop List or Empty Day Notice */}
      {day.stops.length === 0 ? (
        <div className="text-center py-8 px-4 rounded-2xl border border-dashed border-slate-300 dark:border-slate-700">
          <Calendar className="w-8 h-8 text-slate-400 mx-auto mb-2" />
          <p className="text-sm font-semibold text-slate-600 dark:text-slate-400">
            No stops planned for this day.
          </p>
          <button
            onClick={() => setShowAddForm(true)}
            className="mt-2 text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline"
          >
            + Add a stop manually
          </button>
        </div>
      ) : (
        <div className="space-y-3">
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
            />
          ))}
        </div>
      )}
    </div>
  );
}
