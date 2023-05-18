import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  createApi,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';
import {
  IntrospectionQuery,
  buildClientSchema,
  getIntrospectionQuery,
} from 'graphql';

import { TabQueryContent } from 'features/tabs/types';
import { apiUrlSelector } from 'store/selectors/apiUrlSelector';
import { RootState } from 'store';

const rawBaseQuery = fetchBaseQuery({
  baseUrl: '',
});

const dynamicBaseQuery: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const currentUrl = apiUrlSelector(api.getState() as RootState);

  if (!currentUrl) {
    return {
      error: {
        status: 400,
        statusText: 'Bad Request',
        data: 'No API is available',
      },
    };
  }

  // check the end of entered URL (some api does not work with '/' at the end and throw an error)
  const adjustedCurrentUrl = currentUrl.endsWith('/')
    ? currentUrl.slice(0, -1)
    : currentUrl;
  const urlEnd = typeof args === 'string' ? args : args.url;
  const adjustedUrl = `${adjustedCurrentUrl}${urlEnd}`;
  const adjustedArgs =
    typeof args === 'string' ? adjustedUrl : { ...args, url: adjustedUrl };
  return rawBaseQuery(adjustedArgs, api, extraOptions);
};

export const sandboxQueries = createApi({
  reducerPath: 'sandboxQueries',
  baseQuery: dynamicBaseQuery,
  endpoints: (builder) => ({
    getSchema: builder.query({
      query: () => ({
        url: '',
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
        url: '',
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

export const {
  useGetSchemaQuery,
  useLazyGetSchemaQuery,
  useLazyGetEnteredQuery,
} = sandboxQueries;
