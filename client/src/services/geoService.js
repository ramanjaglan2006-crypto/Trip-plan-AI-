/**
 * Geo and Routing Service for TripWise AI
 * Integrates Nominatim OpenStreetMap Geocoding and OSRM Routing with client-side caching.
 * Falls back honestly to Haversine straight-line distance when routing is unavailable.
 */

const GEO_CACHE_KEY = 'tripwise_geocache_v1';
const ROUTE_CACHE_KEY = 'tripwise_routecache_v1';

// In-memory + persistent cache helpers
function getCache(key) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function setCache(key, cacheObj) {
  try {
    localStorage.setItem(key, JSON.stringify(cacheObj));
  } catch {
    // ignore quota errors
  }
}

/**
 * Calculates straight-line distance between two coordinates in kilometers using Haversine formula
 */
export function calculateHaversineDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Earth's radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // in km
}

/**
 * Formats distance nicely (km or meters)
 */
export function formatDistance(km) {
  if (km === null || km === undefined || isNaN(km)) return 'Distance unavailable';
  if (km < 1) {
    return `${Math.round(km * 1000)} m`;
  }
  return `${km.toFixed(1)} km`;
}

/**
 * Formats travel duration nicely
 */
export function formatDuration(seconds) {
  if (seconds === null || seconds === undefined || isNaN(seconds)) return 'Time unavailable';
  const mins = Math.round(seconds / 60);
  if (mins < 1) return '< 1 min';
  if (mins < 60) return `${mins} mins`;
  const hrs = Math.floor(mins / 60);
  const remMins = mins % 60;
  return remMins > 0 ? `${hrs} hr ${remMins} mins` : `${hrs} hr`;
}

/**
 * Geocodes an attraction/stop name in the context of the destination
 * @param {string} stopTitle - e.g. "Upper Lake"
 * @param {string} destination - e.g. "Bhopal, Madhya Pradesh"
 * @returns {Promise<{lat: number, lon: number, displayName: string} | null>}
 */
export async function geocodeLocation(stopTitle, destination = '') {
  if (!stopTitle || !stopTitle.trim()) return null;

  const cleanTitle = stopTitle
    .replace(/^Day \d+:?\s*/i, '')
    .replace(/^Stop \d+:?\s*/i, '')
    .replace(/\(.*?\)/g, '')
    .replace(/\b(Walk|Tour|Exploration|Observation|Sunset Vista|Vista|Visit|Stroll|Experience|Hike|Trek)\b/gi, '')
    .trim();

  const queryKey = `${cleanTitle || stopTitle}::${destination}`.toLowerCase().trim();

  // 1. Check cache
  const cache = getCache(GEO_CACHE_KEY);
  if (cache[queryKey] !== undefined) {
    return cache[queryKey];
  }

  // 2. Formulate search queries to try in order
  const queriesToTry = [];
  if (destination) {
    // If destination has multiple cities (e.g. "Tokyo & Kyoto, Japan"), try each city or whole destination
    const cities = destination.split(/&|,|and/).map((s) => s.trim()).filter(Boolean);
    queriesToTry.push(`${cleanTitle}, ${destination}`);
    if (cities.length > 0) {
      queriesToTry.push(`${cleanTitle}, ${cities[0]}`);
      if (cities.length > 1) {
        queriesToTry.push(`${cleanTitle}, ${cities[1]}`);
      }
    }
  }
  queriesToTry.push(cleanTitle);
  queriesToTry.push(stopTitle.trim());

  for (const q of queriesToTry) {
    if (!q) continue;
    try {
      const url = `https://nominatim.openstreetmap.org/search?format=json&limit=1&q=${encodeURIComponent(q)}`;
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        if (data && data.length > 0) {
          const lat = parseFloat(data[0].lat);
          const lon = parseFloat(data[0].lon);
          if (!isNaN(lat) && !isNaN(lon)) {
            const result = {
              lat,
              lon,
              displayName: data[0].display_name,
            };
            cache[queryKey] = result;
            setCache(GEO_CACHE_KEY, cache);
            return result;
          }
        }
      }
    } catch {
      // Continue to next query candidate
    }
  }

  // Cache null if all failed so we don't repeat lookups
  cache[queryKey] = null;
  setCache(GEO_CACHE_KEY, cache);
  return null;
}

/**
 * Gets real road route between two points using OSRM
 * Supported profiles: 'driving', 'walking', 'cycling'
 * @returns {Promise<{distanceKm: number, durationSec: number, geometry: Array<[number, number]>, isStraightLine: boolean, mode: string}>}
 */
export async function getRouteBetween(pointA, pointB, mode = 'driving') {
  if (!pointA || !pointB || isNaN(pointA.lat) || isNaN(pointB.lat)) {
    return null;
  }

  // Profile translation for OSRM
  const osrmProfile = mode === 'walking' ? 'foot' : mode === 'cycling' ? 'bike' : 'driving';
  const routeKey = `${pointA.lat.toFixed(4)},${pointA.lon.toFixed(4)}_to_${pointB.lat.toFixed(4)},${pointB.lon.toFixed(4)}_${mode}`;

  const routeCache = getCache(ROUTE_CACHE_KEY);
  if (routeCache[routeKey]) {
    return routeCache[routeKey];
  }

  try {
    // OSRM coordinates format: {lon},{lat};{lon},{lat}
    const coordsStr = `${pointA.lon},${pointA.lat};${pointB.lon},${pointB.lat}`;
    const url = `https://router.project-osrm.org/route/v1/${osrmProfile}/${coordsStr}?overview=full&geometries=geojson`;

    const resp = await fetch(url);
    if (!resp.ok) {
      throw new Error(`OSRM HTTP error: ${resp.status}`);
    }

    const data = await resp.json();
    if (data.code === 'Ok' && data.routes && data.routes.length > 0) {
      const route = data.routes[0];
      const distanceKm = route.distance / 1000;
      const durationSec = route.duration;
      
      // Convert GeoJSON [lon, lat] coordinates into Leaflet [lat, lon] format
      const geometry = (route.geometry?.coordinates || []).map((coord) => [coord[1], coord[0]]);

      const result = {
        distanceKm,
        durationSec,
        geometry,
        isStraightLine: false,
        mode,
      };

      routeCache[routeKey] = result;
      setCache(ROUTE_CACHE_KEY, routeCache);
      return result;
    } else {
      throw new Error(data.message || 'No route found');
    }
  } catch (err) {
    // Fallback: Honest Haversine straight-line calculation
    const haversineKm = calculateHaversineDistance(pointA.lat, pointA.lon, pointB.lat, pointB.lon);
    
    // Estimate reasonable straight-line transit time: ~40 km/h driving, ~4.5 km/h walking, ~15 km/h cycling
    const avgSpeedKmH = mode === 'walking' ? 4.5 : mode === 'cycling' ? 15 : 40;
    const estimatedSec = Math.round((haversineKm / avgSpeedKmH) * 3600);

    const fallbackResult = {
      distanceKm: haversineKm,
      durationSec: estimatedSec,
      geometry: [
        [pointA.lat, pointA.lon],
        [pointB.lat, pointB.lon],
      ],
      isStraightLine: true,
      mode,
    };

    routeCache[routeKey] = fallbackResult;
    setCache(ROUTE_CACHE_KEY, routeCache);
    return fallbackResult;
  }
}
