import React from 'react';
import { useTranslation } from 'react-i18next';
import CodeMirror from '@uiw/react-codemirror';
import { graphql as graphqlCodeMirror } from 'cm6-graphql';
import { useAuthState } from 'shared/hooks/use-auth';
import { updateFirestoreUserData } from 'shared/lib/firestore/constants';
import { graphql as graphqlCodeMirror, updateSchema } from 'cm6-graphql';
import { EditorView } from 'codemirror';
import { graphql } from 'shared/api';
import { useTabs } from 'shared/hooks/use-tab';
import { useAppDispatch } from 'shared/hooks/redux';
import { updateTabContent, updateTabLabel } from 'store/reducers/TabSlice';
import { utils } from 'shared/lib';
import { ErrorNotification, Spinner } from 'shared/ui';
import { isFetchError } from 'shared/lib/type-checkers';
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
