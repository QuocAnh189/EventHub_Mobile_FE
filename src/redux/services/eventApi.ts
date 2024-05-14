import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { IFavouriteEventPayload, IParamsEvent, IReviewEventPayload } from '../../type/event'
import { IEvent } from '../../interfaces/contents/event'
import { RootState } from '../store'

export const apiEvent = createApi({
  reducerPath: 'apiEvent',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.EXPO_PUBLIC_API_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.authData?.accessToken

      if (token) {
        headers.set('Authorization', `Bearer ${token}`)
      }

      return headers
    },
  }),
  keepUnusedDataFor: 20,

  tagTypes: ['Event', 'Review'],
  endpoints: builder => ({
    getEvents: builder.query<any, Partial<IParamsEvent>>({
      query: params => ({
        url: '/events',
        method: 'GET',
        params,
      }),
      providesTags: ['Event'],
      transformResponse: (response: any) => {
        return response.data
      },
    }),

    getEventsByCreatorId: builder.query<Partial<IEvent>[], string>({
      query: userId => ({
        url: `/events/users/${userId}`,
        method: 'GET',
      }),
      providesTags: ['Event'],
    }),

    getEventById: builder.query<IEvent, string>({
      query: eventId => ({
        url: `/events/${eventId}`,
        method: 'GET',
      }),
      transformResponse: (response: any) => {
        return response.data
      },
      providesTags: ['Event'],
    }),

    createEvent: builder.mutation<IEvent, FormData>({
      query: data => ({
        url: '/events',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Event'],
    }),

    updateEvent: builder.mutation<IEvent, { eventId: string; data: FormData }>({
      query: ({ eventId, data }) => ({
        url: `/events/${eventId}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Event'],
    }),

    deleteEvent: builder.mutation<any, string>({
      query: eventId => ({
        url: `/events/${eventId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Event'],
    }),

    deleteEvents: builder.mutation<any, string[]>({
      query: ids => ({
        url: `/events/delele-events`,
        method: 'PATCH',
        body: ids,
      }),
      invalidatesTags: ['Event'],
    }),

    addReview: builder.mutation<any, IReviewEventPayload>({
      query: data => ({
        url: `/events/${data.eventId}/reviews`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Review'],
    }),

    getReviewsByEventId: builder.query<any, string>({
      query: eventId => ({
        url: `/events/${eventId}/reviews`,
        method: 'GET',
      }),
      providesTags: ['Review'],
    }),

    getReviewById: builder.query<any, { eventId: string; reviewId: string }>({
      query: ({ eventId, reviewId }) => ({
        url: `/events/${eventId}/reviews/${reviewId}`,
        method: 'GET',
      }),
      providesTags: ['Review'],
    }),

    updateReview: builder.mutation<any, { reviewId: string; data: IReviewEventPayload }>({
      query: ({ reviewId, data }) => ({
        url: `/events/${data.eventId}/reviews/${reviewId}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Review'],
    }),

    deleteReview: builder.mutation<any, { eventId: string; reviewId: string }>({
      query: ({ eventId, reviewId }) => ({
        url: `/events/${eventId}/reviews/${reviewId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Review'],
    }),

    favouriteEvent: builder.mutation<any, IFavouriteEventPayload>({
      query: data => ({
        url: `/events/${data.eventId}/favourites/subscribe`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Event'],
    }),

    unfavouriteEvent: builder.mutation<any, IFavouriteEventPayload>({
      query: data => ({
        url: `/events/${data.eventId}/favourites/unsubscribe`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Event'],
    }),

    moveEventPublic: builder.mutation<any, string[]>({
      query: ids => ({
        url: `/events/move-public`,
        method: 'PATCH',
        body: ids,
      }),
      invalidatesTags: ['Event'],
    }),

    moveEventPrivate: builder.mutation<any, string[]>({
      query: ids => ({
        url: `/events/move-private`,
        method: 'PATCH',
        body: ids,
      }),
      invalidatesTags: ['Event'],
    }),

    moveEventTrash: builder.mutation<any, string[]>({
      query: id => ({
        url: `${id}/events/move-trash`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Event'],
    }),
  }),
})

export const {
  useGetEventsQuery,
  useGetEventsByCreatorIdQuery,
  useGetEventByIdQuery,
  useCreateEventMutation,
  useUpdateEventMutation,
  useDeleteEventMutation,
  useDeleteEventsMutation,
  useAddReviewMutation,
  useGetReviewsByEventIdQuery,
  useGetReviewByIdQuery,
  useUpdateReviewMutation,
  useDeleteReviewMutation,
  useFavouriteEventMutation,
  useUnfavouriteEventMutation,
  useMoveEventPublicMutation,
  useMoveEventPrivateMutation,
  useMoveEventTrashMutation,
} = apiEvent
