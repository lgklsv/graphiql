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
      minConstraints={[300, Infinity]}
      maxConstraints={[window.innerWidth * 0.8, Infinity]}
      height={Infinity}
      width={window.innerWidth * 0.33}
      resizeHandles={['e']}
    >
      {children}
    </ResizableBox>
  );
};

export default Resizable;
