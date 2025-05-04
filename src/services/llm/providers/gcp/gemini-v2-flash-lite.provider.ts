import { GoogleAuth } from "google-auth-library";
import { LLMProvider, LLMResult } from "../../../../interfaces/provider.interface";
import axios from "axios";
import { generateGeminiPrompt } from "./gemini-v2-flash-lite.prompt";
import { TradingDataInput } from "../../../../interfaces/trading-data-input.interface";
import { llmInsightResponseSchema } from "../../../../schemas/llm-output-schema";
import { GeminiApiCandidate, GeminiApiResponse } from "./gemini.types";

export class GeminiV2FlashLiteProvider implements LLMProvider {
  public readonly modelName = "gemini-2.0-flash-lite-001";
  private readonly endpoint = `https://us-central1-aiplatform.googleapis.com/v1/projects/${process.env.GCP_PROJECT_ID}/locations/us-central1/publishers/google/models/${this.modelName}:generateContent`;
  private readonly keyFilePath = "src/services/llm/providers/gcp/gcp-service-account.json";
  // async generateInsights(data: any, instruction?: string): Promise<LLMResult> {
  //   const mockExtract = {
  //     resistance_levels: [43250, 44500, 46000],
  //     support_levels: [41000, 39800],
  //     trend: "bullish",
  //     momentum_score: parseFloat((Math.random() * (1 - 0.7) + 0.7).toFixed(2)), // 0.7–1.0
  //     volatility: "moderate",
  //     key_takeaways: "Price is trending upward with strong momentum. Watch for resistance at 44500.",
  //   };

  //   const mockFullOutput = `
  //     The market trend for ${data.tokenSymbol || "the token"} appears to be bullish.
  //     Resistance levels are at ${mockExtract.resistance_levels.join(", ")},
  //     while support can be found around ${mockExtract.support_levels.join(", ")}.
  //     Momentum is strong with a score of ${mockExtract.momentum_score}, and volatility is ${mockExtract.volatility}.
  //   `;

  //   return {
  //     analysisExtract: mockExtract,
  //     fullOutput: mockFullOutput.trim(),
  //     llmProvider: this.modelName,
  //   };
  // }

  async generateInsights(data: TradingDataInput): Promise<LLMResult> {
    const promptText = generateGeminiPrompt({
      token_name: data.tokenName,
      timeframe_hours: data.timeframeHours,
      formatted_ohlcv_data: data.ohlcData,
    });

    const requestBody = {
      contents: [{ role: "user", parts: [{ text: promptText }] }],
      generationConfig: {
        responseMimeType: "application/json",
        responseSchema: llmInsightResponseSchema,
        temperature: 0.7,
        maxOutputTokens: 1024,
        topP: 0.8,
        topK: 40,
      },
    };

    const accessToken = await this.getAccessToken();
    const response = await axios.post<GeminiApiResponse>(this.endpoint, requestBody, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    const candidates: GeminiApiCandidate[] = response.data.candidates ?? [];

    const parsedCandidates = candidates.map((candidate) => ({
      avgLogprobs: candidate.avgLogprobs ?? -Infinity,
      text: candidate.content?.parts?.[0].text,
    }));

    const candidatePrioritizedByConfidence = parsedCandidates.sort(
      (a, b) => (b.avgLogprobs ?? 0) - (a.avgLogprobs ?? 0)
    )[0];

    const text: string = candidatePrioritizedByConfidence.text ?? "";
    const parsedOutput = JSON.parse(text);

    return {
      analysisExtract: parsedOutput.analysis_extract,
      fullOutput: text,
    };
  }

  private async getAccessToken(): Promise<string> {
    const auth = new GoogleAuth({
      keyFile: this.keyFilePath,
      scopes: "https://www.googleapis.com/auth/cloud-platform",
    });

    const client = await auth.getClient();
    const accessTokenResponse = await client.getAccessToken();
    return accessTokenResponse.token!;
  }
}
