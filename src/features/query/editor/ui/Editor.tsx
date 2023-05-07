import React from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { graphql as graphqlCodeMirror } from 'cm6-graphql';

import { graphql } from 'shared/api';
import { useTabs } from 'shared/hooks/use-tab';
import { useAppDispatch } from 'shared/hooks/redux';
import { updateTabContent } from 'store/reducers/TabSlice';

import { APP_THEME, BASIC_SETUP_OPTIONS } from '../config';
import './Editor.scss';

const Editor: React.FC = () => {
  const { data } = graphql.useGetSchemaQuery('{}');
  const { activeTabKey, tabQuery } = useTabs();
  const dispatch = useAppDispatch();

  const onChange = (queryString: string) => {
    dispatch(updateTabContent({ activeTabKey, query: { data: queryString } }));
  };

  return (
    <div className="editor">
      {data && (
        <CodeMirror
          className="editor__code"
          value={tabQuery.data}
          height="100%"
          placeholder="Enter your query"
          extensions={[APP_THEME, graphqlCodeMirror(data)]}
          basicSetup={BASIC_SETUP_OPTIONS}
          onChange={onChange}
        />
      )}
    </div>
  );
};

export default Editor;
