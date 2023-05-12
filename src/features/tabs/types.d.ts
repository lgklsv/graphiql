import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';

type Tab = {
  label: string;
  query: TabQueryContent;
  response: TabResponseContent;
  key: string;
  closable: boolean;
};

type TabQueryContent = {
  data?: string;
  variables?: string;
  headers?: string;
};

type TabResponseContent = {
  data?: string;
  isLoading?: boolean;
  error?: FetchBaseQueryError | SerializedError | undefined;
  timing?: number;
};
