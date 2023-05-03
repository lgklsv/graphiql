import React from 'react';

import { Query } from 'features/query';
import { Resizable } from 'shared/ui';
import VariablesHeadersField from '../variables-headers-field/VariablesHeadersField';

import styles from './QueryField.module.scss';

const QueryField: React.FC = () => {
  return (
    <Resizable direction="horizontal" height={Infinity} resize={() => {}}>
      <div className={styles.query}>
        <div className={styles.query__editor}>
          <Query.Editor />
          <Query.Toolbar />
        </div>
        <VariablesHeadersField />
      </div>
    </Resizable>
  );
};

export default QueryField;
