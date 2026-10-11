import { useState, useRef, useCallback, useEffect } from 'react';
import { generateTrip } from '../services/tripApi';
import { generateClientMock } from '../utils/clientMock';
import { saveTripToLibrary, getLastSession } from '../utils/storage';

export function useTripPlanner() {
  const [itinerary, setItinerary] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [expandedStopIds, setExpandedStopIds] = useState(new Set());
  const [simulatedError, setSimulatedError] = useState('NONE');
  const [apiKey, setApiKey] = useState(() => {
    return localStorage.getItem('tripwise_gemini_api_key') || '';
  });
  const [lastPrompt, setLastPrompt] = useState('');

  // User Authentication State
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem('tripwise_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const login = useCallback((userObj) => {
    setCurrentUser(userObj);
    localStorage.setItem('tripwise_user', JSON.stringify(userObj));
  }, []);

  const logout = useCallback(() => {
    setCurrentUser(null);
    localStorage.removeItem('tripwise_user');
  }, []);

  // Stale Request Protection refs
  const activeRequestId = useRef(0);
  const abortControllerRef = useRef(null);

  // Restore previous session if available
  useEffect(() => {
    const previous = getLastSession();
    if (previous && previous.trip) {
      setItinerary(previous);
    }
  }, []);

  /**
   * Generates new itinerary from free-form prompt with stale request guard
   */
  const handleGenerate = useCallback(async (userPrompt) => {
    if (!userPrompt || !userPrompt.trim()) return;

    // 1. Abort previous pending request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    abortControllerRef.current = new AbortController();

    // 2. Increment request ID version guard
    const currentReqId = ++activeRequestId.current;

    setIsLoading(true);
    setError(null);
    setLastPrompt(userPrompt.trim());

    try {
      const data = await generateTrip(userPrompt.trim(), {
        signal: abortControllerRef.current.signal,
        simulatedError,
        apiKey,
      });

      // 3. Stale Request Guard check
      if (currentReqId !== activeRequestId.current) {
        console.log(`Stale request #${currentReqId} discarded (Current: #${activeRequestId.current})`);
        return;
      }

      setItinerary(data);
      saveTripToLibrary(data);

      // Expand first stop by default
      if (data.days?.[0]?.stops?.[0]?.id) {
        setExpandedStopIds(new Set([data.days[0].stops[0].id]));
      }
    } catch (err) {
      if (currentReqId !== activeRequestId.current) return;
      if (err.name === 'AbortError') return;

      setError({
        code: err.code || 'UNKNOWN_ERROR',
        message: err.message || 'Failed to generate itinerary.',
        details: err.details,
      });
    } finally {
      if (currentReqId === activeRequestId.current) {
        setIsLoading(false);
      }
    }
  }, [simulatedError, apiKey]);

  /**
   * Cancel ongoing generation request
   */
  const handleCancelRequest = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
    setIsLoading(false);
  }, []);

  /**
   * Toggle stop expansion state locally
   */
  const toggleExpandStop = useCallback((stopId) => {
    setExpandedStopIds((prev) => {
      const next = new Set(prev);
      if (next.has(stopId)) {
        next.delete(stopId);
      } else {
        next.add(stopId);
      }
      return next;
    });
  }, []);

  /**
   * Remove stop from React state (NO AI CALL)
   */
  const removeStop = useCallback((dayNumber, stopId) => {
    setItinerary((prev) => {
      if (!prev) return prev;
      const updatedDays = prev.days.map((dayObj) => {
        if (dayObj.day !== dayNumber) return dayObj;
        return {
          ...dayObj,
          stops: dayObj.stops.filter((s) => s.id !== stopId),
        };
      });
      const updated = { ...prev, days: updatedDays };
      saveTripToLibrary(updated);
      return updated;
    });
  }, []);

  /**
   * Reorder stops within a day (NO AI CALL)
   */
  const moveStop = useCallback((dayNumber, index, direction) => {
    setItinerary((prev) => {
      if (!prev) return prev;
      const updatedDays = prev.days.map((dayObj) => {
        if (dayObj.day !== dayNumber) return dayObj;

        const stops = [...dayObj.stops];
        const targetIndex = direction === 'up' ? index - 1 : index + 1;

        if (targetIndex < 0 || targetIndex >= stops.length) return dayObj;

        const temp = stops[index];
        stops[index] = stops[targetIndex];
        stops[targetIndex] = temp;

        return { ...dayObj, stops };
      });
      const updated = { ...prev, days: updatedDays };
      saveTripToLibrary(updated);
      return updated;
    });
  }, []);

  /**
   * Edit stop details locally (NO AI CALL)
   */
  const editStop = useCallback((dayNumber, updatedStop) => {
    setItinerary((prev) => {
      if (!prev) return prev;
      const updatedDays = prev.days.map((dayObj) => {
        if (dayObj.day !== dayNumber) return dayObj;
        return {
          ...dayObj,
          stops: dayObj.stops.map((s) => (s.id === updatedStop.id ? updatedStop : s)),
        };
      });
      const updated = { ...prev, days: updatedDays };
      saveTripToLibrary(updated);
      return updated;
    });
  }, []);

  /**
   * Add custom stop to day locally (NO AI CALL)
   */
  const addStop = useCallback((dayNumber, newStop) => {
    setItinerary((prev) => {
      if (!prev) return prev;
      const updatedDays = prev.days.map((dayObj) => {
        if (dayObj.day !== dayNumber) return dayObj;
        return {
          ...dayObj,
          stops: [...dayObj.stops, newStop],
        };
      });
      const updated = { ...prev, days: updatedDays };
      saveTripToLibrary(updated);
      return updated;
    });
  }, []);

  /**
   * Reset current session to generate a new itinerary
   */
  const resetItinerary = useCallback(() => {
    setItinerary(null);
    setError(null);
  }, []);

  /**
   * Directly generates fallback itinerary if API has issues
   */
  const handleUseFallback = useCallback(async () => {
    if (!lastPrompt) return;
    setError(null);
    setIsLoading(true);
    try {
      const mock = generateClientMock(lastPrompt);
      setItinerary(mock);
      saveTripToLibrary(mock);
      if (mock.days?.[0]?.stops?.[0]?.id) {
        setExpandedStopIds(new Set([mock.days[0].stops[0].id]));
      }
    } catch (err) {
      console.error('Fallback generation error:', err);
    } finally {
      setIsLoading(false);
    }
  }, [lastPrompt]);

  return {
    itinerary,
    isLoading,
    error,
    expandedStopIds,
    simulatedError,
    setSimulatedError,
    apiKey,
    setApiKey,
    lastPrompt,
    currentUser,
    login,
    logout,
    handleGenerate,
    handleCancelRequest,
    handleUseFallback,
    toggleExpandStop,
    removeStop,
    moveStop,
    editStop,
    addStop,
    resetItinerary,
  };
}
