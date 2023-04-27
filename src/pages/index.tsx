import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { Home } from './home';
import { Login } from './login';
import { Signup } from './signup';
import { NotFound } from './notfound';
import { Sandbox } from './sandbox';

const Routing: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/sandbox" element={<Sandbox />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default Routing;
