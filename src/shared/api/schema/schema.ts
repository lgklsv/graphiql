import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getIntrospectionQuery } from 'graphql';
import { BASE_URL } from 'app/config';

export const schema = createApi({
  reducerPath: 'schema',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    getSchema: builder.query<unknown, string>({
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
    }),
  }),
});

export const { useGetSchemaQuery } = schema;
