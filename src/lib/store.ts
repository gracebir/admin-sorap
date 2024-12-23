/** @format */

import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./features/apiSlice";
import authSlice from "./features/slice/authSlice";
import eventSlice from "./features/slice/event/eventSlice";
import instructorSlice from "./features/slice/instructor/instructorSlice";
import partnerSlice from "./features/slice/partner/parterSlice";

export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: authSlice.reducer,
        event: eventSlice.reducer,
        instructor: instructorSlice.reducer,
        partner: partnerSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiSlice.middleware),
});

// Infer the type of makeStore
export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
