import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { userInfo } from '../auth/authSlice';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_SERVER_URL,
  }),
  endpoints: (builder) => ({
    refreshToken: builder.query({
      query: () => ({
        url: 'user/refresh', // Endpoint để làm mới token
        method: 'GET',
        credentials: 'include' as const, // Bao gồm các thông tin xác thực (có thể là cookie hoặc token)
      }),
    }),
    loadUser: builder.query({
      query: () => ({
        url: 'user/me',
        method: 'GET',
        credentials: 'include' as const, // Bao gồm các thông tin xác thực (có thể là cookie hoặc token)
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const result = await queryFulfilled;
          dispatch(
            userInfo({
              user: result.data.user,
            })
          );
        } catch (error: any) {
          console.log(error);
          // Handle error if needed
        }
      },
    }),
  }),
});

export const { useRefreshTokenQuery, useLazyLoadUserQuery } = apiSlice;
