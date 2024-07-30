import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TRequest, TRequestPayload } from "@/types/app";

const initialState: { appId: string; requests: TRequest[] } = {
  appId: "",
  requests: [],
};

export const requestSlice = createSlice({
  name: "request",
  initialState,
  reducers: {
    update(state, action: PayloadAction<TRequestPayload>) {
      state.appId = action.payload.appId;
      state.requests = action.payload.requests;
    },

    AddOne(state, action: PayloadAction<{ request: TRequest }>) {
      const requestList = state.requests;
      const appId = state.appId;

      if (appId !== action.payload.request.appId) return;

      const candidateRequest = requestList.find((request) => {
        return request.id === action.payload.request.id;
      });
      if (candidateRequest) return;

      requestList.unshift(action.payload.request);
      if (state.requests.length >= 10) {
        requestList.pop();
      }

      state.requests = requestList;
    },

    clear(state) {
      state.requests = [];
    },
  },
});
