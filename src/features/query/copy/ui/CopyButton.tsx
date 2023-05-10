import React from 'react';
import { CheckOutlined, CopyOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { useTranslation } from 'react-i18next';
import { useHotkeys } from 'react-hotkeys-hook';

import { SHORTCUTS } from 'app/config';
import { useTabs } from 'shared/hooks/use-tab';
import { AppTooltip } from 'shared/ui';

const CopyButton: React.FC = () => {
  const { t } = useTranslation();
  const { tabQuery } = useTabs();
  const [copiedQuery, setCopiedQuery] = React.useState<string | null>(null);

  const copyQueryHandler = () => {
    if (tabQuery.data) setCopiedQuery(tabQuery.data);
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

  useHotkeys(SHORTCUTS.copy, copyQueryHandler);

  return (
    <AppTooltip
      title={
        copiedQuery ? t('sandbox.tooltips.copied') : t('sandbox.tooltips.copy')
      }
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
