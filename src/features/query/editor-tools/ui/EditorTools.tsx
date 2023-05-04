import React from 'react';
import { Typography } from 'antd';

import styles from './EditorTools.module.scss';

const { Text } = Typography;

const EditorTools: React.FC = () => {
  return (
    <div className={styles['editor-tools']}>
      <Text>Variables/Headers editor will be here </Text>
    </div>
  );
};

export default EditorTools;
