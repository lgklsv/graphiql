import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';

const HTTP_ERROR = new Map([
  [404, '404: The resource is not found'],
  [400, '400: The bad request'],
  [500, '500: The sever is not available'],
]);

const handleErrorMessage = (
  error: FetchBaseQueryError | SerializedError | undefined
) => {
  if (!error) return null;
  if ('status' in error) {
    return HTTP_ERROR.get(+error.status) || null;
  }
  return error.message || null;
};

export default handleErrorMessage;
