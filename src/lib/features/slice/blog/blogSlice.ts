/** @format */

import {
    TblogInitialState,
    TBlogResponse,
    TBlogSingleResponse,
    TcreateBlog,
} from "@/types/blog";
import { apiSlice } from "../../apiSlice";
import { createBlogFormData } from "@/helper/funct";
import { createSlice } from "@reduxjs/toolkit";

const initialState: TblogInitialState = {
    blog: null,
};

const blogApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllBlog: builder.query<TBlogResponse, null>({
            query: () => {
                return {
                    url: "/blog/all",
                    method: "GET",
                    credentials: "include",
                };
            },
            providesTags: ["blog"],
        }),
        getBlogById: builder.query<TBlogSingleResponse, { id: number }>({
            query: ({ id }) => {
                return {
                    url: `/blog/single/${id}`,
                    method: "GET",
                    credentials: "include",
                };
            },
            providesTags: ["blog"],
        }),
        createBlog: builder.mutation<TBlogSingleResponse, TcreateBlog>({
            query: (value) => {
                const formaData = createBlogFormData(value);
                return {
                    url: "/blog/create",
                    body: formaData,
                    method: "POST",
                    credentials: "include",
                };
            },
            invalidatesTags: ["blog"],
        }),
        updateBlog: builder.mutation<
            TBlogSingleResponse,
            { value: TcreateBlog; id: number }
        >({
            query: (value) => {
                const formaData = createBlogFormData(value.value);
                return {
                    url: `/blog/update/${value.id}`,
                    body: formaData,
                    method: "PUT",
                    credentials: "include",
                };
            },
            invalidatesTags: ["blog"],
        }),
        deleteBlog: builder.mutation<TBlogSingleResponse, { id: number }>({
            query: ({ id }) => {
                return {
                    url: `/blog/delete/${id}`,
                    method: "DELETE",
                    credentials: "include",
                };
            },
            invalidatesTags: ["blog"],
        }),
    }),
});

const blogSlice = createSlice({
    initialState,
    name: "blog",
    reducers: {},
});

export const {
    useCreateBlogMutation,
    useDeleteBlogMutation,
    useUpdateBlogMutation,
    useGetAllBlogQuery,
    useGetBlogByIdQuery,
} = blogApi;

export default blogSlice;
