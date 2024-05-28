import { backendURL } from "@/constants";
import { TPostApp, TSearchInput } from "@/types/app";

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

  search = async ({ userId, search, accessToken }: TSearchInput) => {
    const response = await fetch(
      `${backendURL}/app/search?userId=${userId}&search=${search}`,
      {
        method: "POST",
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
