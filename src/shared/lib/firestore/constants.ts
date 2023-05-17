import {
  collection,
  getDocs,
  setDoc,
  doc,
  updateDoc,
} from 'firebase/firestore';
import { db } from 'firebase';
import { NumBoolean } from 'store/reducers/SettingsSlice';

export const initialValue = {
  commonSet: {
    isCache: 0,
    isStats: 1,
  },
  tabSet: {
    activeKey: '1',
    tab: [
      '{"label":"Tab 1","query":{"data":"","variables":"","headers":""},"response":{"data":"","isLoading":false},"key":"1","closable":false}',
    ],
  },
};

export interface IFirestoreData {
  id?: string;
  isCache: number | NumBoolean;
  isStats: number | NumBoolean;
  activeKey: string;
  tab: string[] | Tab[];
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
    const newArray = (initValue as IFirestoreData).tab as string[];
    const arr = newArray.map((elem) => {
      return JSON.parse(elem);
    }) as Tab[];

    const clearTabs = arr.map((item) => ({
      ...item,
      response: { data: '', isLoading: false, error: undefined },
    }));

    return {
      ...initValue,
      tab: clearTabs,
    } as IFirestoreData;
  }

  //   TODO: здесь же можно и диспачить, есть вернуть все данные

  return initValue;
};

// получаем сохранненые в базу данных настройки юзера

export const updateFirestoreUserData = async (
  id: string,
  data: { [x: string]: string | number | string[] }
) => {
  const userSettingsRef = doc(db, 'settings', id);
  await updateDoc(userSettingsRef, data);
};

export const createFirestoreUserData = async (uid: string) => {
  await setDoc(doc(db, 'settings', uid), {
    name: 'sf',
    // TODO: в каком формате передавать инишиал валуе
  });
};
