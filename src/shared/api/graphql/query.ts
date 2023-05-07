import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  IntrospectionQuery,
  buildClientSchema,
  getIntrospectionQuery,
} from 'graphql';
import { BASE_URL } from 'app/config';

export const sandboxQueries = createApi({
  reducerPath: 'sandboxQueries',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    getSchema: builder.query({
      query: (variables) => ({
        url: '/',
        method: 'POST',
        body: JSON.stringify({
          query: `${getIntrospectionQuery()}`,
          variables: JSON.parse(variables),
        }),
        headers: {
          'Content-type': 'application/json',
        },
      }),
      transformResponse: (response: { data: IntrospectionQuery }) =>
        buildClientSchema(response.data),
    }),
    getEntered: builder.query({
      query: (queryData: TabQueryContent) => ({
        url: '/',
        method: 'POST',
        body: JSON.stringify({
          query: `${queryData.data}`,
          variables: JSON.parse(queryData.variables || '{}'),
        }),
        headers: {
          'Content-type': 'application/json',
        },
      }),
    }),
  }),
});

export const { useGetSchemaQuery, useGetEnteredQuery, useLazyGetEnteredQuery } =
  sandboxQueries;