import React from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { linter } from '@codemirror/lint';
import { jsonParseLinter, json } from '@codemirror/lang-json';
import { useTabs } from 'shared/hooks/use-tab';
import { useUpdateTabs } from 'shared/lib/firestore/hook/use-update-tabs';
import { utils } from 'shared/lib';
import { BASIC_EXTENSIONS, BASIC_SETUP_OPTIONS } from '../../config';
import styles from './EditorTools.module.scss';

interface EditorToolsProps {
  activeToolTab: number;
}

const EditorTools: React.FC<EditorToolsProps> = ({
  activeToolTab,
}: EditorToolsProps) => {
  const { activeTabKey, tabQuery, tabs } = useTabs();
  const updateStoreWithFirebase = useUpdateTabs();

  const EDITOR_TABS = ['variables', 'headers'];

  const handleChange = utils.debounce(async (text: string, tabName: string) => {
    await updateStoreWithFirebase({
      tabs,
      activeTabKey,
      query: { [tabName]: text },
    });
  });

  return (
    <div className={styles['editor-tools']} id="custom-scroll">
      {EDITOR_TABS.map((tabName, ind) => (
        <div
          key={tabName}
          className={`${
            activeToolTab === ind
              ? `${styles.editor__tab}`
              : `${styles.editor__tab_hidden}`
          }`}
        >
          <CodeMirror
            value={tabQuery[tabName as keyof TabQueryContent]}
            extensions={[
              ...BASIC_EXTENSIONS,
              json(),
              linter(jsonParseLinter()),
            ]}
            basicSetup={BASIC_SETUP_OPTIONS}
            onChange={(value) => handleChange(value, tabName)}
          />
        </div>
      ))}
    </div>
  );
};

export default EditorTools;
