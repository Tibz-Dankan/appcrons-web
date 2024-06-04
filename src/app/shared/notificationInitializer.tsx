"use client";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { hideCardNotification } from "@/store/actions/notification";
import { Notification } from "./notification";
import React, { useEffect } from "react";
import { TAuth } from "@/types/auth";
import { authActions } from "@/store";
// import { useGetAppLiveRequest } from "@/hooks/useGetAppLiveRequest";

const NotificationInitializer: React.FC = () => {
  const dispatch = useAppDispatch();
  const hideNotificationHandler = () => {
    dispatch(hideCardNotification());
  };
  const notification = useAppSelector((state) => state.notification);

  // useGetAppLiveRequest();

  useEffect(() => {
    const tryLogin = async () => {
      const strAuthData = localStorage.getItem("session");
      const parsedAuthData: TAuth = strAuthData && JSON.parse(strAuthData);

      const { user, accessToken } = parsedAuthData;

      if (!user || !accessToken) {
        localStorage.removeItem("session");
        return;
      }

      dispatch(authActions.authenticate(parsedAuthData));
    };
    tryLogin();
  }, [dispatch]);

  return (
    <div>
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
