import React from 'react';
import { Typography } from 'antd';
import styles from './ResponseField.module.scss';

const { Text } = Typography;

const ResponseField: React.FC = () => {
  return (
    <div className={styles.response}>
      <Text>Response field</Text>
    </div>
  );
};

export default ResponseField;
