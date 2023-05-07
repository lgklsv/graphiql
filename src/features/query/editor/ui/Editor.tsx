import React from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { graphql as graphqlCodeMirror } from 'cm6-graphql';
import { graphql } from 'shared/api';
import { useTabs } from 'shared/hooks/use-tab';
import { useAppDispatch } from 'shared/hooks/redux';
import { updateTabContent } from 'store/reducers/TabSlice';

import { BASIC_EXTENSIONS, BASIC_SETUP_OPTIONS } from '../../config';
import styles from './Editor.module.scss';

const Editor: React.FC = () => {
  const { data } = graphql.useGetSchemaQuery('{}');
  const { activeTabKey, tabContent } = useTabs();
  const dispatch = useAppDispatch();

  const onChange = (queryString: string) => {
    dispatch(
      updateTabContent({ activeTabKey, content: { query: queryString } })
    );
  };

  return (
    <div className={styles.editor}>
      {data && (
        <CodeMirror
          value={tabContent.query}
          height="100%"
          placeholder="Enter your query"
          extensions={[...BASIC_EXTENSIONS, graphqlCodeMirror(data)]}
          basicSetup={BASIC_SETUP_OPTIONS}
          onChange={onChange}
        />
      )}
    </div>
  );
};

export default Editor;
