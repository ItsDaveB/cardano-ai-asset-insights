export const llmInsightResponseSchema = {
  type: "object",
  properties: {
    analysis_extract: {
      type: "object",
      properties: {
        trend_analysis: {
          type: "object",
          properties: {
            technical_trend: {
              type: "string",
              enum: ["Bullish", "Bearish", "Neutral"],
            },
            trend_strength: {
              type: "string",
              enum: ["Strong", "Moderate", "Weak"],
            },
            trend_comment: { type: "string" },
          },
          required: ["technical_trend", "trend_strength", "trend_comment"],
        },

        volatility_analysis: {
          type: "object",
          properties: {
            volatility_level: {
              type: "string",
              enum: ["High", "Medium", "Low"],
            },
            volatility_change: {
              type: "string",
              enum: ["Increasing", "Decreasing", "Stable"],
            },
            volatility_comment: { type: "string" },
          },
          required: ["volatility_level", "volatility_change", "volatility_comment"],
        },

        volume_analysis: {
          type: "object",
          properties: {
            volume_trend: {
              type: "string",
              enum: ["Increasing", "Decreasing", "Flat"],
            },
            relative_volume: {
              type: "string",
              enum: ["Above Average", "Below Average", "Average"],
            },
            volume_comment: { type: "string" },
          },
          required: ["volume_trend", "relative_volume", "volume_comment"],
        },

        pattern_analysis: {
          type: "object",
          properties: {
            pattern_signal: {
              type: "string",
              enum: ["Breakout", "Fakeout", "Reversal", "Consolidation", "None"],
            },
            pattern_name: { type: "string" },
            pattern_comment: { type: "string" },
          },
          required: ["pattern_signal", "pattern_name", "pattern_comment"],
        },

        momentum: {
          type: "object",
          properties: {
            indicator: {
              type: "string",
              enum: ["RSI", "MACD", "Stochastic", "None"],
            },
            status: {
              type: "string",
              enum: ["Overbought", "Oversold", "Neutral"],
            },
            momentum_comment: { type: "string" },
          },
          required: ["indicator", "status", "momentum_comment"],
        },

        support_resistance: {
          type: "object",
          properties: {
            support_levels: {
              type: "array",
              items: { type: "number" },
              maxItems: 3,
            },
            resistance_levels: {
              type: "array",
              items: { type: "number" },
              maxItems: 3,
            },
            levels_comment: { type: "string" },
          },
          required: ["support_levels"],
        },

        price_targets: {
          type: "object",
          properties: {
            short_term: { type: "number" },
            medium_term: { type: "number" },
            long_term: { type: "number" },
            target_comment: { type: "string" },
          },
          required: ["short_term"],
        },

        sentiment_analysis: {
          type: "object",
          properties: {
            sentiment_score: {
              type: "string",
              enum: ["Positive", "Neutral", "Negative"],
            },
            confidence_level: {
              type: "string",
              enum: ["High", "Medium", "Low"],
            },
            sentiment_comment: { type: "string" },
          },
          required: ["sentiment_score", "confidence_level", "sentiment_comment"],
        },

        risk_reward: {
          type: "object",
          properties: {
            ratio: { type: "number" },
            interpretation: {
              type: "string",
              enum: ["Favorable", "Unfavorable", "Neutral"],
            },
            risk_comment: { type: "string" },
          },
          required: ["ratio", "interpretation"],
        },

        recommendations: {
          type: "object",
          properties: {
            action_suggestion: {
              type: "string",
              enum: ["Buy", "Sell", "Hold", "Watch", "None"],
            },
            rationale: { type: "string" },
            risk_level: {
              type: "string",
              enum: ["High", "Medium", "Low"],
            },
          },
          required: ["action_suggestion", "rationale", "risk_level"],
        },

        summary: {
          type: "object",
          properties: {
            general_summary: { type: "string" },
            tags: {
              type: "array",
              items: { type: "string" },
              description: "Optional tags like 'Breakout', 'Low Volume', 'High Risk'",
            },
          },
          required: ["general_summary"],
        },
      },
      required: [
        "trend_analysis",
        "volatility_analysis",
        "volume_analysis",
        "pattern_analysis",
        "momentum",
        "support_resistance",
        "price_targets",
        "sentiment_analysis",
        "risk_reward",
        "recommendations",
        "summary",
      ],
    },

    full_output: {
      type: "string",
      description: "Full LLM-generated raw text, for logs or manual review",
    },
  },
  required: ["analysis_extract", "full_output"],
};
