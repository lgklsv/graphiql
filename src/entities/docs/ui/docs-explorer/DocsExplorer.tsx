import React from 'react';

import { graphql } from 'shared/api';
import { IntrospectionQuery, buildClientSchema } from 'graphql';
import DocsHeader from '../docs-header/DocsHeader';

import styles from './DocsExplorer.module.scss';

const DocsExplorer: React.FC = () => {
  const { data } = graphql.useGetSchemaQuery('{}');
  console.log(data);
  const schemaData = data?.data;
  if (schemaData) {
    console.log(buildClientSchema(schemaData));
  }
  return (
    <div className={styles.docs}>
      <DocsHeader />
    </div>
  );
};

export default DocsExplorer;
