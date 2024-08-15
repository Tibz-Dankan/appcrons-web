import React from "react";
import { useAppSelector } from "@/hooks/redux";
import { TApp } from "@/types/app";
import { AppDate } from "@/utils/date";
import { determineNextRequestTime } from "@/utils/determineNextRequestTime";

const getNextRequestSchedule = (app: TApp): string => {
  if (!app) return "N/A";
  const nextRequestTime = determineNextRequestTime(app);
  if (nextRequestTime.date === "N/A") return nextRequestTime.date;
  if (nextRequestTime.status === "tomorrow") {
    return ` ${new AppDate(nextRequestTime.date).time()}, ${"Tomorrow"}`;
  }
  return new AppDate(nextRequestTime.date).time();
};

interface NextRequestTimeProps {
  appId: string;
}

export const NextRequestTime: React.FC<NextRequestTimeProps> = (props) => {
  const app = useAppSelector((state) =>
    state.app.apps.find((app) => app.id == props.appId)
  ) as TApp;

  return (
    <div>
      <span className="first-letter:uppercase">
        {getNextRequestSchedule(app)}
      </span>
    </div>
  );
};
