import React from 'react';
import { Grid } from 'antd';

import { useAppSelector } from 'shared/hooks/redux';
import { firestoreSelector } from 'store/selectors/firestoreSelector';
import { Sidebar } from 'widgets/sidebar';
import { SessionTabs } from 'features/tabs';
import { ApiConnector } from 'features/api-connector';
import { FirestoreIndicator } from 'features/firestore-indicator';
import { QueryField } from 'entities/query';
import { ResponseField } from 'entities/response';
import { ErrorBoundary } from 'shared/hoc';
import { SkeletonApiConnector, SkeletonTabs } from './Skeleton';
import styles from './SandboxLayout.module.scss';

const { useBreakpoint } = Grid;

const SandboxLayout: React.FC = () => {
  const { userDataLoading } = useAppSelector(firestoreSelector);

  const screens = useBreakpoint();
  const isMobile = (screens.sm || screens.xs) && !screens.md;

  return (
    <section className={styles.layout}>
      <ErrorBoundary type="notification">
        <Sidebar />
      </ErrorBoundary>
      <div className={styles.layout__main}>
        <div className={styles.layout__main_tabs}>
          <ErrorBoundary type="notification">
            {userDataLoading ? <SkeletonApiConnector /> : <ApiConnector />}
            {!isMobile && !userDataLoading && <FirestoreIndicator />}
            {userDataLoading ? <SkeletonTabs /> : <SessionTabs />}
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
