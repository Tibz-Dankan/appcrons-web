import React, { ReactNode } from "react";
import { IconContext } from "react-icons";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { MdErrorOutline } from "react-icons/md";
import { MdOutlineWarningAmber } from "react-icons/md";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { IoCloseOutline } from "react-icons/io5";

interface NotificationProps {
  type: string | null;
  onClose: () => void;
  message: string | null;
}

interface NotificationIconProps {
  size?: string;
  color?: string;
  children: ReactNode;
}

const NotificationIcon: React.FC<NotificationIconProps> = (props) => {
  return (
    <IconContext.Provider
      value={{
        size: props.size ? props.size : "1.4rem",
        color: `${props.color}`,
      }}
    >
      {props.children}
    </IconContext.Provider>
  );
};

export const Notification: React.FC<NotificationProps> = (props) => {
  const type = props.type;
  let bgColor;
  let textColor;
  let borderColor;
  let icon;
  let title;

  if (type === "success") {
    title = "success";
    icon = (
      <NotificationIcon color="#55C57A">
        <IoMdCheckmarkCircleOutline />
      </NotificationIcon>
    );
    bgColor = "bg-[#55C57A]";
    textColor = "text-[#55C57A]";
    borderColor = "border-[#55C57A]";
  } else if (type === "error") {
    title = "error";
    icon = (
      <NotificationIcon color="#D9534F">
        <MdErrorOutline />
      </NotificationIcon>
    );
    bgColor = "bg-[#D9534F]";
    textColor = "text-[#D9534F]";
    borderColor = "border-[#D9534F]";
  } else if (type === "info") {
    title = "info";
    icon = (
      <NotificationIcon color="#5BC0DE">
        <IoMdInformationCircleOutline />
      </NotificationIcon>
    );
    bgColor = "bg-[#5BC0DE]";
    textColor = "text-[#5BC0DE]";
    borderColor = "border-[#5BC0DE]";
  } else if (type === "warning") {
    title = "warning";
    icon = (
      <NotificationIcon color="#F0AD4E">
        <MdOutlineWarningAmber />
      </NotificationIcon>
    );
    bgColor = "bg-[#F0AD4E]";
    textColor = "text-[#F0AD4E]";
    borderColor = "border-[#F0AD4E]";
  } else {
    title = "info";
    icon = (
      <NotificationIcon color="#5BC0DE">
        <IoMdInformationCircleOutline />
      </NotificationIcon>
    );
    bgColor = "bg-[#5BC0DE]";
    textColor = "text-[#5BC0DE]";
    borderColor = "border-[#5BC0DE]";
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
          <NotificationIcon color="#868e96" size="1.4rem">
            <IoCloseOutline />
          </NotificationIcon>
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
