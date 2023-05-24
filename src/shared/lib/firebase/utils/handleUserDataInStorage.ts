import { User } from 'firebase/auth';
import { LOCAL_STORAGE_KEYS } from 'shared/lib/localStorage/constants';
import {
  removeLocalStorage,
  setLocalStorage,
} from 'shared/lib/localStorage/local-storage';
import { store } from 'store';
import { removeUser } from 'store/reducers/UserSlice';

type AuthUserData = {
  email: null | string;
  token: null | string;
  id: null | string;
};

const handleUserDataInStorage = (user: User | null) => {
  if (user) {
    const { email, uid, accessToken } = user as unknown as UserFirebase;
    const userData: AuthUserData = {
      email,
      token: accessToken,
      id: uid,
    };
    setLocalStorage(userData, LOCAL_STORAGE_KEYS.USER);
  } else {
    store.dispatch(removeUser());
    removeLocalStorage(LOCAL_STORAGE_KEYS.USER);
  }
};

export default handleUserDataInStorage;
