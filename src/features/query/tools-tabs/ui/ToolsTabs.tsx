import React from 'react';
import { Button, Space, Tooltip } from 'antd';
import { DownOutlined, UpOutlined } from '@ant-design/icons';

import styles from './ToolsTabs.module.scss';

const TABS = ['Variables', 'Headers'];

interface ToolTabsProps {
  isOpen: boolean;
  toggle: () => void;
}

const ToolsTabs: React.FC<ToolTabsProps> = ({ isOpen, toggle }) => {
  const [activeTab, setActiveTab] = React.useState(0);

  const changeTabHandler = (id: number) => {
    setActiveTab(id);
    if (!isOpen) {
      toggle();
    }
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
      <Tooltip
        placement="bottomLeft"
        title={`${isOpen ? 'Hide' : 'Open'} editor tools`}
      >
        <Button
          type="text"
          size="large"
          icon={isOpen ? <DownOutlined /> : <UpOutlined />}
          onClick={toggle}
        />
      </Tooltip>
    </div>
  );
};

export default ToolsTabs;
