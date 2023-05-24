import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type FirestoreState = {
  isUpdating: boolean;
  error: string | null;
  userDataLoading?: boolean;
};

const initialState: FirestoreState = {
  isUpdating: false,
  error: null,
  userDataLoading: false,
};

const FirestoreSlice = createSlice({
  name: 'firestore',
  initialState,
  reducers: {
    setFirestoreState(state, action: PayloadAction<FirestoreState>) {
      state.isUpdating = action.payload.isUpdating;
      state.error = action.payload.error;
    },
    setFirestoreUserDataLoading(state, action: PayloadAction<boolean>) {
      state.userDataLoading = action.payload;
    },
    triggerFirestoreUpdate() {},
  },
});

const { actions, reducer } = FirestoreSlice;

export const {
  setFirestoreState,
  setFirestoreUserDataLoading,
  triggerFirestoreUpdate,
} = actions;

export default reducer;
