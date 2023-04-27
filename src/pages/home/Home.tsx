import React from 'react';
import { Helmet } from 'react-helmet';

const Home: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Home</title>
      </Helmet>
      <h1>Home Page / Welcome Page</h1>
      <h2>Hello world!</h2>
      <h3 className="test-text-secondary">Text secondary</h3>
      <div className="test-block">
        <div className="test-block-second" />
      </div>
    </>
  );
};

export default Home;
