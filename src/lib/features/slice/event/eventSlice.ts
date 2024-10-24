/** @format */

import { EventStates, TCreateEventInput, TEvent } from "@/types/event";
import { apiSlice } from "../../apiSlice";
import { createSlice } from "@reduxjs/toolkit";
import { createEventFormData } from "@/helper/funct";

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
                    credentials: "include",
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
        addPhotos: builder.mutation<TEvent, { id: number; photo: Array<Blob> }>(
            {
                query: (value) => {
                    return {
                        url: `/event/add-photo/${value.id}`,
                        method: "PUT",
                        body: { images: value.photo },
                        credentials: "include",
                    };
                },
            }
        ),
        updateEvent: builder.mutation<
            TEvent,
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
        }),
        addModerator: builder.mutation({
            query: () => {
                return {
                    url: "",
                };
            },
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
    useAddPhotosMutation,
    useGetEventByIdQuery,
} = eventApi;

export default eventSlice;
