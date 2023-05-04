import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Tooltip } from 'antd';
import {
  CaretRightOutlined,
  ClearOutlined,
  CopyOutlined,
} from '@ant-design/icons';

import styles from './Toolbar.module.scss';

const Toolbar: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div className={styles.toolbar}>
      <Tooltip placement="bottomLeft" title={t('sandbox.tooltips.execute')}>
        <Button
          type="primary"
          size="large"
          icon={<CaretRightOutlined style={{ transform: 'scale(1.7)' }} />}
        />
      </Tooltip>
      <Tooltip placement="bottomLeft" title={t('sandbox.tooltips.prettify')}>
        <Button type="text" size="large" icon={<ClearOutlined />} />
      </Tooltip>
      <Tooltip placement="bottomLeft" title={t('sandbox.tooltips.copy')}>
        <Button type="text" size="large" icon={<CopyOutlined />} />
      </Tooltip>
    </div>
  );
};

export default Toolbar;
