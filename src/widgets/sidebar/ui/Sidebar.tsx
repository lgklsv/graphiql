import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Drawer, Grid, Space, Typography } from 'antd';
import {
  BookOutlined,
  MacCommandOutlined,
  ReloadOutlined,
  SettingOutlined,
} from '@ant-design/icons';

import { DocsExplorer } from 'entities/docs';
import { ShortcutsModal } from 'entities/modals';
import { AppTooltip } from 'shared/ui';
import styles from './Sidebar.module.scss';

const { Title } = Typography;
const { useBreakpoint } = Grid;

const Sidebar: React.FC = () => {
  const { t } = useTranslation();
  const [isDocs, setIsDocs] = React.useState(false);
  const [isShortcutsModal, setIsShortcutsModal] = React.useState(false);
  const screens = useBreakpoint();

  const isMobile = (screens.sm || screens.xs) && !screens.md;

  const toggleShortcutsModal = () => {
    setIsShortcutsModal((prev) => !prev);
  };

  const toggleDocs = () => {
    setIsDocs((prev) => !prev);
  };

  return (
    <>
      <div className={styles.sidebar}>
        <AppTooltip title={t('sandbox.tooltips.docsClose')}>
          <Button
            onClick={toggleDocs}
            type="text"
            size="large"
            icon={<BookOutlined />}
          />
        </AppTooltip>
        <Space direction={isMobile ? 'horizontal' : 'vertical'}>
          <AppTooltip title={t('sandbox.tooltips.refetch')}>
            <Button type="text" size="large" icon={<ReloadOutlined />} />
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
            <Button type="text" size="large" icon={<SettingOutlined />} />
          </AppTooltip>
        </Space>
      </div>
      <Drawer
        title={<Title style={{ margin: 0 }}>{t('docs.header.title')}</Title>}
        placement="left"
        open={isDocs}
        onClose={toggleDocs}
        zIndex={1071}
        width={isMobile ? '90vw' : '550px'}
        style={{ borderRadius: '0 12px 12px 0' }}
      >
        <DocsExplorer />
      </Drawer>
      <ShortcutsModal isOpen={isShortcutsModal} toggle={toggleShortcutsModal} />
    </>
  );
};

export default Sidebar;
