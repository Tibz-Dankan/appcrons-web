"use client";

import { useAppSelector } from "@/hooks/redux";
import { TApp, TAppLiveRequest } from "@/types/app";
import { elapsedTime } from "@/utils/elapsedTime";
import React, { useEffect, useState } from "react";
import { SettingsLoaderIcon } from "@/app/shared/loader/settingsLoader";

interface LastRequestItemProps {
  app: TApp;
}

export const LastRequestItem: React.FC<LastRequestItemProps> = (props) => {
  const app = useAppSelector((state) =>
    state.app.apps.find((app) => app.id == props.app.id)
  ) as TApp;

  const startedAt = app.requests ? app.requests[0]?.startedAt : "";
  const lastReqId = app.requests ? app.requests[0]?.id : "";
  const [lastRequestId, setLastRequestId] = useState<string>(lastReqId);
  const [inProgress, setInProgress] = useState<boolean>(false);
  const appLiveRequest = useAppSelector((state) => state.appLiveRequest);

  const appLastRequestArrivedAt = appLiveRequest?.apps[`${app.id}`]?.arrivedAt
    ? appLiveRequest?.apps[`${app.id}`].arrivedAt
    : "";

  const [elapseTime, setElapseTime] = useState(elapsedTime(startedAt));

  // update startedAt value at the start of every minute
  useEffect(() => {
    const updateElapsedTime = () => {
      setElapseTime(() => elapsedTime(startedAt));
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
  }, [startedAt]);

  useEffect(() => {
    const updateRequestInProgressHandler = () => {
      const updatedApp = appLiveRequest?.apps[`${app.id}`] as TAppLiveRequest;

      if (!updatedApp?.id || updatedApp?.id !== app.id) return;

      const updatedAppLastRequestId = updatedApp?.requests
        ? updatedApp.requests[0]?.id
        : "";

      if (updatedAppLastRequestId === lastRequestId) {
        const nowSeconds = new Date(Date.now()).getSeconds();
        const arrivedAtSeconds = new Date(appLastRequestArrivedAt).getSeconds();
        const isExpiredArrivedAt = nowSeconds - arrivedAtSeconds >= 1;
        if (isExpiredArrivedAt) return;

        setInProgress(() => true);
        // Stop a Loader after 32 seconds when
        // the backend doesn't respond
        const timeoutId = setTimeout(() => {
          setInProgress(() => false);
        }, 32000);

        return () => clearTimeout(timeoutId);
      }

      if (updatedAppLastRequestId !== lastRequestId) {
        // Delay hiding Loader for 5 seconds
        const timeoutId = setTimeout(() => {
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
    <div className="flex items-center justify-start w-36">
      {inProgress && (
        <div
          className="flex items-center justify-center bg-color-bg-secondary 
           rounded-md p-2 w-32"
        >
          <SettingsLoaderIcon
            label={"In progress"}
            className="w-5 h-5"
            labelClassName="font-semibold"
          />
        </div>
      )}
      {!inProgress && <span>{elapseTime}</span>}
    </div>
  );
};
