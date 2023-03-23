import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducer/authSlice";
import { apiSlice } from "./api/authApi";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({}).concat(apiSlice.middleware),
  devTools: true,
});