import { IsClientCtx } from "@/providers/IsClient";
import { useContext } from "react";

export const useIsClient = () => {
  return useContext(IsClientCtx);
};
