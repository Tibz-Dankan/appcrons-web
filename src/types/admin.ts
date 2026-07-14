import { TUser } from "./auth";

export type TUserAPIData = TUser & {
  appCount: number;
  createdAt: string;
  updatedAt: string;
};

export type TStatsAPIData = {
  userCount: number;
  appCount: number;
  requestCount: number;
  countryCount: number;
};

export type TAdminGetStats = {
  accessToken: string;
};

export type TCountryDistributionItem = {
  country: string;
  countryCode: string;
  userCount: number;
};

export type TAdminGetCountryDistribution = {
  accessToken: string;
};

export type TAdminSearchInput = {
  query: string;
  accessToken: string;
};

export type TAdminGetAllUsers = {
  accessToken: string;
  limit?: number;
  cursor?: string;
};

export type TAdminGetUser = {
  accessToken: string;
  userId: string;
};

export type TAdminGetAppsByUser = {
  userId: string;
  accessToken: string;
  limit?: number;
  cursor?: string;
};

export type TAdminGetRequestsByApp = {
  userId: string;
  appId: string;
  accessToken: string;
  before?: string;
};
