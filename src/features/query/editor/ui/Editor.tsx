import React from 'react';
import { useTranslation } from 'react-i18next';
import CodeMirror from '@uiw/react-codemirror';
import { graphql as graphqlCodeMirror } from 'cm6-graphql';
import { useAuthState } from 'shared/hooks/use-auth';
<<<<<<< HEAD
import { updateFirestoreUserData } from 'shared/lib/firestore/constants';
<<<<<<< HEAD
import { graphql as graphqlCodeMirror, updateSchema } from 'cm6-graphql';
import { EditorView } from 'codemirror';
import { updateFirestore } from 'store/actions/FirestoreActions';
=======
>>>>>>> 3f498a3 (reafactor: change back editor tab change)
=======
import { updateFirestoreData } from 'shared/lib/firestore/constants';
>>>>>>> 586c41e (feat: add update firestore on change label)
import { graphql, handleErrorMessage } from 'shared/api';
import { useTabs } from 'shared/hooks/use-tab';
import { useAppDispatch } from 'shared/hooks/redux';
import { useUpdateTabs } from 'shared/lib/firestore/hook/use-update-tabs';
import { updateTabLabel } from 'store/reducers/TabSlice';
import { utils } from 'shared/lib';
<<<<<<< HEAD
import { ErrorNotification, Spinner } from 'shared/ui';
import { isFetchError } from 'shared/lib/type-checkers';
=======
import { ErrorNotification } from 'shared/ui';
<<<<<<< HEAD
<<<<<<< HEAD
import { updateData } from 'shared/lib/firestore/utils';
>>>>>>> 3f498a3 (reafactor: change back editor tab change)
=======
import { updateData, updateDataLabel } from 'shared/lib/firestore/utils';
>>>>>>> 586c41e (feat: add update firestore on change label)
=======
import { updateDataLabel } from 'shared/lib/firestore/utils';
>>>>>>> e18dc2e (feat: create hook for a single-tribe dispatch and update firestore tabs)
import { BASIC_EXTENSIONS, BASIC_SETUP_OPTIONS } from '../../config';
import './Editor.scss';

const Editor: React.FC = () => {
  const { t } = useTranslation();
  const { activeTabKey, tabQuery, tabs } = useTabs();
  const viewRef = React.useRef<EditorView | null>(null);
  const { id } = useAuthState();
  const dispatch = useAppDispatch();
  const updateStoreWithFirebase = useUpdateTabs();

  const { data, error, refetch, isError, isFetching } =
    graphql.useGetSchemaQuery('{}');

  React.useEffect(() => {
    if (viewRef.current) {
      updateSchema(viewRef.current, data);
    }
  }, [data, viewRef]);

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
