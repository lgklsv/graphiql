import { MessageInstance } from 'antd/es/message/interface';
import { useAppDispatch } from 'shared/hooks/redux';
import { setApiUrl } from 'store/reducers/ApiSlice';
import { NumBoolean, updateSetStore } from 'store/reducers/SettingsSlice';
import { updateTabStore } from 'store/reducers/TabSlice';
import { graphql } from 'shared/api';
import { getFirestoreData } from '../rest-firestore';

export const useDataFromFirestore = () => {
  const dispatch = useAppDispatch();
  const [trigger] = graphql.useLazyGetSchemaQuery();

  const firestoreData = async (
    uid: string,
    setLoading: (load: boolean) => void,
    messageApi: MessageInstance
  ) => {
    try {
      setLoading(true);
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
        trigger('{}');
        setLoading(false);
      }
    } catch (err) {
      if (err instanceof Error) {
        messageApi.open({
          key: 'getFireData',
          type: 'error',
          content: err.message,
        });
      }
    }
  };

  return firestoreData;
};
