import { TPageLoader } from "@/types/pageLoader";
import { createSlice } from "@reduxjs/toolkit";

const initialState: TPageLoader = {
  showPageLoader: false,
};

export const pageLoaderSlice = createSlice({
  name: "pageLoader",
  initialState,
  reducers: {
    show(state) {
      state.showPageLoader = true;
    },
    hide(state) {
      state.showPageLoader = false;
    },
  },
});
