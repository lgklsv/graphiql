import React from 'react';

import { SessionTabs } from 'features/tabs';
import { Sidebar } from 'widgets/sidebar';
import { QueryField } from 'entities/query';
import { ResponseField } from 'entities/response';

import styles from './SandboxLayout.module.scss';

const SandboxLayout: React.FC = () => {
  const [isDocs, setIsDocs] = React.useState(false);

  const toggleDocsHandler = () => {
    setIsDocs((prev) => !prev);
  };

  return (
    <section className={styles.layout}>
      <Sidebar isDocs={isDocs} toggleDocs={toggleDocsHandler} />
      <div className={styles.layout__main}>
        <SessionTabs isDocs={isDocs} />
        <div className={styles.layout__field}>
          <QueryField isDocs={isDocs} />
          <ResponseField />
        </div>
      </div>
    </section>
  );
};

export default SandboxLayout;
