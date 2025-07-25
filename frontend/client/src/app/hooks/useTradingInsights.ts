import { useQuery } from "@tanstack/react-query";

export type TradingInsight = {
  analysis_id: number;
  timeframe_hours: string;
  token_name: string;
  token_subject: string;
  full_output: string;
  analysis_extract: AnalysisData;
  llm_provider: string;
  created_at: string;
};

export type PrimitiveValue = string | number | boolean | null | undefined;

export interface NestedStructure {
  [key: string]: PrimitiveValue | NestedStructure;
}

type ValueOrNested = PrimitiveValue | NestedStructure;

export interface AnalysisData {
  [key: string]: ValueOrNested;
}

type Meta = {
  cached: boolean;
  expiresInSeconds: number;
};

type FetchTradingInsightsOptions = {
  limit?: number;
  includeMeta?: boolean;
};

type TradingInsightsResponse = TradingInsight[] | { data: TradingInsight[]; meta: Meta };

const fetchTradingInsights = async ({
  limit = 10,
  includeMeta = false,
}: FetchTradingInsightsOptions = {}): Promise<TradingInsightsResponse> => {
  const params = new URLSearchParams({
    limit: limit.toString(),
    includeMeta: includeMeta.toString(),
  });

  const response = await fetch(`/api/private-api-proxy?${params}`);
  if (!response.ok) {
    throw new Error("Failed to fetch trading insights");
  }

  const json = await response.json();
  return includeMeta ? json : json.data;
};

const useTradingInsights = (options: FetchTradingInsightsOptions = {}) => {
  return useQuery({
    queryKey: ["trading-insights", options],
    queryFn: () => fetchTradingInsights(options),
  });
};

export { useTradingInsights, fetchTradingInsights };
