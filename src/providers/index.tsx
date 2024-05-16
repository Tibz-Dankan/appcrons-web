"use client";
import React, { ReactNode } from "react";
import ReactQueryProvider from "./reactQuery";
import ReduxProvider from "./redux";

interface ProvidersProps {
  children: ReactNode;
}

export const Providers: React.FC<ProvidersProps> = (props) => {
  return (
    <ReactQueryProvider>
      <ReduxProvider>{props.children}</ReduxProvider>
    </ReactQueryProvider>
  );
};
