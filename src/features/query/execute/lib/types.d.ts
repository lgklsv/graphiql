type FetchErrors = {
  errors: FetchError[];
};

type FetchError = {
  extensions: {
    code: string;
  };
  locations: {
    line: string;
    column: string;
  }[];
  message: string;
};
