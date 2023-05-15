import React from 'react';
import { CaretRightOutlined } from '@ant-design/icons';
import { Button, message } from 'antd';
import { useTranslation } from 'react-i18next';
import { useHotkeys } from 'react-hotkeys-hook';
import { NoticeType } from 'antd/es/message/interface';

import { SHORTCUTS } from 'app/config';
import { activeTabSelector } from 'store/selectors/tabSelector';
import { settingsSelector } from 'store/selectors/settingsSelector';
import { updateResponse } from 'store/reducers/TabSlice';
import { useAppDispatch, useAppSelector } from 'shared/hooks/redux';
import { useLazyGetEnteredQuery } from 'shared/api/graphql';
import { AppTooltip } from 'shared/ui';
import { apiUrlSelector } from 'store/selectors/apiUrlSelector';
import { typeCheckers } from 'shared/lib';

type ToolsErrors = {
  [key: string]: string;
};

const ExecuteButton: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const tab = useAppSelector(activeTabSelector);
  const { isCache } = useAppSelector(settingsSelector);
  const [isTriggered, setIsTriggered] = React.useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const currentUrl = useAppSelector(apiUrlSelector);

  const [
    trigger,
    { data, isFetching, error, startedTimeStamp, fulfilledTimeStamp },
  ] = useLazyGetEnteredQuery();

  const errorPopup = React.useCallback(
    ({ type, content }: { type: NoticeType; content: string }) => {
      messageApi.open({
        type,
        content,
      });
    },
    [messageApi]
  );

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
    if (error && !isTriggered) {
      if (typeCheckers.isFetchError(error) && error.status === 400) {
        dispatch(
          updateResponse({
            data: JSON.stringify(error.data, null, '\t'),
            isLoading: isFetching,
          })
        );
      } else {
        errorPopup({ type: 'error', content: t('sandbox.errors.execute') });
      }
    }
  }, [
    isTriggered,
    data,
    isFetching,
    error,
    dispatch,
    errorPopup,
    fulfilledTimeStamp,
    startedTimeStamp,
    t,
  ]);

  const executeQueryHandler = () => {
    if (!tab) return;
    const { variables, headers } = tab.query;
    let hasErrors = false;
    const fields = [
      {
        value: variables,
        name: 'variables',
        type: t('sandbox.buttons.variables'),
      },
      { value: headers, name: 'headers', type: t('sandbox.buttons.headers') },
    ];
    const errors = fields.reduce((acc, field) => {
      const { value, name, type } = field;
      if (value === '') {
        acc[name] = '';
      } else if (value) {
        try {
          JSON.parse(value);
          acc[name] = '';
        } catch (err) {
          const errorMessage = `${t('sandbox.response.error', {
            fieldName: type,
          })}`;
          acc[name] = errorMessage;
          hasErrors = true;
        }
      }
      return acc;
    }, {} as ToolsErrors);
    if (hasErrors) {
      errorPopup({
        type: 'error',
        content: errors.variables || errors.headers,
      });
    } else {
      const cacheSetting = isCache === 1;
      trigger({ queryData: tab.query, apiUrl: currentUrl }, cacheSetting);
      setIsTriggered(true);
    }
  };

  useHotkeys(SHORTCUTS.execute, executeQueryHandler);

  return (
    <>
      <AppTooltip title={t('sandbox.tooltips.execute')}>
        <Button
          onClick={executeQueryHandler}
          type="primary"
          size="large"
          icon={<CaretRightOutlined style={{ transform: 'scale(1.7)' }} />}
          loading={isFetching}
        />
      </AppTooltip>
      {contextHolder}
    </>
  );
};

export default ExecuteButton;
