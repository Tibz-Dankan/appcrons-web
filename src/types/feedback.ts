export type TFeedback = {
  userId: string;
  rating: number;
  message: string;
  createdAt: string;
  updatedAt: string;
};

export type TPostFeedback = {
  userId: string;
  rating: number;
  message: string;
  accessToken: string;
};

export type TUpdateFeedback = {
  userId: string;
  rating: number;
  message: string;
  accessToken: string;
};
