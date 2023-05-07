import React from 'react';
import { CheckOutlined, CopyOutlined } from '@ant-design/icons';
import { Button, Tooltip } from 'antd';
import { useTranslation } from 'react-i18next';

import { useTabs } from 'shared/hooks/use-tab';

const CopyButton: React.FC = () => {
  const { t } = useTranslation();
  const { tabQuery } = useTabs();
  const [copiedQuery, setCopiedQuery] = React.useState<string | null>(null);

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

  const copyQueryHandler = () => {
    setCopiedQuery(tabQuery.data);
  };

  return (
    <Tooltip
      placement="bottomLeft"
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
    </Tooltip>
  );
};

export default CopyButton;
