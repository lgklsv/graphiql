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
  error?:
    | import('@reduxjs/toolkit/dist/query').FetchBaseQueryError
    | import('@reduxjs/toolkit').SerializedError
    // | SerializedError
    | undefined;
  timing?: number;
};
