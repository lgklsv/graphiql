import React from 'react';
import { CaretRightOutlined, PauseOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { useTranslation } from 'react-i18next';
import { useHotkeys } from 'react-hotkeys-hook';

import { SHORTCUTS } from 'app/config';
import { activeTabSelector } from 'store/selectors/tabSelector';
import { settingsSelector } from 'store/selectors/settingsSelector';
import { updateResponse } from 'store/reducers/TabSlice';
import { useAppDispatch, useAppSelector } from 'shared/hooks/redux';
import { useLazyGetEnteredQuery } from 'shared/api/graphql';
import { AppTooltip } from 'shared/ui';

const ExecuteButton: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const tab = useAppSelector(activeTabSelector);
  const { isCache } = useAppSelector(settingsSelector);
  const [isTriggered, setIsTriggered] = React.useState(false);

  const [
    trigger,
    { data, isFetching, error, startedTimeStamp, fulfilledTimeStamp },
  ] = useLazyGetEnteredQuery();

  React.useEffect(() => {
    if (isTriggered && fulfilledTimeStamp && startedTimeStamp) {
      const timing = fulfilledTimeStamp - startedTimeStamp;
      dispatch(
        updateResponse({
          data: JSON.stringify(data, null, '\t'),
          isLoading: isFetching,
          error,
          timing,
        })
      );
    }
    if (isTriggered && !isFetching) {
      setIsTriggered(false);
    }
  }, [
    isTriggered,
    data,
    isFetching,
    error,
    dispatch,
    fulfilledTimeStamp,
    startedTimeStamp,
  ]);

  const executeQueryHandler = () => {
    if (!tab) return;
    const { variables, headers } = tab.query;
    const checkValues = (value: string | undefined, type: string) => {
      if (value === '') return true;
      if (!value) return false;
      try {
        JSON.parse(value);
        return true;
      } catch (err) {
        const errorMessage = `${t('sandbox.response.error', {
          fieldName: type,
        })}`;
        dispatch(
          updateResponse({
            data: errorMessage,
            isLoading: false,
            error,
          })
        );
        return false;
      }
    };
    if (
      checkValues(variables, t('sandbox.buttons.variables')) &&
      checkValues(headers, t('sandbox.buttons.headers'))
    ) {
      const cacheSetting = isCache === 1;
      trigger(tab.query, cacheSetting);
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
