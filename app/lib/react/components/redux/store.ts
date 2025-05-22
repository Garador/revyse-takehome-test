import { configureStore } from "@reduxjs/toolkit";
import { AuthSlice } from "../auth/Auth.slice";

export const GeneralStore = configureStore({
  reducer: {
    auth: AuthSlice.reducer,
  },
});
