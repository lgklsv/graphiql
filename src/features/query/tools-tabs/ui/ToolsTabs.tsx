import React from 'react';
import { Button, Space, Tooltip } from 'antd';
import { DownOutlined, UpOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';

import styles from './ToolsTabs.module.scss';

interface ToolTabsProps {
  isOpen: boolean;
  toggle: () => void;
}

const ToolsTabs: React.FC<ToolTabsProps> = ({ isOpen, toggle }) => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = React.useState(0);

  const TABS = [t('sandbox.buttons.variables'), t('sandbox.buttons.headers')];

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
        title={
          isOpen
            ? t('sandbox.tooltips.editorToolsClose')
            : t('sandbox.tooltips.editorToolsOpen')
        }
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
