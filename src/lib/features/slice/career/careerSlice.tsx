import {
  CareerStates,
  TCareer,
  TcreateJob,
  TcreateJobTransLang,
  TJobTransLang,
  TupdateJobTransLang,
} from "@/types/career";
import { apiSlice } from "../../apiSlice";
import { createSlice } from "@reduxjs/toolkit";

const initialState: CareerStates = {
  careers: null,
};

export const careerApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCareers: builder.query<
      {
        statusCode: string;
        status: string;
        message: string;
        data: Array<TCareer>;
      },
      null
    >({
      query: () => {
        return {
          url: "/job/all",
          method: "GET",
          credentials: "include",
        };
      },
      providesTags: ["job"],
    }),
    createJob: builder.mutation<
      {
        statusCode: string;
        status: string;
        message: string;
        data: TCareer;
      },
      TcreateJob
    >({
      query: (body) => {
        return {
          url: "/job/create",
          method: "POST",
          credentials: "include",
          body,
        };
      },
      invalidatesTags: ["job"],
    }),
    updateJob: builder.mutation<
      {
        statusCode: string;
        status: string;
        message: string;
        data: TCareer;
      },
      { id: number; body: TcreateJob }
    >({
      query: ({ id, body }) => ({
        url: `/job/update/${id}`,
        method: "PUT",
        credentials: "include",
        body,
      }),
      invalidatesTags: ["job"],
    }),
    createJobTransLang: builder.mutation<
      {
        statusCode: string;
        status: string;
        message: string;
        data: TJobTransLang;
      },
      TcreateJobTransLang
    >({
      query: (body) => ({
        url: "/job/translated/create",
        method: "POST",
        credentials: "include",
        body,
      }),
      invalidatesTags: ["job"],
    }),
    updateJobTransLang: builder.mutation<
      {
        statusCode: string;
        status: string;
        message: string;
        data: TJobTransLang;
      },
      { id: number; body: TupdateJobTransLang }
    >({
      query: ({ id, body }) => ({
        url: `/job/translated/updated/${id}`,
        method: "PUT",
        credentials: "include",
        body,
      }),
      invalidatesTags: ["job"],
    }),
    getJobLangById: builder.query<
      {
        statusCode: string;
        status: string;
        message: string;
        data: TJobTransLang;
      },
      { id: number }
    >({
      query: ({ id }) => ({
        url: `/job/translated/${id}`,
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["job"],
    }),
    getJobById: builder.query<
      {
        statusCode: string;
        status: string;
        message: string;
        data: TJobTransLang;
      },
      { id: number }
    >({
      query: ({ id }) => ({
        url: `/job/${id}`,
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["job"],
    }),
  }),
});

export const careerSlice = createSlice({
  name: "career",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      careerApi.endpoints.getCareers.matchFulfilled,
      (state, action) => {
        state.careers = action.payload.data;
      }
    );
  },
});

export const {
  useCreateJobMutation,
  useCreateJobTransLangMutation,
  useGetCareersQuery,
  useGetJobByIdQuery,
  useGetJobLangByIdQuery,
  useUpdateJobMutation,
  useUpdateJobTransLangMutation,
} = careerApi;

export default careerSlice;
