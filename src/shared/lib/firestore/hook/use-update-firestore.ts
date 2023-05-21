import { useAppDispatch } from 'shared/hooks/redux';
import { useAuthState } from 'shared/hooks/use-auth';
import { setFirestoreState } from 'store/reducers/FirestoreSlice';
import { updateFirestoreData } from '../rest-firestore';

export const useUpdateFirestore = () => {
  const dispatch = useAppDispatch();
  const { id } = useAuthState();

  const updateFirestore = async (fields: FirestoreUpdateKeys) => {
    try {
      dispatch(setFirestoreState(true));
      await updateFirestoreData(id as string, fields);
    } catch (err) {
      console.log(err);
    } finally {
      dispatch(setFirestoreState(false));
    }
  };

  return updateFirestore;
};
