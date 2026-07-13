import { useEffect } from "react";
import { backendURL } from "@/constants";
import { useAppSelector } from "./redux";
import { getDeviceInfo } from "@/utils/getDeviceInfo";

export const useGlobalRequestInterceptor = () => {
  const accessToken = useAppSelector((state) => state.auth.accessToken);

  useEffect(() => {
    const originalFetch = globalThis.fetch;

    globalThis.fetch = async (...args) => {
      if (!args[0].toString().startsWith(backendURL)) {
        return await originalFetch(...args);
      }

      const headers: any = args[1]?.headers ?? {};
      if (!headers.Authorization && accessToken) {
        headers.Authorization = `Bearer ${accessToken}`;
      }

      headers["x-device"] = getDeviceInfo();

      args[1] = { ...args[1], headers };

      return await originalFetch(...args);
    };
  }, [accessToken]);
};
