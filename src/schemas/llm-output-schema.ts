export const llmInsightResponseSchema = {
  type: "object",
  properties: {
    analysis_extract: {
      type: "object",
      properties: {
        technical_trend: {
          type: "string",
          enum: ["Bullish", "Bearish", "Neutral"],
        },
        technical_comment: {
          type: "string",
        },
        sentiment_score: {
          type: "string",
          enum: ["Positive", "Neutral", "Negative"],
        },
        sentiment_comment: {
          type: "string",
        },
        volatility_level: {
          type: "string",
          enum: ["High", "Medium", "Low"],
        },
        volatility_comment: {
          type: "string",
        },
        volume_trend: {
          type: "string",
          enum: ["Increasing", "Decreasing", "Flat"],
        },
        volume_comment: {
          type: "string",
        },
        pattern_signal: {
          type: "string",
          enum: ["Breakout", "Fakeout", "Reversal", "Consolidation", "None"],
        },
        pattern_comment: {
          type: "string",
        },
        general_summary: {
          type: "string",
        },
        action_suggestion: {
          type: "string",
          enum: ["Buy", "Sell", "Hold", "Watch", "None"],
        },
      },
      required: [
        "technical_trend",
        "technical_comment",
        "sentiment_score",
        "sentiment_comment",
        "volatility_level",
        "volatility_comment",
        "volume_trend",
        "volume_comment",
        "pattern_signal",
        "pattern_comment",
        "general_summary",
        "action_suggestion",
      ],
    },
    full_output: {
      type: "string",
    },
  },
  required: ["analysis_extract", "full_output"],
};
