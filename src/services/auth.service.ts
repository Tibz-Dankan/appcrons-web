import { backendURL, clientURL } from "@/constants";
import { TSigninInPut, TSignupInput } from "@/types/auth";

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

  resetPassword = async ({ resetToken }: { resetToken: string }) => {
    const response = await fetch(
      `${backendURL}/auth/reset-password/${resetToken}`,
      {
        method: "PATCH",
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
}
