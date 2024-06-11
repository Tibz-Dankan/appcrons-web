export type TSearchInput = {
  userId: string;
  search: string;
  accessToken: string;
};

export type TGetAppByUser = {
  userId: string;
  accessToken: string;
};

export type TGetApp = {
  appId: string;
  accessToken: string;
};

export type TGetRequestsByApp = {
  appId: string;
  before: string;
  accessToken: string;
};

export type TPostApp = {
  name: string;
  url: string;
  requestInterval: string;
  accessToken: string;
};

export type TUpdateApp = {
  appId: string;
  name: string;
  url: string;
  requestInterval: string;
  accessToken: string;
};

export type TDisableApp = {
  appId: string;
  accessToken: string;
};

export type TEnableApp = {
  appId: string;
  accessToken: string;
};

export type TRequest = {
  id: string;
  appId: string;
  statusCode: number;
  duration: number;
  startedAt: string;
  createdAt: string;
  deletedAt: string | null;
};

// "appId": "4c370145-f8dc-4cd8-833f-3ca74d6ea033",
// "start": "4:00:00",
// "end": "5:00:00",
// "timeZone": "Africa/Nairobi"

export type TPostRequestTime = {
  appId: string;
  start: string;
  end: string;
  timeZone: string;
  accessToken: string;
};

export type TUpdateRequestTime = TPostRequestTime & {
  requestTimeId: string;
};

export type TDeleteRequestTime = {
  requestTimeId: string;
  accessToken: string;
};

export type TRequestTime = {
  id: string;
  appId: string;
  start: string;
  end: string;
  timeZone: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
};

export type TApp = {
  id: string;
  userId: string;
  name: string;
  url: string;
  requestInterval: string;
  isDisabled: boolean;
  requests: TRequest[] | null;
  requestTimes: TRequestTime[] | null;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
};

export type TAppLiveRequest = TApp & {
  userId: string;
  message: string;
  arrivedAt: string;
};

// JS object containing key-value
// of the apps live requests
export type TAppLiveRequestMap = {
  apps: any;
};

export type TAppLiveRequestPayload = {
  appId: string;
  app: TAppLiveRequest;
};
