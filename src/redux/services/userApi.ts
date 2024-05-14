import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { IParamsEvent } from '../../type/event'
import { IChangePasswordPayload, IFollowPayload } from '../../type/user'
import { IUser } from '../../interfaces/systems/user'
import { RootState } from '../store'
import { IEvent } from '@/interfaces/contents/event'

export const apiUser = createApi({
  reducerPath: 'apiUser',
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
  tagTypes: ['User', 'Events'],

  endpoints: builder => ({
    getUsers: builder.query<IUser[], void>({
      query: () => ({
        url: '/users',
        method: 'GET',
      }),
      providesTags: ['User'],
    }),

    getUserById: builder.query<any, string>({
      query: userId => ({
        url: `/users/${userId}`,
        method: 'GET',
      }),
      providesTags: ['User'],
    }),

    getEventsByUserId: builder.query<any, { userId: string; params: IParamsEvent | any }>({
      query: ({ userId, params }) => ({
        url: `/users/${userId}/events`,
        method: 'GET',
        params,
      }),
      providesTags: ['Events'],
      transformResponse: (response: any) => {
        return response.data
      },
    }),

    createUser: builder.mutation<IUser, Partial<IUser>>({
      query: data => ({
        url: '/users',
        method: 'GET',
        body: data,
      }),
      invalidatesTags: ['User'],
    }),

    updateUser: builder.mutation<IUser, { userId: string; data: any }>({
      query: ({ userId, data }) => ({
        url: `/users/${userId}`,
        method: 'PUT',
        body: data,
        // headers: {
        //   Accept: '*/*',
        //   'Content-Type': 'multipart/form-data;'
        // }
      }),
    }),

    deleteUser: builder.mutation<any, string>({
      query: userId => ({
        url: `/users/${userId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['User'],
    }),

    changePassword: builder.mutation<any, IChangePasswordPayload>({
      query: data => ({
        url: `/users/${data.userId}/change-password`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['User'],
    }),

    getMenuByUserId: builder.query<any, string>({
      query: userId => ({
        url: `/users/${userId}/menu`,
        method: 'GET',
      }),
      providesTags: ['User'],
    }),

    getReviewsByUserId: builder.query<any, string>({
      query: userId => ({
        url: `/users/${userId}/reviews`,
        method: 'GET',
      }),
      transformResponse: (response: any) => {
        return response.data
      },
      providesTags: ['User'],
    }),

    getEventsFavouriteByUserId: builder.query<any, string>({
      query: userId => ({
        url: `/users/${userId}/events/favourites`,
        method: 'GET',
      }),
      providesTags: ['User'],
    }),

    followUser: builder.mutation<any, IFollowPayload>({
      query: data => ({
        url: `/users/followers/follow`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['User'],
    }),

    unfollowUser: builder.mutation<any, IFollowPayload>({
      query: data => ({
        url: `/users/followers/unfollow`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['User'],
    }),
  }),
})

export const {
  useGetUserByIdQuery,
  useGetEventsByUserIdQuery,
  useGetUsersQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useChangePasswordMutation,
  useGetMenuByUserIdQuery,
  useGetReviewsByUserIdQuery,
  useGetEventsFavouriteByUserIdQuery,
  useFollowUserMutation,
  useUnfollowUserMutation,
} = apiUser
