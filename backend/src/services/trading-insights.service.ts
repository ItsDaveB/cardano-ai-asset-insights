import { Service } from "typedi";
import { TradingInsightsRepository } from "../repositories/trading-insights.repository";
import { TradingInsightsEntity } from "../entities/trading-insights.entity";
import { TradingInsightsStaticRepository } from "../repositories/trading-insights.static.repository";
import { initializeDatabase } from "../database/connection";

@Service()
export class TradingInsightsService {
  private readonly tradingInsightRepository: TradingInsightsRepository | TradingInsightsStaticRepository;

  constructor(
    private readonly tradingInsightsRepository: TradingInsightsRepository,
    private readonly tradingInsightsStaticRepository: TradingInsightsStaticRepository
  ) {
    this.tradingInsightRepository = this.chooseStorageBackend();
  }

  private chooseStorageBackend() {
    const useStaticData = process.env.USE_STATIC_DATA === "true";
    if (!useStaticData) initializeDatabase();
    return useStaticData ? this.tradingInsightsStaticRepository : this.tradingInsightsRepository;
  }

  async fetchRecentTradingInsights(limit = 10): Promise<TradingInsightsEntity[]> {
    return this.tradingInsightRepository.getLatestTradingInsights(limit);
  }

  async replaceInsights(data: Partial<TradingInsightsEntity>[], timeframe_hours: string, llm_provider: string) {
    if (!data.length) {
      throw new Error("No insights provided to replace.");
    }

    return this.tradingInsightRepository.replaceInsights(data, timeframe_hours, llm_provider);
  }
}
