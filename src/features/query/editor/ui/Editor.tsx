import React from 'react';
import { useTranslation } from 'react-i18next';
import CodeMirror from '@uiw/react-codemirror';
import { graphql as graphqlCodeMirror } from 'cm6-graphql';
import { graphql } from 'shared/api';
import { useTabs } from 'shared/hooks/use-tab';
import { useAppDispatch } from 'shared/hooks/redux';
import { updateTabContent, updateTabLabel } from 'store/reducers/TabSlice';

import { BASIC_EXTENSIONS, BASIC_SETUP_OPTIONS } from '../../config';
import './Editor.scss';

const Editor: React.FC = () => {
  const { t } = useTranslation();
  const { data } = graphql.useGetSchemaQuery('{}');
  const { activeTabKey, tabQuery } = useTabs();
  const dispatch = useAppDispatch();

  const onChange = (queryString: string) => {
    dispatch(updateTabContent({ activeTabKey, query: { data: queryString } }));

    const regex = /(?<=query |mutation )\w+/;
    if (regex.exec(queryString)) {
      const newTitle = regex.exec(queryString)![0];
      dispatch(updateTabLabel({ activeTabKey, label: newTitle }));
    } else
      dispatch(
        updateTabLabel({ activeTabKey, label: `${t('sandbox.newTab')}` })
      );
  };

  return (
    <div className="editor">
      {data && (
        <CodeMirror
          className="editor__code"
          value={tabQuery.data}
          height="100%"
          placeholder={`${t('sandbox.placeholder')}`}
          extensions={[...BASIC_EXTENSIONS, graphqlCodeMirror(data)]}
          basicSetup={BASIC_SETUP_OPTIONS}
          onChange={onChange}
        />
      )}
    </div>
  );
};

export default Editor;
