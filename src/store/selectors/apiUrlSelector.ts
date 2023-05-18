import { RootState } from 'store';

export const apiUrlSelector = (state: RootState) => state.apiUrlReducer.url;
