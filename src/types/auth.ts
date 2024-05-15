export type TUser = {
  userId: string;
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
