import React, { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import { PrivateRoute } from 'shared/hoc';

import { AnimatePresence } from 'framer-motion';
import { ROUTES } from './config';
import { LayoutPage } from './layout';

const Home = lazy(() => import('./home'));
const Sandbox = lazy(() => import('./sandbox'));
const NotFound = lazy(() => import('./notfound'));
const Login = lazy(() => import('./login'));
const Signup = lazy(() => import('./signup'));

const Routing: React.FC = () => {
  return (
    <AnimatePresence>
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
    </AnimatePresence>
  );
};

export default Routing;
