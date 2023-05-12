import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type NumBoolean = 1 | 0;

export type SettingsState = {
  isCache: NumBoolean;
  isStats: NumBoolean;
};

const initialState: SettingsState = {
  isCache: 0,
  isStats: 1,
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setCacheSetting(state, action: PayloadAction<NumBoolean>) {
      state.isCache = action.payload;
    },
    setStatsSetting(state, action: PayloadAction<NumBoolean>) {
      state.isStats = action.payload;
    },
    resetSettings: () => initialState,
  },
});

const { actions, reducer } = settingsSlice;

export const { setCacheSetting, setStatsSetting, resetSettings } = actions;

export default reducer;
