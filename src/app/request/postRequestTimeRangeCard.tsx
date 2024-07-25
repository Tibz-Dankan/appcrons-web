"use client";
import React, { useEffect, useState } from "react";
import { PostRequestTimeRange } from "@/app/request/postRequestTimeRange";
import { useAppSelector } from "@/hooks/redux";
import { Modal } from "@/app/shared/modal";
import Button from "@/app/shared/button";

interface PostRequestTimeRangeCardProps {
  appId: string;
}

export const PostRequestTimeRangeCard: React.FC<
  PostRequestTimeRangeCardProps
> = (props) => {
  const app = useAppSelector((state) =>
    state.app.apps.find((app) => app.id === props.appId)
  )!;
  const [isClosedModal, setIsClosedModal] = useState(false);

  const modalCloseHandler = (close: boolean) => {
    setIsClosedModal(() => close);
  };

  // Update 'isClosedModal' to it's default
  // value 'false' After 1 second
  useEffect(() => {
    if (!isClosedModal) return;
    const timeoutId = setTimeout(() => {
      setIsClosedModal(() => false);
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [isClosedModal]);

  return (
    <div
      className="w-full border-[1px] border-color-border-primary 
        rounded-md bg-color-bg-primary text-color-text-secondary"
    >
      <div
        className="w-full flex items-center justify-between gap-2
        p-1 text-base bg-color-bg-secondary rounded-t-md
        border-b-[1px] border-color-border-primary text-color-text-primary"
      >
        <span className="ml-7 text-base font-semibold">
          Request Time Frame(RTF)
        </span>
        <Modal
          openModalElement={
            <Button
              label={
                <div className="flex items-center justify-center">
                  <span>New</span>
                </div>
              }
              type={"button"}
              className="w-auto h-8"
            />
          }
          closed={isClosedModal}
        >
          <PostRequestTimeRange app={app} onSuccess={modalCloseHandler} />
        </Modal>
      </div>
      <div className="w-full p-6">
        <p className="leading-[23px]">
          Request Time Frame allows you to add time range(s) in which your
          server should receive requests in your preferred timezone. You can add
          multiple RTFs for a single application.
        </p>
      </div>
    </div>
  );
};
