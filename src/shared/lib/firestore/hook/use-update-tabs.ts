import { useAppDispatch } from 'shared/hooks/redux';
import { updateTabStore } from 'store/reducers/TabSlice';
import { updateData } from '../utils';

export const useUpdateTabs = () => {
  const dispatch = useAppDispatch();

  const updateTabsForFirebase = (props: IUpdateQuery) => {
    const { tabs, activeTabKey, query, label } = props;
    const updateTabsData = updateData({ tabs, activeTabKey, query, label });

    if (!updateTabsData) {
      return undefined;
    }

    const { newActiveKey, updateTabs, stringifyTabs } = updateTabsData;
    dispatch(
      updateTabStore({
        activeKey: newActiveKey,
        tabs: updateTabs,
      })
    );
    return {
      activeKey: newActiveKey,
      tabs: stringifyTabs,
    };
  };

  return updateTabsForFirebase;
};
