import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Input, Space } from 'antd';
import { ApiOutlined } from '@ant-design/icons';

import { useAppDispatch, useAppSelector } from 'shared/hooks/redux';
import { setApiUrl } from 'store/reducers/ApiSlice';
import { updateResponse } from 'store/reducers/TabSlice';
import { graphql } from 'shared/api';
import { apiUrlSelector } from 'store/selectors/apiUrlSelector';
import { AppTooltip } from 'shared/ui';
import styles from './ApiConnector.module.scss';

const ApiConnector: React.FC = () => {
  const { t } = useTranslation();

  const dispatch = useAppDispatch();
  const currentUrl = useAppSelector(apiUrlSelector);

  const [inputValue, setInputValue] = React.useState(currentUrl);

  const { isLoading, isFetching, isError, refetch } =
    graphql.useGetSchemaQuery('{}');

  React.useEffect(() => {
    setInputValue(currentUrl);
  }, [currentUrl]);

  const handleConnect = () => {
    dispatch(setApiUrl({ url: inputValue }));
    dispatch(updateResponse({ data: '', isLoading: false, error: undefined }));
    refetch();
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setInputValue(e.target.value);

  return (
    <Space.Compact className={styles.apiConnector}>
      <Input
        placeholder={`${t('sandbox.tooltips.apiConnection')}`}
        value={inputValue}
        status={isError ? 'error' : ''}
        onChange={handleChange}
        onPressEnter={handleConnect}
        size="large"
      />
      <AppTooltip title={t('sandbox.tooltips.apiConnection')}>
        <Button
          icon={<ApiOutlined style={{ fontSize: 20 }} />}
          loading={isLoading || isFetching}
          onClick={handleConnect}
          disabled={!inputValue}
          style={{ borderColor: `${isError ? 'red' : ''}`, width: 40 }}
          className={styles.apiConnector__btn}
        />
      </AppTooltip>
    </Space.Compact>
  );
};

export default ApiConnector;
