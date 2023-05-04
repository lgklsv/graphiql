import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { PrivateRoute, PrivateRouteAuth } from 'shared/hoc/RequireAuth';

import { Home } from './home';
import { Login } from './login';
import { Signup } from './signup';
import { NotFound } from './notfound';
import { Sandbox } from './sandbox';
import { ROUTES } from './config';
import { LayoutPage } from './layout';

const Routing: React.FC = () => {
  return (
    <Routes>
      <Route path={ROUTES.home} element={<LayoutPage />}>
        <Route index element={<Home />} />
        <Route
          path={ROUTES.login}
          element={
            <PrivateRouteAuth>
              <Login />
            </PrivateRouteAuth>
          }
        />
        <Route
          path={ROUTES.signup}
          element={
            <PrivateRouteAuth>
              <Signup />
            </PrivateRouteAuth>
          }
        />
        <Route
          path={ROUTES.sandbox}
          element={
            <PrivateRoute>
              <Sandbox />
            </PrivateRoute>
          }
        />
        <Route path={ROUTES.notFound} element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default Routing;
