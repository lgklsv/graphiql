import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type FirestoreState = {
  isUpdating: boolean;
};

const initialState: FirestoreState = {
  isUpdating: false,
};

const FirestoreSlice = createSlice({
  name: 'firestore',
  initialState,
  reducers: {
    setFirestoreState(state, action: PayloadAction<boolean>) {
      state.isUpdating = action.payload;
    },
  },
});

const { actions, reducer } = FirestoreSlice;

export const { setFirestoreState } = actions;

export default reducer;
