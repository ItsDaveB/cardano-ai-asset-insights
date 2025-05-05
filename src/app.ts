import express from "express";
import cors from "cors";
import tradingInsightsRoutes from "./routes/trading-insights.routes";
import errorHandler from "./middleware/error-handler";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api", tradingInsightsRoutes);
app.use(errorHandler);

export default app;
