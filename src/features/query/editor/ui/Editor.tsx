import React from 'react';
import { useTranslation } from 'react-i18next';
import CodeMirror from '@uiw/react-codemirror';
import { graphql as graphqlCodeMirror } from 'cm6-graphql';
import { useAuthState } from 'shared/hooks/use-auth';
import { updateFirestoreUserData } from 'shared/lib/firestore/constants';
import { graphql, handleErrorMessage } from 'shared/api';
import { useTabs } from 'shared/hooks/use-tab';
import { useAppDispatch } from 'shared/hooks/redux';
import { updateTabLabel, updateTabStore } from 'store/reducers/TabSlice';
import { utils } from 'shared/lib';
import { ErrorNotification } from 'shared/ui';
import { updateData } from 'shared/lib/firestore/utils';
import { BASIC_EXTENSIONS, BASIC_SETUP_OPTIONS } from '../../config';
import './Editor.scss';

const Editor: React.FC = () => {
  const { t } = useTranslation();
  const { data, error, refetch, isError } = graphql.useGetSchemaQuery('{}');
  const { activeTabKey, tabQuery, tabs } = useTabs();
  const { id } = useAuthState();
  const dispatch = useAppDispatch();

  // TODO: change time debounce
  const onChange = utils.debounce(async (queryString: string) => {
    // dispatch(
    //   updateFirestore({
    //     id: id as string,
    //     data: { tabs, activeKey: activeTabKey, query: { data: queryString } },
    //   })
    // );

    const updateTabsData = updateData({
      tabs,
      activeTabKey,
      query: { data: queryString },
    });

    if (updateTabsData) {
      const { newActiveKey, updateTabs, stringifyTabs } = updateTabsData;
      dispatch(
        updateTabStore({
          activeKey: newActiveKey,
          tabs: updateTabs,
        })
      );

      await updateFirestoreUserData(id as string, {
        activeKey: newActiveKey,
        tabs: stringifyTabs,
      });
    }

    const regex = /(?<=query |mutation )\w+/;
    if (regex.exec(queryString)) {
      const newTitle = regex.exec(queryString)![0];
      dispatch(updateTabLabel({ activeTabKey, label: newTitle }));
    } else {
      dispatch(
        updateTabLabel({ activeTabKey, label: `${t('sandbox.newTab')}` })
      );
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
