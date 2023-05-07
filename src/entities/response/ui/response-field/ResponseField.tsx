import React from 'react';
import { Typography } from 'antd';

import { sandboxQueries } from 'shared/api/graphql';
import { useAppSelector } from 'shared/hooks/redux';
import { activeTabSelector } from 'store/selectors/tabSelector';
import { RootState } from 'store';
import styles from './ResponseField.module.scss';

const { Text } = Typography;

const ResponseField: React.FC = () => {
  const tab = useAppSelector(activeTabSelector);

  const data = useAppSelector(
    (state: RootState) =>
      sandboxQueries.endpoints.getEntered.select(tab.query)(state).data
  );
  console.log('final result', data);

  return (
    <div className={styles.response}>
      {data && <Text>{JSON.stringify(data)}</Text>}
    </div>
  );
};

export default ResponseField;
