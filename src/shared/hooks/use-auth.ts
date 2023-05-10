import { useAppSelector } from './redux';

export const useAuthState = () => {
  const tokenStorage = useAppSelector((state) => state.userReducer.token);
  return {
    isAuth: !!tokenStorage,
  };
};
