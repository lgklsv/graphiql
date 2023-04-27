import React from 'react';
import { Helmet } from 'react-helmet';
import { Typography } from 'antd';

const { Title } = Typography;

const Login: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Login</title>
      </Helmet>
      <Title>Login to your Graphql sandbox account</Title>
    </>
  );
};

export default Login;
