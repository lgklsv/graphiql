import React from 'react';
import { Grid } from 'antd';
import { motion } from 'framer-motion';

import { graphql } from 'shared/api';
import DocsHeader from '../docs-header/DocsHeader';

import styles from './DocsExplorer.module.scss';

const { useBreakpoint } = Grid;

const DocsExplorer: React.FC = () => {
  const screens = useBreakpoint();
  const { data } = graphql.useGetSchemaQuery('{}');
  console.log(data);

  const isMobile = (screens.sm || screens.xs) && !screens.md;

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
