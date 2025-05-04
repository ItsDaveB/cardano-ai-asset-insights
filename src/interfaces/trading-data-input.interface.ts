export interface TradingDataInput {
  tokenName: string;
  tokenSubject: string;
  timeframeHours: string;
  daysOfData: string;
  ohlcData: OHLCVEntry[];
}

export interface OHLCVEntry {
  time: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume?: number;
}
