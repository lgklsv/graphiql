import { db } from 'firebase';
import { doc, getDoc } from 'firebase/firestore';
import {
  createFirestoreData,
  getFirestoreData,
} from 'shared/lib/firestore/rest-firestore';

/**  check whether the user has data in the database, not - create them. if there is - take the data from there */
export const checkEntryDatabase = async (uid: string) => {
  const isHaveData = doc(db, 'settings', uid);
  const docSnap = await getDoc(isHaveData);
  if (docSnap.exists()) {
    await getFirestoreData(uid);
  } else {
    await createFirestoreData(uid);
  }
};
