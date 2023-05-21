import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type FirestoreState = {
  isUpdating: boolean;
  isError: boolean;
};

const initialState: FirestoreState = {
  isUpdating: false,
  isError: false,
};

const FirestoreSlice = createSlice({
  name: 'firestore',
  initialState,
  reducers: {
    setFirestoreState(state, action: PayloadAction<FirestoreState>) {
      state.isUpdating = action.payload.isUpdating;
      state.isError = action.payload.isError;
    },
  },
});

const { actions, reducer } = FirestoreSlice;

export const { setFirestoreState } = actions;

export default reducer;
