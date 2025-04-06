import { Service } from 'typedi';
import { LLMProvider } from '../../interfaces/provider.interface';
import { GeminiV2FlashLiteProvider } from './providers/gemini.provider';
import { TradingDataInput } from 'src/interfaces/trading-data-input.interface';

@Service()
export class LLMService {
  private providers: Record<string, LLMProvider> = {
    gemini: new GeminiV2FlashLiteProvider(),
  };

  async getInsightsFromAllProviders(data: TradingDataInput, instruction?: string) {
    const providerResults = await Promise.all(
      Object.entries(this.providers).map(async ([providerKey, provider]) => ({
        provider: providerKey,
        result: await provider.generateInsights(data, instruction),
      }))
    );

    return providerResults;
  }
}

export default LLMService;
