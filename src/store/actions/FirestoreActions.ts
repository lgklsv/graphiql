import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  collection,
  getDocs,
  setDoc,
  doc,
  updateDoc,
} from 'firebase/firestore';
import { db } from 'firebase';
import { NumBoolean } from 'store/reducers/SettingsSlice';
import { parseArray, stringifyArray } from 'features/query/editor/ui/Editor';

export interface IFirestoreData {
  id?: string;
  isCache: number | NumBoolean;
  isStats: number | NumBoolean;
  activeKey: string;
  tab: string[] | Tab[];
}

export interface IDataType {
  [x: string]: string | number | string[] | Tab[];
}

export const getFirestore = createAsyncThunk(
  'users/fetchByIdStatus',
  async (uid: string) => {
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
      const stringTabsArray = (initValue as IFirestoreData).tab as string[];

      const tabsArr = parseArray(stringTabsArray).map((item) => ({
        ...item,
        response: { data: '', isLoading: false, error: undefined },
      }));

      return {
        ...initValue,
        tab: tabsArr,
      } as IFirestoreData;
    }

    return initValue;
  }
);

interface IUpdateFirestore {
  id: string;
  data: IUpdateTabs | IDataType;
}

interface IUpdateTabs {
  tabs?: Tab[];
  activeKey?: string;
  query?: TabQueryContent;
  label?: string;
  isCache?: NumBoolean | number;
  isStats?: NumBoolean | number;
}

export type SettingsState = {
  isCache: NumBoolean | number;
  isStats: NumBoolean | number;
};

export const updateFirestore = createAsyncThunk<
  IDataType | IUpdateTabs,
  IUpdateFirestore
>('users/fetch', async ({ id, data }) => {
  const userSettingsRef = doc(db, 'settings', id);

  if (data.query) {
    // console.log('UPDATE QUERY');
    const { tabs, activeKey, query } = data as IUpdateTabs;
    const activeTab = { ...tabs?.find(({ key }) => key === activeKey) };

    activeTab.query = { ...activeTab.query, ...query };
    const updateTabs = tabs?.map((t) =>
      t.key === activeTab.key ? activeTab : t
    ) as Tab[];

    const stringifyTabs = stringifyArray(updateTabs);

    const key = activeTab?.key;

    await updateDoc(userSettingsRef, {
      activeKey: key,
      tab: stringifyTabs,
    });

    return { activeKey: activeTab.key, tabs: updateTabs };
  }

  if (data.tabs) {
    // console.log('UPDATE tabs');
    const stringifyTabs = stringifyArray(data.tabs as Tab[]);

    await updateDoc(userSettingsRef, {
      activeKey: data.activeKey as string,
      tab: stringifyTabs,
    });

    return data;
  }

  await updateDoc(userSettingsRef, data as IDataType);

  return data;
});

export const createFirestore = createAsyncThunk(
  'user8s/fetch',
  async (uid: string) => {
    await setDoc(doc(db, 'settings', uid), {
      isCache: 0,
      isStats: 1,
      activeKey: '1',
      tab: [
        '{"label":"Tab 1","query":{"data":"","variables":"","headers":""},"response":{"data":"","isLoading":false},"key":"1","closable":false}',
      ],
    });
  }
);
