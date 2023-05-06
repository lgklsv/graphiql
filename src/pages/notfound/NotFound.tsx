import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { ROUTES } from 'pages/config';

import styles from './NotFound.module.scss';
import Astronaut from './assets/Astronaut.asset';

const NotFound: React.FC = () => {
  const { t } = useTranslation();
  return (
    <>
      <Helmet>
        <title>404</title>
      </Helmet>

      <div className={styles['not-found']}>
        <div className={styles['not-found__wrapper']}>
          <h3>{t('notFound.title')}</h3>
          <h4>
            {t('notFound.subtitle')}{' '}
            <Link to={ROUTES.home}>{t('notFound.homeLink')}</Link>
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
