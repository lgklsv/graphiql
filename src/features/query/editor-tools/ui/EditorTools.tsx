import React from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { linter } from '@codemirror/lint';
import { jsonParseLinter, json } from '@codemirror/lang-json';

import { useAppDispatch } from 'shared/hooks/redux';
import { updateTabContent } from 'store/reducers/TabSlice';
import { useTabs } from 'shared/hooks/use-tab';
import { APP_THEME, BASIC_SETUP_OPTIONS } from '../../config';
import styles from './EditorTools.module.scss';

interface EditorToolsProps {
  activeToolTab: number;
}

const EditorTools: React.FC<EditorToolsProps> = ({
  activeToolTab,
}: EditorToolsProps) => {
  const { activeTabKey, tabContent } = useTabs();
  const dispatch = useAppDispatch();

  const EDITOR_TABS = ['variables', 'headers'];

  const handleChange = (text: string, tabName: string) => {
    dispatch(
      updateTabContent({
        activeTabKey,
        content: { [tabName]: text },
      })
    );
  };

  return (
    <div className={styles['editor-tools']}>
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
            value={tabContent[tabName as keyof TabQueryContent]}
            extensions={[APP_THEME, json(), linter(jsonParseLinter())]}
            basicSetup={BASIC_SETUP_OPTIONS}
            onChange={(value) => handleChange(value, tabName)}
          />
        </div>
      ))}
    </div>
  );
};

export default EditorTools;
