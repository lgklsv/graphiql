import React from 'react';
import { CaretRightOutlined } from '@ant-design/icons';
import { Button, Tooltip } from 'antd';
import { useTranslation } from 'react-i18next';

const ExecuteButton: React.FC = () => {
  const { t } = useTranslation();
  return (
    <Tooltip placement="bottomLeft" title={t('sandbox.tooltips.execute')}>
      <Button
        type="primary"
        size="large"
        icon={<CaretRightOutlined style={{ transform: 'scale(1.7)' }} />}
      />
    </Tooltip>
  );
};

export default ExecuteButton;
