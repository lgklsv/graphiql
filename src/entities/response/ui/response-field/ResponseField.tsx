import React from 'react';
import { Tag, Typography } from 'antd';
import CodeMirror from '@uiw/react-codemirror';
import { linter } from '@codemirror/lint';
import { jsonParseLinter, json } from '@codemirror/lang-json';

import { BASIC_EXTENSIONS, BASIC_SETUP_OPTIONS } from 'features/query/config';
import { getTimingColor } from 'entities/response/lib';
import { Spinner } from 'shared/ui';
import { useTabs } from 'shared/hooks/use-tab';
import { useAppSelector } from 'shared/hooks/redux';

import { settingsSelector } from 'store/selectors/settingsSelector';
import styles from './ResponseField.module.scss';

const { Text } = Typography;

const ResponseField: React.FC = () => {
  const { tabResponse } = useTabs();
  const { isCache, isStats } = useAppSelector(settingsSelector);
  const { data, isLoading, error, timing } = tabResponse;

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
      <div className={styles.response__editor}>
        {data && (
          <CodeMirror
            value={data}
            extensions={[
              ...BASIC_EXTENSIONS,
              json(),
              linter(jsonParseLinter()),
            ]}
            basicSetup={{
              ...BASIC_SETUP_OPTIONS,
              lineNumbers: false,
            }}
            readOnly
          />
        )}
      </div>

      {timing && isStats === 1 && (
        <div className={styles.response__stats}>
          <Tag color="default">{isCache ? 'CACHE' : 'NO CACHE'}</Tag>
          {!isCache && <Tag color={getTimingColor(timing)}>{timing} ms</Tag>}
        </div>
      )}
    </div>
  );
};

export default ResponseField;
