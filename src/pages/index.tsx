import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { PrivateRoute } from 'shared/hoc/PrivateRoute';

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
        <Route path={ROUTES.login} element={<Login />} />
        <Route path={ROUTES.signup} element={<Signup />} />
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
