const { generateTripItinerary } = require('../services/aiService');

async function handleGenerateTrip(req, res) {
  try {
    const { prompt, simulatedError = 'NONE', apiKey } = req.body || {};

    if (!prompt || typeof prompt !== 'string' || prompt.trim().length === 0) {
      return res.status(400).json({
        success: false,
        error: {
          code: 'INVALID_INPUT',
          message: 'Please enter a valid trip description or topic to get started.',
        },
      });
    }

    if (prompt.trim().length > 2000) {
      return res.status(400).json({
        success: false,
        error: {
          code: 'INVALID_INPUT',
          message: 'Trip description is too long (maximum 2000 characters).',
        },
      });
    }

    const itineraryData = await generateTripItinerary({
      prompt: prompt.trim(),
      simulatedError,
      apiKey,
    });

    return res.status(200).json({
      success: true,
      data: itineraryData,
    });
  } catch (err) {
    const errorMsg = err instanceof Error ? err.message : 'An unexpected error occurred';
    console.error('Trip Controller Failure:', errorMsg);

    let statusCode = 500;
    let code = 'SERVER_ERROR';
    let userMessage = 'Unable to generate your itinerary right now. Please try again.';

    if (errorMsg.includes('MALFORMED_JSON')) {
      statusCode = 502;
      code = 'MALFORMED_JSON';
      userMessage = 'The AI model returned an unparseable response. Fail-safe handler intercepted.';
    } else if (errorMsg.includes('INVALID_SCHEMA')) {
      statusCode = 502;
      code = 'INVALID_SCHEMA';
      userMessage = 'The AI model output did not match the expected itinerary structure.';
    } else if (errorMsg.includes('EMPTY_RESPONSE')) {
      statusCode = 502;
      code = 'EMPTY_RESPONSE';
      userMessage = 'The AI model returned an empty payload. Please retry.';
    } else if (errorMsg.includes('TIMEOUT')) {
      statusCode = 408;
      code = 'AI_TIMEOUT';
      userMessage = 'The AI itinerary request timed out after 25 seconds.';
    }

    return res.status(statusCode).json({
      success: false,
      error: {
        code,
        message: userMessage,
        details: errorMsg,
      },
    });
  }
}

module.exports = {
  handleGenerateTrip,
};
