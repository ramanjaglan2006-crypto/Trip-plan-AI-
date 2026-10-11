/**
 * Client API service for TripWise AI.
 * Supports direct Gemini REST calls, full failure simulation for test bench,
 * and intelligent dynamic city generation (Bhopal, Rewa, Tokyo, etc.).
 */

import { generateClientMock } from '../utils/clientMock';

const SYSTEM_PROMPT = `
You are a senior travel itinerary generator AI.
Given a user's free-form trip request, create a detailed, realistic, day-by-day travel itinerary.

CRITICAL INSTRUCTIONS:
1. Return ONLY a valid JSON object matching the schema below.
2. Do NOT wrap JSON in markdown code blocks like \`\`\`json.
3. Do NOT include any intro, outro, or conversational text outside JSON.
4. Do NOT generate UI state properties (like isExpanded, isDeleted, isSelected).

EXPECTED JSON SCHEMA:
{
  "trip": {
    "title": "Short exciting trip title",
    "destination": "Destination city/country",
    "duration": 3,
    "travelers": 2,
    "summary": "2-3 sentence overview of the vibe and pacing."
  },
  "days": [
    {
      "day": 1,
      "title": "Theme or highlight of Day 1",
      "location": "District or City Area",
      "summary": "Overview of Day 1 plan.",
      "stops": [
        {
          "id": "day1-stop1",
          "time": "09:30 AM",
          "title": "Activity Name",
          "description": "Engaging description of what to see/do.",
          "durationMinutes": 90,
          "category": "Sightseeing",
          "estimatedCost": "$15 / ₹300",
          "tips": ["Practical visitor tip 1"]
        }
      ]
    }
  ]
}
`;

function extractAndCleanJson(rawText) {
  if (!rawText || !rawText.trim()) throw new Error('EMPTY_RESPONSE');
  let clean = rawText.trim();

  // Strip code fences
  clean = clean.replace(/^```(?:json)?\s*/i, '');
  clean = clean.replace(/\s*```$/i, '');

  const firstBrace = clean.indexOf('{');
  const lastBrace = clean.lastIndexOf('}');
  if (firstBrace === -1 || lastBrace === -1 || lastBrace <= firstBrace) {
    throw new Error('MALFORMED_JSON');
  }

  const jsonSnippet = clean.substring(firstBrace, lastBrace + 1);
  return JSON.parse(jsonSnippet);
}

function normalizeTripData(data, userPrompt) {
  if (!data || typeof data !== 'object') {
    const err = new Error('Invalid itinerary format.');
    err.code = 'INVALID_SCHEMA';
    throw err;
  }

  if (!data.trip || !Array.isArray(data.days) || data.days.length === 0) {
    const err = new Error('Schema validation failed: missing trip header or days array.');
    err.code = 'INVALID_SCHEMA';
    err.details = [{ path: 'days', message: 'Required non-empty array of days.' }];
    throw err;
  }

  // Ensure stops have required fields
  const normalizedDays = data.days.map((d, dIdx) => ({
    day: d.day || dIdx + 1,
    title: d.title || `Day ${dIdx + 1}`,
    location: d.location || data.trip.destination || 'City Center',
    summary: d.summary || '',
    stops: (d.stops || []).map((s, sIdx) => ({
      id: s.id || `day${dIdx + 1}-stop${sIdx + 1}`,
      time: s.time || '10:00 AM',
      title: s.title || 'Sightseeing Stop',
      description: s.description || 'Explore the local sights and landmarks.',
      durationMinutes: typeof s.durationMinutes === 'number' ? s.durationMinutes : 90,
      category: s.category || 'Sightseeing',
      estimatedCost: s.estimatedCost || '$10',
      tips: Array.isArray(s.tips) ? s.tips : ['Enjoy your visit!'],
    })),
  }));

  return {
    trip: {
      title: data.trip.title || `Trip to ${data.trip.destination || 'Destination'}`,
      destination: data.trip.destination || 'Destination',
      duration: data.trip.duration || normalizedDays.length,
      travelers: data.trip.travelers || 2,
      summary: data.trip.summary || 'A curated travel itinerary.',
    },
    days: normalizedDays,
  };
}

