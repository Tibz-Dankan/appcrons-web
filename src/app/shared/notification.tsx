import React, { Fragment, ReactNode } from "react";
import { IconContext } from "react-icons";
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
        color: props.color ? props.color : "#343a40",
      }}
    >
      {props.children}
    </IconContext.Provider>
  );
};

export const Notification: React.FC<NotificationProps> = (props) => {
  const { type, onClose, message } = props;
  let notificationElement: ReactNode;

  if (type === "success") {
    notificationElement = (
      <div role="alert" className="alert alert-success rounded-md">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="stroke-current shrink-0 h-6 w-6 text-[#e9ecef]"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <span className="text-[#e9ecef]">{message}</span>
        <div>
          <span className="cursor-pointer" onClick={onClose}>
            <NotificationIcon size="1.4rem" color="#e9ecef">
              <IoCloseOutline />
            </NotificationIcon>
          </span>
        </div>
      </div>
    );
  } else if (type === "error") {
    notificationElement = (
      <div role="alert" className="alert alert-error rounded-md">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="stroke-current shrink-0 h-6 w-6 text-[#e9ecef]"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <span className="text-[#e9ecef]">{message}</span>
        <div>
          <span className="cursor-pointer" onClick={onClose}>
            <NotificationIcon size="1.4rem" color="#e9ecef">
              <IoCloseOutline />
            </NotificationIcon>
          </span>
        </div>
      </div>
    );
  } else if (type === "info") {
    notificationElement = (
      <div role="alert" className="alert alert-info rounded-md">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          className="stroke-current shrink-0 w-6 h-6 text-[#e9ecef]"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          ></path>
        </svg>
        <span className="text-[#e9ecef]">{message}</span>
        <div>
          <span className="cursor-pointer" onClick={onClose}>
            <NotificationIcon size="1.4rem" color="#e9ecef">
              <IoCloseOutline />
            </NotificationIcon>
          </span>
        </div>
      </div>
    );
  } else if (type === "warning") {
    notificationElement = (
      <div role="alert" className="alert alert-warning rounded-md">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="stroke-current shrink-0 h-6 w-6 text-[#e9ecef]"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
        <span className="text-[#e9ecef]">{message}</span>
        <div>
          <span className="cursor-pointer" onClick={onClose}>
            <NotificationIcon size="1.4rem" color="#e9ecef">
              <IoCloseOutline />
            </NotificationIcon>
          </span>
        </div>
      </div>
    );
  } else {
    notificationElement = (
      <div role="alert" className="alert alert-info rounded-md">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="stroke-current shrink-0 h-6 w-6 text-[#e9ecef]"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <span className="text-[#e9ecef]">{message}</span>
        <div>
          <span className="cursor-pointer" onClick={onClose}>
            <NotificationIcon size="1.4rem" color="#e9ecef">
              <IoCloseOutline />
            </NotificationIcon>
          </span>
        </div>
      </div>
    );
  }

  return (
    <Fragment>
      <div
        className="relative z-[-1000] grid place-items-center
         w-full animate-slideDown"
      >
        <div
          className="absolute top-5 right-5s  z-[10000] 
           flex flex-col items-center justify-start w-72
           sm:w-80"
        >
          {notificationElement}
        </div>
      </div>
    </Fragment>
  );
};
