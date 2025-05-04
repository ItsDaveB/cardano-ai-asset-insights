import { OHLCVEntry } from "src/interfaces/trading-data-input.interface";

interface GeminiPromptData {
  token_name: string;
  timeframe_hours: string;
  formatted_ohlcv_data: OHLCVEntry[];
}

export const generateGeminiPrompt = ({
  token_name,
  timeframe_hours,
  formatted_ohlcv_data,
}: GeminiPromptData): string => {
  return `
You are an expert financial analyst specializing in cryptocurrency trading and market behavior.

Analyze the following OHLCV data for a Cardano Native Asset:

Token: ${token_name}
Timeframe: Last ${timeframe_hours}
OHLCV Data:
${formatted_ohlcv_data}

Provide your insights in a structured JSON format that adheres to the system-defined schema. Your analysis should cover trend, sentiment, volatility, volume behavior, pattern signals, and a suggested action.
`.trim();
};
