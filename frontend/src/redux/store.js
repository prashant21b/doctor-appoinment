import { configureStore } from "@reduxjs/toolkit";
import { alertSlice } from "./Slices/alertSlice";

import { userSlice } from "./Slices/userSlice";
import { bookingSlice } from "./Slices/bookingSlice";
export const store = configureStore({
  reducer: {
    alerts: alertSlice.reducer,
    user: userSlice.reducer,
    booking:bookingSlice.reducer,
  },
});