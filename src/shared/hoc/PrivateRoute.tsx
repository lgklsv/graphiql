import { ROUTES } from 'pages/config';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthState } from 'shared/hooks/use-auth';

interface IRequireAuth {
  children: JSX.Element;
}

export const PrivateRoute = ({ children }: IRequireAuth) => {
  const location = useLocation();
  const { isAuth } = useAuthState();

  return !isAuth ? (
    <Navigate to={ROUTES.login} state={{ from: location }} />
  ) : (
    children
  );
};
