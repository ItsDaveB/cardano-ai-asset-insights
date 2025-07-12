# Cardano AI Asset Insights

AI-generated trading insights for Cardano native assets — delivered through a responsive frontend and a modular backend pipeline. This project combines real-time token data, structured LLM analysis, and powerful visualizations to surface key market signals such as trend, sentiment, and risk-reward balance.

The system is designed for flexibility, supporting multiple data sources and pluggable LLM providers (Gemini 2, 2.5, and others), making it easy to extend, deploy, and adapt across environments.

---

## Overview

Cardano AI Asset Insights is an end-to-end system for intelligent token analysis. It automatically fetches high-volume tokens, processes market data, and runs structured LLM evaluations to produce consistent, schema-driven insights.

A cron-based batch job powers the backend pipeline, using OHLC and volume data to prompt a large language model for analysis. Insights are stored in a database and served through a developer-friendly API. The frontend consumes these insights and renders dynamic, mobile-responsive components with trend summaries, visual charts, and contextual tags.

The backend is fully environment-driven and built for extensibility, with support for alternate data providers, custom insight schemas, and LLM response evaluation using statistical confidence scoring.

---

## Features

- **Automated token selection** using TapTools API (24h top volume)
- **LLM-driven insight generation** via Gemini models (Vertex AI)
- **Flexible prompt schema** for structured, reliable model outputs
- **Multiple response candidates** with confidence selection (avgLogprobs)
- **Custom API** for querying insights with filters and metadata control
- **Reactive UI** built in React and Tailwind, optimized for mobile and desktop
- **Chart visualizations** (radar and bubble charts) for comparative token analysis
- **Support/resistance detection** with confidence scoring
- **Cron-based pipeline** for automated, scheduled analysis
- **Plugin architecture** for data sources and LLM providers
- **Developer-first tooling**: run/debug API, cron, or both with VS Code profiles
- **Fully configurable** via `.env` — including schedule, token count, intervals, cache TTL, DB settings, and LLM project config

---

## Demo

- [Frontend Walkthrough](https://www.youtube.com/watch?v=wwYgbmr8BEw) – Shows the UI displaying AI-generated insights for Cardano tokens.
- [Backend Pipeline Demo](https://youtu.be/dL4XNo5C1Tc) – Demonstrates the full backend process: token selection, LLM analysis, API response, structure etc.

## LLM Provider Integration

The backend supports modular integration with LLM providers. Current implementations include:

- **Gemini 2**
- **Gemini 2.5**

To configure the GCP Gemini provider using Vertex AI, refer to the  
[Vertex AI Setup Guide](./backend/src/services/llm/providers/gcp/docs/GCP-Provider-Setup.md).

To learn how to add and register a new provider, see the  
[Provider Integration Guide](./backend/src/services/llm/providers/docs/Provider-Integration.md).

## Token Selection with TapTools

The app uses the TapTools API to fetch the top-volume Cardano native tokens over the last 24 hours. This ensures that AI analysis focuses on high-activity assets.

- Endpoint: `/api/v1/token/top/volume`
- Configurable via `MAX_TOKENS_TO_ANALYZE`
- Requires `TAPTOOLS_API_KEY` in `.env`

## Running the Application

### 1. Environment Variables

Copy the example env file:

```bash
cp backend/.env.example backend/.env
```

Update required values.

### 2. Start PostgreSQL (Docker)

From the project root:

```bash
docker compose up
```

## 3. Run API Server

The API server must be running before using the frontend or cron jobs.

From the `backend` folder:

```bash
npm install
npm run run:api
```

### 4. Start the Backend Cron

```bash
cd backend
npm install
npm run run:cron
```

### 5. Start the Frontend

```bash
cd frontend/client
yarn install
yarn dev
```

## VS Code Debugging

VS Code launch profiles are included for debugging:

- `Debug API`
- `Debug Cron`
- `Debug API and Cron` (parallel)

Open the Run & Debug panel in VS Code and select a profile to start.

## Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request if you have suggestions or improvements.

## Supporting References

- [LLM Model Research & Evaluation (Milestone 1)](https://github.com/ItsDaveB/ai-trading-insights-design/blob/main/reports/milestone-one/research-and-project-design.md)
  – Comparative analysis of LLMs used to inform schema design and integration strategy.

## License

This project is licensed under the MIT License.
