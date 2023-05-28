import { ROUTES } from 'pages/config';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthState } from 'shared/hooks/use-auth';

interface IRequireAuth {
  children: JSX.Element;
}

const PrivateRoute = ({ children }: IRequireAuth) => {
  const location = useLocation();
  const { isAuth } = useAuthState();

  return !isAuth ? (
    <Navigate to={ROUTES.home} state={{ from: location }} />
  ) : (
    children
  );
};

export default PrivateRoute;
