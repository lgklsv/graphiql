import { useAppDispatch } from 'shared/hooks/redux';
import { NumBoolean, updateSetStore } from 'store/reducers/SettingsSlice';
import { updateTabStore } from 'store/reducers/TabSlice';
import { getFirestoreUserData } from '../constants';

export const useSetFirestore = () => {
  const dispatch = useAppDispatch();

  const firestoreDispatch = async (uid: string) => {
    const userSettings = await getFirestoreUserData(uid);

    if (userSettings) {
      const { tab, activeKey, isCache, isStats } = userSettings;
      dispatch(updateTabStore({ activeKey, tabs: tab as Tab[] }));
      dispatch(
        updateSetStore({
          isCache: isCache as NumBoolean,
          isStats: isStats as NumBoolean,
        })
      );
    }
  };

  return firestoreDispatch;
};
