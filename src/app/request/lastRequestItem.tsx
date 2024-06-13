"use client";

import { useAppSelector } from "@/hooks/redux";
import { TApp, TAppLiveRequest } from "@/types/app";
import { elapsedTime } from "@/utils/elapsedTime";
import React, { useEffect, useState } from "react";
import { SyncLoader } from "@/app/shared/loader/syncLoader";

interface LastRequestItemProps {
  app: TApp;
}

export const LastRequestItem: React.FC<LastRequestItemProps> = (props) => {
  const app = props.app;
  const startedAt = app.requests ? app.requests[0]?.startedAt : "";
  const lastReqId = app.requests ? app.requests[0]?.id : "";
  const [lastRequestId, setLastRequestId] = useState<string>(lastReqId);
  const [inProgress, setInProgress] = useState<boolean>(false);
  const appLiveRequest = useAppSelector((state) => state.appLiveRequest);

  const appLastRequestArrivedAt = appLiveRequest?.apps[`${app.id}`]?.arrivedAt
    ? appLiveRequest?.apps[`${app.id}`].arrivedAt
    : "";

  const appLastRequestStartedAt = appLiveRequest?.apps[`${app.id}`]?.requests
    ? appLiveRequest?.apps[`${app.id}`].requests[0]?.startedAt
    : "";

  const [requestStartedAt, setRequestStartedAt] = useState(
    appLastRequestStartedAt ? appLastRequestStartedAt : startedAt
  );
  const [elapseTime, setElapseTime] = useState(
    elapsedTime(appLastRequestStartedAt ? appLastRequestStartedAt : startedAt)
  );

  // update startedAt value at the start of every minute
  useEffect(() => {
    const updateElapsedTime = () => {
      let updatedStartAt: string;

      if (
        appLastRequestStartedAt &&
        new Date(appLastRequestStartedAt) > new Date(requestStartedAt)
      ) {
        updatedStartAt = appLastRequestStartedAt;
      }
      updatedStartAt = requestStartedAt;

      setElapseTime(() => elapsedTime(updatedStartAt));
      // setElapseTime(elapsedTime(requestStartedAt));
    };

    const now = new Date();
    const delayToNextMinute =
      (60 - now.getSeconds()) * 1000 - now.getMilliseconds();

    const initialTimeoutId = setTimeout(() => {
      updateElapsedTime();
      const intervalId = setInterval(updateElapsedTime, 60000);

      return () => clearInterval(intervalId);
    }, delayToNextMinute);

    return () => clearTimeout(initialTimeoutId);
  }, [requestStartedAt, appLastRequestStartedAt]);

  useEffect(() => {
    const updateRequestInProgressHandler = () => {
      console.log("Inside progress useEffect");
      const updatedApp = appLiveRequest?.apps[`${app.id}`] as TAppLiveRequest;

      console.log("updated app from store:", updatedApp);

      if (!updatedApp?.id || updatedApp?.id !== app.id) return;

      const updatedAppLastRequestId = updatedApp?.requests
        ? updatedApp.requests[0]?.id
        : "";

      const startedAt = updatedApp?.requests
        ? updatedApp.requests[0]?.startedAt
        : "";

      if (updatedAppLastRequestId === lastRequestId) {
        const nowSeconds = new Date(Date.now()).getSeconds();
        const arrivedAtSeconds = new Date(appLastRequestArrivedAt).getSeconds();
        const isExpiredArrivedAt = nowSeconds - arrivedAtSeconds >= 1;
        if (isExpiredArrivedAt) return;

        console.log("inProgress :", inProgress);
        setInProgress(() => true);
        // Stop a SyncLoader after 32 seconds when
        // the backend doesn't respond
        const timeoutId = setTimeout(() => {
          setRequestStartedAt(() => startedAt);
          setElapseTime(() => elapsedTime(startedAt));
          setLastRequestId(() => updatedAppLastRequestId);
          setInProgress(() => false);
        }, 32000);

        return () => clearTimeout(timeoutId);
      }

      if (updatedAppLastRequestId !== lastRequestId) {
        console.log("inProgress :", inProgress);
        // Delay hiding(stopping) SyncLoader for 3 seconds
        const timeoutId = setTimeout(() => {
          setRequestStartedAt(() => startedAt);
          setElapseTime(() => elapsedTime(startedAt));
          setLastRequestId(() => updatedAppLastRequestId);
          setInProgress(() => false);
        }, 5000);

        return () => clearTimeout(timeoutId);
      }
    };
    updateRequestInProgressHandler();
  }, [appLastRequestArrivedAt]);

  return (
    <div>
      {inProgress && <SyncLoader label={"In progress"} className="w-6 h-6" />}
      {!inProgress && <span>{elapseTime}</span>}
    </div>
  );
};
