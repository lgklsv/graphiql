import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type TabsState = {
  activeKey: string;
  activeTab: Tab;
  tabs: Tab[];
};

const initialState: TabsState = {
  activeKey: '1',
  activeTab: {
    label: 'Tab 1',
    query: { data: '', variables: '', headers: '' },
    response: { data: '', isLoading: false, error: '' },
    key: '1',
    closable: true,
  },
  tabs: [
    {
      label: 'Tab 1',
      query: { data: '', variables: '', headers: '' },
      response: { data: '', isLoading: false, error: '' },
      key: '1',
      closable: true,
    },
  ],
};

const tabsSlice = createSlice({
  name: 'tabs',
  initialState,
  reducers: {
    setActiveTabKey(state, action: PayloadAction<string>) {
      state.activeKey = action.payload;
      const activeTab = state.tabs.find(({ key }) => key === action.payload);
      if (activeTab) {
        state.activeTab = activeTab;
      }
    },
    updateTabs(state, action: PayloadAction<Tab[]>) {
      state.tabs = action.payload;
    },
    updateTabContent(
      state,
      action: PayloadAction<{ activeTabKey: string; query: TabQueryContent }>
    ) {
      const activeTab = state.tabs.find(
        ({ key }) => key === action.payload.activeTabKey
      );
      if (activeTab) {
        activeTab.query = { ...activeTab.query, ...action.payload.query };
        state.activeTab = activeTab;
      }
    },
  },
});

const { actions, reducer } = tabsSlice;

export const { setActiveTabKey, updateTabs, updateTabContent } = actions;

export default reducer;
