import React from 'react';
import { Route, Routes } from 'react-router-dom';

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
        <Route path={ROUTES.sandbox} element={<Sandbox />} />
        <Route path={ROUTES.notFound} element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default Routing;
