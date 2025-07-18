import { Request, Response, NextFunction } from "express";
import { TradingInsightsService } from "../services/trading-insights.service";
import cache, { CACHE_TTL_SECONDS } from "../utils/cache";
import logger from "../utils/logger";

export class TradingInsightsController {
  constructor(private readonly tradingInsightsService: TradingInsightsService) {}

  getAllTradingInsights = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const limit = parseInt(req.query.limit as string, 10) || 10;
      const includeMeta = req.query.includeMeta === "true";
      const cacheKey = `trading-insights:${limit}`;

      const cachedData = cache.get(cacheKey);
      const isValidCache = Array.isArray(cachedData) ? cachedData.length > 0 : !!cachedData;

      if (isValidCache) {
        const ttl = cache.getTtl(cacheKey);
        const timeLeftSeconds = ttl ? Math.max(0, Math.floor((ttl - Date.now()) / 1000)) : 0;
        const timeLeftMinutes = (timeLeftSeconds / 60).toFixed(1);

        logger.info(
          `[CACHE] Retrieved trading insights from cache (limit=${limit}), TTL: ${timeLeftMinutes} minute(s) left`
        );

        const response = includeMeta
          ? {
              data: cachedData,
              meta: {
                cached: true,
                expiresInSeconds: timeLeftSeconds,
              },
            }
          : { data: cachedData };

        res.status(200).json(response);
        return;
      }

      const insights = await this.tradingInsightsService.fetchRecentTradingInsights(limit);
      const sortedInsights = [...insights].sort((a, b) => a.llm_provider.localeCompare(b.llm_provider));
      cache.set(cacheKey, sortedInsights);
      logger.info(
        `[CACHE] Stored trading insights in cache (limit=${limit}) for ${(CACHE_TTL_SECONDS / 60).toFixed(1)} minute(s)`
      );

      const response = includeMeta
        ? {
            data: sortedInsights,
            meta: {
              cached: false,
              expiresInSeconds: CACHE_TTL_SECONDS,
            },
          }
        : { data: sortedInsights };

      res.status(200).json(response);
      return;
    } catch (error) {
      next(error);
      return;
    }
  };
}
