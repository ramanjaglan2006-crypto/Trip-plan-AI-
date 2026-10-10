# TripWise AI — Interview Preparation & Architecture Notes

This document provides concise, engineering-focused answers to anticipated interviewer questions regarding the architecture, failure handling, React state model, and security of TripWise AI.

---

## 1. Core Architecture & Data Flow

### Q1: What is the core data flow of the application?
**Answer:**
```
User Input 
   ↓ 
React Validation (TripInput.jsx) 
   ↓ 
POST /api/trips/generate 
   ↓ 
Express Route → Controller (tripController.js) 
   ↓ 
AI Service (aiService.js) → Gemini REST API 
   ↓ 
Raw LLM Text Output 
   ↓ 
JSON Extraction (jsonExtractor.js) 
   ↓ 
JSON.parse() with Syntax Repair 
   ↓ 
Zod Schema Validation (tripValidator.js) 
   ↓ 
Data Normalization & Unique ID Assignment 
   ↓ 
React State (useTripPlanner.js) 
   ↓ 
Interactive Component Tree (ItineraryTimeline, DayCard, StopCard) 
   ↓ 
Local State Mutations (Expand, Remove, Reorder, Edit — NO AI calls!)
```

### Q2: Why is the API key kept strictly on the backend?
**Answer:**
Shipping API keys in client-side code (e.g. Vite environment variables or browser bundles) exposes them to malicious extraction via developer tools or network inspection. Routing LLM calls through an Express backend ensures the API key remains encrypted in server environment variables (`.env`).

### Q3: Why is this NOT a chatbot?
**Answer:**
Chatbots present unstructured text stream paragraphs in conversational bubbles. TripWise AI uses LLMs strictly as structured data generators. Once the AI returns JSON matching our Zod schema, the LLM is decoupled and React takes 100% ownership of the itinerary state.

---

## 2. Bad AI Output & Failure Handling (20% Evaluation Weight)

### Q4: What happens if the LLM returns invalid JSON?
**Answer:**
We implement a 6-layer defensive pipeline:
1. **System Prompt**: Instructs the model to output raw JSON with no markdown fences.
2. **Extraction Layer**: Strips markdown triple backticks (` ```json `) and extracts text bounded by `{` and `}`.
3. **Syntactic Repair**: Catches syntax errors and fixes trailing commas before throwing a controlled `MALFORMED_JSON` error.
4. **Zod Validation**: Validates the schema. If required fields are missing, throws `INVALID_SCHEMA`.
5. **Normalization**: Enforces unique stop IDs, orders days, and sanitizes strings.
6. **React Error Boundary & ErrorState**: Catches errors, exits loading states, and presents a friendly error banner with a retry button without crashing the app.

### Q5: How do you handle slow or hung AI requests?
**Answer:**
The `tripApi.js` service enforces a 25-second timeout. If exceeded, the request is aborted via `AbortController`, the loading state exits, and a controlled `AI_TIMEOUT` message is presented with retry controls.

### Q6: What happens if an AI request fails after the user has already loaded an itinerary?
**Answer:**
The error state is isolated. We do **not** clear or overwrite the existing `itinerary` state if a subsequent generation fails. The user's existing itinerary remains safe and interactive on screen.

---

## 3. Stale Request Protection & Race Conditions

### Q7: How do you prevent stale requests from overwriting newer user requests?
**Answer:**
We combine two mechanisms in `useTripPlanner.js`:
1. **`AbortController`**: When a new request starts, `abortControllerRef.current.abort()` instantly cancels any pending HTTP fetch.
2. **Incremental `activeRequestId` Counter**: Each request increments a ref (`activeRequestId.current++`). When a fetch promise resolves, it checks if its captured request ID matches `activeRequestId.current`. If a newer request was dispatched in the meantime, the older response is discarded immediately.

---

## 4. React State & Interactive Local Manipulation

### Q8: Why don't stop operations (remove, reorder, edit) call the AI?
**Answer:**
Calling the AI for local UI manipulations would introduce unnecessary network latency, API costs, non-deterministic side-effects, and poor UX. Once generated, React owns the itinerary state. Array operations (splicing, reordering, editing properties) are performed immutably in local React state.

### Q9: How are stop reorders handled immutably?
**Answer:**
```js
const stops = [...dayObj.stops];
const temp = stops[index];
stops[index] = stops[targetIndex];
stops[targetIndex] = temp;
// New array reference assigned to state
```
We never mutate state directly (`trip.days[0].stops.splice(...)`). We construct new object and array references so React's reconciliation engine detects state changes reliably.

### Q10: How does keyboard accessibility work for stop reordering?
**Answer:**
Rather than relying exclusively on drag-and-drop handles (which can be difficult on touchscreens and screen readers), we provide explicit **Move Up** (`↑`) and **Move Down** (`↓`) button controls on every stop card.

---

## 5. Production Considerations

### Q11: What would you add for a production-grade deployment?
**Answer:**
1. **Persistent Database**: MongoDB/PostgreSQL to store user itineraries securely under user accounts.
2. **Authentication**: Auth0 or Firebase Auth.
3. **Rate Limiting**: Express `express-rate-limit` middleware to prevent API abuse.
4. **Caching Layer**: Redis caching for common trip queries (e.g., "5 days in Tokyo").
5. **Real-time Map Integration**: Integration with Google Places & Maps API to display true geographic pins and walking distances.
