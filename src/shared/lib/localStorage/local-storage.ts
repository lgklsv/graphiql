import { createTransform } from 'redux-persist';
import { TabsState } from 'store/reducers/TabSlice';

export const setLocalStorage = (value: string, key: string) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const getLocalStorage = (key: string) => {
  const storageItem = localStorage.getItem(key);
  if (!storageItem) {
    return null;
  }

  return JSON.parse(storageItem);
};

export const tabsResponseTransform = createTransform(
  (inboundState: TabsState) => {
    const clearTabs = inboundState.tabs.map((item) => ({
      ...item,
      response: { data: '', isLoading: false, error: undefined },
    }));
    return { ...inboundState, tabs: clearTabs };
  },
  (outboundState: TabsState) => {
    return { ...outboundState };
  },
  { whitelist: ['tabsReducer'] }
);
