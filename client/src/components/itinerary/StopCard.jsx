import React, { useState } from 'react';
import { StopActions } from './StopActions';
import { StopDetails } from './StopDetails';
import { Clock, MapPin, Compass, Utensils, Camera, Landmark, Coffee, DollarSign } from 'lucide-react';

const CATEGORY_MAP = {
  Food: { icon: Utensils, bg: 'bg-amber-500/10 text-amber-400 border border-amber-500/20' },
  Sightseeing: { icon: Camera, bg: 'bg-cyan-500/10 text-[#22D3EE] border border-cyan-500/20' },
  Culture: { icon: Landmark, bg: 'bg-purple-500/10 text-purple-400 border border-purple-500/20' },
  Adventure: { icon: Compass, bg: 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' },
  Relaxation: { icon: Coffee, bg: 'bg-teal-500/10 text-teal-400 border border-teal-500/20' },
};

export function StopCard({
  stop,
  isExpanded,
  onToggleExpand,
  onMoveUp,
  onMoveDown,
  isFirst,
  isLast,
  onRemove,
  onEdit,
}) {
  const [isEditing, setIsEditing] = useState(false);

  const categoryConfig = CATEGORY_MAP[stop.category] || CATEGORY_MAP.Sightseeing;
  const CategoryIcon = categoryConfig.icon;

  const handleSaveEdit = (updatedStop) => {
    onEdit(updatedStop);
    setIsEditing(false);
  };

  const handleConfirmRemove = () => {
    if (window.confirm(`Are you sure you want to remove "${stop.title}"?`)) {
      onRemove();
    }
  };

  return (
    <div className="relative z-10 group rounded-2xl border border-[#29354B] bg-[#080D1B] p-4.5 sm:p-5 shadow-sm hover:border-[#22D3EE]/40 transition-all duration-200">
      <div className="flex items-start justify-between gap-3 sm:gap-4">
        {/* Category Icon & Main Info */}
        <div className="flex items-start gap-3 sm:gap-3.5 min-w-0 flex-1">
          <div className={`p-2.5 rounded-xl ${categoryConfig.bg} flex-shrink-0 mt-0.5 shadow-sm`}>
            <CategoryIcon className="w-4 h-4" />
          </div>

          <div className="min-w-0 flex-1 space-y-1">
            {/* Meta Row: Time, Category, Duration */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1 text-[11px] font-bold text-slate-200 bg-[#19243A] px-2 py-0.5 rounded-md border border-[#29354B]">
                <Clock className="w-3 h-3 text-[#22D3EE]" />
                {stop.time}
              </span>
              <span className={`text-[10px] font-extrabold uppercase tracking-wide px-2 py-0.5 rounded-md ${categoryConfig.bg}`}>
                {stop.category || 'Sightseeing'}
              </span>
              {stop.durationMinutes && (
                <span className="text-[11px] text-[#94A3B8] font-medium hidden sm:inline">
                  • {stop.durationMinutes} mins
                </span>
              )}
              {stop.estimatedCost && stop.estimatedCost !== '$0' && (
                <span className="text-[11px] text-emerald-400 font-semibold hidden md:inline">
                  • {stop.estimatedCost}
                </span>
              )}
            </div>

            {/* Title with hover */}
            <h4
              onClick={onToggleExpand}
              className="font-bold text-sm sm:text-base text-[#F8FAFC] cursor-pointer hover:text-[#22D3EE] transition-colors leading-snug"
            >
              {stop.title}
            </h4>
          </div>
        </div>

        {/* Action Toolbar */}
        {!isEditing && (
          <StopActions
            isExpanded={isExpanded}
            onToggleExpand={onToggleExpand}
            onMoveUp={onMoveUp}
            onMoveDown={onMoveDown}
            isFirst={isFirst}
            isLast={isLast}
            onEdit={() => {
              setIsEditing(true);
              if (!isExpanded) onToggleExpand();
            }}
            onRemove={handleConfirmRemove}
          />
        )}
      </div>

      {/* Expanded details or Inline Editing */}
      {(isExpanded || isEditing) && (
        <StopDetails
          stop={stop}
          isEditing={isEditing}
          onSaveEdit={handleSaveEdit}
          onCancelEdit={() => setIsEditing(false)}
        />
      )}
    </div>
  );
}
