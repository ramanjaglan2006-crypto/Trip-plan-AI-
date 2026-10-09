const STORAGE_KEY = 'tripwise_ai_saved_trips';
const LAST_SESSION_KEY = 'tripwise_ai_last_session';

export function getSavedTrips() {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveTripToLibrary(tripData) {
  const current = getSavedTrips();
  const filtered = current.filter(t => t.trip?.title !== tripData.trip?.title);
  const updated = [tripData, ...filtered];
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    localStorage.setItem(LAST_SESSION_KEY, JSON.stringify(tripData));
  } catch (err) {
    console.error('Failed to save to localStorage:', err);
  }
  return updated;
}

export function getLastSession() {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(LAST_SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function exportAsJSON(itinerary) {
  const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(itinerary, null, 2));
  const anchor = document.createElement('a');
  const filename = `${(itinerary.trip?.title || 'trip').toLowerCase().replace(/[^a-z0-9]/g, '_')}_itinerary.json`;
  anchor.setAttribute('href', dataStr);
  anchor.setAttribute('download', filename);
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
}

export function exportAsMarkdown(itinerary) {
  const trip = itinerary.trip || {};
  let md = `# ${trip.title || 'Travel Itinerary'}\n\n`;
  md += `**Destination:** ${trip.destination || 'N/A'}\n`;
  md += `**Duration:** ${trip.duration || 0} Days | **Travelers:** ${trip.travelers || 1}\n\n`;
  md += `> ${trip.summary || ''}\n\n`;
  md += `--- \n\n## Daily Itinerary Schedule\n\n`;

  (itinerary.days || []).forEach(day => {
    md += `### Day ${day.day}: ${day.title} (${day.location})\n`;
    md += `*${day.summary}*\n\n`;

    (day.stops || []).forEach(stop => {
      md += `- **${stop.time}** - **${stop.title}** (${stop.category || 'Sightseeing'})\n`;
      md += `  - Duration: ${stop.durationMinutes} mins | Est. Cost: ${stop.estimatedCost}\n`;
      md += `  - ${stop.description}\n`;
      if (stop.tips && stop.tips.length > 0) {
        md += `  - *Tip: ${stop.tips.join(' ')}*\n`;
      }
      md += `\n`;
    });
  });

  const dataStr = 'data:text/markdown;charset=utf-8,' + encodeURIComponent(md);
  const anchor = document.createElement('a');
  const filename = `${(trip.title || 'trip').toLowerCase().replace(/[^a-z0-9]/g, '_')}.md`;
  anchor.setAttribute('href', dataStr);
  anchor.setAttribute('download', filename);
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
}
