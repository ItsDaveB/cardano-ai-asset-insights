import { Request, Response, NextFunction } from "express";
import { TradingInsightsService } from "../services/trading-insights.service";
import cache from "../utils/cache";
import logger from "../utils/logger";

export class TradingInsightsController {
  constructor(private readonly tradingInsightsService: TradingInsightsService) {}

  getAllTradingInsights = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const limit = parseInt(req.query.limit as string, 10) || 10;
      const cacheKey = `trading-insights:${limit}`;

      const cachedData = cache.get(cacheKey);
      if (cachedData) {
        const ttl = cache.getTtl(cacheKey);
        const timeLeftSeconds = ttl ? Math.max(0, Math.floor((ttl - Date.now()) / 1000)) : 0;
        const timeLeftMinutes = (timeLeftSeconds / 60).toFixed(1);

        logger.info(
          `[CACHE] Retrieved trading insights from cache (limit=${limit}), TTL: ${timeLeftMinutes} minute(s) left`
        );

        res.status(200).json(cachedData);
        return;
      }

      const insights = await this.tradingInsightsService.fetchRecentTradingInsights(limit);

      cache.set(cacheKey, insights);
      const cacheTTLMinutes = (3600 / 60).toFixed(0);

      logger.info(`[CACHE] Stored trading insights in cache (limit=${limit}) for ${cacheTTLMinutes} minute(s)`);
      res.status(200).json(insights);

      return;
    } catch (error) {
      next(error);
      return;
    }
  };
}
