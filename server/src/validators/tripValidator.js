const { z } = require('zod');

const StopSchema = z.object({
  id: z.string().min(1).default(() => `stop-${Math.random().toString(36).substring(2, 9)}`),
  time: z.string().default('10:00 AM'),
  title: z.string().min(1, 'Stop title is required'),
  description: z.string().default('Explore location and enjoy local highlights.'),
  durationMinutes: z.number().int().positive().default(90),
  category: z.string().default('Culture'),
  estimatedCost: z.union([z.number(), z.string()]).transform(val => typeof val === 'number' ? `$${val}` : val).default('$15'),
  tips: z.array(z.string()).default([]),
});

const DaySchema = z.object({
  day: z.number().int().positive(),
  title: z.string().default('Day Highlights'),
  location: z.string().default('City Center'),
  summary: z.string().default('Full day of planned activities.'),
  stops: z.array(StopSchema).default([]),
});

const TripMetadataSchema = z.object({
  title: z.string().min(1, 'Trip title is required'),
  destination: z.string().min(1, 'Destination is required'),
  duration: z.number().int().positive().default(3),
  travelers: z.number().int().positive().default(2),
  summary: z.string().default('A customized travel itinerary created for your trip.'),
});

const TripItinerarySchema = z.object({
  trip: TripMetadataSchema,
  days: z.array(DaySchema).min(1, 'Itinerary must contain at least one day'),
});

/**
 * Validates and normalizes itinerary object against Zod schema
 */
function validateAndNormalizeTrip(data) {
  const result = TripItinerarySchema.safeParse(data);

  if (!result.success) {
    const issues = result.error.issues.map(i => `${i.path.join('.')}: ${i.message}`).join('; ');
    throw new Error(`INVALID_SCHEMA: AI output failed Zod schema validation. Details: ${issues}`);
  }

  const validData = result.data;

  // Ensure unique IDs across all stops
  const usedIds = new Set();
  validData.days = validData.days.map((dayObj, dayIdx) => ({
    ...dayObj,
    day: dayObj.day || dayIdx + 1,
    stops: (dayObj.stops || []).map((stopObj, stopIdx) => {
      let uniqueId = stopObj.id || `day${dayIdx + 1}-stop${stopIdx + 1}`;
      if (usedIds.has(uniqueId)) {
        uniqueId = `day${dayIdx + 1}-stop${stopIdx + 1}-${Math.random().toString(36).substring(2, 6)}`;
      }
      usedIds.add(uniqueId);

      return {
        ...stopObj,
        id: uniqueId,
        time: stopObj.time || '10:00 AM',
        durationMinutes: stopObj.durationMinutes || 90,
        category: stopObj.category || 'Sightseeing',
        estimatedCost: String(stopObj.estimatedCost || '$15'),
        tips: Array.isArray(stopObj.tips) ? stopObj.tips : [],
      };
    }),
  }));

  return validData;
}

module.exports = {
  TripItinerarySchema,
  validateAndNormalizeTrip,
};
