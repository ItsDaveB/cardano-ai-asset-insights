import { LLMProvider, LLMResult } from "../../..//interfaces/provider.interface";

export class GeminiV2FlashLiteProvider implements LLMProvider {
  async generateInsights(data: any, instruction?: string): Promise<LLMResult> {
    const mockExtract = {
      resistance_levels: [43250, 44500, 46000],
      support_levels: [41000, 39800],
      trend: "bullish",
      momentum_score: parseFloat((Math.random() * (1 - 0.7) + 0.7).toFixed(2)), // 0.7–1.0
      volatility: "moderate",
      key_takeaways:
        "Price is trending upward with strong momentum. Watch for resistance at 44500.",
    };

    const mockFullOutput = `
      The market trend for ${data.tokenSymbol || "the token"} appears to be bullish.
      Resistance levels are at ${mockExtract.resistance_levels.join(", ")},
      while support can be found around ${mockExtract.support_levels.join(", ")}.
      Momentum is strong with a score of ${mockExtract.momentum_score}, and volatility is ${
      mockExtract.volatility
    }.
    `;

    return {
      analysisExtract: mockExtract,
      fullOutput: mockFullOutput.trim(),
      llmProvider: "gemini-v2-flash-lite",
    };
  }
}
