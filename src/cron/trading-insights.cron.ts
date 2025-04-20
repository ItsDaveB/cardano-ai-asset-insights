import cron from "node-cron";
import { Service } from "typedi";
import TradingInsightsService from "../services/trading-data.service";
import TradingDataValidationService from "../services/trading-data-validation.service";
import { LLMService } from "../services/llm/llm.service";
import { TradingInsightsRepository } from "../repositories/trading-insights.repository";
import logger from "../utils/logger";

@Service()
export class TradingInsightsCronJob {
  constructor(
    private tradingInsightsService: TradingInsightsService,
    private tradingDataValidationService: TradingDataValidationService,
    private llmService: LLMService,
    private tradingInsightsRepository: TradingInsightsRepository
  ) {}

  cronSchedule = process.env.CRON_SCHEDULE || "0 1 * * *";

  start() {
    cron.schedule(this.cronSchedule, async () => {
      const startTime = Date.now();
      logger.info("AI Analysis batch process started.");

      try {
        // Step 1: Fetch Trading Data
        const tradingData = await this.tradingInsightsService.fetchTradingData();

        // Step 2: Validate and Pre-process Data
        const tradingDataInput = this.tradingDataValidationService.validate(tradingData);

        // Step 3: Generate AI Insights from all LLM providers
        const tradingInsights = await this.llmService.getInsightsFromAllProviders(tradingDataInput);

        let storedCount = 0;
        // Step 4: Store Analysis Results
        for (const item of tradingInsights) {
          await this.tradingInsightsRepository.upsertInsight({
            token_subject: tradingDataInput.tokenSubject,
            token_name: tradingDataInput.tokenName,
            timeframe_hours: tradingDataInput.timeframeHours,
            full_output: item.result.fullOutput,
            analysis_extract: item.result.analysisExtract,
            llm_provider: item.provider,
          });

          storedCount++;
        }

        const duration = ((Date.now() - startTime) / 1000).toFixed(2);
        logger.info(
          `AI Analysis batch process completed successfully in ${duration} seconds. Upserted ${storedCount} insights.`
        );
      } catch (error) {
        const duration = ((Date.now() - startTime) / 1000).toFixed(2);
        logger.error(`Error during AI Analysis batch process after ${duration} seconds:`, error);
        process.exit(1);
      }
    });
  }
}
