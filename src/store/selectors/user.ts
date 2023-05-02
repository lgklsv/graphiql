import { createSelector } from '@reduxjs/toolkit';
import { rootStateSelector } from './root';

export const userSelector = createSelector(
  rootStateSelector,
  (state) => state.userReducer
);
