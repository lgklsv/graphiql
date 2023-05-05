import React, { useEffect, useState } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { GraphQLSchema } from 'graphql';
import { graphql } from 'cm6-graphql';
import { useTabs } from 'shared/hooks/use-tab';
import { useAppDispatch } from 'shared/hooks/redux';
import { updateTabContent } from 'store/reducers/TabSlice';
import { APP_THEME, BASIC_SETUP_OPTIONS, getSchema } from '../config';
import styles from './Editor.module.scss';

const Editor: React.FC = () => {
  const [schema, setSchema] = useState<GraphQLSchema | null>(null);
  const { activeTabKey, tabContent } = useTabs();
  const dispatch = useAppDispatch();

  useEffect(() => {
    getSchema().then((response) => setSchema(response));
  }, []);

  const onChange = (queryString: string) => {
    dispatch(updateTabContent({ activeTabKey, content: queryString }));
  };

  return (
    <div className={styles.editor}>
      {schema && (
        <CodeMirror
          value={tabContent}
          height="100%"
          placeholder="Enter your query"
          extensions={[APP_THEME, graphql(schema)]}
          basicSetup={BASIC_SETUP_OPTIONS}
          onChange={onChange}
        />
      )}
    </div>
  );
};

export default Editor;
