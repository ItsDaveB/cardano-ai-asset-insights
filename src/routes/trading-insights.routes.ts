import { Router } from 'express';
import { Container } from 'typedi';
import { TradingInsightsController } from '../controllers/trading-insights.controller';
import { TradingInsightsService } from '../services/trading-insights.service';

const router = Router();

const insightsService = Container.get(TradingInsightsService);
const controller = new TradingInsightsController(insightsService);

router.get('/trading-insights', controller.getTradingInsights.bind(controller));

export default router;
