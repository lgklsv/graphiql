import React from 'react';
import { useTranslation } from 'react-i18next';
import CodeMirror from '@uiw/react-codemirror';
import { graphql as graphqlCodeMirror } from 'cm6-graphql';
import { useAuthState } from 'shared/hooks/use-auth';
import { updateFirestoreUserData } from 'shared/lib/firestore/constants';
import { updateFirestore } from 'store/actions/FirestoreActions';

import { graphql, handleErrorMessage } from 'shared/api';
import { useTabs } from 'shared/hooks/use-tab';
import { useAppDispatch } from 'shared/hooks/redux';
import { updateTabLabel, updateTabStore } from 'store/reducers/TabSlice';
import { utils } from 'shared/lib';
import { ErrorNotification } from 'shared/ui';
import { BASIC_EXTENSIONS, BASIC_SETUP_OPTIONS } from '../../config';
import './Editor.scss';

interface Update {
  tabs: Tab[];
  activeTabKey: string;
  query: TabQueryContent;
}

export const stringifyArray = (array: Tab[]) =>
  array.map((elem) => JSON.stringify(elem));

export const parseArray = (array: string[]) =>
  array.map((elem) => JSON.parse(elem)) as Tab[];

// export const update = (props: Update) => {
//   const { tabs, activeTabKey, query } = props;
//   const activeTab = { ...tabs.find(({ key }) => key === activeTabKey) };

//   if (!activeTab) {
//     return null;
//   }

//   activeTab.query = { ...activeTab.query, ...query };
//   const updateTabs = tabs.map((t) =>
//     t.key === activeTab.key ? activeTab : t
//   ) as Tab[];

//   const stringifyTabs = stringifyArray(updateTabs);
//   return { newActiveKey: activeTab.key, updateTabs, stringifyTabs };
// };

const Editor: React.FC = () => {
  const { t } = useTranslation();
  const { data, error, refetch, isError } = graphql.useGetSchemaQuery('{}');
  const { activeTabKey, tabQuery, tabs } = useTabs();
  const { id } = useAuthState();
  const dispatch = useAppDispatch();

  // TODO: change time debounce
  const onChange = utils.debounce((queryString: string) => {
    // console.log('EDITOR onChange');
    // dispatch(updateTabContent({ activeTabKey, query: { data: queryString } }));

    // const data1 = update({
    //   tabs,
    //   activeTabKey,
    //   query: { data: queryString },
    // });

    dispatch(
      updateFirestore({
        id: id as string,
        data: { tabs, activeKey: activeTabKey, query: { data: queryString } },
      })
    );

    // if (data1) {
    //   const { newActiveKey, updateTabs, stringifyTabs } = data1;
    //   dispatch(
    //     updateTabStore({
    //       activeKey: newActiveKey as string,
    //       tabs: updateTabs as Tab[],
    //     })
    //   );

    //   updateFirestoreUserData(id as string, {
    //     activeKey: newActiveKey as string,
    //     tab: stringifyTabs,
    //   });
    // }

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
