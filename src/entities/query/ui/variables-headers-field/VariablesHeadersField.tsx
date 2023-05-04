import React, { SyntheticEvent } from 'react';
import { ResizeCallbackData } from 'react-resizable';

import { Query } from 'features/query';
import {
  DEFAULT_VARIABLES_EDITOR_HEIGHT_CLOSED,
  DEFAULT_VARIABLES_EDITOR_HEIGHT_OPEN,
} from 'app/config';
import { Resizable } from 'shared/ui';

import styles from './VariablesHeadersField.module.scss';

const VariablesHeadersField: React.FC = () => {
  const [isToolsEditor, setIsToolsEditor] = React.useState(false);
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
      height={toolsEditorHeight}
      resize={onResize}
    >
      <div className={styles.field}>
        <Query.ToolsTabs
          isOpen={isToolsEditor}
          toggle={toggleToolsEditorHandler}
        />
        {isToolsEditor && <Query.EditorTools />}
      </div>
    </Resizable>
  );
};

export default VariablesHeadersField;
