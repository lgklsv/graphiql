import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import CodeMirror from '@uiw/react-codemirror';
import { graphql as graphqlCodeMirror } from 'cm6-graphql';
import { graphql, handleErrorMessage } from 'shared/api';
import { useTabs } from 'shared/hooks/use-tab';
import { useAppDispatch } from 'shared/hooks/redux';
import { updateTabContent, updateTabLabel } from 'store/reducers/TabSlice';

import './Editor.scss';
import { ErrorNotification } from 'shared/ui';
import { BASIC_EXTENSIONS, BASIC_SETUP_OPTIONS } from '../../config';

const Editor: React.FC = () => {
  const { t } = useTranslation();
  const [getSchema, { data: schema, error, isError }] =
    graphql.useLazyGetSchemaQuery();
  const [extensions, setExtensions] = useState([...BASIC_EXTENSIONS]);
  const { activeTabKey, tabQuery } = useTabs();
  const dispatch = useAppDispatch();

  useEffect(() => {
    getSchema('{}');
    if (schema) {
      setExtensions([...BASIC_EXTENSIONS, graphqlCodeMirror(schema)]);
    }
  }, [getSchema, schema]);

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
      {isError && (
        <ErrorNotification
          errorMsg={
            handleErrorMessage(error) || `${t('sandbox.schema.failedFetch')}`
          }
          onReset={() => getSchema('{}')}
        />
      )}
      <CodeMirror
        className="editor__code"
        value={tabQuery.data}
        height="100%"
        placeholder={`${t('sandbox.placeholder')}`}
        extensions={extensions}
        basicSetup={BASIC_SETUP_OPTIONS}
        onChange={onChange}
      />
    </div>
  );
};

export default Editor;
