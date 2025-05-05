import axios from "axios";
import { Service } from "typedi";
import { OHLCVEntry, TradingDataInput } from "../interfaces/trading-data-input.interface";
import { TopVolumeToken } from "src/interfaces/top-volume.token";

@Service()
export class TradingDataService {
  async fetchTradingData(topVolumeToken: TopVolumeToken): Promise<TradingDataInput> {
    try {
      const interval = process.env.OHLC_INTERVAL ?? "4h";
      const daysOfTradingData = process.env.OHLC_DAYS ?? "21";
      const url = `https://openapi.taptools.io/api/v1/token/ohlcv?unit=${topVolumeToken.unit}&interval=${interval}&numIntervals=${daysOfTradingData}`;

      console.log(`[TradingData] Fetching OHLCV data for token: ${topVolumeToken.ticker}`);
      console.log(`[TradingData] Endpoint: ${url}`);

      const response = await axios.get(url, {
        headers: {
          "x-api-key": process.env.TAPTOOLS_API_KEY,
        },
      });

      const responseData = response.data;

      console.log(`[TradingData] Received ${responseData.length} OHLCV entries for ${topVolumeToken.ticker}`);

      const data: TradingDataInput = {
        tokenName: topVolumeToken.ticker ?? "Unknown",
        tokenSubject: topVolumeToken.unit ?? "",
        timeframeHours: interval,
        daysOfData: daysOfTradingData,
        ohlcData: responseData.map((item: OHLCVEntry) => ({
          time: item.time,
          open: item.open,
          high: item.high,
          low: item.low,
          close: item.close,
          volume: item.volume,
        })),
      };

      return data;
    } catch (error) {
      console.error(`[TradingData] Error fetching OHLCV data for ${topVolumeToken.ticker}:`, error);
      throw new Error("Failed to fetch trading data");
    }
  }
}

export default TradingDataService;
