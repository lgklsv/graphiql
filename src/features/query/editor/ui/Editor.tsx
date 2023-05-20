import React from 'react';
import { useTranslation } from 'react-i18next';
import CodeMirror from '@uiw/react-codemirror';
import { graphql as graphqlCodeMirror } from 'cm6-graphql';
import { graphql, handleErrorMessage } from 'shared/api';
import { useTabs } from 'shared/hooks/use-tab';
import { useUpdateTabs } from 'shared/lib/firestore/hook/use-update-tabs';
import { utils } from 'shared/lib';
import { ErrorNotification } from 'shared/ui';
import { BASIC_EXTENSIONS, BASIC_SETUP_OPTIONS } from '../../config';
import './Editor.scss';

const Editor: React.FC = () => {
  const { t } = useTranslation();
  const { data, error, refetch, isError } = graphql.useGetSchemaQuery('{}');
  const { activeTabKey, tabQuery, tabs } = useTabs();
  const updateStoreWithFirebase = useUpdateTabs();

  // TODO: change time debounce
  const onChange = utils.debounce(async (queryString: string) => {
    const regex = /(?<=query |mutation )\w+/;

    await updateStoreWithFirebase({
      tabs,
      activeTabKey,
      query: { data: queryString },
      label: regex.exec(queryString)
        ? regex.exec(queryString)![0]
        : `${t('sandbox.newTab')}`,
    });
  });

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
      />
    </div>
  );
};

export default Editor;
