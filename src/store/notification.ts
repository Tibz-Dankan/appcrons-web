"use client";

import { TNotification, TNotificationUpdate } from "@/types/notification";
import { create } from "zustand";

type State = {
  notification: TNotification;
};

type Action = {
  showCardNotification: (notification: TNotificationUpdate) => void;
  hideCardNotification: () => void;
};

export const useNotificationStore = create<State & Action>((set) => ({
  notification: {
    showCardNotification: false,
    cardNotificationType: "",
    cardMessage: "",
  },
  showCardNotification: (notification: TNotificationUpdate) =>
    set({
      notification: {
        showCardNotification: true,
        cardNotificationType: notification.type,
        cardMessage: notification.message,
      },
    }),
  hideCardNotification: () =>
    set({
      notification: {
        showCardNotification: false,
        cardNotificationType: "",
        cardMessage: "",
      },
    }),
}));
