"use client";
import React, { ReactNode } from "react";
import ReactQueryProvider from "./reactQuery";
// import NotificationProvider from "./notification";

interface ProvidersProps {
  children: ReactNode;
}

export const Providers: React.FC<ProvidersProps> = (props) => {
  return (
    <ReactQueryProvider>
      {/* <NotificationProvider> */}
      {props.children}
      {/* </NotificationProvider> */}
    </ReactQueryProvider>
  );
};
