import axios from "axios";
import { TopVolumeToken } from "../interfaces/top-volume.token";
import { Service } from "typedi";
import logger from "../utils/logger";

@Service()
export class TokenCriteriaService {
  private readonly endpoint = "https://openapi.taptools.io/api/v1/token/top/volume";

  async fetchTopVolumeTokens(): Promise<TopVolumeToken[]> {
    try {
      const maxTokensToAnalyze = process.env.MAX_TOKENS_TO_ANALYZE ?? "3";
      const apiKey = process.env.TAPTOOLS_API_KEY;

      logger.info("[TokenCriteria] Fetching top volume tokens");
      logger.info("[TokenCriteria] Endpoint:", this.endpoint);
      logger.info("[TokenCriteria] Params:", {
        timeframe: "24h",
        page: 1,
        perPage: maxTokensToAnalyze,
      });

      if (!apiKey) {
        logger.warn("[TokenCriteria] TAPTOOLS_API_KEY is not set");
      }

      const response = await axios.get(this.endpoint, {
        headers: {
          "x-api-key": apiKey,
        },
        params: {
          timeframe: "24h",
          page: 1,
          perPage: maxTokensToAnalyze,
        },
      });

      const tokens: TopVolumeToken[] = response.data.map((item: any) => ({
        price: item.price,
        ticker: item.ticker,
        unit: item.unit,
        volume: item.volume,
      }));

      const tokenTickers = tokens.map((t) => t.ticker).join(", ");

      logger.info(`[TokenCriteria] Successfully fetched ${tokens.length} tokens: [${tokenTickers}].`);
      return tokens;
    } catch (error) {
      logger.error("[TokenCriteria] Error fetching top volume tokens:", error);
      throw new Error("Failed to fetch top volume tokens");
    }
  }
}

export default TokenCriteriaService;
