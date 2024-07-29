import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TRequest } from "@/types/app";

const initialState: { requests: TRequest[] } = {
  requests: [],
};

export const requestSlice = createSlice({
  name: "request",
  initialState,
  reducers: {
    update(state, action: PayloadAction<{ requests: TRequest[] }>) {
      state.requests = action.payload.requests;
    },
    clear(state) {
      state.requests = [];
    },
  },
});
