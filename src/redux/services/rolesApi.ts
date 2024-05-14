import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { IRole } from '../../interfaces/systems/role'
import { RootState } from '../store'

export const apiRole = createApi({
  reducerPath: 'apiRole',
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
  tagTypes: ['Role'],

  endpoints: builder => ({
    getRoles: builder.query<IRole, void>({
      query: () => ({
        url: '/roles',
        method: 'GET',
      }),
      providesTags: ['Role'],
    }),

    getRoleById: builder.query<IRole, string>({
      query: roleId => ({
        url: `/roles/${roleId}`,
        method: 'GET',
      }),
      providesTags: ['Role'],
    }),

    createRole: builder.mutation<IRole, Partial<IRole>>({
      query: data => ({
        url: '/roles',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Role'],
    }),

    updateRole: builder.mutation<IRole, Partial<IRole>>({
      query: data => ({
        url: `/roles/${data.id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Role'],
    }),

    deleteRole: builder.mutation<any, string>({
      query: roleId => ({
        url: `/roles/${roleId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Role'],
    }),

    getPermissionByRoleId: builder.query<any, string>({
      query: roleId => ({
        url: `/roles/${roleId}/permesstions`,
        method: 'GET',
      }),
      providesTags: ['Role'],
    }),

    updatePermissionByRoleId: builder.query<any, { roleId: string; data: any }>({
      query: ({ roleId, data }) => ({
        url: `/roles/${roleId}/permesstions`,
        method: 'PUT',
        body: data,
      }),
      providesTags: ['Role'],
    }),
  }),
})

export const {
  useGetRolesQuery,
  useGetRoleByIdQuery,
  useCreateRoleMutation,
  useUpdateRoleMutation,
  useDeleteRoleMutation,
  useGetPermissionByRoleIdQuery,
  useUpdatePermissionByRoleIdQuery,
} = apiRole
