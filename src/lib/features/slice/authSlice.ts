/** @format */

import { createSlice } from "@reduxjs/toolkit";
import { apiSlice } from "../apiSlice";
import { AuthState, SigninType } from "@/type";

const TOKEN_NAME = "auth-admin-srct-token";

const saveTokenToLocalStorage = (token: string) => {
  if (typeof window !== undefined) {
    localStorage.setItem(TOKEN_NAME, token);
  }
};

const removeTokenFromLocalStorage = () => {
  localStorage.removeItem(TOKEN_NAME);
};

const getInitialToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem(TOKEN_NAME);
  }
  return null;
};

const initialState: AuthState = {
  user: null,
  role: null,
  token: getInitialToken(),
};

const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    signin: builder.mutation<
      { status: string; message: string; data: { access_token: string } },
      SigninType
    >({
      query: (values) => {
        return {
          url: "/auth/admin/signin",
          method: "POST",
          body: values,
        };
      },
    }),
    signOut: builder.mutation({
      query: () => {
        return {
          url: "/auth/signout",
          method: "POST",
        };
      },
    }),
    getMe: builder.query({
      query: () => {
        return {
          url: "/user/profile",
          method: "GET",
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
    setToken: (state, { payload }) => {
      state.token = payload;
      saveTokenToLocalStorage(payload);
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.role = null;
      removeTokenFromLocalStorage();
    },
    setRole: (state, { payload }) => {
      state.role = payload;
    },
  },
});

export const { useSigninMutation, useGetMeQuery, useSignOutMutation } = authApi;

export const { setRole, setUser, setToken, logout } = authSlice.actions;

export default authSlice;
