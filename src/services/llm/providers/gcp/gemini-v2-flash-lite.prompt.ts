import { OHLCVEntry } from "src/interfaces/trading-data-input.interface";

interface GeminiPromptData {
  tokenName: string;
  timeframeHours: string;
  numberOfIntervals: number;
  ohlcvData: OHLCVEntry[];
}

export const generateGeminiPrompt = ({
  tokenName,
  timeframeHours,
  numberOfIntervals,
  ohlcvData,
}: GeminiPromptData): string => {
  const formattedData = JSON.stringify(ohlcvData, null, 2);

  return `
You are an expert financial analyst specializing in cryptocurrency trading and market behavior.

Analyze the full OHLCV data for the following Cardano native asset:

Token: ${tokenName}  
Timeframe: ${timeframeHours} hours over ${numberOfIntervals} intervals.

OHLCV Data:
${formattedData}

Based on the provided data, generate a structured JSON response that strictly adheres to the system-defined schema passed with this request.  
- Do not include any commentary or output outside the JSON.  
- Populate all fields as thoroughly as possible, respecting the specified types and maximum item counts defined in the schema.  
- If a value cannot be determined confidently, provide a best-effort estimate or use "None" or null where appropriate.
`.trim();
};
