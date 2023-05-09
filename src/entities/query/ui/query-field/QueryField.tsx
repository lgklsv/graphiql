import React, { SyntheticEvent } from 'react';
import { ResizeCallbackData } from 'react-resizable';
import { Grid } from 'antd';

import { DEFAULT_QUERY_FIELD_WIDTH } from 'app/config';
import { Query } from 'features/query';
import { Resizable } from 'shared/ui';
import VariablesHeadersField from '../variables-headers-field/VariablesHeadersField';
import Toolbar from '../toolbar/Toolbar';

import styles from './QueryField.module.scss';

const { useBreakpoint } = Grid;

const QueryField: React.FC = () => {
  const screens = useBreakpoint();

  const [queryFieldWidth, setQueryFieldWidth] = React.useState(
    DEFAULT_QUERY_FIELD_WIDTH
  );

  const onResize = (_: SyntheticEvent, data: ResizeCallbackData) => {
    setQueryFieldWidth(data.size.width);
  };

  if ((screens.sm && !screens.md) || (screens.xs && !screens.md)) {
    return (
      <div className={styles.query}>
        <div className={styles.query__editor}>
          <Query.Editor />
          <Toolbar />
        </div>
        <VariablesHeadersField />
      </div>
    );
  }

  return (
    <Resizable
      direction="horizontal"
      controlledSide={queryFieldWidth}
      resize={onResize}
    >
      <div className={styles.query}>
        <div className={styles.query__editor}>
          <Query.Editor />
          <Toolbar />
        </div>
        <VariablesHeadersField />
      </div>
    </Resizable>
  );
};

export default QueryField;
