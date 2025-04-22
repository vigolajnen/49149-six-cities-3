import { createApi } from '@reduxjs/toolkit/query/react';

import { AuthCredentials, Place, User } from '../types';
import axiosBaseQuery from './axiosBaseQuery';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: axiosBaseQuery(),
  keepUnusedDataFor: 30,
  tagTypes: ['Offers', 'Favorite'],
  endpoints: (builder) => ({
    getOffers: builder.query<Place[], void>({
      query: () => ({ url: '/offers', method: 'GET' }),
      providesTags: ['Offers'],
    }),
    getFavorite: builder.query<Place[], void>({
      query: () => ({ url: '/favorite', method: 'GET' }),
      providesTags: ['Favorite'],
    }),
    getLogin: builder.query<void, void>({
      query: () => ({ url: '/login', method: 'GET' }),
    }),
    loginUser: builder.mutation<User, AuthCredentials>({
      query: (credentials: AuthCredentials) => ({
        url: '/login',
        method: 'POST',
        body: credentials,
      }),
    }),
    logoutUser: builder.mutation<void, void>({
      query: () => ({
        url: '/logout',
        method: 'DELETE',
      }),
    }),
  }),
});

export const { useGetOffersQuery, useGetFavoriteQuery, useGetLoginQuery, useLoginUserMutation, useLogoutUserMutation } = api;
