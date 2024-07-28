import React from "react";
import { CheckIcon } from "@/app/shared/Icons/CheckIcon";
import { ErrorIcon } from "@/app/shared/Icons/ErrorIcon";
import { InfoIcon } from "@/app/shared/Icons/InfoIcon";
import { WarningIcon } from "@/app/shared/Icons/WarningIcon";
import { CloseIcon } from "@/app/shared/Icons/CloseIcon";

interface NotificationProps {
  type: string | null;
  onClose: () => void;
  message: string | null;
}

export const Notification: React.FC<NotificationProps> = (props) => {
  const type = props.type;

  let bgColor;
  let textColor;
  let borderColor;
  let icon;
  let title;

  if (type === "success") {
    title = "success";
    icon = <CheckIcon className="text-success" />;
    bgColor = "bg-success";
    textColor = "text-success";
    borderColor = "border-success";
  } else if (type === "error") {
    title = "error";
    icon = <ErrorIcon className="text-error" />;
    bgColor = "bg-error";
    textColor = "text-error";
    borderColor = "border-error";
  } else if (type === "info") {
    title = "info";
    icon = <InfoIcon className="text-info" />;
    bgColor = "bg-info";
    textColor = "text-info";
    borderColor = "border-info";
  } else if (type === "warning") {
    title = "warning";
    icon = <WarningIcon className="text-warning" />;
    bgColor = "bg-warning";
    textColor = "text-warning";
    borderColor = "border-warning";
  } else {
    title = "info";
    icon = <InfoIcon className="text-info" />;
    bgColor = "bg-info";
    textColor = "text-info";
    borderColor = "border-info";
  }

  return (
    <div className="w-full fixed top-0 grid place-items-center">
      <div
        className={`border-[1px] border-color-border-primary 
         absolute top-5 z-[10000] flex w-72 animate-slideDown
         flex-col items-start rounded-[2px] 
         bg-color-bg-secondary py-2 pl-6 text-lg shadow-2xl`}
      >
        <span
          className="absolute right-3 top-3 cursor-pointer"
          onClick={props.onClose}
        >
          <CloseIcon className="text-[#868e96] w-6 h-6" />
        </span>
        <div
          className={`absolute left-0 top-0 h-full w-3 ${bgColor}
           border-y-[1px] rounded-l-[2px] ${borderColor}`}
        />
        <div className={`flex items-center justify-start gap-3 ${textColor}`}>
          <div>{icon}</div>
          <span className="first-letter:uppercase">{title}</span>
        </div>
        <div className="text-color-text-primary">
          <span className="text-sm leading-[4px]">{props.message}</span>
        </div>
      </div>
    </div>
  );
};
