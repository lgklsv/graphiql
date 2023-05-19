import React from 'react';
import { CheckOutlined, CopyOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { useTranslation } from 'react-i18next';
import { useHotkeys } from 'react-hotkeys-hook';

import { AppTooltip } from 'shared/ui';

interface CopyButtonProps {
  data: string | undefined;
  defaultTooltip: string;
  shortcut?: string[] | string;
}

const CopyButton: React.FC<CopyButtonProps> = ({
  data,
  defaultTooltip,
  shortcut,
}) => {
  const { t } = useTranslation();
  const [copiedData, setCopiedData] = React.useState<string | null>(null);

  const copyDataHandler = () => {
    if (data) setCopiedData(data);
  };

  React.useEffect(() => {
    let timer: NodeJS.Timeout;
    if (copiedData) {
      navigator.clipboard.writeText(copiedData);
      timer = setTimeout(() => {
        setCopiedData(null);
      }, 800);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [copiedData]);

  useHotkeys(shortcut || 'shift+ctrl+c', copyDataHandler);

  return (
    <AppTooltip
      title={copiedData ? t('sandbox.tooltips.copy.done') : defaultTooltip}
    >
      <Button
        onClick={copyDataHandler}
        type="text"
        size="large"
        icon={copiedData ? <CheckOutlined /> : <CopyOutlined />}
      />
    </AppTooltip>
  );
};

export default CopyButton;
