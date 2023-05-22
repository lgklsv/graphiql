import { RootState } from 'store';

export const firestoreSelector = (state: RootState) => state.firestoreReducer;
