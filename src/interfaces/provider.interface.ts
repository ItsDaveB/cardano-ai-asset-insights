import { TradingDataInput } from "./trading-data-input.interface";

export interface LLMProvider {
  readonly modelName: string;
  generateInsights(data: TradingDataInput): Promise<LLMResult>;
}

export interface LLMResult {
  fullOutput: string;
  analysisExtract: Record<string, any>;
}
