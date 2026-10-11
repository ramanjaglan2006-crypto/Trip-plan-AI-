import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Maximize2, Compass, Layers, AlertCircle, Clock, Tag } from 'lucide-react';

// Day colors for distinct visual clarity
const DAY_COLORS = ['#22D3EE', '#34D399', '#A78BFA', '#FBBF24', '#FB7185', '#38BDF8'];

export function ItineraryMap({
  mappedStops = [],
  routesByDay = {},
  selectedStopId,
  onSelectStop,
  selectedDayNumber = 'all',
  travelMode = 'driving',
}) {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const tileLayerRef = useRef(null);
  const markersLayerRef = useRef(null);
  const polylinesLayerRef = useRef(null);

  // Map theme: 'voyager' (CARTO Voyager light/colorful) or 'dark_all' (CARTO Dark Matter)
  const [mapTheme, setMapTheme] = useState('voyager');

  const cartoKey = import.meta.env.VITE_CARTO_API_KEY || 'cb1_4gy6_1_709e8369f5f9115ec01eb381';

  // Initialize Leaflet Map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      const map = L.map(mapContainerRef.current, {
        center: [20.5937, 78.9629], // Default initial center
        zoom: 5,
        zoomControl: false,
        attributionControl: false,
      });

      // CartoDB Voyager raster tiles with authorized API key parameter
      const tileUrl = `https://basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png?key=${cartoKey}`;
      tileLayerRef.current = L.tileLayer(tileUrl, {
        maxZoom: 19,
      }).addTo(map);

      // Attribution
      L.control
        .attribution({ position: 'bottomright' })
        .addAttribution('&copy; <a href="https://openstreetmap.org">OSM</a> &copy; <a href="https://carto.com">CARTO</a>')
        .addTo(map);

      // Zoom control at bottom left
      L.control.zoom({ position: 'bottomleft' }).addTo(map);

      // Feature groups for markers and polylines
      markersLayerRef.current = L.layerGroup().addTo(map);
      polylinesLayerRef.current = L.layerGroup().addTo(map);

      mapInstanceRef.current = map;
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [cartoKey]);

  // Update Tile Layer when mapTheme changes
  useEffect(() => {
    if (!tileLayerRef.current) return;
    const url =
      mapTheme === 'voyager'
        ? `https://basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png?key=${cartoKey}`
        : `https://basemaps.cartocdn.com/rastertiles/dark_all/{z}/{x}/{y}.png?key=${cartoKey}`;
    tileLayerRef.current.setUrl(url);
  }, [mapTheme, cartoKey]);

  // Update Markers and Routes whenever stops, routes, or selection changes
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map || !markersLayerRef.current || !polylinesLayerRef.current) return;

    markersLayerRef.current.clearLayers();
    polylinesLayerRef.current.clearLayers();

    const boundsPoints = [];
    const stopsWithCoords = mappedStops.filter((s) => s.coordinates && s.coordinates.length === 2);

    // 1. Draw Polylines for routes
    Object.entries(routesByDay).forEach(([dayNum, legs]) => {
      // If a specific day is selected, only draw routes for that day
      if (selectedDayNumber !== 'all' && Number(dayNum) !== Number(selectedDayNumber)) {
        return;
      }

      const colorIndex = (Number(dayNum) - 1) % DAY_COLORS.length;
      const dayColor = DAY_COLORS[colorIndex] || '#22D3EE';

      legs.forEach((leg) => {
        if (!leg.routeData || !leg.routeData.geometry || leg.routeData.geometry.length < 2) {
          return;
        }

        const isStraight = leg.routeData.isStraightLine;
        const polyline = L.polyline(leg.routeData.geometry, {
          color: dayColor,
          weight: isStraight ? 2.5 : 4,
          opacity: isStraight ? 0.7 : 0.9,
          dashArray: isStraight ? '6, 8' : undefined,
          lineJoin: 'round',
        });

        polyline.bindTooltip(
          `${leg.fromStop.title} → ${leg.toStop.title}<br/>${leg.routeData.distanceKm.toFixed(1)} km (${isStraight ? 'Straight-line' : leg.routeData.mode})`,
          { sticky: true, className: 'tripwise-map-tooltip' }
        );

        polylinesLayerRef.current.addLayer(polyline);
      });
    });

    // 2. Draw Numbered Markers
    stopsWithCoords.forEach((stop) => {
      const [lat, lon] = stop.coordinates;
      boundsPoints.push([lat, lon]);

      const isSelected = selectedStopId === stop.id;
      const dayColor = DAY_COLORS[(stop.dayNumber - 1) % DAY_COLORS.length] || '#22D3EE';

      // Custom styled HTML DivIcon
      const markerHtml = `
        <div class="tripwise-marker-wrapper ${isSelected ? 'is-selected' : ''}" style="--marker-color: ${dayColor};">
          <div class="tripwise-marker-pin">
            <span>${stop.sequenceIndex}</span>
          </div>
        </div>
      `;

      const customIcon = L.divIcon({
        className: 'tripwise-custom-marker',
        html: markerHtml,
        iconSize: [32, 32],
        iconAnchor: [16, 16],
        popupAnchor: [0, -18],
      });

      const marker = L.marker([lat, lon], { icon: customIcon });

      // Rich interactive popup
      const popupHtml = `
        <div class="tripwise-popup-card bg-[#111A2E] text-white p-4 rounded-2xl border border-[#29354B] shadow-2xl min-w-[240px] max-w-[280px]">
          <div class="flex items-center justify-between gap-2 mb-2 pb-2 border-b border-[#29354B]">
            <span class="px-2 py-0.5 rounded text-[10px] font-extrabold uppercase tracking-wider" style="background: ${dayColor}22; color: ${dayColor}; border: 1px solid ${dayColor}55;">
              Day ${stop.dayNumber} • Stop ${stop.sequenceIndex}
            </span>
            <span class="text-[11px] font-bold text-slate-400 flex items-center gap-1">
              ${stop.time || ''}
            </span>
          </div>
          <h4 class="font-extrabold text-sm text-[#F8FAFC] leading-snug mb-1">
            ${stop.title}
          </h4>
          <p class="text-xs text-[#94A3B8] leading-relaxed line-clamp-3 mb-3">
            ${stop.description || ''}
          </p>
          <div class="flex items-center justify-between text-[11px] pt-2 border-t border-[#29354B]/60 text-slate-300">
            <span>⏱️ ${stop.durationMinutes || 60} mins</span>
            <span class="font-bold text-[#22D3EE]">${stop.estimatedCost || 'Free'}</span>
          </div>
          <button id="popup-select-${stop.id}" class="mt-3 w-full py-1.5 rounded-xl bg-[#19243A] hover:bg-[#22D3EE] hover:text-[#080D1B] text-[#F8FAFC] text-xs font-bold transition-all border border-[#29354B]">
            Focus in Timeline
          </button>
        </div>
      `;

      marker.bindPopup(popupHtml, {
        className: 'tripwise-leaflet-popup',
        closeButton: true,
      });

      marker.on('popupopen', () => {
        onSelectStop(stop.id);
        const btn = document.getElementById(`popup-select-${stop.id}`);
        if (btn) {
          btn.onclick = () => {
            onSelectStop(stop.id);
            const el = document.getElementById(`stop-${stop.id}`);
            if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
          };
        }
      });

      marker.on('click', () => {
        onSelectStop(stop.id);
      });

      markersLayerRef.current.addLayer(marker);

      // If this marker is selected, open its popup
      if (isSelected) {
        marker.openPopup();
      }
    });

    // 3. Auto-fit bounds if we have points and no specific stop selected
    if (boundsPoints.length > 0 && !selectedStopId) {
      map.fitBounds(boundsPoints, {
        padding: [45, 45],
        maxZoom: 15,
        animate: true,
      });
    }
  }, [mappedStops, routesByDay, selectedDayNumber, travelMode, selectedStopId, onSelectStop]);

  // Center on selected stop when selected externally
  useEffect(() => {
    if (!selectedStopId || !mapInstanceRef.current) return;
    const target = mappedStops.find((s) => s.id === selectedStopId);
    if (target && target.coordinates) {
      mapInstanceRef.current.panTo(target.coordinates, { animate: true, duration: 0.8 });
    }
  }, [selectedStopId, mappedStops]);

  // Fit bounds action
  const handleFitBounds = () => {
    const map = mapInstanceRef.current;
    if (!map) return;
    const points = mappedStops
      .filter((s) => s.coordinates && s.coordinates.length === 2)
      .map((s) => s.coordinates);

    if (points.length > 0) {
      map.fitBounds(points, { padding: [50, 50], maxZoom: 15, animate: true });
    }
  };

  const stopsWithCoordsCount = mappedStops.filter((s) => s.isGeocoded).length;

  return (
    <div className="relative w-full h-[520px] lg:h-[620px] rounded-3xl overflow-hidden border border-[#29354B] bg-[#080D1B] shadow-2xl">
      {/* Leaflet DOM Node */}
      <div ref={mapContainerRef} className="w-full h-full z-0" />

      {/* Map Header Overlay Bar */}
      <div className="absolute top-4 left-4 right-4 z-10 flex items-center justify-between pointer-events-none">
        <div className="bg-[#111A2E]/90 backdrop-blur-md px-3.5 py-1.5 rounded-2xl border border-[#29354B] shadow-lg pointer-events-auto flex items-center gap-2">
          <Compass className="w-4 h-4 text-[#22D3EE]" />
          <span className="text-xs font-bold text-white">
            {stopsWithCoordsCount} of {mappedStops.length} Mapped
          </span>
          {stopsWithCoordsCount < mappedStops.length && (
            <span className="text-[10px] text-amber-400 bg-amber-950/40 px-2 py-0.5 rounded border border-amber-800">
              {mappedStops.length - stopsWithCoordsCount} resolving...
            </span>
          )}
        </div>

        <div className="flex items-center gap-2 pointer-events-auto">
          {/* Map Style Switcher (CARTO Voyager vs Dark Matter) */}
          <button
            onClick={() => setMapTheme(mapTheme === 'voyager' ? 'dark_all' : 'voyager')}
            className="bg-[#111A2E]/90 hover:bg-[#19243A] backdrop-blur-md px-3 py-1.5 rounded-xl border border-[#29354B] text-xs font-bold text-slate-200 hover:text-white shadow-lg transition-all flex items-center gap-1.5"
            title="Switch Map Theme"
          >
            <Layers className="w-3.5 h-3.5 text-[#22D3EE]" />
            <span className="hidden sm:inline">
              {mapTheme === 'voyager' ? 'CARTO Voyager' : 'CARTO Dark'}
            </span>
          </button>

          {/* Fit Bounds */}
          <button
            onClick={handleFitBounds}
            className="bg-[#111A2E]/90 hover:bg-[#19243A] backdrop-blur-md p-2 rounded-xl border border-[#29354B] text-[#94A3B8] hover:text-white shadow-lg transition-all"
            title="Fit to all locations"
          >
            <Maximize2 className="w-4 h-4 text-[#22D3EE]" />
          </button>
        </div>
      </div>

      {/* Map Legend Pill */}
      <div className="absolute bottom-4 left-4 z-10 bg-[#111A2E]/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-[#29354B] shadow-lg text-[10px] text-[#94A3B8] flex items-center gap-3 pointer-events-auto">
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-0.5 bg-[#22D3EE] inline-block"></span>
          <span>Road route</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-0.5 border-t border-dashed border-[#22D3EE] inline-block"></span>
          <span>Straight-line</span>
        </div>
      </div>

      {/* Custom Marker CSS */}
      <style>{`
        .tripwise-custom-marker {
          background: transparent !important;
          border: none !important;
        }
        .tripwise-marker-wrapper {
          position: relative;
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }
        .tripwise-marker-pin {
          width: 30px;
          height: 30px;
          border-radius: 50%;
          background: #080D1B;
          border: 2.5px solid var(--marker-color, #22D3EE);
          color: #F8FAFC;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 800;
          font-size: 12px;
          box-shadow: 0 4px 14px rgba(0,0,0,0.6);
          transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.2s ease;
        }
        .tripwise-marker-wrapper:hover .tripwise-marker-pin,
        .tripwise-marker-wrapper.is-selected .tripwise-marker-pin {
          transform: scale(1.22);
          border-color: #F8FAFC;
          background: var(--marker-color, #22D3EE);
          color: #080D1B;
          box-shadow: 0 0 20px var(--marker-color, #22D3EE);
        }
        .tripwise-leaflet-popup .leaflet-popup-content-wrapper {
          background: transparent !important;
          box-shadow: none !important;
          padding: 0 !important;
        }
        .tripwise-leaflet-popup .leaflet-popup-tip {
          background: #111A2E !important;
          border: 1px solid #29354B !important;
        }
        .tripwise-map-tooltip {
          background: #111A2E !important;
          color: #F8FAFC !important;
          border: 1px solid #29354B !important;
          font-size: 11px !important;
          font-weight: 600 !important;
          border-radius: 8px !important;
          box-shadow: 0 8px 24px rgba(0,0,0,0.5) !important;
        }
      `}</style>
    </div>
  );
}
