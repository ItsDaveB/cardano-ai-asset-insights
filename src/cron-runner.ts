import "reflect-metadata";
import dotenv from "dotenv";
import { initializeDatabase } from "./database/connection";
import { Container } from "typedi";
import { TradingInsightsCronJob } from "./cron/trading-insights.cron";
import logger from "./utils/logger";

dotenv.config();

async function startCronJob() {
  try {
    await initializeDatabase();
    const cronJob = Container.get(TradingInsightsCronJob);
    cronJob.start();
    logger.info("⏰ Cron job started");
  } catch (error) {
    process.exit(1);
  }
}

startCronJob();
