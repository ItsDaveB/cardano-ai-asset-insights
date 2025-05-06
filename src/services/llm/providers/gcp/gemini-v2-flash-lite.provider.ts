import { GoogleAuth } from "google-auth-library";
import { LLMProvider, LLMResult } from "../../../../interfaces/provider.interface";
import axios from "axios";
import { generateGeminiPrompt } from "./gemini-v2-flash-lite.prompt";
import { TradingDataInput } from "../../../../interfaces/trading-data-input.interface";
import { llmInsightResponseSchema } from "../../../../schemas/llm-output-schema";
import { GeminiApiCandidate, GeminiApiResponse } from "./gemini.types";
import logger from "../../../../utils/logger";

export class GeminiV2FlashLiteProvider implements LLMProvider {
  public readonly modelName = "gemini-2.0-flash-lite-001";
  private readonly endpoint = `https://us-central1-aiplatform.googleapis.com/v1/projects/${process.env.GCP_PROJECT_ID}/locations/us-central1/publishers/google/models/${this.modelName}:generateContent`;
  private readonly keyFilePath = "src/services/llm/providers/gcp/gcp-service-account.json";

  async generateInsights(data: TradingDataInput): Promise<LLMResult> {
    const promptText = generateGeminiPrompt({
      tokenName: data.tokenName,
      timeframeHours: data.timeframeHours,
      numberOfIntervals: data.numberOfIntervals,
      ohlcvData: data.ohlcData,
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
    logger.info(`[LLMService] GoogleAuth sucessfully setup, Access Token Received.`);
    logger.info(`[LLMService] Sending request to ${this.modelName}, for token ${data.tokenName}.`);
    const response = await axios.post<GeminiApiResponse>(this.endpoint, requestBody, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    logger.info(`[LLMService] Response received from ${this.modelName}, for token ${data.tokenName}.`);

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
