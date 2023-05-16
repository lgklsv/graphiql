import React from 'react';

import { SessionTabs } from 'features/tabs';
import { Sidebar } from 'widgets/sidebar';
import { QueryField } from 'entities/query';
import { ResponseField } from 'entities/response';
import { ErrorBoundary } from 'shared/hoc';
import { ApiConnector } from 'features/api-connector';

import styles from './SandboxLayout.module.scss';

const SandboxLayout: React.FC = () => {
  return (
    <section className={styles.layout}>
      <ErrorBoundary type="notification">
        <Sidebar />
      </ErrorBoundary>
      <div className={styles.layout__main}>
        <ErrorBoundary type="notification">
          <ApiConnector />
          <SessionTabs />
        </ErrorBoundary>
        <div className={styles.layout__field}>
          <ErrorBoundary type="notification">
            <QueryField />
            <ResponseField />
          </ErrorBoundary>
        </div>
      </div>
    </section>
  );
};

export default SandboxLayout;
