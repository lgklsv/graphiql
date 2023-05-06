import React from 'react';
import { CopyOutlined } from '@ant-design/icons';
import { Button, Tooltip } from 'antd';
import { useTranslation } from 'react-i18next';

const CopyButton: React.FC = () => {
  const { t } = useTranslation();
  return (
    <Tooltip placement="bottomLeft" title={t('sandbox.tooltips.copy')}>
      <Button type="text" size="large" icon={<CopyOutlined />} />
    </Tooltip>
  );
};

export default CopyButton;
