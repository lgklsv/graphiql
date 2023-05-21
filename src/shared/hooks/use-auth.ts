import { useAppSelector } from './redux';

export const useAuthState = () => {
  const tokenStorage = useAppSelector((state) => state.userReducer.token);
  const idStorage = useAppSelector((state) => state.userReducer.id);

  return {
    isAuth: !!tokenStorage,
    id: idStorage,
  };
};
