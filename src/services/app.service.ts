import { backendURL } from "@/constants";
import {
  TDisableApp,
  TEnableApp,
  TGetApp,
  TGetAppByUser,
  TPostApp,
  TSearchInput,
  TUpdateApp,
} from "@/types/app";

export class AppService {
  post = async ({ name, url, requestInterval, accessToken }: TPostApp) => {
    const response = await fetch(`${backendURL}/apps/post`, {
      method: "POST",
      body: JSON.stringify({
        name,
        url,
        requestInterval,
      }),
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

  update = async ({
    appId,
    name,
    url,
    requestInterval,
    accessToken,
  }: TUpdateApp) => {
    const response = await fetch(`${backendURL}/apps/update/${appId}`, {
      method: "PATCH",
      body: JSON.stringify({
        name,
        url,
        requestInterval,
      }),
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

  search = async ({ userId, search, accessToken }: TSearchInput) => {
    const response = await fetch(
      `${backendURL}/app/search?userId=${userId}&search=${search}`,
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

  get = async ({ appId, accessToken }: TGetApp) => {
    const response = await fetch(`${backendURL}/apps/get/${appId}`, {
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

  getByUser = async ({ userId, accessToken }: TGetAppByUser) => {
    const response = await fetch(
      `${backendURL}/apps/get-by-user?userId=${userId}`,
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

  getAppsLastRequestByUser = async ({ userId, accessToken }: TGetAppByUser) => {
    const response = await fetch(
      `${backendURL}/apps/get-apps-last-request-by-user?userId=${userId}`,
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

  enable = async ({ appId, accessToken }: TEnableApp) => {
    const response = await fetch(`${backendURL}/apps/enable/${appId}`, {
      method: "PATCH",
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

  disable = async ({ appId, accessToken }: TDisableApp) => {
    const response = await fetch(`${backendURL}/apps/disable/${appId}`, {
      method: "PATCH",
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

  delete = async ({ appId, accessToken }: TDisableApp) => {
    const response = await fetch(`${backendURL}/apps/delete/${appId}`, {
      method: "DELETE",
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

  // TODO: To add authenticate API here
}
