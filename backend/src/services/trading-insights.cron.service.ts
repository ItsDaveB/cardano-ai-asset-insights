import { Service } from "typedi";
import { TradingInsightsCronJob } from "../cron/trading-insights.cron";
import logger from "../utils/logger";

@Service()
export class TradingInsightsCronService {
  constructor(private readonly cronJob: TradingInsightsCronJob) {}

  public start(): void {
    this.cronJob.start();
    logger.info("Trading Insights cron job started");
  }

  public async runOnce(): Promise<void> {
    await this.cronJob.run();
    logger.info("Trading Insights cron job run once");
  }
}
