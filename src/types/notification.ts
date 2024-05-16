export type TNotification = {
  showCardNotification: boolean;
  cardNotificationType: string | null;
  cardMessage: string | null;
};

// To be removed
export type TNotificationUpdate = {
  type: string | null;
  message: string | null;
};

export type TNotificationPayload = {
  type: string;
  message: string;
};
