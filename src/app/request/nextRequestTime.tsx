import { useAppSelector } from "@/hooks/redux";
import { TApp } from "@/types/app";
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

  const getNextRequestSchedule = (): string => {
    const nextRequestTime = determineNextRequestTime(app);
    if (nextRequestTime === "N/A") return nextRequestTime;

    return new AppDate(nextRequestTime).time();
  };

  return (
    <div>
      <span>{getNextRequestSchedule()}</span>
    </div>
  );
};
