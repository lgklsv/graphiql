import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type FirestoreState = {
  isUpdating: boolean;
  error: string | null;
};

const initialState: FirestoreState = {
  isUpdating: false,
  error: null,
};

const FirestoreSlice = createSlice({
  name: 'firestore',
  initialState,
  reducers: {
    setFirestoreState(state, action: PayloadAction<FirestoreState>) {
      state.isUpdating = action.payload.isUpdating;
      state.error = action.payload.error;
    },
  },
});

const { actions, reducer } = FirestoreSlice;

export const { setFirestoreState } = actions;

export default reducer;
