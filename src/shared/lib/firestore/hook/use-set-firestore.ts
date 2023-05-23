import { MessageInstance } from 'antd/es/message/interface';
import { useAppDispatch, useAppSelector } from 'shared/hooks/redux';
import { setApiUrl } from 'store/reducers/ApiSlice';
import { NumBoolean, updateSetStore } from 'store/reducers/SettingsSlice';
import { updateTabStore } from 'store/reducers/TabSlice';
import { graphql } from 'shared/api';
import { db } from 'firebase';
import { doc, getDoc } from 'firebase/firestore';
import { setFirestoreUserDataLoading } from 'store/reducers/FirestoreSlice';
import { firestoreSelector } from 'store/selectors/firestoreSelector';
import { createFirestoreData, getFirestoreData } from '../rest-firestore';

export const useDataFromFirestore = () => {
  const dispatch = useAppDispatch();
  const [trigger] = graphql.useLazyGetSchemaQuery();
  const { isUpdating, error } = useAppSelector(firestoreSelector);

  const firestoreData = async (uid: string, messageApi: MessageInstance) => {
    try {
      // check whether the user has data in the database
      const isHaveData = doc(db, 'settings', uid);
      const docSnap = await getDoc(isHaveData);

      // if not - create
      if (!docSnap.exists()) {
        await createFirestoreData(uid);
        return;
      }

      //  if there is - take the data from there
      dispatch(
        setFirestoreUserDataLoading({
          isUpdating,
          error,
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
    } catch (err) {
      if (err instanceof Error) {
        messageApi.open({
          key: 'getFireData',
          type: 'error',
          content: err.message,
        });
      }
    } finally {
      dispatch(
        setFirestoreUserDataLoading({
          isUpdating,
          error,
          userDataLoading: false,
        })
      );
    }
  };

  return firestoreData;
};
