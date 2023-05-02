import React from 'react';

import { Query } from 'features/query';
import styles from './MainField.module.scss';

const MainField: React.FC = () => {
  return (
    <div className={styles.field}>
      <div className={styles.field__request}>
        <div className={styles.field__request_top}>
          <Query.Editor />
          <Query.Toolbar />
        </div>
      </div>
    </div>
  );
};

export default MainField;
