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
  const [copiedQuery, setCopiedQuery] = React.useState<string | null>(null);

  const copyQueryHandler = () => {
    if (data) setCopiedQuery(data);
  };

  React.useEffect(() => {
    let timer: NodeJS.Timeout;
    if (copiedQuery) {
      navigator.clipboard.writeText(copiedQuery);
      timer = setTimeout(() => {
        setCopiedQuery(null);
      }, 800);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [copiedQuery]);

  useHotkeys(shortcut || 'shift+ctrl+c', copyQueryHandler);

  return (
    <AppTooltip
      title={copiedQuery ? t('sandbox.tooltips.copy.done') : defaultTooltip}
    >
      <Button
        onClick={copyQueryHandler}
        type="text"
        size="large"
        icon={copiedQuery ? <CheckOutlined /> : <CopyOutlined />}
      />
    </AppTooltip>
  );
};

export default CopyButton;
