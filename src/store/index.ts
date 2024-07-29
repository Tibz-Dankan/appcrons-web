import { configureStore } from "@reduxjs/toolkit";
import { notificationSlice } from "./reducers/notification";
import { authSlice } from "./reducers/auth";
import { appLiveRequestSlice } from "./reducers/appLiveRequests";
import { appSlice } from "./reducers/app";
import { requestSlice } from "./reducers/request";
import { pageLoaderSlice } from "./reducers/pageLoader";

export const makeStore = () => {
  return configureStore({
    reducer: {
      auth: authSlice.reducer,
      notification: notificationSlice.reducer,
      app: appSlice.reducer,
      request: requestSlice.reducer,
      appLiveRequest: appLiveRequestSlice.reducer,
      pageLoader: pageLoaderSlice.reducer,
    },
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
// Store update actions
export const authActions = authSlice.actions;
export const notificationActions = notificationSlice.actions;
export const appActions = appSlice.actions;
export const requestActions = requestSlice.actions;
export const appLiveRequestActions = appLiveRequestSlice.actions;
export const pageLoaderActions = pageLoaderSlice.actions;
