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
    <div className="flex items-center gap-1 bg-[#111A2E] p-1 rounded-xl border border-[#29354B]">
      {/* Move Up */}
      {!isFirst && (
        <button
          onClick={onMoveUp}
          className="p-1.5 text-[#94A3B8] hover:text-[#22D3EE] rounded-lg hover:bg-[#19243A] transition-colors focus:outline-none focus:ring-1 focus:ring-cyan-500"
          title="Move activity up in schedule"
          aria-label="Move activity up"
        >
          <ArrowUp className="w-3.5 h-3.5" />
        </button>
      )}

      {/* Move Down */}
      {!isLast && (
        <button
          onClick={onMoveDown}
          className="p-1.5 text-[#94A3B8] hover:text-[#22D3EE] rounded-lg hover:bg-[#19243A] transition-colors focus:outline-none focus:ring-1 focus:ring-cyan-500"
          title="Move activity down in schedule"
          aria-label="Move activity down"
        >
          <ArrowDown className="w-3.5 h-3.5" />
        </button>
      )}

      {/* Edit */}
      <button
        onClick={onEdit}
        className="p-1.5 text-[#94A3B8] hover:text-amber-400 rounded-lg hover:bg-[#19243A] transition-colors focus:outline-none focus:ring-1 focus:ring-amber-500"
        title="Edit activity details"
        aria-label="Edit activity"
      >
        <Edit2 className="w-3.5 h-3.5" />
      </button>

      {/* Remove */}
      <button
        onClick={onRemove}
        className="p-1.5 text-[#94A3B8] hover:text-rose-400 rounded-lg hover:bg-[#19243A] transition-colors focus:outline-none focus:ring-1 focus:ring-rose-500"
        title="Remove activity"
        aria-label="Remove activity"
      >
        <Trash2 className="w-3.5 h-3.5" />
      </button>

      {/* Expand / Collapse */}
      <button
        onClick={onToggleExpand}
        className="p-1.5 text-[#94A3B8] hover:text-[#22D3EE] rounded-lg hover:bg-[#19243A] transition-colors ml-0.5 focus:outline-none focus:ring-1 focus:ring-cyan-500"
        title={isExpanded ? 'Collapse details' : 'Expand details'}
        aria-label={isExpanded ? 'Collapse details' : 'Expand details'}
      >
        {isExpanded ? <ChevronUp className="w-4 h-4 text-[#22D3EE]" /> : <ChevronDown className="w-4 h-4" />}
      </button>
    </div>
  );
}
