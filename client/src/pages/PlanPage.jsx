import React, { useRef, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useTripContext } from '../context/TripContext';
import { TripInput } from '../components/trip/TripInput';
import { LoadingState } from '../components/common/LoadingState';
import { ErrorState } from '../components/common/ErrorState';
import { Compass, Sparkles, ArrowRight, MapPin } from 'lucide-react';

export function PlanPage() {
  const {
    itinerary,
    isLoading,
    error,
    lastPrompt,
    handleGenerate,
    handleCancelRequest,
    handleUseFallback,
    setSimulatedError,
    resetItinerary,
  } = useTripContext();

  const navigate = useNavigate();
  const isGeneratingRef = useRef(false);

  // Navigate to itinerary page ONLY when a user-initiated generation on this page succeeds!
  useEffect(() => {
    if (isGeneratingRef.current && itinerary && !isLoading && !error) {
      isGeneratingRef.current = false;
      navigate('/itinerary');
    }
  }, [itinerary, isLoading, error, navigate]);

  const handleSubmit = (prompt) => {
    isGeneratingRef.current = true;
    handleGenerate(prompt);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 py-4 animate-fadeIn text-white">
      {/* Notice if an itinerary is already active, with link to Current Itinerary */}
      {itinerary?.trip && !isLoading && (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-2xl bg-[#111A2E] border border-[#29354B] text-xs shadow-md">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse flex-shrink-0" />
            <span className="text-[#94A3B8]">Current active itinerary:</span>
            <span className="font-bold text-[#F8FAFC] truncate max-w-[200px] sm:max-w-xs">
              {itinerary.trip.destination} ({itinerary.days?.length} Days)
            </span>
          </div>
          <Link
            to="/itinerary"
            className="text-[#22D3EE] hover:text-cyan-300 font-bold flex items-center gap-1 self-start sm:self-auto hover:underline"
          >
            <span>Open Current Itinerary</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      )}

      <div className="text-center space-y-2">
        <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 text-[#22D3EE] border border-cyan-500/20 flex items-center justify-center mx-auto mb-3">
          <Compass className="w-6 h-6 animate-spin" style={{ animationDuration: '20s' }} />
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#F8FAFC] font-sans">
          Explore & <span className="text-[#22D3EE]">Plan</span>
        </h1>
        <p className="text-xs sm:text-sm text-[#94A3B8] max-w-lg mx-auto">
          Specify destination, duration, budget, and travel interests to build an editable, day-by-day itinerary.
        </p>
      </div>

      {/* Main Input Form */}
      <TripInput
        onSubmit={handleSubmit}
        isLoading={isLoading}
        onCancel={handleCancelRequest}
      />

      {/* Loading Skeleton View */}
      {isLoading && (
        <LoadingState onCancel={handleCancelRequest} />
      )}

      {/* Error Failure View */}
      {error && !isLoading && (
        <ErrorState
          error={error}
          onRetry={() => {
            isGeneratingRef.current = true;
            handleGenerate(lastPrompt || '3 days in Bhopal');
          }}
          onUseFallback={() => {
            isGeneratingRef.current = true;
            setSimulatedError('NONE');
            handleUseFallback();
          }}
          onClear={() => resetItinerary()}
        />
      )}
    </div>
  );
}
