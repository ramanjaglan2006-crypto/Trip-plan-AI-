import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTripContext } from '../context/TripContext';
import { TripInput } from '../components/trip/TripInput';
import { LoadingState } from '../components/common/LoadingState';
import { ErrorState } from '../components/common/ErrorState';
import { Compass, Sparkles } from 'lucide-react';

export function PlanPage() {
  const {
    itinerary,
    isLoading,
    error,
    lastPrompt,
    handleGenerate,
    handleCancelRequest,
    setSimulatedError,
    resetItinerary,
  } = useTripContext();

  const navigate = useNavigate();

  // Navigate to itinerary page once data is successfully generated
  useEffect(() => {
    if (itinerary && !isLoading && !error) {
      navigate('/itinerary');
    }
  }, [itinerary, isLoading, error, navigate]);

  return (
    <div className="max-w-4xl mx-auto space-y-8 py-4 animate-fadeIn text-white">
      <div className="text-center space-y-2">
        <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center mx-auto mb-3">
          <Compass className="w-6 h-6 animate-spin" style={{ animationDuration: '20s' }} />
        </div>
        <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white font-sans">
          Explore & <span className="text-cyan-400">Plan</span>
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 max-w-lg mx-auto">
          Describe your destination, dates, budget, or preferred activities in free-form text.
        </p>
      </div>

      {/* Main Input Form */}
      <TripInput
        onSubmit={handleGenerate}
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
          onRetry={() => handleGenerate(lastPrompt || '5 days in Japan')}
          onUseFallback={() => {
            setSimulatedError('NONE');
            handleGenerate(lastPrompt || '3 days in Paris');
          }}
          onClear={() => resetItinerary()}
        />
      )}
    </div>
  );
}
