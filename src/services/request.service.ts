import { backendURL } from "@/constants";
import {
  TDeleteRequestTime,
  TGetRequestsByApp,
  TPostRequestTime,
  TUpdateRequestTime,
  TUpdateTimeZone,
} from "@/types/app";

export class RequestService {
  getByApp = async ({ appId, before, accessToken }: TGetRequestsByApp) => {
    const response = await fetch(
      `${backendURL}/requests/get-by-app?appId=${appId}&before=${before}`,
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

  postRequestTimeRange = async ({
    appId,
    start,
    end,
    timeZone,
    accessToken,
  }: TPostRequestTime) => {
    const response = await fetch(`${backendURL}/requests/post-request-time`, {
      method: "POST",
      body: JSON.stringify({
        appId: appId,
        start: start,
        end: end,
        timeZone: timeZone,
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

  updateRequestTimeRange = async ({
    requestTimeId,
    appId,
    start,
    end,
    timeZone,
    accessToken,
  }: TUpdateRequestTime) => {
    const response = await fetch(
      `${backendURL}/requests/update-request-time/${requestTimeId}`,
      {
        method: "PATCH",
        body: JSON.stringify({
          appId: appId,
          start: start,
          end: end,
          timeZone: timeZone,
        }),
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

  deleteRequestTimeRange = async ({
    requestTimeId,
    accessToken,
  }: TDeleteRequestTime) => {
    const response = await fetch(
      `${backendURL}/requests/delete-request-time/${requestTimeId}`,
      {
        method: "Delete",
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

  updateTimeZone = async ({
    appId,
    timeZone,
    accessToken,
  }: TUpdateTimeZone) => {
    const response = await fetch(`${backendURL}/requests/update-timezone`, {
      method: "PATCH",
      body: JSON.stringify({
        appId: appId,
        timeZone: timeZone,
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
}
