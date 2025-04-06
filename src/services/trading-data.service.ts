// import axios from 'axios';
import { Service } from "typedi";
import { TradingDataInput } from "../interfaces/trading-data-input.interface";

@Service()
export class TradingDataService {
  // private readonly tradingDataEndpoint = process.env.TRADING_DATA_API_ENDPOINT;

  async fetchTradingData(): Promise<TradingDataInput> {
    try {
      // const response = await axios.get(this.tradingDataEndpoint ?? '');

      const mockData: TradingDataInput = {
        tokenSymbol: "IAG",
        timeframeHours: 12,
        ohlcData: Array.from({ length: 126 }, (_, i) => ({
          timestamp: new Date(Date.now() - i * 4 * 3600000).toISOString(),
          open: 1.2 + Math.random() * 0.1,
          high: 1.25 + Math.random() * 0.1,
          low: 1.15 + Math.random() * 0.1,
          close: 1.22 + Math.random() * 0.1,
          volume: Math.random() > 0.5 ? 10000 + Math.floor(Math.random() * 5000) : undefined,
        })),
      };

      const data = mockData;
      return data;
    } catch (error) {
      console.error("Error fetching trading data:", error);
      throw new Error("Failed to fetch trading data");
    }
  }
}

export default TradingDataService;
