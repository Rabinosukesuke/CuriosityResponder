import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlices";

export const store = configureStore({
    reducer: {
        auth: authReducer,
    },
});
export type AppDispatch = typeof store.dispatch;