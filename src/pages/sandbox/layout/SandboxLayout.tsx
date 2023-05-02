import React from 'react';

import { SessionTabs } from 'features/tabs';
import { Sidebar } from 'widgets/sidebar';
import { QueryField } from '../query';
import { ResponseField } from '../response';

import styles from './SandboxLayout.module.scss';

const SandboxLayout: React.FC = () => {
  return (
    <section className={styles.layout}>
      <Sidebar />
      <div className={styles.layout__main}>
        <SessionTabs />
        <div className={styles.layout__field}>
          <QueryField />
          <ResponseField />
        </div>
      </div>
    </section>
  );
};

export default SandboxLayout;
