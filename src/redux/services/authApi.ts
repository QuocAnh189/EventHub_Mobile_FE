import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API } from '../../constants/api';
import { IAuth } from '../../interfaces';
import { SignInType, SignUpType } from '../../types';

export const apiAuth = createApi({
  reducerPath: 'apiAuth',
  baseQuery: fetchBaseQuery({
    baseUrl: API,
  }),
  keepUnusedDataFor: 20,
  endpoints: builder => ({
    signUp: builder.mutation<IAuth, SignUpType>({
      query: data => ({
        url: 'api/auth/signup',
        method: 'POST',
        body: data,
      }),
    }),

    signIn: builder.mutation<IAuth, SignInType>({
      query: data => ({
        url: 'api/auth/signin',
        method: 'POST',
        body: data,
      }),
      transformResponse(data: any) {
        return data.data;
      },
    }),

    signOut: builder.mutation<void, string | undefined>({
      query: userId => ({
        url: `api/auth/signout/${userId}`,
        method: 'POST',
      }),
    }),
  }),
});

export const { useSignUpMutation, useSignInMutation, useSignOutMutation } = apiAuth;
