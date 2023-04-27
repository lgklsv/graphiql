import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';

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
      <ul>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/signup">Signup</Link>
        </li>
        <li>
          <Link to="/sandbox">Sandbox</Link>
        </li>
        <li>
          <Link to="/wiuehrfieohf">404</Link>
        </li>
      </ul>
    </>
  );
};

export default Home;
