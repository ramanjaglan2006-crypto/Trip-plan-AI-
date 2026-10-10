import React from 'react';
import { Zap } from 'lucide-react';

const EXAMPLES = [
  {
    label: '🎌 5 Days in Japan',
    prompt: 'Plan a relaxed 5-day trip to Japan for two people. We want Tokyo and Kyoto, moderate budget, interested in food, culture and photography.',
  },
  {
    label: '🥐 3 Days in Paris',
    prompt: 'Plan a 3-day romantic and cultural trip to Paris covering museums, famous bakeries, Eiffel Tower, and Montmartre walks.',
  },
  {
    label: '🍕 4 Days in Rome',
    prompt: 'Plan a 4-day trip to Rome exploring Colosseum, pasta making class, Vatican treasures, and hidden local gelato shops.',
  },
  {
    label: '🏖️ 3 Days in Goa',
    prompt: 'Plan a 3-day trip to Goa for two friends with beaches, nightlife, Portuguese heritage walks, and local Goan seafood.',
  },
  {
    label: '🏰 7 Days in Rajasthan',
    prompt: 'Plan a 7-day budget trip to Rajasthan covering Jaipur, Jodhpur and Udaipur with royal palaces and desert forts.',
  },
];

export function ExamplePrompts({ onSelect, disabled }) {
  return (
    <div className="pt-1">
      <p className="text-[11px] font-semibold text-slate-400 dark:text-slate-500 mb-2 uppercase tracking-wider flex items-center gap-1">
        <Zap className="w-3 h-3 text-amber-500" /> Try Example Prompts
      </p>
      <div className="flex flex-wrap gap-2">
        {EXAMPLES.map((ex, idx) => (
          <button
            key={idx}
            type="button"
            disabled={disabled}
            onClick={() => onSelect(ex.prompt)}
            className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800/80 hover:bg-blue-50 dark:hover:bg-blue-900/30 text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-300 text-xs font-medium border border-slate-200/80 dark:border-slate-700/80 transition-all text-left disabled:opacity-50"
          >
            {ex.label}
          </button>
        ))}
      </div>
    </div>
  );
}
