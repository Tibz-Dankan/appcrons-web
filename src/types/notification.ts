export type TNotification = {
  showCardNotification: boolean;
  cardNotificationType: string | null;
  cardMessage: string | null;
};

export type TNotificationUpdate = {
  type: string | null;
  message: string | null;
};
