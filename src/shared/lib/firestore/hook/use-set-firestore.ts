import { useAppDispatch } from 'shared/hooks/redux';
import { NumBoolean, updateSetStore } from 'store/reducers/SettingsSlice';
import { updateTabStore } from 'store/reducers/TabSlice';
import { getFirestoreData } from '../rest-firestore';

export const useSetFirestore = () => {
  const dispatch = useAppDispatch();

  const firestoreDispatch = async (uid: string) => {
    const userSettings = await getFirestoreData(uid);

    if (userSettings) {
      const { tabs, activeKey, isCache, isStats } = userSettings;
      dispatch(updateTabStore({ activeKey, tabs: tabs as Tab[] }));
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
