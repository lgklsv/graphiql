import React from 'react';
import { ClearOutlined } from '@ant-design/icons';
import { Button, Tooltip } from 'antd';
import { useTranslation } from 'react-i18next';

const PrettifyButton: React.FC = () => {
  const { t } = useTranslation();
  return (
    <Tooltip placement="bottomLeft" title={t('sandbox.tooltips.prettify')}>
      <Button type="text" size="large" icon={<ClearOutlined />} />
    </Tooltip>
  );
};

export default PrettifyButton;
