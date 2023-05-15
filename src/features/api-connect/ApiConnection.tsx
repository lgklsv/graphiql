import React from 'react';
import { Input, Space } from 'antd';
import { useAppDispatch, useAppSelector } from 'shared/hooks/redux';
import { setApiUrl } from 'store/reducers/ApiSlice';
import { graphql } from 'shared/api';
import { apiUrlSelector } from 'store/selectors/apiUrlSelector';
import { CheckCircleOutlined, LoadingOutlined } from '@ant-design/icons';

const { Search } = Input;

const ApiConnector: React.FC = () => {
  const dispatch = useAppDispatch();
  const currentUrl = useAppSelector(apiUrlSelector);
  const { isLoading, isFetching, isError } =
    graphql.useGetSchemaQuery(currentUrl);

  const handleConnect = (value: string) => {
    if (value === '') return;
    dispatch(setApiUrl({ url: value }));
  };

  return (
    <Space.Compact style={{ width: 500 }}>
      <Search
        placeholder="Connect your api"
        defaultValue={currentUrl}
        onSearch={handleConnect}
        status={isError ? 'error' : ''}
        enterButton={
          isLoading || isFetching ? (
            <LoadingOutlined style={{ fontSize: 16 }} spin />
          ) : (
            <CheckCircleOutlined style={{ fontSize: 16 }} />
          )
        }
        style={{ width: 600, marginBottom: 20 }}
      />
    </Space.Compact>
  );
};

export default ApiConnector;
