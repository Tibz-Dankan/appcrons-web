import { TRequestTime } from "@/types/app";
import React from "react";
import Button from "@/app/shared/button";

interface PostRequestTimeRangeProps {
  appId: string;
  requestTime: TRequestTime[];
}

export const PostRequestTimeRange: React.FC<PostRequestTimeRangeProps> = (
  props
) => {
  // TODO: validate existing requestTimes against the selected one
  // TODO: make an api call to post new request time to the backend
  // TODO: display time select elements in the modal
  return (
    <div>
      <div
        className="w-52 border-[1px] border-color-border-primary 
        rounded-md p-4 flex flex-col gap-4"
      >
        <p className="text-sm text-color-text-secondary">
          Add new request time frame for the app
        </p>
        <Button label={"New"} type={"button"} />
      </div>
    </div>
  );
};
