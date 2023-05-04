import { ROUTES } from 'pages/config';
import { useNavigate } from 'react-router-dom';
import { setUser } from 'store/reducers/UserSlice';
import { useAppDispatch } from './redux';

export const useUser = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const dispatchUser = ({ email, token, id }: IDispatchUser) => {
    dispatch(setUser({ email, token, id }));
    navigate(ROUTES.home, { replace: true });
  };

  return dispatchUser;
};
