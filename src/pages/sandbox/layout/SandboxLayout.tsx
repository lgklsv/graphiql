import React from 'react';

import { SessionTabs } from 'features/tabs';
import { Sidebar } from 'widgets/sidebar';
import { MainField } from '../main';
import styles from './SandboxLayout.module.scss';

const SandboxLayout: React.FC = () => {
  return (
    <section className={styles.layout}>
      <Sidebar />
      <div className={styles.layout__main}>
        <SessionTabs />
        <MainField />
      </div>
    </section>
  );
};

export default SandboxLayout;
