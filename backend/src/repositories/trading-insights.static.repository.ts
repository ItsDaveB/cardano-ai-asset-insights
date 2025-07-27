import { Service } from "typedi";
import { Storage } from "@google-cloud/storage";
import { TradingInsightsEntity } from "../entities/trading-insights.entity";

const BUCKET_NAME = "cardano-ai-trading-insights";
const FILE_NAME = "trading-insights.json";

type StoredInsight = Omit<TradingInsightsEntity, "created_at"> & {
  created_at: string;
};

@Service()
export class TradingInsightsStaticRepository {
  private storage = new Storage();
  private bucket = this.storage.bucket(BUCKET_NAME);
  private file = this.bucket.file(FILE_NAME);

  private async loadData(): Promise<StoredInsight[]> {
    try {
      const [contents] = await this.file.download();
      return JSON.parse(contents.toString());
    } catch (e: any) {
      if (e.code === 404) return []; // file not found yet
      throw e;
    }
  }

  private async saveData(data: StoredInsight[]) {
    await this.file.save(JSON.stringify(data, null, 2), {
      contentType: "application/json",
    });
  }

  private getNextId(data: StoredInsight[]): number {
    return data.reduce((max, d) => Math.max(max, d.analysis_id), 0) + 1;
  }

  async replaceInsights(newEntries: Partial<TradingInsightsEntity>[], timeframe_hours: string, llm_provider: string) {
    const allInsights = await this.loadData();

    const remainingInsights = allInsights.filter(
      (entry) => !(entry.timeframe_hours === timeframe_hours && entry.llm_provider === llm_provider)
    );

    const now = new Date().toISOString();
    let nextId = this.getNextId(remainingInsights);

    const newFormatted: StoredInsight[] = newEntries.map((data) => ({
      analysis_id: nextId++,
      token_name: data.token_name!,
      token_subject: data.token_subject!,
      llm_provider,
      timeframe_hours,
      full_output: data.full_output!,
      analysis_extract: data.analysis_extract || {},
      created_at: now,
    }));

    const finalData = [...remainingInsights, ...newFormatted];

    console.log(`✅ Replacing ${allInsights.length - remainingInsights.length} old entries`);
    console.log(`🆕 Adding ${newFormatted.length} new entries`);
    console.log(`📄 Final file size: ${finalData.length} insights`);

    await this.saveData(finalData);
  }

  async getLatestTradingInsights(limit: number): Promise<TradingInsightsEntity[]> {
    const insights = await this.loadData();
    return insights
      .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
      .slice(0, limit)
      .map((i) => ({ ...i, created_at: new Date(i.created_at) }));
  }
}
