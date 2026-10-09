/**
 * Safely extracts raw JSON string from potentially messy LLM text output.
 * Handles markdown triple backticks (```json ... ```), single backticks,
 * and extracts substring bounded by first '{' and last '}'.
 */
function extractJson(rawText) {
  if (!rawText || typeof rawText !== 'string') {
    throw new Error('EMPTY_RESPONSE: The AI model returned an empty or invalid text response.');
  }

  let cleaned = rawText.trim();

  // Strip markdown code fences
  if (cleaned.includes('```')) {
    cleaned = cleaned.replace(/```json\s*/gi, '').replace(/```\s*/gi, '');
  }

  // Find first '{' and last '}'
  const firstBrace = cleaned.indexOf('{');
  const lastBrace = cleaned.lastIndexOf('}');

  if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
    cleaned = cleaned.substring(firstBrace, lastBrace + 1);
  } else {
    throw new Error('MALFORMED_JSON: Could not find valid JSON object brackets `{ ... }` in AI output.');
  }

  return cleaned;
}

/**
 * Attempts JSON parsing with basic syntax fallback patches (e.g. trailing commas, single quotes)
 */
function safeParseJson(jsonString) {
  try {
    return JSON.parse(jsonString);
  } catch (initialError) {
    // Attempt basic syntax fixups
    const patched = jsonString
      .replace(/,\s*([\]}])/g, '$1') // remove trailing commas before ] or }
      .replace(/'([^'\\]*(\\.[^'\\]*)*)'/g, '"$1"'); // replace single quoted strings with double quotes

    try {
      return JSON.parse(patched);
    } catch (secondError) {
      const msg = initialError instanceof Error ? initialError.message : 'Syntax error';
      throw new Error(`MALFORMED_JSON: Failed to parse JSON response. ${msg}`);
    }
  }
}

module.exports = {
  extractJson,
  safeParseJson,
};
