import { ReactNode, createContext, useEffect, useState } from "react";

export const IsClientCtx = createContext(false);

interface IsClientCtxProviderProps {
  children: ReactNode;
}

export const IsClientCtxProvider: React.FC<IsClientCtxProviderProps> = (
  props
) => {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => setIsClient(true), []);
  return (
    <IsClientCtx.Provider value={isClient}>
      {props.children}
    </IsClientCtx.Provider>
  );
};
