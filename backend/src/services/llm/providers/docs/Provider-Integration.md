# LLM Provider Integration

This document outlines how to configure and extend LLM providers in the **Cardano AI Asset Insights** project. The system uses a plug-and-play architecture to support multiple large language models through a unified interface.

---

## Current Supported Providers

The following LLMs are currently integrated:

- **Gemini 2**
- **Gemini 2.5**

To configure Gemini with Vertex AI, refer to the detailed setup documentation:

`/backend/src/services/llm/providers/gcp/docs`

## Core Service: `LLMService`

All providers are registered and managed inside:

`/backend/src/services/llm/llm.service.ts`

This service:

- Instantiates and stores each provider
- Calls all providers in parallel
- Collects and returns model responses for UI rendering

## Adding a New LLM Provider

To integrate a new provider, follow these steps:

### 1. Create a Provider Class

Implement a new class under:

`/backend/src/services/llm/providers/<your-provider>/`

The class must implement the `LLMProvider` interface with a `generateInsights()` method.

Add a static `modeName` to uniquely identify the provider:

```ts
export class YourProvider implements LLMProvider {
  static modeName = "your-provider-id";

  async generateInsights(data: TradingDataInput): Promise<InsightOutput> {
    // Logic to call out to the LLM here.
  }
}
```

### 2. Register the Provider in `LLMService`

In `llm.service.ts`, instantiate and register the new provider:

```ts
const yourProvider = new YourProvider();

this.providers = {
  ...,
  [YourProvider.modeName]: yourProvider,
};
```
