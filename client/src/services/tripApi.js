/**
 * Client API service for TripWise AI.
 * Handles HTTP requests to Express backend with timeout & AbortController support.
 * Includes graceful client fallback for standalone static hosting on Vercel.
 */

import { generateClientMock } from '../utils/clientMock';

const API_BASE_URL = '/api/trips';

export async function generateTrip(prompt, options = {}) {
  const { signal, simulatedError = 'NONE', apiKey = '' } = options;

  // Timeout guard (25 seconds)
  let timedOut = false;
  const timeoutId = setTimeout(() => {
    timedOut = true;
    if (options.onTimeout) options.onTimeout();
  }, 25000);

  try {
    const response = await fetch(`${API_BASE_URL}/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt,
        simulatedError,
        apiKey,
      }),
      signal,
    }).catch(() => null);

    clearTimeout(timeoutId);

    // If backend endpoint responded successfully
    if (response && response.ok) {
      const result = await response.json().catch(() => ({
        success: false,
        error: { code: 'MALFORMED_JSON', message: 'Non-JSON response returned from server.' },
      }));

      if (result.success) {
        return result.data;
      }

      const err = new Error(result.error?.message || 'Failed to generate itinerary.');
      err.code = result.error?.code || 'SERVER_ERROR';
      err.details = result.error?.details;
      throw err;
    }

    // --- Standalone Vercel / Offline Fallback Engine ---
    // If backend is not hosted or returned 404, handle seamlessly in frontend:
    if (simulatedError === 'TIMEOUT') {
      await new Promise((_, reject) => {
        const t = setTimeout(() => {
          const err = new Error('Upstream LLM API timed out after 25s.');
          err.code = 'TIMEOUT';
          reject(err);
        }, 2000);
        if (signal) signal.addEventListener('abort', () => clearTimeout(t));
      });
    }

    if (simulatedError === 'RATE_LIMITED') {
      const err = new Error('Gemini API rate limit exceeded (HTTP 429). Please wait a moment.');
      err.code = 'RATE_LIMITED';
      throw err;
    }

    if (simulatedError === 'MALFORMED_JSON') {
      const err = new Error('LLM output could not be parsed as valid JSON.');
      err.code = 'MALFORMED_JSON';
      throw err;
    }

    if (simulatedError === 'SCHEMA_INVALID') {
      const err = new Error('Trip schema validation failed: missing required stop fields.');
      err.code = 'SCHEMA_INVALID';
      err.details = [{ path: 'days[0].stops[0].durationMinutes', message: 'Required number' }];
      throw err;
    }

    // Simulate short network delay for realistic AI feel
    await new Promise((resolve) => setTimeout(resolve, 1400));

    if (signal?.aborted) {
      const abortErr = new Error('Aborted');
      abortErr.name = 'AbortError';
      throw abortErr;
    }

    return generateClientMock(prompt);
  } catch (err) {
    clearTimeout(timeoutId);
    if (err.name === 'AbortError') {
      console.log('Fetch request cancelled by AbortController');
      throw err;
    }

    // Re-throw with normalized error code
    if (!err.code) {
      err.code = err.message.includes('fetch') ? 'NETWORK_ERROR' : 'UNKNOWN_ERROR';
    }
    throw err;
  }
}
