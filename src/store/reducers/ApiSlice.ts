import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BASE_URL } from 'app/config';

export type ApiUrlState = {
  url: string;
};

const initialState: ApiUrlState = {
  url: BASE_URL,
};

const apiUrlSlice = createSlice({
  name: 'apiUrl',
  initialState,
  reducers: {
    setApiUrl(state, action: PayloadAction<ApiUrlState>) {
      state.url = action.payload.url;
    },
  },
});

const { actions, reducer } = apiUrlSlice;

export const { setApiUrl } = actions;

export default reducer;
