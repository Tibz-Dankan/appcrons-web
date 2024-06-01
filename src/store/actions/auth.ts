import { TAuth } from "@/types/auth";
import { clientURL } from "@/constants";

export const authenticate = async (accessToken: string, user: TAuth) => {
  const response = await fetch(
    `${clientURL}/auth/api/?accessToken=${accessToken}&user=${JSON.stringify(
      user
    )}`
  );

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message);
  }

  localStorage.setItem(
    "session",
    JSON.stringify({ accessToken: accessToken, user: user })
  );

  // return await response.json();
};
