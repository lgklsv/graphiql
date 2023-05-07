import {
  activeTabKeySelector,
  tabsSelector,
} from 'store/selectors/tabSelector';
import { useAppSelector } from './redux';

export const useTabs = () => {
  const activeTabKey = useAppSelector(activeTabKeySelector);
  const tabs = useAppSelector(tabsSelector);
  const activeTab = tabs.find(({ key }) => key === activeTabKey);
  const tabContent = activeTab?.query || {
    data: '',
    variables: '',
    headers: '',
  };
  return { activeTabKey, tabs, tabContent };
};
