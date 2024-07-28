"use client";

import React, { Fragment, ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 2000,
      // networkMode: "cache-and-network",
    },
    mutations: {
      networkMode: "always",
    },
  },
});

interface ReactQueryProviderProps {
  children: ReactNode;
}

const ReactQueryProvider: React.FC<ReactQueryProviderProps> = (props) => {
  return (
    <Fragment>
      <QueryClientProvider client={queryClient}>
        {props.children}
      </QueryClientProvider>
    </Fragment>
  );
};

export default ReactQueryProvider;
