import { OHLCVEntry } from "../../../../interfaces/trading-data-input.interface";

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
You are a financial analysis model trained to evaluate cryptocurrency markets.

Your task is to analyze the following Cardano native asset using the OHLCV data below, and produce a structured JSON output that complies strictly with the schema provided via the system configuration.

---

Token: ${tokenName}  
Timeframe: ${timeframeHours} hours over ${numberOfIntervals} intervals  

OHLCV Data:
${formattedData}

---

### Instructions:
- Use only factual information from the data provided. If necessary, incorporate relevant market context based on the most recent public information online.
- Respond **strictly** in valid JSON format that matches the provided JSON schema so the response can be loaded via JSON.Parse(). Do not include explanations, markdown, or any commentary outside the JSON block.
- Populate all fields, respecting the expected types. If data is uncertain, provide "None" or "null" explicitly.
- Avoid any trailing summaries or opinions after the JSON object.

### Output:
Respond with a single, valid JSON object only — do not include any explanation, markdown, commentary, or newline after the closing brace.

Only return:
{
  "analysis_extract": { ... }
}
Nothing before or after it.

`.trim();
};
