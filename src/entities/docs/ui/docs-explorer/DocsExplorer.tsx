import React from 'react';
import { motion } from 'framer-motion';

import { graphql } from 'shared/api';
import DocsHeader from '../docs-header/DocsHeader';

import styles from './DocsExplorer.module.scss';

const DocsExplorer: React.FC = () => {
  const { data } = graphql.useGetSchemaQuery('{}');
  console.log(data);

  return (
    <motion.div
      initial={{ x: '-110%' }}
      animate={{ x: 0 }}
      exit={{ x: '-110%' }}
      transition={{ duration: 0.3 }}
      className={styles.docs}
    >
      <DocsHeader />
    </motion.div>
  );
};

export default DocsExplorer;
