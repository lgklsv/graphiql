import React from 'react';
import { Helmet } from 'react-helmet';
import styles from './NotFound.module.scss';

const NotFound: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>404</title>
      </Helmet>

      <div className={styles.layout}>
        <div className={styles.container}>
          <div className={styles.wrapper_404}>
            <h3>Houston, we have a problem…</h3>
            <h1>
              4
              <span className={styles.zero_container}>
                <div className={styles.zero_wrapper}>
                  <img
                    src="https://d33wubrfki0l68.cloudfront.net/86ebb532679ef65ed71e31ddcc1309552bb67321/44b2e/static/astronaut.e366bb92.svg"
                    alt="cosmos"
                  />
                </div>
              </span>
              4
            </h1>
          </div>
          <span className={styles.ground} />
        </div>
      </div>
    </>
  );
};

export default NotFound;
