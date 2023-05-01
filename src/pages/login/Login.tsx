import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Typography } from 'antd';

const { Title } = Typography;

const Login: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Log In</title>
      </Helmet>
      <Title>Login to your Graphql sandbox account</Title>
    </>
  );
};

export default Login;
