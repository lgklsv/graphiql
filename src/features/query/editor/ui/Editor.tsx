import React from 'react';

import { Typography } from 'antd';
import styles from './Editor.module.scss';

const { Text } = Typography;

const Editor: React.FC = () => {
  return (
    <div className={styles.editor}>
      <Text>Code editor will be here </Text>
    </div>
  );
};

export default Editor;
