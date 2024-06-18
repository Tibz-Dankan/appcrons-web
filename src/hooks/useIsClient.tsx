import { IsClientCtx } from "@/providers/isClient";
import { useContext } from "react";

export const useIsClient = () => {
  return useContext(IsClientCtx);
};
