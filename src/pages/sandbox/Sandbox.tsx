import React from 'react';
import { Helmet } from 'react-helmet-async';

import { SandboxLayout } from './layout';

const Sandbox: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Sandbox</title>
      </Helmet>
      <SandboxLayout />
    </>
  );
};

export default Sandbox;
