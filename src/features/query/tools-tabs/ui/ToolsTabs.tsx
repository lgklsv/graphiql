import React from 'react';

import { Button, Space } from 'antd';
import { DownOutlined } from '@ant-design/icons';

import styles from './ToolsTabs.module.scss';

const ToolsTabs: React.FC = () => {
  return (
    <div className={styles.tools}>
      <Space size={15}>
        <Button size="large">Variables</Button>
        <Button size="large">Headers</Button>
      </Space>
      <Button size="large" icon={<DownOutlined />} />
    </div>
  );
};

export default ToolsTabs;
