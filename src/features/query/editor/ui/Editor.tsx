import React, { useEffect, useState } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { GraphQLSchema } from 'graphql';
import { graphql } from 'cm6-graphql';
import { APP_THEME, BASIC_SETUP_OPTIONS, getSchema } from '../config';
import styles from './Editor.module.scss';

const Editor: React.FC = () => {
  const [schema, setSchema] = useState<GraphQLSchema | null>(null);

  useEffect(() => {
    getSchema().then((response) => setSchema(response));
  }, []);

  const onChange = (queryString: string) => {
    console.log('value:', queryString);
  };

  return (
    <div className={styles.editor}>
      {schema && (
        <CodeMirror
          value="query"
          height="100%"
          extensions={[APP_THEME, graphql(schema)]}
          basicSetup={BASIC_SETUP_OPTIONS}
          onChange={onChange}
        />
      )}
    </div>
  );
};

export default Editor;
