# TripWise AI — Interactive Editable Travel Planner ✈️🗺️

> **Frontend Internship Assignment Submission**  
> *"Turn your travel idea into an itinerary you can actually edit."*

---

## 🌟 Overview

Calling an AI model is straightforward; turning unreliable LLM output into a reliable, stateful React application where users can manipulate data without unexpected crashes is where engineering rigor matters.

**TripWise AI** is strictly designed around the **No Chatbot** principle. Instead of presenting unstructured text stream paragraphs, it receives natural language travel prompts, validates LLM responses through a multi-layered server pipeline, and renders an interactive React UI where users can:
- 📖 **Expand & collapse** stop details
- ❌ **Remove stops** from any day
- ⬆️⬇️ **Reorder stops** within a day (Move Up / Move Down buttons & keyboard focus)
- ✏️ **Edit stop details** locally
- ➕ **Add custom stops** to any day
- 💾 **Save & restore sessions** from `localStorage`
- 📥 **Export itineraries** as JSON, Markdown, or PDF

> **Critical Architecture Principle**: AI is used exclusively to generate the initial structured JSON. Once received, **React state strictly owns the itinerary**. Reordering, removing, or editing stops occur 100% locally in React state without calling the AI model again.

---

## 🏗️ System Architecture & Data Flow

```
                  ┌─────────────────┐
                  │   User Prompt   │
                  └────────┬────────┘
                           │
                           ▼
                  ┌─────────────────┐
                  │   React Input   │ (TripInput.jsx)
                  └────────┬────────┘
                           │
                           ▼
                  ┌─────────────────┐
                  │ Express API Route│ (POST /api/trips/generate)
                  └────────┬────────┘
                           │
                           ▼
                  ┌─────────────────┐
                  │ Gemini REST API │ (aiService.js)
                  └────────┬────────┘
                           │
                           ▼
                  ┌─────────────────┐
                  │  JSON Extractor │ (jsonExtractor.js)
                  └────────┬────────┘
                           │
                           ▼
                  ┌─────────────────┐
                  │   Zod Schema    │ (tripValidator.js)
                  └────────┬────────┘
                           │
                           ▼
                  ┌─────────────────┐
                  │  Data Normalizer│ (Unique IDs & Defaults)
                  └────────┬────────┘
                           │
                           ▼
                  ┌─────────────────┐
                  │   React State   │ (useTripPlanner.js)
                  └────────┬────────┘
                           │
             ┌─────────────┼─────────────┐
             ▼             ▼             ▼
          Expand        Remove        Reorder
             │             │             │
             └─────────────┴─────────────┘
                     LOCAL REACT STATE
```

---

## 🛡️ Bad AI Output & Failure Handling Strategy (20% Evaluation Weight)

LLMs are non-deterministic. TripWise AI implements a 6-layer defense pipeline to guarantee zero application crashes:

1. **System Prompt Constraint**: Instructs the model to output raw JSON with no markdown fences or intro text.
2. **Extraction Layer (`jsonExtractor.js`)**: Strips markdown code blocks (```json ... ```) and extracts text bounded by `{` and `}`.
3. **Syntactic Repair**: Automatically fixes trailing commas and unquoted key strings before throwing errors.
4. **Zod Schema Validation (`tripValidator.js`)**: Validates the shape of `trip` and `days`. If required fields are missing, throws `INVALID_SCHEMA` rather than allowing broken data into React state.
5. **Data Normalization**: Enforces unique stop IDs, validates durations, and assigns fallback defaults.
6. **Error Boundaries & Controlled UI**: Displays friendly, non-cryptic error cards (`ErrorState.jsx`) with instant retry controls and mock fallback mode.

---

## ⚡ Stale Request Protection & Race Condition Guard

**Scenario**: A user requests *"5 days in Japan"*. Before it completes, they quickly type *"3 days in Paris"* and click Generate again.

**Solution**:
1. **`AbortController`**: When a new request starts, `abortControllerRef.current.abort()` instantly cancels any pending HTTP fetch.
2. **Incremental Request ID Counter (`activeRequestId`)**: Each request captures a version integer. When an async promise resolves, it verifies `capturedReqId === activeRequestId.current`. If a newer request was dispatched, the stale response is discarded immediately and never overwrites React state.

---

## 🧪 Evaluator Failure Simulator (Test Bench)

Evaluators can click the **"Test Failures"** button in the header navigation to test real-time handling for:
- ❌ **Malformed JSON**
- 🐛 **Invalid Schema**
- ⏱️ **Request Timeout (25s)**
- 💥 **500 Server Error**
- ❓ **Empty Response Payload**

---

## 🛠️ Tech Stack

- **Frontend**: React 18, Vite, JavaScript (JSX), Tailwind CSS v3, Lucide React icons.
- **Backend**: Node.js, Express.js (Port 5000), CORS, Dotenv.
- **Validation**: Zod.
- **AI Service**: Google Gemini API (`gemini-2.5-flash`), with built-in smart mock fallback generator.

---

## 🚀 Local Setup & Running Instructions

### Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher

### Installation & Launch Commands

```bash
# 1. Clone the repository
git clone https://github.com/dhruvgupta9713-a11y/trip-planner-Ai.git
cd trip-planner-Ai

# 2. Install all dependencies (root, server, and client)
npm run install:all

# 3. (Optional) Set up Gemini API key in server/.env
echo "AI_API_KEY=your_gemini_api_key_here" > server/.env

# 4. Start concurrent development server (Server: port 5000, Client: port 3000)
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

> **Note for Evaluators**: If no `AI_API_KEY` is provided, the backend automatically uses its **Smart Mock Fallback Generator**, allowing you to test all prompts, reordering, stop editing, and failure modes without needing an API key!

---

## 🤖 AI Usage Note (Transparency)

In compliance with the assignment instructions:
- AI tools (Antigravity AI Agent & Gemini) were used during development for scaffolding boilerplate, designing Tailwind tokens, drafting Zod schemas, and generating synthetic payloads for malformed JSON testing.
- All final code, React custom hooks, state synchronization, AbortController guards, and Express routing were thoroughly audited, tested, and understood for interview walk-throughs.

---

## ⏱️ Time Spent Breakdown

| Phase | Description | Time Spent |
| :--- | :--- | :--- |
| **Requirements & Architecture** | Reviewing assignment prompt, designing Zod schema & failure strategy | 45 mins |
| **Server Pipeline** | Express server setup, Gemini API service, JSON extraction, Zod validation | 1.5 hours |
| **Frontend Architecture** | Custom hook `useTripPlanner`, `tripApi` service, AbortController stale guards | 1.5 hours |
| **Interactive Components** | Day Cards, Stop Cards, expand/collapse, reordering, removal, inline editing | 2.0 hours |
| **Resilience & Testing** | Evaluator failure simulator, Error Boundaries, responsive mobile polish | 1.0 hour |
| **Documentation** | README.md & INTERVIEW_NOTES.md | 30 mins |
| **Total Time** | | **~6.75 Hours** |

---

## 📌 Known Limitations

1. **Approximate Travel Info**: Estimated durations and costs are generated suggestions; real-time booking requires live Places APIs.
2. **Local Session Scope**: Session persistence uses `localStorage` (no database required for assignment scope).
