import { useAppDispatch } from 'shared/hooks/redux';
import { useAuthState } from 'shared/hooks/use-auth';
import { updateTabStore } from 'store/reducers/TabSlice';
import { updateFirestoreData } from '../rest-firestore';
import { updateData } from '../utils';

export const useUpdateTabs = () => {
  const dispatch = useAppDispatch();
  const { id } = useAuthState();

  const updateWithFirebase = async (props: IUpdateQuery) => {
    const { tabs, activeTabKey, query, label } = props;
    const updateTabsData = updateData({ tabs, activeTabKey, query, label });

    if (!updateTabsData) {
      return;
    }

    const { newActiveKey, updateTabs, stringifyTabs } = updateTabsData;
    dispatch(
      updateTabStore({
        activeKey: newActiveKey,
        tabs: updateTabs,
      })
    );

    await updateFirestoreData(id as string, {
      activeKey: newActiveKey,
      tabs: stringifyTabs,
    });
  };

  return updateWithFirebase;
};
