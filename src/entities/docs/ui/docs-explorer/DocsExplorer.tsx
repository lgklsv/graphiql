import React from 'react';
import styles from './DocsExplorer.module.scss';
import DocsHeader from '../docs-header/DocsHeader';

const DocsExplorer: React.FC = () => {
  return (
    <div className={styles.docs}>
      <DocsHeader />
    </div>
  );
};

export default DocsExplorer;
