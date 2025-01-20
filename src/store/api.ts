import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getTokenFromLocalStorage } from '../utils/auth';

export const api = createApi({
  reducerPath: 'api', 
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://backend-ashen-seven-22.vercel.app'
  }),
  endpoints: (builder) => ({
    //Регистрация пользователя
    registerUser: builder.mutation({
      query: (user) => ({
        url: '/register',
        method: 'POST',
        body: user,
      }),
    }),
    //Авторизация пользователя
    loginUser: builder.mutation({
      query: (credentials) => ({
        url: '/login',
        method: 'POST',
        body: credentials,
      }),
    }),
    // Получение профиля пользователя
    getProfile: builder.query({
        query: () => ({
            url: '/profile',
            method: 'GET',
            headers: {
                Authorization: `${getTokenFromLocalStorage()}`,
            },
        }),
    })
  }),
});


export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useGetProfileQuery,
} = api;
