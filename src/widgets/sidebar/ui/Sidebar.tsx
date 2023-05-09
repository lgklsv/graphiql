import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Drawer, Grid, Space, Tooltip, Typography } from 'antd';
import {
  BookOutlined,
  MacCommandOutlined,
  ReloadOutlined,
  SettingOutlined,
} from '@ant-design/icons';

import { DocsExplorer } from 'entities/docs';
import { ShortcutsModal } from 'entities/modals';
import styles from './Sidebar.module.scss';

const { Title } = Typography;
const { useBreakpoint } = Grid;

const Sidebar: React.FC = () => {
  const { t } = useTranslation();
  const [isDocs, setIsDocs] = React.useState(false);
  const [isShortcutsModal, setIsShortcutsModal] = React.useState(false);
  const screens = useBreakpoint();

  const toggleShortcutsModal = () => {
    setIsShortcutsModal((prev) => !prev);
  };

  const toggleDocs = () => {
    setIsDocs((prev) => !prev);
  };

  return (
    <>
      <div className={styles.sidebar}>
        <Tooltip
          placement="bottomLeft"
          title={t(`sandbox.tooltips.docsClose}`)}
        >
          <Button
            onClick={toggleDocs}
            type="text"
            size="large"
            icon={<BookOutlined />}
          />
        </Tooltip>
        <Space
          direction={
            (screens.sm && !screens.md) || (screens.xs && !screens.md)
              ? 'horizontal'
              : 'vertical'
          }
        >
          <Tooltip placement="bottomLeft" title={t('sandbox.tooltips.refetch')}>
            <Button type="text" size="large" icon={<ReloadOutlined />} />
          </Tooltip>
          <Tooltip
            placement="bottomLeft"
            title={t('sandbox.tooltips.shortcuts')}
          >
            <Button
              onClick={toggleShortcutsModal}
              type="text"
              size="large"
              icon={<MacCommandOutlined />}
            />
          </Tooltip>
          <Tooltip
            placement="bottomLeft"
            title={t('sandbox.tooltips.settings')}
          >
            <Button type="text" size="large" icon={<SettingOutlined />} />
          </Tooltip>
        </Space>
      </div>
      <Drawer
        title={<Title style={{ margin: 0 }}>{t('docs.header.title')}</Title>}
        placement="left"
        open={isDocs}
        onClose={toggleDocs}
        zIndex={1071}
      >
        <DocsExplorer />
      </Drawer>
      <ShortcutsModal isOpen={isShortcutsModal} toggle={toggleShortcutsModal} />
    </>
  );
};

export default Sidebar;
