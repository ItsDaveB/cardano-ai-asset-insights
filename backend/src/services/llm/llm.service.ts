import { Service } from "typedi";
import { LLMProvider } from "../../interfaces/provider.interface";
import { GeminiV2FlashLiteProvider } from "./providers/gcp/gemini-v2-flash-lite.provider";
import { TradingDataInput } from "../../interfaces/trading-data-input.interface";
import logger from "../../utils/logger";
import { GeminiV25FlashLiteProvider } from "./providers/gcp/gemini-v25-flash-lite.provider";

@Service()
export class LLMService {
  private providers: Record<string, LLMProvider>;

  constructor() {
    const geminiV2FlashLiteProvider = new GeminiV2FlashLiteProvider();
    const geminiV25FlashLiteProvider = new GeminiV25FlashLiteProvider();

    this.providers = {
      [geminiV2FlashLiteProvider.modelName]: geminiV2FlashLiteProvider,
      [geminiV25FlashLiteProvider.modelName]: geminiV25FlashLiteProvider,
    };

    const supported = Object.keys(this.providers);
    logger.info(`[LLMService] Supported LLM provider integrations: ${supported.join(", ")}`);
  }

  async getInsightsFromAllProviders(data: TradingDataInput) {
    const providerResults = await Promise.all(
      Object.entries(this.providers).map(async ([providerModelName, provider]) => ({
        provider: providerModelName,
        result: await provider.generateInsights(data),
      }))
    );

    return providerResults;
  }
}

export default LLMService;
