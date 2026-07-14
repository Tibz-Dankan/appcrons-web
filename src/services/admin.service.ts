import { backendURL } from "@/constants";
import {
  TAdminGetAllUsers,
  TAdminGetAppsByUser,
  TAdminGetCountryDistribution,
  TAdminGetRequestsByApp,
  TAdminGetStats,
  TAdminGetUser,
  TAdminSearchInput,
} from "@/types/admin";

export class AdminService {
  getStats = async ({ accessToken }: TAdminGetStats) => {
    const response = await fetch(`${backendURL}/admin/stats`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message);
    }
    return await response.json();
  };

  getAllUsers = async ({ accessToken, limit, cursor }: TAdminGetAllUsers) => {
    const response = await fetch(
      `${backendURL}/admin/users?limit=${limit}&cursor=${cursor}`,
      {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message);
    }
    return await response.json();
  };

  getUser = async ({ userId, accessToken }: TAdminGetUser) => {
    const response = await fetch(`${backendURL}/admin/users/${userId}`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message);
    }
    return await response.json();
  };

  getAppsByUser = async ({
    userId,
    accessToken,
    limit,
    cursor,
  }: TAdminGetAppsByUser) => {
    const response = await fetch(
      `${backendURL}/admin/users/${userId}/apps?limit=${limit}&cursor=${cursor}`,
      {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message);
    }
    return await response.json();
  };

  getRequestsByApp = async ({
    appId,
    userId,
    accessToken,
    before,
  }: TAdminGetRequestsByApp) => {
    const response = await fetch(
      `${backendURL}/admin/users/${userId}/apps/${appId}/requests?before=${before}`,
      {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message);
    }
    return await response.json();
  };

  getCountryDistribution = async ({
    accessToken,
  }: TAdminGetCountryDistribution) => {
    const response = await fetch(`${backendURL}/admin/users/countries`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message);
    }
    return await response.json();
  };

  search = async ({ query, accessToken }: TAdminSearchInput) => {
    const response = await fetch(
      `${backendURL}/admin/users/search?query=${query}`,
      {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message);
    }
    return await response.json();
  };
}
