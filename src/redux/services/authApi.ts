import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { IAuth } from '@/interfaces/systems/auth'
import { IUser } from '@/interfaces/systems/user'
import { LoginPayload, SignUpPayload, ForgotPassPayload } from '../../type/auth'

export const apiAuth = createApi({
  reducerPath: 'apiAuth',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.EXPO_PUBLIC_API_URL,
  }),
  keepUnusedDataFor: 20,
  endpoints: builder => ({
    validateUser: builder.mutation<IAuth, any>({
      query: data => ({
        url: '/auth/validate-user',
        method: 'POST',
        body: data,
      }),
    }),

    signUp: builder.mutation<IAuth, SignUpPayload>({
      query: data => ({
        url: '/auth/signup',
        method: 'POST',
        body: data,
      }),
      transformResponse: (response: any) => response.data,
      transformErrorResponse: response => {
        return response.data
      },
    }),

    signIn: builder.mutation<IAuth, LoginPayload>({
      query: data => ({
        url: '/auth/signin',
        method: 'POST',
        body: data,
      }),
      transformResponse: (response: any) => response.data,
      transformErrorResponse: response => {
        return response.data
      },
    }),

    signOut: builder.mutation<any, void>({
      query: () => ({
        url: `/auth/signout`,
        method: 'POST',
      }),
    }),

    signInExternal: builder.mutation<IAuth, void>({
      query: data => ({
        url: '/auth/external-login',
        method: 'POST',
        body: data,
      }),
    }),

    exterlAuthCallBack: builder.query<IAuth, void>({
      query: () => ({
        url: '/auth/external-auth-callback',
        method: 'GET',
      }),
    }),

    refreshToken: builder.mutation<IAuth, void>({
      query: () => ({
        url: '/auth/refresh-token',
        method: 'POST',
      }),
    }),

    forgotPasswrod: builder.mutation<IAuth, ForgotPassPayload>({
      query: data => ({
        url: '/auth/forgot-password',
        method: 'POST',
        body: data,
      }),
    }),

    resetPasswrod: builder.mutation<IAuth, void>({
      query: () => ({
        url: '/auth/reset-password',
        method: 'POST',
      }),
    }),

    getProfile: builder.query<IUser, string>({
      query: token => ({
        url: '/auth/profile',
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),

      transformResponse: (response: any) => response.data,
    }),
  }),
})

export const {
  useValidateUserMutation,
  useSignUpMutation,
  useSignInMutation,
  useSignOutMutation,
  useSignInExternalMutation,
  useExterlAuthCallBackQuery,
  useRefreshTokenMutation,
  useForgotPasswrodMutation,
  useResetPasswrodMutation,
  useGetProfileQuery,
} = apiAuth
