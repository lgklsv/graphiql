import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

import CodeMirror from '@uiw/react-codemirror';
import { graphql as graphqlCodeMirror, updateSchema } from 'cm6-graphql';
import { EditorView } from 'codemirror';

import { graphql, handleErrorMessage } from 'shared/api';
import { useTabs } from 'shared/hooks/use-tab';
import { useAppDispatch } from 'shared/hooks/redux';
import { updateTabContent, updateTabLabel } from 'store/reducers/TabSlice';

import { utils } from 'shared/lib';
import { ErrorNotification, Spinner } from 'shared/ui';
import { BASIC_EXTENSIONS, BASIC_SETUP_OPTIONS } from '../../config';
import './Editor.scss';

const Editor: React.FC = () => {
  const { t } = useTranslation();
  const { activeTabKey, tabQuery } = useTabs();
  const viewRef = useRef<EditorView | null>(null);

  const dispatch = useAppDispatch();

  const { data, error, refetch, isError, isFetching } =
    graphql.useGetSchemaQuery('{}');

  useEffect(() => {
    if (viewRef.current) {
      updateSchema(viewRef.current, data);
    }
  }, [data, viewRef]);

  const onChange = utils.debounce((queryString: string) => {
    dispatch(updateTabContent({ activeTabKey, query: { data: queryString } }));

    const regex = /(?<=query |mutation )\w+/;
    if (regex.exec(queryString)) {
      const newTitle = regex.exec(queryString)![0];
      dispatch(updateTabLabel({ activeTabKey, label: newTitle }));
    } else
      dispatch(
        updateTabLabel({ activeTabKey, label: `${t('sandbox.newTab')}` })
      );
  });

  if (isFetching) {
    return (
      <div className="editor">
        <Spinner size="medium" />
      </div>
    );
  }
  return (
    <div className="editor">
      {isError && (
        <ErrorNotification
          errorMsg={
            handleErrorMessage(error) || `${t('sandbox.errors.failedFetch')}`
          }
          onReset={() => refetch()}
        />
      )}
      <CodeMirror
        className="editor__code"
        value={tabQuery.data}
        height="100%"
        placeholder={`${t('sandbox.placeholder')}`}
        extensions={
          data
            ? [...BASIC_EXTENSIONS, graphqlCodeMirror(data)]
            : [...BASIC_EXTENSIONS]
        }
        basicSetup={BASIC_SETUP_OPTIONS}
        onChange={onChange}
        onCreateEditor={(view) => {
          viewRef.current = view;
        }}
      />
    </div>
  );
};

export default Editor;
