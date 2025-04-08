import { Service } from "typedi";
import { LLMProvider } from "../../interfaces/provider.interface";
import { GeminiV2FlashLiteProvider } from "./providers/gemini.provider";
import { TradingDataInput } from "src/interfaces/trading-data-input.interface";

@Service()
export class LLMService {
  private providers: Record<string, LLMProvider>;

  constructor() {
    const geminiV2FlashLiteProvider = new GeminiV2FlashLiteProvider();

    this.providers = {
      [geminiV2FlashLiteProvider.modelName]: geminiV2FlashLiteProvider,
    };
  }

  async getInsightsFromAllProviders(data: TradingDataInput, instruction?: string) {
    const providerResults = await Promise.all(
      Object.entries(this.providers).map(async ([providerModelName, provider]) => ({
        provider: providerModelName,
        result: await provider.generateInsights(data, instruction),
      }))
    );

    return providerResults;
  }
}

export default LLMService;
