import { RootState } from 'store';

export const activeTabKeySelector = (state: RootState) =>
  state.tabsReducer.activeKey;
export const tabsSelector = (state: RootState) => state.tabsReducer.tabs;

export const activeTabSelector = (state: RootState) => {
  const activeTab = state.tabsReducer.tabs.find(
    ({ key }) => key === state.tabsReducer.activeKey
  );
  return activeTab;
};
