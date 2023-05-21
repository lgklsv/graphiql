import { useAppDispatch } from 'shared/hooks/redux';
import { useAuthState } from 'shared/hooks/use-auth';
import { updateFirestoreData } from '../rest-firestore';

export const useUpdateFirestore = () => {
  const dispatch = useAppDispatch();
  const { id } = useAuthState();

  const updateFirestore = async (fields: FirestoreUpdateKeys) => {
    await updateFirestoreData(id as string, fields);
  };

  return updateFirestore;
};
