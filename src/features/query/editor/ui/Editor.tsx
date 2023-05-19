import React from 'react';
import { useTranslation } from 'react-i18next';
import CodeMirror from '@uiw/react-codemirror';
import { graphql as graphqlCodeMirror } from 'cm6-graphql';
import { useAuthState } from 'shared/hooks/use-auth';
import { updateFirestoreUserData } from 'shared/lib/firestore/constants';
import { graphql as graphqlCodeMirror, updateSchema } from 'cm6-graphql';
import { EditorView } from 'codemirror';
import { updateFirestore } from 'store/actions/FirestoreActions';
import { graphql, handleErrorMessage } from 'shared/api';
import { useTabs } from 'shared/hooks/use-tab';
import { useAppDispatch } from 'shared/hooks/redux';
import { updateTabLabel, updateTabStore } from 'store/reducers/TabSlice';
import { utils } from 'shared/lib';
import { ErrorNotification, Spinner } from 'shared/ui';
import { isFetchError } from 'shared/lib/type-checkers';
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
  const { activeTabKey, tabQuery, tabs } = useTabs();
  const viewRef = React.useRef<EditorView | null>(null);
  const { id } = useAuthState();
  const dispatch = useAppDispatch();

  const { data, error, refetch, isError, isFetching } =
    graphql.useGetSchemaQuery('{}');

  React.useEffect(() => {
    if (viewRef.current) {
      updateSchema(viewRef.current, data);
    }
  }, [data, viewRef]);

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
};

export default Editor;
