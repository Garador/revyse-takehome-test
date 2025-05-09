import { createSlice } from "@reduxjs/toolkit";

export const AuthSlice = createSlice({
  name: "authProviderSlice",
  initialState: {
    user: null
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { setUser } = AuthSlice.actions
