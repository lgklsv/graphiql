import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LOCAL_STORAGE_KEYS } from 'shared/lib/localStorage/constants';
import { setLocalStorage } from 'shared/lib/localStorage/local-storage';

export type InitialState = {
  email: null | string;
  token: null | string;
  id: null | string;
};

const initialState: InitialState = {
  email: null,
  token: null,
  id: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<InitialState>) {
      state.email = action.payload.email;
      state.token = action.payload.token;
      state.id = action.payload.id;

      setLocalStorage(action.payload.token as string, LOCAL_STORAGE_KEYS.TOKEN);
    },
    removeUser(state) {
      state.email = null;
      state.token = null;
      state.id = null;

      localStorage.removeItem(LOCAL_STORAGE_KEYS.TOKEN);
    },
  },
});

const { actions, reducer } = userSlice;

export const { setUser, removeUser } = actions;

export default reducer;
