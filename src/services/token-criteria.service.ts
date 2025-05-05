import axios from "axios";
import { TopVolumeToken } from "../interfaces/top-volume.token";
import { Service } from "typedi";

@Service()
export class TokenCriteriaService {
  private readonly endpoint = "https://openapi.taptools.io/api/v1/token/top/volume";

  async fetchTopVolumeTokens(): Promise<TopVolumeToken[]> {
    try {
      const maxTokensToAnalyze = process.env.MAX_TOKENS_TO_ANALYZE ?? "15";
      const apiKey = process.env.TAPTOOLS_API_KEY;

      console.log("[TokenCriteria] Fetching top volume tokens");
      console.log("[TokenCriteria] Endpoint:", this.endpoint);
      console.log("[TokenCriteria] Params:", {
        timeframe: "24h",
        page: 1,
        perPage: maxTokensToAnalyze,
      });

      if (!apiKey) {
        console.warn("[TokenCriteria] TAPTOOLS_API_KEY is not set");
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

      console.log(`[TokenCriteria] Successfully fetched ${tokens.length} tokens`);

      return tokens;
    } catch (error) {
      console.error("[TokenCriteria] Error fetching top volume tokens:", error);
      throw new Error("Failed to fetch top volume tokens");
    }
  }
}

export default TokenCriteriaService;