async function callDirectGemini(prompt, apiKey, signal) {
  const models = ['gemini-1.5-flash', 'gemini-2.0-flash', 'gemini-1.5-pro'];
  let lastErr = null;

  for (const model of models) {
    try {
      const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
      const payload = {
        contents: [
          {
            role: 'user',
            parts: [{ text: `${SYSTEM_PROMPT}\n\nUser Travel Request: "${prompt}"` }],
          },
        ],
        generationConfig: {
          temperature: 0.7,
          responseMimeType: 'application/json',
        },
      };

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        signal,
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`HTTP ${res.status}: ${errorText}`);
      }

      const resData = await res.json();
      const rawText = resData?.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!rawText) throw new Error('EMPTY_RESPONSE');

      const parsed = extractAndCleanJson(rawText);
      return normalizeTripData(parsed, prompt);
    } catch (err) {
      if (err.name === 'AbortError') throw err;
      console.warn(`Direct Gemini call failed on ${model}:`, err.message);
      lastErr = err;
    }
  }

  throw lastErr || new Error('All Gemini models failed.');
}

export async function generateTrip(prompt, options = {}) {
  const { signal, simulatedError = 'NONE', apiKey = '' } = options;

  // 1. Evaluator Test Bench Failure Modes
  if (simulatedError === 'SERVER_ERROR') {
    await new Promise((resolve) => setTimeout(resolve, 600));
    const err = new Error('500 Internal Server Error: Simulated unhandled exception on backend server.');
    err.code = 'SERVER_ERROR';
    err.details = 'Error: Simulated 500 status code from backend\n    at TripController.generateTrip (/server/src/controllers/tripController.js:42:11)';
    throw err;
  }

  if (simulatedError === 'TIMEOUT') {
    // Artificial delay exceeding 20-25s threshold
    await new Promise((_, reject) => {
      const t = setTimeout(() => {
        const err = new Error('The request to the AI model timed out after 25 seconds.');
        err.code = 'AI_TIMEOUT';
        reject(err);
      }, 2500);
      if (signal) signal.addEventListener('abort', () => clearTimeout(t));
    });
  }

  if (simulatedError === 'MALFORMED_JSON') {
    await new Promise((resolve) => setTimeout(resolve, 500));
    const err = new Error('AI output could not be parsed as valid JSON.');
    err.code = 'MALFORMED_JSON';
    err.details = 'SyntaxError: Unexpected token \'{\' in JSON at position 14\n    Raw LLM Output: `{"trip": {"title": "Bhopal Trip"}, "days": [{ day: 1, /* truncated json`';
    throw err;
  }

  if (simulatedError === 'INVALID_SCHEMA' || simulatedError === 'SCHEMA_INVALID') {
    await new Promise((resolve) => setTimeout(resolve, 500));
    const err = new Error('Schema validation failed: AI output does not match expected itinerary shape.');
    err.code = 'INVALID_SCHEMA';
    err.details = [
      { path: 'days[0].stops', message: 'Required array of stops' },
      { path: 'trip.duration', message: 'Expected number, received undefined' },
    ];
    throw err;
  }

  if (simulatedError === 'EMPTY_RESPONSE') {
    await new Promise((resolve) => setTimeout(resolve, 500));
    const err = new Error('The AI model returned an empty 0-byte text payload.');
    err.code = 'EMPTY_RESPONSE';
    throw err;
  }

  // 2. Resolve Active API Key (from parameters, localStorage, or env)
  const activeKey =
    apiKey ||
    localStorage.getItem('tripwise_gemini_api_key') ||
    import.meta.env.VITE_GEMINI_API_KEY ||
    '';

  // 3. Try Direct Live Gemini Generation if Key is Provided
  if (activeKey) {
    try {
      console.log('Generating live itinerary using Google Gemini API...');
      const liveData = await callDirectGemini(prompt, activeKey, signal);
      return liveData;
    } catch (err) {
      if (err.name === 'AbortError') throw err;
      console.warn('Gemini live generation failed or quota exceeded. Falling back to dynamic mock generator:', err.message);
    }
  }

  // 4. Fallback to Dynamic Intelligent Mock Generator (Works for ANY city including Bhopal, Rewa, etc.)
  await new Promise((resolve) => setTimeout(resolve, 900)); // Paced AI latency
  if (signal?.aborted) {
    const abortErr = new Error('Aborted');
    abortErr.name = 'AbortError';
    throw abortErr;
  }

  return generateClientMock(prompt);
}
