import { useAppDispatch, useAppSelector } from 'shared/hooks/redux';
import { setApiUrl } from 'store/reducers/ApiSlice';
import { NumBoolean, updateSetStore } from 'store/reducers/SettingsSlice';
import { updateTabStore } from 'store/reducers/TabSlice';
import { graphql } from 'shared/api';
import { setFirestoreUserDataLoading } from 'store/reducers/FirestoreSlice';
import { firestoreSelector } from 'store/selectors/firestoreSelector';
import { getFirestoreData } from '../rest-firestore';

export const useDataFromFirestore = () => {
  const dispatch = useAppDispatch();
  const [trigger] = graphql.useLazyGetSchemaQuery();
  const { isUpdating, isError } = useAppSelector(firestoreSelector);

  const firestoreData = async (uid: string) => {
    try {
      dispatch(
        setFirestoreUserDataLoading({
          isUpdating,
          isError,
          userDataLoading: true,
        })
      );
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
        await trigger('{}');
      }
    } catch (error) {
      throw new Error('Error during login process');
    } finally {
      dispatch(
        setFirestoreUserDataLoading({
          isUpdating,
          isError,
          userDataLoading: false,
        })
      );
    }
  };

  return firestoreData;
};
