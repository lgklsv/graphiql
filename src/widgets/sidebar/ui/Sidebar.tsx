import React from 'react';
import { Button, Space, Tooltip } from 'antd';
import {
  BookOutlined,
  MacCommandOutlined,
  ReloadOutlined,
  SettingOutlined,
} from '@ant-design/icons';

import styles from './Sidebar.module.scss';

const Sidebar: React.FC = () => {
  return (
    <div className={styles.sidebar}>
      <Tooltip placement="bottomLeft" title="Show documentation">
        <Button type="text" size="large" icon={<BookOutlined />} />
      </Tooltip>
      <Space direction="vertical">
        <Tooltip placement="bottomLeft" title="Re-fetch GraphQL schema">
          <Button type="text" size="large" icon={<ReloadOutlined />} />
        </Tooltip>
        <Tooltip placement="bottomLeft" title="Explore all shortcuts">
          <Button type="text" size="large" icon={<MacCommandOutlined />} />
        </Tooltip>
        <Tooltip placement="bottomLeft" title="Open settings">
          <Button type="text" size="large" icon={<SettingOutlined />} />
        </Tooltip>
      </Space>
    </div>
  );
};

export default Sidebar;
