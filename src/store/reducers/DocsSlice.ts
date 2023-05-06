import { createSlice } from '@reduxjs/toolkit';

export type InitialState = {
  isDocs: boolean;
  schema: unknown;
};

const initialState: InitialState = {
  isDocs: false,
  schema: {},
};

const docsSlice = createSlice({
  name: 'docs',
  initialState,
  reducers: {
    toggleDocs(state) {
      state.isDocs = !state.isDocs;
    },
  },
});

const { actions, reducer } = docsSlice;

export const { toggleDocs } = actions;

export default reducer;
