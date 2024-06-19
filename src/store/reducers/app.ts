import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TAppListPayload, TAppPayload } from "@/types/app";

const initialState: TAppListPayload = {
  apps: [],
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    update(state, action: PayloadAction<TAppListPayload>) {
      state.apps = action.payload.apps;
    },

    addOne(state, action: PayloadAction<TAppPayload>) {
      const foundApp = state.apps.find((app) => {
        return app.id === action.payload.app.id;
      });
      if (foundApp?.id) return;

      state.apps.unshift(action.payload.app);
    },
    updateOne(state, action: PayloadAction<TAppPayload>) {
      const appIndex: number = state.apps.findIndex((app) => {
        return app.id === action.payload.app.id;
      });
      if (appIndex === -1) return;

      state.apps[appIndex] = action.payload.app;
    },
    deleteOne(state, action: PayloadAction<{ appId: string }>) {
      state.apps = state.apps.filter((app) => {
        return app.id !== action.payload.appId;
      });
    },
    clearAll(state) {
      state.apps = [];
    },
  },
});
