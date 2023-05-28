import React, { Suspense, lazy } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Drawer, Grid, Space, Typography } from 'antd';
import { useHotkeys } from 'react-hotkeys-hook';
import {
  BookOutlined,
  MacCommandOutlined,
  SettingOutlined,
  SyncOutlined,
} from '@ant-design/icons';

import { SHORTCUTS } from 'app/config';
import { SettingsModal, ShortcutsModal } from 'entities/modals';
import { AppTooltip, Spinner } from 'shared/ui';
import { graphql } from 'shared/api';
import { FirestoreIndicator } from 'features/firestore-indicator';
import { ErrorBoundary } from 'shared/hoc';
import styles from './Sidebar.module.scss';

const DocsExplorer = lazy(() => import('entities/docs'));

const { Title } = Typography;
const { useBreakpoint } = Grid;

const Sidebar: React.FC = () => {
  const { t } = useTranslation();
  const [isDocs, setIsDocs] = React.useState(false);
  const [isSettingsModal, setIsSettingsModal] = React.useState(false);
  const [isShortcutsModal, setIsShortcutsModal] = React.useState(false);
  const screens = useBreakpoint();

  const { data, isFetching, isError, refetch } =
    graphql.useGetSchemaQuery('{}');

  const isMobile = (screens.sm || screens.xs) && !screens.md;

  const toggleShortcutsModal = () => {
    setIsShortcutsModal((prev) => !prev);
  };

  const toggleSettingsModal = () => {
    setIsSettingsModal((prev) => !prev);
  };

  const toggleDocs = () => {
    setIsDocs((prev) => !prev);
  };

  const refetchSchemaHandler = () => {
    refetch();
  };

  useHotkeys(SHORTCUTS.refetch, refetchSchemaHandler);

  return (
    <>
      <aside className={styles.sidebar}>
        <ErrorBoundary type="notification">
          <AppTooltip title={t('sandbox.tooltips.docsClose')}>
            <Button
              onClick={toggleDocs}
              type={isFetching ? 'ghost' : 'text'}
              disabled={isFetching || isError}
              loading={isFetching}
              size="large"
              icon={<BookOutlined />}
            />
          </AppTooltip>
          <Space direction={isMobile ? 'horizontal' : 'vertical'}>
            {isMobile && <FirestoreIndicator />}
            <AppTooltip title={t('sandbox.tooltips.refetch')}>
              <Button
                onClick={refetchSchemaHandler}
                type="text"
                size="large"
                icon={<SyncOutlined />}
                loading={isFetching}
              />
            </AppTooltip>
            {!isMobile && (
              <AppTooltip title={t('sandbox.tooltips.shortcuts')}>
                <Button
                  onClick={toggleShortcutsModal}
                  type="text"
                  size="large"
                  icon={<MacCommandOutlined />}
                />
              </AppTooltip>
            )}
            <AppTooltip title={t('sandbox.tooltips.settings')}>
              <Button
                onClick={toggleSettingsModal}
                type="text"
                size="large"
                icon={<SettingOutlined />}
              />
            </AppTooltip>
          </Space>
        </ErrorBoundary>
      </aside>
      <ErrorBoundary type="notification">
        <Drawer
          title={<Title style={{ margin: 0 }}>{t('docs.header.title')}</Title>}
          placement="left"
          open={isDocs}
          onClose={toggleDocs}
          width={isMobile ? '90vw' : '550px'}
          style={{ borderRadius: '0 12px 12px 0' }}
        >
          <Suspense fallback={<Spinner size="medium" />}>
            <DocsExplorer schema={data} />
          </Suspense>
        </Drawer>
        <ShortcutsModal
          isOpen={isShortcutsModal}
          toggle={toggleShortcutsModal}
        />
        <SettingsModal isOpen={isSettingsModal} toggle={toggleSettingsModal} />
      </ErrorBoundary>
    </>
  );
};

export default Sidebar;
