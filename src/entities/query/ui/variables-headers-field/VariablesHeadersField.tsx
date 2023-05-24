import React, { SyntheticEvent } from 'react';
import { ResizeCallbackData } from 'react-resizable';

import { Query } from 'features/query';
import {
  DEFAULT_VARIABLES_EDITOR_HEIGHT_CLOSED,
  DEFAULT_VARIABLES_EDITOR_HEIGHT_OPEN,
} from 'app/config';
import { Resizable } from 'shared/ui';

import styles from './VariablesHeadersField.module.scss';

const VariablesHeadersField: React.FC = React.memo(() => {
  const [isToolsEditor, setIsToolsEditor] = React.useState(false);
  const [activeToolTab, setActiveToolTab] = React.useState(0);
  const [toolsEditorHeight, setToolsEditorHeight] = React.useState(
    DEFAULT_VARIABLES_EDITOR_HEIGHT_CLOSED
  );

  const toggleToolsEditorHandler = () => {
    setIsToolsEditor((prev) => !prev);
    if (!isToolsEditor) {
      setToolsEditorHeight(DEFAULT_VARIABLES_EDITOR_HEIGHT_OPEN);
    } else {
      setToolsEditorHeight(DEFAULT_VARIABLES_EDITOR_HEIGHT_CLOSED);
    }
  };

  const onResize = (_: SyntheticEvent, data: ResizeCallbackData) => {
    if (data.size.height < 100) {
      if (isToolsEditor) {
        toggleToolsEditorHandler();
      }
      return;
    }
    if (!isToolsEditor) {
      toggleToolsEditorHandler();
    }
    setToolsEditorHeight(data.size.height);
  };

  return (
    <Resizable
      direction="vertical"
      controlledSide={toolsEditorHeight}
      resize={onResize}
    >
      <div className={styles.field}>
        <Query.ToolsTabs
          isOpen={isToolsEditor}
          toggle={toggleToolsEditorHandler}
          setActiveToolTab={setActiveToolTab}
        />
        {isToolsEditor && <Query.EditorTools activeToolTab={activeToolTab} />}
      </div>
    </Resizable>
  );
});

export default VariablesHeadersField;
