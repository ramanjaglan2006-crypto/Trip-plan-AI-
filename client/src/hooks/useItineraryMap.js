import { useState, useEffect } from 'react';
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

  // 1. Geocode all stops in parallel
  useEffect(() => {
    let isCancelled = false;

    async function resolveLocations() {
      if (!days.length) {
        setLocations({});
        return;
      }

      setIsLoadingGeo(true);
      const allStops = [];
      days.forEach((day) => {
        (day.stops || []).forEach((stop) => {
          allStops.push(stop);
        });
      });

      // Run geocoding concurrently
      const results = await Promise.all(
        allStops.map(async (stop, idx) => {
          if (stop.latitude && stop.longitude) {
            return {
              id: stop.id,
              data: {
                lat: Number(stop.latitude),
                lon: Number(stop.longitude),
                displayName: stop.title,
                available: true,
              },
            };
          }

          const geo = await geocodeLocation(stop.title, destination, idx);
          if (geo && !isNaN(geo.lat) && !isNaN(geo.lon)) {
            return {
              id: stop.id,
              data: {
                lat: geo.lat,
                lon: geo.lon,
                displayName: geo.displayName,
                available: true,
              },
            };
          }

          return {
            id: stop.id,
            data: { available: false },
          };
        })
      );

      if (!isCancelled) {
        const newLocs = {};
        results.forEach(({ id, data }) => {
          newLocs[id] = data;
        });
        setLocations(newLocs);
        setIsLoadingGeo(false);
      }
    }

    resolveLocations();

    return () => {
      isCancelled = true;
    };
  }, [itinerary, destination]);

  // 2. Compute consecutive routes for each day in parallel
  useEffect(() => {
    let isCancelled = false;

    async function calculateRoutes() {
      if (!days.length || Object.keys(locations).length === 0) {
        setRoutesByDay({});
        return;
      }

      setIsLoadingRoutes(true);

      const dayPromises = days.map(async (day) => {
        const dayStops = day.stops || [];
        const legPromises = [];

        for (let i = 0; i < dayStops.length - 1; i++) {
          const fromStop = dayStops[i];
          const toStop = dayStops[i + 1];
          const locA = locations[fromStop.id];
          const locB = locations[toStop.id];

          if (locA?.available && locB?.available) {
            legPromises.push(
              getRouteBetween(locA, locB, travelMode).then((routeData) => ({
                fromStop,
                toStop,
                routeData,
              }))
            );
          } else {
            legPromises.push(
              Promise.resolve({
                fromStop,
                toStop,
                routeData: null,
              })
            );
          }
        }

        const legs = await Promise.all(legPromises);
        return { dayNum: day.day, legs };
      });

      const dayResults = await Promise.all(dayPromises);

      if (!isCancelled) {
        const computedRoutes = {};
        dayResults.forEach(({ dayNum, legs }) => {
          computedRoutes[dayNum] = legs;
        });
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
