import React from 'react';
import { useTranslation } from 'react-i18next';
import CodeMirror from '@uiw/react-codemirror';
import { graphql as graphqlCodeMirror } from 'cm6-graphql';
import { useAuthState } from 'shared/hooks/use-auth';
import { updateFirestoreUserData } from 'shared/lib/firestore/constants';

import { graphql, handleErrorMessage } from 'shared/api';
import { useTabs } from 'shared/hooks/use-tab';
import { useAppDispatch } from 'shared/hooks/redux';
import { updateTabContent, updateTabLabel } from 'store/reducers/TabSlice';
import { utils } from 'shared/lib';
import { ErrorNotification } from 'shared/ui';
import { BASIC_EXTENSIONS, BASIC_SETUP_OPTIONS } from '../../config';
import './Editor.scss';

interface Update {
  tabs: Tab[];
  activeTabKey: string;
  query: TabQueryContent;
  id: string;
}

export const update = (props: Update) => {
  const { tabs, activeTabKey, query, id } = props;
  const activeTab = { ...tabs.find(({ key }) => key === activeTabKey) };

  if (activeTab) {
    console.log(activeTab.query);
    console.log(query);
    activeTab.query = { ...activeTab.query, ...query };
  }

  console.log(activeTab, 'THIS IS IT', tabs);
  return activeTab;
};

const Editor: React.FC = () => {
  const { t } = useTranslation();
  const { data, error, refetch, isError } = graphql.useGetSchemaQuery('{}');
  const { activeTabKey, tabQuery, tabs } = useTabs();
  const { id } = useAuthState();
  const dispatch = useAppDispatch();

  const onChange = utils.debounce((queryString: string) => {
    dispatch(updateTabContent({ activeTabKey, query: { data: queryString } }));

    update({
      tabs,
      activeTabKey,
      query: { data: queryString },
      id: id as string,
    });
    // console.log(activeTabKey, tabQuery, tabs);
    // TODO:

    // updateFirestoreUserData(id as string, {
    //   activeKey: activeTabKey,
    //   tab: tabQuery,
    // });

    const regex = /(?<=query |mutation )\w+/;
    if (regex.exec(queryString)) {
      const newTitle = regex.exec(queryString)![0];
      dispatch(updateTabLabel({ activeTabKey, label: newTitle }));
    } else
      dispatch(
        updateTabLabel({ activeTabKey, label: `${t('sandbox.newTab')}` })
      );
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
