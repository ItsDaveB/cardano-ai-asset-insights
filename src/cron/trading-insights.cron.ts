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
      logger.info("AI Analysis batch process started.");

      try {
        // Step 1: Fetch Trading Data
        const tradingData = await this.tradingInsightsService.fetchTradingData();

        // Step 2: Validate and Pre-process Data
        const tradingDataInput = this.tradingDataValidationService.validate(tradingData);

        // Step 3: Generate AI Insights from all LLM providers
        const llmResultsArray = await this.llmService.getInsightsFromAllProviders(tradingDataInput);

        // Step 4: Store Analysis Results
        for (const item of llmResultsArray) {
          await this.tradingInsightsRepository.save({
            token_subject: tradingDataInput.tokenSymbol,
            timeframe_hours: tradingDataInput.timeframeHours,
            full_output: item.result.fullOutput,
            analysis_extract: item.result.analysisExtract,
            llm_provider: item.provider,
          });
        }

        logger.info("AI Analysis batch process completed successfully.");
      } catch (error) {
        logger.error("Error during AI Analysis batch process:", error);
        throw error;
      }
    });
  }
}
