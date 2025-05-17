"use client";

import React, { useState } from "react";
import { useTradingInsights } from "../hooks/useTradingInsights";

export const TradingInsightsList = () => {
  const [limit, setLimit] = useState(10);

  const { data, isPending, isFetching } = useTradingInsights({
    limit,
    includeMeta: true,
  });

  if (isPending) return <div>Loading...</div>;

  const insights = Array.isArray(data) ? data : data?.data;

  return (
    <section>
      <ul>
        {insights?.map((insight, index) => (
          <li key={insight.analysis_id}>
            {index + 1}. {insight.token_name}
          </li>
        ))}
      </ul>

      {limit <= 90 && (
        <button onClick={() => setLimit(limit + 10)} disabled={isFetching}>
          {isFetching ? "Loading more..." : "Show More"}
        </button>
      )}
    </section>
  );
};
