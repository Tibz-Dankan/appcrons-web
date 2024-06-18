"use client";
import React, { ReactNode } from "react";
import ReactQueryProvider from "./reactQuery";
import ReduxProvider from "./redux";
import { IsClientCtxProvider } from "./isClient";

interface ProvidersProps {
  children: ReactNode;
}

export const Providers: React.FC<ProvidersProps> = (props) => {
  return (
    <ReactQueryProvider>
      <ReduxProvider>
        <IsClientCtxProvider>{props.children}</IsClientCtxProvider>
      </ReduxProvider>
    </ReactQueryProvider>
  );
};
