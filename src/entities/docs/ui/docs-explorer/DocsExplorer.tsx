import React from 'react';

import { schema } from 'shared/api';
import DocsHeader from '../docs-header/DocsHeader';

import styles from './DocsExplorer.module.scss';

const DocsExplorer: React.FC = () => {
  const { data } = schema.useGetSchemaQuery('{}');
  console.log(JSON.stringify(data));
  return (
    <div className={styles.docs}>
      <DocsHeader />
    </div>
  );
};

export default DocsExplorer;
