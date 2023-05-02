import { userSelector } from 'store/selectors/user';
import { useAppSelector } from './redux';

export const useAuth = () => {
  const { email, token, id } = useAppSelector(userSelector);
  // TODO: нужен ли отдельных хук?

  return {
    isAuth: !!email,
    email,
    token,
    id,
  };
};
