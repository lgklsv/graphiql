import {
  activeTabKeySelector,
  tabsSelector,
} from 'store/selectors/tabSelector';
import { useAppSelector } from './redux';

export const useTabs = () => {
  const activeTabKey = useAppSelector(activeTabKeySelector);
  const tabs = useAppSelector(tabsSelector);
  const activeTab = tabs.find(({ key }) => key === activeTabKey);
  const tabQuery = activeTab?.query || {
    data: '',
    variables: '',
    headers: '',
  };
  const tabResponse = activeTab?.response || {
    data: '',
    isLoading: false,
    error: undefined,
  };
  return { activeTabKey, tabs, tabQuery, tabResponse };
};
