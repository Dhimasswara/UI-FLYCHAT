import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducer/authSlice";
import updateUserActive from "./reducer/listUser";
import { apiSlice } from "./api/authApi";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
    userOnline : updateUserActive
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({}).concat(apiSlice.middleware),
  devTools: true,
});