import React from 'react';
import { DownloadOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { useTranslation } from 'react-i18next';
import { useHotkeys } from 'react-hotkeys-hook';

import { SHORTCUTS } from 'app/config';
import { AppTooltip } from 'shared/ui';

interface DownloadJSONButtonProps {
  data: string;
}

const DownloadJSONButton: React.FC<DownloadJSONButtonProps> = ({ data }) => {
  const { t } = useTranslation();
  const downloadHandler = () => {
    const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(
      data
    )}`;
    const link = document.createElement('a');
    link.href = jsonString;
    link.download = 'data.json';

    link.click();
  };

  useHotkeys(SHORTCUTS.download, downloadHandler);

  return (
    <AppTooltip title={t('sandbox.tooltips.download')}>
      <Button
        onClick={downloadHandler}
        type="text"
        size="large"
        icon={<DownloadOutlined />}
      />
    </AppTooltip>
  );
};

export default DownloadJSONButton;
