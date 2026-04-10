# Calliope

A multi-agent content pipeline that takes a raw thought dump and produces platform-optimized content for LinkedIn, X, and Blog simultaneously — with a live streaming UI that populates each card as its agent completes.

Named after the Greek muse of eloquence and epic poetry.

![Generating View](docs/generating.png)

## How It Works

You paste a raw idea. The system:

1. **Extracts intent** — identifies the core topic and tone from your input
2. **Researches the topic** — runs a Tavily web search and synthesizes key points, facts, and sources into a structured research result
3. **Writes in parallel** — three writer agents run simultaneously, each adapting the research into platform-native content (LinkedIn post, X thread, long-form blog)
4. **Evaluates and refines** — each platform has its own evaluator agent that scores the output and returns structured feedback. If the score is below threshold, the writer rewrites. This loop runs until quality passes or max iterations is hit
5. **Streams everything live** — SSE streaming populates each card as its pipeline completes, with per-card status indicators (Writing → Evaluating → Done)

No templates. The writers and evaluators operate from prompts — opinionated, platform-specific system prompts with humanizer rules to strip AI patterns.

![Results View](docs/results.png)

## Architecture

```
Raw Input
    │
    ▼
Extraction Node
    │  topic, tone
    ▼
Research Node
    │  Tavily search → structured research result
    │  (key_points, facts, sources, summary)
    ▼
┌─────────────┐   ┌─────────────┐   ┌─────────────┐
│  X Writer   │   │  LinkedIn   │   │    Blog     │  ← Parallel
│             │   │   Writer    │   │   Writer    │
└──────┬──────┘   └──────┬──────┘   └──────┬──────┘
       ▼                 ▼                  ▼
┌─────────────┐   ┌─────────────┐   ┌─────────────┐
│ X Evaluator │   │  LinkedIn   │   │    Blog     │
│             │   │  Evaluator  │   │  Evaluator  │
└──────┬──────┘   └──────┬──────┘   └──────┬──────┘
       │                 │                  │
    score ≥ 8?        score ≥ 8?         score ≥ 8?
    yes → done        yes → done         yes → done
    no → rewrite      no → rewrite       no → rewrite
                   (max 5 iterations)
```

Each writer–evaluator pair runs independently. X might finish in one pass while LinkedIn iterates three times. The frontend reflects this in real time.

## Tech Stack

| Component | Technology | Why |
|-----------|-----------|-----|
| Agent orchestration | LangGraph | StateGraph with parallel nodes and conditional edges |
| LLM | GPT-4o-mini | All nodes — best cost/performance ratio |
| Research | Tavily Search | Fast, structured web search with source attribution |
| Backend | FastAPI + sse-starlette | Async SSE streaming of node-level events |
| Frontend | React + Vite | Component-based, fast dev server |
| Animations | Framer Motion | Page transitions, skeleton → content card crossfade |
| Styling | Tailwind CSS v4 | CSS variable token system, light/dark mode |

## Project Structure

```
Calliope/
├── backend/
│   ├── nodes/
│   │   ├── extraction.py      # Extracts topic + tone from raw input
│   │   ├── research.py        # Tavily search → structured ResearchResult
│   │   ├── writers.py         # Generic writer node + platform wrappers
│   │   └── evaluators.py      # Generic evaluator node + platform wrappers
│   ├── prompts/
│   │   ├── extraction.txt
│   │   ├── research.txt
│   │   ├── humanizer.txt      # Anti-AI-pattern rules injected into all writers
│   │   ├── x_writer.txt
│   │   ├── linkedin_writer.txt
│   │   ├── substack_writer.txt
│   │   ├── x_evaluator.txt
│   │   ├── linkedin_evaluator.txt
│   │   └── substack_evaluator.txt
│   ├── config.yaml            # Models, temperatures, thresholds, research params
│   ├── config.py              # YAML loader, exports config dicts
│   ├── graph.py               # LangGraph StateGraph definition + routing logic
│   ├── llms.py                # ChatOpenAI instances keyed by role
│   ├── main.py                # FastAPI app, SSE endpoint, asyncio queue bridge
│   ├── models.py              # Pydantic models + CopyWriter TypedDict
│   ├── prompts.py             # Prompt file loader with humanizer injection
│   └── requirements.txt
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── InputPage.jsx       # Raw input textarea + invoke button
│   │   │   └── GeneratingPage.jsx  # Streaming view — skeleton cards → live content
│   │   ├── App.jsx                 # View state machine, theme toggle
│   │   └── index.css               # CSS token system, shimmer animation, dark mode
│   ├── index.html
│   └── vite.config.js
└── .env.example
```

## Setup

**Requirements:** Python 3.11+, Node 18+, OpenAI API key, Tavily API key

```bash
git clone <repo-url>
cd Calliope
```

**Backend**

```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt

cp .env.example .env
# Add OPENAI_API_KEY and TAVILY_API_KEY to .env
```

**Frontend**

```bash
cd frontend
npm install
```

**Run**

```bash
# Terminal 1 — backend
cd backend && source venv/bin/activate
uvicorn main:app --reload

# Terminal 2 — frontend
cd frontend
npm run dev
```

Open http://localhost:5173

## Configuration

All tunable parameters live in `config.yaml` — no code changes needed:

```yaml
models:
  extraction: "gpt-4o-mini"
  research: "gpt-4o-mini"
  writer: "gpt-4o-mini"
  evaluator: "gpt-4o-mini"

temperatures:
  writer: 0.7       # Higher = more creative
  evaluator: 0.1    # Lower = more consistent scoring

thresholds:
  score: 8          # Minimum score to accept (out of 10)
  max_iterations: 5 # Hard cap on writer–evaluator loops

research:
  max_results: 3
  search_depth: "basic"
```

## Known Limitations

- Research is a single Tavily pass — fast, but shallower than a multi-step agent loop
- No output persistence — content lives in the browser session only
- Score threshold is a fixed integer; the evaluator LLM interprets it loosely
- Three platforms only — no custom platform support
- Personal OpenAI keys at the free tier (200k TPM) may rate limit on back-to-back runs
