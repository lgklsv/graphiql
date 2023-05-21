import { useAppDispatch } from 'shared/hooks/redux';
import { useAuthState } from 'shared/hooks/use-auth';
import { setFirestoreState } from 'store/reducers/FirestoreSlice';
import { updateFirestoreData } from '../rest-firestore';

export const useUpdateFirestore = () => {
  const dispatch = useAppDispatch();
  const { id } = useAuthState();

  const updateFirestore = async (fields: FirestoreUpdateKeys) => {
    try {
      dispatch(setFirestoreState({ isUpdating: true, isError: false }));
      await updateFirestoreData(id as string, fields);
      dispatch(setFirestoreState({ isUpdating: false, isError: false }));
    } catch {
      dispatch(setFirestoreState({ isUpdating: false, isError: true }));
    }
  };

  return updateFirestore;
};
