"use client";
import React from "react";
import { TApp, TRequestTime } from "@/types/app";
import { convertTo12HourFormat } from "@/utils/convertTo 12HourFormat";
import { UpdateRequestTimeRange } from "@/app/request/updateRequestTimeRange";
import { IconContext } from "react-icons";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";

interface RequestTimeRangeCardProps {
  app: TApp;
}

export const RequestTimeRangeCard: React.FC<RequestTimeRangeCardProps> = (
  props
) => {
  const requestTimeList = props.app.requestTimes as TRequestTime[];
  // UpdateRequestTimeRange

  return (
    <div className="border-[1px] border-color-border-primary rounded-md">
      <div
        className="border-b-[1px] border-color-border-primary p-4
         bg-color-bg-secondary flex items-center justify-center rounded-t-md"
      >
        <span>{requestTimeList[0]?.timeZone}</span>
      </div>
      <div className="grid grid-cols-2 gap-2 p-4">
        {requestTimeList.map((requestTime, index) => (
          <div
            key={index}
            className="flex items-center justify-center gap-2 
             p-2 bg-color-bg-secondary border-[1px] border-color-border-primary
             rounded-md relative"
          >
            <p className="flex items-center justify-center gap-1 text-sm">
              <span>{convertTo12HourFormat(requestTime?.start)}</span>
              <span>-</span>
              <span>{convertTo12HourFormat(requestTime?.end)}</span>
            </p>
            <div
              className="absolutes bottom-1 right-2 flex items-center justify-center 
               gap-2"
            >
              {/* Delete Time Range */}
              <UpdateRequestTimeRange
                requestTimeId={requestTime.id}
                app={props.app}
                openModalElement={
                  <span className="w-auto h-auto cursor-pointer">
                    <IconContext.Provider
                      value={{
                        size: "1rem",
                        color: "#868e96",
                      }}
                    >
                      <RiDeleteBin6Line />
                    </IconContext.Provider>
                  </span>
                }
                onUpdate={() => {}}
              />
              {/* Edit Time Range */}
              <UpdateRequestTimeRange
                requestTimeId={requestTime.id}
                app={props.app}
                openModalElement={
                  <span className="grid h-auto w-auto place-items-center cursor-pointer">
                    <IconContext.Provider
                      value={{
                        size: "1rem",
                        color: "#868e96",
                      }}
                    >
                      <FiEdit />
                    </IconContext.Provider>
                  </span>
                }
                onUpdate={() => {}}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
