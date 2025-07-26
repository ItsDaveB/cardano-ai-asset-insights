"use client";

import React, { useState } from "react";
import { AnalysisData, PrimitiveValue, useTradingInsights } from "../hooks/useTradingInsights";
import Image from "next/image";
import { getLogoByTicker } from "../utils/tokenImages";
import { ResponsiveSwarmPlot } from "@nivo/swarmplot";
import { ResponsiveRadar } from "@nivo/radar";

export const TradingInsightsList = () => {
  const [limit, setLimit] = useState(10);

  const { data, isPending, isFetching } = useTradingInsights({
    limit,
    includeMeta: true,
  });

  if (isPending) return <div>Loading...</div>;

  const insights = Array.isArray(data) ? data : data?.data;

  function getAnalysisExtractByKey<T = PrimitiveValue>(
    analysis_extract: AnalysisData | undefined,
    key: string,
    nestedKey?: string,
    fallback: T = "N/A" as T
  ): T {
    const topLevel = analysis_extract?.[key];

    if (nestedKey) {
      if (topLevel && typeof topLevel === "object" && nestedKey in topLevel) {
        return (topLevel as Record<string, unknown>)[nestedKey] as T;
      } else {
        return fallback;
      }
    }

    return (topLevel as T) ?? fallback;
  }

  const getVolumeColor = (level: string) => {
    switch (level) {
      case "Above Average":
        return "text-green-600";
      case "Below Average":
        return "text-red-500";
      case "Average":
        return "text-orange-500";
      default:
        return "text-gray-500";
    }
  };

  const getRiskRewardColor = (level: string) => {
    switch (level) {
      case "Favorable":
        return "text-green-600";
      case "Unfavorable":
        return "text-red-500";
      case "Neutral":
        return "text-orange-500";
      default:
        return "text-gray-500";
    }
  };

  const getRiskRecommendationLevelColor = (level: string) => {
    switch (level) {
      case "High":
        return "text-red-500";
      case "Medium":
        return "text-orange-500";
      case "Low":
        return "text-green-600";
      default:
        return "text-gray-500";
    }
  };

  return (
    <section className="text-gray-700 body-font overflow-hidden bg-white">
      <div className="min-h-screen bg-gray-100 flex flex-col justify-center sm:py-4">
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-4 w-full p-5">
          {insights?.map((item) => {
            const resistanceLevels =
              (getAnalysisExtractByKey(item.analysis_extract, "support_resistance", "resistance_levels") as Record<
                string,
                string
              >[]) || [];

            const supportLevels =
              (getAnalysisExtractByKey(item.analysis_extract, "support_resistance", "support_levels") as Record<
                string,
                string
              >[]) || [];

            const shortTermPriceTarget = getAnalysisExtractByKey(
              item.analysis_extract,
              "price_targets",
              "short_term"
            ) as string;

            const shortTermPriceTargetWeight = getAnalysisExtractByKey(
              item.analysis_extract,
              "price_targets",
              "short_term_weight"
            ) as string;

            const mediumTermPriceTarget = getAnalysisExtractByKey(
              item.analysis_extract,
              "price_targets",
              "medium_term"
            ) as string;

            const mediumTermPriceTargetWeight = getAnalysisExtractByKey(
              item.analysis_extract,
              "price_targets",
              "medium_term_weight"
            ) as string;

            const longTermPriceTarget = getAnalysisExtractByKey(
              item.analysis_extract,
              "price_targets",
              "long_term"
            ) as string;

            const longTermPriceTargetWeight = getAnalysisExtractByKey(
              item.analysis_extract,
              "price_targets",
              "long_term_weight"
            ) as string;

            const parsePrices = (input: PrimitiveValue | string[]) =>
              Array.isArray(input) ? input.map(parseFloat) : input ? [parseFloat(input as string)] : [];

            const allPrices = [
              ...resistanceLevels.map((x) => parseFloat(x.price)),
              ...supportLevels.map((x) => parseFloat(x.price)),
              ...parsePrices(shortTermPriceTarget),
              ...parsePrices(mediumTermPriceTarget),
              ...parsePrices(longTermPriceTarget),
            ];

            const minPrice = allPrices.length ? Math.min(...allPrices) * 0.95 : 0.8;
            const maxPrice = allPrices.length ? Math.max(...allPrices) * 1.05 : 2.0;
            const scaleWeight = (weight: string, scale = 40) => Number(weight) * scale;

            const momentumScore = getAnalysisExtractByKey(item.analysis_extract, "visual_scores", "momentum") as number;
            const sentimentScore = getAnalysisExtractByKey(
              item.analysis_extract,
              "visual_scores",
              "sentiment"
            ) as number;
            const volatilityScore = getAnalysisExtractByKey(
              item.analysis_extract,
              "visual_scores",
              "volatility"
            ) as number;
            const volumeScore = getAnalysisExtractByKey(item.analysis_extract, "visual_scores", "volume") as number;
            const trendStrengthScore = getAnalysisExtractByKey(
              item.analysis_extract,
              "visual_scores",
              "trend_strength"
            ) as number;
            const riskRewardScore = getAnalysisExtractByKey(
              item.analysis_extract,
              "visual_scores",
              "risk_reward"
            ) as number;

            const radarChartData = [
              { category: "Momentum", score: momentumScore },
              { category: "Sentiment", score: sentimentScore },
              { category: "Volatility", score: volatilityScore },
              { category: "Volume", score: volumeScore },
              { category: "Trend Strength", score: trendStrengthScore },
              { category: "Risk/Reward", score: riskRewardScore },
            ];

            return (
              <div
                key={item.analysis_id}
                className="rounded-2xl flex flex-col bg-white p-4 justify-between space-y-6 items-start"
              >
                {/* Top-left: Token image and name */}
                <div className="flex w-full items-center mb-4">
                  {getLogoByTicker(item.token_name) ? (
                    <Image
                      width={60}
                      height={60}
                      src={getLogoByTicker(item.token_name)}
                      className="rounded-full"
                      alt={item.token_name}
                    />
                  ) : (
                    <div className="inline-flex items-center justify-center w-12 h-12 text-xl text-white bg-indigo-500 rounded-full">
                      {item.token_name.slice(0, 2).toUpperCase()}
                    </div>
                  )}

                  <p className="font-semibold text-lg medium ml-3">{item.token_name}</p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1 ml-auto">
                    {(getAnalysisExtractByKey(item.analysis_extract, "summary", "tags") as string[])?.map(
                      (tag, index) => (
                        <span
                          key={index}
                          className="bg-purple-100 text-purple-700 text-xs font-semibold px-2 py-1 rounded-full"
                        >
                          {tag}
                        </span>
                      )
                    )}
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 gap-8 w-full">
                  <div className="w-full bg-white shadow-sm p-6 rounded-2xl border border-gray-200">
                    <div className="flex items-center">
                      <span className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-100">
                        <svg
                          className="w-4 h-4 stroke-current text-blue-600"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                          />
                        </svg>
                      </span>
                      <span className="ml-2 text-sm font-medium text-gray-500">Risk Level</span>
                    </div>
                    <span className="block text-4xl font-semibold mt-4">
                      {getAnalysisExtractByKey(item.analysis_extract, "recommendations", "risk_level")}
                    </span>
                    <div className="flex text-xs mt-3 font-medium">
                      <span
                        className={getRiskRewardColor(
                          getAnalysisExtractByKey(item.analysis_extract, "risk_reward", "interpretation") as string
                        )}
                      >
                        {getAnalysisExtractByKey(item.analysis_extract, "risk_reward", "ratio")}
                      </span>
                      <span className="ml-1 text-gray-500">
                        {getAnalysisExtractByKey(item.analysis_extract, "risk_reward", "interpretation")} risk/reward
                      </span>
                    </div>
                  </div>
                  <div className="w-full bg-white shadow-sm p-6 rounded-2xl border border-gray-200">
                    <div className="flex items-center">
                      <span className="flex items-center justify-center w-6 h-6 rounded-full bg-pink-100">
                        <svg
                          className="w-4 h-4 stroke-current text-pink-600"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </span>
                      <span className="ml-2 text-sm font-medium text-gray-500">Volume Trend</span>
                    </div>
                    <span className="block text-4xl font-semibold mt-4">
                      {getAnalysisExtractByKey(item.analysis_extract, "volume_analysis", "volume_trend")}
                    </span>
                    <div className="flex text-xs mt-3 font-medium">
                      <span
                        className={getVolumeColor(
                          getAnalysisExtractByKey(item.analysis_extract, "volume_analysis", "relative_volume") as string
                        )}
                      >
                        {getAnalysisExtractByKey(item.analysis_extract, "volume_analysis", "relative_volume")}
                      </span>
                      <span className="ml-1 text-gray-500">volume</span>
                    </div>
                  </div>
                  <div className="w-full bg-white shadow-sm p-6 rounded-2xl border border-gray-200">
                    <div className="flex items-center">
                      <span className="flex items-center justify-center w-6 h-6 rounded-full bg-red-100">
                        <svg
                          className="w-4 h-4 stroke-current text-red-600"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                          />
                        </svg>
                      </span>
                      <span className="ml-2 text-sm font-medium text-gray-500">Overall Suggestion</span>
                    </div>
                    <span className="block text-3xl font-semibold mt-4">
                      {getAnalysisExtractByKey(item.analysis_extract, "recommendations", "action_suggestion")}
                    </span>
                    <div className="flex text-xs mt-3 font-medium">
                      <span
                        className={getRiskRecommendationLevelColor(
                          getAnalysisExtractByKey(item.analysis_extract, "recommendations", "risk_level") as string
                        )}
                      >
                        {getAnalysisExtractByKey(item.analysis_extract, "recommendations", "risk_level")}
                      </span>
                      <span className="ml-1 text-gray-500">risk level</span>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 md:justify-between">
                  {/* Momentum */}
                  <CollapsiblePanel
                    title="Momentum"
                    subtitle={`${getAnalysisExtractByKey(
                      item.analysis_extract,
                      "momentum",
                      "status"
                    )} (${getAnalysisExtractByKey(item.analysis_extract, "momentum", "indicator")})`}
                    content={<p>{getAnalysisExtractByKey(item.analysis_extract, "momentum", "momentum_comment")}</p>}
                  />

                  {/* Risk/Reward */}
                  <CollapsiblePanel
                    title="Risk/Reward"
                    subtitle={`${getAnalysisExtractByKey(
                      item.analysis_extract,
                      "risk_reward",
                      "ratio"
                    )} (${getAnalysisExtractByKey(item.analysis_extract, "risk_reward", "interpretation")})`}
                    content={<p>{getAnalysisExtractByKey(item.analysis_extract, "risk_reward", "risk_comment")}</p>}
                  />

                  {/* Pattern */}
                  <CollapsiblePanel
                    title="Pattern"
                    subtitle={`${getAnalysisExtractByKey(item.analysis_extract, "pattern_analysis", "pattern_name")}`}
                    content={
                      <p>{getAnalysisExtractByKey(item.analysis_extract, "pattern_analysis", "pattern_comment")}</p>
                    }
                  />

                  {/* Sentiment */}
                  <CollapsiblePanel
                    title="Sentiment"
                    subtitle={`${getAnalysisExtractByKey(
                      item.analysis_extract,
                      "sentiment_analysis",
                      "sentiment_score"
                    )}`}
                    content={
                      <p>{getAnalysisExtractByKey(item.analysis_extract, "sentiment_analysis", "sentiment_comment")}</p>
                    }
                  />

                  {/* Volume */}
                  <CollapsiblePanel
                    title="Volume Trend"
                    subtitle={`${getAnalysisExtractByKey(item.analysis_extract, "volume_analysis", "volume_trend")}`}
                    content={
                      <p>{getAnalysisExtractByKey(item.analysis_extract, "volume_analysis", "volume_comment")}</p>
                    }
                  />

                  {/* Volatility */}
                  <CollapsiblePanel
                    title="Volatility"
                    subtitle={`${getAnalysisExtractByKey(
                      item.analysis_extract,
                      "volatility_analysis",
                      "volatility_level"
                    )}`}
                    content={
                      <p>
                        {getAnalysisExtractByKey(item.analysis_extract, "volatility_analysis", "volatility_comment")}
                      </p>
                    }
                  />

                  {/* Trend Analysis */}
                  <CollapsiblePanel
                    title="Trend"
                    subtitle={`${getAnalysisExtractByKey(
                      item.analysis_extract,
                      "trend_analysis",
                      "technical_trend"
                    )} (${getAnalysisExtractByKey(item.analysis_extract, "trend_analysis", "trend_strength")})`}
                    content={<p>{getAnalysisExtractByKey(item.analysis_extract, "trend_analysis", "trend_comment")}</p>}
                  />

                  {/* Recommendation */}
                  <CollapsiblePanel
                    title="Recommendation"
                    subtitle={`${getAnalysisExtractByKey(
                      item.analysis_extract,
                      "recommendations",
                      "action_suggestion"
                    )}`}
                    content={<p>{getAnalysisExtractByKey(item.analysis_extract, "recommendations", "rationale")}</p>}
                  />
                </div>
                {/* Summary */}
                <div className="text-sm">
                  <p>{getAnalysisExtractByKey(item.analysis_extract, "summary", "general_summary")}</p>
                </div>

                <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-4 bg-white shadow-sm p-6 rounded-2lg border border-gray-200">
                  <div className="w-full h-[400px]">
                    <ResponsiveSwarmPlot
                      data={[
                        ...resistanceLevels.map(({ price, weight }, index) => ({
                          id: `Resistance ${index + 1}`,
                          price: parseFloat(price),
                          label: "Resistance",
                          weight: scaleWeight(weight),
                          group: "price resistance",
                          note: price,
                        })),
                        ...supportLevels.map(({ price, weight }, index) => ({
                          id: `Support ${index + 1}`,
                          price: parseFloat(price),
                          label: `Support`,
                          weight: scaleWeight(weight),
                          group: "price support",
                        })),
                        {
                          id: "Short Target",
                          price: parseFloat(shortTermPriceTarget),
                          label: "Short Target",
                          weight: scaleWeight(shortTermPriceTargetWeight),
                          group: "price target",
                        },
                        {
                          id: "Medium Target",
                          price: parseFloat(mediumTermPriceTarget),
                          label: "Medium Target",
                          weight: scaleWeight(mediumTermPriceTargetWeight),
                          group: "price target",
                        },
                        {
                          id: "Long Target",
                          price: parseFloat(longTermPriceTarget),
                          label: "Long Target",
                          weight: scaleWeight(longTermPriceTargetWeight),
                          group: "price target",
                        },
                      ]}
                      groups={["price resistance", "price support", "price target"]}
                      value="price"
                      valueScale={{
                        type: "linear",
                        min: minPrice,
                        max: maxPrice,
                        reverse: false,
                      }}
                      enableGridX={false}
                      enableGridY={false}
                      size={{ key: "weight", values: [1, 80], sizes: [1, 100] }}
                      forceStrength={4}
                      simulationIterations={100}
                      margin={{ top: 40, right: 50, bottom: 40, left: 50 }}
                      axisBottom={{ legend: "", legendOffset: 40 }}
                      axisLeft={{ legend: "", legendOffset: -60 }}
                      colorBy={"group"}
                      colors={({ group }) => {
                        if (group === "price resistance") return "red";
                        if (group === "price target") return "#d64dff";
                        return "#6de28e";
                      }}
                      animate={true}
                    />
                  </div>
                  <div className="w-full h-[400px]">
                    <ResponsiveRadar
                      data={radarChartData}
                      keys={["score"]}
                      indexBy="category"
                      maxValue={1}
                      margin={{ top: 40, right: 50, bottom: 40, left: 50 }}
                      curve="catmullRomClosed"
                      borderWidth={2}
                      borderColor={{ from: "color" }}
                      gridLevels={8}
                      gridShape="linear"
                      gridLabelOffset={15}
                      enableDots={true}
                      dotSize={10}
                      dotColor={{ theme: "background" }}
                      dotBorderWidth={2}
                      dotBorderColor={{ from: "color" }}
                      colors={{ scheme: "category10" }}
                      fillOpacity={0.35}
                      blendMode="multiply"
                      animate={true}
                      isInteractive={true}
                    />
                  </div>
                </div>

                <div className="text-sm space-y-2">
                  {/* Price Targets */}
                  <div>
                    <p className="font-semibold">Price Targets</p>
                    <p>
                      <span className="font-medium">Short:</span>{" "}
                      {getAnalysisExtractByKey(item.analysis_extract, "price_targets", "short_term")},
                      <span className="font-medium ml-2">Medium:</span>{" "}
                      {getAnalysisExtractByKey(item.analysis_extract, "price_targets", "medium_term")},
                      <span className="font-medium ml-2">Long:</span>{" "}
                      {getAnalysisExtractByKey(item.analysis_extract, "price_targets", "long_term")}
                    </p>
                    <p>{getAnalysisExtractByKey(item.analysis_extract, "price_targets", "target_comment")}</p>
                  </div>

                  {/* Support & Resistance */}
                  <div>
                    <p className="font-semibold">Support & Resistance</p>
                    <p>
                      <span className="font-medium">Support:</span>{" "}
                      {(
                        getAnalysisExtractByKey(
                          item.analysis_extract,
                          "support_resistance",
                          "support_levels"
                        ) as Record<string, string>[]
                      )
                        .map((x) => x.price)
                        ?.join(", ")}
                    </p>
                    <p>
                      <span className="font-medium">Resistance:</span>{" "}
                      {(
                        getAnalysisExtractByKey(
                          item.analysis_extract,
                          "support_resistance",
                          "resistance_levels"
                        ) as Record<string, string>[]
                      )
                        .map((x) => x.price)
                        ?.join(", ")}
                    </p>
                    <p>{getAnalysisExtractByKey(item.analysis_extract, "support_resistance", "levels_comment")}</p>
                  </div>
                </div>

                {/* Footer */}
                <div className="flex w-full justify-end gap-5">
                  <div className="text-xs text-gray-400 mr-auto">LLM: {item.llm_provider}</div>
                  <div className="text-xs text-gray-400">Timeframe: {item.timeframe_hours}</div>
                  <div className="text-xs text-gray-400">
                    Last Updated:{" "}
                    {new Date(item.created_at).toLocaleString("en-GB", {
                      day: "2-digit",
                      month: "long",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: false,
                      timeZone: "UTC",
                    })}{" "}
                    UTC
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {limit <= 90 && (
          <button onClick={() => setLimit(limit + 10)} disabled={isFetching}>
            {isFetching ? "Loading more..." : "Show More"}
          </button>
        )}
      </div>
    </section>
  );
};

type CollapsiblePanelProps = {
  title: string;
  subtitle: string;
  content: React.ReactNode;
};

export const CollapsiblePanel = ({ title, subtitle, content }: CollapsiblePanelProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-slate-200 w-full">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center py-5 text-slate-800"
      >
        <span className="flex gap-3 w-full cursor-pointer">
          <span className="font-semibold text-gray-700 text-sm">{title}</span>
          <span className="text-gray-800 text-sm">{subtitle}</span>
        </span>
        <span className={`text-slate-800 transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4">
            <path d="M8.75 3.75a.75.75 0 0 0-1.5 0v3.5h-3.5a.75.75 0 0 0 0 1.5h3.5v3.5a.75.75 0 0 0 1.5 0v-3.5h3.5a.75.75 0 0 0 0-1.5h-3.5v-3.5Z" />
          </svg>
        </span>
      </button>

      <div
        className={`transition-all duration-300 ease-in-out overflow-hidden ${
          isOpen ? "max-h-[500px] pb-5" : "max-h-0"
        }`}
      >
        <div className="text-sm text-slate-500">{content}</div>
      </div>
    </div>
  );
};
