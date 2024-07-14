"use client";
import React, { useEffect, useState } from "react";
import { TApp, TRequestTime } from "@/types/app";
import { convertTo12HourFormat } from "@/utils/convertTo 12HourFormat";
import { UpdateRequestTimeRange } from "@/app/request/updateRequestTimeRange";
import { DeleteRequestTimeRange } from "./deleteRequestTimeRange";
import { useAppSelector } from "@/hooks/redux";
import { Modal } from "@/app/shared/modal";
import { EditIcon } from "@/app/shared/Icons/editIcon";
import { DeleteIcon } from "@/app/shared/Icons/deleteIcon";

interface RequestTimeRangeCardProps {
  app: TApp;
}

export const RequestTimeRangeCard: React.FC<RequestTimeRangeCardProps> = (
  props
) => {
  const [isClosedModal, setIsClosedModal] = useState(false);
  const app = useAppSelector((state) =>
    state.app.apps.find((app) => app.id === props.app.id)
  ) as TApp;

  const modalCloseHandler = (close: boolean) => {
    setIsClosedModal(() => close);
  };

  // Update 'isClosedModal' to it's default
  // value 'false' After 1 second
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsClosedModal(() => false);
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [isClosedModal]);

  const requestTimeList = app.requestTimes as TRequestTime[];

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
              <Modal
                openModalElement={
                  <DeleteIcon
                    className="w-[18px] h-[18px] text-color-text-secondary 
                     cursor-pointer"
                  />
                }
                closed={isClosedModal}
              >
                <DeleteRequestTimeRange
                  requestTimeId={requestTime.id}
                  app={props.app}
                  onSuccess={modalCloseHandler}
                  onCancel={modalCloseHandler}
                />
              </Modal>

              {/* Edit Time Range */}
              <Modal
                openModalElement={
                  <EditIcon
                    className="w-[18px] h-[18px] text-color-text-secondary 
                     cursor-pointer"
                  />
                }
                closed={isClosedModal}
              >
                <UpdateRequestTimeRange
                  requestTimeId={requestTime.id}
                  app={props.app}
                  onSuccess={modalCloseHandler}
                />
              </Modal>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
