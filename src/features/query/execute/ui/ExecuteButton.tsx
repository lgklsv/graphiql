import React from 'react';
import { CaretRightOutlined, PauseOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { useTranslation } from 'react-i18next';
import { useHotkeys } from 'react-hotkeys-hook';

import { SHORTCUTS } from 'app/config';
import { activeTabSelector } from 'store/selectors/tabSelector';
import { updateResponse } from 'store/reducers/TabSlice';
import { useAppDispatch, useAppSelector } from 'shared/hooks/redux';
import { useLazyGetEnteredQuery } from 'shared/api/graphql';
import { AppTooltip } from 'shared/ui';

const ExecuteButton: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const tab = useAppSelector(activeTabSelector);
  const [isTriggered, setIsTriggered] = React.useState(false);

  const [trigger, { data, isFetching, error }] = useLazyGetEnteredQuery();

  React.useEffect(() => {
    if (isTriggered) {
      dispatch(
        updateResponse({
          data: JSON.stringify(data, null, '\t'),
          isLoading: isFetching,
          error,
        })
      );
    }
    if (isTriggered && !isFetching) {
      setIsTriggered(false);
    }
  }, [isTriggered, data, isFetching, error, dispatch]);

  const executeQueryHandler = () => {
    if (tab) {
      trigger(tab.query);
      setIsTriggered(true);
    }
  };

  useHotkeys(SHORTCUTS.execute, executeQueryHandler);

  return (
    <AppTooltip title={t('sandbox.tooltips.execute')}>
      <Button
        onClick={executeQueryHandler}
        type="primary"
        size="large"
        icon={
          isFetching ? (
            <PauseOutlined style={{ transform: 'scale(1.5)' }} />
          ) : (
            <CaretRightOutlined style={{ transform: 'scale(1.7)' }} />
          )
        }
      />
    </AppTooltip>
  );
};

export default ExecuteButton;