import React from 'react';
import { Typography } from 'antd';
import CodeMirror from '@uiw/react-codemirror';
import { linter } from '@codemirror/lint';
import { jsonParseLinter, json } from '@codemirror/lang-json';

import { useAppSelector } from 'shared/hooks/redux';
import { activeTabSelector } from 'store/selectors/tabSelector';
import {
  BASIC_EXTENSIONS,
  BASIC_SETUP_OPTIONS,
} from 'features/query/editor/config';

import { Spinner } from 'shared/ui';

import styles from './ResponseField.module.scss';

const { Text } = Typography;

const ResponseField: React.FC = () => {
  const tab = useAppSelector(activeTabSelector)!;
  const { data, isLoading, error } = tab.response;

  if (isLoading) {
    return (
      <div className={styles.response}>
        <Spinner size="large" />
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.response}>
        <Text>{JSON.stringify(error)}</Text>
      </div>
    );
  }

  return (
    <div className={styles.response}>
      {data && (
        <CodeMirror
          value={data}
          extensions={[...BASIC_EXTENSIONS, json(), linter(jsonParseLinter())]}
          basicSetup={{
            ...BASIC_SETUP_OPTIONS,
            lineNumbers: false,
          }}
          readOnly
        />
      )}
    </div>
  );
};

export default ResponseField;
