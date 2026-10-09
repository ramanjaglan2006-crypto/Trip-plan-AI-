/**
 * Client API service for TripWise AI.
 * Handles HTTP requests to Express backend with timeout & AbortController support.
 */

const API_BASE_URL = '/api/trips';

export async function generateTrip(prompt, options = {}) {
  const { signal, simulatedError = 'NONE', apiKey = '' } = options;

  // Timeout guard (25 seconds)
  const timeoutId = setTimeout(() => {
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
    });

    clearTimeout(timeoutId);

    const result = await response.json().catch(() => ({
      success: false,
      error: { code: 'MALFORMED_JSON', message: 'Non-JSON response returned from server.' },
    }));

    if (!response.ok || !result.success) {
      const err = new Error(result.error?.message || 'Failed to generate itinerary.');
      err.code = result.error?.code || 'SERVER_ERROR';
      err.details = result.error?.details;
      throw err;
    }

    return result.data;
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
