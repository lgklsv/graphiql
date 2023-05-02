import React from 'react';

import { SessionTabs } from 'features/tabs';
import { Sidebar } from 'widgets/sidebar';
import styles from './SandboxLayout.module.scss';
import { QueryField } from '../query';
import { ResponseField } from '../response';

const SandboxLayout: React.FC = () => {
  return (
    <section className={styles.layout}>
      <Sidebar />
      <div className={styles.layout__main}>
        <SessionTabs />
        <div className={styles.layout__field}>
          <QueryField />
          <div className={styles.resizer}>
            <div className={styles.resizer__bar} />
          </div>
          <ResponseField />
        </div>
      </div>
    </section>
  );
};

export default SandboxLayout;
