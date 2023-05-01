import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Typography } from 'antd';

const { Title } = Typography;

const Sandbox: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Sandbox</title>
      </Helmet>
      <Title>Sandbox</Title>
    </>
  );
};

export default Sandbox;
