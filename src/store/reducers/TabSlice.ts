import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type TabsState = {
  activeKey: string;
  tabs: Tab[];
};

const initialState: TabsState = {
  activeKey: '1',
  tabs: [
    {
      label: 'Tab 1',
      query: { data: '', variables: '', headers: '' },
      response: { data: '', isLoading: false, error: undefined },
      key: '1',
      closable: false,
    },
  ],
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
      action: PayloadAction<{ activeTabKey: string; query: TabQueryContent }>
    ) {
      const activeTab = state.tabs.find(
        ({ key }) => key === action.payload.activeTabKey
      );
      if (activeTab) {
        activeTab.query = { ...activeTab.query, ...action.payload.query };
      }
    },

    updateResponse(state, action: PayloadAction<TabResponseContent>) {
      const activeTab = state.tabs.find(({ key }) => key === state.activeKey);
      if (activeTab) {
        activeTab.response = { ...activeTab.response, ...action.payload };
      }
    },

    updateTabLabel(
      state,
      action: PayloadAction<{ activeTabKey: string; label: string }>
    ) {
      const activeTab = state.tabs.find(
        ({ key }) => key === action.payload.activeTabKey
      );
      if (activeTab) {
        activeTab.label = action.payload.label;
      }
    },
    resetTabsData: () => initialState,

    updateTabStore: (
      state,
      action: PayloadAction<{ activeKey: string; tabs: Tab[] }>
    ) => {
      state.tabs = action.payload.tabs;
      state.activeKey = action.payload.activeKey;
    },
  },
});

const { actions, reducer } = tabsSlice;

export const {
  setActiveTabKey,
  updateTabs,
  updateTabContent,
  updateResponse,
  updateTabLabel,
  resetTabsData,
  updateTabStore,
} = actions;

export default reducer;
