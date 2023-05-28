import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { css } from '@emotion/react';

interface DraggableTabPaneProps extends React.HTMLAttributes<HTMLDivElement> {
  'data-node-key': string;
  onActiveBarTransform: (className: string) => void;
}

const DraggableTabNode = ({
  className,
  onActiveBarTransform,
  ...props
}: DraggableTabPaneProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isSorting,
  } = useSortable({
    id: props['data-node-key'],
    transition: {
      duration: 100,
      easing: 'ease-in-out',
    },
  });

  const style: React.CSSProperties = {
    ...props.style,
    transform: CSS.Transform.toString(transform),
    transition,
    cursor: 'move',
  };

  React.useEffect(() => {
    if (!isSorting) {
      onActiveBarTransform('');
    } else if (className?.includes('ant-tabs-tab-active')) {
      const dragClassName = `${css`
        transform: ${CSS.Transform.toString(transform)};
        transition: ${transition} !important;
      `}`;
      onActiveBarTransform(dragClassName);
    }
  }, [className, isSorting, transform, onActiveBarTransform, transition]);

  return React.cloneElement(props.children as React.ReactElement, {
    ref: setNodeRef,
    style,
    ...attributes,
    ...listeners,
  });
};

export default DraggableTabNode;
