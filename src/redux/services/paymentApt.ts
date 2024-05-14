import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { IPayment } from '../../interfaces/contents/payment'
import { RootState } from '../store'

export const apiPayment = createApi({
  reducerPath: 'apiPayment',
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
  tagTypes: ['Payment'],

  endpoints: builder => ({
    getPayments: builder.query<any, void>({
      query: () => ({
        url: '/payments',
        method: 'GET',
      }),
      providesTags: ['Payment'],
    }),

    getPayment: builder.query<any, string>({
      query: paymentId => ({
        url: `/payments/${paymentId}`,
        method: 'GET',
      }),
      providesTags: ['Payment'],
    }),

    createPayment: builder.mutation<IPayment, IPayment>({
      query: data => ({
        url: '/payments',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Payment'],
    }),

    updatePayment: builder.mutation<IPayment, Partial<IPayment>>({
      query: data => ({
        url: `/payments/${data.id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Payment'],
    }),

    deletePayment: builder.mutation<any, string>({
      query: paymentId => ({
        url: `/payments/${paymentId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Payment'],
    }),
  }),
})

export const {
  useGetPaymentsQuery,
  useGetPaymentQuery,
  useCreatePaymentMutation,
  useUpdatePaymentMutation,
  useDeletePaymentMutation,
} = apiPayment
