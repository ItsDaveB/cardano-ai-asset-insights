import { useQuery } from "@tanstack/react-query";

type TradingInsight = {
  analysis_id: number;
  timeframe_hours: string;
  token_name: string;
  token_subject: string;
  full_output: string;
  analysis_extract: Record<string, string>; 
  llm_provider: string;
  created_at: string;
};

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

  const response = await fetch(`http://localhost:3000/api/trading-insights?${params}`);
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
