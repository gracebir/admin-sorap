/** @format */

import { EventStates, TCreateEventInput, TEvent } from "@/types/event";
import { apiSlice } from "../apiSlice";
import { createSlice } from "@reduxjs/toolkit";

const initialState: EventStates = {
    events: null,
};

const eventApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllEvent: builder.query<null, Array<TEvent>>({
            query: () => {
                return {
                    url: "/event/all",
                    credentials: "include",
                };
            },
            providesTags: ["event"],
        }),
        createEvent: builder.mutation<TEvent, TCreateEventInput>({
            query: (value) => {
                return {
                    url: "/event/create",
                    method: "POST",
                    body: value,
                    credentials: "include",
                };
            },
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
        // updateEvent: builder.mutation < TEvent, { id: number, Partial<TCreateEventInput>} > ({
        //     query: (value) => {
        //         return {
        //             url: "",
        //             credentials: "include",

        //         }
        //     }
        // })
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
} = eventApi;

export default eventSlice;
