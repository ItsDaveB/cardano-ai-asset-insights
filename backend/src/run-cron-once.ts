import "reflect-metadata";
import dotenv from "dotenv";
import { Container } from "typedi";
import { TradingInsightsCronService } from "./services/trading-insights.cron.service";
import logger from "./utils/logger";

dotenv.config();

(async () => {
  try {
    const cronService = Container.get(TradingInsightsCronService);
    await cronService.runOnce();
    logger.info("✅ Trading insights cron job completed successfully.");
    process.exit(0);
  } catch (error) {
    logger.error("❌ Cron job failed:", error);
    process.exit(1);
  }
})();
