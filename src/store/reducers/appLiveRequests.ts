import {
  TAppLiveRequestLoadingStatus,
  TAppLiveRequestMap,
  TAppLiveRequestPayload,
} from "@/types/app";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: TAppLiveRequestMap = {
  apps: {},
  isLoading: false,
};

export const appLiveRequestSlice = createSlice({
  name: "appLiveRequest",
  initialState,
  reducers: {
    update(state, action: PayloadAction<TAppLiveRequestPayload>) {
      state.apps[`${action.payload.appId}`] = action.payload.app;
    },
    updateLoadingStatus(
      state,
      action: PayloadAction<TAppLiveRequestLoadingStatus>
    ) {
      state.isLoading = action.payload.isLoading;
    },
    clear(state, action) {
      delete state.apps[`${action.payload.appId}`];
    },
    clearAll(state) {
      state.apps = {};
    },
  },
});
