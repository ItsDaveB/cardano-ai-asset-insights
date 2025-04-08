export interface TradingDataInput {
  tokenName: string;
  tokenSubject: string;
  timeframeHours: number;
  ohlcData: {
    timestamp: string;
    open: number;
    high: number;
    low: number;
    close: number;
    volume?: number;
  }[];
}
