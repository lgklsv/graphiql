import React from 'react';
import { useTranslation } from 'react-i18next';
import CodeMirror from '@uiw/react-codemirror';
import { graphql as graphqlCodeMirror } from 'cm6-graphql';
import { useAuthState } from 'shared/hooks/use-auth';
import { updateFirestoreData } from 'shared/lib/firestore/constants';
import { graphql, handleErrorMessage } from 'shared/api';
import { useTabs } from 'shared/hooks/use-tab';
import { useAppDispatch } from 'shared/hooks/redux';
import { useUpdateTabs } from 'shared/lib/firestore/hook/use-update-tabs';
import { updateTabLabel } from 'store/reducers/TabSlice';
import { utils } from 'shared/lib';
import { ErrorNotification } from 'shared/ui';
import { updateDataLabel } from 'shared/lib/firestore/utils';
import { BASIC_EXTENSIONS, BASIC_SETUP_OPTIONS } from '../../config';
import './Editor.scss';

const Editor: React.FC = () => {
  const { t } = useTranslation();
  const { data, error, refetch, isError } = graphql.useGetSchemaQuery('{}');
  const { activeTabKey, tabQuery, tabs } = useTabs();
  const { id } = useAuthState();
  const dispatch = useAppDispatch();
  const updateStoreWithFirebase = useUpdateTabs();

  // TODO: change time debounce
  const onChange = utils.debounce(async (queryString: string) => {
    await updateStoreWithFirebase({
      tabs,
      activeTabKey,
      query: { data: queryString },
    });

    // TODO: эти диспачи перебивают вверхние - объединить

    const regex = /(?<=query |mutation )\w+/;
    if (regex.exec(queryString)) {
      console.log('1203', activeTabKey, tabQuery);

      const newTitle = regex.exec(queryString)![0];
      dispatch(updateTabLabel({ activeTabKey, label: newTitle }));

      const newTabs = updateDataLabel({ tabs, activeTabKey, label: newTitle });
      if (newTabs) {
        console.log('1203');

        await updateFirestoreData(id as string, {
          tabs: newTabs,
        });
      }
    } else {
      dispatch(
        updateTabLabel({ activeTabKey, label: `${t('sandbox.newTab')}` })
      );
      const newTabs = updateDataLabel({
        tabs,
        activeTabKey,
        label: `${t('sandbox.newTab')}`,
      });
      if (newTabs) {
        console.log('1204');
        await updateFirestoreData(id as string, {
          tabs: newTabs,
        });
      }
    }
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
