import React from 'react';
import { useTranslation } from 'react-i18next';
import CodeMirror from '@uiw/react-codemirror';
import { graphql as graphqlCodeMirror, updateSchema } from 'cm6-graphql';
import { EditorView } from 'codemirror';

import { updateTabContent, updateTabLabel } from 'store/reducers/TabSlice';
import { triggerFirestoreUpdate } from 'store/reducers/FirestoreSlice';
import { graphql } from 'shared/api';
import { useTabs } from 'shared/hooks/use-tab';
import { useAppDispatch } from 'shared/hooks/redux';
import { ErrorNotification, Spinner } from 'shared/ui';
import { isFetchError } from 'shared/lib/type-checkers';
import { BASIC_EXTENSIONS, BASIC_SETUP_OPTIONS } from '../../config';
import './Editor.scss';

const Editor: React.FC = React.memo(() => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { activeTabKey, tabQuery } = useTabs();
  const viewRef = React.useRef<EditorView | null>(null);
  const { data, error, refetch, isError, isFetching } =
    graphql.useGetSchemaQuery('{}');

  React.useEffect(() => {
    if (viewRef.current) {
      updateSchema(viewRef.current, data);
    }
  }, [data, viewRef]);

  const onChange = async (queryString: string) => {
    const regex = /(?<=query | mutation )\w+/;
    dispatch(updateTabContent({ activeTabKey, query: { data: queryString } }));
    if (regex.exec(queryString)) {
      const newTitle = regex.exec(queryString)![0];
      dispatch(updateTabLabel({ activeTabKey, label: newTitle }));
    } else {
      dispatch(
        updateTabLabel({ activeTabKey, label: `${t('sandbox.newTab')}` })
      );
    }
    dispatch(triggerFirestoreUpdate());
  };

  if (isFetching) {
    return (
      <div className="editor">
        <Spinner size="medium" />
      </div>
    );
  }
  return (
    <div className="editor" id="custom-scroll">
      {isError && (
        <ErrorNotification
          errorMsg={
            isFetchError(error)
              ? `${t('sandbox.errors.failedFetch')}`
              : `${error.message}`
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
          data && !isError
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
});

export default Editor;
