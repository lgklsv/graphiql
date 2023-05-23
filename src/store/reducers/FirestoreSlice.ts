import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type FirestoreState = {
  isUpdating: boolean;
  isError: boolean;
  userDataLoading?: boolean;
};

const initialState: FirestoreState = {
  isUpdating: false,
  isError: false,
  userDataLoading: false,
};

const FirestoreSlice = createSlice({
  name: 'firestore',
  initialState,
  reducers: {
    setFirestoreState(state, action: PayloadAction<FirestoreState>) {
      state.isUpdating = action.payload.isUpdating;
      state.isError = action.payload.isError;
    },
    setFirestoreUserDataLoading(state, action: PayloadAction<FirestoreState>) {
      state.userDataLoading = action.payload.userDataLoading;
    },
  },
});

const { actions, reducer } = FirestoreSlice;

export const { setFirestoreState, setFirestoreUserDataLoading } = actions;

export default reducer;
