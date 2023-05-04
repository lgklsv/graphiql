import React from 'react';
import { Button, Tooltip } from 'antd';
import {
  CaretRightOutlined,
  ClearOutlined,
  CopyOutlined,
} from '@ant-design/icons';

import styles from './Toolbar.module.scss';

const Toolbar: React.FC = () => {
  return (
    <div className={styles.toolbar}>
      <Tooltip placement="bottomLeft" title="Execute query (ctrl + enter)">
        <Button
          type="primary"
          size="large"
          icon={<CaretRightOutlined style={{ transform: 'scale(1.7)' }} />}
        />
      </Tooltip>
      <Tooltip placement="bottomLeft" title="Prettify (shift + ctrl + p)">
        <Button type="text" size="large" icon={<ClearOutlined />} />
      </Tooltip>
      <Tooltip placement="bottomLeft" title="Copy query (shift + ctrl + c)">
        <Button type="text" size="large" icon={<CopyOutlined />} />
      </Tooltip>
    </div>
  );
};

export default Toolbar;
