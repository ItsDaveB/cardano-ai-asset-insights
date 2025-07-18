import { GoogleAuth } from "google-auth-library";
import { LLMProvider, LLMResult } from "../../../../interfaces/provider.interface";
import axios from "axios";
import { TradingDataInput } from "../../../../interfaces/trading-data-input.interface";
import { llmInsightResponseSchema } from "../../../../schemas/llm-output-schema";
import { GeminiApiCandidate } from "./gemini.types";
import logger from "../../../../utils/logger";
import { generateGeminiPrompt } from "./gemini-v25-flash-lite.prompt";

export class GeminiV25FlashLiteProvider implements LLMProvider {
  public readonly modelName = "gemini-2.5-flash-preview-05-20";
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
      contents: [
        {
          role: "user",
          parts: [{ text: promptText }],
        },
      ],
      // tools: [
      //   {
      //     googleSearch: {},
      //   },
      // ],
      generationConfig: {
        responseMimeType: "application/json",
        responseSchema: llmInsightResponseSchema,
        temperature: 0.3,
        maxOutputTokens: 7500,
        topP: 0.8,
        topK: 40,
        candidateCount: 3,
      },
    };

    const accessToken = await this.getAccessToken();
    logger.info(`[LLMService] GoogleAuth sucessfully setup, Access Token Received.`);
    logger.info(`[LLMService] Sending request to ${this.modelName}, for token ${data.tokenName}.`);
    const response = await axios.post<any>(this.endpoint, requestBody, {
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
