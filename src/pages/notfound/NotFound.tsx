import React from 'react';
import { Helmet } from 'react-helmet';

const NotFound: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>404</title>
      </Helmet>
      <h1>404 page goes here</h1>
    </>
  );
};

export default NotFound;
