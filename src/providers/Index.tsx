"use client";
import React, { ReactNode } from "react";
import ReactQueryProvider from "./ReactQuery";
import ReduxProvider from "./Redux";
import { IsClientCtxProvider } from "./IsClient";

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
