/** @format */

import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./features/apiSlice";
import authSlice from "./features/slice/authSlice";
import eventSlice from "./features/slice/event/eventSlice";

export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: authSlice.reducer,
        event: eventSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiSlice.middleware),
});

// Infer the type of makeStore
export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
