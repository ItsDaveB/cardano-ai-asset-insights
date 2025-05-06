import axios from "axios";
import { Service } from "typedi";
import { OHLCVEntry, TradingDataInput } from "../interfaces/trading-data-input.interface";
import { TopVolumeToken } from "src/interfaces/top-volume.token";
import logger from "../utils/logger";

@Service()
export class TradingDataService {
  async fetchTradingData(topVolumeToken: TopVolumeToken): Promise<TradingDataInput> {
    try {
      const interval = process.env.OHLC_INTERVAL ?? "4h";
      const numberOfIntervals = Number(process.env.OHLC_NUM_OF_INTERVALS ?? 126); //  24 ÷ 4 = 6 candles per day, 21 days × 6 = 126 candles.
      const url = `https://openapi.taptools.io/api/v1/token/ohlcv?unit=${topVolumeToken.unit}&interval=${interval}&numIntervals=${numberOfIntervals}`;

      logger.info(
        `[TradingData] Fetching OHLCV data for token: ${topVolumeToken.ticker}, interval: ${interval}, numberOfIntervals: ${numberOfIntervals}.`
      );
      logger.info(`[TradingData] Endpoint: ${url}`);

      const response = await axios.get(url, {
        headers: {
          "x-api-key": process.env.TAPTOOLS_API_KEY,
        },
      });

      const responseData = response.data;

      logger.info(
        `[TradingData] Received ${responseData.length} OHLCV entries for token: ${topVolumeToken.ticker}, interval: ${interval}, numberOfIntervals: ${numberOfIntervals}.`
      );

      const data: TradingDataInput = {
        tokenName: topVolumeToken.ticker ?? "Unknown",
        tokenSubject: topVolumeToken.unit ?? "",
        timeframeHours: interval,
        numberOfIntervals: numberOfIntervals,
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
      logger.error(`[TradingData] Error fetching OHLCV data for ${topVolumeToken.ticker}:`, error);
      throw new Error("Failed to fetch trading data");
    }
  }
}

export default TradingDataService;
