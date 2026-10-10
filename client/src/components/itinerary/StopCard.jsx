import React, { useState } from 'react';
import { StopActions } from './StopActions';
import { StopDetails } from './StopDetails';
import { Clock, MapPin, Compass, Utensils, Camera, Landmark, Coffee } from 'lucide-react';

const CATEGORY_MAP = {
  Food: { icon: Utensils, bg: 'bg-orange-100 dark:bg-orange-950/40 text-orange-600 dark:text-orange-400' },
  Sightseeing: { icon: Camera, bg: 'bg-blue-100 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400' },
  Culture: { icon: Landmark, bg: 'bg-purple-100 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400' },
  Adventure: { icon: Compass, bg: 'bg-emerald-100 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400' },
  Relaxation: { icon: Coffee, bg: 'bg-teal-100 dark:bg-teal-950/40 text-teal-600 dark:text-teal-400' },
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

  return (
    <div className="group rounded-2xl border border-slate-200/90 dark:border-slate-800/90 bg-white dark:bg-slate-900 p-4 shadow-sm hover:shadow-md transition-all duration-200">
      <div className="flex items-start justify-between gap-3">
        {/* Category Icon & Main Info */}
        <div className="flex items-start gap-3 min-w-0 flex-1">
          <div className={`p-2.5 rounded-xl ${categoryConfig.bg} flex-shrink-0 mt-0.5`}>
            <CategoryIcon className="w-4 h-4" />
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <span className="inline-flex items-center gap-1 text-[11px] font-bold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-md">
                <Clock className="w-3 h-3 text-blue-500" />
                {stop.time}
              </span>
              <span className={`text-[10px] font-extrabold uppercase tracking-wide px-2 py-0.5 rounded-md ${categoryConfig.bg}`}>
                {stop.category || 'Sightseeing'}
              </span>
            </div>

            <h4
              onClick={onToggleExpand}
              className="font-bold text-sm sm:text-base text-slate-900 dark:text-white cursor-pointer hover:text-blue-600 dark:hover:text-blue-400 transition-colors truncate"
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
            onRemove={onRemove}
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
