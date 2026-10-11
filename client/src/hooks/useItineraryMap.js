import { useState, useEffect, useRef } from 'react';
import { geocodeLocation, getRouteBetween } from '../services/geoService';

export function useItineraryMap(itinerary, selectedDayNumber = 'all') {
  const [locations, setLocations] = useState({}); // { [stopId]: { lat, lon, displayName, available: boolean } }
  const [routesByDay, setRoutesByDay] = useState({}); // { [dayNum]: Array<{ fromStop, toStop, routeData }> }
  const [travelMode, setTravelMode] = useState('driving'); // 'driving' | 'walking' | 'cycling'
  const [isLoadingGeo, setIsLoadingGeo] = useState(false);
  const [isLoadingRoutes, setIsLoadingRoutes] = useState(false);
  const [selectedStopId, setSelectedStopId] = useState(null);

  const destination = itinerary?.trip?.destination || '';
  const days = itinerary?.days || [];

  // 1. Geocode all stops in the itinerary
  useEffect(() => {
    let isCancelled = false;

    async function resolveLocations() {
      if (!days.length) {
        setLocations({});
        return;
      }

      setIsLoadingGeo(true);
      const newLocs = {};

      for (const day of days) {
        for (const stop of day.stops || []) {
          if (isCancelled) return;

          // If stop already has coordinates embedded
          if (stop.latitude && stop.longitude) {
            newLocs[stop.id] = {
              lat: stop.latitude,
              lon: stop.longitude,
              displayName: stop.title,
              available: true,
            };
            continue;
          }

          // Otherwise geocode
          const geo = await geocodeLocation(stop.title, destination);
          if (geo) {
            newLocs[stop.id] = {
              lat: geo.lat,
              lon: geo.lon,
              displayName: geo.displayName,
              available: true,
            };
          } else {
            newLocs[stop.id] = {
              available: false,
            };
          }
        }
      }

      if (!isCancelled) {
        setLocations(newLocs);
        setIsLoadingGeo(false);
      }
    }

    resolveLocations();

    return () => {
      isCancelled = true;
    };
  }, [itinerary, destination]);

  // 2. Compute routes for consecutive stops within each day
  useEffect(() => {
    let isCancelled = false;

    async function calculateRoutes() {
      if (!days.length || Object.keys(locations).length === 0) {
        setRoutesByDay({});
        return;
      }

      setIsLoadingRoutes(true);
      const computedRoutes = {};

      for (const day of days) {
        const dayStops = day.stops || [];
        const dayLegs = [];

        for (let i = 0; i < dayStops.length - 1; i++) {
          if (isCancelled) return;

          const fromStop = dayStops[i];
          const toStop = dayStops[i + 1];
          const locA = locations[fromStop.id];
          const locB = locations[toStop.id];

          if (locA?.available && locB?.available) {
            const routeData = await getRouteBetween(locA, locB, travelMode);
            dayLegs.push({
              fromStop,
              toStop,
              routeData,
            });
          } else {
            dayLegs.push({
              fromStop,
              toStop,
              routeData: null, // At least one location is unavailable
            });
          }
        }

        computedRoutes[day.day] = dayLegs;
      }

      if (!isCancelled) {
        setRoutesByDay(computedRoutes);
        setIsLoadingRoutes(false);
      }
    }

    calculateRoutes();

    return () => {
      isCancelled = true;
    };
  }, [days, locations, travelMode]);

  // Derive visible markers and routes based on selectedDayNumber
  const visibleDays = selectedDayNumber === 'all'
    ? days
    : days.filter((d) => d.day === selectedDayNumber);

  // Collect all mapped stops for visible days in sequential order
  let currentSequenceIndex = 1;
  const mappedStops = [];

  for (const day of visibleDays) {
    for (const stop of day.stops || []) {
      const loc = locations[stop.id];
      mappedStops.push({
        ...stop,
        dayNumber: day.day,
        sequenceIndex: currentSequenceIndex++,
        coordinates: loc?.available ? [loc.lat, loc.lon] : null,
        isGeocoded: !!loc?.available,
      });
    }
  }

  // Calculate Distance & Duration summaries
  let totalDistanceKm = 0;
  let totalDurationSec = 0;
  let hasValidLegs = false;

  const dailySummaries = {};

  for (const day of visibleDays) {
    const legs = routesByDay[day.day] || [];
    let dayDist = 0;
    let dayDur = 0;
    let dayLegsCount = 0;

    for (const leg of legs) {
      if (leg.routeData) {
        dayDist += leg.routeData.distanceKm;
        dayDur += leg.routeData.durationSec;
        dayLegsCount++;
        hasValidLegs = true;
      }
    }

    dailySummaries[day.day] = {
      dayNumber: day.day,
      distanceKm: dayDist,
      durationSec: dayDur,
      legsCount: dayLegsCount,
      legs,
    };

    totalDistanceKm += dayDist;
    totalDurationSec += dayDur;
  }

  return {
    locations,
    routesByDay,
    mappedStops,
    dailySummaries,
    totalDistanceKm: hasValidLegs ? totalDistanceKm : null,
    totalDurationSec: hasValidLegs ? totalDurationSec : null,
    travelMode,
    setTravelMode,
    isLoadingGeo,
    isLoadingRoutes,
    selectedStopId,
    setSelectedStopId,
  };
}
