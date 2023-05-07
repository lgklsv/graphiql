import React from 'react';
import { Typography } from 'antd';

import { useAppSelector } from 'shared/hooks/redux';
import { activeTabSelector } from 'store/selectors/tabSelector';
import { Spinner } from 'shared/ui';

import styles from './ResponseField.module.scss';

const { Text } = Typography;

const ResponseField: React.FC = () => {
  const tab = useAppSelector(activeTabSelector)!;

  const { data, isLoading, error } = tab.response;

  if (isLoading) {
    return <Spinner size="large" />;
  }

  return (
    <div className={styles.response}>
      <Text>{data}</Text>
    </div>
  );
};

export default ResponseField;
