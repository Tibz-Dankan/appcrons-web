import { useAppSelector } from "@/hooks/redux";
import { TApp } from "@/types/app";
import { elapsedTime } from "@/utils/elapsedTime";
import React, { useEffect, useState } from "react";

export const getAppLastRequestStartedAt = (app: TApp): string => {
  if (!app) return "";

  const hasRequests = app.requests?.length > 0;
  if (!hasRequests) return "";

  return app.requests[0].startedAt;
};
interface LastRequestTimeProps {
  appId: string;
}

export const LastRequestTime: React.FC<LastRequestTimeProps> = (props) => {
  const app = useAppSelector((state) =>
    state.app.apps.find((app) => app.id == props.appId)
  ) as TApp;

  const startedAt = getAppLastRequestStartedAt(app);

  const [elapseTime, setElapseTime] = useState(
    startedAt ? elapsedTime(startedAt) : "N/A"
  );
  const updateElapsedTime = () => {
    if (!startedAt) return;
    setElapseTime(() => elapsedTime(startedAt));
  };

  // update startedAt value at the
  // start of every minute and after
  // every 30 seconds
  useEffect(() => {
    const now = new Date();
    const delayToNextMinute =
      (60 - now.getSeconds()) * 1000 - now.getMilliseconds();

    const initialTimeoutId = setTimeout(() => {
      updateElapsedTime();
      const intervalId = setInterval(updateElapsedTime, 30000);

      return () => clearInterval(intervalId);
    }, delayToNextMinute);

    return () => clearTimeout(initialTimeoutId);
  }, [startedAt, setElapseTime]);

  return (
    <div>
      <span>{elapseTime}</span>
    </div>
  );
};
