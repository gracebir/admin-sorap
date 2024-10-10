/** @format */

import { createSlice } from "@reduxjs/toolkit";
import { apiSlice } from "../apiSlice";

const initialState: AuthState = {
    user: null,
    role: null,
};

const authApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        signin: builder.mutation<
            { status: string; message: string },
            SigninType
        >({
            query: (values) => {
                return {
                    url: "/auth/signin",
                    method: "POST",
                    body: values,
                    credentials: "include",
                };
            },
        }),
        getMe: builder.query({
            query: () => {
                return {
                    url: "/user/profile",
                    method: "GET",
                    credentials: "include",
                };
            },
        }),
    }),
});

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser: (state, { payload }) => {
            state.user = payload;
        },
        setRole: (state, { payload }) => {
            state.role = payload;
        },
    },
});

export const { useSigninMutation, useGetMeQuery } = authApi;

export const { setRole, setUser } = authSlice.actions;

export default authSlice;
