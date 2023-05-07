import React from 'react';

import { SessionTabs } from 'features/tabs';
import { Sidebar } from 'widgets/sidebar';
import { QueryField } from 'entities/query';
import { ResponseField } from 'entities/response';

import { useAppSelector } from 'shared/hooks/redux';
import { docsSelector } from 'store/selectors/DocsSelectors';
import styles from './SandboxLayout.module.scss';

const SandboxLayout: React.FC = () => {
  const { isDocs } = useAppSelector(docsSelector);

  return (
    <section className={styles.layout}>
      <Sidebar />
      <div className={styles.layout__main}>
        <SessionTabs />
        <div
          className={`${styles.layout__field} ${
            isDocs && styles.layout__field_docs
          }`}
        >
          <QueryField />
          <ResponseField />
        </div>
      </div>
    </section>
  );
};

export default SandboxLayout;
