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
              maxItems: 5,
              description: "Key support levels with associated weight (strength of support)",
              items: {
                type: "object",
                properties: {
                  price: {
                    type: "number",
                    description: "Support level price",
                  },
                  weight: {
                    type: "number",
                    description: "Strength or confidence of support at this price level (0-1)",
                  },
                },
                required: ["price", "weight"],
              },
            },
            resistance_levels: {
              type: "array",
              maxItems: 5,
              description:
                "Key resistance levels with associated weight (strength of resistance), (must be an existing price range)",
              items: {
                type: "object",
                properties: {
                  price: {
                    type: "number",
                    description: "Resistance level price",
                  },
                  weight: {
                    type: "number",
                    description: "Strength or confidence of resistance at this price level (0-1)",
                  },
                },
                required: ["price", "weight"],
              },
            },
            levels_comment: {
              type: "string",
              description: "Commentary or context for the support and resistance levels",
            },
          },
          required: ["support_levels"],
        },

        price_targets: {
          type: "object",
          properties: {
            short_term: {
              type: "number",
              description: "Predicted short-term price target (e.g., days to weeks)",
            },
            short_term_weight: {
              type: "number",
              description: "Confidence level (0-1) for the short-term price target",
            },
            medium_term: {
              type: "number",
              description: "Predicted medium-term price target (e.g., weeks to months)",
            },
            medium_term_weight: {
              type: "number",
              description: "Confidence level (0-1) for the medium-term price target",
            },
            long_term: {
              type: "number",
              description: "Predicted long-term price target (e.g., months to a year)",
            },
            long_term_weight: {
              type: "number",
              description: "Confidence level (0-1) for the long-term price target",
            },
            target_comment: {
              type: "string",
              description: "Commentary or rationale behind the price targets",
            },
          },
          required: ["short_term", "short_term_weight"],
        },

        sentiment_analysis: {
          type: "object",
          description:
            "Analyze the overall market sentiment for the specified token based on the most recent and relevant news articles, social sentiment, and price action available online. Use grounded, factual information where possible. Summarize your findings into a sentiment score and explain the reasoning behind it.",
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
            ratio: {
              type: "number",
              description:
                "The calculated risk/reward ratio (e.g., 2.5 means 2.5 reward units for every 1 unit of risk).",
            },
            interpretation: {
              type: "string",
              enum: ["Favorable", "Unfavorable", "Neutral"],
              description: "Qualitative assessment of the risk/reward ratio.",
            },
            risk_comment: {
              type: "string",
              description: "Optional additional context or reasoning behind the interpretation.",
            },
          },
          required: ["ratio", "interpretation"],
        },

        visual_scores: {
          type: "object",
          description:
            "Normalized values (0 to 1) for use in radar/spider or comparison charts. These values should reflect the current status of different analysis areas.",
          properties: {
            momentum: {
              type: "number",
              minimum: 0,
              maximum: 1,
              description: "Normalized momentum score based on the status (e.g., Neutral = 0.5)",
            },
            sentiment: {
              type: "number",
              minimum: 0,
              maximum: 1,
              description: "Normalized sentiment score (Positive = 1, Neutral = 0.5, Negative = 0)",
            },
            volatility: {
              type: "number",
              minimum: 0,
              maximum: 1,
              description: "Normalized volatility score (High = 1, Low = 0)",
            },
            volume: {
              type: "number",
              minimum: 0,
              maximum: 1,
              description: "Normalized volume strength (Above Avg = 1, Below Avg = 0)",
            },
            trend_strength: {
              type: "number",
              minimum: 0,
              maximum: 1,
              description: "Normalized trend strength (Strong = 1, Weak = 0)",
            },
            risk_reward: {
              type: "number",
              minimum: 0,
              maximum: 1,
              description: "Normalized risk/reward favorability score (e.g., scaled ratio or enum mapping)",
            },
          },
          required: ["momentum", "sentiment", "volatility", "volume", "trend_strength", "risk_reward"],
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
            general_summary: {
              type: "string",
              description:
                "A concise, plain-language summary of the overall market or technical analysis insights derived from the structured data. This summary should be as detailed as possible while remaining readable, synthesizing key insights from trend, volume, sentiment, and other indicators. The summary must not exceed five lines of text. It should end with the following disclaimer: 'Note: This summary is generated by a language model and should be interpreted as a guideline, not as financial advice.'",
            },

            tags: {
              type: "array",
              items: { type: "string" },
              description:
                "Optional tags like 'Breakout', 'Low Volume', 'High Risk', must be relevant aim for 3 or move, but less than 6.",
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
