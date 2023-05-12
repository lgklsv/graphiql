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

  const executeQueryHandler = async () => {
    if (tab) {
      const { variables, headers } = tab.query;
      const checkValues = (value: string | undefined, type: string) => {
        if (value === '') return true;
        if (value) {
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
        }
        return false;
      };
      if (
        checkValues(variables, t('sandbox.buttons.variables')) &&
        checkValues(headers, t('sandbox.buttons.headers'))
      ) {
        const cacheSetting = isCache === 1;
        setIsTriggered(true);
        const { fulfilledTimeStamp, startedTimeStamp } = await trigger(
          tab.query,
          cacheSetting
        );
        if (fulfilledTimeStamp) {
          const timing = fulfilledTimeStamp - startedTimeStamp;
          dispatch(updateResponse({ timing }));
        }
      }
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
