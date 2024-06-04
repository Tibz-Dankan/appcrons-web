import { configureStore } from "@reduxjs/toolkit";
import { notificationSlice } from "./reducers/notification";
import { authSlice } from "./reducers/auth";
import { appLiveRequestSlice } from "./reducers/appLiveRequests";

export const makeStore = () => {
  return configureStore({
    reducer: {
      auth: authSlice.reducer,
      notification: notificationSlice.reducer,
      appLiveRequest: appLiveRequestSlice.reducer,
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
export const appLiveRequestActions = appLiveRequestSlice.actions;
