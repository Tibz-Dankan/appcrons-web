import { useEffect } from "react";
import { backendURL } from "@/constants";

import {
  showCardNotification,
  hideCardNotification,
} from "@/store/actions/notification";

import { EventSourcePolyfill } from "event-source-polyfill";
import { getAccessToken } from "@/utils/getAccessToken";
import { getUserId } from "@/utils/getUserId";
import { TAppLiveRequest } from "@/types/app";
import { useAppDispatch } from "./redux";
import { updateAppLiveRequest } from "@/store/actions/appLiveRequests";

export const useGetAppLiveRequest = async () => {
  const accessToken = getAccessToken();
  const userId = getUserId();

  const dispatch: any = useAppDispatch();

  useEffect(() => {
    if (!accessToken || !userId) return;
    const eventSource = new EventSourcePolyfill(
      `${backendURL}/requests/get-live`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const onmessage = async (event: any) => {
      const parsedData = JSON.parse(event.data) as TAppLiveRequest;
      console.log("parsedData:", parsedData);
      const message = parsedData.message;
      if (message === "heartbeat" || message === "warmup") return;

      const parsedUserId = parsedData.userId;
      if (!parsedUserId) return;
      dispatch(updateAppLiveRequest({ appId: parsedData.id, app: parsedData }));
    };

    const onerror = async (error: any) => {
      if (error.status === 401) {
        console.log("", error);
        eventSource.close();
        dispatch(
          showCardNotification({ type: "error", message: error.message })
        );
        setTimeout(() => {
          dispatch(hideCardNotification());
        }, 5000);
      }
    };

    eventSource.onmessage = onmessage;
    eventSource.onerror = onerror;
  }, [dispatch, accessToken]);

  return {};
};
