import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type SettingsState = {
  nocache: boolean;
  stats: boolean;
};

const initialState: SettingsState = {
  nocache: false,
  stats: true,
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setCacheSetting(state, action: PayloadAction<boolean>) {
      state.nocache = action.payload;
    },
    setStatsSetting(state, action: PayloadAction<boolean>) {
      state.nocache = action.payload;
    },
  },
});

const { actions, reducer } = settingsSlice;

export const { setCacheSetting, setStatsSetting } = actions;

export default reducer;
