import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_SERVER_URL,
  }),
  endpoints: (builder) => ({
    // Define your API endpoints here
    // Example:
    // fetchUsers: builder.query({
    //   query: () => 'users',
    // }),
  }),
});

export const {  } = apiSlice;
