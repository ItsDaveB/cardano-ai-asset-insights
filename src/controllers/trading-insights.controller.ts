import { Request, Response, NextFunction } from 'express';
import { TradingInsightsService } from '../services/trading-insights.service';

export class TradingInsightsController {
  constructor(private readonly tradingInsightsService: TradingInsightsService) {}

  getTradingInsights = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const limit = parseInt(req.query.limit as string, 10) || 10;
      const insights = await this.tradingInsightsService.fetchRecentTradingInsights(limit);
      res.status(200).json(insights);
    } catch (error) {
      next(error);
    }
  };
}
