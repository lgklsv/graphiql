import React from 'react';
import { Button } from 'antd';
import { ROUTES } from 'pages/config';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import './NotFound.scss';

const NotFound: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>404</title>
      </Helmet>

      <div className="layout">
        <div className="container">
          <div className="wrapper_404">
            <h3>Page not found</h3>
            <h4>the page you are looking for doesn&apos;t exist</h4>

            <Button type="primary" size="large">
              <Link to={ROUTES.home}>Go home</Link>
            </Button>

            <h1>
              4
              <span className="zero_container">
                <div className="zero_wrapper">
                  <img
                    src="https://d33wubrfki0l68.cloudfront.net/86ebb532679ef65ed71e31ddcc1309552bb67321/44b2e/static/astronaut.e366bb92.svg"
                    alt="cosmos"
                  />
                </div>
              </span>
              4
            </h1>
          </div>
          <span className="ground" />
        </div>
      </div>
    </>
  );
};

export default NotFound;
