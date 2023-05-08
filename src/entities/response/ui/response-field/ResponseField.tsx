import React from 'react';
import { Typography } from 'antd';
import CodeMirror from '@uiw/react-codemirror';
import { linter } from '@codemirror/lint';
import { jsonParseLinter, json } from '@codemirror/lang-json';

import { Spinner } from 'shared/ui';
import { useTabs } from 'shared/hooks/use-tab';

import { BASIC_EXTENSIONS, BASIC_SETUP_OPTIONS } from 'features/query/config';
import styles from './ResponseField.module.scss';

const { Text } = Typography;

const ResponseField: React.FC = () => {
  const { tabResponse } = useTabs();
  const { data, isLoading, error } = tabResponse;

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
