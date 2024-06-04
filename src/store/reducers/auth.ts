import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TAuth } from "@/types/auth";

const initialState: TAuth = {
  accessToken: "",
  user: {
    id: "",
    name: "",
    email: "",
    role: "admin",
  },
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    authenticate(state, action: PayloadAction<TAuth>) {
      state.accessToken = action.payload.accessToken;
      state.user = action.payload.user;
    },
    logout(state) {
      state = initialState;
    },
  },
});
