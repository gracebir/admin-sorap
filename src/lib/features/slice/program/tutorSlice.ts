/** @format */

import { TtutorInput, TtutorResponse } from "@/types/program";
import { apiSlice } from "../../apiSlice";
import { createSlice } from "@reduxjs/toolkit";

const tutorApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        addSponsor: builder.mutation<null, TtutorInput>({
            query: (value) => {
                return {
                    url: `/program/tutor/add`,
                    method: "POST",
                    body: value,
                    credentials: "include",
                };
            },
        }),
        getTutorByProgramId: builder.query<
            TtutorResponse,
            { id: number; start_date: Date; end_date: Date }
        >({
            query: ({ id, start_date, end_date }) => {
                return {
                    url: `/program/${id}/tutor/date?date_from=${start_date}&date_to=${end_date}`,
                    method: "GET",
                    credentials: "include",
                };
            },
        }),
    }),
});

const sponsorSlice = createSlice({
    name: "sponsor",
    initialState: {
        sponsor: null,
    },
    reducers: {},
});

export const { useAddSponsorMutation } = tutorApi;

export default sponsorSlice;
