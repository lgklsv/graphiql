import React from 'react';
import { Helmet } from 'react-helmet';
import { Typography } from 'antd';

const { Title } = Typography;

const Signup: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Sign up</title>
      </Helmet>
      <Title>Sign up to use Graphql sandbox</Title>
    </>
  );
};

export default Signup;
