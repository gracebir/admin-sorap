/** @format */

import {
  EventStates,
  TCreateEventInput,
  TCreateEventTranslation,
  TEvent,
  TEventTranslation,
  TModerator,
  TUpdateEventTranslation,
} from "@/types/event";
import { apiSlice } from "../../apiSlice";
import { createSlice } from "@reduxjs/toolkit";
import { createEventFormData, createModeratorFormData } from "@/helper/funct";

const initialState: EventStates = {
  events: null,
};

const eventApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllEvent: builder.query<
      {
        statusCode: string;
        status: string;
        message: string;
        data: Array<TEvent>;
      },
      null
    >({
      query: () => {
        return {
          url: "/event/all",
        };
      },
      providesTags: ["event"],
      keepUnusedDataFor: 300,
    }),
    getEventById: builder.query<
      {
        statusCode: string;
        status: string;
        message: string;
        data: TEvent;
      },
      { id: number }
    >({
      query: ({ id }) => {
        return {
          url: `/event/detail/${id}`,
          method: "GET",
          credentials: "include",
        };
      },
      providesTags: ["event"],
    }),
    getEventTranslatedById: builder.query<
      {
        statusCode: number;
        status: string;
        message: string;
        data: TEventTranslation;
      },
      { id: number }
    >({
      query: ({ id }) => {
        return {
          url: `/event/detail/translation/${id}`,
          method: "GET",
          credentials: "include",
        };
      },
    }),
    createEvent: builder.mutation<
      {
        statusCode: number;
        status: string;
        message: string;
        data: TEvent;
      },
      TCreateEventInput
    >({
      query: (value) => {
        const formData = createEventFormData(value);
        return {
          url: "/event/create",
          method: "POST",
          body: formData,
          credentials: "include",
        };
      },
      invalidatesTags: ["event"],
    }),
    createTranslation: builder.mutation<
      {
        statusCode: number;
        status: string;
        message: string;
        data: TEventTranslation;
      },
      TCreateEventTranslation
    >({
      query: (value) => {
        return {
          url: "/event/create/translation",
          method: "POST",
          body: value,
          credentials: "include",
        };
      },
      invalidatesTags: ["event"],
    }),
    updateTranslation: builder.mutation<
      {
        statusCode: number;
        status: string;
        message: string;
        data: TEventTranslation;
      },
      { id: number; value: TUpdateEventTranslation }
    >({
      query: ({ id, value }) => {
        return {
          url: `/event/update/translation/${id}`,
          method: "PUT",
          body: value,
          credentials: "include",
        };
      },
      invalidatesTags: ["event"],
    }),
    addPhotos: builder.mutation<TEvent, { id: number; photo: Array<File> }>({
      query: (value) => {
        return {
          url: `/event/add-photo/${value.id}`,
          method: "PUT",
          body: { images: value.photo },
          credentials: "include",
        };
      },
    }),
    updateEvent: builder.mutation<
      {
        statusCode: number;
        status: string;
        message: string;
        data: TEvent;
      },
      { id: number; event: Partial<TCreateEventInput> }
    >({
      query: ({ id, event }) => {
        return {
          url: `/event/update/${id}`,
          credentials: "include",
          body: event,
          method: "PUT",
        };
      },
      invalidatesTags: ["event"],
    }),
    updateEventThumbnail: builder.mutation<
      { status: string; message: string; data: TEvent },
      { id: number; event: Partial<TCreateEventInput> }
    >({
      query: ({ id, event }) => {
        const formData = new FormData();
        formData.append("thumbnail", event.thumbnail!);
        return {
          url: `/event/update/thumbnail/${id}`,
          credentials: "include",
          body: formData,
          method: "PUT",
        };
      },
      invalidatesTags: ["event"],
    }),
    addModerator: builder.mutation<
      {
        statusCode: number;
        status: string;
        message: string;
        data: TModerator;
      },
      TModerator
    >({
      query: (value) => {
        const formData = createModeratorFormData(value);
        return {
          url: "/event/add/moderator",
          method: "POST",
          body: formData,
          credentials: "include",
        };
      },
      invalidatesTags: ["event"],
    }),
    updateModerator: builder.mutation<
      {
        statusCode: number;
        status: string;
        message: string;
        data: TModerator;
      },
      { id: number; moderator: Partial<TModerator> }
    >({
      query: ({ id, moderator }) => {
        return {
          url: `/event/update/moderator/${id}`,
          method: "PUT",
          body: moderator,
          credentials: "include",
        };
      },
      invalidatesTags: ["event"],
    }),
    launchEvent: builder.mutation<
      {
        statusCode: number;
        status: string;
        message: string;
        data: TEvent;
      },
      { id: number }
    >({
      query: ({ id }) => {
        return {
          url: `/event/launch/${id}`,
          method: "PUT",
          credentials: "include",
        };
      },
      invalidatesTags: ["event"],
    }),
    addEventSponsor: builder.mutation<
      {
        statusCode: string;
        status: string;
        message: string;
        data: TEvent;
      },
      {
        eventId: number;
        patternId: number;
        amount?: number;
        note?: string;
      }
    >({
      query: (value) => {
        return {
          url: "/event/sponsor/add",
          credentials: "include",
          body: value,
          method: "POST",
        };
      },
      invalidatesTags: ["event"],
    }),
  }),
});

const eventSlice = createSlice({
  name: "event",
  initialState,
  reducers: {},
});

export const {
  useGetAllEventQuery,
  useCreateEventMutation,
  useCreateTranslationMutation,
  useUpdateTranslationMutation,
  useGetEventTranslatedByIdQuery,
  useAddPhotosMutation,
  useGetEventByIdQuery,
  useAddModeratorMutation,
  useUpdateEventMutation,
  useUpdateEventThumbnailMutation,
  useLaunchEventMutation,
  useUpdateModeratorMutation,
  useAddEventSponsorMutation,
} = eventApi;

export default eventSlice;
