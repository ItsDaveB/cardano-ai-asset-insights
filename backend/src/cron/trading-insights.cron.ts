import cron from "node-cron";
import { Service } from "typedi";
import TradingDataService from "../services/trading-data.service";
import TradingDataValidationService from "../services/trading-data-validation.service";
import { LLMService } from "../services/llm/llm.service";
import TokenCriteriaService from "../services/token-criteria.service";
import logger from "../utils/logger";
import { TradingInsightsService } from "../services/trading-insights.service";
import { TradingInsightsEntity } from "src/entities/trading-insights.entity";

@Service()
export class TradingInsightsCronJob {
  constructor(
    private tokenCriteriaService: TokenCriteriaService,
    private tradingDataService: TradingDataService,
    private tradingDataValidationService: TradingDataValidationService,
    private llmService: LLMService,
    private tradingInsightsService: TradingInsightsService
  ) {
    this.performTradingInsights();
  }

  cronSchedule = process.env.CRON_SCHEDULE || "0 1 * * *";
  start() {
    cron.schedule(this.cronSchedule, async () => {
      await this.performTradingInsights();
    });
  }

  async performTradingInsights() {
    const startTime = Date.now();
    let storedCount = 0;
    logger.info("AI Analysis batch process started.");

    try {
      const filteredTokens = await this.tokenCriteriaService.fetchTopVolumeTokens();

      const grouped: Record<string, Partial<TradingInsightsEntity>[]> = {};

      for (const token of filteredTokens) {
        const tradingData = await this.tradingDataService.fetchTradingData(token);
        const input = this.tradingDataValidationService.validate(tradingData);
        const insights = await this.llmService.getInsightsFromAllProviders(input);

        for (const insight of insights) {
          const key = `${insight.provider}|${input.timeframeHours}`;
          const entity: Partial<TradingInsightsEntity> = {
            token_subject: input.tokenSubject,
            token_name: input.tokenName,
            timeframe_hours: input.timeframeHours,
            full_output: insight.result.fullOutput,
            analysis_extract: insight.result.analysisExtract,
            llm_provider: insight.provider,
          };

          (grouped[key] ||= []).push(entity);
          storedCount++;
        }
      }

      for (const [key, batchOfEntries] of Object.entries(grouped)) {
        const [provider, timeframe] = key.split("|");
        await this.tradingInsightsService.replaceInsights(batchOfEntries, timeframe, provider);
      }

      const duration = ((Date.now() - startTime) / 1000).toFixed(2);
      logger.info(
        `AI Analysis batch process completed successfully in ${duration} seconds. Upserted ${storedCount} insights.`
      );
      process.exit(0);
    } catch (error) {
      const duration = ((Date.now() - startTime) / 1000).toFixed(2);
      logger.error(`Error during AI Analysis batch process after ${duration} seconds:`, error);
      process.exit(1);
    }
  }
}
