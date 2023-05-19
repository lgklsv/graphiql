import React from 'react';

import { SessionTabs } from 'features/tabs';
import { Sidebar } from 'widgets/sidebar';
import { ApiConnector } from 'features/api-connector';
import { QueryField } from 'entities/query';
import { ResponseField } from 'entities/response';
import { ErrorBoundary } from 'shared/hoc';
import { useSetFirestore } from 'shared/lib/firestore/hook/use-set-firestore';
import { useAuthState } from 'shared/hooks/use-auth';

import styles from './SandboxLayout.module.scss';

const SandboxLayout: React.FC = () => {
  const { id } = useAuthState();
  const firestoreDispatch = useSetFirestore();

  React.useEffect(() => {
    firestoreDispatch(id as string);
  }, [firestoreDispatch, id]);

  // TODO: add loader on respons firestore

  return (
    <section className={styles.layout}>
      <ErrorBoundary type="notification">
        <Sidebar />
      </ErrorBoundary>
      <div className={styles.layout__main}>
        <div className={styles.layout__main_tabs}>
          <ErrorBoundary type="notification">
            <ApiConnector />
            <SessionTabs />
          </ErrorBoundary>
        </div>
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
