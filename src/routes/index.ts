export const routes = {
  common: ["/", "/docs"],
  auth: [
    "/auth/login",
    "/auth/signup",
    "/auth/forgot-password",
    "/auth/reset-password/*",
  ],
  protected: ["/dashboard/*", "/app/*"],
};
