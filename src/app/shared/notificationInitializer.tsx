"use client";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { hideCardNotification } from "@/store/actions/notification";
import { Notification } from "./notification";
import React from "react";
import { useGetAppLiveRequest } from "@/hooks/useGetAppLiveRequest";
import { PageLoader } from "@/app/shared/loader/pageLoader";

const NotificationInitializer: React.FC = () => {
  const dispatch = useAppDispatch();
  const hideNotificationHandler = () => {
    dispatch(hideCardNotification());
  };
  const notification = useAppSelector((state) => state.notification);

  useGetAppLiveRequest();

  return (
    <div>
      <PageLoader />{" "}
      {/*TODO: to use redux for conditionally rendering the loader*/}
      {notification.showCardNotification && (
        <div>
          <Notification
            type={notification.cardNotificationType}
            message={notification.cardMessage}
            onClose={hideNotificationHandler}
          />
        </div>
      )}
    </div>
  );
};

export default NotificationInitializer;
