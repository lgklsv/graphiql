/* eslint-disable  @typescript-eslint/no-unused-expressions */

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { updateFirestore } from 'store/actions/FirestoreActions';

export type TabsState = {
  activeKey: string;
  tabs: Tab[];
  isLoading: boolean;
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
  isLoading: false,
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
  // TODO: delete this
  extraReducers: (builder) => {
    builder.addCase(updateFirestore.pending, (state, action) => {
      state.isLoading = true;

      action.meta.arg.data.tabs &&
        (state.tabs = action.meta.arg.data.tabs as Tab[]);

      action.meta.arg.data.activeKey &&
        (state.activeKey = action.meta.arg.data.activeKey as string);
    });
    builder.addCase(updateFirestore.fulfilled, (state) => {
      state.isLoading = false;
    });
    builder.addCase(updateFirestore.rejected, (state) => {
      state.isLoading = false;
    });
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
