/** @format */

import {
    TcreateInstructorType,
    TInitialStateType,
    TinstructorType,
    TResponseInstructorType,
} from "@/types/instructor";
import { apiSlice } from "../../apiSlice";
import { createSlice } from "@reduxjs/toolkit";
import { createInstructorFormData } from "@/helper/funct";

const initialState: TInitialStateType = {
    instructor: null,
};

const instructorApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllInstructors: builder.query<TResponseInstructorType, null>({
            query: () => {
                return {
                    url: "/instructor/all",
                    credentials: "include",
                };
            },
            providesTags: ["instructor"],
        }),
        getInstructorByid: builder.query<
            {
                statusCode: number;
                status: string;
                message: string;
                data: TinstructorType;
            },
            { id: number }
        >({
            query: ({ id }) => {
                return {
                    url: `/instructor/${id}`,
                    method: "GET",
                    credentials: "include",
                };
            },
            providesTags: ["instructor"],
        }),
        createInstructor: builder.mutation<
            {
                statusCode: number;
                status: string;
                message: string;
                data: TinstructorType;
            },
            TcreateInstructorType
        >({
            query: (value) => {
                const formData = createInstructorFormData(value);
                return {
                    url: "/instructor/create",
                    method: "POST",
                    body: formData,
                    credentials: "include",
                };
            },
            invalidatesTags: ["instructor"],
        }),
        updateInstructorAvatar: builder.mutation<
            {
                statusCode: number;
                status: string;
                message: string;
                data: TinstructorType;
            },
            { id: number; avatar: File | null }
        >({
            query: ({ id, avatar }) => {
                const formaData = new FormData();
                formaData.append("avatar", avatar!);
                return {
                    url: `/instructor/update/avatar/${id}`,
                    method: "PUT",
                    body: formaData,
                };
            },
            invalidatesTags: ["instructor"],
        }),
        updateInstructor: builder.mutation<
            {
                statusCode: number;
                status: string;
                message: string;
                data: TinstructorType;
            },
            { id: number; instructor: Partial<TcreateInstructorType> }
        >({
            query: ({ id, instructor }) => {
                return {
                    url: `/instructor/update/${id}`,
                    method: "PUT",
                    body: instructor,
                };
            },
            invalidatesTags: ["instructor"],
        }),
    }),
});

const instructorSlice = createSlice({
    name: "instructor",
    initialState,
    reducers: {},
});

export const {
    useCreateInstructorMutation,
    useGetAllInstructorsQuery,
    useGetInstructorByidQuery,
    useUpdateInstructorAvatarMutation,
    useUpdateInstructorMutation,
} = instructorApi;

export default instructorSlice;
