import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./User.Slice";
export const store = configureStore({
  reducer: {
    user: userReducer,
  },
});
