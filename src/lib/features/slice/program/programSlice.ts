/** @format */

import {
    TcreateProgramEntry,
    TprogramReponse,
    TprogramState,
    TprogramType,
} from "@/types/program";
import { apiSlice } from "../../apiSlice";
import { createSlice } from "@reduxjs/toolkit";
import { createProgramFormData } from "@/helper/funct";

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
        getProgramById: builder.query<
            {
                statusCode: number;
                status: string;
                message: string;
                data: TprogramType;
            },
            { id: number }
        >({
            query: ({ id }) => {
                return {
                    url: `/program/${id}`,
                    credentials: "include",
                    method: "GET",
                };
            },
            providesTags: ["program"],
            keepUnusedDataFor: 5000,
        }),
        createProgram: builder.mutation<
            {
                statusCode: number;
                status: string;
                message: string;
                data: TprogramType;
            },
            TcreateProgramEntry
        >({
            query: (value) => {
                const formData = createProgramFormData(value);
                return {
                    url: "/program/create",
                    method: "POST",
                    credentials: "include",
                    body: formData,
                };
            },
            invalidatesTags: ["program"],
        }),
        updateProgram: builder.mutation<
            {
                statusCode: number;
                status: string;
                message: string;
                data: TprogramType;
            },
            { id: number; program: Partial<TcreateProgramEntry> }
        >({
            query: ({ id, program }) => {
                return {
                    url: `/program/update/${id}`,
                    method: "PUT",
                    body: program,
                    credentials: "include",
                };
            },
            invalidatesTags: ["program"],
        }),
        updateProgramThumbnail: builder.mutation<
            {
                statusCode: number;
                status: string;
                message: string;
                data: TprogramType;
            },
            { id: number; thumbnail: File | null }
        >({
            query: ({ id, thumbnail }) => {
                const formData = new FormData();
                formData.append("thumbnail", thumbnail!);
                return {
                    url: `/program/update/thumbnail/${id}`,
                    credentials: "include",
                    body: formData,
                    method: "PUT",
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
        launchProgram: builder.mutation<
            {
                statusCode: number;
                status: string;
                message: string;
                data: TprogramType;
            },
            { id: number }
        >({
            query: ({ id }) => {
                return {
                    url: `/program/launch/${id}`,
                    method: "PUT",
                    credentials: "include",
                };
            },
            invalidatesTags: ["program"],
        }),
    }),
});

const programSlice = createSlice({
    name: "program",
    initialState,
    reducers: {},
});

export const {
    useGetAllProgramsQuery,
    useCreateProgramMutation,
    useUpdateProgramMutation,
    useGetProgramByIdQuery,
    useUpdateProgramThumbnailMutation,
    useLaunchProgramMutation,
} = programApi;

export default programSlice;
