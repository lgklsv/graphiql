import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type NumBoolean = 1 | 0;

export type SettingsState = {
  nocache: NumBoolean;
  stats: NumBoolean;
};

const initialState: SettingsState = {
  nocache: 0,
  stats: 1,
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setCacheSetting(state, action: PayloadAction<NumBoolean>) {
      console.log(action.payload);
      state.nocache = action.payload;
    },
    setStatsSetting(state, action: PayloadAction<NumBoolean>) {
      state.nocache = action.payload;
    },
  },
});

const { actions, reducer } = settingsSlice;

export const { setCacheSetting, setStatsSetting } = actions;

export default reducer;
