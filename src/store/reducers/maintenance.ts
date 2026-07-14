import { TMaintenance } from "@/types/maintenance";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: TMaintenance = {
  active: false,
  message: "",
};

export const maintenanceSlice = createSlice({
  name: "maintenance",
  initialState,
  reducers: {
    activate(state, action: PayloadAction<{ message: string }>) {
      state.active = true;
      state.message = action.payload.message;
    },
    deactivate(state) {
      state.active = false;
      state.message = "";
    },
  },
});
