import React from 'react';
import { CaretRightOutlined } from '@ant-design/icons';
import { Button, Tooltip } from 'antd';
import { useTranslation } from 'react-i18next';

import { useAppDispatch, useAppSelector } from 'shared/hooks/redux';
import { activeTabSelector } from 'store/selectors/tabSelector';
import { useLazyGetEnteredQuery } from 'shared/api/graphql';
import { updateResponse } from 'store/reducers/TabSlice';

const ExecuteButton: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const tab = useAppSelector(activeTabSelector);

  const [trigger, { data, isLoading, error }] = useLazyGetEnteredQuery();

  React.useEffect(() => {
    dispatch(updateResponse({ data: JSON.stringify(data), isLoading, error }));
  }, [data, isLoading, error, dispatch]);

  const executeQueryHandler = () => {
    if (tab) {
      trigger(tab.query);
    }
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
