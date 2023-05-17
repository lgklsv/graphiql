import {
  collection,
  getDocs,
  setDoc,
  doc,
  updateDoc,
} from 'firebase/firestore';
import { db } from 'firebase';
import { useAuthState } from 'shared/hooks/use-auth';

interface IFirestoreData {
  id: string;
  commonSet: {
    isCache: number;
    isStats: number;
  };
  tabSet: {
    activeKey: string;
    tab: string[];
  };
}

export const getFirestoreUserData = async (uid: string) => {
  const tabCollectionsRef = collection(db, 'settings');

  const data = await getDocs(tabCollectionsRef);
  const filteredData = data.docs
    .map((docs) => ({
      ...docs.data(),
      id: docs.id,
    }))
    .filter((item) => item.id === uid);
  const initValue = !filteredData.length ? null : filteredData[0];

  if (initValue) {
    // TODO: оптимизировать и измменить названия
    const newArray = (initValue as IFirestoreData).tabSet.tab;
    const arr = newArray.map((elem) => {
      return JSON.parse(elem);
    });

    return {
      ...initValue,
      tab: arr,
    };
  }

  //   TODO: здесь же можно и диспачить, есть вернуть все данные

  return initValue;
};

// получаем сохранненые в базу данных настройки юзера

export const updateFirestoreUserData = async (id: string) => {
  const userSettingsRef = doc(db, 'settings', id);
  await updateDoc(userSettingsRef, {
    name: 'sf',
    // TODO: в каком формате передавать инишиал валуе
  });
};

export const createFirestoreUserData = async (uid: string) => {
  await setDoc(doc(db, 'settings', uid), {
    name: 'sf',
    // TODO: в каком формате передавать инишиал валуе
  });
};
