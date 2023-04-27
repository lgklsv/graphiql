import React from 'react';
import { Helmet } from 'react-helmet';

const Login: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Login</title>
      </Helmet>
      <h1>Login to your Graphql sandbox account</h1>
    </>
  );
};

export default Login;
