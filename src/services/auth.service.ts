import { backendURL, clientURL } from "@/constants";
import {
  TAuth,
  TChangePassword,
  TResetPassword,
  TSigninInPut,
  TSignupInput,
  TUpdateUser,
} from "@/types/auth";

export class AuthService {
  signIn = async ({ email, password }: TSigninInPut) => {
    const response = await fetch(`${backendURL}/auth/signin`, {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
      }),
      headers: {
        "Content-type": "application/json",
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message);
    }
    return await response.json();
  };

  signUp = async ({ name, email, password }: TSignupInput) => {
    const response = await fetch(`${backendURL}/auth/signup`, {
      method: "POST",
      body: JSON.stringify({
        name,
        email,
        password,
      }),
      headers: {
        "Content-type": "application/json",
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message);
    }
    return await response.json();
  };

  authenticateClient = async (accessToken: string, user: TAuth) => {
    console.log("accessToken:", accessToken);
    console.log("user:", user);
    if (!accessToken || !user) {
      throw new Error("No user details or accessToken!");
    }
    const response = await fetch(
      `${clientURL}/auth/api/?accessToken=${accessToken}&user=${JSON.stringify(
        user
      )}`
    );

    if (!response.ok) {
      // const error = await response.json();
      // throw new Error(error.message);
      console.log("response status:", response.status);
      console.log("response error:", response);
      throw new Error("Something went wrong when authenticating client");
    }

    localStorage.setItem(
      "session",
      JSON.stringify({ accessToken: accessToken, user: user })
    );

    // return await response.json();
  };

  forgotPassword = async ({ email }: { email: string }) => {
    const response = await fetch(`${backendURL}/auth/forgot-password`, {
      method: "POST",
      body: JSON.stringify({
        email,
      }),
      headers: {
        "Content-type": "application/json",
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message);
    }
    return await response.json();
  };

  resetPassword = async ({ resetToken, newPassword }: TResetPassword) => {
    const response = await fetch(
      `${backendURL}/auth/reset-password/${resetToken}`,
      {
        method: "PATCH",
        body: JSON.stringify({
          password: newPassword,
        }),
        headers: {
          "Content-type": "application/json",
        },
      }
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message);
    }
    return await response.json();
  };

  logOut = async () => {
    const response = await fetch(`${clientURL}/auth/api/logout`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message);
    }

    // return await response.json();
    return {};
  };

  updateUserDetails = async ({ id, email, name, accessToken }: TUpdateUser) => {
    const response = await fetch(`${backendURL}/auth/user/update/${id}`, {
      method: "PATCH",
      body: JSON.stringify({
        email,
        name,
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

  changePassword = async ({
    id,
    currentPassword,
    newPassword,
    accessToken,
  }: TChangePassword) => {
    const response = await fetch(
      `${backendURL}/auth/user/update-password/${id}`,
      {
        method: "PATCH",
        body: JSON.stringify({
          currentPassword,
          newPassword,
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
}
