import React from 'react';

import { Query } from 'features/query';
import styles from './MainField.module.scss';

const MainField: React.FC = () => {
  return (
    <div className={styles.field}>
      <div className={styles.field__request}>
        <div className={styles.field__request_editor}>
          <Query.Editor />
          <Query.Toolbar />
        </div>
        <div className={styles.field__request_vars}>
          <Query.ToolsTabs />
        </div>
      </div>
    </div>
  );
};

export default MainField;
