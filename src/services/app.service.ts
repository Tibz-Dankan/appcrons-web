import { url } from "@/constants";
import { TSearchInput } from "@/types/app";

export class AppService {
  search = async ({ userId, search, accessToken }: TSearchInput) => {
    const response = await fetch(
      `${url}/app/search?userId=${userId}&search=${search}`,
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
