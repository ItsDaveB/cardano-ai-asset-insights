import { Router } from "express";
import { Container } from "typedi";
import { TradingInsightsController } from "../controllers/trading-insights.controller";
import { TradingInsightsService } from "../services/trading-insights.service";

const router = Router();

const tradingInsightsService = Container.get(TradingInsightsService);
const controller = new TradingInsightsController(tradingInsightsService);

router.get("/trading-insights", controller.getAllTradingInsights.bind(controller));

export default router;
