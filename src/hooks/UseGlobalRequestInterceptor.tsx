import { useEffect } from "react";
import { backendURL } from "@/constants";
import { useAppDispatch, useAppSelector } from "./redux";
import { getDeviceInfo } from "@/utils/getDeviceInfo";
import {
  activateMaintenance,
  deactivateMaintenance,
} from "@/store/actions/maintenance";

export const useGlobalRequestInterceptor = () => {
  const accessToken = useAppSelector((state) => state.auth.accessToken);
  const dispatch = useAppDispatch();

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

      const response = await originalFetch(...args);

      if (response.headers.get("x-maintenance-mode")) {
        dispatch(
          activateMaintenance(
            "Appcrons is undergoing a maintenance, try again later"
          )
        );
      } else if (response.ok) {
        dispatch(deactivateMaintenance());
      }

      return response;
    };
  }, [accessToken, dispatch]);
};
