import React from 'react';
import { ArrowUp, ArrowDown, Edit2, Trash2, ChevronDown, ChevronUp } from 'lucide-react';

export function StopActions({
  isExpanded,
  onToggleExpand,
  onMoveUp,
  onMoveDown,
  isFirst,
  isLast,
  onEdit,
  onRemove,
}) {
  return (
    <div className="flex items-center gap-1">
      {/* Move Up */}
      {!isFirst && (
        <button
          onClick={onMoveUp}
          className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          title="Move stop up"
        >
          <ArrowUp className="w-3.5 h-3.5" />
        </button>
      )}

      {/* Move Down */}
      {!isLast && (
        <button
          onClick={onMoveDown}
          className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          title="Move stop down"
        >
          <ArrowDown className="w-3.5 h-3.5" />
        </button>
      )}

      {/* Edit */}
      <button
        onClick={onEdit}
        className="p-1.5 text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        title="Edit stop details"
      >
        <Edit2 className="w-3.5 h-3.5" />
      </button>

      {/* Remove */}
      <button
        onClick={onRemove}
        className="p-1.5 text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        title="Remove stop"
      >
        <Trash2 className="w-3.5 h-3.5" />
      </button>

      {/* Expand / Collapse */}
      <button
        onClick={onToggleExpand}
        className="p-1.5 text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors ml-1"
        title={isExpanded ? 'Collapse details' : 'Expand details'}
      >
        {isExpanded ? <ChevronUp className="w-4 h-4 text-blue-500" /> : <ChevronDown className="w-4 h-4" />}
      </button>
    </div>
  );
}
