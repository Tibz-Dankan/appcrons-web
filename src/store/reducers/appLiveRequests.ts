import { TAppLiveRequestMap, TAppLiveRequestPayload } from "@/types/app";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: TAppLiveRequestMap = {
  apps: {},
};

export const appLiveRequestSlice = createSlice({
  name: "appLiveRequest",
  initialState,
  reducers: {
    update(state, action: PayloadAction<TAppLiveRequestPayload>) {
      state.apps[`${action.payload.appId}`] = action.payload.app;
    },
    clear(state, action) {
      delete state.apps[`${action.payload.appId}`];
    },
    clearAll(state) {
      state.apps = {};
    },
  },
});
