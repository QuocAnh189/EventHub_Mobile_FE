import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { CategoryPayload } from '../../type/category'
import { ICategory } from '../../interfaces/contents/category'
import { IEvent } from '../../interfaces/contents/event'
import { RootState } from '../store'

export const apiCategory = createApi({
  reducerPath: 'apiCategory',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.EXPO_PUBLIC_API_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.authData?.accessToken
      headers.set('Content-Type', 'application/json')

      if (token) {
        headers.set('Authorization', `Bearer ${token}`)
      }

      return headers
    },
  }),
  keepUnusedDataFor: 20,
  tagTypes: ['Category'],

  endpoints: builder => ({
    createCategory: builder.mutation<ICategory, CategoryPayload>({
      query: data => ({
        url: '/categories',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Category'],
    }),

    getCategories: builder.query<ICategory[], void>({
      query: () => ({
        url: '/categories',
        method: 'GET',
      }),
      providesTags: ['Category'],
      transformResponse: (response: any) => response.data.items,
    }),

    getCategoryById: builder.query<ICategory, string>({
      query: categoryId => ({
        url: `/categories/${categoryId}`,
        method: 'GET',
      }),
      providesTags: ['Category'],
    }),

    getEventsVyCategoryId: builder.query<IEvent[], string>({
      query: categoryId => ({
        url: `/categories/${categoryId}/events`,
        method: 'GET',
      }),
      providesTags: ['Category'],
    }),

    updateCategory: builder.mutation<ICategory, Partial<ICategory>>({
      query: data => ({
        url: `/categories/${data.id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Category'],
    }),

    deleteCategory: builder.mutation<any, string>({
      query: categoryId => ({
        url: `/categories/${categoryId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Category'],
    }),
  }),
})

export const {
  useCreateCategoryMutation,
  useGetCategoriesQuery,
  useLazyGetCategoryByIdQuery,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = apiCategory
