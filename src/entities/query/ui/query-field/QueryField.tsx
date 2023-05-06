import React, { SyntheticEvent } from 'react';
import { ResizeCallbackData } from 'react-resizable';

import { docsSelector } from 'store/selectors/DocsSelectors';
import { DEFAULT_QUERY_FIELD_WIDTH, DOCS_WIDTH } from 'app/config';
import { Query } from 'features/query';
import { Resizable } from 'shared/ui';
import { useAppSelector } from 'shared/hooks/redux';
import VariablesHeadersField from '../variables-headers-field/VariablesHeadersField';

import styles from './QueryField.module.scss';

const QueryField: React.FC = () => {
  const { isDocs } = useAppSelector(docsSelector);

  const [queryFieldWidth, setQueryFieldWidth] = React.useState(
    DEFAULT_QUERY_FIELD_WIDTH
  );

  React.useEffect(() => {
    if (isDocs) {
      setQueryFieldWidth((prev) =>
        prev - DOCS_WIDTH < DEFAULT_QUERY_FIELD_WIDTH ? prev : prev - DOCS_WIDTH
      );
    }
  }, [isDocs]);

  const onResize = (_: SyntheticEvent, data: ResizeCallbackData) => {
    setQueryFieldWidth(data.size.width);
  };

  return (
    <Resizable
      direction="horizontal"
      controlledSide={queryFieldWidth}
      resize={onResize}
      isDocs={isDocs}
    >
      <div className={styles.query}>
        <div className={styles.query__editor}>
          <Query.Editor />
          <Query.Toolbar />
        </div>
        <VariablesHeadersField />
      </div>
    </Resizable>
  );
};

export default QueryField;
