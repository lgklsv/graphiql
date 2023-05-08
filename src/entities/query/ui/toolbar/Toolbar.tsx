import React from 'react';

import { Query } from 'features/query';
import styles from './Toolbar.module.scss';

const Toolbar: React.FC = () => {
  return (
    <div className={styles.toolbar}>
      <Query.ExecuteButton />
      <Query.PrettifyButton />
      <Query.CopyButton />
    </div>
  );
};

export default Toolbar;
