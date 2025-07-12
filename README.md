# Cardano AI Asset Insights

AI-powered insights for Cardano native assets, featuring dynamic visualizations, model-driven analysis, and a responsive UI. Built with a plug-and-play architecture for LLM provider integration (Gemini 2, 2.5, and others), this project surfaces key trading signals like trend, sentiment, and risk-reward metrics for any on-chain token.

---

## Overview

Cardano AI Asset Insights bridges structured backend intelligence with a modern, intuitive frontend. The system analyzes on-chain native assets and presents real-time insights via dynamic cards, charts, and rich visualizations. Designed with modularity in mind, the backend supports multiple LLMs, enabling flexible AI experimentation and deployment.

---

## Features

- **Interactive UI** built in React + Tailwind CSS, optimized for desktop and mobile
- **Dynamic asset cards** displaying trend, sentiment, momentum, and risk metrics
- **Chart visualizations** including radar and bubble charts for quick comparison
- **Support/resistance zone detection** with weighted confidence levels
- **Plug-and-play LLM integration** (Gemini 2, 2.5; more via adapter interface)
- **Real-time backend sync** with TanStack Query for efficient fetch & cache
- **Schema-driven rendering** for consistent UI generation from any model output
- **Cron-based pipeline** for automated insight refreshes

---

## Demo

Watch the full demonstration:
[https://www.youtube.com/watch?v=wwYgbmr8BEw](https://www.youtube.com/watch?v=wwYgbmr8BEw)

---

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

### 4. Start the Frontend

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

## License

This project is licensed under the MIT License.

```

```

```

```

```

```
