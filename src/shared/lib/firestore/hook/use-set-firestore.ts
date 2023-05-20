import { useAppDispatch } from 'shared/hooks/redux';
import { setApiUrl } from 'store/reducers/ApiSlice';
import { NumBoolean, updateSetStore } from 'store/reducers/SettingsSlice';
import { updateTabStore } from 'store/reducers/TabSlice';
import { getFirestoreData } from '../rest-firestore';

export const useDataFromFirestore = () => {
  const dispatch = useAppDispatch();

  const firestoreData = async (uid: string) => {
    const userSettings = await getFirestoreData(uid);

    if (userSettings) {
      const { tabs, activeKey, isCache, isStats, url } = userSettings;
      dispatch(updateTabStore({ activeKey, tabs: tabs as Tab[] }));
      dispatch(
        updateSetStore({
          isCache: isCache as NumBoolean,
          isStats: isStats as NumBoolean,
        })
      );
      dispatch(setApiUrl({ url }));
    }
  };

  return firestoreData;
};
