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

const Sidebar: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className={styles.sidebar}>
      <Tooltip placement="bottomLeft" title={t('sandbox.tooltips.docsOpen')}>
        <Button type="text" size="large" icon={<BookOutlined />} />
      </Tooltip>
      <Space direction="vertical">
        <Tooltip placement="bottomLeft" title={t('sandbox.tooltips.refetch')}>
          <Button type="text" size="large" icon={<ReloadOutlined />} />
        </Tooltip>
        <Tooltip placement="bottomLeft" title={t('sandbox.tooltips.shortcuts')}>
          <Button type="text" size="large" icon={<MacCommandOutlined />} />
        </Tooltip>
        <Tooltip placement="bottomLeft" title={t('sandbox.tooltips.settings')}>
          <Button type="text" size="large" icon={<SettingOutlined />} />
        </Tooltip>
      </Space>
    </div>
  );
};

export default Sidebar;
