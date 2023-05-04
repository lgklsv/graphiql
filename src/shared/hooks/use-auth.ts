import { userSelector } from 'store/selectors/user';
import { useAppSelector } from './redux';

export const useAuth = () => {
  const { email, token, id } = useAppSelector(userSelector);
  // TODO: нужен ли отдельных хук или использовать контекст?

  return {
    isAuth: !!email,
    email,
    token,
    id,
  };
};
