import { Repository } from "typeorm";
import { TradingInsightsEntity } from "../entities/trading-insights.entity";
import { Service } from "typedi";

@Service()
export class TradingInsightsRepository extends Repository<TradingInsightsEntity> {
  async getLatestTradingInsights(limit: number): Promise<TradingInsightsEntity[]> {
    return this.find({
      order: { created_at: "DESC" },
      take: limit,
    });
  }
}
