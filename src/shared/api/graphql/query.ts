import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  IntrospectionQuery,
  buildClientSchema,
  getIntrospectionQuery,
} from 'graphql';

import { TabQueryContent } from 'features/tabs/types';

export const sandboxQueries = createApi({
  reducerPath: 'sandboxQueries',
  baseQuery: fetchBaseQuery({
    baseUrl: '',
  }),
  endpoints: (builder) => ({
    getSchema: builder.query({
      query: (apiUrl) => ({
        url: apiUrl,
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
      query: (arg: { queryData: TabQueryContent; apiUrl: string }) => ({
        url: arg.apiUrl,
        method: 'POST',
        body: JSON.stringify({
          query: `${arg.queryData.data}`,
          variables: JSON.parse(arg.queryData.variables || '{}'),
        }),
        headers: {
          'Content-type': 'application/json',
          ...JSON.parse(arg.queryData.headers || '{}'),
        },
      }),
    }),
  }),
});

export const {
  useGetSchemaQuery,
  useLazyGetSchemaQuery,
  useLazyGetEnteredQuery,
} = sandboxQueries;
