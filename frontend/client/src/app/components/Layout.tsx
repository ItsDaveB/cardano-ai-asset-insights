"use client";

import React, { useState } from "react";
import { QueryClient, QueryClientProvider, HydrationBoundary } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <html lang="en" className="">
      <body className="bg-gray-50 text-black dark:bg-gray-900 dark:text-white">
        <QueryClientProvider client={queryClient}>
          <HydrationBoundary>{children}</HydrationBoundary>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </body>
    </html>
  );
}
