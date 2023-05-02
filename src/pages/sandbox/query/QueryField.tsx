import React from 'react';

import { Query } from 'features/query';
import { Resizable } from 'shared/ui';

import styles from './QueryField.module.scss';

const QueryField: React.FC = () => {
  return (
    <Resizable direction="vertical">
      <div className={styles.query}>
        <div className={styles.query__editor}>
          <Query.Editor />
          <Query.Toolbar />
        </div>
        <div className={styles.query__vars}>
          <Query.ToolsTabs />
          <Query.EditorTools />
        </div>
      </div>
    </Resizable>
  );
};

export default QueryField;
