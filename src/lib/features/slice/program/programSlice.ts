/** @format */

import {
    TcreateProgramEntry,
    TprogramReponse,
    TprogramState,
    TprogramType,
} from "@/types/program";
import { apiSlice } from "../../apiSlice";
import { createSlice } from "@reduxjs/toolkit";

const initialState: TprogramState = {
    programs: null,
};

const programApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllPrograms: builder.query<TprogramReponse, null>({
            query: () => {
                return {
                    url: "/program/all",
                    method: "GET",
                    credentials: "include",
                };
            },
            providesTags: ["program"],
            keepUnusedDataFor: 5000,
        }),
        createProgram: builder.mutation<null, TcreateProgramEntry>({
            query: (value) => {
                return {
                    url: "/program/create",
                    method: "POST",
                    credentials: "include",
                    body: value,
                };
            },
            invalidatesTags: ["program"],
        }),
        updateProgram: builder.mutation<
            null,
            { id: number; program: Partial<TcreateProgramEntry> }
        >({
            query: ({ id, program }) => {
                return {
                    url: `/program/${id}`,
                    method: "PUT",
                    body: program,
                    credentials: "include",
                };
            },
            invalidatesTags: ["program"],
        }),
        filterProgramByDateRange: builder.query<
            TprogramReponse,
            { start_date: Date; end_date: Date }
        >({
            query: ({ start_date, end_date }) => {
                return {
                    url: `/program/date?date_from=${start_date}&date_to=${end_date}`,
                    method: "GET",
                    credentials: "include",
                };
            },
            providesTags: ["program"],
        }),
    }),
});

const programSlice = createSlice({
    name: "program",
    initialState,
    reducers: {},
});
