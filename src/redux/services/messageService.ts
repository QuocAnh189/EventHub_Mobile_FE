import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { RootState } from '../store'

export const apiMessage = createApi({
  reducerPath: 'apiMessage',
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

  endpoints: builder => ({
    getMessage: builder.query<any, void>({
      query: () => ({
        url: '/messsages',
        method: 'GET',
      }),
    }),
  }),
})

export const { useGetMessageQuery } = apiMessage
