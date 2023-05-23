import React from 'react';
import { Grid } from 'antd';

import { Sidebar } from 'widgets/sidebar';
import { SessionTabs } from 'features/tabs';
import { ApiConnector } from 'features/api-connector';
import { FirestoreIndicator } from 'features/firestore-indicator';
import { QueryField } from 'entities/query';
import { ResponseField } from 'entities/response';
import { ErrorBoundary } from 'shared/hoc';
import { SkeletonApiConnector, SkeletonTabs } from './Skeleton';
import styles from './SandboxLayout.module.scss';

interface SandboxLayoutProps {
  isLoading: boolean;
}

const { useBreakpoint } = Grid;

const SandboxLayout: React.FC<SandboxLayoutProps> = ({
  isLoading,
}: SandboxLayoutProps) => {
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
            {isLoading ? <SkeletonApiConnector /> : <ApiConnector />}
            {!isMobile && !isLoading && <FirestoreIndicator />}
            {isLoading ? <SkeletonTabs /> : <SessionTabs />}
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
