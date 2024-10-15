/** @format */

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_BASE_API!,
    }),
    tagTypes: [
        "api",
        "event",
        "program",
        "user",
        "tutor",
        "moderator",
        "participant",
    ],
    endpoints: () => ({}),
});
