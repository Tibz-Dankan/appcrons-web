import { useAppSelector } from "@/hooks/redux";
import { TApp, TAppLiveRequest } from "@/types/app";
import { AppDate } from "@/utils/date";
import { determineNextRequestTime } from "@/utils/determineNextRequestTime";
import React from "react";

interface NextRequestTimeProps {
  appId: string;
}

export const NextRequestTime: React.FC<NextRequestTimeProps> = (props) => {
  const app = useAppSelector((state) =>
    state.app.apps.find((app) => app.id == props.appId)
  ) as TApp;

  const appLiveRequest = useAppSelector((state) => state.appLiveRequest);
  const liveApp = appLiveRequest?.apps[`${app.id}`] as TApp;

  const getNextRequestSchedule = (): string => {
    const currentApp = liveApp ? liveApp : app;
    const nextRequestTime = determineNextRequestTime(currentApp);
    if (nextRequestTime.date === "N/A") return nextRequestTime.date;
    if (nextRequestTime.status === "tomorrow") {
      // return ` ${new AppDate(nextRequestTime.date).time()} ${
      //   nextRequestTime.status
      // }`;
      return ` ${new AppDate(nextRequestTime.date).time()}, ${"Tomorrow"}`;
    }

    return new AppDate(nextRequestTime.date).time();
  };

  return (
    <div>
      <span className="first-letter:uppercase">{getNextRequestSchedule()}</span>
    </div>
  );
};
