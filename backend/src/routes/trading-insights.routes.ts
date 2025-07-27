import { Router } from "express";
import { Container } from "typedi";
import { TradingInsightsController } from "../controllers/trading-insights.controller";
import { TradingInsightsService } from "../services/trading-insights.service";
import { TradingInsightsCronService } from "../services/trading-insights.cron.service";
import { CronController } from "../controllers/cron-integration.controller";

const router = Router();

const tradingInsightsService = Container.get(TradingInsightsService);
const tradingInsightsController = new TradingInsightsController(tradingInsightsService);

const cronService = Container.get(TradingInsightsCronService);
const cronController = new CronController(cronService);

router.get("/trading-insights", tradingInsightsController.getAllTradingInsights);
router.post("/run-trading-insights", cronController.runTradingInsights);

export default router;
