import cron from "node-cron";
import { Service } from "typedi";
import TradingDataService from "../services/trading-data.service";
import TradingDataValidationService from "../services/trading-data-validation.service";
import { LLMService } from "../services/llm/llm.service";
import { TradingInsightsRepository } from "../repositories/trading-insights.repository";
import TokenCriteriaService from "../services/token-criteria.service";
import logger from "../utils/logger";

@Service()
export class TradingInsightsCronJob {
  constructor(
    private tokenCriteriaService: TokenCriteriaService,
    private tradingDataService: TradingDataService,
    private tradingDataValidationService: TradingDataValidationService,
    private llmService: LLMService,
    private tradingInsightsRepository: TradingInsightsRepository
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
      const filteredTokensByCriteria = await this.tokenCriteriaService.fetchTopVolumeTokens();
      for (const token of filteredTokensByCriteria) {
        const tradingData = await this.tradingDataService.fetchTradingData(token);
        const tradingDataInput = this.tradingDataValidationService.validate(tradingData);
        const tradingInsights = await this.llmService.getInsightsFromAllProviders(tradingDataInput);

        for (const insight of tradingInsights) {
          await this.tradingInsightsRepository.upsertInsight({
            token_subject: tradingDataInput.tokenSubject,
            token_name: tradingDataInput.tokenName,
            timeframe_hours: tradingDataInput.timeframeHours,
            full_output: insight.result.fullOutput,
            analysis_extract: insight.result.analysisExtract,
            llm_provider: insight.provider,
          });

          storedCount++;
        }
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
