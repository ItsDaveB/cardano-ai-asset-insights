import "reflect-metadata";
import dotenv from "dotenv";
import { initializeDatabase } from "./database/connection";
import { Container } from "typedi";
import { TradingInsightsCronJob } from "./cron/trading-insights.cron";

dotenv.config();

async function startCronJob() {
  try {
    await initializeDatabase();
    const cronJob = Container.get(TradingInsightsCronJob);
    cronJob.start();
    console.log("⏰ Cron job started");
  } catch (error) {
    process.exit(1);
  }
}

startCronJob();
