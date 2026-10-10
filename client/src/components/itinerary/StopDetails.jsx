import React, { useState } from 'react';
import { Lightbulb, DollarSign, Clock, Check, X } from 'lucide-react';

export function StopDetails({ stop, isEditing, onSaveEdit, onCancelEdit }) {
  const [editTitle, setEditTitle] = useState(stop.title);
  const [editTime, setEditTime] = useState(stop.time);
  const [editDuration, setEditDuration] = useState(stop.durationMinutes);
  const [editCost, setEditCost] = useState(stop.estimatedCost);
  const [editCategory, setEditCategory] = useState(stop.category);
  const [editDesc, setEditDesc] = useState(stop.description);

  const handleSave = () => {
    onSaveEdit({
      ...stop,
      title: editTitle.trim() || stop.title,
      time: editTime.trim() || stop.time,
      durationMinutes: Number(editDuration) || stop.durationMinutes,
      estimatedCost: editCost.trim() || stop.estimatedCost,
      category: editCategory.trim() || stop.category,
      description: editDesc.trim() || stop.description,
    });
  };

  if (isEditing) {
    return (
      <div className="mt-3 p-3.5 rounded-xl bg-blue-50/60 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 space-y-3 animate-fadeIn">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            placeholder="Stop Title"
            className="sm:col-span-2 px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-semibold"
          />
          <input
            type="text"
            value={editTime}
            onChange={(e) => setEditTime(e.target.value)}
            placeholder="Time (e.g. 10:00 AM)"
            className="px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          <input
            type="number"
            value={editDuration}
            onChange={(e) => setEditDuration(e.target.value)}
            placeholder="Duration (mins)"
            className="px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs"
          />
          <input
            type="text"
            value={editCost}
            onChange={(e) => setEditCost(e.target.value)}
            placeholder="Cost (e.g. $15)"
            className="px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs"
          />
          <input
            type="text"
            value={editCategory}
            onChange={(e) => setEditCategory(e.target.value)}
            placeholder="Category (e.g. Culture)"
            className="px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs"
          />
        </div>

        <textarea
          rows={2}
          value={editDesc}
          onChange={(e) => setEditDesc(e.target.value)}
          placeholder="Stop description..."
          className="w-full px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs resize-none"
        />

        <div className="flex items-center justify-end gap-2 pt-1">
          <button
            onClick={onCancelEdit}
            className="px-3 py-1 rounded-lg text-xs font-semibold bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 flex items-center gap-1"
          >
            <X className="w-3.5 h-3.5" /> Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-3 py-1 rounded-lg text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-1 shadow-sm"
          >
            <Check className="w-3.5 h-3.5" /> Save Changes
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-3 pt-3 border-t border-slate-200/80 dark:border-slate-800/80 text-xs space-y-2 animate-fadeIn">
      <p className="text-slate-700 dark:text-slate-300 leading-relaxed font-normal">
        {stop.description}
      </p>

      <div className="flex flex-wrap items-center gap-3 pt-1 text-[11px] font-medium text-slate-500 dark:text-slate-400">
        <span className="flex items-center gap-1">
          <Clock className="w-3 h-3 text-blue-500" />
          Duration: {stop.durationMinutes} mins
        </span>
        {stop.estimatedCost && (
          <span className="flex items-center gap-0.5 text-emerald-600 dark:text-emerald-400 font-semibold">
            <DollarSign className="w-3 h-3" />
            Cost: {stop.estimatedCost}
          </span>
        )}
      </div>

      {stop.tips && stop.tips.length > 0 && (
        <div className="mt-2 p-2.5 rounded-xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200/60 dark:border-amber-900/40 text-[11px] text-amber-950 dark:text-amber-200">
          <div className="font-bold flex items-center gap-1 mb-1 text-amber-700 dark:text-amber-400">
            <Lightbulb className="w-3.5 h-3.5" /> Visitor Tips:
          </div>
          <ul className="list-disc list-inside space-y-0.5 pl-1">
            {stop.tips.map((tip, idx) => (
              <li key={idx}>{tip}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
