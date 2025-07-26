import { TradingInsightsEntity } from "../entities/trading-insights.entity";
import { Service } from "typedi";
import { AppDataSource } from "../database/datasource";
import { In, Not } from "typeorm";

const CONFLICT_FIELDS: (keyof TradingInsightsEntity)[] = ["token_subject", "llm_provider", "timeframe_hours"];

@Service()
export class TradingInsightsRepository {
  private readonly repo = AppDataSource.getRepository(TradingInsightsEntity);

  async replaceInsights(newEntries: Partial<TradingInsightsEntity>[], timeframe_hours: string, llm_provider: string) {
    const tokenSubjects = newEntries.map((e) => e.token_subject);

    await this.repo.delete({
      timeframe_hours: String(timeframe_hours),
      token_subject: Not(In(tokenSubjects)),
    });

    for (const entry of newEntries) {
      await this.repo.upsert(entry, CONFLICT_FIELDS);
    }
  }

  getLatestTradingInsights(limit: number) {
    return this.repo.find({
      order: { created_at: "ASC" },
      take: limit,
    });
  }
}
