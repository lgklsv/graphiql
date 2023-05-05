import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type TabsState = {
  activeKey: string;
  tabs: Tab[];
};

const initialState: TabsState = {
  activeKey: '1',
  tabs: [{ label: 'Tab 1', children: '', key: '1', closable: true }],
};

const tabsSlice = createSlice({
  name: 'tabs',
  initialState,
  reducers: {
    setActiveTabKey(state, action: PayloadAction<string>) {
      state.activeKey = action.payload;
    },
    updateTabs(state, action: PayloadAction<Tab[]>) {
      state.tabs = action.payload;
    },
    updateTabContent(
      state,
      action: PayloadAction<{ activeTabKey: string; content: string }>
    ) {
      const activeTab = state.tabs.find(
        ({ key }) => key === action.payload.activeTabKey
      );
      if (activeTab) {
        activeTab.children = action.payload.content;
      }
    },
  },
});

const { actions, reducer } = tabsSlice;

export const { setActiveTabKey, updateTabs, updateTabContent } = actions;

export default reducer;
