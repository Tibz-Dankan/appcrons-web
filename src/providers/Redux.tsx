"use client";
import { ReactNode, useRef } from "react";
import { Provider } from "react-redux";
import { makeStore, AppStore } from "@/store";

interface StoreProviderProps {
  children: ReactNode;
}

const ReduxProvider: React.FC<StoreProviderProps> = (props) => {
  const storeRef = useRef<AppStore>();
  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = makeStore();
  }

  return <Provider store={storeRef.current}>{props.children}</Provider>;
};

export default ReduxProvider;
