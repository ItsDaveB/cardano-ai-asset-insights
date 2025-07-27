import { Request, Response, NextFunction } from "express";
import logger from "../utils/logger";
import { TradingInsightsCronService } from "src/services/trading-insights.cron.service";

export class CronController {
  constructor(private readonly cronService: TradingInsightsCronService) {}

  runTradingInsights = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      await this.cronService.runOnce();
      res.status(200).json({ message: "Trading insights task completed" });
    } catch (error) {
      logger.error("Cron execution failed", error);
      next(error);
    }
  };
}
