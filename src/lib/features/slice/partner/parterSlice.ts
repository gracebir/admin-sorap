/** @format */

import {
    TcreatePartnerType,
    TInitialStatePatner,
    TPartner,
} from "@/types/partner";
import { apiSlice } from "../../apiSlice";
import { createSlice } from "@reduxjs/toolkit";

const initialState: TInitialStatePatner = {
    partners: null,
};

const partnerApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        addPartner: builder.mutation<
            {
                statusCode: number;
                status: string;
                message: string;
                data: TPartner;
            },
            TcreatePartnerType
        >({
            query: (value) => {
                return {
                    url: "/partner/create",
                    method: "POST",
                    body: value,
                    credentials: "include",
                };
            },
            invalidatesTags: ["partner"],
        }),
        getAllPartners: builder.query<
            {
                statusCode: number;
                status: string;
                message: string;
                data: Array<TPartner>;
            },
            null
        >({
            query: () => {
                return {
                    url: `/partner/all`,
                    method: "GET",
                    credentials: "include",
                };
            },
            providesTags: ["partner"],
        }),
        getPartnerById: builder.query<
            {
                statusCode: number;
                status: string;
                message: string;
                data: TPartner;
            },
            { id: number }
        >({
            query: ({ id }) => {
                return {
                    url: `/partner/${id}`,
                    method: "GET",
                    credentials: "include",
                };
            },
            providesTags: ["partner"],
        }),
        updatePartner: builder.mutation<
            {
                statusCode: number;
                status: string;
                message: string;
                data: TPartner;
            },
            { id: number; partner: Partial<TcreatePartnerType> }
        >({
            query: ({ id, partner }) => {
                return {
                    url: `/update/avatar/${id}`,
                    method: "PUT",
                    body: partner,
                    credentials: "include",
                };
            },
            invalidatesTags: ["partner"],
        }),
        updatePartnerAvatar: builder.mutation<
            {
                statusCode: number;
                status: string;
                message: string;
                data: TPartner;
            },
            { id: number; avatar: File | null }
        >({
            query: ({ id, avatar }) => {
                const formData = new FormData();
                formData.append("avatar", avatar!);
                return {
                    url: `/partner/update/avatar/${id}`,
                    method: "PUT",
                    body: formData,
                    credentials: "include",
                };
            },
            invalidatesTags: ["partner"],
        }),
    }),
});

const partnerSlice = createSlice({
    name: "partner",
    initialState,
    reducers: {},
});

export const {
    useAddPartnerMutation,
    useGetAllPartnersQuery,
    useGetPartnerByIdQuery,
    useUpdatePartnerMutation,
    useUpdatePartnerAvatarMutation,
} = partnerApi;

export default partnerSlice;