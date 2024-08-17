export type TSearchInput = {
  userId: string;
  query: string;
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

export type TRequestPayload = {
  appId: string;
  requests: TRequest[];
};

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

export type TUpdateTimeZone = {
  appId: string;
  timeZone: string;
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
  requests: TRequest[];
  requestTimes: TRequestTime[];
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
};

export type TAppPayload = {
  app: TApp;
};

export type TAppListPayload = {
  apps: TApp[];
};

export type TAppLiveRequest = TApp & {
  userId: string;
  message: string;
  inProgress: boolean;
};

// JS object containing key-value
// of the apps live requests
export type TAppLiveRequestMap = {
  apps: any;
  isLoading: boolean;
};

export type TAppLiveRequestPayload = {
  appId: string;
  app: TAppLiveRequest;
};

export type TAppLiveRequestLoadingStatus = {
  isLoading: boolean;
};
