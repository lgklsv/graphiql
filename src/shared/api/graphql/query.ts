import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  IntrospectionQuery,
  buildClientSchema,
  getIntrospectionQuery,
} from 'graphql';

import { TabQueryContent } from 'features/tabs/types';
import { BASE_URL } from 'app/config';

export const sandboxQueries = createApi({
  reducerPath: 'sandboxQueries',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    getSchema: builder.query({
      query: () => ({
        url: '/',
        method: 'POST',
        body: JSON.stringify({
          query: `${getIntrospectionQuery()}`,
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
          ...JSON.parse(queryData.headers || '{}'),
        },
      }),
    }),
  }),
});

export const { useGetSchemaQuery, useLazyGetEnteredQuery } = sandboxQueries;
