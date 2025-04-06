import "reflect-metadata";
import dotenv from "dotenv";
import express, { Application } from "express";
import cors from "cors";
import tradingInsightsRoutes from "./routes/trading-insights.routes";
import errorHandler from "./middleware/error-handler";
import { Container } from "typedi";
import { TradingInsightsCronJob } from "./cron/trading-insights.cron";
import { AppDataSource } from "./database/datasource";

dotenv.config();
const app: Application = express();

app.use(cors());
app.use(express.json());

app.use("/api", tradingInsightsRoutes);

app.use(errorHandler);

const cronJob = Container.get(TradingInsightsCronJob);
bootstrap();

async function bootstrap() {
  try {
    await AppDataSource.initialize();
    console.log("🚀 Database connected successfully.");
    cronJob.start();
    console.log("⏰ Cron job started.");
  } catch (error) {
    console.error("❌ Error initializing database:", error);
    process.exit(1);
  }
}

export default app;
