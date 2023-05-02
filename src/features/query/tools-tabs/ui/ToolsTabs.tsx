import React from 'react';
import { Button, Space } from 'antd';
import { DownOutlined } from '@ant-design/icons';

import styles from './ToolsTabs.module.scss';

const TABS = ['Variables', 'Headers'];

const ToolsTabs: React.FC = () => {
  const [activeTab, setActiveTab] = React.useState(0);

  const changeTabHandler = (id: number) => {
    setActiveTab(id);
  };

  return (
    <div className={styles.tools}>
      <Space size={15}>
        {TABS.map((tab, id) => (
          <Button
            key={tab}
            onClick={() => changeTabHandler(id)}
            type={activeTab === id ? 'default' : 'text'}
            size="large"
          >
            {tab}
          </Button>
        ))}
      </Space>
      <Button size="large" icon={<DownOutlined />} />
    </div>
  );
};

export default ToolsTabs;
