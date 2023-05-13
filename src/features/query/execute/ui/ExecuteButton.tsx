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
import { AppTooltip, ErrorNotification } from 'shared/ui';

type ToolsErrors = {
  [key: string]: string;
};

const ExecuteButton: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const tab = useAppSelector(activeTabSelector);
  const [isTriggered, setIsTriggered] = React.useState(false);
  const [trigger, { data, isFetching, error }] = useLazyGetEnteredQuery();

  const [toolsErrors, setToolsErrors] = React.useState<ToolsErrors>({
    variables: '',
    headers: '',
  });
  const [count, setCount] = React.useState(0);

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
      setToolsErrors({ ...toolsErrors, ...errors });
      if (!hasErrors) {
        trigger(tab.query);
        setIsTriggered(true);
      }
    }
    setCount(count + 1);
  };

  useHotkeys(SHORTCUTS.execute, executeQueryHandler);

  return (
    <>
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
      {toolsErrors.variables && (
        <div key={`variables${count}`}>
          <ErrorNotification errorMsg={toolsErrors.variables} />
        </div>
      )}
      {toolsErrors.headers && (
        <div key={`headers${count}`}>
          <ErrorNotification errorMsg={toolsErrors.headers} />
        </div>
      )}
    </>
  );
};

export default ExecuteButton;
