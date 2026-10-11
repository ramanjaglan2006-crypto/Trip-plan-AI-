import React from 'react';
import { formatDistance, formatDuration } from '../../services/geoService';
import { 
  Car, 
  Footprints, 
  Bike, 
  Moon, 
  ArrowRight, 
  Compass, 
  AlertCircle, 
  Clock, 
  Route, 
  CheckCircle2 
} from 'lucide-react';

export function RouteSummary({
  dailySummaries = {},
  totalDistanceKm,
  totalDurationSec,
  travelMode,
  onChangeTravelMode,
  selectedStopId,
  onSelectStop,
  days = [],
}) {
  const modes = [
    { id: 'driving', label: 'Driving', icon: Car },
    { id: 'walking', label: 'Walking', icon: Footprints },
    { id: 'cycling', label: 'Cycling', icon: Bike },
  ];

  return (
    <div className="bg-[#111A2E] rounded-3xl p-6 sm:p-7 border border-[#29354B] space-y-6 shadow-xl">
      {/* Header & Travel Mode Selector */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#29354B] pb-5">
        <div>
          <div className="flex items-center gap-2">
            <Route className="w-5 h-5 text-[#22D3EE]" />
            <h3 className="font-extrabold text-lg text-[#F8FAFC]">
              Route & Distance Summary
            </h3>
          </div>
          <p className="text-xs text-[#94A3B8] mt-0.5">
            Real routing calculations between consecutive stops within each day
          </p>
        </div>

        {/* Travel Mode Selector */}
        <div className="flex items-center gap-1.5 bg-[#080D1B] p-1.5 rounded-2xl border border-[#29354B] self-start sm:self-auto">
          {modes.map((m) => {
            const Icon = m.icon;
            const isSelected = travelMode === m.id;
            return (
              <button
                key={m.id}
                onClick={() => onChangeTravelMode(m.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-[#22D3EE] text-[#080D1B] shadow-md shadow-cyan-500/20'
                    : 'text-[#94A3B8] hover:text-white hover:bg-[#19243A]'
                }`}
                title={`Calculate routes by ${m.label}`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{m.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Overall Total Metrics Banner */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="p-4 rounded-2xl bg-[#080D1B] border border-[#29354B] flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold text-[#94A3B8] uppercase tracking-wider block">
              Total Itinerary Distance
            </span>
            <span className="text-2xl font-black text-[#F8FAFC] tracking-tight">
              {totalDistanceKm !== null ? formatDistance(totalDistanceKm) : 'Calculating...'}
            </span>
          </div>
          <Compass className="w-8 h-8 text-[#22D3EE] opacity-80" />
        </div>

        <div className="p-4 rounded-2xl bg-[#080D1B] border border-[#29354B] flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold text-[#94A3B8] uppercase tracking-wider block">
              Est. Transit Time ({travelMode})
            </span>
            <span className="text-2xl font-black text-[#F8FAFC] tracking-tight">
              {totalDurationSec !== null ? formatDuration(totalDurationSec) : 'Calculating...'}
            </span>
          </div>
          <Clock className="w-8 h-8 text-amber-400 opacity-80" />
        </div>
      </div>

      {/* Days Legs List */}
      <div className="space-y-6">
        {days.map((day, dayIndex) => {
          const summary = dailySummaries[day.day] || { legs: [] };
          const legs = summary.legs || [];

          return (
            <div key={day.day} className="space-y-3">
              {/* Overnight Transition Notice if between Day N and Day N+1 */}
              {dayIndex > 0 && (
                <div className="my-4 p-3 rounded-2xl bg-[#080D1B] border border-dashed border-[#29354B] flex items-center gap-3 text-xs text-[#94A3B8]">
                  <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
                    <Moon className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-slate-200">Overnight transition</span> — starting point not specified. (Travelers stay at accommodation or separate hotel).
                  </div>
                </div>
              )}

              {/* Day Header */}
              <div className="flex items-center justify-between bg-[#19243A]/60 px-4 py-2.5 rounded-2xl border border-[#29354B]">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded-md bg-[#22D3EE]/20 text-[#22D3EE] font-extrabold text-xs">
                    Day {day.day}
                  </span>
                  <span className="font-extrabold text-sm text-[#F8FAFC]">{day.title}</span>
                </div>
                <div className="text-xs font-semibold text-[#94A3B8]">
                  Day Total: {summary.distanceKm ? formatDistance(summary.distanceKm) : '0 km'} • {summary.durationSec ? formatDuration(summary.durationSec) : '0 mins'}
                </div>
              </div>

              {/* Consecutive Legs */}
              {legs.length === 0 ? (
                <div className="p-3 text-xs text-[#94A3B8] italic bg-[#080D1B] rounded-xl border border-[#29354B]">
                  Only 1 activity planned for this day. (No inter-stop travel leg to calculate).
                </div>
              ) : (
                <div className="space-y-2.5">
                  {legs.map((leg, legIdx) => {
                    const { fromStop, toStop, routeData } = leg;
                    const isFromSelected = selectedStopId === fromStop.id;
                    const isToSelected = selectedStopId === toStop.id;

                    return (
                      <div
                        key={legIdx}
                        className={`p-3.5 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                          isFromSelected || isToSelected
                            ? 'bg-[#19243A] border-[#22D3EE]'
                            : 'bg-[#080D1B] border-[#29354B] hover:border-cyan-800/60'
                        }`}
                      >
                        <div className="flex items-center gap-2 min-w-0 flex-1">
                          <button
                            onClick={() => onSelectStop(fromStop.id)}
                            className="font-bold text-xs text-white hover:text-[#22D3EE] truncate max-w-[150px] sm:max-w-[200px]"
                            title={fromStop.title}
                          >
                            {fromStop.title}
                          </button>
                          <ArrowRight className="w-3.5 h-3.5 text-[#22D3EE] flex-shrink-0" />
                          <button
                            onClick={() => onSelectStop(toStop.id)}
                            className="font-bold text-xs text-white hover:text-[#22D3EE] truncate max-w-[150px] sm:max-w-[200px]"
                            title={toStop.title}
                          >
                            {toStop.title}
                          </button>
                        </div>

                        {routeData ? (
                          <div className="flex items-center gap-3 text-xs self-end sm:self-auto">
                            <span className="font-extrabold text-[#F8FAFC]">
                              {formatDistance(routeData.distanceKm)}
                            </span>
                            <span className="text-[#94A3B8]">•</span>
                            <span className="font-semibold text-[#22D3EE]">
                              ~{formatDuration(routeData.durationSec)}
                            </span>
                            <span className="text-[10px] px-2 py-0.5 rounded-md bg-[#19243A] text-slate-300 font-medium">
                              {routeData.isStraightLine ? 'Straight-line' : `${routeData.mode} route`}
                            </span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-1.5 text-xs text-amber-400">
                            <AlertCircle className="w-3.5 h-3.5" />
                            <span>Distance unavailable</span>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
