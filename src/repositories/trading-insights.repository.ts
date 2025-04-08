import { TradingInsightsEntity } from "../entities/trading-insights.entity";
import { Service } from "typedi";
import { AppDataSource } from "../database/datasource";

const CONFLICT_FIELDS: (keyof TradingInsightsEntity)[] = [
  "token_subject",
  "llm_provider",
  "timeframe_hours",
];

@Service()
export class TradingInsightsRepository {
  private readonly repo = AppDataSource.getRepository(TradingInsightsEntity);

  async upsertInsight(data: Partial<TradingInsightsEntity>) {
    return this.repo.upsert(data, CONFLICT_FIELDS);
  }

  getLatestTradingInsights(limit: number) {
    return this.repo.find({
      order: { created_at: "DESC" },
      take: limit,
    });
  }
}
