import React, { useState } from 'react';
import { Lightbulb, DollarSign, Clock, Check, X, Tag } from 'lucide-react';

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
      <div className="mt-3.5 p-4 rounded-xl bg-[#111A2E] border border-[#29354B] space-y-3 animate-fadeIn">
        <div className="text-xs font-bold text-[#22D3EE] uppercase tracking-wider">
          Edit Activity Details
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            placeholder="Stop Title"
            className="sm:col-span-2 px-3 py-1.5 rounded-lg border border-[#29354B] bg-[#080D1B] text-white text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-[#22D3EE]"
          />
          <input
            type="text"
            value={editTime}
            onChange={(e) => setEditTime(e.target.value)}
            placeholder="Time (e.g. 10:00 AM)"
            className="px-3 py-1.5 rounded-lg border border-[#29354B] bg-[#080D1B] text-white text-xs focus:outline-none focus:ring-1 focus:ring-[#22D3EE]"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          <input
            type="number"
            value={editDuration}
            onChange={(e) => setEditDuration(e.target.value)}
            placeholder="Duration (mins)"
            className="px-3 py-1.5 rounded-lg border border-[#29354B] bg-[#080D1B] text-white text-xs focus:outline-none focus:ring-1 focus:ring-[#22D3EE]"
          />
          <input
            type="text"
            value={editCost}
            onChange={(e) => setEditCost(e.target.value)}
            placeholder="Cost (e.g. $15)"
            className="px-3 py-1.5 rounded-lg border border-[#29354B] bg-[#080D1B] text-white text-xs focus:outline-none focus:ring-1 focus:ring-[#22D3EE]"
          />
          <input
            type="text"
            value={editCategory}
            onChange={(e) => setEditCategory(e.target.value)}
            placeholder="Category (e.g. Culture)"
            className="px-3 py-1.5 rounded-lg border border-[#29354B] bg-[#080D1B] text-white text-xs focus:outline-none focus:ring-1 focus:ring-[#22D3EE]"
          />
        </div>

        <textarea
          rows={2}
          value={editDesc}
          onChange={(e) => setEditDesc(e.target.value)}
          placeholder="Activity description..."
          className="w-full px-3 py-1.5 rounded-lg border border-[#29354B] bg-[#080D1B] text-white text-xs resize-none focus:outline-none focus:ring-1 focus:ring-[#22D3EE]"
        />

        <div className="flex items-center justify-end gap-2 pt-1">
          <button
            onClick={onCancelEdit}
            className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#19243A] text-[#94A3B8] hover:text-white flex items-center gap-1 border border-[#29354B]"
          >
            <X className="w-3.5 h-3.5" /> Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-3.5 py-1.5 rounded-lg text-xs font-bold bg-[#22D3EE] hover:bg-cyan-300 text-[#080D1B] flex items-center gap-1 shadow-sm"
          >
            <Check className="w-3.5 h-3.5" /> Save Changes
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-3.5 pt-3.5 border-t border-[#29354B] text-xs space-y-2.5 animate-fadeIn">
      <p className="text-slate-300 leading-relaxed font-normal">
        {stop.description}
      </p>

      <div className="flex flex-wrap items-center gap-3 pt-1 text-[11px] font-medium text-[#94A3B8]">
        <span className="flex items-center gap-1">
          <Clock className="w-3.5 h-3.5 text-[#22D3EE]" />
          Duration: {stop.durationMinutes} mins
        </span>
        {stop.estimatedCost && (
          <span className="flex items-center gap-0.5 text-emerald-400 font-semibold">
            <DollarSign className="w-3.5 h-3.5" />
            Cost: {stop.estimatedCost}
          </span>
        )}
      </div>

      {stop.tips && stop.tips.length > 0 && (
        <div className="mt-2 p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-[11px] text-amber-200">
          <div className="font-bold flex items-center gap-1 mb-1 text-amber-400">
            <Lightbulb className="w-3.5 h-3.5" /> Insider Tips:
          </div>
          <ul className="list-disc list-inside space-y-0.5 pl-1 text-amber-200/90">
            {stop.tips.map((tip, idx) => (
              <li key={idx}>{tip}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
