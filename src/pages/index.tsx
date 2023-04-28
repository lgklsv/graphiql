import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { Home } from './home';
import { Login } from './login';
import { Signup } from './signup';
import { NotFound } from './notfound';
import { Sandbox } from './sandbox';
import { ROUTES } from './config';

const Routing: React.FC = () => {
  return (
    <Routes>
      <Route path={ROUTES.home} element={<Home />} />
      <Route path={ROUTES.login} element={<Login />} />
      <Route path={ROUTES.signup} element={<Signup />} />
      <Route path={ROUTES.sandbox} element={<Sandbox />} />
      <Route path={ROUTES.notFound} element={<NotFound />} />
    </Routes>
  );
};

export default Routing;
