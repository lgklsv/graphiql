import React, { SyntheticEvent } from 'react';
import {
  ResizableBox,
  ResizableBoxProps,
  ResizeCallbackData,
} from 'react-resizable';

import {
  DEFAULT_VARIABLES_EDITOR_HEIGHT_CLOSED,
  QUERY_FIELD_MIN_WIDTH,
} from 'app/config';

import './Resizable.scss';

interface ResizableProps {
  direction: 'horizontal' | 'vertical';
  children: React.ReactNode;
  resize?: (e: SyntheticEvent, data: ResizeCallbackData) => void;
  controlledSide: number;
}

const Resizable: React.FC<ResizableProps> = ({
  direction,
  children,
  resize,
  controlledSide,
}) => {
  let resizableProps: ResizableBoxProps;

  if (direction === 'horizontal') {
    resizableProps = {
      onResize: resize,
      minConstraints: [QUERY_FIELD_MIN_WIDTH, Infinity],
      maxConstraints: [window.innerWidth * 0.8, Infinity],
      height: Infinity,
      width: controlledSide,
      resizeHandles: ['e'],
    };
  } else {
    resizableProps = {
      onResize: resize,
      minConstraints: [Infinity, DEFAULT_VARIABLES_EDITOR_HEIGHT_CLOSED],
      maxConstraints: [
        Infinity,
        window.innerHeight - 250 - window.innerHeight * 0.2,
      ],
      height: controlledSide,
      width: Infinity,
      resizeHandles: ['n'],
    };
  }

  return <ResizableBox {...resizableProps}>{children}</ResizableBox>;
};

export default Resizable;
