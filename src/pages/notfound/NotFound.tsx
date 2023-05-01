import React from 'react';
import { ROUTES } from 'pages/config';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';

import styles from './NotFound.module.scss';
import Astronaut from './assets/Astronaut.asset';

const NotFound: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>404</title>
      </Helmet>

      <div className={styles['not-found']}>
        <div className={styles['not-found__wrapper']}>
          <h3>Page not found</h3>
          <h4>
            the page you are looking for doesn`t exist{' '}
            <Link to={ROUTES.home}>go home</Link>
          </h4>
          <h1>
            4
            <span className={styles.zero_container}>
              <div className={styles.zero_wrapper}>
                <Astronaut />
              </div>
            </span>
            4
          </h1>
        </div>
        <span className={styles.ground} />
      </div>
    </>
  );
};

export default NotFound;
