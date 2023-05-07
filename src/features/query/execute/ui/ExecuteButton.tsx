import React from 'react';
import { CaretRightOutlined } from '@ant-design/icons';
import { Button, Tooltip } from 'antd';
import { useTranslation } from 'react-i18next';

import { useAppSelector } from 'shared/hooks/redux';
import { activeTabSelector } from 'store/selectors/tabSelector';
import { useLazyGetEnteredQuery } from 'shared/api/graphql';

const ExecuteButton: React.FC = () => {
  const { t } = useTranslation();
  const tab = useAppSelector(activeTabSelector);

  const [trigger] = useLazyGetEnteredQuery();

  const executeQueryHandler = () => {
    trigger(tab.query);
  };

  return (
    <Tooltip placement="bottomLeft" title={t('sandbox.tooltips.execute')}>
      <Button
        onClick={executeQueryHandler}
        type="primary"
        size="large"
        icon={<CaretRightOutlined style={{ transform: 'scale(1.7)' }} />}
      />
    </Tooltip>
  );
};

export default ExecuteButton;
