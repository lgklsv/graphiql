import React from 'react';

import { graphql } from 'shared/api';
import styles from './DocsExplorer.module.scss';

const DocsExplorer: React.FC = () => {
  const { data } = graphql.useGetSchemaQuery('{}');
  console.log(data);

  return <div className={styles.docs}>Docs content</div>;
};

export default DocsExplorer;
