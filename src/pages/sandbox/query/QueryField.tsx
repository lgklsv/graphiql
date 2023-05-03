import React from 'react';

import { Query } from 'features/query';
import { Resizable } from 'shared/ui';

import styles from './QueryField.module.scss';

const QueryField: React.FC = () => {
  return (
    <Resizable direction="horizontal">
      <div className={styles.query}>
        <Resizable direction="vertical">
          <div className={styles.query__editor}>
            <Query.Editor />
            <Query.Toolbar />
          </div>
        </Resizable>
        <div className={styles.query__vars}>
          <Query.ToolsTabs />
          <Query.EditorTools />
        </div>
      </div>
    </Resizable>
  );
};

export default QueryField;
