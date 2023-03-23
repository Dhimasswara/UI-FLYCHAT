import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token: undefined,
  },
  reducers: {
    setCredentials: (state, { payload }) => {
      localStorage.setItem("token", payload?.token);
      state.user = payload.user;
      state.token = payload.token;
    },

    logout: (state, action) => {
      localStorage.clear()
      state.user = {};
      state.token = undefined;
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;