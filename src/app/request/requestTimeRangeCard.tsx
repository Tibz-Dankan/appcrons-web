import { TRequestTime } from "@/types/app";
import React from "react";

interface RequestTimeRangeCardProps {
  requestTime: TRequestTime[];
}

export const RequestTimeRangeCard: React.FC<RequestTimeRangeCardProps> = (
  props
) => {
  const requestTimeList = props.requestTime;
  return (
    <div className="border-[1px] border-color-border-primary rounded-md">
      <div
        className="border-b-[1px] border-color-border-primary p-4
         bg-color-bg-secondary flex items-center justify-center rounded-t-md"
      >
        <span>{requestTimeList[0]?.timeZone}</span>
      </div>
      <div className="grid grid-cols-3 gap-2 p-4">
        {requestTimeList.map((requestTime, index) => (
          <p
            key={index}
            className="flex items-center justify-center gap-2 
            p-2 bg-color-bg-secondary border-[1px] border-color-border-primary
            rounded-md"
          >
            <span>{requestTime?.start}</span>
            <span>-</span>
            <span>{requestTime?.end}</span>
          </p>
        ))}
      </div>
    </div>
  );
};
