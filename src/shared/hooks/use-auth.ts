import { LOCAL_STORAGE_KEYS } from 'shared/lib/localStorage/constants';
import { getLocalStorage } from 'shared/lib/localStorage/local-storage';

export const useAuthState = () => {
  const tokenStorage = getLocalStorage(LOCAL_STORAGE_KEYS.TOKEN);
  return {
    isAuth: !!tokenStorage,
  };
};
