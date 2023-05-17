import { collection, getDocs } from 'firebase/firestore';
import { db } from 'firebase';

export const getFirestoreUserData = async (uid: string) => {
  const tabCollectionsRef = collection(db, 'settings');

  const data = await getDocs(tabCollectionsRef);
  const filteredData = data.docs
    .map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }))
    .filter((item) => item.id === uid);
  const initValue = !filteredData.length ? null : filteredData[0].id;

  //   TODO: здесь же можно и диспачить, есть вернуть все данные

  return initValue;
};

// получаем сохранненые в базу данных настройки юзера
