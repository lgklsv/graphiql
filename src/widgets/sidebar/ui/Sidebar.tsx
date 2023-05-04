import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Space, Tooltip } from 'antd';
import {
  BookOutlined,
  MacCommandOutlined,
  ReloadOutlined,
  SettingOutlined,
} from '@ant-design/icons';

import styles from './Sidebar.module.scss';

interface SideBarProps {
  isDocs: boolean;
  toggleDocs: () => void;
}

const Sidebar: React.FC<SideBarProps> = ({ isDocs, toggleDocs }) => {
  const { t } = useTranslation();
  return (
    <>
      <div className={styles.sidebar}>
        <Tooltip
          placement="bottomLeft"
          title={t(`sandbox.tooltips.${isDocs ? 'docsOpen' : 'docsClose'}`)}
        >
          <Button
            onClick={toggleDocs}
            type="text"
            size="large"
            icon={<BookOutlined />}
          />
        </Tooltip>
        <Space direction="vertical">
          <Tooltip placement="bottomLeft" title={t('sandbox.tooltips.refetch')}>
            <Button type="text" size="large" icon={<ReloadOutlined />} />
          </Tooltip>
          <Tooltip
            placement="bottomLeft"
            title={t('sandbox.tooltips.shortcuts')}
          >
            <Button type="text" size="large" icon={<MacCommandOutlined />} />
          </Tooltip>
          <Tooltip
            placement="bottomLeft"
            title={t('sandbox.tooltips.settings')}
          >
            <Button type="text" size="large" icon={<SettingOutlined />} />
          </Tooltip>
        </Space>
      </div>
      {isDocs && (
        <div className={styles.sidebar__docs}>
          <h1>DOCS</h1>
        </div>
      )}
    </>
  );
};

export default Sidebar;
