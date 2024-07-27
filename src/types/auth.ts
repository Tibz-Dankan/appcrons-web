export type TUser = {
  id: string;
  name: string;
  email: string;
  role: "admin" | "client" | "staff";
};

export type TSigninInPut = {
  email: string;
  password: string;
};

export type TSignupInput = {
  name: string;
  email: string;
  password: string;
};

export type TAuth = {
  user: TUser;
  accessToken: string;
};

export type TUpdateUser = {
  id: string;
  email: string;
  name: string;
  accessToken: string;
};

export type TChangePassword = {
  id: string;
  currentPassword: string;
  newPassword: string;
  accessToken: string;
};

export type TResetPassword = {
  resetToken: string;
  newPassword: string;
  confirmPassword: string;
};
