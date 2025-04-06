import { Service } from "typedi";
import { TradingInsightsRepository } from "../repositories/trading-insights.repository";
import { TradingInsightsEntity } from "../entities/trading-insights.entity";

@Service()
export class TradingInsightsService {
  constructor(private readonly tradingInsightsRepository: TradingInsightsRepository) {}

  async fetchRecentTradingInsights(limit = 10): Promise<TradingInsightsEntity[]> {
    return this.tradingInsightsRepository.getLatestTradingInsights(limit);
  }
}
