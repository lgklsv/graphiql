import React from 'react';
import { ResizableBox } from 'react-resizable';

import './Resizable.scss';

interface ResizableProps {
  direction: 'horizontal' | 'vertical';
  children: React.ReactNode;
}

const Resizable: React.FC<ResizableProps> = ({ direction, children }) => {
  return (
    <ResizableBox
      minConstraints={
        direction === 'horizontal' ? [300, Infinity] : [Infinity, 150]
      }
      maxConstraints={
        direction === 'horizontal'
          ? [window.innerWidth * 0.8, Infinity]
          : [Infinity, window.innerHeight * 0.5]
      }
      height={
        direction === 'horizontal'
          ? Infinity
          : (window.innerHeight - 250) * 0.75
      }
      width={direction === 'horizontal' ? window.innerWidth * 0.33 : Infinity}
      resizeHandles={direction === 'horizontal' ? ['e'] : ['s']}
    >
      {children}
    </ResizableBox>
  );
};

export default Resizable;
