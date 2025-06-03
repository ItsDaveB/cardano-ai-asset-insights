import { QueryClient, dehydrate } from "@tanstack/react-query";
import { fetchTradingInsights } from "./hooks/useTradingInsights";
import { Header } from "./components/Header";
import { TradingInsightsList } from "./components/TradingInsightsList";
import { ReactQueryProvider } from "./providers/ReactQueryProvider";
import Layout from "./components/Layout";
import "./globals.css";

export default async function HomePage() {
  const queryClient = new QueryClient();
  const maxInsightsLimit = 10;

  await queryClient.prefetchQuery({
    queryKey: ["insights", maxInsightsLimit],
    queryFn: () => fetchTradingInsights({ limit: maxInsightsLimit }),
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <ReactQueryProvider dehydratedState={dehydratedState}>
      <Layout>
        <Header />
        <TradingInsightsList />
      </Layout>
    </ReactQueryProvider>
  );
}
