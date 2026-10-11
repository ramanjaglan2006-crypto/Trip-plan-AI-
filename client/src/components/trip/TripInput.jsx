import React, { useState, useEffect } from 'react';
import { Sparkles, Loader2, RotateCcw, Compass, MapPin, Calendar, Users, DollarSign, Heart, FileText, Check } from 'lucide-react';
import { ExamplePrompts } from './ExamplePrompts';

const DESTINATION_SUGGESTIONS = [
  'Tokyo & Kyoto, Japan',
  'Paris & Versailles, France',
  'Rome & Florence, Italy',
  'Barcelona & Madrid, Spain',
  'Goa, India',
  'Rajasthan (Jaipur & Udaipur), India',
  'New York City, USA',
  'Reykjavik, Iceland',
];

const INTEREST_OPTIONS = [
  { id: 'Culture', label: '🏛️ Culture & History' },
  { id: 'Food', label: '🍜 Local Food & Dining' },
  { id: 'Sightseeing', label: '📸 Landmarks & Sightseeing' },
  { id: 'Adventure', label: '⛰️ Adventure & Outdoors' },
  { id: 'Relaxation', label: '☕ Relaxation & Cafes' },
  { id: 'Nature', label: '🌿 Parks & Scenery' },
];

export function TripInput({ onSubmit, isLoading, onCancel }) {
  const [destination, setDestination] = useState('Tokyo & Kyoto, Japan');
  const [duration, setDuration] = useState(5);
  const [travelers, setTravelers] = useState('2 Travelers (Couple)');
  const [budget, setBudget] = useState('Moderate');
  const [selectedInterests, setSelectedInterests] = useState(['Culture', 'Food', 'Sightseeing']);
  const [notes, setNotes] = useState('Relaxed morning starts, scenic photography spots, and authentic food.');
  const [customPromptMode, setCustomPromptMode] = useState(false);
  const [customPrompt, setCustomPrompt] = useState('');

  // Generate compiled prompt from structured fields
  const generatePromptFromFields = () => {
    const interestStr = selectedInterests.length > 0
      ? `Focused on ${selectedInterests.join(', ')}.`
      : '';
    const notesStr = notes.trim() ? `Preferences & Notes: ${notes.trim()}.` : '';
    return `Plan a relaxed ${duration}-day trip to ${destination.trim()} for ${travelers}. Budget style: ${budget}. ${interestStr} ${notesStr}`.trim();
  };

  const currentCompiledPrompt = customPromptMode ? customPrompt : generatePromptFromFields();

  const handleToggleInterest = (interestId) => {
    if (selectedInterests.includes(interestId)) {
      setSelectedInterests(selectedInterests.filter((id) => id !== interestId));
    } else {
      setSelectedInterests([...selectedInterests, interestId]);
    }
  };

  const handleSelectPreset = (presetText) => {
    setCustomPromptMode(true);
    setCustomPrompt(presetText);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const finalPrompt = customPromptMode ? customPrompt.trim() : generatePromptFromFields();
    if (!finalPrompt || isLoading) return;
    onSubmit(finalPrompt);
  };

  const handleResetForm = () => {
    setDestination('');
    setDuration(3);
    setTravelers('2 Travelers (Couple)');
    setBudget('Moderate');
    setSelectedInterests(['Culture', 'Food']);
    setNotes('');
    setCustomPrompt('');
    setCustomPromptMode(false);
  };

  return (
    <div className="bg-[#111A2E] rounded-3xl p-6 sm:p-8 border border-[#29354B] shadow-2xl transition-all space-y-6">
      {/* Header & Mode Switch */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#29354B] pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-cyan-500/10 text-[#22D3EE] border border-cyan-500/20">
            <Compass className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-extrabold text-lg sm:text-xl text-[#F8FAFC]">
              Trip Planner Preferences
            </h2>
            <p className="text-xs text-[#94A3B8]">
              Configure your journey parameters or switch to free-form prompt
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setCustomPromptMode(!customPromptMode)}
            className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-[#19243A] text-slate-300 hover:text-white border border-[#29354B] transition-all"
          >
            {customPromptMode ? 'Use Guided Form' : 'Free-form Text Mode'}
          </button>

          <button
            type="button"
            onClick={handleResetForm}
            className="text-xs text-[#94A3B8] hover:text-white flex items-center gap-1 transition-all"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Reset
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {customPromptMode ? (
          /* Free-form Natural Language Input */
          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
              Free-Form Travel Description
            </label>
            <textarea
              rows={5}
              value={customPrompt}
              onChange={(e) => setCustomPrompt(e.target.value)}
              placeholder="e.g. Plan a 4-day trip to Rome for two food lovers with pasta classes, historical monuments, and quiet neighborhood evening walks..."
              className="w-full px-4 py-3.5 rounded-2xl border border-[#29354B] bg-[#080D1B] text-[#F8FAFC] text-sm focus:outline-none focus:ring-2 focus:ring-[#22D3EE] shadow-inner placeholder:text-slate-500 transition-all resize-none"
              disabled={isLoading}
            />
          </div>
        ) : (
          /* Structured Groups */
          <div className="space-y-6">
            {/* Group A: Destination */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#22D3EE]" />
                Destination / Regions
              </label>
              <input
                type="text"
                required
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                placeholder="Where do you want to travel? (e.g. Tokyo & Kyoto, Japan)"
                className="w-full px-4 py-3 rounded-xl border border-[#29354B] bg-[#080D1B] text-[#F8FAFC] text-sm focus:outline-none focus:ring-2 focus:ring-[#22D3EE] transition-all"
                disabled={isLoading}
              />
              {/* Quick suggestions */}
              <div className="flex flex-wrap items-center gap-1.5 pt-1">
                <span className="text-[11px] text-[#94A3B8] mr-1">Popular:</span>
                {DESTINATION_SUGGESTIONS.slice(0, 5).map((dest) => (
                  <button
                    key={dest}
                    type="button"
                    onClick={() => setDestination(dest)}
                    className="text-[11px] px-2.5 py-0.5 rounded-lg bg-[#19243A] text-slate-300 hover:text-white hover:bg-[#202e4a] border border-[#29354B] transition-all"
                  >
                    {dest}
                  </button>
                ))}
              </div>
            </div>

            {/* Group B & C: Duration & Travelers */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-amber-400" />
                  Trip Duration (Days)
                </label>
                <div className="flex items-center gap-2">
                  {[3, 5, 7, 10, 14].map((d) => (
                    <button
                      key={d}
                      type="button"
                      onClick={() => setDuration(d)}
                      className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all border ${
                        duration === d
                          ? 'bg-[#22D3EE] text-[#080D1B] border-[#22D3EE]'
                          : 'bg-[#080D1B] text-slate-300 border-[#29354B] hover:bg-[#19243A]'
                      }`}
                    >
                      {d} Days
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-emerald-400" />
                  Travelers
                </label>
                <select
                  value={travelers}
                  onChange={(e) => setTravelers(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#29354B] bg-[#080D1B] text-[#F8FAFC] text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#22D3EE]"
                  disabled={isLoading}
                >
                  <option value="1 Solo Traveler">Solo Traveler (1)</option>
                  <option value="2 Travelers (Couple)">Couple / Duo (2)</option>
                  <option value="Family with Kids (3-4)">Family (3-4)</option>
                  <option value="Group of Friends (4+)">Friends Group (4+)</option>
                </select>
              </div>
            </div>

            {/* Group D & E: Budget & Interests */}
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                  <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
                  Budget Tier
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { id: 'Budget-Friendly', label: 'Budget-Friendly', desc: 'Hostels, transit, street food' },
                    { id: 'Moderate', label: 'Moderate / Balanced', desc: 'Comfortable hotels, tours, cafes' },
                    { id: 'Luxury', label: 'Luxury Experience', desc: '5-star dining, private transfers' },
                  ].map((b) => (
                    <button
                      key={b.id}
                      type="button"
                      onClick={() => setBudget(b.id)}
                      className={`p-3 rounded-xl text-left border transition-all ${
                        budget === b.id
                          ? 'bg-[#19243A] border-[#22D3EE] text-white shadow-sm'
                          : 'bg-[#080D1B] border-[#29354B] text-[#94A3B8] hover:bg-[#19243A]/50'
                      }`}
                    >
                      <div className="text-xs font-bold text-slate-200">{b.label}</div>
                      <div className="text-[10px] text-[#94A3B8] mt-0.5 line-clamp-1">{b.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Group E: Interests Chips */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                  <Heart className="w-3.5 h-3.5 text-rose-400" />
                  Travel Interests & Style
                </label>
                <div className="flex flex-wrap gap-2">
                  {INTEREST_OPTIONS.map((opt) => {
                    const isSelected = selectedInterests.includes(opt.id);
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => handleToggleInterest(opt.id)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all flex items-center gap-1.5 ${
                          isSelected
                            ? 'bg-[#22D3EE]/20 border-[#22D3EE] text-[#22D3EE]'
                            : 'bg-[#080D1B] border-[#29354B] text-[#94A3B8] hover:text-white hover:bg-[#19243A]'
                        }`}
                      >
                        {isSelected && <Check className="w-3 h-3 text-[#22D3EE]" />}
                        <span>{opt.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Group F: Additional Preferences */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-cyan-400" />
                  Additional Notes & Specific Preferences
                </label>
                <input
                  type="text"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g. Vegetarian friendly, prefer morning museum visits, avoid long driving..."
                  className="w-full px-4 py-2.5 rounded-xl border border-[#29354B] bg-[#080D1B] text-[#F8FAFC] text-xs focus:outline-none focus:ring-2 focus:ring-[#22D3EE] transition-all"
                  disabled={isLoading}
                />
              </div>
            </div>
          </div>
        )}

        {/* Live Summary Box */}
        <div className="p-3.5 rounded-2xl bg-[#080D1B] border border-[#29354B] text-xs space-y-1">
          <div className="text-[10px] uppercase tracking-wider font-extrabold text-[#22D3EE]">
            Live Itinerary Prompt Preview
          </div>
          <p className="text-[#94A3B8] italic line-clamp-2">
            "{currentCompiledPrompt}"
          </p>
        </div>

        {/* Quick Example Presets */}
        <ExamplePrompts onSelect={handleSelectPreset} disabled={isLoading} />

        {/* Action Row */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-end gap-3 border-t border-[#29354B]">
          {isLoading && onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="w-full sm:w-auto px-5 py-3 rounded-xl text-xs font-bold text-rose-400 hover:bg-rose-950/40 border border-rose-800 transition-all"
            >
              Cancel Generation
            </button>
          )}

          <button
            type="submit"
            disabled={!destination.trim() || isLoading}
            className={`w-full sm:w-auto px-8 py-3.5 rounded-2xl font-extrabold text-sm text-[#080D1B] shadow-xl transition-all flex items-center justify-center gap-2 active:scale-95 ${
              !destination.trim() || isLoading
                ? 'bg-slate-700 text-slate-400 cursor-not-allowed shadow-none'
                : 'bg-[#22D3EE] hover:bg-cyan-300 shadow-cyan-500/25'
            }`}
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-[#080D1B]" />
                <span>Generating Your Itinerary...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-[#080D1B]" />
                <span>Generate My Itinerary</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
