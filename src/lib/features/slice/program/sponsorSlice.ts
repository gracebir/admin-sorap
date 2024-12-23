/** @format */

import { TsponsorInput, TsponsorState } from "@/types/program";
import { apiSlice } from "../../apiSlice";
import { createSlice } from "@reduxjs/toolkit";

const initialState: TsponsorState = {
    sponsor: null,
};

const sponsorApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        addSponsor: builder.mutation<null, TsponsorInput>({
            query: (value) => {
                return {
                    url: `/sponsor/add`,
                    method: "POST",
                    body: value,
                    credentials: "include",
                };
            },
        }),
        getProgramSponsorById: builder.query<null, { id: number }>({
            query: ({ id }) => {
                return {
                    url: `/program/sponsor/${id}`,
                    credentials: "include",
                    method: "GET",
                };
            },
        }),
        removeSponsor: builder.mutation<null, { sponsorId: number }>({
            query: ({ sponsorId }) => {
                return {
                    method: "DELETE",
                    url: `/program/sponsor/${sponsorId}`,
                    credentials: "include",
                };
            },
        }),
    }),
});

const sponsorSlice = createSlice({
    initialState,
    name: "sponsor",
    reducers: {},
});

export const {
    useAddSponsorMutation,
    useGetProgramSponsorByIdQuery,
    useRemoveSponsorMutation,
} = sponsorApi;

export default sponsorSlice;
