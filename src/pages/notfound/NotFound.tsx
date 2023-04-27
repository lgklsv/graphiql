import React from 'react';
import { Helmet } from 'react-helmet';
import { Typography } from 'antd';

const { Title } = Typography;

const NotFound: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>404</title>
      </Helmet>
      <Title>404 page goes here</Title>
    </>
  );
};

export default NotFound;
